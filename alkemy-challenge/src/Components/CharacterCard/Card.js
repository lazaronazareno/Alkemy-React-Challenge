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
          <div className="container d-flex border border-light border-2 rounded-2 bg-dark align-items-center overflow-hidden">
            <div className={`d-flex flex-row bg-dark align-items-center ${this.state.showDialog ? "flex-column" : ""}`}>
              <img className={`${this.state.showDialog ? "d-none" : "float-start w-50"}`} src={this.props.heroes.image.url} alt={this.props.heroes.id} />
              <div className={`${this.state.showDialog ? "d-none" : "d-flex flex-column align-items-center justify-content-evenly"}`}>
                <h1 className="cardtitle text-danger">{this.props.heroes.name}</h1>
                <div className="d-flex flex-column">
                  <span className="text-wrap text-danger">Intelligence: {this.props.heroes.powerstats.intelligence}</span>
                  <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.intelligence}>intelligence</meter>
                  <span className="text-wrap text-danger">Strength: {this.props.heroes.powerstats.strength}</span>
                  <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.strength}>strength</meter>
                  <span className="text-wrap text-danger">Speed: {this.props.heroes.powerstats.speed}</span>
                  <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.speed}>speed</meter>
                  <span className="text-wrap text-danger">Durability: {this.props.heroes.powerstats.durability}</span>
                  <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.durability}>durability</meter>
                  <span className="text-wrap text-danger">Power: {this.props.heroes.powerstats.power}</span>
                  <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.power}>power</meter>
                  <span className="text-wrap text-danger">Combat: {this.props.heroes.powerstats.combat}</span>
                  <meter className="stats" min="0" max="100" high="75" low="25" optimum="100" value={this.props.heroes.powerstats.combat}>combat</meter>
                </div>
            </div>
            <button type="button" className={`btn btn-danger ${this.state.showDialog ? "" : "buttonClose"}`} onClick={this.handleDialog} >
            </button>
          </div>
          {this.state.showDialog && (
            <div className="details">
              <h2 className="text-wrap text-danger">Biography</h2>
              <span className="text-wrap text-danger">Full Name : {this.props.heroes.biography["full-name"]}</span><br/>
              <span className="text-wrap text-danger">Alter Ego : {this.props.heroes.biography["alter-ego"]}</span><br/>
              <span className="text-wrap text-danger">Aliases : {this.props.heroes.biography.aliases[0]} / {this.props.heroes.biography.aliases[1]}</span><br/>
              <span className="text-wrap text-danger">Place of Birth : {this.props.heroes.biography["place-of-birth"]}</span><br/>
              <span className="text-wrap text-danger">First appearance : {this.props.heroes.biography["first-appearance"]}</span><br/>
              <span className="text-wrap text-danger">Alignment : {this.props.heroes.biography.alignment}</span><br/>
              <h2 className="text-wrap text-danger">Appearance</h2>
              <span className="text-wrap text-danger">Gender : {this.props.heroes.appearance.gender}</span><br/>
              <span className="text-wrap text-danger">Race : {this.props.heroes.appearance.race}</span><br/>
              <span className="text-wrap text-danger">Height : {this.props.heroes.appearance.height[1]}</span><br/>
              <span className="text-wrap text-danger">Weight : {this.props.heroes.appearance.weight[1]}</span><br/>
              <span className="text-wrap text-danger">Eye Color: {this.props.heroes.appearance["eye-color"]}</span><br/>
              <span className="text-wrap text-danger">Hair Color: {this.props.heroes.appearance["hair-color"]}</span><br/>
              <h2 className="text-wrap text-danger">Work</h2>
              <span className="text-wrap text-danger">Occupation: {this.props.heroes.work.occupation}</span><br/>
              <span className="text-wrap text-danger">Base of Operation: {this.props.heroes.work.base}</span><br/>
            </div>
          )}
        </div>
      );
    }
  }

export default CardComplete;
