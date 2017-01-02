import { Router, Route, IndexRoute } from 'react-router'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Layout from './layout/layout'
import ProjectList from './project/projectList'
import Add from './project/components/addProject/addProject'
import View from './project/components/viewProject/viewProject'
import GiveTime from './project/components/giveTime/giveTime'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


function AppRoutes ({ history }) {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={history}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={ProjectList} />
                    <Route path="add" component={Add} />
                    <Route path="view/:id" component={View} />
                    <Route path="give/:id/:rowId" component={GiveTime} />
                </Route>
            </Router>
        </MuiThemeProvider>
    )
}
AppRoutes.propTypes = {
    history: PropTypes.object.isRequired,
}


export default connect()(AppRoutes)