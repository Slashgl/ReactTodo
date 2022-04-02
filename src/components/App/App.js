import React from "react";
import Header from "../Header/Header";
import './App.css';
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/footer";

export default class App extends React.Component {
    maxId = 100;
    state = {
        todoData: [
            this.createItemState('Complete task'),
            this.createItemState('Editing task'),
            this.createItemState('Active task'),
        ],
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
            important: false,
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
    setFilter = (filter) => {
        const newArr = [...this.state.todoData];

        newArr.map((item) => {
            const newItem = item;
            newItem.visibility = true;
            return newItem;
        });

        if (filter === 'Active') {
            newArr.map((item) => {
                const newItem = item;
                if (item.done === true) newItem.visibility = false;
                return newItem;
            });
        }
        if (filter === 'Completed') {
            newArr.map((item) => {
                const newItem = item;
                if (item.done !== true) newItem.visibility = false;
                return newItem;
            });
        }
        this.setState(() => ({
            todoData: newArr,
        }));
    };

    render() {
        const countItems = this.state.todoData.filter(el => el.done).length
        const countItemsLeft = this.state.todoData.length - countItems
        return (
            <div className='todoapp'>
                <Header todos={this.state.todoData}
                        onItemAdd={this.onItemAdd}/>
                <TaskList
                    todos={this.state.todoData}
                    onDeleted={(id) => this.DeletedTask(id)}
                    onToggleDone={this.onToggleDone}
                    onToggleEdit={this.onToggleEdit}
                    addEditedItem={this.addEditedItem}
                />
                <Footer itemsLeft={countItemsLeft}
                        todos={this.state.todoData}
                        removeCompleteTask={this.removeCompleteTask}
                        setFilter={this.setFilter}
                        />
            </div>
        )
    }
}
