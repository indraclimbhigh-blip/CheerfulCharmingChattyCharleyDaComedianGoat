# CheerfulCharmingChattyCharleyDaComedianGoat

A colorful, fun, and interactive comedian chatbot web app.

## What’s included

- `index.html`: modern chat UI for Charley the Chatty Comedian Goat
- `styles.css`: bright, playful styling with gradients and glassmorphism
- `script.js`: fetch-based AI logic using your classroom proxy server

## How to use

1. Open `index.html` in a browser.
2. Type a question into the text area.
3. Click **Send to Charley** or press **Enter**.

## How it works

The app sends your text to the classroom proxy server at:

`https://vibe-proxy-gqv4.onrender.com/v1/chat/completions`

It uses these headers:

- `Content-Type: application/json`
- `Authorization: Bearer sk-vibe-summer-2026`

Then it parses the response at `data.choices[0].message.content` and displays it in the chat.
