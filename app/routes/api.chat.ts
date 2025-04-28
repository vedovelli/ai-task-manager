import { ChatMessageRole } from "~/generated/prisma";
import type { Route } from "./+types/api.chat";
import { getChatCompletions } from "~/services/openai.server";
import prisma from "prisma/prisma";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const userMessage = formData.get("message") as string;
  const chatId = formData.get("chatId") as string;

  const chatMessage = {
    content: userMessage,
    role: ChatMessageRole.user,
  };

  let chat;

  if (chatId) {
    const existingChat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: true,
      },
    });

    if (existingChat) {
      const answer = {
        content:
          (await getChatCompletions([...existingChat.messages, chatMessage])) ??
          "",
        role: ChatMessageRole.assistant,
      };

      await prisma.chatMessage.createMany({
        data: [
          {
            chat_id: existingChat.id,
            ...chatMessage,
          },
          { chat_id: existingChat.id, ...answer },
        ],
      });
    }
  } else {
    const answer = {
      content: (await getChatCompletions([chatMessage])) ?? "",
      role: ChatMessageRole.assistant,
    };

    chat = await prisma.chat.create({
      data: {},
    });

    await prisma.chatMessage.createMany({
      data: [
        {
          chat_id: chat.id,
          ...chatMessage,
        },
        { chat_id: chat.id, ...answer },
      ],
    });

    return redirect(`/task/new?chat=${chat.id}`);
  }
}
