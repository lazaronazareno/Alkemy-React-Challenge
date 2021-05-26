import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Login from './Components/Form/Login';
import Searcher from './Components/Searcher/Searcher';

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
         <Switch>
           <Route exact path="/" component={Login} />
           <Route exact path="/search" component={Searcher} />
         </Switch>
       </BrowserRouter>
      </>
    );
  }
}

export default App; 
