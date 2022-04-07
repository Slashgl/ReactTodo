import React from "react";
import './Task.css';
import {formatDistanceToNow} from "date-fns";

const Task = ({onToggleDone, onDeleted,onToggleEdit, item, addEditedItem}) =>  {

    const [ seconds, setSeconds ] = React.useState(0);
    const [ minutes, setMinutes ] = React.useState(0)
    const [ timerActive, setTimerActive ] = React.useState(false);

    const {label, done, editing, createdDate} = item

    React.useEffect(() => {
        if (seconds >= 0 && seconds < 60 && timerActive) {
            setTimeout(setSeconds, 1000, seconds + 1);
        }else if(seconds >= 60) {
            setMinutes(minutes + 1)
            setSeconds(0)
        }else {
            setTimerActive(false)
        }

    }, [ seconds, timerActive ]);

    const handleChange = (event) => {
        const newItem = { ...item };
        newItem.label = event.target.value;
        newItem.editing = false;
        addEditedItem(item.id, newItem)
    };

    const handleChangeKey = (event) => {
        if (event.key === 'Enter') {
            handleChange(event);
        }
    };
    const timeCreateItem = (time = Task.defaultProps.date) => {
        return formatDistanceToNow(new Date(time));
    }

        let className = '';
        if(done) {
            className += ' completed'
        }
        if (editing) {
            className += ' editing';
        }
        let visibleClass = {};
        if (item.visibility === false) visibleClass = { display: 'none' };
        return (
            <li style={visibleClass} className={className}>
                <div className='view'>
                    <input
                        className='toggle'
                        type='checkbox'
                        onChange={onToggleDone}
                    />
                    <label>
                        <span className="title">
                          <button className="icon icon-play" onClick={() => setTimerActive(true)}> </button>
                          <button className="icon icon-pause" onClick={() => setTimerActive(false)}> </button>
                            {`${seconds}:${minutes < 10 ? `0${minutes}` : minutes}`}
                        </span>
                    <span className='title'>{label}</span>
                        <span className="created">{timeCreateItem(createdDate)}</span>
                    </label>
                    <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={onToggleEdit} />
                    <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={onDeleted} />
                </div>
                <input
                    type="text"
                    className="edit"
                    defaultValue={label}
                    onBlur={handleChange}
                    onKeyUp={handleChangeKey}
                />
            </li>
        )
}

export default Task