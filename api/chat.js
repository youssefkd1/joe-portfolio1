const fs = require("fs");
const path = require("path");

// Automatically load environment variables from .env.local or .env if present
function loadEnv() {
  if (process.env.OPENAI_API_KEY) return;
  const envFiles = [".env.local", ".env", ".env.example"];
  for (const file of envFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, "utf8");
        for (const line of content.split("\n")) {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match && !process.env[match[1]]) {
            const val = (match[2] || "").trim().replace(/^['"]|['"]$/g, "");
            process.env[match[1]] = val;
          }
        }
      } catch (e) {}
    }
  }
}
loadEnv();

const PORTFOLIO_CONTEXT = `You are the AI assistant on Youssef Firas's (known as Joe) personal portfolio website. Answer questions in a friendly, enthusiastic, and professional way, and use the portfolio facts below.

Portfolio Facts:
- Name: Youssef Firas (goes by Joe). Role: Frontend Developer based in Cairo, Egypt.
- Services & Availability: Yes, Joe builds custom websites, landing pages, responsive web applications, and frontend solutions for clients! He is actively available for freelance work, contract projects, and frontend developer roles.
- What he builds: High-performance, mobile-first responsive web interfaces, single-page applications (SPAs), and interactive 3D web experiences.
- Technologies: JavaScript (ES6+), React.js, React Router, HTML5, CSS3, Three.js (interactive 3D), Tailwind CSS, Bootstrap, Git, GitHub, Performance Optimization.
- Education: Front-End Development Program at Russian Culture Center, Cairo (2025).
- Languages: Arabic (native), English (B1 intermediate).
- Projects:
  1. AI Resume Analyzer (React, Tailwind CSS; https://resume-analyzer-pi-coral.vercel.app/)
  2. Study Planner App (React, React Router, Tailwind CSS; https://study-planner-joe.vercel.app/)
  3. 3D Solar System (React, Three.js, Tailwind CSS; https://solar-system-joe.vercel.app/)
- Contact & Pricing: For custom quotes, project timelines, and collaborations, visitors should contact him directly at yousseffiras444@gmail.com or +20 01093211284 (also #contact on the page).
- Do not claim the contact form sends messages: the page currently displays a form, but its backend behavior is not configured.

Instructions:
- Keep replies concise (2-4 sentences or short bullet points).
- If asked if Joe can make a website, enthusiastically confirm yes, explain what he builds, and invite them to email him for a quote.
- Match the visitor's language (Arabic or English).`;

// Built-in intelligent fallback knowledge engine
function getSmartFallbackReply(message) {
  const query = (message || "").toLowerCase().trim();
  const isArabic = /[\u0600-\u06FF]/.test(query);

  // Intent 1: Can Joe make a website / build / freelance / hire
  if (
    query.match(/\b(website|web site|make|build|create|hire|freelance|client|work|job|service|landing|portfolio|contract)\b/i) ||
    query.match(/(موقع|ويب|تصميم|برمجة|شغل|خدمة|فريلانس|عمل|تعمل|تسوي|تبني)/)
  ) {
    if (isArabic) {
      return "نعم بكل تأكيد! يوسف (جو) متخصص في تصميم وتطوير المواقع وتطبيقات الويب الحديثة والمتجاوبة (Responsive) باستخدام React.js و Tailwind CSS.\n\nيسعده جداً العمل على مشروعك! يمكنك التواصل معه مباشرة عبر البريد الإلكتروني yousseffiras444@gmail.com أو الهاتف/واتساب +20 01093211284 لمناقشة التفاصيل والأسعار.";
    }
    return "Yes, absolutely! Joe (Youssef Firas) specializes in designing and building custom, high-performance websites, landing pages, and responsive web applications using React.js and Tailwind CSS.\n\nHe is actively available for freelance projects and contract work. Get in touch directly at yousseffiras444@gmail.com or call/WhatsApp +20 01093211284 to discuss your project and get a quote!";
  }

  // Intent 2: Projects
  if (
    query.match(/\b(project|projects|built|portfolio|work|app|resume|planner|solar|demo)\b/i) ||
    query.match(/(مشاريع|مشروع|اعمال|شغل|نماذج)/)
  ) {
    if (isArabic) {
      return "إليك أبرز مشاريع يوسف (جو):\n• AI Resume Analyzer: أداة ذكية لتحليل وتحسين السير الذاتية (React, Tailwind CSS).\n• Study Planner App: تطبيق لتنظيم جداول المذاكرة والمهام (React, React Router, Tailwind CSS).\n• 3D Solar System: محاكاة تفاعلية ثلاثية الأبعاد للمجموعة الشمسية (React, Three.js, Tailwind CSS).\n\nيمكنك تجربة الروابط المباشرة للمشاريع من قسم Projects في الصفحة!";
    }
    return "Here are Joe's featured projects:\n• **AI Resume Analyzer**: Intelligent tool to analyze and optimize resumes (React & Tailwind CSS).\n• **Study Planner App**: Productivity app for student scheduling and task management (React, React Router, Tailwind CSS).\n• **3D Solar System**: Interactive 3D simulation of planets (React, Three.js, Tailwind CSS).\n\nYou can explore live demos directly in the Projects section above!";
  }

  // Intent 3: Skills / Tech Stack
  if (
    query.match(/\b(skill|skills|tech|stack|technologies|tools|languages|react|javascript|css|tailwind|three)\b/i) ||
    query.match(/(مهارات|تقنيات|لغات|فرونت|ادوات)/)
  ) {
    if (isArabic) {
      return "يوسف مطور واجهات أمامية متميز بالتقنيات التالية:\n• JavaScript (ES6+), React.js, React Router, HTML5, CSS3\n• Tailwind CSS, Bootstrap والتصميم المتجاوب لكافة الشاشات\n• Three.js (تجارب ثلاثية الأبعاد تفاعلية)\n• Git, GitHub، وتحسين سرعة وأداء المواقع.";
    }
    return "Joe is a Frontend Developer skilled in:\n• **Core**: JavaScript (ES6+), React.js, React Router, HTML5, CSS3\n• **Styling**: Tailwind CSS, Bootstrap, Responsive Mobile-First Design\n• **3D Web**: Three.js (Interactive 3D experiences)\n• **Workflow**: Git, GitHub, Performance Optimization & Clean Architecture";
  }

  // Intent 4: Contact / Hire / Phone / Email
  if (
    query.match(/\b(contact|email|phone|call|whatsapp|reach|location|address|where|hire|talk)\b/i) ||
    query.match(/(تواصل|ايميل|واتساب|هاتف|رقم|عنوان|مكان|موقعك)/)
  ) {
    if (isArabic) {
      return "يمكنك التواصل مع يوسف (جو) مباشرة:\n• البريد الإلكتروني: yousseffiras444@gmail.com\n• الهاتف / واتساب: +20 01093211284\n• الموقع: القاهرة، مصر\n\nوهو متواجد دائماً للرد على الاستفسارات ومناقشة المشاريع!";
    }
    return "You can get in touch with Joe directly through:\n• **Email**: yousseffiras444@gmail.com\n• **Phone / WhatsApp**: +20 01093211284\n• **Location**: Cairo, Egypt\n\nFeel free to reach out anytime for freelance projects or employment opportunities!";
  }

  // Intent 5: Pricing / Cost / Budget
  if (
    query.match(/\b(price|pricing|cost|rate|rates|quote|budget|how much|fee)\b/i) ||
    query.match(/(سعر|اسعار|تكلفة|بكام|كم يكلف|فلوس)/)
  ) {
    if (isArabic) {
      return "تعتمد التكلفة على متطلبات المشروع، عدد الصفحات، والميزات المطلوبة (مثل موقع تعريفي بسيط مقابل تطبيق ويب تفاعلي كامل).\n\nأرسل تفاصيل مشروعك إلى yousseffiras444@gmail.com أو عبر واتساب للحصول على تقدير سعر سريع ومناسب لميزانيتك!";
    }
    return "Pricing depends on the scope, design requirements, and features of your project (e.g. landing page vs. complete web app).\n\nSend a brief note with what you need to yousseffiras444@gmail.com or WhatsApp (+20 01093211284) to get a quick, tailored estimate!";
  }

  // Intent 6: Who is Joe / Background / Education
  if (
    query.match(/\b(who|about|joe|youssef|background|education|degree|school|experience|bio)\b/i) ||
    query.match(/(مين|من هو|عن|تعليم|دراسة|شهادة|خبرة)/)
  ) {
    if (isArabic) {
      return "يوسف فراس (المعروف بـ جو) هو مطور واجهات أمامية (Frontend Developer) مقيم في القاهرة، مصر. تخرج من برنامج تطوير الواجهات بالمركز الثقافي الروسي بالقاهرة (2025). يركز على بناء مواقع وتطبيقات ويب سريعة، جذابة، وعالية الكفاءة.";
    }
    return "Joe (Youssef Firas) is a Frontend Developer based in Cairo, Egypt. He completed the Front-End Development Program at the Russian Culture Center in Cairo (2025) and builds clean, modern, accessible web interfaces.";
  }

  // Intent 7: Greetings
  if (
    query.match(/\b(hi|hello|hey|greetings|morning|evening|sup|yo|welcome)\b/i) ||
    query.match(/(اهلا|مرحبا|سلام|صباح|مساء|هاي)/)
  ) {
    if (isArabic) {
      return "أهلاً بك! 👋 أنا المساعد الذكي الخاص بيوسف (جو). يسعدني مساعدتك في معرفة خدماته، مشاريعه، مهاراته، وإمكانية بناء موقع إلكتروني لك. كيف يمكنني مساعدتك؟";
    }
    return "Hello! 👋 I'm Joe's AI Assistant. I can tell you about Joe's web development services, recent projects, skills, and how he can build a website for you. How can I help you today?";
  }

  // Default
  if (isArabic) {
    return "أنا هنا لمساعدتك في كل ما يخص يوسف فراس (جو) وخدماته في تطوير المواقع وتطبيقات الويب! يمكنك سؤالي عن مشاريعه، مهاراته، أسعار المواقع، أو مراسلته مباشرة عبر yousseffiras444@gmail.com.";
  }
  return "I'm here to help with anything regarding Joe (Youssef Firas), his web development services, projects, and skills! You can ask if he can build a website for you, explore his portfolio, or contact him directly at yousseffiras444@gmail.com.";
}

module.exports = async function handler(req, res) {
  // Allow CORS for local dev / testing
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  if (!message || message.length > 1000) {
    return res.status(400).json({ error: "Please enter a question under 1,000 characters." });
  }

  const history = Array.isArray(req.body?.history)
    ? req.body.history.slice(-8).filter(item =>
        item && ["user", "assistant"].includes(item.role) &&
        typeof item.content === "string" && item.content.length <= 1000
      )
    : [];

  const apiKey = process.env.OPENAI_API_KEY;

  // If no OpenAI key is configured, respond with smart portfolio intelligence
  if (!apiKey) {
    const reply = getSmartFallbackReply(message);
    return res.status(200).json({ reply, source: "knowledge-engine" });
  }

  try {
    const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: PORTFOLIO_CONTEXT },
          ...history.map(item => ({ role: item.role, content: item.content })),
          { role: "user", content: message }
        ],
        max_tokens: 350,
        temperature: 0.7
      })
    });

    if (apiResponse.ok) {
      const data = await apiResponse.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (reply) {
        return res.status(200).json({ reply, source: "openai" });
      }
    }

    // If OpenAI returned 429 quota exhausted or other API error, use smart fallback gracefully
    console.warn(`OpenAI API returned status ${apiResponse.status}. Using smart fallback.`);
    const fallbackReply = getSmartFallbackReply(message);
    return res.status(200).json({ reply: fallbackReply, source: "smart-fallback" });

  } catch (error) {
    console.error("OpenAI call failed:", error.message);
    const fallbackReply = getSmartFallbackReply(message);
    return res.status(200).json({ reply: fallbackReply, source: "smart-fallback" });
  }
};
