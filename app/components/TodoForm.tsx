"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types/todo";

interface Props {
  onSubmit: (todo: Partial<Todo>) => void;
  initialValue?: Todo;
}

export const TodoForm = ({ onSubmit, initialValue }: Props) => {
  const [title, setTitle] = useState(initialValue?.title || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ ...initialValue, title, completed: false });
      }}
      className="flex flex-col gap-4"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
        className=" border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        required
      />

      <Button
        type="submit"
        variant="default"
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold"
      >
        {initialValue ? "Update" : "Add"} Task
      </Button>
    </form>
  );
};
