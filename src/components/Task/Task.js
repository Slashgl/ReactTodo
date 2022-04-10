import React, {Component} from "react";
import './Task.css';
import PropTypes from "prop-types";
import {formatDistanceToNow} from "date-fns";

export default class Task extends Component {
    static propTypes = {
        item: PropTypes.shape({
            label: PropTypes.string,
            done: PropTypes.bool,
            editing: PropTypes.bool,
            id: PropTypes.number,
        }).isRequired,
        onDeleted: PropTypes.func.isRequired,
        onToggleEdit: PropTypes.func.isRequired,
        addEditedItem: PropTypes.func.isRequired,
        onToggleDone: PropTypes.func.isRequired,
    };


    handleChange = (event) => {
        const { item, addEditedItem } = this.props;
        const newItem = { ...item };
        newItem.label = event.target.value;
        newItem.editing = false;
        addEditedItem(item.id, newItem)
    };

    handleChangeKey = (event) => {
        if (event.key === 'Enter') {
            this.handleChange(event);
        }
    };
    timeCreateItem(time = Task.defaultProps.date) {
        return formatDistanceToNow(new Date(time), {
            addSuffix: true,
        });

    }
    render() {

        const { onToggleDone, onDeleted,onToggleEdit, item} = this.props

        const {label, done, editing, createdDate} = item
        let className = '';
        if(done) {
            className += ' completed'
        }
        if (editing) {
            className += ' editing';
        }

        return (
            <li className={className}>
                <div className='view'>
                    <input
                        className='toggle'
                        type='checkbox'
                        onChange={onToggleDone}/>
                    <label>
                    <span className='description'>{label}</span>
                        <span className="created">{this.timeCreateItem(createdDate)}</span>
                    </label>
                    <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={onToggleEdit} />
                    <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={onDeleted} />
                </div>
                <input
                    type="text"
                    className="edit"
                    defaultValue={label}
                    onBlur={this.handleChange}
                    onKeyUp={this.handleChangeKey}
                />
            </li>
        )
    }
}
