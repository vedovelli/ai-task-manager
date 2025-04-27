import type { Route } from "./+types/api.chat";
import { getChatCompletions } from "~/services/openai.server";
import prisma from "prisma/prisma";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const userMessage = formData.get("message") as string;
  const chatId = formData.get("chatId") as string;

  const chatMessage = {
    id: Date.now().toFixed(),
    content: userMessage,
    role: "user" as const,
    timestamp: new Date(),
  };

  let chat;

  if (chatId) {
    const existingChat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (existingChat) {
      const existingMessages = JSON.parse(existingChat.content);

      const answer = {
        id: Date.now().toFixed(),
        content: await getChatCompletions([chatMessage]),
        role: "assistant" as const,
        timestamp: new Date(),
      };

      chat = await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          content: JSON.stringify([...existingMessages, chatMessage, answer]),
        },
      });
    }
  } else {
    const answer = {
      id: Date.now().toFixed(),
      content: await getChatCompletions([chatMessage]),
      role: "assistant" as const,
      timestamp: new Date(),
    };

    chat = await prisma.chat.create({
      data: {
        content: JSON.stringify([chatMessage, answer]),
      },
    });
    return redirect(`/task/new?chat=${chat.id}`);
  }
}
