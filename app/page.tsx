"use client";
import { TodoTable } from "./components/TodoTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-800 underline underline-offset-2">
            Todo CRUD App
          </h1>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
            <TodoTable />
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
