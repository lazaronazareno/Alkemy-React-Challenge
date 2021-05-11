import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

class CardComplete extends React.Component {
  state = {
    heroId : this.props.heroes.id,
  }
    render() {
      return (
          <div className="mainDiv">
            <div className="cardDiv">
              <img className="image" src={this.props.heroes.image.url} alt={this.props.heroes.id} />
              <h1 className="cardName">{this.props.heroes.name}</h1>
              <h2 className="cardName">PowerStats</h2>
              <span className="cardName">Intelligence : {this.props.heroes.powerstats.intelligence}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.intelligence}>intelligence</meter>
              <span className="cardName">Strength : {this.props.heroes.powerstats.strength}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.strength}>strength</meter>
              <span className="cardName">Speed : {this.props.heroes.powerstats.speed}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.speed}>speed</meter>
              <span className="cardName">Durability : {this.props.heroes.powerstats.durability}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.durability}>durability</meter>
              <span className="cardName">Power : {this.props.heroes.powerstats.power}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.power}>power</meter>
              <span className="cardName">Combat : {this.props.heroes.powerstats.combat}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.combat}>combat</meter>
            <Link to="/Details" id={this.state.heroId}>+ Detalles</Link>
          </div>
        </div>
      );
    }
  }

export default CardComplete;
