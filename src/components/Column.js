import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

import Task from './Task'

const Column = ({ column: { title, id }, tasks }) => {

  return (
    <Container>
      <Title>{title}</Title>
      {/* 
      - Wrapped Tasklist arround the "Droppable" Component
      The children must we a function that returns a React Component
      
      - The drappoable takes one required a unieque droppableID
      */}
      <Droppable droppableId={id}>
        {/*  
        - The first argument takes an object "Provided"

        - The object has a property called droppableProps, 
          these needs to be applied to the required component,
          in our case it is the TaskList

        - InnerRef function supply the DOM node to beautiful-dnd 

        - The Placeholder is a React Element that is used to
          increase the available space in a 
          droppable during a drag when is needed
          Needs to placed as a child to the droppable component
        */}
        {(provided, snapshot) => (
          <TaskList 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>

            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}

            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`

const Title = styled.h3`
  padding: 8px;
`

const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
`

export default Column
