import React from "react";
import Header from "../Header";
import './App.css';
import TaskList from "../TaskList";
import Footer from "../Footer";

export default class App extends React.Component {
    maxId = 100;
    state = {
        todoData: [
            this.createItemState('Complete task'),
            this.createItemState('Editing task'),
            this.createItemState('Active task'),
        ],
        filter: 'all',
    }
    onToggleEdit = (id) => {
        this.setState(({todoData}) => ({
            todoData: this.toggleProperties(todoData, id, 'editing'),
        }));
    };
    addEditedItem = (id, updateItem) => {
        this.setState(({todoData}) => {
            const newArr = [...todoData];
            const ind = newArr.findIndex((el) => el.id === id);
            newArr[ind] = updateItem;
            return {
                todoData: newArr,
            };
        });
    };
    DeletedTask = (id) => {
        this.setState(({todoData}) => {
                const idx = todoData.findIndex(element => element.id === id)

                const before = todoData.slice(0, idx)
                const after = todoData.slice(idx + 1)
                const newArray = [...before, ...after]

                return {
                    todoData: newArray
                }
            }
        )
    }
    onItemAdd = (text) => {
        const newItem = {
            label: text,
            done: false,
            id: this.maxId++,
            editing: false,
            visibility: true,
            createdDate: new Date(),
        }

        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem]
            return {
                todoData: newArray
            }
        })
    }

    createItemState(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
            editing: false,
            visibility: true,
            createdDate: new Date(),
        }
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => ({
            todoData: this.toggleProperties(todoData, id, 'done'),
        }));
    };

    toggleProperties = (arr, id, propertyName) => {
        const ind = arr.findIndex((el) => el.id === id);
        const newArr = [...arr];
        newArr[ind][propertyName] = !newArr[ind][propertyName];
        return newArr;
    };
    removeCompleteTask = () => {
        const removeCompleteTask = this.state.todoData.filter(el => !el.done)
        this.setState(() => {
            return {
                todoData: removeCompleteTask
            }
        })
    }
    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter(item => !item.done);
            case 'completed':
                return items.filter(item => item.done);
            default:
                return items;
        }
    }
    onFilterChange = ( filter ) => {
        this.setState({filter})
    }

    render() {
        const visibleItems = this.filter(this.state.todoData, this.state.filter)
        const countItems = this.state.todoData.filter(el => el.done).length
        const countItemsLeft = this.state.todoData.length - countItems
        return (
            <div className='todoapp'>
                <Header
                        onItemAdd={this.onItemAdd}/>
                <TaskList
                    todos={visibleItems}
                    onDeleted={(id) => this.DeletedTask(id)}
                    onToggleDone={this.onToggleDone}
                    onToggleEdit={this.onToggleEdit}
                    addEditedItem={this.addEditedItem}
                    filter={this.filter}
                />
                <Footer itemsLeft={countItemsLeft}
                        removeCompleteTask={this.removeCompleteTask}
                        filter={this.filter}
                        onFilterChange={this.onFilterChange}
                        />
            </div>
        )
    }
}
