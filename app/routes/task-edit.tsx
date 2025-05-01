import type { Route } from "./+types/task-edit";
import { TaskForm } from "~/features/tasks/tasks-form";
import prisma from "prisma/prisma";
import { redirect } from "react-router";

const prepareListData = (str: string) =>
  JSON.stringify(str ? str.split("\n").filter(Boolean) : []);

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const task_id = formData.get("task_id") as string;
  formData.delete("task_id");

  try {
    const taskData = {
      chat_message_id: null,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      estimated_time: formData.get("estimated_time") as string,
      steps: prepareListData(formData.get("steps") as string),
      suggested_tests: prepareListData(
        formData.get("suggested_tests") as string
      ),
      acceptance_criteria: prepareListData(
        formData.get("acceptance_criteria") as string
      ),
      implementation_suggestion: formData.get(
        "implementation_suggestion"
      ) as string,
    };

    await prisma.task.update({
      where: {
        id: task_id,
      },
      data: taskData,
    });

    return { success: true };
  } catch (error) {
    console.log(error);

    return { success: false };
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const task = await prisma.task.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!task) {
    return redirect("/tasks");
  }

  return { task };
}

export default function () {
  return <TaskForm />;
}
