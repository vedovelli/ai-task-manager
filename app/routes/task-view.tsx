import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/task-view";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import prisma from "prisma/prisma";
import { redirect } from "react-router";

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

export default function ({ loaderData }: Route.ComponentProps) {
  const { task } = loaderData;
  // Defensive parsing for JSON fields
  let steps: string[] = [];
  let acceptanceCriteria: string[] = [];
  let suggestedTests: string[] = [];
  try {
    steps = JSON.parse(task.steps ?? "[]");
  } catch {}
  try {
    acceptanceCriteria = JSON.parse(task.acceptance_criteria ?? "[]");
  } catch {}
  try {
    suggestedTests = JSON.parse(task.suggested_tests ?? "[]");
  } catch {}

  return (
    <ScrollArea className="max-h-[calc(100vh-4rem)] p-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/tasks">Tarefas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{task.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl mb-1">{task.title}</CardTitle>
            <CardDescription>ID: {task.id}</CardDescription>
          </div>
          <Badge variant="secondary">{task.estimated_time}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div>
            <Label className="mb-1">Descrição</Label>
            <p className="text-base text-muted-foreground whitespace-pre-line bg-muted/40 rounded-md p-3 border mt-1">
              {task.description}
            </p>
          </div>
          {task.implementation_suggestion && (
            <div>
              <Label className="mb-1">Sugestão de Implementação</Label>
              <p className="text-sm text-muted-foreground whitespace-pre-line bg-muted/30 rounded-md p-3 border mt-1">
                {task.implementation_suggestion}
              </p>
            </div>
          )}
          <Separator />
          <Tabs defaultValue="steps" className="w-full">
            <TabsList>
              <TabsTrigger value="steps">Passos</TabsTrigger>
              <TabsTrigger value="acceptance">Critérios de Aceite</TabsTrigger>
              <TabsTrigger value="tests">Testes Sugeridos</TabsTrigger>
            </TabsList>
            <TabsContent value="steps">
              <ul className="list-decimal list-inside space-y-2 mt-2">
                {steps.length > 0 ? (
                  steps.map((step, i) => (
                    <li key={i} className="text-base text-foreground">
                      {step}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">
                    Nenhum passo cadastrado.
                  </li>
                )}
              </ul>
            </TabsContent>
            <TabsContent value="acceptance">
              <ul className="list-disc list-inside space-y-2 mt-2">
                {acceptanceCriteria.length > 0 ? (
                  acceptanceCriteria.map((criteria, i) => (
                    <li key={i} className="text-base text-foreground">
                      {criteria}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">
                    Nenhum critério cadastrado.
                  </li>
                )}
              </ul>
            </TabsContent>
            <TabsContent value="tests">
              <ul className="list-disc list-inside space-y-2 mt-2">
                {suggestedTests.length > 0 ? (
                  suggestedTests.map((test, i) => (
                    <li key={i} className="text-base font-mono text-foreground">
                      {test}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">
                    Nenhum teste sugerido.
                  </li>
                )}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-end text-xs text-muted-foreground">
          Criado em: {new Date(task.created_at).toLocaleString("pt-BR")}
          {task.updated_at && (
            <span className="ml-4">
              Atualizado em: {new Date(task.updated_at).toLocaleString("pt-BR")}
            </span>
          )}
        </CardFooter>
      </Card>
    </ScrollArea>
  );
}
