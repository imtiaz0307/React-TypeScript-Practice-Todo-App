import { FC, useEffect, useState } from 'react'
import './App.css'
import AddTask from './components/AddTask/AddTask'
import Navbar from './components/Navbar/Navbar'
import TodoCard from './components/TodoCard/TodoCard'
import { db } from './firebase/Firebase_config'
import { getDocs, collection } from 'firebase/firestore'
import Loader from './components/Loader/Loader'


type task = {
  todoId: string,
  taskName: string,
  taskDeadline: string
}

const App: FC = () => {
  const [tasks, setTasks] = useState<task[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  const todosCollectionRef = collection(db, "Todos")

  const getTodos = async () => {
    const data = await getDocs(todosCollectionRef)
    data.docs.map(doc => {
      const { taskName, taskDeadline } = doc.data()
      // converting data in string
      const deadlineInString = Date(taskDeadline.seconds).slice(0, 16)
      // adding task to the tasks array
      setTasks(prev => [{
        todoId: doc.id,
        taskName,
        taskDeadline: deadlineInString
      }, ...prev])
    })
  }

  useEffect(() => {
    getTodos()
    setIsLoading(false)
  }, [])

  return (
    <>
      <Navbar />
      {
        isLoading
          ?
          <Loader />
          :
          <>
            <div style={{ padding: '0 1rem' }}>
              <AddTask getTodos={getTodos} setTasks={setTasks} setIsLoading={setIsLoading} />

              <div className='todos'>
                <h2>Unfinished Todos</h2>
                {
                  tasks.length > 0
                  &&
                  tasks.map((task: task, index: number) => {
                    return <TodoCard key={task.todoId} task={task} getTodos={getTodos} setTasks={setTasks} setIsLoading={setIsLoading} />
                  })
                }
              </div>
            </div>
          </>
      }
    </>
  )
}

export default App
