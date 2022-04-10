import React from "react";
import './footer.css';
import TasksFilter from "../TasksFilter";
import PropTypes from "prop-types";

const Footer = ({ itemsLeft, removeCompleteTask, onActiveFilter, onCompletedFilter, filter, onFilterChange }) => {
    return(
        <footer className='footer'>
            <span className="todo-count">{itemsLeft} items left</span>
            <TasksFilter
                         onActiveFilter={onActiveFilter}
                         onCompletedFilter={onCompletedFilter}
                         filter={filter}
                         onFilterChange={onFilterChange}
                         />
            <button className="clear-completed"
                    onClick={removeCompleteTask}>Clear completed</button>
        </footer>
    )
}

Footer.propTypes = {
    itemsLeft: PropTypes.number,
    todos: PropTypes.arrayOf(PropTypes.object),
}
Footer.defaultProps = {
    taskCount: null,
};

export default Footer