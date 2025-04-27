import type { ChatMessage } from "~/features/tasks/types";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["OPENAI_KEY"],
});

export async function getChatCompletions(messages: ChatMessage[]) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages,
  });

  return completion.choices[0].message.content;
}
