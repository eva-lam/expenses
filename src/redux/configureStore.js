import{ createStore, applyMiddleware, compose}from 'redux'; 
import reducers from "../reducers/index"
import thunk from 'redux-thunk'; 
import logger from 'redux-logger'; 

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose; 

export const ConfigureStore = ()=>{
    const store = createStore(
        reducers,
        composeEnhancers( applyMiddleware(thunk,logger) ) // wrap the middfware in composeEnhancers to allow debugger to catch all action without the middlewares
    );
    return store;
}