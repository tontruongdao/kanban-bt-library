const data = {
  tasks: {
    'firstTask': { id: 'task-1', content: 'Take Out The Garbage'},
    'secondTask': { id: 'task-2', content: 'Watch My Favorite Show'},
    'thirdTask': { id: 'task-3', content: 'Charge My Phone'},
    'fourthTask': { id: 'task-4', content: 'Cook Dinner'}
  },
  columns: {
    'firstCol' : { 
      id: 'column-1',
      title: 'To Do',
      taskIds: ['firstTask', 'secondTask', 'thirdTask', 'fourthTask']
    },
    'secondCol' : { 
      id: 'column-2',
      title: 'Completed',
      taskIds: []
    }
  },

  columnOrder: ['firstCol', 'secondCol'],
}

export default data