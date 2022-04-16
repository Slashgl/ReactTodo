import React, {useContext} from "react";
import {Context} from "../Context/Context";
import './TaskList.css'
import Task from "../Task";


const TaskList = () => {
    const {visibleItems} = useContext(Context)
    const elements = visibleItems.map(item => {
        const {...props} = item

        return(
            <React.Fragment key={item.id}>
                <Task
                    {...props}
                    item={item}
                />
            </React.Fragment>
        )
    })
    return(
        <div className='main'>
            <ul className='todo-list'>
                {elements}
            </ul>
        </div>
    )

}
export default TaskList
