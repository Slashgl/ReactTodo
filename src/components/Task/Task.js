import React, {Component} from "react";
import Clock from "../Clock/Clock";
import './Task.css';
import PropTypes from "prop-types";

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
    render() {

        const { onToggleDone, onDeleted,onToggleEdit, item} = this.props

        const {label, done, editing} = item
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
                        <Clock todos={item}/>
                    </label>
                    <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={onToggleEdit} />
                    <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={onDeleted} />
                </div>
                <input
                    type="text"
                    className="edit"
                    onBlur={this.handleChange}
                    onKeyUp={this.handleChangeKey}
                />
            </li>
        )
    }
}


// <li className='completed'>
//     <div className='view'>
//         <input className='toggle' type='checkbox'/>
//         <label>
//             <span className='description'>Completed task</span>
//             <span className='created'>created 17 seconds ago</span>
//         </label>
//         <button className="icon icon-edit" />
//         <button className="icon icon-destroy" />
//     </div>
// </li>
// <li className='editing'>
//     <div className='view'>
//         <input className='toggle' type='checkbox'/>
//         <label>
//             <span className='description'>Completed task</span>
//             <span className='created'>created 17 seconds ago</span>
//         </label>
//         <button className="icon icon-edit" />
//         <button className="icon icon-destroy" />
//     </div>
//     <input type="text" className="edit" defaultValue='Editing task' />
// </li>
//
// <li>
//     <div className="view">
//         <input className="toggle" type="checkbox" />
//         <label>
//             <span className="description">Active task</span>
//             <span className="created">created 5 minutes ago</span>
//         </label>
//         <button className="icon icon-edit" />
//         <button className="icon icon-destroy" />
//     </div>
// </li>