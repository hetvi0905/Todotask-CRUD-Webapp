"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GoPlus } from "react-icons/go";
import { Pencil, Trash2 } from "lucide-react";

import { fetchTodos, deleteTodo, createTodo, updateTodo } from "@/lib/api";
import { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ModalWrapper } from "./ModalWrapper";
import { TodoForm } from "./TodoForm";

export const TodoTable = () => {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // State for Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // State to track which todo is being edited, and whether its modal is open
  // Could be a map or just a single open modal with current todo id
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Add New Task Modal */}
      <ModalWrapper
        title="Add New Task"
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        trigger={
          <Button
            className="cursor-pointer bg-blue-500 w-full text-white font-bold flex items-center justify-center gap-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Task
            <GoPlus />
          </Button>
        }
      >
        <TodoForm
          onSubmit={async (todo) => {
            await addMutation.mutateAsync(todo);
            setIsAddModalOpen(false);
          }}
        />
      </ModalWrapper>

      <div className="max-h-[400px] overflow-y-auto rounded-md border border-gray-200">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700">
              <TableHead className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider w-[10%]">
                ID
              </TableHead>
              <TableHead className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider w-[50%] pl-30">
                Task
              </TableHead>

              <TableHead className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider w-[40%] text-center pl-10">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.map((todo: Todo) => (
              <TableRow key={todo.id}>
                <TableCell className="w-[10%]">{todo.id}</TableCell>
                <TableCell className="w-[50%] pl-30">{todo.title}</TableCell>

                <TableCell className="w-[100%] flex justify-end gap-2 pr-4">
                  <ModalWrapper
                    title="Edit Task"
                    open={editingTodoId === todo.id}
                    onOpenChange={(open) => {
                      if (!open) setEditingTodoId(null);
                      else setEditingTodoId(todo.id);
                    }}
                    trigger={
                      <Button className="flex cursor-pointer items-center gap-1 px-3 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all rounded-md">
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                    }
                  >
                    <TodoForm
                      initialValue={todo}
                      onSubmit={async (updated) => {
                        await updateMutation.mutateAsync(updated as Todo);
                        setEditingTodoId(null); // Close modal after update
                      }}
                    />
                  </ModalWrapper>

                  <Button
                    onClick={() => deleteMutation.mutate(todo.id)}
                    className="flex items-center cursor-pointer gap-1 px-3 py-2 text-sm bg-red-500 text-white hover:bg-red-600 transition-all rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
