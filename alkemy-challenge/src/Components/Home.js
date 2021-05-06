import React from 'react';
import api from '../api';
import CardComplete from './CharacterCard/Card';
import '../App.scss';

class Home extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined
  };

  componentDidMount() {
    this.fetchSuperHero()
  };

  fetchSuperHero = async () => {
    this.setState ({loading: true, error:null})
    try{
      const data = await api.id.randomHero();
      console.log(data)
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
    if (this.state.loading === true) {
      return 'Cargando...';
    }
    if( this.state.error) {
      return `Error : ${this.state.error.message}`;
    }
    return (
        <CardComplete heroes={this.state.data} key={this.state.data.id} />
    );
  }
}

export default Home; 
