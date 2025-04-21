import { TasksList } from "~/features/tasks/tasks-list";

export async function loader() {
  return {};
}

export default function () {
  return <TasksList />;
}
