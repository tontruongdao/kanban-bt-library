import React, { useState } from 'react'

import Column from './Column'
import data from '../data'

const App = () => {
// ##### React States
const [todo, setTodo] = useState(data)


  return (
    todo.columnOrder.map((columnId) => {
      const column = todo.columns[columnId]
      const tasks = column.taskIds.map(task => data.tasks[task])

      return (
        <Column 
          key={column.id}
          column={column}
          tasks={tasks}>

        </Column>
      )
    })
  )
}

export default App
