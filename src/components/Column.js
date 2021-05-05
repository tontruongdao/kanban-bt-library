import React from 'react'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import Task from './Task'

const Column = ({ column: { title, id }, tasks, isDropDisabled, index }) => {

  return (
    <Draggable
      draggableId={id}
      index={index}>
      {(provided) => (
        <Container 
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{title}</Title>
          {/* 
          - Wrapped Tasklist arround the "Droppable" Component
          The children must we a function that returns a React Component
          
          - The drappoable takes one required a unieque droppableID
          */}
          <Droppable 
            isDropDisabled={isDropDisabled} // Makes Component No LongerDroppable 
            droppableId={id}
            type="task">
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

      )}
    </Draggable>
  )
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;

  background-color: white;
`

const Title = styled.h3`
  padding: 8px;
`

const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};

  flex-grow: 1;
  min-height: 30vh;
`

export default Column



// Snapshot Object Properties
// const droppableSnapshop = {
//  isDraggingOver: true
//  draggingOverWith:'firstTask'
// }