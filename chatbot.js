const chatbotHTML = `
  <button id="chatbot-toggle" aria-label="Open chat">
    💬
  </button>

  <div id="chatbot" role="dialog" aria-label="Portfolio assistant">

    <div class="chat-header">
      <div>
        <h3>Joe's Assistant 🤖</h3>
        <p>Here to help you explore my portfolio</p>
      </div>

      <button id="chatbot-close" aria-label="Close chat">
        &times;
      </button>
    </div>

    <div class="chat-messages" id="chat-messages" aria-live="polite">
    </div>

    <div class="chat-suggestions">
      <button data-question="What projects has Joe built?">
        Projects
      </button>

      <button data-question="What skills does Joe have?">
        Skills
      </button>

      <button data-question="How can I contact Joe?">
        Contact
      </button>
    </div>

    <form class="chat-input" id="chatbot-form">
      <input
        id="chatbot-input"
        type="text"
        placeholder="Ask me something..."
        autocomplete="off"
        aria-label="Your message"
        required
      />

      <button id="chatbot-send" type="submit">
        Send
      </button>
    </form>

  </div>
`;

document.body.insertAdjacentHTML("beforeend", chatbotHTML);

const chatWindow = document.getElementById("chatbot");
const toggleButton = document.getElementById("chatbot-toggle");
const closeButton = document.getElementById("chatbot-close");
const messages = document.getElementById("chat-messages");
const input = document.getElementById("chatbot-input");
const form = document.getElementById("chatbot-form");

// Customize these answers to match the actual portfolio.
const answers = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response:
      "Hey! 👋 Welcome to Joe's portfolio. I can help you explore his projects, skills, and contact information."
  },
  {
    keywords: ["who are you", "who is joe", "about joe", "about him"],
    response:
      "Joe is a web developer who enjoys building creative and user-friendly web experiences. Explore the portfolio to learn more about his background."
  },
  {
    keywords: ["project", "projects", "work", "built", "portfolio"],
    response:
      'Joe has worked on projects including MovieRadar, CryptoEvent, Air Jordan, and BMW Car Slider. Visit the <a href="#projects" class="chat-link">projects section</a> to explore them.'
  },
  {
    keywords: ["skill", "skills", "technology", "technologies", "stack"],
    response:
      "Joe's portfolio highlights web development technologies including HTML, CSS, JavaScript, React, Tailwind CSS, Bootstrap, PHP, Laravel, and MySQL."
  },
  {
    keywords: ["contact", "email", "hire", "job", "reach", "message"],
    response:
      'Interested in working with Joe? Visit the <a href="#contact" class="chat-link">contact section</a> and send him a message.'
  },
  {
    keywords: ["experience", "experienced", "career"],
    response:
      "You can explore Joe's background and development journey in the About section of the portfolio."
  },
  {
    keywords: ["price", "pricing", "cost", "charge", "rate", "budget"],
    response:
      "For project pricing, please contact Joe directly with your requirements. He can discuss the scope and estimated cost."
  },
  {
    keywords: ["resume", "cv", "education", "study"],
    response:
      "You can explore the portfolio for more information about Joe's background and development journey. Contact Joe if you need additional details."
  },
  {
    keywords: ["thank", "thanks"],
    response:
      "You're welcome! 😊 Let me know if you need help finding anything else."
  },
  {
    keywords: ["bye", "goodbye"],
    response:
      "Thanks for visiting Joe's portfolio! Have a great day. 👋"
  }
];

function addMessage(text, sender, isHTML = false) {
  const message = document.createElement("div");

  message.className = `chat-message ${sender}`;

  if (isHTML) {
    message.innerHTML = text;
  } else {
    message.textContent = text;
  }

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function getAnswer(question) {
  const normalizedQuestion = question.toLowerCase().trim();

  for (const item of answers) {
    if (
      item.keywords.some(keyword =>
        normalizedQuestion.includes(keyword)
      )
    ) {
      return item.response;
    }
  }

  return "I'm not sure about that yet. Try asking about Joe's projects, skills, experience, or contact information.";
}

function sendMessage(question) {
  if (!question.trim()) return;

  addMessage(question, "user");

  const response = getAnswer(question);

  setTimeout(() => {
    addMessage(response, "bot", true);
  }, 300);
}

// Open and close
toggleButton.addEventListener("click", () => {
  chatWindow.classList.toggle("open");

  if (chatWindow.classList.contains("open")) {
    input.focus();
  }
});

closeButton.addEventListener("click", () => {
  chatWindow.classList.remove("open");
});

// Send messages
form.addEventListener("submit", event => {
  event.preventDefault();

  const question = input.value.trim();

  if (!question) return;

  sendMessage(question);
  input.value = "";
});

// Quick question buttons
document.querySelectorAll(".chat-suggestions button").forEach(button => {
  button.addEventListener("click", () => {
    sendMessage(button.dataset.question);
  });
});

// Welcome message
addMessage(
  "Hi there! 👋 I'm Joe's portfolio assistant. Ask me about projects, skills, or how to get in touch.",
  "bot"
);

// Navigate to portfolio sections
messages.addEventListener("click", event => {
  const link = event.target.closest(".chat-link");

  if (!link) return;

  const target = document.querySelector(link.getAttribute("href"));

  if (target) {
    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});