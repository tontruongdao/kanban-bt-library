import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Column from './Column'
import data from '../data'

const App = () => {
// ##### React States
  const [todo, setTodo] = useState(data)

  // ##### Helpers
  const onDragStart = () => {
    document.body.style.color = 'orange'
    document.body.style.transition = "all 0.3s ease"
  }

  const onDragUpdate = (update) => {
    
    const { destination } = update;
    console.log(destination)
    const opacity = destination ?
      destination.index / Object.keys(todo.tasks).length :
      0;

    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }

  const onDragEnd = (result) => {

    document.body.style.color = 'inherit'
    document.body.style.backgroundColor = 'inherit'

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

    // console.log(newColumn)

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
    <DragDropContext 
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}>
      {todo.columnOrder.map(columnId => {
        const column = todo.columns[columnId];
        const tasks = column.taskIds.map(taskId => todo.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  )
}

export default App




    // Result Object Properties
    // const result = {
    //  draggableId: 'fisrTask'
    //  type:'TYPE'
    //  reason: 'DROP',
    //  source: {
    //    droppableId: 'fisrtCol'
    //    index: 0
    //  },
    //  destination: {
    //    droppableId: 'fisrtCol'
    //    index: 1
    //  }







