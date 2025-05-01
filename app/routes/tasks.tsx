import type { Route } from "./+types/tasks";
import { TasksList } from "~/features/tasks/tasks-list";
import prisma from "prisma/prisma";

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  await prisma.task.delete({
    where: {
      id: formData.get("task_id") as string,
    },
  });
}

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
