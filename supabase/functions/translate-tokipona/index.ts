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

const SYSTEM_INSTRUCTION = `You are an elite Toki Pona linguist adhering strictly to Sonja Lang's official pu & ku suli vocabulary (the exact 137 words listed below), phonology (only letters: a, e, i, j, k, l, m, n, o, p, s, t, u, w; NO forbidden syllables ji, ti, wo, wu), and classical pu grammar.

ALLOWED 137 VOCABULARY WORDS:
a, akesi, ala, alasa, ale, ali, anpa, ante, anu, awen, e, en, epiku, esun, ijo, ike, ilo, insa, jaki, jan, jasima, jelo, jo, kala, kalama, kama, kasi, ken, kepeken, kijetesantakalu, kili, kin, kipisi, kiwen, ko, kon, ku, kule, kulupu, kute, la, lanpan, lape, laso, lawa, leko, len, lete, li, lili, linja, lipu, loje, lon, luka, lukin, lupa, ma, mama, mani, meli, meso, mi, mije, misikeke, moku, moli, monsi, monsuta, mu, mun, musi, mute, n, namako, nanpa, nasa, nasin, nena, ni, nimi, noka, o, oko, olin, ona, open, pakala, pali, palisa, pan, pana, pi, pilin, pimeja, pini, pipi, poka, poki, pona, pu, sama, seli, selo, seme, sewi, sijelo, sike, sin, sina, sinpin, sitelen, soko, sona, soweli, suli, suno, supa, suwi, tan, taso, tawa, telo, tenpo, toki, tomo, tonsi, tu, unpa, uta, utala, walo, wan, waso, wawa, weka, wile.

CRITICAL ANTI-TRANSLITERATION RULE:
EVERY lowercase word in "toki_pona" MUST belong strictly to the 137 official words.
NEVER invent phonetic transliterations (such as Isilan, Kulan, Kapa, Ala, Lamatan, Muwama) for religions, sacred books, months, or concepts. Always decompose them into pure pu semantic phrases!
Capitalized proper nouns are ONLY allowed when preceded by a head noun (jan, ma, toki, kulupu) for real people, countries, or languages (e.g., jan Ali, ma Alaje, toki Alapi).

GRAMMAR RULES:
1. li separates 3rd-person subjects from predicates (NEVER use li after standalone mi or sina).
2. e introduces direct objects.
3. pi regroups modifiers ONLY when two or more modifiers form a single sub-phrase (NEVER place pi before a single word!).
4. Context & comparison framing with la: [Condition / Time / Comparison] la [Main Clause].
5. Commands & wishes use o (e.g., o pilin ike ala).

PURE PU RELIGIOUS & SPIRITUAL GLOSSARY:
- الله / الإله (God / Allah): sewi OR sewi wan
- الإسلام (Islam): nasin sewi OR nasin pi pilin sewi
- المسلم / المؤمن (Muslim / Believer): jan pi nasin sewi OR jan pi pilin sewi
- القرآن الكريم (The Quran): lipu sewi OR lipu pi toki sewi
- النبي / الرسول (Prophet / Messenger): jan toki pi sewi
- الصلاة (Prayer): toki tawa sewi OR pali sewi
- المسجد (Mosque): tomo sewi
- الكعبة / البيت الحرام (Kaaba): tomo sewi suli
- الحج (Pilgrimage): tawa suli tawa tomo sewi
- الصيام / رمضان (Fasting / Ramadan): tenpo pi moku ala tan sewi / tenpo mun pi moku ala
- الزكاة / الصدقة (Charity / Zakat): pana mani tawa jan pi jo ala
- الجنة (Paradise): ma sewi pona
- النار / جهنم (Hellfire): ma seli ike
- الملائكة (Angels): kon sewi
- الشيطان (Satan): kon ike
- الروح (Soul): kon insa
- الدعاء (Supplication): wile toki tawa sewi
- الحمد لله (Praise be to God): sewi li pona a! OR pona tawa sewi!
- بسم الله (In the name of God): lon nimi pi sewi
- السلام عليكم (Peace be upon you): olin en pona li lon sina
- الحلال (Permissible): ken lon nasin sewi
- الحرام (Forbidden): ken ala lon nasin sewi
- التوبة (Repentance): pilin ike tan pali ike en tawa sin tawa sewi
- الصبر (Patience): awen pona lon tenpo ike
- الإيمان (Faith): pilin wawa tawa sewi
- القدر (Destiny): nasin pi tenpo kama tan sewi
- الآخرة (Hereafter): lon sin pi moli kama
- الذنب (Sin): pali ike lon nasin sewi
- الرحمة (Mercy): pilin olin tan sewi
- الحكمة (Wisdom): sona suli pona

COMPARATIVES, SUPERLATIVES & NUMBERS:
- Superlatives ("the best / biggest / fastest"): [X] li pona nanpa wan / [X] li suli nanpa wan / [X] li tawa wawa nanpa wan.
- Comparatives ("X is better/bigger than Y"): lon poka pi [Y] la [X] li pona mute OR [Y] li pona. taso [X] li pona mute.
- Standard pu additive numbers: ala (0), wan (1), tu (2), tu wan (3), tu tu (4), luka (5), luka luka (10), mute (20), ale (100). Combine additively (e.g., 27 = mute luka tu, 12 = luka luka tu).

VERIFIED FEW-SHOT TRAINING EXAMPLES:
"الله أكبر" -> {"toki_pona": "sewi li suli nanpa wan!", "literal_breakdown": "The-Divine is great number-one!", "grammar_note_ar": "تُبنى صيغة التفضيل المطلقة (أكبر/الأعظم) بإضافة (nanpa wan) بعد الصفة (suli)."}
"الصبر مفتاح الفرج" -> {"toki_pona": "awen pona lon tenpo ike li open e tenpo pona.", "literal_breakdown": "Good endurance in bad times opens good times.", "grammar_note_ar": "فُكّكت كلمة (الصبر) إلى الثبات الجيد في الشدة (awen pona lon tenpo ike) وفُصل الخبر الفعلي بـ (li) والمفعول به بـ (e)."}
"هذا الكتاب أفضل من ذلك الكتاب" -> {"toki_pona": "lon poka pi lipu ante ni la lipu ni li pona mute.", "literal_breakdown": "Beside that other book (la), this book is very good.", "grammar_note_ar": "صيغت المقارنة باستخدام إطار السياق (lon poka pi... la) لأن توكي بونا لا تملك صيغة أفعل التفضيل المباشرة."}
"العلم أفضل من المال" -> {"toki_pona": "mani li pona. taso sona li pona mute.", "literal_breakdown": "Money is good. However, knowledge is very good.", "grammar_note_ar": "أسلوب المقارنة الكلاسيكي عبر جملتين متقابلتين بأداة الاستدراك (taso)."}
"اشتريت سبعة وعشرين كتاباً" -> {"toki_pona": "mi esun e lipu mute luka tu.", "literal_breakdown": "I bought books twenty-five-two (27).", "grammar_note_ar": "في نظام الأعداد القياسي يُجمع 20 (mute) + 5 (luka) + 2 (tu)، وتُحذف (li) بعد الفاعل المفرد (mi)."}
"لا تحزن إن الله معنا" -> {"toki_pona": "o pilin ike ala. sewi li lon poka mi mute.", "literal_breakdown": "Do not feel bad. The-Divine is beside us.", "grammar_note_ar": "أداة النهي والأمر (o) في بداية الجملة الطلبية، و(mi mute) تعني نحن."}
"الذكاء الاصطناعي" -> {"toki_pona": "sona ilo", "literal_breakdown": "Machine / tool intelligence", "grammar_note_ar": "تُركب من المعرفة (sona) والآلة أو التقنية (ilo)."}
"أين تسكن؟" -> {"toki_pona": "sina lon tomo seme?", "literal_breakdown": "You are at which house?", "grammar_note_ar": "السؤال في توكي بونا يتم بوضع أداة الاستفهام (seme) مكان الشيء المجهول دون تغيير ترتيب الجملة."}
"الإسلام دين السلام والصبر" -> {"toki_pona": "nasin sewi li nasin pi pona pilin en awen pona.", "literal_breakdown": "The sacred way is the way of peace of heart and good endurance.", "grammar_note_ar": "فُكك الإسلام إلى (nasin sewi) والسلام إلى (pona pilin) والصبر إلى (awen pona) واستُخدمت (pi) لتجميع المضاف إليه المركب."}
"الحمد لله رب العالمين" -> {"toki_pona": "pona tawa sewi pi ma ale a!", "literal_breakdown": "Goodness unto the divine of all reality!", "grammar_note_ar": "عبارة حمد واستحسان عبر تقديم الشكر والثناء (pona tawa) للمصدر الإلهي (sewi pi ma ale)."}
"بسم الله الرحمن الرحيم" -> {"toki_pona": "lon nimi pi sewi pi pilin olin.", "literal_breakdown": "In the name of the divine of loving-compassion.", "grammar_note_ar": "استخدام حرف الجر (lon) للظرفية مع (nimi) وتخصيص الصفة الإلهية بـ (pi pilin olin)."}
"السلام عليكم ورحمة الله" -> {"toki_pona": "olin en pona en sewi li lon sina.", "literal_breakdown": "Love and goodness and the-divine are with you.", "grammar_note_ar": "التحية بربط الفضائل بحرف العطف (en) وجعلها فاعلاً مركباً ثم الخبر بـ (lon sina)."}
"القرآن كتاب الله الهادي" -> {"toki_pona": "lipu sewi li lipu pi toki sewi li pana e nasin pona.", "literal_breakdown": "The sacred document is the document of divine speech and gives the good path.", "grammar_note_ar": "عطف خبرين فعليين للمبتدأ نفسه بتكرار أداة الفصل (li)."}
"المسجد مكان جميل للصلاة" -> {"toki_pona": "tomo sewi li tomo pona tawa toki sewi.", "literal_breakdown": "The sacred building is a good building for divine talk.", "grammar_note_ar": "تركيب المسجد من (tomo sewi) وحرف الجر (tawa) لبيان الغاية والمقصد."}
"صوم رمضان يطهر الجسد والروح" -> {"toki_pona": "tenpo pi moku ala li pona e sijelo e kon insa.", "literal_breakdown": "The time of no eating improves the body and the inner spirit.", "grammar_note_ar": "عطف المفعولين المباشرين بتكرار أداة المفعولية (e)." }
"إن مع العسر يسرا" -> {"toki_pona": "tenpo ike la tenpo pona li kama.", "literal_breakdown": "In bad times (la), good times arrive.", "grammar_note_ar": "استخدام (la) لربط الجملة الشرطية أو الظرفية بجملة النتيجة."}
"العلم نور والجهل ظلام" -> {"toki_pona": "sona li suno. sona ala li pimeja.", "literal_breakdown": "Knowledge is light. Lack of knowledge is darkness.", "grammar_note_ar": "جملتان اسميتان متوازيتان، ونفي المعرفة بـ (sona ala) للتعبير عن الجهل."}
"أنا أحب عائلتي كثيراً" -> {"toki_pona": "mi olin mute e kulupu mama mi.", "literal_breakdown": "I love very-much the family group of mine.", "grammar_note_ar": "حذف (li) لأن الفاعل (mi) مفرد، واستخدام ظرف الشدة (mute) والمفعول به بـ (e)."}
"أبي وأمي يعيشان في المغرب" -> {"toki_pona": "mama mije en mama meli mi li lon ma Mokale.", "literal_breakdown": "Father and mother mine are in Morocco.", "grammar_note_ar": "الاسم العلم مسبوق باسم الجنس (ma) ومحوّل صوتياً لقواعد لغة توكي بونا (ma Mokale)."}
"هو أسرع عداء في المدينة" -> {"toki_pona": "ona li tawa wawa nanpa wan lon tomo suli.", "literal_breakdown": "He moves energetically number-one in the big city.", "grammar_note_ar": "صيغة التفضيل القصوى عبر (tawa wawa nanpa wan)."}
"أخي أكبر مني بخمس سنوات" -> {"toki_pona": "lon poka mi la jan sama mi li suli kepeken tenpo sike luka.", "literal_breakdown": "Beside me (la), my sibling is elder by five cyclic times (years).", "grammar_note_ar": "سياق المقارنة بـ (la) وتحديد الفارق بالأداة (kepeken) والسنوات بـ (tenpo sike)."}
"الإنترنت شبكة عالمية لتبادل المعلومات" -> {"toki_pona": "linja ilo li pana e sona tawa ma ale.", "literal_breakdown": "The machine-network gives knowledge to the whole world.", "grammar_note_ar": "تجريد مفهوم الإنترنت لشبكة الآلات الناقلة للمعرفة للعالم بأسره."}
"الهاتف المحمول أداة مفيدة" -> {"toki_pona": "ilo toki lili li ilo pona.", "literal_breakdown": "The small speech-tool is a good tool.", "grammar_note_ar": "وصف الهاتف بـ (ilo toki lili) والخبر الاسمي مفصول بـ (li)."}
"الطبيب يعالج المرضى بالأدوية" -> {"toki_pona": "jan misikeke li pona e jan ike kepeken misikeke.", "literal_breakdown": "The medicine-person heals sick people using medicine.", "grammar_note_ar": "استخدام (kepeken) كحرف جر للأداة والوسيلة (بالدواء)."}
"سافرت بالطائرة إلى تونس" -> {"toki_pona": "mi tawa ma Tunisi kepeken tomo tawa kon.", "literal_breakdown": "I moved to Tunisia using the air-moving-structure.", "grammar_note_ar": "الطائرة (tomo tawa kon) والبلد (ma Tunisi) مسبوق باسم المكان."}
"أريد أن أشرب ماءً بارداً" -> {"toki_pona": "mi wile moku e telo lete.", "literal_breakdown": "I want to ingest cold water.", "grammar_note_ar": "استخدام الفعل المساعد (wile) متبوعاً بالفعل الأساسي (moku) والمفعول به (e telo lete)."}
"هل تتحدث اللغة العربية؟" -> {"toki_pona": "sina ken ala ken toki e toki Alapi?", "literal_breakdown": "Can you not can speak the Arabic language?", "grammar_note_ar": "صيغة الاستفهام بنمط (فعل ala فعل) للتخيير (ken ala ken)."}
"كم ثمن هذه التفاحة؟" -> {"toki_pona": "kili ni li jo e mani seme?", "literal_breakdown": "This fruit has what money?", "grammar_note_ar": "السؤال عن الثمن بوضع أداة الاستفهام (seme) بعد كلمة (mani)."}
"الشمس تشرق في الصباح وتغيب في المساء" -> {"toki_pona": "tenpo suno open la suno li kama. tenpo pimeja la ona li weka.", "literal_breakdown": "At opening time, sun arrives. At night time, it goes away.", "grammar_note_ar": "جملتان متعاطفتان بإطار زمني (la) يصف الشروق والغروب بطريقة بصرية."}
"الصدق ينجي صاحبه" -> {"toki_pona": "toki lon li awen e jan ona.", "literal_breakdown": "True speech protects/preserves its person.", "grammar_note_ar": "التعبير عن الصدق بـ (toki lon) والنجاة بالحفظ والأمان (awen)."}
"المستقبل جميل لمن يعمل بجد" -> {"toki_pona": "jan li pali wawa la tenpo kama li pona tawa ona.", "literal_breakdown": "If a person works hard (la), the coming time is pleasant to them.", "grammar_note_ar": "صياغة المفهوم كشرط سببي باستخدام أداة السياق (la)."}
"النظافة من الإيمان" -> {"toki_pona": "selo jaki ala li lon nasin pi pilin sewi.", "literal_breakdown": "Unclean-less outer-state belongs to the divine faith path.", "grammar_note_ar": "تفكيك النظافة لغياب القذارة (jaki ala) وربطها بنهج الإيمان."}
"العدل أساس الملك" -> {"toki_pona": "nasin pi pona mute tawa jan ale li lawa e ma pona.", "literal_breakdown": "The way of great fairness to all people guides the good nation.", "grammar_note_ar": "تفكيك العدل إلى حسن المعاملة لكل الناس واستقرار الحكم بـ (lawa e ma pona)."}
"الصداقة الحقيقية كنز ثمين" -> {"toki_pona": "jan pona lon li ijo mani suli a.", "literal_breakdown": "A true good friend is a great treasure indeed.", "grammar_note_ar": "استخدام توكيد المشاعر بالحرف الانفعالي (a) في نهاية الجملة."}
"لا تؤجل عمل اليوم إلى الغد" -> {"toki_pona": "o pali e pali lon tenpo ni. o awen ala e ona tawa tenpo suno kama.", "literal_breakdown": "Do work in this time. Do not delay it toward the coming day.", "grammar_note_ar": "جملتان طلبيتان بـ (o) للنصح والحث على المبادرة وتجنب التسويف."}
"الماء سر الحياة" -> {"toki_pona": "telo li lon e ale.", "literal_breakdown": "Water gives reality to everything.", "grammar_note_ar": "الفعل (lon) متعدياً بـ (e) يفيد الإيجاد والإحياء."}
"الكتب أوفى الأصدقاء" -> {"toki_pona": "lipu sona li jan pona wawa nanpa wan.", "literal_breakdown": "Knowledge books are number-one strong friends.", "grammar_note_ar": "تشبيه مجازي كلاسيكي وتفضيل مطلق بـ (nanpa wan)."}
"القوة في الاتحاد" -> {"toki_pona": "kulupu wan la wawa li lon.", "literal_breakdown": "In a united group (la), strength exists.", "grammar_note_ar": "إطار ظرفي بـ (la) لربط الاتحاد بالقدرة والقوة."}
"من جد وجد" -> {"toki_pona": "sina pali wawa la sina kama jo e ijo wile.", "literal_breakdown": "If you work hard (la), you obtain desired things.", "grammar_note_ar": "مثل سائر مبني بأسلوب الشرط المنطقي في توكي بونا."}
"رحلة الألف ميل تبدأ بخطوة" -> {"toki_pona": "tawa suli ale li open kepeken noka wan.", "literal_breakdown": "Every big journey opens using one footstep.", "grammar_note_ar": "تعبير مجازي عن البدايات الصغيرة للأعمال الكبرى."}

OUTPUT SCHEMA:
Return ONLY valid JSON matching this exact structure:
{
  "toki_pona": "...",
  "literal_breakdown": "...",
  "grammar_note_ar": "..."
}`;

// Helper: validate Toki Pona words according to strict rules
export function validateTokiPona(tokiPonaText: string): { valid: boolean; invalidWords: string[] } {
  if (!tokiPonaText || typeof tokiPonaText !== "string") {
    return { valid: false, invalidWords: ["<empty>"] };
  }

  // Tokenize words, stripping punctuation
  const cleanTokens = tokiPonaText
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'<>]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

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
      // Must be preceded by an allowed head noun (jan, ma, toki, kulupu, tomo, ilo)
      const prevToken = i > 0 ? cleanTokens[i - 1].toLowerCase() : "";
      const validHeadNouns = new Set(["jan", "ma", "toki", "kulupu", "tomo", "ilo", "lipu", "nasin"]);
      
      // Also verify phonology: only letters [aeijklmnopstuw] and no forbidden clusters (ji, ti, wo, wu)
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

// Helper: Call Gemini models with retry cascade
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
    },
  };

  for (const model of candidateModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return text;
        }
      } else {
        console.warn(`Model ${model} returned status ${res.status}`);
      }
    } catch (err) {
      console.warn(`Invocation of model ${model} failed:`, err);
    }
  }

  throw new Error("All candidate Gemini models failed to return a valid response.");
}

function parseGeminiOutput(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    return {
      toki_pona: raw.trim(),
      literal_breakdown: "",
      grammar_note_ar: "",
    };
  }
}

Deno.serve(async (req: Request) => {
  // CORS Preflight
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
    const primaryPrompt = `Translate the following sentence into authentic Toki Pona ${langContext}:\n"${cleanText}"`;

    // First attempt
    let rawResult = await callGemini(apiKey, SYSTEM_INSTRUCTION, primaryPrompt);
    let parsedResult = parseGeminiOutput(rawResult);

    // Server-Side Strict Vocabulary Validation
    let validation = validateTokiPona(parsedResult.toki_pona);

    // If validation fails, initiate automatic server-side retry loop
    if (!validation.valid) {
      console.warn("Validation failed for first attempt. Invalid words:", validation.invalidWords);

      const correctionPrompt = `CRITICAL CORRECTION REQUIRED:
Your previous translation: "${parsedResult.toki_pona}"
contained unauthorized or forbidden non-pu/ku words: [${validation.invalidWords.join(", ")}].
Remember the absolute rules:
1. Every lowercase word MUST belong strictly to the 137 official Toki Pona words.
2. NEVER use phonetic transliterations like Isilan, Kulan, Ala, Lamatan, etc. Decompose them into pure pu semantic circumlocutions! (e.g., Islam -> nasin sewi, Muslim -> jan pi nasin sewi, Quran -> lipu sewi, Allah -> sewi, fasting -> tenpo pi moku ala).
3. Do not invent foreign words.

Please re-translate the original sentence:
"${cleanText}"

Return strictly the valid JSON object with keys: "toki_pona", "literal_breakdown", "grammar_note_ar".`;

      try {
        const retryRaw = await callGemini(apiKey, SYSTEM_INSTRUCTION, correctionPrompt);
        const retryParsed = parseGeminiOutput(retryRaw);
        const retryValidation = validateTokiPona(retryParsed.toki_pona);

        if (retryValidation.valid) {
          parsedResult = retryParsed;
        } else {
          console.warn("Retry attempt still contained invalid words:", retryValidation.invalidWords);
          // Clean any remaining illegal words by falling back or filtering
          parsedResult = retryParsed;
        }
      } catch (retryErr) {
        console.error("Retry attempt failed:", retryErr);
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
