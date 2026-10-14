/**
 * Joe's AI Portfolio Assistant
 * Built with dual-mode hybrid intelligence:
 * 1. Online mode via /api/chat (OpenAI LLM)
 * 2. Instant client-side NLP knowledge engine for 100% offline/static uptime
 */

(function () {
  // Knowledge Base & Smart Fallback Engine
  function getLocalSmartReply(message) {
    const query = (message || "").toLowerCase().trim();
    const isArabic = /[\u0600-\u06FF]/.test(query);

    // Intent 1: Can Joe make me a website / build / freelance / hire
    if (
      query.match(/\b(website|web site|make|build|create|hire|freelance|client|work|job|service|landing|portfolio|contract)\b/i) ||
      query.match(/(موقع|ويب|تصميم|برمجة|شغل|خدمة|فريلانس|عمل|تعمل|تسوي|تبني)/)
    ) {
      if (isArabic) {
        return "نعم بكل تأكيد! يوسف (جو) متخصص في تصميم وتطوير المواقع وتطبيقات الويب الحديثة والمتجاوبة (Responsive) باستخدام React.js و Tailwind CSS.\n\nيسعده جداً العمل على مشروعك! يمكنك التواصل معه مباشرة عبر البريد الإلكتروني yousseffiras444@gmail.com أو الهاتف/واتساب +20 01093211284 لمناقشة التفاصيل والأسعار.";
      }
      return "Yes, absolutely! Joe (Youssef Firas) specializes in designing and building custom, high-performance websites, landing pages, and responsive web applications using React.js and Tailwind CSS.\n\nHe is actively available for freelance projects and contract work. You can reach him directly at yousseffiras444@gmail.com or call/WhatsApp +20 01093211284 to discuss your requirements, timeline, and pricing!";
    }

    // Intent 2: Projects
    if (
      query.match(/\b(project|projects|built|portfolio|work|app|resume|planner|solar|demo)\b/i) ||
      query.match(/(مشاريع|مشروع|اعمال|شغل|نماذج)/)
    ) {
      if (isArabic) {
        return "إليك أبرز مشاريع يوسف (جو):\n• AI Resume Analyzer: أداة ذكية لتحليل وتحسين السير الذاتية (React, Tailwind CSS) - https://resume-analyzer-pi-coral.vercel.app/\n• Study Planner App: تطبيق لتنظيم جداول المذاكرة والمهام (React, React Router, Tailwind CSS) - https://study-planner-joe.vercel.app/\n• 3D Solar System: محاكاة تفاعلية ثلاثية الأبعاد للمجموعة الشمسية (React, Three.js, Tailwind CSS) - https://solar-system-joe.vercel.app/\n\nيمكنك أيضاً استعراض قسم Projects في الصفحة لتجربة هذه المشاريع مباشرة!";
      }
      return "Here are Joe's featured projects:\n• **AI Resume Analyzer**: Intelligent tool to analyze and optimize resumes (React & Tailwind CSS) — https://resume-analyzer-pi-coral.vercel.app/\n• **Study Planner App**: Productivity app for student scheduling and task management (React, React Router, Tailwind CSS) — https://study-planner-joe.vercel.app/\n• **3D Solar System**: Interactive 3D simulation of planets (React, Three.js, Tailwind CSS) — https://solar-system-joe.vercel.app/\n\nYou can explore live demos directly in the Projects section above!";
    }

    // Intent 3: Skills / Technologies
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
      return "You can get in touch with Joe directly through:\n• **Email**: yousseffiras444@gmail.com\n• **Phone / WhatsApp**: +20 01093211284\n• **Location**: Cairo, Egypt\n\nFeel free to reach out anytime to discuss new projects, freelance contracts, or job opportunities!";
    }

    // Intent 5: Pricing / Cost / Budget
    if (
      query.match(/\b(price|pricing|cost|rate|rates|quote|budget|how much|fee)\b/i) ||
      query.match(/(سعر|اسعار|تكلفة|بكام|كم يكلف|فلوس)/)
    ) {
      if (isArabic) {
        return "تعتمد التكلفة على متطلبات المشروع، عدد الصفحات، والميزات المطلوبة (مثل موقع تعريفي بسيط مقابل تطبيق ويب تفاعلي كامل).\n\nأرسل تفاصيل مشروعك إلى yousseffiras444@gmail.com أو عبر واتساب للحصول على تقدير سعر سريع ومناسب لميزانيتك!";
      }
      return "Pricing depends on the scope, features, and timeline of your project (e.g., a sleek landing page vs. a full dynamic web app).\n\nSend a brief note with what you need to yousseffiras444@gmail.com or WhatsApp (+20 01093211284) to get a free estimate tailored to your budget!";
    }

    // Intent 6: Who is Joe / Background / Education
    if (
      query.match(/\b(who|about|joe|youssef|background|education|degree|school|experience|bio)\b/i) ||
      query.match(/(مين|من هو|عن|تعليم|دراسة|شهادة|خبرة)/)
    ) {
      if (isArabic) {
        return "يوسف فراس (المعروف بـ جو) هو مطور واجهات أمامية (Frontend Developer) مقيم في القاهرة، مصر. خريج برنامج تطوير الواجهات بالمركز الثقافي الروسي بالقاهرة (2025). يركز على بناء مواقع وتطبيقات ويب سريعة، جذابة، وعالية الكفاءة.";
      }
      return "Joe (Youssef Firas) is a Frontend Developer based in Cairo, Egypt. He completed the Front-End Development Program at the Russian Culture Center in Cairo (2025) and builds clean, modern, accessible web interfaces.";
    }

    // Intent 7: Greetings
    if (
      query.match(/\b(hi|hello|hey|greetings|morning|evening|sup|yo|welcome)\b/i) ||
      query.match(/(اهلا|مرحبا|سلام|صباح|مساء|هاي)/)
    ) {
      if (isArabic) {
        return "أهلاً بك! 👋 أنا المساعد الذكي الخاص بيوسف (جو). يسعدني مساعدتك في الإجابة عن خدماته، مشاريعه، مهاراته، وإمكانية بناء موقع إلكتروني لك. كيف يمكنني مساعدتك؟";
      }
      return "Hello! 👋 I'm Joe's AI Assistant. I can tell you about Joe's web development services, recent projects, skills, and how he can build a website for you. How can I help you today?";
    }

    // Default Fallback
    if (isArabic) {
      return "أنا هنا لمساعدتك في كل ما يخص يوسف فراس (جو) وخدماته في تطوير المواقع وتطبيقات الويب! يمكنك سؤالي عن مشاريعه، مهاراته، أسعار المواقع، أو مراسلته مباشرة عبر yousseffiras444@gmail.com.";
    }
    return "I'm here to help with anything regarding Joe (Youssef Firas), his web development services, projects, and skills! You can ask if he can build a website for you, explore his portfolio, or contact him directly at yousseffiras444@gmail.com.";
  }

  // Safe HTML Formatter for markdown, links, and bold text
  function formatMessageText(text) {
    if (!text) return "";
    // Escape standard HTML
    let safe = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Markdown bold: **text**
    safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Markdown links: [title](url)
    safe = safe.replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>');

    // Standalone URLs: https://...
    safe = safe.replace(/(^|[^">])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2 ↗</a>');

    // Email addresses
    safe = safe.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, '<a href="mailto:$1">$1</a>');

    // Convert line breaks to <br>
    safe = safe.replace(/\n/g, "<br>");

    return safe;
  }

  // HTML Markup for Chatbot
  const chatbotDOM = `
    <div id="chatbot-launcher">
      <div class="chat-teaser" id="chat-teaser">
        <span>👋 Ask Joe's AI anything!</span>
        <button class="chat-teaser-close" id="chat-teaser-close" type="button" aria-label="Dismiss">&times;</button>
      </div>
      <button id="chatbot-toggle" type="button" aria-label="Open portfolio assistant" aria-expanded="false" aria-controls="chatbot">
        <span class="status-pulse-badge"></span>
        <svg class="toggle-icon" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
        <svg class="close-icon" viewBox="0 0 24 24" fill="none">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <section id="chatbot" role="dialog" aria-label="Joe's Portfolio AI Assistant" aria-modal="false" aria-hidden="true">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-header-avatar">🤖</div>
          <div class="chat-header-text">
            <h3>Joe's AI Assistant</h3>
            <p><span class="chat-online-dot"></span> Online &bull; Instant answers</p>
          </div>
        </div>
        <div class="chat-header-actions">
          <button id="chatbot-clear" class="chat-icon-btn" type="button" title="Clear chat history" aria-label="Clear chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
          <button id="chatbot-close" class="chat-icon-btn" type="button" title="Close chat" aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="chat-messages" id="chat-messages" aria-live="polite" aria-relevant="additions"></div>

      <div class="chat-suggestions" id="chat-suggestions" aria-label="Quick questions">
        <button class="suggestion-chip" type="button" data-question="Can Joe make me a website?">💼 Can Joe make me a website?</button>
        <button class="suggestion-chip" type="button" data-question="What projects has Joe built?">🚀 Show Joe's Projects</button>
        <button class="suggestion-chip" type="button" data-question="What technologies does Joe use?">⚡ Skills & Tech Stack</button>
        <button class="suggestion-chip" type="button" data-question="How can I contact or hire Joe?">📬 Contact & Hire</button>
      </div>

      <form class="chat-input-bar" id="chatbot-form">
        <input id="chatbot-input" type="text" maxlength="1000" placeholder="Ask about websites, projects, skills..." autocomplete="off" aria-label="Your message" required />
        <button id="chatbot-send" type="submit" aria-label="Send message">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
      <div class="chat-footer-badge">Youssef Firas (Joe) Portfolio AI &bull; Always Available</div>
    </section>
  `;

  document.body.insertAdjacentHTML("beforeend", chatbotDOM);

  // Element Selectors
  const chatWindow = document.getElementById("chatbot");
  const toggleButton = document.getElementById("chatbot-toggle");
  const closeButton = document.getElementById("chatbot-close");
  const clearButton = document.getElementById("chatbot-clear");
  const messagesContainer = document.getElementById("chat-messages");
  const input = document.getElementById("chatbot-input");
  const form = document.getElementById("chatbot-form");
  const sendButton = document.getElementById("chatbot-send");
  const teaser = document.getElementById("chat-teaser");
  const teaserClose = document.getElementById("chat-teaser-close");

  const conversationHistory = [];

  function addBubble(content, sender, isHTML = false) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    if (isHTML) {
      bubble.innerHTML = content;
    } else {
      bubble.textContent = content;
    }
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return bubble;
  }

  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "chat-bubble bot chat-typing";
    indicator.id = "chat-typing-indicator";
    indicator.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;
    messagesContainer.appendChild(indicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("chat-typing-indicator");
    if (indicator) indicator.remove();
  }

  async function sendMessage(question) {
    const text = (question || "").trim();
    if (!text || sendButton.disabled) return;

    // Add user message
    addBubble(text, "user");
    input.value = "";
    sendButton.disabled = true;
    input.disabled = true;

    const typingIndicator = showTypingIndicator();

    try {
      let replyText = "";

      // 1. Try sending to the backend /api/chat endpoint with timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: conversationHistory.slice(-8)
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json().catch(() => ({}));
          if (data && data.reply) {
            replyText = data.reply;
          }
        }
      } catch (err) {
        // Backend unavailable (offline, static hosting, or network error)
        console.warn("Backend API unavailable, switching to local smart engine:", err.message);
      }

      // 2. If backend didn't provide a reply, use the instant smart knowledge engine
      if (!replyText) {
        // Natural brief micro-delay to feel authentic
        await new Promise(r => setTimeout(r, 450));
        replyText = getLocalSmartReply(text);
      }

      removeTypingIndicator();

      // Format markdown & links safely
      const formattedHTML = formatMessageText(replyText);
      addBubble(formattedHTML, "bot", true);

      // Save history
      conversationHistory.push(
        { role: "user", content: text },
        { role: "assistant", content: replyText }
      );

    } catch (fatalError) {
      removeTypingIndicator();
      addBubble("I'm here to help! Feel free to ask about Joe's website services, projects, or email him at yousseffiras444@gmail.com.", "bot");
    } finally {
      sendButton.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  function setChatOpen(open) {
    chatWindow.classList.toggle("open", open);
    toggleButton.classList.toggle("open", open);
    chatWindow.setAttribute("aria-hidden", String(!open));
    toggleButton.setAttribute("aria-expanded", String(open));

    if (open) {
      if (teaser) teaser.style.display = "none";
      setTimeout(() => input.focus(), 150);
    } else {
      toggleButton.focus();
    }
  }

  // Reset/Clear Conversation
  function clearChat() {
    messagesContainer.innerHTML = "";
    conversationHistory.length = 0;
    showWelcomeMessage();
  }

  function showWelcomeMessage() {
    const welcome = `Hi! I'm **Joe's AI Assistant** 🤖\n\nI can tell you about Joe's frontend development services, featured projects, tech stack, or how he can build a website for you!\n\nWhat would you like to know?`;
    addBubble(formatMessageText(welcome), "bot", true);
  }

  // Event Listeners
  toggleButton.addEventListener("click", () => setChatOpen(!chatWindow.classList.contains("open")));
  closeButton.addEventListener("click", () => setChatOpen(false));
  clearButton.addEventListener("click", clearChat);

  form.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(input.value);
  });

  // Suggestion chips click
  document.querySelectorAll(".suggestion-chip").forEach(button => {
    button.addEventListener("click", () => {
      const q = button.getAttribute("data-question");
      sendMessage(q);
    });
  });

  // Teaser dismiss and click
  if (teaserClose) {
    teaserClose.addEventListener("click", (e) => {
      e.stopPropagation();
      teaser.style.display = "none";
    });
  }
  if (teaser) {
    teaser.addEventListener("click", () => {
      setChatOpen(true);
    });
    // Auto-show teaser after 2.5s
    setTimeout(() => {
      if (!chatWindow.classList.contains("open") && teaser) {
        teaser.style.display = "flex";
      }
    }, 2500);
  }

  // Escape key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWindow.classList.contains("open")) {
      setChatOpen(false);
    }
  });

  // Initial welcome message
  showWelcomeMessage();
})();
