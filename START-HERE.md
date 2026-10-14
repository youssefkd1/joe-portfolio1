# Run and deploy the portfolio

## What you need

- Node.js installed on your computer
- An OpenAI API key (the assistant cannot answer until you add this)
- A Vercel account for online deployment

Keep your API key private. Never paste it into `index.html`, `chatbot.js`, or a public GitHub file.

## Run it on your computer

1. Open PowerShell or Terminal inside this folder.
2. Run `npx vercel dev`.
3. If prompted, allow Vercel to set up the local project.
4. Open the local address Vercel prints (usually `http://localhost:3000`).

If Vercel reports that `OPENAI_API_KEY` is missing, create a file named `.env.local` in this folder containing:

```text
OPENAI_API_KEY=your_real_api_key_here
```

Save the file and restart `npx vercel dev`. Do not share or upload `.env.local`.

## Put it online with Vercel

1. Upload this folder to a new private GitHub repository, or import an existing repository containing these files into Vercel.
2. In Vercel, open the project and choose **Settings → Environment Variables**.
3. Add `OPENAI_API_KEY` and paste your key as its value. Select the production environment (and preview if you want preview links to work).
4. Save the variable and redeploy the project.
5. Open the deployment URL and ask the assistant a question.

The OpenAI API is usage billed separately from Vercel hosting. Set usage limits in your OpenAI account if you want a spending cap.

## Files changed for the assistant

- `chatbot.js` and `chatbot.css`: the chat window on the page.
- `api/chat.js`: the secure server-side connection to OpenAI and the portfolio facts the assistant can use.
- `.gitignore`: keeps `.env.local` and Vercel files out of Git.

Update the portfolio facts in `api/chat.js` if your projects, skills, or contact details change. The existing contact form is visual only and does not send messages yet.
