import React from 'react'

function Powerstats(props) {
  console.log(props)
    return (
        <div className="container d-flex responsive-column">
                <span className="text-wrap text-danger">Intelligence : {props.powerstats[0]}</span>
                <meter className="stats" 
                  min="0" 
                  max={props.superheroes.length*100} 
                  high={props.superheroes.length*75} 
                  low={props.superheroes.length*25} 
                  optimum={props.superheroes.length*100} 
                  value={props.powerstats[0]}
                  >intelligence
                </meter>
                <span className="text-wrap text-danger">Strength : {props.powerstats[1]}</span>  
                <meter className="stats"
                    min="0"
                    max={props.superheroes.length*100} 
                    high={props.superheroes.length*75}
                    low={props.superheroes.length*25} 
                    optimum={props.superheroes.length*100} 
                    value={props.powerstats[1]}
                    >Strength
                </meter>
                <span className="text-wrap text-danger">Speed : {props.powerstats[2]}</span>
                <meter className="stats" 
                  min="0" 
                  max={props.superheroes.length*100} 
                  high={props.superheroes.length*75} 
                  low={props.superheroes.length*25} 
                  optimum={props.superheroes.length*100} 
                  value={props.powerstats[2]}
                  >Speed
                </meter>
                <span className="text-wrap text-danger">Durability : {props.powerstats[3]}</span>
                <meter className="stats" 
                  min="0" 
                  max={props.superheroes.length*100} 
                  high={props.superheroes.length*75} 
                  low={props.superheroes.length*25} 
                  optimum={props.superheroes.length*100} 
                  value={props.powerstats[3]}
                  >Durability
                </meter>
                <span className="text-wrap text-danger">Power : {props.powerstats[4]}</span>
                <meter className="stats"
                   min="0" 
                   max={props.superheroes.length*100} 
                   high={props.superheroes.length*75} 
                   low={props.superheroes.length*25} 
                   optimum={props.superheroes.length*100} 
                   value={props.powerstats[4]}
                   >Power
                </meter>
                <span className="text-wrap text-danger">Combat : {props.powerstats[5]}</span>
                <meter className="stats"
                   min="0" 
                   max={props.superheroes.length*100} 
                   high={props.superheroes.length*75} 
                   low={props.superheroes.length*25} 
                   optimum={props.superheroes.length*100} 
                   value={props.powerstats[5]}
                   >Combat
                </meter>
        </div>
    )
}

export default Powerstats;
