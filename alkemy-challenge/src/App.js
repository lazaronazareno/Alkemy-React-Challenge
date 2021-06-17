import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Login from './Components/Form/Login';
import NotFound from './Components/NotFound/NotFound';
import Searcher from './Components/Searcher/Searcher';

class App extends React.Component {
  render() {
    return (
      <div className="App bg-danger">
        <BrowserRouter>
         <Switch>
           <Route exact path="/" component={Login} />
           <Route exact path="/search" component={Searcher} />
           <Route component={NotFound} />
         </Switch>
       </BrowserRouter>
      </div>
    );
  }
}

export default App; 
