import React, {useContext, useState} from "react";
import './footer.css';
import {Context} from "../Context/Context";
import TasksFilter from "../TasksFilter";


const Footer = () => {
    const {visibleItems, setState} = useContext(Context)

    const counterDone = visibleItems.filter(el => el.done).length
    const counterItemsLeft = visibleItems.length - counterDone

    function clearCompleted() {
        const newTodo = visibleItems.filter(item => !item.done)
        setState(newTodo)
    }
      return (
        <footer className='footer'>
            <span className="todo-count">{counterItemsLeft} items left</span>
            <TasksFilter />
            <button className="clear-completed" onClick={() => clearCompleted()}>Clear completed</button>
        </footer>
      )
}

export default Footer