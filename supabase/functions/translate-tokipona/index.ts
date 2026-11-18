import "jsr:@supabase/functions-js/edge-runtime.d.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

// Official 137 pu & ku suli Toki Pona vocabulary
export const ALLOWED_WORDS = new Set([
  "a", "akesi", "ala", "alasa", "ale", "ali", "anpa", "ante", "anu", "awen",
  "e", "en", "epiku", "esun", "ijo", "ike", "ilo", "insa", "jaki", "jan",
  "jasima", "jelo", "jo", "kala", "kalama", "kama", "kasi", "ken", "kepeken", "kijetesantakalu",
  "kili", "kin", "kipisi", "kiwen", "ko", "kon", "ku", "kule", "kulupu", "kute",
  "la", "lanpan", "lape", "laso", "lawa", "leko", "len", "lete", "li", "lili",
  "linja", "lipu", "loje", "lon", "luka", "lukin", "lupa", "ma", "mama", "mani",
  "meli", "meso", "mi", "mije", "misikeke", "moku", "moli", "monsi", "monsuta", "mu",
  "mun", "musi", "mute", "n", "namako", "nanpa", "nasa", "nasin", "nena", "ni",
  "nimi", "noka", "o", "oko", "olin", "ona", "open", "pakala", "pali", "palisa",
  "pan", "pana", "pi", "pilin", "pimeja", "pini", "pipi", "poka", "poki", "pona",
  "pu", "sama", "seli", "selo", "seme", "sewi", "sijelo", "sike", "sin", "sina",
  "sinpin", "sitelen", "soko", "sona", "soweli", "suli", "suno", "supa", "suwi", "tan",
  "taso", "tawa", "telo", "tenpo", "toki", "tomo", "tonsi", "tu", "unpa", "uta",
  "utala", "walo", "wan", "waso", "wawa", "weka", "wile"
]);

// Explicitly banned transliterations of religions, months, holy books, or theological figures
export const FORBIDDEN_TRANSLITERATIONS = new Set([
  "isilan", "isilama", "kulan", "kolan", "kapa", "lamatan", "muwama", "allahu", "allah",
  "akbar", "quran", "islam", "koran", "ramadan", "kaaba", "masjid", "alapa", "juda", "kolisu"
]);

// Compact, high-speed system instruction preserving 100% of 137 vocabulary and pure pu rules
export const SYSTEM_INSTRUCTION = `You are an elite Toki Pona linguist adhering strictly to Sonja Lang's official pu & ku suli vocabulary (the exact 137 words below), phonology (a,e,i,j,k,l,m,n,o,p,s,t,u,w; NO ji,ti,wo,wu), and classical pu grammar.

ALLOWED 137 WORDS:
a, akesi, ala, alasa, ale, ali, anpa, ante, anu, awen, e, en, epiku, esun, ijo, ike, ilo, insa, jaki, jan, jasima, jelo, jo, kala, kalama, kama, kasi, ken, kepeken, kijetesantakalu, kili, kin, kipisi, kiwen, ko, kon, ku, kule, kulupu, kute, la, lanpan, lape, laso, lawa, leko, len, lete, li, lili, linja, lipu, loje, lon, luka, lukin, lupa, ma, mama, mani, meli, meso, mi, mije, misikeke, moku, moli, monsi, monsuta, mu, mun, musi, mute, n, namako, nanpa, nasa, nasin, nena, ni, nimi, noka, o, oko, olin, ona, open, pakala, pali, palisa, pan, pana, pi, pilin, pimeja, pini, pipi, poka, poki, pona, pu, sama, seli, selo, seme, sewi, sijelo, sike, sin, sina, sinpin, sitelen, soko, sona, soweli, suli, suno, supa, suwi, tan, taso, tawa, telo, tenpo, toki, tomo, tonsi, tu, unpa, uta, utala, walo, wan, waso, wawa, weka, wile.

ANTI-TRANSLITERATION RULE:
Every lowercase word MUST belong strictly to the 137 official words. NEVER transliterate religions, scriptures, months, or sacred concepts (NO Isilan, Kulan, Kapa, Ala, Lamatan, Muwama).
Capitalized proper nouns are allowed ONLY when preceded by a head noun (jan, ma, toki, kulupu, tomo, ilo) for real persons, countries, or languages.

PURE PU SPIRITUAL GLOSSARY:
- God/Allah: sewi / sewi wan
- Islam: nasin sewi / nasin pi pilin sewi | Muslim: jan pi nasin sewi
- Quran: lipu sewi / lipu pi toki sewi | Prophet: jan toki pi sewi
- Mosque: tomo sewi | Kaaba: tomo sewi suli | Prayer: toki tawa sewi / pali sewi
- Ramadan/Fasting: tenpo pi moku ala | Charity/Zakat: pana mani tawa jan pi jo ala
- Paradise: ma sewi pona | Hell: ma seli ike | Angel: kon sewi | Satan: kon ike
- Patience: awen pona lon tenpo ike | Peace: pona pilin | Faith: pilin wawa tawa sewi
- Alhamdulillah: sewi li pona a! | Bismillah: lon nimi pi sewi | Salam: olin en pona li lon sina

GRAMMAR & NUMBERS:
- 'li' separates 3rd-person subject from predicate (omit after standalone mi/sina).
- 'e' introduces direct object. 'pi' groups 2+ modifiers. 'la' sets context/condition. 'o' marks commands.
- Superlative: [X] li [adj] nanpa wan.
- Comparative: lon poka pi [Y] la [X] li [adj] mute OR [Y] li [adj]. taso [X] li [adj] mute.
- Numbers additive: ala(0), wan(1), tu(2), luka(5), mute(20), ale(100) (e.g. 27 = mute luka tu).

CORE FEW-SHOT EXAMPLES:
"الله أكبر" -> {"toki_pona": "sewi li suli nanpa wan!", "literal_breakdown": "The-Divine is great number-one!", "grammar_note_ar": "صيغة التفضيل المطلقة بـ (nanpa wan)."}
"الصبر مفتاح الفرج" -> {"toki_pona": "awen pona lon tenpo ike li open e tenpo pona.", "literal_breakdown": "Good endurance in bad times opens good times.", "grammar_note_ar": "تفكيك الصبر إلى (awen pona lon tenpo ike)."}
"الإسلام دين السلام والصبر" -> {"toki_pona": "nasin sewi li nasin pi pona pilin en awen pona.", "literal_breakdown": "Sacred path is path of heart-peace and good endurance.", "grammar_note_ar": "تفكيك الإسلام إلى (nasin sewi) والسلام إلى (pona pilin)."}
"هذا الكتاب أفضل من ذلك الكتاب" -> {"toki_pona": "lon poka pi lipu ante ni la lipu ni li pona mute.", "literal_breakdown": "Beside that other book (la), this book is very good.", "grammar_note_ar": "المقارنة بسياق (lon poka pi... la)."}
"العلم أفضل من المال" -> {"toki_pona": "mani li pona. taso sona li pona mute.", "literal_breakdown": "Money is good. However, knowledge is very good.", "grammar_note_ar": "أسلوب المقارنة التقابلي بـ (taso)."}
"اشتريت سبعة وعشرين كتاباً" -> {"toki_pona": "mi esun e lipu mute luka tu.", "literal_breakdown": "I bought books twenty-five-two (27).", "grammar_note_ar": "نظام الأعداد التراكمي (20+5+2)."}
"لا تحزن إن الله معنا" -> {"toki_pona": "o pilin ike ala. sewi li lon poka mi mute.", "literal_breakdown": "Do not feel bad. The-Divine is beside us.", "grammar_note_ar": "أداة النهي (o) والجمع (mi mute)."}
"الذكاء الاصطناعي" -> {"toki_pona": "sona ilo", "literal_breakdown": "Machine intelligence", "grammar_note_ar": "مركب المعرفة والأداة."}
"أين تسكن؟" -> {"toki_pona": "sina lon tomo seme?", "literal_breakdown": "You are at which house?", "grammar_note_ar": "أداة الاستفهام (seme)."}
"The Internet connects people across the world" -> {"toki_pona": "linja ilo li pana e jan tawa jan lon ma ale.", "literal_breakdown": "Tool-network gives people to people across the world.", "grammar_note_ar": "تجريد مفهوم الإنترنت لشبكة الآلات."}

OUTPUT SCHEMA:
Return ONLY valid JSON matching:
{"toki_pona":"...","literal_breakdown":"...","grammar_note_ar":"..."}`;

// Helper: validate Toki Pona words according to strict rules
export function validateTokiPona(tokiPonaText: string | undefined): { valid: boolean; invalidWords: string[] } {
  if (!tokiPonaText || typeof tokiPonaText !== "string") {
    return { valid: false, invalidWords: ["<empty>"] };
  }

  // Tokenize words, stripping punctuation
  const cleanTokens = tokiPonaText
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  if (cleanTokens.length === 0) {
    return { valid: false, invalidWords: ["<empty>"] };
  }

  const invalidWords: string[] = [];

  for (let i = 0; i < cleanTokens.length; i++) {
    const token = cleanTokens[i];
    const lower = token.toLowerCase();

    // Check banned transliterations first
    if (FORBIDDEN_TRANSLITERATIONS.has(lower)) {
      invalidWords.push(token);
      continue;
    }

    // Capitalized word (proper name) check
    if (token[0] >= "A" && token[0] <= "Z") {
      const prevToken = i > 0 ? cleanTokens[i - 1].toLowerCase() : "";
      const validHeadNouns = new Set(["jan", "ma", "toki", "kulupu", "tomo", "ilo", "lipu", "nasin"]);
      
      const validPhonology = /^[AEIJKLMNOPSTUW][aeijklmnopstuw]*$/.test(token) &&
        !/(ji|ti|wo|wu)/i.test(token);

      if (!validHeadNouns.has(prevToken) || !validPhonology) {
        invalidWords.push(token);
      }
      continue;
    }

    // Lowercase word must be in ALLOWED_WORDS
    if (!ALLOWED_WORDS.has(lower)) {
      invalidWords.push(token);
    }
  }

  return {
    valid: invalidWords.length === 0,
    invalidWords,
  };
}

function parseModelOutput(raw: string) {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.toki_pona === "string") return parsed;
  } catch {
    // Continue to regex match
  }

  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (parsed && typeof parsed.toki_pona === "string") return parsed;
    } catch {
      // Continue to fallback
    }
  }

  return null;
}

// Helper: Call Gemini models (Primary AI) with strict 3000ms AbortController timeout
async function callGemini(
  apiKey: string,
  systemInstruction: string,
  userMessage: string
): Promise<string> {
  const candidateModels = ["gemini-2.5-flash", "gemini-3-flash-preview", "gemini-3.8-flash"];

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    contents: [
      {
        parts: [{ text: userMessage }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
      maxOutputTokens: 250,
    },
  };

  for (const model of candidateModels) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return text;
        }
      } else {
        console.warn(`Gemini model ${model} returned status ${res.status}`);
        // If rate limited or server error, immediately failover to Groq
        if (res.status === 429 || res.status >= 500) {
          break;
        }
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err?.name === "AbortError") {
        console.warn(`Gemini model ${model} timed out after 3000ms. Aborting to Groq fallback.`);
        break; // Fast failover: do not wait for other Gemini models; jump straight to Groq
      }
      console.warn(`Invocation of Gemini model ${model} failed:`, err);
    }
  }

  throw new Error("All candidate Gemini models failed or timed out.");
}

// Helper: Call Groq models (Tier-2 AI Fallback) with fast token limit (max_tokens: 250)
async function callGroq(
  apiKey: string,
  systemInstruction: string,
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  const candidateModels = [
    "llama-3.3-70b-versatile",
    "qwen/qwen3.8-27b",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b"
  ];

  const url = "https://api.groq.com/openai/v1/chat/completions";

  for (const model of candidateModels) {
    try {
      const payload = {
        model,
        temperature: 0.2,
        max_tokens: 250,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemInstruction },
          ...messages
        ],
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          return content;
        }
      } else {
        console.warn(`Groq model ${model} returned status ${res.status}`);
      }
    } catch (err) {
      console.warn(`Invocation of Groq model ${model} failed:`, err);
    }
  }

  throw new Error("All candidate Groq models failed to return a valid response.");
}

Deno.serve(async (req: Request) => {
  // CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text, source_lang, force_engine } = await req.json();
    const cleanText = (text || "").trim();

    if (!cleanText) {
      return new Response(
        JSON.stringify({ error: "Missing 'text' in request body." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const langContext = source_lang ? `(Source Language: ${source_lang})` : "";
    const primaryPrompt = `Translate into authentic Toki Pona ${langContext}:\n"${cleanText}"`;

    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    const groqKey = Deno.env.get("GROQ_API_KEY");

    let finalResponse: any = null;

    // ==========================================
    // Tier 1: Gemini AI (Fast 3000ms AbortController Timeout)
    // ==========================================
    if (geminiKey && force_engine !== "groq") {
      try {
        const rawResult = await callGemini(geminiKey, SYSTEM_INSTRUCTION, primaryPrompt);
        let parsedResult = parseModelOutput(rawResult);

        if (parsedResult) {
          // Strict 137-Word Vocabulary Validation
          let validation = validateTokiPona(parsedResult.toki_pona);

          // Auto-retry loop for Gemini if unauthorized words are detected
          if (!validation.valid) {
            console.warn("Gemini validation failed. Invalid tokens:", validation.invalidWords);
            const correctionPrompt = `CRITICAL CORRECTION REQUIRED:
Your translation: "${parsedResult.toki_pona}" contained forbidden/non-pu words: [${validation.invalidWords.join(", ")}].
Every word must be in the 137 official words. Decompose into pure pu semantics.
Re-translate: "${cleanText}" returning valid JSON.`;

            try {
              const retryRaw = await callGemini(geminiKey, SYSTEM_INSTRUCTION, correctionPrompt);
              const retryParsed = parseModelOutput(retryRaw);
              if (retryParsed) {
                const retryVal = validateTokiPona(retryParsed.toki_pona);
                if (retryVal.valid) {
                  parsedResult = retryParsed;
                  validation = retryVal;
                }
              }
            } catch (retryErr) {
              console.warn("Gemini retry failed:", retryErr);
            }
          }

          if (validation.valid) {
            finalResponse = {
              ...parsedResult,
              engine: "gemini",
            };
          }
        }
      } catch (geminiError) {
        console.warn("Primary AI (Gemini) failed or timed out. Engaging Tier-2 Groq fallback...", geminiError);
      }
    }

    // ==========================================
    // Tier 2: Groq AI Fallback (Sub-Second Fast Response, max_tokens: 250)
    // ==========================================
    if (!finalResponse && groqKey) {
      try {
        console.log("Calling Groq AI Tier-2 fallback...");
        const groqRaw = await callGroq(groqKey, SYSTEM_INSTRUCTION, [
          { role: "user", content: primaryPrompt },
        ]);
        let parsedResult = parseModelOutput(groqRaw);

        if (parsedResult) {
          // Strict 137-Word Vocabulary Validation on Groq
          let validation = validateTokiPona(parsedResult.toki_pona);

          // Auto-retry loop for Groq if unauthorized words are detected
          if (!validation.valid) {
            console.warn("Groq validation failed. Invalid tokens:", validation.invalidWords);
            const correctionPrompt = `CRITICAL CORRECTION REQUIRED:
Your translation: "${parsedResult.toki_pona}" contained forbidden/non-pu words: [${validation.invalidWords.join(", ")}].
Every word must be in the 137 official words. Decompose into pure pu semantics.
Re-translate: "${cleanText}" returning valid JSON.`;

            try {
              const retryRaw = await callGroq(groqKey, SYSTEM_INSTRUCTION, [
                { role: "user", content: primaryPrompt },
                { role: "assistant", content: groqRaw },
                { role: "user", content: correctionPrompt },
              ]);
              const retryParsed = parseModelOutput(retryRaw);
              if (retryParsed) {
                const retryVal = validateTokiPona(retryParsed.toki_pona);
                if (retryVal.valid) {
                  parsedResult = retryParsed;
                  validation = retryVal;
                }
              }
            } catch (retryErr) {
              console.warn("Groq retry failed:", retryErr);
            }
          }

          finalResponse = {
            ...parsedResult,
            engine: "groq",
          };
        }
      } catch (groqError) {
        console.error("Tier-2 AI (Groq) failed:", groqError);
      }
    }

    if (!finalResponse) {
      return new Response(
        JSON.stringify({ error: "Both Primary (Gemini) and Tier-2 (Groq) AI engines failed to generate a response." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(finalResponse), {
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
