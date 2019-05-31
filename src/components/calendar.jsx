import React from 'react'
import Month from './months'

import './calendar.css'

//declare two global variables to keep days' information
const events = {}
const eventsList = {}  

export default class Calendar extends React.Component {

    state = {
        detailDay: '',
        holiday: false,
        birthday: false,
        busy: false,
        anniversary:false,
        isShowEvent: false
    }
// create a callback funtion to read the day information which is selected
    getEvent = (selectedDay,detailDay) => {           
        if(selectedDay == true && !eventsList[detailDay]){
            this.setState ( {
                isShowEvent: true,
                isShowDetail: false,
                detailDay:detailDay
            })
        }else {
            this.setState ({
                isShowEvent: false,
                isShowDetail: true,
                detailDay:detailDay
            })
        }
    }
    addEvent = () => {
        this.setState ( {
            isShowEvent: false,
            isShowDetail: true
        })
    }
//a funtion which can handle submit event：save the day's mark, after submit it will clean the checkbox value
    handleSubmit = () => {
        events['holiday'] = this.state.holiday
        events['birthday'] = this.state.birthday
        events['busy'] = this.state.busy
        events['anniversary'] = this.state.anniversary
        eventsList[this.state.detailDay] = events
        if(!this.state.holiday && !this.state.birthday && !this.state.busy &&!this.state.anniversary){
            eventsList[this.state.detailDay] = '' 
        }
        this.setState ( {
            isShowDetail: false,
            holiday:false,
            birthday:false,
            busy: false,
            anniversary: false
        })
    }
//props
    markDays = () => {
        return eventsList
    }
    render () {
        let showEvent = (this.state.isShowEvent == true ? "event-info" : "none-info")
        let showDetail =(this.state.isShowDetail == true ? "detail-info" :"none-info")
        return(
            <div>
                <div className="calendar">2019 Calendar </div> 
                <Month callbackFromMonth = {this.getEvent} markdays = {this.markDays()}></Month>
                <div className={showEvent}>
                    <div className="note">No events! Click to</div>
                    <button className = "addEvent" onClick = {this.addEvent}>Add</button>
                </div>
                <div className={showDetail}>
                    <label className="label-text holiday">Holiday</label><input type="checkbox" className="check" key={1} onChange = {(e) => {this.setState({holiday:!this.state.holiday})}}></input><br></br>
                    <label className="label-text birthday">Birthday</label><input type="checkbox" className="check" key={2} onChange = {(e) => {this.setState({birthday:!this.state.birthday})}}></input><br></br>
                    <label className="label-text busy">Busy</label><input type="checkbox" className="check" key={3} onChange = {(e) => {this.setState({busy:!this.state.busy})}}></input><br></br>
                    <label className="label-text anniversary">Anniversary</label><input type="checkbox" className="check" key={4} onChange = {(e) => {this.setState({anniversary:!this.state.anniversary})}}></input><br></br>
                    <input className="submit" type="submit" onClick = {this.handleSubmit}></input>
                </div>
            </div> 
        )
    }
}