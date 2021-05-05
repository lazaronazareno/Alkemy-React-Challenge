import React from 'react';
import './styles.scss';

class CardComplete extends React.Component {
    render() {
      return (
          <div className="mainDiv">
            <div className="cardDiv">
              <img className="image" src={this.props.heroes.image.url} alt={this.props.heroes.id} />
              <h1 className="cardName">{this.props.heroes.name}</h1>
              <h2 className="cardName">{this.props.heroes.biography.alignment}</h2>
          </div>
          <div className="statsDiv">
              <h1 className="statsName">PowerStats</h1>
              <span className="statsName">Intelligence</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.intelligence}>intelligence</meter>
              <span className="statsName">Strength</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.strength}>strength</meter>
              <span className="statsName">Speed</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.speed}>speed</meter>
              <span className="statsName">Durability</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.durability}>durability</meter>
              <span className="statsName">Power</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.power}>power</meter>
              <span className="statsName">Combat</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.combat}>combat</meter>
          </div>
        </div>
      );
    }
  }

export default CardComplete;
