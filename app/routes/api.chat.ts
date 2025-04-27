import type { Route } from "./+types/api.chat";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  console.log(Object.fromEntries(formData.entries()));

  return null;
}
