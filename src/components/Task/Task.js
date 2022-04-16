import React, {useContext, useState} from "react";
import {Context} from "../Context/Context";
import './Task.css';
import {formatDistanceToNow} from "date-fns";

const Task = (props) => {
    const {visibleItems,setState, addEditedItem} = useContext(Context)
    const {label, id, timer, done, editing, item} = props

    const [value, setValue] = useState('')
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [activeTimer, setActiveTimer] = useState(false)

    React.useEffect(() => {
        if(seconds >= 0 && seconds < 60 && activeTimer) {
            setTimeout(setSeconds, 1000, seconds + 1);
        }else if(seconds >= 60) {
            setMinutes(minutes + 1);
            setSeconds(0);
        }else {
            setActiveTimer(false)
        }
    })

    const timeCreateItem = (time) => {
        return formatDistanceToNow(new Date(time), {
            addSuffix: true,
        });
    }

    function deleteItem(id) {
        const newTodo = [...visibleItems].filter(item => item.id !== id)
        setState(newTodo)

    }
    function toggleDone(id) {
        const  newTodo = [...visibleItems].map(item => {
            if(item.id === id) {
                item.done = !item.done
            }
            return item
        })
        setState(newTodo)
    }
    function toggleEditing(id) {
        const newTodo = [...visibleItems].map(item => {
            if(item.id === id) {
                item.editing = !item.editing
            }
            return item
        })
        setState(newTodo)
    }

    function handleChange() {
        const newItem = item
        newItem.label = value
        newItem.editing = false;
        addEditedItem(item.id, newItem)
    }
    function handleChangeKey(e) {
        if(e.key === 'Enter') {
            handleChange(e)
        }
    }
    let className = ''
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
                    onClick={() => toggleDone(id)}
                />
                <label>
                    <span className="title">
                          <button className="icon icon-play" onClick={() => setActiveTimer(true)}> </button>
                          <button className="icon icon-pause" onClick={() => setActiveTimer(false)}> </button>
                        {`${seconds}:${minutes < 10 ? `0${minutes}` : minutes}`}
                        </span>
                    <span className='description'>{label}</span>
                    <span className="created">{timeCreateItem(timer)}</span>
                </label>
                <button className="icon icon-edit" type="button" aria-label="Icon input edit" onClick={() => toggleEditing(id)}/>
                <button className="icon icon-destroy" type="button" aria-label="Icon input deleted" onClick={() => deleteItem(id)}/>
            </div>
            <input
                type="text"
                className="edit"
                onBlur={handleChange}
                onKeyUp={handleChangeKey}
                onChange={(e) => setValue(e.target.value)}
            />
        </li>
    )



}
export default Task



