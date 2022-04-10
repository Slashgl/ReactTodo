import React from "react";
import './Header.css'
export default class Header extends React.Component{
    state = {
        label: '',
    }
    render() {
        const onLabelChange = (e) => {
            this.setState({
                label: e.target.value
            })
        }
        const onSubmitForm = (e) => {
            e.preventDefault()
            if(this.state.label !== '') {
                this.props.onItemAdd(this.state.label)
            }
        }

        return (
            <div>
                <h1>todos</h1>
                <form onSubmit={onSubmitForm}>
                    <input
                        className='new-todo'
                        placeholder="What needs to be done?"
                        onChange={onLabelChange}
                        value={this.state.label}
                    />
                </form>
            </div>
        )
    }
}
