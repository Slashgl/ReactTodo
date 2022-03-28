import React from "react";
import PropTypes from 'prop-types'
import './Clock.css'
import {format} from "date-fns";

export default class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {date: new Date()};
    }
    componentDidMount() {
        const { updateInterval } = this.props
        this.timerID = setInterval(
            () => this.tick(),
            updateInterval
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            createdTime: `created ${format(new Date() - this.props.todos.createdDate, 's')} seconds / ${format(
                new Date() - this.props.todos.createdDate,
                'm'
            )} minutes ago`,
        });
    }
    render() {
        return (
            <>
                <span className='created'>{this.state.createdTime}</span>
            </>
        );
    }
}

Clock.defaultProps ={
    updateInterval: 1000
}

Clock.propTypes = {
    createdDate: PropTypes.string
}