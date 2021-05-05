import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Task = ({ task, index }) => {
  // console.log(task)
  return (

  // - Draggable has to required property
  //   A Unique draggableId, and an index passed as a prop
  //
  // - Like Droppable, Draggable takes a function as a children.
  //
  // - We need to pass the draggableProps and dragHandleProps 
  //   to the item we want to move araound.
    <Draggable 
      draggableId={task.id} 
      index={index}>

    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        // {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}>
        
        <Handle {...provided.dragHandleProps}/>
        {task.content}
      </Container>
    )}

  </Draggable>
  )
}

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

  display: flex;
`

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: blue;
  border-radius: 4px;
  margin-right: 8px;
`

export default Task


// Snapshot Object Properties
// const draggableSnapshop = {
//  isDragging: true
//  draggingOver:'firstCol'
// }