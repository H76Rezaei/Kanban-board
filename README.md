# Kanban Board

A modern, responsive Kanban board application built with React, TypeScript, and Tailwind CSS. Features drag-and-drop functionality for task management with persistent local storage.

## Features

- Drag and drop tasks between columns (Backlog, Todo, In Progress, Done)
- Add new tasks with title, description, and priority levels
- Delete tasks
- Priority system with visual indicators (High/Medium/Low)
- LocalStorage persistence - tasks saved automatically
- Clean, modern UI with Tailwind CSS

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **dnd-kit** - Drag and drop functionality
- **LocalStorage** - Data persistence

## Getting Started

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

## Project Structure
```
src/
├── components/
│   ├── Column.tsx       # Kanban column component
│   ├── TaskCard.tsx     # Individual task card
│   └── AddTaskForm.tsx  # Form for adding new tasks
├── types.ts             # TypeScript interfaces
└── App.tsx              # Main application component
```

## Future Enhancements

- [ ] Edit existing tasks
- [ ] Task deadlines
- [ ] Filter and sort tasks
- [ ] Multiple boards
- [ ] Dark mode

