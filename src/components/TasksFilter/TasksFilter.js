
import React from 'react';
import '../TasksFilter/TasksFilter.css'
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
    onSetFilter = (ev) => {
        const { setFilter } = this.props;
        const list = document.querySelectorAll('.filters li button');
        list.forEach((el) => {
            el.classList.remove('selected');
        });
        ev.target.className = 'selected';
        setFilter(ev.target.innerText);
    };

    render() {
        return (
            <ul className="filters">
                <li>
                    <button type="button" onClick={this.onSetFilter}>
                        All
                    </button>
                </li>
                <li>
                    <button type="button" onClick={this.onSetFilter}>
                        Active
                    </button>
                </li>
                <li>
                    <button type="button" onClick={this.onSetFilter}>
                        Completed
                    </button>
                </li>
            </ul>
        );
    }
}

TasksFilter.defaultProps = {
    setFilter: () => {},
};

TasksFilter.propTypes = {
    setFilter: PropTypes.func,
};


