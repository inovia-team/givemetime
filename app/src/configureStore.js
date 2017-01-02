import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import giveMeTimeReducer from './reducer'
import { browserHistory } from 'react-router'
import { routerReducer } from 'react-router-redux'
import { routerMiddleware } from 'react-router-redux'
import { layoutMiddleware } from './layout/layout.middleware'


const middlewares = [thunkMiddleware, routerMiddleware(browserHistory), layoutMiddleware]

export default function configureStore (initialState) {

    const enhancer = compose(
        // Middleware you want to use in development:
        applyMiddleware(...middlewares),
        // enable redux extension
        window.devToolsExtension ? window.devToolsExtension() : () => {}
    )

    const store = createStore(combineReducers({
        project: giveMeTimeReducer,
        form: formReducer,
        routing: routerReducer,
    }), initialState, enhancer)

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('./reducer.js', () =>
            store.replaceReducer(combineReducers({
                project: require('./reducer.js'),
                form: formReducer,
            })) /*.default if you use Babel 6+ */
        )
    }

    return store
}