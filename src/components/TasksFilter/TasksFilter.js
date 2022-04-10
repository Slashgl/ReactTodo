import React from 'react';
import '../TasksFilter/TasksFilter.css'


export default class TasksFilter extends React.Component {
    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'}
    ]

    render() {
        const { onFilterChange } = this.props
        const buttons = this.buttons.map(({ name, label }) => {

            return (
                <li key={name}>
                    <button type="button"
                            onClick={() => onFilterChange(name)}>
                        {label}
                    </button>
                </li>
            )
        })
        return (
            <ul className="filters">
                {buttons}
            </ul>
        );
    }
}



