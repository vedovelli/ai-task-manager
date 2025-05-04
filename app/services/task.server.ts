import { type Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { z } from "zod";
import { client } from "./chat.server";
import prisma from "prisma/prisma";

export const TaskInputSchema = z.object({
  title: z.string().nullable().optional(),
  description: z.string().optional(),
  estimated_time: z.string().optional(),
  steps: z.string().optional(),
  suggested_tests: z.string().optional(),
  acceptance_criteria: z.string().optional(),
  implementation_suggestion: z.string().optional(),
});

export type TaskData = z.infer<typeof TaskInputSchema>;

export async function storeTaskAsEmbeddings(
  taskId: string,
  taskData: TaskData
) {
  const parsed = TaskInputSchema.safeParse(taskData);

  if (!parsed.success) {
    console.error("Validation error:", parsed.error);
    return false;
  }

  const markdown = await taskToMarkdown(parsed.data);
  const chunks = await chunkMarkdownDocument(markdown);
  const embeddings = await createEmbeddingsFromDocuments(taskId, chunks);

  try {
    embeddings.forEach((e) => validateEmbedding(e.embedding));

    await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`DELETE FROM task_embeddings WHERE task_id = ${taskId}`;
      for (const e of embeddings) {
        await tx.$executeRawUnsafe(
          `INSERT INTO task_embeddings (task_id, chunk_content, embedding) VALUES (?, ?, ?)`,
          taskId,
          e.chunk_content,
          JSON.stringify(e.embedding)
        );
      }
    });
    return true;
  } catch (error) {
    // Log error securely
    console.error("Failed to store embeddings", error);
    return false;
  }
}

function validateEmbedding(embedding: any) {
  if (!Array.isArray(embedding) || embedding.length !== 3072) {
    throw new Error("Invalid embedding size");
  }
  if (!embedding.every((v) => typeof v === "number")) {
    throw new Error("Embedding must be an array of numbers");
  }
}

async function taskToMarkdown(data: TaskData) {
  // Helper to format list fields
  function formatList(str?: string, bullet = "-") {
    if (!str) return "";
    return str
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => `${bullet} ${line}`)
      .join("\n");
  }

  let md = "";

  if (data.title) {
    md += `# ${data.title}\n\n`;
  }
  if (data.description) {
    md += `**Descrição:**  \n${data.description}\n\n`;
  }
  if (data.estimated_time) {
    md += `**Tempo Estimado:**  \n${data.estimated_time}\n\n`;
  }
  if (data.steps) {
    md +=
      "## Passos\n\n" +
      formatList(data.steps, "1.").replace(
        /1\./g,
        (m, i, str) => `${str.slice(0, i).split("1.").length}.`
      ) +
      "\n\n";
  }
  if (data.suggested_tests) {
    md += "## Testes Sugeridos\n\n" + formatList(data.suggested_tests) + "\n\n";
  }
  if (data.acceptance_criteria) {
    md +=
      "## Critérios de Aceitação\n\n" +
      formatList(data.acceptance_criteria) +
      "\n\n";
  }
  if (data.implementation_suggestion) {
    md += `**Sugestão de Implementação:**  \n${data.implementation_suggestion}\n`;
  }

  return md.trim();
}

async function chunkMarkdownDocument(markdown: string) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 3072,
    chunkOverlap: 300,
  });

  return await splitter.createDocuments([markdown]);
}

async function createEmbeddingsFromDocuments(
  taskId: string,
  chunks: Document[]
) {
  return await Promise.all(
    chunks.map(async (chunk) => {
      const response = await client.embeddings.create({
        model: "text-embedding-3-large",
        input: chunk.pageContent,
      });
      return {
        task_id: taskId,
        chunk_content: chunk.pageContent,
        embedding: response.data[0].embedding,
      };
    })
  );
}
