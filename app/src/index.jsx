require('file?name=[name].[ext]!./index.html')

import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './configureStore'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = configureStore({

})

const history = syncHistoryWithStore(browserHistory, store)

import Routes from './Route'

ReactDom.render(
    <Provider store={store}>
        <div>
            <Routes history={history} />
        </div>
    </Provider>,
    document.getElementById('main')
)
