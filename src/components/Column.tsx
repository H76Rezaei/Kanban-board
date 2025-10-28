import { useState } from 'react';
import type { Task } from '../types';
import { AddTaskForm } from './AddTaskForm';
import { TaskCard } from './TaskCard';
import { FaPlus } from "react-icons/fa";
import { useDroppable } from '@dnd-kit/core';

interface ColumnProps {
  title: string;
  tasks: Task[];  // array of Task objects
  status: Task["status"];  // which column (backlog, todo, etc)
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  editTask: (task: Task) => void; 
}

export function Column({ title, tasks, status, addTask, deleteTask, editTask }: ColumnProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const { setNodeRef } = useDroppable({
    id: status, // column id = its status
  })

  return (
    <>
      <div ref={setNodeRef} className="bg-white rounded shadow p-4 min-h-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          {status === "backlog" && (
            <button 
              className="p-2 rounded text-gray-600 hover:bg-gray-100" 
              onClick={() => setIsFormOpen(true)}
            >
              <FaPlus />
            </button>
          )}
        </div>
        <div>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} editTask={editTask}/>
          ))}
        </div>
      </div>
      
      {isFormOpen && (
        <AddTaskForm 
          onSubmit={addTask} 
          closeForm={() => setIsFormOpen(false)}
        />
      )}
    </>
  );
}