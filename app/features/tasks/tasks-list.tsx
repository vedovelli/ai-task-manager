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

export function TasksList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Status</TableHead>
            <TableHead className="w-[300px]">Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[150px]">Data de Entrega</TableHead>
            <TableHead className="w-[100px]">Prioridade</TableHead>
            <TableHead className="w-[120px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </TableCell>
            <TableCell className="font-medium">Project Planning</TableCell>
            <TableCell>Create initial project roadmap and timeline</TableCell>
            <TableCell>Apr 15, 2024</TableCell>
            <TableCell>High</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-slate-200" />
            </TableCell>
            <TableCell className="font-medium">Database Setup</TableCell>
            <TableCell>Configure and initialize PostgreSQL database</TableCell>
            <TableCell>Apr 16, 2024</TableCell>
            <TableCell>High</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </TableCell>
            <TableCell className="font-medium">API Documentation</TableCell>
            <TableCell>
              Write comprehensive API documentation using Swagger
            </TableCell>
            <TableCell>Apr 17, 2024</TableCell>
            <TableCell>Medium</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-slate-200" />
            </TableCell>
            <TableCell className="font-medium">User Authentication</TableCell>
            <TableCell>Implement JWT-based authentication system</TableCell>
            <TableCell>Apr 18, 2024</TableCell>
            <TableCell>High</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-slate-200" />
            </TableCell>
            <TableCell className="font-medium">UI Components</TableCell>
            <TableCell>Create reusable UI component library</TableCell>
            <TableCell>Apr 19, 2024</TableCell>
            <TableCell>Medium</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </TableCell>
            <TableCell className="font-medium">Testing Setup</TableCell>
            <TableCell>Configure Jest and React Testing Library</TableCell>
            <TableCell>Apr 20, 2024</TableCell>
            <TableCell>Low</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-slate-200" />
            </TableCell>
            <TableCell className="font-medium">CI/CD Pipeline</TableCell>
            <TableCell>Set up GitHub Actions workflow</TableCell>
            <TableCell>Apr 21, 2024</TableCell>
            <TableCell>Medium</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-slate-200" />
            </TableCell>
            <TableCell className="font-medium">
              Performance Optimization
            </TableCell>
            <TableCell>Implement code splitting and lazy loading</TableCell>
            <TableCell>Apr 22, 2024</TableCell>
            <TableCell>Low</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-slate-200" />
            </TableCell>
            <TableCell className="font-medium">Error Handling</TableCell>
            <TableCell>Implement global error boundary and logging</TableCell>
            <TableCell>Apr 23, 2024</TableCell>
            <TableCell>Medium</TableCell>
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
          <TableRow>
            <TableCell>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </TableCell>
            <TableCell className="font-medium">Deployment</TableCell>
            <TableCell>Configure production deployment on Vercel</TableCell>
            <TableCell>Apr 24, 2024</TableCell>
            <TableCell>High</TableCell>
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
        </TableBody>
      </Table>
    </div>
  );
}
