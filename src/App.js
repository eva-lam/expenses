import React, { Component } from 'react';
import {Provider} from 'react-redux';

import AppRouter from './routers/AppRouter';
import {ConfigureStore} from './redux/configureStore';

// Library CSS's priority is higher
import 'bootstrap/dist/css/bootstrap.min.css';
// Custom-made CSS to override 3rd party CSS - ok 
import './App.css';

const store = ConfigureStore()


class App extends Component {
  //in order to store the state you need to define state in constructor

  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <AppRouter />
        </div>
      </Provider>
   
    );
  }
}


export default App;