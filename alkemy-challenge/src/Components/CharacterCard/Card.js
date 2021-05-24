import React from 'react';
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
          <div className="mainDiv">
            <div className={`${this.state.showDialog ? "cardDivChanged" : "cardDiv"}`}>
              <img className={`${this.state.showDialog ? "imageChanged" : "image"}`} src={this.props.heroes.image.url} alt={this.props.heroes.id} />
              <div className={`${this.state.showDialog ? "statsClose" : "statsDivGeneral"}`}>
              <h1 className="cardName">{this.props.heroes.name}</h1>
              <div className="statsDiv1">
              <span className="cardName">Intelligence: {this.props.heroes.powerstats.intelligence}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.intelligence}>intelligence</meter>
              <span className="cardName">Strength: {this.props.heroes.powerstats.strength}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.strength}>strength</meter>
              <span className="cardName">Speed: {this.props.heroes.powerstats.speed}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.speed}>speed</meter>
              <span className="cardName">Durability: {this.props.heroes.powerstats.durability}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.durability}>durability</meter>
              <span className="cardName">Power: {this.props.heroes.powerstats.power}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.power}>power</meter>
              <span className="cardName">Combat: {this.props.heroes.powerstats.combat}</span>
            <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.combat}>combat</meter>
            </div>
            </div>
            <button className={`button ${this.state.showDialog ? "" : "buttonClose"}`} onClick={this.handleDialog} >
              <div className={`bar1 ${this.state.showDialog ? "barchanged1" : ""}`}></div>
              <div className={`bar2 ${this.state.showDialog ? "barchanged2" : ""}`}></div>
              <div className={`bar3 ${this.state.showDialog ? "barchanged3" : ""}`}></div>
            </button>
          </div>
          {this.state.showDialog && (
            <div className="details">
              <h2 className="cardName">Biography</h2>
              <span>Full Name : {this.props.heroes.biography["full-name"]}</span><br/>
              <span>Alter Ego : {this.props.heroes.biography["alter-ego"]}</span><br/>
              <span>Aliases : {this.props.heroes.biography.aliases[0]} / {this.props.heroes.biography.aliases[1]}</span><br/>
              <span>Place of Birth : {this.props.heroes.biography["place-of-birth"]}</span><br/>
              <span>First appearance : {this.props.heroes.biography["first-appearance"]}</span><br/>
              <span>Alignment : {this.props.heroes.biography.alignment}</span><br/>
              <h2 className="cardName">Appearance</h2>
              <span>Gender : {this.props.heroes.appearance.gender}</span><br/>
              <span>Race : {this.props.heroes.appearance.race}</span><br/>
              <span>Height : {this.props.heroes.appearance.height[1]}</span><br/>
              <span>Weight : {this.props.heroes.appearance.weight[1]}</span><br/>
              <span>Eye Color: {this.props.heroes.appearance["eye-color"]}</span><br/>
              <span>Hair Color: {this.props.heroes.appearance["hair-color"]}</span><br/>
              <h2 className="cardName">Work</h2>
              <span>Occupation: {this.props.heroes.work.occupation}</span><br/>
              <span>Base of Operation: {this.props.heroes.work.base}</span><br/>
            </div>
          )}
        </div>
      );
    }
  }

export default CardComplete;
