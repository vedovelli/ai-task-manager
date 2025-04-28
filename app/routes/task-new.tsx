import type { ChatMessage } from "~/generated/prisma";
import type { Route } from "./+types/task-new";
import { TasksChatbot } from "~/features/tasks/tasks-chatbot";
import prisma from "prisma/prisma";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get("chat");

  let messages = [] as ChatMessage[];

  if (chatId) {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        messages: true,
      },
    });

    if (!chat) {
      return redirect("/task/new");
    }

    messages = chat.messages;
  }

  return {
    chatId,
    messages,
  };
}

export default function () {
  return <TasksChatbot />;
}
