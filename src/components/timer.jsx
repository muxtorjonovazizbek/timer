import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Timer extends Component {
    state = {
        hour: 0,
        minuts: 0,
        seconds: 0,
        disabled: false,
        inter: null,
        interval: [],
    }

    start = () => {
        const a = setInterval(() => {
            const { hour, minuts, seconds } = this.state

            if (seconds === 59) {
                this.setState({
                    seconds: 0,
                    minuts: minuts + 1
                })
            } else {
                this.setState({
                    seconds: seconds + 1
                })
            }

            if (minuts === 59) {
                this.setState({
                    seconds: 0,
                    minuts: 0,
                    hour: hour + 1  
                })
            }
        }, 100)
        this.setState({
            disabled: true,
            inter: a
        })

    }

    stop = () => {
        clearInterval(this.state.inter)
        this.setState({
            disabled: false
        })
    }

    clear = () => {
        clearInterval(this.state.inter)
        this.setState({
            hour: 0,
            minuts: 0,
            seconds: 0,
            disabled: false,

        })
    }

    interval = () => {
        const { hour, minuts, seconds, interval } = this.state
        interval.push(`${String(hour).padStart(2, '0')}:${String(minuts).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
        this.setState({
            interval: interval
        })
    }

    deleteTime = (ind) => {
        const { interval } = this.state
        const updateInteval = interval.filter((_, i) => i !== ind) 
        this.setState({
            interval: updateInteval
        })
    }

    render() {
        const { hour, minuts, seconds, disabled, interval } = this.state

        const displayHours = String(hour).padStart(2, "0")
        const displayMinuts = String(minuts).padStart(2, "0")
        const displaySeconds = String(seconds).padStart(2, "0")

        return (
            <div className='container-fluid'>
                <div className="row mt-4">
                    <div className="col-md-6 col-sm-10 offset-md-3 offset-sm-1"> 
                        <div className="card">
                            <div className="card-header">
                                <h3 className='text-center'>Timer</h3>
                            </div>
                            <div className="card-body mt-3 mb-3">
                                <h4 className='text-center'>{displayHours}:{displayMinuts}:{displaySeconds}</h4>
                            </div>
                            <div className="card-footer d-flex justify-content-around">
                                <button className='btn btn-success' disabled={disabled} onClick={this.start}>Start</button>
                                <button className='btn btn-danger' onClick={this.stop}>Stop</button>
                                <button className='btn btn-info' onClick={this.clear}>Clear</button>
                                <button className='btn btn-primary' onClick={this.interval}>Interval</button>
                            </div>

                            {
                                interval.map((val, ind) => {
                                    return <div key={ind} className='d-flex justify-content-between px-3 align-items-center'>
                                        <p>{val}</p>
                                        <button onClick={() => this.deleteTime(ind)} className='btn btn-danger my-1'>X</button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
