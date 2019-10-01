import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ExpenseDashBoardPage from '../components/ExpenseDashboard';
import Header from '../components/HeaderComponent';
import Main from '../components/MainComponent'; 

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashBoardPage} exact={true}/>
        <Route path="/main" component={Main}/>
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter;