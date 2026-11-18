import "jsr:@supabase/functions-js/edge-runtime.d.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const SYSTEM_PROMPT = `You are an expert pu & ku Toki Pona linguist and translator.
Your task is to translate sentences from Arabic or English into authentic, idiomatic Toki Pona.

Guidelines:
1. Use strictly the 137 official Toki Pona words (120 pu words + 17 official ku suli words).
2. Follow Toki Pona grammar precisely:
   - Predicate marker 'li' (omitted only when subject is strictly 'mi' or 'sina').
   - Direct object marker 'e'.
   - Context/conditional marker 'la'.
   - Modifier grouping particle 'pi'.
   - Prepositions: 'lon', 'tawa', 'tan', 'kepeken'.
3. Use standard philosophical circumlocutions:
   - school/university: 'tomo sona'
   - friend: 'jan pona'
   - buy/get: 'kama jo'
   - bicycle/vehicle: 'ilo tawa'
   - car/bus: 'tomo tawa'
   - train: 'tomo tawa linja'
   - airplane: 'tomo tawa kon'
   - phone: 'ilo toki'
   - computer: 'ilo sona'
   - doctor/hospital: 'jan misikeke' / 'tomo misikeke'
   - book/document: 'lipu sona'
   - language: 'toki'
   - world/universe: 'ma ale'
4. For proper names, capitalize them inside the appropriate category noun (e.g., 'jan Youssef', 'ma Misiko', 'toki Alapi').
5. Output MUST be strictly valid JSON matching this schema:
{
  "toki_pona": "The Toki Pona translation in lowercase (except proper names)",
  "literal_breakdown": "Word-by-word literal English/Toki Pona explanation",
  "grammar_note_ar": "شرح نحوي وبلاغي مبسط بالعربية يوضح الفاعل والمفعول به وحروف المعنى المستخدمة"
}
Do NOT include markdown formatting or backticks around the JSON.`;

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured on the server." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { text, source_lang } = await req.json();
    const cleanText = (text || "").trim();

    if (!cleanText) {
      return new Response(
        JSON.stringify({ error: "Missing 'text' in request body." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const langContext = source_lang ? `(Source Language: ${source_lang})` : "";
    const userPrompt = `Translate the following text into Toki Pona ${langContext}:\n"${cleanText}"`;

    const requestPayload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        {
          parts: [{ text: userPrompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    };

    // Candidate models in order of priority: requested gemini-2.5-flash first, with resilient fallbacks
    const candidateModels = ["gemini-2.5-flash", "gemini-3-flash-preview", "gemini-3.8-flash"];
    let geminiResponse: Response | null = null;

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestPayload),
        });

        if (res.ok) {
          geminiResponse = res;
          break;
        } else {
          console.warn(`Model ${model} returned status ${res.status}`);
        }
      } catch (err) {
        console.warn(`Model ${model} invocation failed:`, err);
      }
    }

    if (!geminiResponse) {
      return new Response(
        JSON.stringify({ error: "Gemini API failed across all candidate models." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await geminiResponse.json();
    const rawContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawContent) {
      return new Response(
        JSON.stringify({ error: "No content returned from Gemini model." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(rawContent);
    } catch {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        parsedResult = {
          toki_pona: rawContent.trim(),
          literal_breakdown: "",
          grammar_note_ar: "",
        };
      }
    }

    return new Response(JSON.stringify(parsedResult), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Internal Server Error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
