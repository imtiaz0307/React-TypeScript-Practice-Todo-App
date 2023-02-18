import { ChangeEvent, FC, FormEvent, useState } from 'react'
import styles from './AddTask.module.css'
import { db } from '../../firebase/Firebase_config'
import { addDoc, collection } from 'firebase/firestore'

type Task = {
    taskName: string,
    taskDeadline: string
}

const AddTask: FC<any> = (props) => {
    const todosCollectionRef = collection(db, "Todos")

    const [task, setTask] = useState<Task>({
        taskName: '',
        taskDeadline: ''
    })

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTask(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const addTodoHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        props.setIsLoading(true)
        await addDoc(todosCollectionRef, {
            taskName: task.taskName,
            taskDeadline: new Date(task.taskDeadline)
        })
        props.setTasks([])
        props.getTodos()
        setTask({ taskName: '', taskDeadline: '' })
        props.setIsLoading(false)
    }


    return (
        <div className={styles.addTask}>
            <h2>Add ToDo Task</h2>
            <form className={styles.addTaskForm} onSubmit={addTodoHandler}>
                <div className={styles.inputFields}>
                    <div className={styles.inputField}>
                        <label htmlFor="task">Task Title</label>
                        <input type="text" value={task.taskName} onChange={inputChangeHandler} name="taskName" placeholder='Ex: Go To Gym...' required minLength={2} />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="task">Task Deadline</label>
                        <input type="date" name='taskDeadline' onChange={inputChangeHandler} value={task.taskDeadline} required />
                    </div>
                </div>
                <button type='submit'>Add Task</button>
            </form>
        </div>
    )
}

export default AddTask