import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export function TaskForm() {
  // Helper function to convert array to string
  const arrayToString = (arr: string[]) => arr.join("\n");

  // Sample data from JSON
  const sampleSteps = [
    "Criar um componente de formulário usando React",
    "Adicionar validação de campos usando uma biblioteca adequada",
    "Conectar backend para autenticação de usuários",
    "Persistir sessões usando SQLite",
    "Testar fluxo completo de login e logout",
  ];

  const sampleTests = [
    "it('deve renderizar o formulário de login corretamente')",
    "it('deve validar os campos de entrada')",
    "it('deve autenticar credenciais válidas')",
    "it('deve impedir acesso com credenciais inválidas')",
  ];

  const sampleCriteria = [
    "Formulário de login exibe corretamente com campos obrigatórios",
    "Entrada inválida é sinalizada corretamente",
    "Usuários válidos podem fazer login e manter uma sessão",
    "Usuários são redirecionados após login e logout",
  ];

  return (
    <form className="space-y-6 p-6">
      {/* Título */}
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          defaultValue="Formulário de Login Seguro com Autenticação"
        />
      </div>
      {/* Descrição */}
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          className="h-36"
          id="description"
          defaultValue="Implementar um formulário de login moderno com validação de campos, autenticação baseada em sessão e feedback de erro em tempo real."
        />
      </div>

      {/* Tempo Estimado */}
      <div className="space-y-2">
        <Label htmlFor="estimatedTime">Tempo Estimado</Label>
        <Input id="estimatedTime" defaultValue="2 dias" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Etapas */}
        <div className="space-y-2">
          <Label htmlFor="steps">Etapas</Label>
          <Textarea
            className="h-36"
            id="steps"
            rows={6}
            defaultValue={arrayToString(sampleSteps)}
          />
        </div>

        {/* Testes Sugeridos */}
        <div className="space-y-2">
          <Label htmlFor="suggestedTests">Testes Sugeridos</Label>
          <Textarea
            className="h-36"
            id="suggestedTests"
            rows={5}
            defaultValue={arrayToString(sampleTests)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Critérios de Aceitação */}
        <div className="space-y-2">
          <Label htmlFor="acceptanceCriteria">Critérios de Aceitação</Label>
          <Textarea
            className="h-36"
            id="acceptanceCriteria"
            rows={5}
            defaultValue={arrayToString(sampleCriteria)}
          />
        </div>

        {/* Sugestão de Implementação */}
        <div className="space-y-2">
          <Label htmlFor="implementationSuggestion">
            Sugestão de Implementação
          </Label>
          <Textarea
            className="h-36"
            id="implementationSuggestion"
            defaultValue="Utilizar React Hook Form para validação de entrada, Prisma ORM para gerenciar dados do usuário e configurar rotas protegidas usando React Router 7."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Salvar Tarefa</Button>
      </div>
    </form>
  );
}
