import React, {useState} from "react";
import Header from "../Header";
import './App.css';
import TaskList from "../TaskList";
import Footer from "../Footer";
import {Context} from "../Context/Context";

const App = () => {
    const initial = [
        {label: 'Drink Coffee', id: 1, done: false, editing: false, timer: new Date()},
        {label: 'Created React Todo', id: 2, done: false, editing: false, timer: new Date()},
        {label: 'sleep', id: 3, done: false, editing: false, timer: new Date()},
    ]
    const [state, setState] = useState(initial);
    const [filter, setFilter] = useState('all')

    function addEditedItem(id, updateItem) {
        const newArr = [...state];
        const ind = newArr.findIndex((el) => el.id === id);
        newArr[ind] = updateItem;
        setState(newArr)
    }
    function switchFilter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter(el => !el.done)
            case 'completed':
                return items.filter(el => el.done)
            default:
                return items
        }
    }
    function onFilterChange(filter) {
        setFilter(filter)
    }
    const visibleItems = switchFilter(state,filter)

    return (
        <Context.Provider value={{
            visibleItems,
            setState,
            onFilterChange,
            addEditedItem,
            filter
        }}>
            <div className='todoapp'>
                <Header/>
                <TaskList />
                <Footer/>
            </div>
        </Context.Provider>
    )
}

export default App