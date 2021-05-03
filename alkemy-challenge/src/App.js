import React from 'react'

class App extends React.Component {
  state = {
    loading: true,
    error: null,
    data:{
      results: [],
    }
  }
  componentDidMount() {
    this.fetchSuperHero()
  }
  fetchSuperHero = async () => {
    this.setState ({loading: true, error:null})
    try{
      const response = await fetch('https://superheroapi.com/api/4136848176351482/character-id/biography', {
        'mode': `no-cors`,
      });
      const data = await response.json();
  
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
    if(this.state.error) {
      return  `Error: ${this.state.error.message}`;
    }
    return (
      <div>
        <ul>
          {this.state.data.results.map(id => (
            <li key={id.id}>
              <h1>{id.name}</h1>
            </li>
          ))}
        </ul>

        {this.state.loading && (
          <div>
            <h1>cargando123</h1>
            </div>
        )}
      </div>
    )
  }
}

export default App; 
