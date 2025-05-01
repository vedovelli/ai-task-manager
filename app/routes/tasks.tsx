import { TasksList } from "~/features/tasks/tasks-list";
import prisma from "prisma/prisma";

export async function loader() {
  const tasks = await prisma.task.findMany({
    include: {
      chat_message: true,
    },
  });

  return { tasks };
}

export default function () {
  return <TasksList />;
}
