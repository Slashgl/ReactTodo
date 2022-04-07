import React from "react";
import Task from "../Task/Task";

import './TaskList.css'
import PropTypes from "prop-types";

const TaskList = ( { todos, onDeleted, onToggleDone, onToggleEdit, addEditedItem, timer} ) => {

    const elements = todos.map(item => {
        const {id, ...props} = item

        return (
            <React.Fragment key={id}>
                <Task
                    {...props}
                    item={item}
                    onDeleted={() => onDeleted(id)}
                    onToggleDone={() => onToggleDone(id)}
                    todos={todos}
                    onToggleEdit={() => onToggleEdit(id)}
                    addEditedItem={addEditedItem}
                    timer={timer}
                />
            </React.Fragment>
        )
    })

    return(
        <div className='main'>
            <ul className='todo-list'>
                { elements }
            </ul>
        </div>
    )

}
TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onToggleEdit: PropTypes.func.isRequired,
    addEditedItem: PropTypes.func.isRequired,
};
export default TaskList
