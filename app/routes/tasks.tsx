import { TasksList } from "~/features/tasks/tasks-list";
import { turso } from "~/turso";

export async function loader() {
  turso.execute(
    "INSERT INTO users (email, name, password_hash) VALUES ('fabio@vedovelli.com.br', 'Vedovelli', 'dasjdsakjd128912739812jhdsahdsajkhda')"
  );
  return {};
}

export default function () {
  return <TasksList />;
}
