import React from "react";
import './footer.css';
import TasksFilter from "../TasksFilter/TasksFilter";
import PropTypes from "prop-types";

const Footer = ({ itemsLeft, todos, onFilterActive, onFilterAll, onFilterCompleted, removeCompleteTask }) => {
    return(
        <footer className='footer'>
            <span className="todo-count">{itemsLeft} items left</span>
            <TasksFilter todos={todos}
                         onFilterActive={onFilterActive}
                         onFilterAll={onFilterAll}
                         onFilterCompleted={onFilterCompleted}/>
            <button className="clear-completed"
                    onClick={removeCompleteTask}>Clear completed</button>
        </footer>
    )
}

Footer.propTypes = {
    itemsLeft: PropTypes.number,
    todos: PropTypes.arrayOf(PropTypes.object),
    onFilterActive: PropTypes.func,
    onFilterAll: PropTypes.func,
    onFilterCompleted: PropTypes.func,
}
Footer.defaultProps = {
    taskCount: null,
};

export default Footer