import React, { Component } from 'react';
import AppRouter from './routers/AppRouter';
// import logo from './logo.svg';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = ConfigureStore()


class App extends Component {
  //in order to store the state you need to define state in constructor

  
  render() {
    
  
    
    return (
    
      <Provider store = {store}>
  
        
        <div className ="App">
            <AppRouter />
        </div>

        
        
      </Provider>
   
    );
  }
}


export default App;