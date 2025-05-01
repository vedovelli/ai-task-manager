import { ChatsList } from "~/features/tasks/chats-list";
import type { Route } from "./+types/chats";
import prisma from "prisma/prisma";

export async function loader() {
  const chats = await prisma.chat.findMany();
  return { chats };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  switch (formData.get("action")) {
    case "deleteChat":
      return deleteChat(formData);
    case "updateChat":
      return updateChat(formData);
  }
}

async function deleteChat(formData: FormData) {
  const chatId = formData.get("chat_id") as string;

  try {
    await prisma.chatMessage.deleteMany({
      where: {
        chat_id: chatId,
      },
    });

    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "" };
  }
}

async function updateChat(formData: FormData) {
  const chatId = formData.get("chat_id") as string;
  const title = formData.get("title") as string;

  if (!chatId) {
    return { success: false, error: "Dados inválidos" };
  }

  try {
    await prisma.chat.update({
      where: { id: chatId },
      data: { title },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "" };
  }
}

export default function () {
  return <ChatsList />;
}
