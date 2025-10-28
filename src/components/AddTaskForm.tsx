import type { Task } from "../types";
import { useState } from "react";

interface AddTaskFormProps {
  addTask: (task: Task) => void;
  closeForm: () => void;
}

export function AddTaskForm({ addTask, closeForm }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title, 
      description: description,
      priority: priority,
      status: "backlog",
      createdAt: Date.now()
    };
    addTask(newTask);
    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input 
              id="title"
              type="text"
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
               Priority
            </label>
            <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeForm}
              className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

