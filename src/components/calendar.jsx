import React from 'react'
import Month from './months'

import './calendar.css'

export default class Calendar extends React.Component {
  
//  declare two objects (events & eventsList) to keep selected days' information
//  isShowEvent & isShowDetail aim to guarantee show current style
    state = {
        events: {},
        eventsList: {} ,
        detailDay: '',
        holiday: false,
        birthday: false,
        busy: false,
        anniversary:false,
        isShowEvent: false,
        isShowDetail: false
    }
// create a callback funtion to read the day information which is selected
    getEvent = (selectedDay,detailDay) => {          
        if(selectedDay === true && !this.state.eventsList[detailDay]){
            this.setState ({
                isShowEvent: true,
                isShowDetail: false,
                holiday: false,
                birthday: false,
                busy: false,
                anniversary: false,
                detailDay:detailDay
            })
        }if(selectedDay === true && this.state.eventsList[detailDay]){
            this.setState ({
                isShowEvent: false,
                isShowDetail: true,
                detailDay:detailDay,
                holiday: this.state.eventsList[detailDay]['holiday'],
                birthday: this.state.eventsList[detailDay]['birthday'],
                busy: this.state.eventsList[detailDay]['busy'],
                anniversary: this.state.eventsList[detailDay]['anniversary']
            })
        }if(selectedDay === false){
            this.setState ({
                isShowEvent: false,
                isShowDetail: false,
            })
        }
    }
    addEvent = () => {
        this.setState ( {
            isShowEvent: false,
            isShowDetail: true,
            holiday: false,
            birthday: false,
            busy: false,
            anniversary:false,
        })
    }
//a funtion which can handle submit event：save the day's mark, after submit it will clean the checkbox value
    handleSubmit = () => {
        this.state.events['holiday'] = this.state.holiday
        this.state.events['birthday'] = this.state.birthday
        this.state.events['busy'] = this.state.busy
        this.state.events['anniversary'] = this.state.anniversary
        this.state.eventsList[this.state.detailDay] = Object.assign({},this.state.events)
        if(!this.state.holiday && !this.state.birthday && !this.state.busy &&!this.state.anniversary){
            this.state.eventsList[this.state.detailDay] =  Object.assign({},'')
            this.setState ( {
                isShowEvent:true,
                isShowDetail: false,
            })
        }else{
            this.setState ( {
                isShowDetail: false
            })
        }   
    }
//props
    markDays = () => {
        return this.state.eventsList
    }
    handleCheckBox1 = (e) => {
        let value = e.target.checked
        this.setState({
            holiday: value
        })
    }
    handleCheckBox2 = (e) => {
        let value = e.target.checked
        this.setState({
            birthday: value
        })
    }
    handleCheckBox3 = (e) => {
        let value = e.target.checked;
        this.setState({
            busy: value,
        })
    }
    handleCheckBox4 = (e) => {
        let value = e.target.checked
        this.setState({
            anniversary: value
        })
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
                    <label className="label-text holiday">Holiday</label>
                    <input type="checkbox" id="box1" className="check" key={1} checked = {this.state.holiday} onChange = {this.handleCheckBox1}></input>
                    <label htmlFor="box1"></label><br></br>
                    <label className="label-text birthday">Birthday</label>
                    <input type="checkbox" id="box2" className="check" key={2} checked = {this.state.birthday} onChange = {this.handleCheckBox2}></input>
                    <label htmlFor="box2"></label><br></br>
                    <label className="label-text busy">Busy</label>
                    <input type="checkbox" id="box3" className="check" key={3} checked = {this.state.busy} onChange = {this.handleCheckBox3}></input>
                    <label htmlFor="box3"></label><br></br>
                    <label className="label-text anniversary">Anniversary</label>
                    <input type="checkbox" id="box4" className="check" key={4} checked = {this.state.anniversary} onChange = {this.handleCheckBox4}></input>
                    <label htmlFor="box4"></label><br></br>
                    <input className="submit" type="submit" onClick = {this.handleSubmit}></input>
                </div>
            </div> 
        )
    }
}