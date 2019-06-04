import React from 'react'
import moment from 'moment'

import './days.css'

export default class Days extends React.Component {
 
    state = {
        markedDays:this.props.markdays,
        currentDay: moment(),
        selectedDay: false,
        detailInfo: '',
        detailDay:''
    }
    weekdaysShort = moment.weekdaysShort()
    firstDayOfMonth = () => {
        let dateObject = this.props.date
        let firstDay = moment(dateObject)
                      .startOf('month')
                      .format('d')
        return firstDay
    }
    currentDay = () => {
        if (this.props.date.format('l') === this.state.currentDay.format('l'))
        return this.state.currentDay.format('D')   
    }
    daysInMonth = () =>{
        let daysInMonth = this.props.date.daysInMonth()
        return daysInMonth
    }  
// binding day click event: pass day detail to calendar
    onDayClick = (e, d) => {
        this.setState({
            selectedDay: true,
            detailDay: this.props.date + d
        },
        () => {
            this.sendDetailInfo(this.state.detailDay)
        })
    }
    sendDetailInfo = (detailDay) =>{
       this.props.callbackFromDays(this.state.selectedDay,detailDay)
    }
    render () {
        let weekdaysShortName = this.weekdaysShort.map(day => {
            return(
                <th key={day} className="weekdays-short-name">
                  {day}
                </th>  
            ) 
        })
        let blanks = []
        for (let i = 0; i < this.firstDayOfMonth(); i++){
            blanks.push(
                <td key={i} className="all-days empty"> 
                {""} 
                </td>
            )
        }
        let markedday = ""
        let days = []
        let markkey = {}
        markkey[this.state.detailDay] = this.state.markedDays
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let currentday = (d == this.currentDay() ? "today" : "all-days")
            let allCells = d+Number(this.firstDayOfMonth())
            let weekend = ((allCells%7 === 0||allCells%7 === 1) ?"weekend":"")
// in oder to show different color by select different types of day
            if(this.state.markedDays[this.props.date+d] && this.state.markedDays[this.props.date+d].holiday === true){
                markedday = "holiday"
            }if(this.state.markedDays[this.props.date+d] && this.state.markedDays[this.props.date+d].birthday === true){
                markedday = "birthday"
            }
            if(this.state.markedDays[this.props.date+d] && this.state.markedDays[this.props.date+d].busy === true){
                markedday = "busy"
            }
            if(this.state.markedDays[this.props.date+d] && this.state.markedDays[this.props.date+d].anniversary === true){
                markedday = "anniversary"
            }
           if((this.state.markedDays[this.props.date+d]) && !(this.state.markedDays[this.props.date+d])==""){
            days.push(
                <td key={allCells} className ={"day-cell"}>
                    <span className = {`${currentday} ${weekend}  ${markedday}`} onClick = {e =>{this.onDayClick(e,d)}} >
                      {d}
                    </span>
                </td>
            )
            }else{
                days.push(
                    <td key={allCells} className ={"day-cell"}>
                        <span className = {`${currentday} ${weekend}`} onClick = {e => {this.onDayClick(e,d)}} >
                        {d}
                        </span>
                    </td>
            )}
        }
        var totalSlots = [...blanks, ...days]
        let rows = []
        let cells = []
// a loop which put all days in to a container 
        totalSlots.forEach((day, i) => {
          if (i % 7 !== 0) {
            cells.push(day)
          } else {
            rows.push(cells)
            cells = [] 
            cells.push(day)
          }
          if (i === totalSlots.length - 1) { 
            rows.push(cells)
          }
        })
        let daysInMonth = rows.map((d, i) => {
        if(this.state.selectedDay === true){
          return <tr key={i}>
           {d} 
          </tr>
        }else{
            return <tr key={i}>
             {d} 
            </tr>
            }
        })
    return(
        <table className="calendar-day">
            <thead>
                <tr>
                    {weekdaysShortName}
                </tr>
            </thead>
        <tbody>{daysInMonth}</tbody>
      </table>
       )    
    }
}