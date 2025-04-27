import type { ChatMessage } from "~/features/tasks/types";
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
    });

    if (!chat) {
      return redirect("/task/new");
    }

    messages = JSON.parse(chat?.content ?? "");
  }

  return {
    chatId,
    messages,
  };
}

export default function () {
  return <TasksChatbot />;
}
