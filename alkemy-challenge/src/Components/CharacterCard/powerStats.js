import React from 'react'

function PowerStats(props) {
    return (
        <div className="powerStatsDiv">
                <span className="cardName">Intelligence : {props.powerStats[0]}</span>
                <meter className="stats" 
                  min="0" 
                  max={props.superheroes.length*100} 
                  high={props.superheroes.length*75} 
                  low={props.superheroes.length*25} 
                  optimum={props.superheroes.length*100} 
                  value={props.powerStats[0]}
                  >intelligence
                </meter>
                <span className="cardName">Strength : {props.powerStats[1]}</span>
                <meter className="stats"
                    min="0"
                    max={props.superheroes.length*100} 
                    high={props.superheroes.length*75}
                    low={props.superheroes.length*25} 
                    optimum={props.superheroes.length*100} 
                    value={props.powerStats[1]}
                    >Strength
                </meter>
                <span className="cardName">Speed : {props.powerStats[2]}</span>
                <meter className="stats" 
                  min="0" 
                  max={props.superheroes.length*100} 
                  high={props.superheroes.length*75} 
                  low={props.superheroes.length*25} 
                  optimum={props.superheroes.length*100} 
                  value={props.powerStats[2]}
                  >Speed
                </meter>
                <span className="cardName">Durability : {props.powerStats[3]}</span>
                <meter className="stats" 
                  min="0" 
                  max={props.superheroes.length*100} 
                  high={props.superheroes.length*75} 
                  low={props.superheroes.length*25} 
                  optimum={props.superheroes.length*100} 
                  value={props.powerStats[3]}
                  >Durability
                </meter>
                <span className="cardName">Power : {props.powerStats[4]}</span>
                <meter className="stats"
                   min="0" 
                   max={props.superheroes.length*100} 
                   high={props.superheroes.length*75} 
                   low={props.superheroes.length*25} 
                   optimum={props.superheroes.length*100} 
                   value={props.powerStats[4]}
                   >Power
                </meter>
                <span className="cardName">Combat : {props.powerStats[5]}</span>
                <meter className="stats"
                   min="0" 
                   max={props.superheroes.length*100} 
                   high={props.superheroes.length*75} 
                   low={props.superheroes.length*25} 
                   optimum={props.superheroes.length*100} 
                   value={props.powerStats[5]}
                   >Combat
                </meter>
        </div>
    )
}

export default PowerStats;
