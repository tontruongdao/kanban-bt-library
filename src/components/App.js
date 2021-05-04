import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Column from './Column'
import data from '../data'

const App = () => {
// ##### React States
const [todo, setTodo] = useState(data)

  const onDragEnd = (event) => {
    console.log(event)
  }

  return (
    // Added DragDropContext to Enable Kanban
    <DragDropContext onDragEnd={onDragEnd}>
      {data.columnOrder.map(columnId => {
        const column = todo.columns[columnId];
        const tasks = column.taskIds.map(taskId => todo.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  )
}

export default App
