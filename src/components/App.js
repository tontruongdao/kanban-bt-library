import React, { useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'

import Column from './Column'
import data from '../data'

const App = () => {
// ##### React States
  const [todo, setTodo] = useState(data)
  const [indexState, setIndexState] = useState(null)

  // ##### Helpers
  const onDragStart = (start) => {
    document.body.style.color = 'orange'
    document.body.style.transition = "all 0.3s ease"

    const homeIndex = todo.columnOrder.indexOf(start.source.droppableId)
    console.log(homeIndex)
    setIndexState(homeIndex)
  }

  const onDragUpdate = (update) => {
    
    const { destination } = update;
    // console.log(destination)
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

    const startCol = todo.columns[source.droppableId]
    const endCol = todo.columns[destination.droppableId]
    // console.log(startCol, endCol)

    if(startCol === endCol) {
      const newTaskIds = Array.from(startCol.taskIds) // Makes an array from a copy of the todo State
  
      // Splice one Item from the source's index
      newTaskIds.splice(source.index, 1)
      // console.log(newTasksIds)
      // Remove no item from destination, added draggable Id
      newTaskIds.splice(destination.index, 0, draggableId)
      // console.log(newTasksIds)
  
      // Creating new column to avoid mutating OG State
      const newColumn = {
        ...startCol,
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
      return
    }


    // Moving From One List To Another
    if(startCol !== endCol) {
      //
      const startTaskIds = Array.from(startCol.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartCol = {
        ...startCol,
        taskIds: startTaskIds
      }
  
      const endTaskIds = Array.from(endCol.taskIds);
      endTaskIds.splice(destination.index, 0, draggableId)
      const newEndCol = {
        ...endCol,
        taskIds: endTaskIds
      }
  
      const newState = {
        ...todo,
        columns: {
          ...todo.columns,
          [newStartCol.id]: newStartCol,
          [newEndCol.id]: newEndCol   
        }
      }
  
      setTodo(newState)
    }
    setIndexState(null)
  }

  return (
    
    <Container>
      {/* Added DragDropContext to Enable Kanban */}
      <DragDropContext 
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}>
        {todo.columnOrder.map((columnId, index) => {
          const column = todo.columns[columnId];
          const tasks = column.taskIds.map(taskId => todo.tasks[taskId]);

          return (
            <Column 
              key={column.id} 
              column={column} 
              tasks={tasks} 
              isDropDisabled={index < indexState}
              />
          );
        })}
      </DragDropContext>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
`

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







