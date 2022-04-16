import React, {useContext} from "react";
import './TasksFilter.css'
import {Context} from "../Context/Context";


const TasksFilter = () => {
    const buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'}
    ]
    const {onFilterChange, filter} = useContext(Context)

    const butons = buttons.map(({name, label}) => {
        const isActive = filter === name;
        console.log(isActive)
        const clazz = isActive ? 'selected' : null
        return(
            <li key={name}
                >
                <button type='button'
                        className={clazz}
                        onClick={() => onFilterChange(name)}
                >{label}</button>
            </li>
        )
    })
    return (
        <ul className="filters">
            {butons}
        </ul>
    )
}
export default TasksFilter

