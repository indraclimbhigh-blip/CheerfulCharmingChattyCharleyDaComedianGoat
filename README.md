# CheerfulCharmingChattyCharleyDaComedianGoat

A colorful, fun, and interactive clown-themed chatbot web app.

## What’s included

- `index.html`: clowny chat UI for # CheerfulCharmingChattyCharleyDaComedianGoat
- `styles.css`: bright red and yellow circus styling with a goofy clown background
- `script.js`: fetch-based AI logic using your classroom proxy server

## How to use

1. Open `index.html` in a browser.
2. Type a question into the text area.
3. Click **Send to the Clown** or press **Enter**.

## How it works

The app sends your text to the classroom proxy server at:

`https://vibe-proxy-gqv4.onrender.com/v1/chat/completions`

It uses these headers:

- `Content-Type: application/json`
- `Authorization: Bearer sk-vibe-summer-2026`

Then it parses the response at `data.choices[0].message.content` and displays it in the chat.
