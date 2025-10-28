import type { Task } from '../types';
import { useDraggable } from '@dnd-kit/core';
import { FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useState } from 'react';
import { AddTaskForm } from './AddTaskForm';

interface TaskCardProps {
  task: Task;
  deleteTask: (taskId: string) => void; 
  editTask: (task: Task) => void; 
}

export function TaskCard({ task, deleteTask, editTask }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const [isEditing, setIsEditing] = useState(false);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <>
      <div 
        ref={setNodeRef} 
        style={style}
        className="border p-4 mb-4 rounded shadow-sm bg-white"
      >
        {/* Header: Title + Delete button */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrashAlt />
          </button>
        </div>
        
        {/* Middle: Description + Priority (DRAGGABLE AREA) */}
        <div {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing">
          <p className="text-gray-700 mb-2">{task.description}</p>
          <div className="text-sm text-gray-500">
            Priority: <span className={`font-medium ${
              task.priority === 'high' ? 'text-red-600' : 
              task.priority === 'medium' ? 'text-yellow-600' : 
              'text-green-600'
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
  
        {/* Footer: Edit button at bottom-right */}
        <div className="flex justify-end mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <CiEdit />
          </button>
        </div>
      </div>
  
      {/* Edit Form Modal (appears when editing) */}
      {isEditing && (
        <AddTaskForm
          onSubmit={editTask}
          closeForm={() => setIsEditing(false)}
          taskToEdit={task}
        />
      )}
    </>
  );
}