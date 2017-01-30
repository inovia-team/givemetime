import { Router, Route, IndexRoute } from 'react-router'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Layout from './layout/layout'
import ProjectList from './project/projectList'
import Add from './project/components/addProject/addProject'
import GiveTime from './project/components/giveTime/giveTime'
import Profile from './profile/profile'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


function AppRoutes ({ history }) {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={history}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={ProjectList} completed={false} />
                    <Route path="add" component={Add} />
                    <Route path="completed" component={ProjectList} completed={true} />
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
