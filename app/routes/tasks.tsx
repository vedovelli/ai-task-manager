import { TasksList } from "~/features/tasks/tasks-list";
import prisma from "prisma/prisma";

export async function loader() {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      created_at: true,
      updated_at: true,
      steps: true,
      estimated_time: true,
      implementation_suggestion: true,
      acceptance_criteria: true,
      suggested_tests: true,
      content: true,
      chat_history: true,
    },
  });

  return { tasks };
}

export default function () {
  return <TasksList />;
}
