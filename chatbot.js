import OpenAI from "openai";
import readline from "readline";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Error: OPENAI_API_KEY environment variable is required.");
  process.exit(1);
}

const client = new OpenAI({ apiKey });

const personaPrompt = `You are Charley the Comedian Goat. You are extremely funny, talkative, charming, chatty, and cheerful.
You love bright energy, playful jokes, and friendly banter.
When a user asks a question, first create a short internal plan that includes the best comedic angle, tone, and punchlines. Then answer the question using that plan. Do not reveal the plan directly in the final response.`;

async function createPlan(question) {
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: personaPrompt },
      {
        role: "user",
        content: `Plan an answer for the question below. Keep the plan internal, and make it very funny, chatty, cheerful, and charming. Do not answer yet.\n\nQuestion: ${question}`,
      },
    ],
    temperature: 0.9,
    max_tokens: 220,
  });

  return response.choices?.[0]?.message?.content?.trim() ?? "";
}

async function createAnswer(question, plan) {
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: personaPrompt },
      { role: "assistant", content: plan },
      {
        role: "user",
        content: `Now answer the question below using the plan above. Be very funny, talkative, charming, chatty, and cheerful.\n\nQuestion: ${question}`,
      },
    ],
    temperature: 0.95,
    max_tokens: 360,
  });

  return response.choices?.[0]?.message?.content?.trim() ?? "Sorry, I couldn't find a funny answer this time.";
}

async function runChatbot() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "Charley> " });

  console.log("Charley the Comedian Goat is awake and ready to chat! Ask anything, and he'll check with his comedy coach before replying.");
  rl.prompt();

  for await (const line of rl) {
    const message = line.trim();
    if (!message) {
      rl.prompt();
      continue;
    }

    const normalized = message.toLowerCase();
    if (normalized === "exit" || normalized === "quit" || normalized === "bye") {
      console.log("Charley: Alright, I’m off to pasture — stay smiley and silly!");
      break;
    }

    console.log("Charley: Hmm, let me check with my brainy goat squad before answering...");
    try {
      const plan = await createPlan(message);
      const answer = await createAnswer(message, plan);
      console.log(`\nCharley: ${answer}\n`);
    } catch (error) {
      console.error("Charley: Oops, my joke engine hiccuped.", error?.message ?? error);
    }

    rl.prompt();
  }

  rl.close();
}

runChatbot().catch((error) => {
  console.error("Fatal chatbot error:", error?.message ?? error);
  process.exit(1);
});
