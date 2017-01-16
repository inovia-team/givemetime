import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import { ProjectListComponent } from '../project/projectList.view'
var moment = require('moment')
moment().format()

import './profile.css'

export class ProfileComponent extends React.Component {
    constructor (props) {
        super(props)

        // Disable picking a date before tomorrow
        const minDate = new Date()
        minDate.setFullYear(minDate.getFullYear())
        minDate.setMonth(minDate.getMonth())
        minDate.setDate(minDate.getDate() + 1)
        this.state = {
            expectedCredit: null,
            minDate: minDate,
        }
    }

    handleChangeDate (date, event) {
        var currentDate = moment().set({ 'hour': 0, 'minute': 0 })
        var diffDate = currentDate.diff(event, 'days') * -1 + 1 // * -1 to get a positive value. +1 to adjust from today
        this.setState({ expectedCredit: Math.round((diffDate * 0.2739726027) * 1e2) / 1e2 }) // We don't need an absolute precision
    }

    componentDidMount () {
        this.props.loadProjects()
    }
    render () {
        return (
            <div className='profile'>
                <Avatar size={150} src={this.props.user.avatar.replace('?sz=50', '')} /> { /* Get rid of the size */ }
                <div className='user_infos'>{this.props.user.fullname}<br/> Crédits : {this.props.user.credit}</div>
                <DatePicker
                    className='date_picker'
                    hintText="Calculate your future credits !"
                    container="inline"
                    autoOk={true}
                    minDate={this.state.minDate}
                    onChange={(x, event) => this.handleChangeDate(x,event)} />
                { this.state.expectedCredit ? <p style={{ textAlign: 'center' }}>On the date you selected you should have : <br/>{(this.props.user.credit + this.state.expectedCredit).toFixed(2)} credits</p> : '' }
                <div className='my_project'>
                    My projects:
                    <ProjectListComponent fromProfile={true} projects={this.props.myProject}></ProjectListComponent>
                </div>
            <RaisedButton backgroundColor='#D84315' onClick={this.props.handleLogout} style={{ padding: '3px', width: '100%' }} label={'Logout'}/>
            </div>
        )
    }
}

ProfileComponent.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.int,
        fullname: PropTypes.string,
        credit: PropTypes.number,
        avatar: PropTypes.string,
    }).isRequired,
    handleLogout: PropTypes.func.isRequired,
    loadProjects: PropTypes.func.isRequired,
    myProject: PropTypes.array.isRequired,
}
