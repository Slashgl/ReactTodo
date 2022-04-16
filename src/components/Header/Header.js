import React, {useContext, useState} from "react";
import './Header.css'
import {Context} from "../Context/Context";


const Header = () =>{
    const {visibleItems, setState} = useContext(Context)
    const [label, setLabel] = useState('')
    let id = 100
    function saveTodo(e) {
        e.preventDefault()
        if(label !== '') {
            setState([...visibleItems, {
                label: label,
                id: id++,
                done: false,
                editing: false,
                timer: new Date()
            }])
        }
    }



    return (
        <div>
            <h1>todos</h1>
            <form onSubmit={saveTodo}>
                <input
                    className='new-todo'
                    placeholder="What needs to be done?"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </form>
        </div>
    )
}
export default Header