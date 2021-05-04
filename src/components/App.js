import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Column from './Column'
import data from '../data'

const App = () => {
// ##### React States
  const [todo, setTodo] = useState(data)

  // ##### Helpers

  const onDragEnd = (result) => {
    // Result Object Propertoes
    // const result = {
    //  draggableId: 'task-1'
    //  type:'TYPE'
    //  reason: 'DROP',
    //  source: {
    //    droppableId: 'column-1'
    //    index: 0
    //  },
    //  destination: {
    //    droppableId: 'column-1'
    //    index: 1
    //  }
    // console.log(result)

    const { destination, source, draggableId } = result;

    if(!destination) { // Nothing to do when no destination
      return
    }

    if( // Item dropped to the same destination
      destination.drappableId === source.droppableId && 
      destination.index === source.index) {
        return
      }

    const column = todo.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds) // Makes an array from a copy of the todo State

    // Splice one Item from the source's index
    newTaskIds.splice(source.index, 1)
    // console.log(newTasksIds)
    // Remove no item from destination, added draggable Id
    newTaskIds.splice(destination.index, 0, draggableId)
    // console.log(newTasksIds)

    // Creating new column to avoid mutating OG State
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }

    console.log(newColumn)

    // Updating todo State to avoid mutating OG State
    const newTodo = {
      ...todo,
      columns: {
        ...todo.columns,
        [newColumn.id]: newColumn
      }
    }

    setTodo(newTodo)
  }

  return (
    // Added DragDropContext to Enable Kanban
    <DragDropContext onDragEnd={onDragEnd}>
      {todo.columnOrder.map(columnId => {
        const column = todo.columns[columnId];
        const tasks = column.taskIds.map(taskId => todo.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  )
}

export default App
