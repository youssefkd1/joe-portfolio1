# My Personal Portfolio

Welcome to my personal portfolio website! This project showcases my skills, experiences, projects, and achievements as a developer/designer. It serves as a digital resume and a hub for people to connect with me.

## 🚀 Live Demo
You can view the live website here: https://joe-portfolio1.vercel.app/

---

## ✨ Features
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens.
* **About Me:** A brief introduction to who I am and what I do.
* **Projects Showcase:** A curated list of my best work with links to code repositories and live demos.
* **Skills Section:** A visual display of the technologies and tools I master.
* **Contact Form:** A way for recruiters or collaborators to reach out to me directly.
* **AI Portfolio Assistant:** Answers visitor questions using the portfolio's project, skills, education, and contact details.

---

## 🛠️ Technologies Used
* **Frontend:** HTML5, CSS3, JavaScript (or mention frameworks like React/Vue if used)
* **Styling:** Tailwind CSS / Bootstrap (Optional)
* **Deployment:** GitHub Pages / Netlify / Vercel

---


## ⚙️ How to Run Locally

If you want to clone this project and run it on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   ```

## 🤖 AI assistant setup

The chat widget calls the Vercel serverless function in `api/chat.js`. It uses the OpenAI Responses API, and the API key is read only on the server; never add it to `index.html` or `chatbot.js`.

1. In the Vercel project settings, add `OPENAI_API_KEY` as an environment variable for the deployments you use, then redeploy.
2. Optionally set `OPENAI_MODEL` to a model enabled for your API project. The default is `gpt-4.1-mini`.
3. For local development, install the Vercel CLI, set `OPENAI_API_KEY` in your local environment (or an ignored `.env.local` file), and run `vercel dev`.

The assistant is grounded in the facts listed in `api/chat.js`. Update that context when portfolio details change. The assistant does not retain chat history after the browser session ends.
