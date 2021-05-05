const data = {
  tasks: {
    'firstTask': { id: 'firstTask', content: 'Take Out The Garbage'},
    'secondTask': { id: 'secondTask', content: 'Watch My Favorite Show'},
    'thirdTask': { id: 'thirdTask', content: 'Charge My Phone'},
    'fourthTask': { id: 'fourthTask', content: 'Cook Dinner'}
  },
  columns: {
    'firstCol' : { 
      id: 'firstCol',
      title: 'To Do',
      taskIds: ['firstTask', 'secondTask', 'thirdTask', 'fourthTask']
    },
    'secondCol' : { 
      id: 'secondCol',
      title: 'In Progress',
      taskIds: []
    },
    'thirdCol' : { 
      id: 'thirdCol',
      title: 'Completed',
      taskIds: []
    }
  },

  columnOrder: ['firstCol', 'secondCol', 'thirdCol'],
}

export default data