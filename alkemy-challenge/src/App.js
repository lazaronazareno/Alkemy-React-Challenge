import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Layout from './Components/Layout';
import Login from './Components/Login/Login';
import MyTeam from './Components/MyTeam.js/MyTeam';
import NotFound from './Components/NotFound/NotFound';
import Searcher from './Components/Searcher/Searcher';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  const { list, setList } = useState();
    return (
      <>
      { !token && (
        <div className="App bg-danger">
          <Layout>
            <Login setToken={setToken} />
          </Layout>
        </div>
        )}
        { token && (
          <div className="App bg-danger">
            <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path={["/", "/search"]}>
                  <Searcher setList={setList}/>
                </Route>
                <Route exact path="/team">
                  <MyTeam list={list}/>
                </Route>
                <Route component={NotFound}/>
              </Switch>
            </Layout>
           </BrowserRouter>
          </div>
        )}
    </>
    );
  }

export default App; 
