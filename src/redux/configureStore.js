import{createStore,applyMiddleware}from 'redux'; 
import reducers from "../reducers/index"
import thunk from 'redux-thunk'; 
import logger from 'redux-logger'; 


export const ConfigureStore = ()=>{

    const store = createStore(
        reducers,
        applyMiddleware(thunk,logger)
    );

    return store;
}