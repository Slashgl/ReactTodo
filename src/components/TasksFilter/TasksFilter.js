import React from "react";

import './TasksFilter.css';
import PropTypes from "prop-types";

const TasksFilter = ( { onFilterAll ,onFilterActive, onFilterCompleted } ) => {
    return (
        <ul className="filters">
            <li>
                <button className='all targetFilter selected'
                        onClick={onFilterAll}>All</button>
            </li>
            <li>
                <button className='active targetFilter'
                        onClick={onFilterActive}>Active</button>
            </li>
            <li>
                <button className='completed targetFilter'
                        onClick={onFilterCompleted}>Completed</button>
            </li>
        </ul>
    )
}

TasksFilter.propTypes = {
    onFilterAll: PropTypes.func.isRequired,
    onFilterActive: PropTypes.func.isRequired,
    onFilterCompleted: PropTypes.func.isRequired
}
export default TasksFilter;