import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

class CardComplete extends React.Component {
  state = {
    heroId : this.props.heroes.id,
    fetchCharacter : true,
    showDialog : false,
  }

  handleDialog = () => {
    this.setState({
      showDialog: !this.state.showDialog,
    });
  }
    render() {
      return (
          <div className="mainDiv" onClick={this.handleDialog}>
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
            <button className={`open ${this.state.showDialog ? "open" : "close"}`} onClick={this.handleDialog} />
          </div>
          {this.state.showDialog && (
            <div className="details">
              <h1>Biography</h1>
              <h2>Full Name : {this.props.heroes.biography["full-name"]}</h2>
              <h2>Alter Ego : {this.props.heroes.biography["alter-ego"]}</h2>
              <h2>Aliases : {this.props.heroes.biography.aliases[0]} / {this.props.heroes.biography.aliases[1]}</h2>
              <h2>Place of Birth : {this.props.heroes.biography["place-of-birth"]}</h2>
              <h2>First appearance : {this.props.heroes.biography["first-appearance"]}</h2>
              <h2>Alignment : {this.props.heroes.biography.alignment}</h2>
              <h1>Appearance</h1>
              <h2>Gender : {this.props.heroes.appearance.gender}</h2>
              <h2>Race : {this.props.heroes.appearance.race}</h2>
              <h2>Height : {this.props.heroes.appearance.height[1]}</h2>
              <h2>Weight : {this.props.heroes.appearance.weight[1]}</h2>
              <h2>Eye Color: {this.props.heroes.appearance["eye-color"]}</h2>
              <h2>Hair Color: {this.props.heroes.appearance["hair-color"]}</h2>
              <h1>Work</h1>
              <h2>Occupation: {this.props.heroes.work.occupation}</h2>
              <h2>Base of Operation: {this.props.heroes.work.base}</h2>
            </div>
          )}
        </div>
      );
    }
  }

export default CardComplete;
