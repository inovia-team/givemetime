import { Router, Route, IndexRoute } from 'react-router'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Layout from './layout/layout'
import ProjectList from './project/projectList'
import Add from './project/components/addProject/addProject'
import View from './project/components/viewProject/viewProject'
import GiveTime from './project/components/giveTime/giveTime'
import Profile from './profile/profile'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


function AppRoutes ({ history }) {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            { /* Scroll to the top of the page to handle phone landscape mode */ }
            <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={ProjectList} />
                    <Route path="add" component={Add} />
                    <Route path="view/:id" component={View} />
                    <Route path="give/:id" component={GiveTime} />
                    <Route path="me" component={Profile} />
                </Route>
            </Router>
        </MuiThemeProvider>
    )
}
AppRoutes.propTypes = {
    history: PropTypes.object.isRequired,
}


export default connect()(AppRoutes)
