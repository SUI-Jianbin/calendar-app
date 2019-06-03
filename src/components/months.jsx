import React from 'react'
import moment from 'moment'
import Days from './days'

import './months.css'

export default class Months extends React.Component {

    state = {
        allMonths: moment.months(),
        monthsObject: moment() 
    }
// a callback funtion which get detail information
    getDetail = (isShowDetail,detailDay) => {
        return this.props.callbackFromMonth(isShowDetail,detailDay)
    }
// get an array of all the months
    collectMonthsObject = () => {
        let allMonths =[]
        for(let m =0; m < 12; m++) {
            let monthsObject = Object.assign({}, this.state.monthsObject)
            monthsObject =  moment(monthsObject).set('month', m)
            allMonths.push(monthsObject)
        }
        return allMonths
    }
    render () {
        let monthsInYear = this.collectMonthsObject().map ((m, i) =>{
            return( 
                <Days key= {i} date= {m} callbackFromDays = {this.getDetail} markdays = {this.props.markdays}></Days>
            )
        })
        return(
            <div className="allmonths">
               {monthsInYear}
            </div>
        )
    }
}