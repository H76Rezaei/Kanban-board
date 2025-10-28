// src/App.tsx
import { useState, useEffect } from 'react';
import type { ColumnStatus, Task } from './types';
import { COLUMN_STATUSES } from './types';
import { Column } from './components/Column';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';



function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('kanban-tasks');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default dummy data ONLY if nothing saved
    return [
      { id: '1', title: 'Setup project', description: 'Initialize React app', priority: 'high', status: 'done', createdAt: Date.now() },
      { id: '2', title: 'Build components', description: 'Create Column and TaskCard', priority: 'medium', status: 'in-progress', createdAt: Date.now() },
      { id: '3', title: 'Add drag and drop', description: 'Implement dnd-kit', priority: 'high', status: 'todo', createdAt: Date.now() },
    ];
  });
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  // Helper function to get tasks by status
  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status);
  };
  // This is called when drag ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return; // dropped outside
    
    const taskId = active.id as string; // the dragged task's id
    const newStatus = over.id as Task["status"]; // the column it was dropped in
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8">Kanban Board</h1>
        <div className="grid grid-cols-4 gap-4">
          {COLUMN_STATUSES.map(status => (
            <Column
              key={status}
              title={status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              tasks={getTasksByStatus(status)}
              status={status}
              addTask={addTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
export default App;
