import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import CardComplete from './Components/CharacterCard/Card';
import Login from './Components/Form/Login';
import Home from './Components/Home';
import Searcher from './Components/Searcher/Searcher';

class App extends React.Component {
  render() {
//    if (this.state.loading === true) {
//      return 'Cargando...';
//    }
//    if( this.state.error) {
//      return `Error : ${this.state.error.message}`;
//    }
    return (
      <div className="main">
        <BrowserRouter>
         <Switch>
           <Route exact path="/home" component={Home} />
           <Route exact path="/card" component={CardComplete} />
           <Route exact path="/" component={Login} />
           <Route exact path="/search" component={Searcher} />
         </Switch>
       </BrowserRouter>
      </div>
    );
  }
}

export default App; 
