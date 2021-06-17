import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Login from './Components/Form/Login';
import NotFound from './Components/NotFound/NotFound';
import Searcher from './Components/Searcher/Searcher';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
    return (
      <>
      { !token && (
        <div className="App bg-danger">
          <Login setToken={setToken} />
        </div>
        )}
        { token && (
          <div className="App bg-danger">
            <BrowserRouter>
             <Switch>
               <Route exact path="/" component={Searcher} />
               <Route path="" component={NotFound}/>
             </Switch>
           </BrowserRouter>
          </div>
        )}
    </>
    );
  }

export default App; 
