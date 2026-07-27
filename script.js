const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Adds a new message bubble into the chat window.
function addMessage(content, messageType) {
  const message = document.createElement("div");
  message.classList.add("chat-message", messageType);
  message.innerHTML = content;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Creates a small animated loader for the response while waiting on the API.
function createLoadingBubble() {
  const loader = document.createElement("div");
  loader.classList.add("chat-message", "bot");
  loader.setAttribute("id", "loaderBubble");
  loader.innerHTML = `The clown is juggling your question <span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span>`;
  chatWindow.appendChild(loader);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return loader;
}

// Sends the user's text to the classroom proxy server using fetch().
// The response is parsed at data.choices[0].message.content and then displayed.
async function fetchChatbotReply(userText) {
  const endpoint = "https://vibe-proxy-gqv4.onrender.com/v1/chat/completions";

  const payload = {
    model: "class-chat-model",
    messages: [{ role: "user", content: userText }],
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk-vibe-summer-2026",
    },
    body: JSON.stringify(payload),
  });

  // If the fetch fails or returns a non-OK status, throw an error so we can show a message.
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Proxy error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();

  // Parse the response path exactly as requested.
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error("No reply found in the API response.");
  }

  return reply.trim();
}

// Handles the chat send action and updates the UI.
async function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(`<strong>You:</strong> ${text}`, "user");
  userInput.value = "";

  const loadingBubble = createLoadingBubble();

  try {
    const replyText = await fetchChatbotReply(text);
    loadingBubble.remove();
    addMessage(`<strong>Clown:</strong> ${replyText}`, "bot");
  } catch (error) {
    loadingBubble.remove();
    addMessage(`<strong>Clown:</strong> Oops! The clown dropped the ball. ${error.message}`, "bot");
  }
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
});

// Start the chat with a cheerful greeting message.
addMessage(
  `Hey superstar! Welcome to # CheerfulCharmingChattyCharleyDaComedianGoat. Type a question and the clown crew will send it through the circus brain before popping out a silly answer!`,
  "bot"
);
