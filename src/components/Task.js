import React from 'react'
import styled from 'styled-components'

const Task = ({ task }) => {
  // console.log(task)
  return (
    <Container>
      {task.content}
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
`

export default Task
