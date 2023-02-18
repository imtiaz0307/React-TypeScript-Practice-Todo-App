import { FC, useState } from 'react'
import styles from './TodoCard.module.css'
import { db } from '../../firebase/Firebase_config'
import { doc, deleteDoc } from 'firebase/firestore'

type CardItem = {
    task: {
        todoId: string,
        taskName: string,
        taskDeadline: string
    },
    getTodos: () => {},
    setTasks: () => {},
    setIsLoading: () => {}
}

const TodoCard: FC<CardItem> = ({ task, getTodos, setTasks, setIsLoading }) => {
    const [finished, setFinished] = useState<Boolean>(false)

    const taskDoc = doc(db, "Todos", task.todoId)

    // mark todo as finish hanlder
    const markFinishHandler = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>): void => setFinished(true);

    const removeTodo = async () => {
        setIsLoading(true)
        await deleteDoc(taskDoc)
        setTasks([])
        getTodos()
        setIsLoading(false)
    }


    return (
        <div className={styles.todoCard}>
            <div className={styles.cardLeft}>
                <h3
                    style={{
                        textDecoration: finished ? 'line-through' : 'none',
                        textDecorationThickness: finished ? '4px' : '0px'
                    }}>{task.taskName}</h3>
                <p>Do it Before: {task.taskDeadline.split("-").reverse().join("-")}</p>
            </div>
            <div className={styles.cardRight}>
                <p onClick={markFinishHandler} style={{ display: finished ? 'none' : 'inline-block' }}>&#x2713; </p>
                <p onClick={removeTodo}>&#x274c; </p>
            </div>
        </div>
    )
}

export default TodoCard