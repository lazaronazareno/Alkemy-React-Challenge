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
    return (
      <>
      { !token && (
        <div className="App bg-danger">
          <BrowserRouter>
          <Layout button={null}>
            <Login setToken={setToken} />
          </Layout>
          </BrowserRouter>
        </div>
      )}
      { token && (
        <div className="App bg-danger">
          <BrowserRouter>
          <Layout button={true}>
            <Switch>
              <Route exact path={["/", "/search"]}>
                <Searcher/>
              </Route>
              <Route exact path="/team">
                <MyTeam/>
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
