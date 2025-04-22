import { z } from "zod";
import type { DataAndMessageResponse } from "@web/api/types";
import type { Todo } from "@web/features/todo/slice";
import httpClient from "@web/lib/http";

const TodoSchema: z.ZodType<Todo> = z.object({
  id: z.number(),
  text: z.string(),
});

const TodoApiResponseSchema: z.ZodType<DataAndMessageResponse<Todo[]>> =
  z.object({
    data: z.array(TodoSchema),
    message: z.string(),
  });

export const list = async () => {
  const response = await httpClient.get<typeof TodoApiResponseSchema>(
    "/api/v1/todos",
    {
      schema: TodoApiResponseSchema,
    }
  );
  return response.data;
};
