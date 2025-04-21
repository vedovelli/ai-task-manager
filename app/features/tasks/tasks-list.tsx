import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { Button } from "~/components/ui/button";
import type { loader } from "~/routes/tasks";
import { useLoaderData } from "react-router";

export function TasksList() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <div className=" p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[150px]">Data de Entrega</TableHead>
            <TableHead className="w-[100px]">Estimativa</TableHead>
            <TableHead className="w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell className="w-[400px] max-w-[400px] truncate text-ellipsis overflow-hidden">
                {task.description}
              </TableCell>
              <TableCell>
                {new Date(task.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{task.estimated_time}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title="Edit task"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    title="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
