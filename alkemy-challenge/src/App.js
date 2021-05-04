import React from 'react';
import api from './api';

class App extends React.Component {
  state = {
    loading: true,
    error: null,
    data: []
  }
  componentDidMount() {
    this.fetchSuperHero()
  }
  fetchSuperHero = async () => {
    this.setState ({loading: true, error:null})
    try{
      const data = await api.id.biography();
      this.setState({
        loading: false,
        data: data,
      });
    } catch (error){
      this.setState({
        loading: false,
        error: error,
      })
    }
  };

  render() {
    if( this.state.error) {
      return `Error : ${this.state.error.message}`;
    }
    return (
      <div>
        <h1>
          {this.state.data.map( results => (
            <div>
              <h1>{results.biography.algnment}</h1>
            </div>
          ))}
        </h1>
        {this.state.loading && (
            <h1>cargando123</h1>
        )}
      </div>
    );
  }
}

export default App; 
