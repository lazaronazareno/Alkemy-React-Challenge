import React, { useEffect, useState } from "react";
import api from '../../api';
import CardComplete from "../CharacterCard/Card";
import './searcherStyles.scss';

function Searcher (props) {
  const [form, setValues] = useState({
      search: '',
      loading:false,
      error:null,
      data:undefined,
      token: props.location.state,
      superheroesId : [],
      superheroes:[],
      powerStats:[],
      showPowerstats:false,
      showAverageHW:false,
      maxPowerStat:'',
      alignmentError:'',
      heightAverage:'',
      weightAverage: '',
    });
    
      let handleInput = event => {
        setValues({
          ...form,
          [event.target.name]: event.target.value
        });
      };

      let handleSubmit = async event => {
        event.preventDefault();
        setValues ({...form, loading: true, error:null})
            try{
              const data = await api.superhero.search(form.search);
              setValues({
                ...form,
                loading: false,
                data: data,
                error: data.error,
              });
            } catch (error) {
              setValues({
                ...form,
                loading: false,
                error: error,
              });
            };
        };

       let getHeroes = (props) => {
          setValues({...form, loading: true, superheroesId:form.superheroesId.push(props.target.id)});
          const promises = [];
            form.superheroesId.forEach((id) => {
              promises.push(api.superhero.addHero(id));
            });
          Promise.all(promises).then((responses)=> {
            const superheroes = responses.map((response) => response);
            setValues({...form, loading:false, superheroes:superheroes, showPowerstats:false, showAverageHW:false});
          });
        }

        let maxLength = (props) => {
          let good = 'good';
          let bad = 'bad';
          let alignment = form.superheroes.map((alignment) => alignment.biography.alignment)
          let maxAlignmentGood = alignment.filter((str) => str === good);
          let maxAlignmentBad = alignment.filter((str) => str === bad);
          if (form.superheroes.length <=5 && maxAlignmentGood.length <= 2) {
            if (form.superheroes.length <=5 && maxAlignmentBad.length <= 3) {
              console.log(maxAlignmentGood)
              getHeroes(props);
              setValues({
                ...form,
                alignmentError: ''
              })
          } else {
            console.log(maxAlignmentBad)
            setValues({
              ...form,
              alignmentError: 'You already have 3 members of the same alignment'
            })
          }
        } 
      }

        let removeHeroes =(props) => {
          let deleteItem = form.superheroes.map(i => i.id).indexOf(props.target.id)
          form.superheroesId.splice(deleteItem,1)
          form.superheroes.splice(deleteItem,1)
          setValues({...form, loading: false, superheroesId:form.superheroesId, superheroes:form.superheroes, alignmentError:''});
        }
    
        let handleError = () => {
          setValues({...form, error:null, data:undefined});
        }

        let compareMax = (max, sumAttributes) => {
          let index = form.powerStats.indexOf(max)
            if (index === 0) {
              setValues({
                ...form,
                powerStats: sumAttributes,
                maxPowerStat:'intelligence'
              })
            } else if (index === 1) {
              setValues({
                ...form,
                powerStats: sumAttributes,
                maxPowerStat:'Strength',
              })
            } else if (index === 2) {
              setValues({
                ...form,
                powerStats: sumAttributes,
                maxPowerStat:'Speed',
              })
            }else if (index === 3) {
              setValues({
                ...form,
                powerStats: sumAttributes,
                maxPowerStat:'Durability',
              })
            } else if (index === 4) {
              setValues({
                ...form,
                powerStats: sumAttributes,
                maxPowerStat:'Power',
              })
            } else if (index === 5) {
              setValues({
                ...form,
                powerStats: sumAttributes,
                maxPowerStat:'Combat',
              })
             } else {
                setValues({
                  ...form,
                  powerStats: sumAttributes,
                  maxPowerStat:'',
                })
            }
        }

        let sumPowerstats = () => {
          let powerStatsList = form.superheroes.map((pStats) => pStats.powerstats)
          let attributesList = powerStatsList.map(atr => atr)
          let attributesSumIntelligence = attributesList.reduce((total, currentValue) => 
          total + parseInt(currentValue.intelligence),0);
          let attributesSumStrength = attributesList.reduce((total, currentValue) => 
          total + parseInt(currentValue.strength),0);
          let attributesSumSpeed = attributesList.reduce((total, currentValue) => 
          total + parseInt(currentValue.speed),0);
          let attributesSumDurability = attributesList.reduce((total, currentValue) => 
          total + parseInt(currentValue.durability),0);
          let attributesSumPower = attributesList.reduce((total, currentValue) => 
          total + parseInt(currentValue.power),0);
          let attributesSumCombat = attributesList.reduce((total, currentValue) => 
          total + parseInt(currentValue.combat),0);
          let sumAttributes = []
          sumAttributes.push(attributesSumIntelligence,attributesSumStrength, attributesSumSpeed, attributesSumDurability, attributesSumPower, attributesSumCombat)
          let max = Math.max(...sumAttributes)
          compareMax(max, sumAttributes)
        }

        let getHeightWeight = () => {
          let heightTotal = form.superheroes.map((heights) => heights.appearance);
          let heightsTotal = heightTotal.map((heightsProm) => heightsProm.height[1]);
          let heightTotalSum = heightsTotal.reduce((total, currentValue) => 
          (parseInt(total) + parseInt(currentValue)));
          let heightsAverage = heightTotalSum / heightsTotal.length;

          let weightTotal = form.superheroes.map((weights) => weights.appearance);
          let weightsTotal = weightTotal.map((weightsProm) => weightsProm.weight[1]);
          let weightTotalSum = weightsTotal.reduce((total, currentValue) => 
          (parseInt(total) + parseInt(currentValue)));
          let weightsAverage = weightTotalSum / weightsTotal.length;

          setValues({
            ...form,
            heightAverage: heightsAverage,
            weightAverage: weightsAverage,
            showAverageHW: true,
          })
        }

        let onClick = () => {
          sumPowerstats();
          setValues({
            ...form,
            showPowerstats:true
          })
        }

        useEffect(() => {
          const timer = setTimeout(() => {
            sumPowerstats()
          }, 1000);
          return () => clearTimeout(timer);
        }, [form.superheroes])


  return (
    <div className="generalDiv">
      <>
        {form.superheroesId &&(
          <div className="myTeamDiv">
            <h1>My Team</h1>
            <h2 className={`cardDiv1 ${form.showPowerstats ? "cardDiv2" : ""}`} >Type : {form.maxPowerStat}</h2>
            <div className="myTeamCharacters">
            {
              form.superheroes.map((teamHeroes) => (
                <div className="myTeamCharacterCard">
                  <CardComplete
                   heroes={teamHeroes} 
                   key={teamHeroes.id}
                   />
                  <button className="removeButton" onClick={removeHeroes} id={teamHeroes.id}>Remove</button>
                </div>
              )) 
            }
            </div>
            { form.alignmentError && (
              <h2>{form.alignmentError}</h2>
            )}
            <button onClick={onClick}>Calculate Total PowerStats</button>
            <button onClick={getHeightWeight}>Calculate Total Height and Weight</button>
            { form.powerStats && (
                <div className={`cardDiv1 ${form.showPowerstats ? "cardDiv2" : ""}`}>
                  <h1>Total PowerStats</h1>
                <span className="cardName">Intelligence : {form.powerStats[0]}</span>
                <meter className="stats" 
                  min="0" 
                  max={form.superheroes.length*100} 
                  high={form.superheroes.length*75} 
                  low={form.superheroes.length*25} 
                  optimum={form.superheroes.length*100} 
                  value={form.powerStats[0]}
                  >intelligence
                </meter>
                <span className="cardName">Strength : {form.powerStats[1]}</span>
                <meter className="stats"
                    min="0"
                    max={form.superheroes.length*100} 
                    high={form.superheroes.length*75}
                    low={form.superheroes.length*25} 
                    optimum={form.superheroes.length*100} 
                    value={form.powerStats[1]}
                    >Strength
                </meter>
                <span className="cardName">Speed : {form.powerStats[2]}</span>
                <meter className="stats" 
                  min="0" 
                  max={form.superheroes.length*100} 
                  high={form.superheroes.length*75} 
                  low={form.superheroes.length*25} 
                  optimum={form.superheroes.length*100} 
                  value={form.powerStats[2]}
                  >Speed
                </meter>
                <span className="cardName">Durability : {form.powerStats[3]}</span>
                <meter className="stats" 
                  min="0" 
                  max={form.superheroes.length*100} 
                  high={form.superheroes.length*75} 
                  low={form.superheroes.length*25} 
                  optimum={form.superheroes.length*100} 
                  value={form.powerStats[3]}
                  >Durability
                </meter>
                <span className="cardName">Power : {form.powerStats[4]}</span>
                <meter className="stats"
                   min="0" 
                   max={form.superheroes.length*100} 
                   high={form.superheroes.length*75} 
                   low={form.superheroes.length*25} 
                   optimum={form.superheroes.length*100} 
                   value={form.powerStats[4]}
                   >Power
                </meter>
                <span className="cardName">Combat : {form.powerStats[5]}</span>
                <meter className="stats"
                   min="0" 
                   max={form.superheroes.length*100} 
                   high={form.superheroes.length*75} 
                   low={form.superheroes.length*25} 
                   optimum={form.superheroes.length*100} 
                   value={form.powerStats[5]}
                   >Combat
                </meter>
              </div>
              )
            }

            {form.heightAverage && form.weightAverage && (
              <div className={`cardDiv1 ${form.showAverageHW ? "cardDiv2" : ""}`}>
                <span>Average Height : {form.heightAverage} cms</span>
                <span>Average Weight : {form.weightAverage} cms</span>
              </div>
            )}

          </div>
        )}
        </>
     {!form.error &&(
        <div className="searcherDiv">
          <h2>Search Heroes</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="search"
              className="input"
              type="text"
              placeholder="Search Hero"
              onChange={handleInput}
            />
            <button type="submit" >
              Buscar
            </button>
          </form>
          <div className="searchedDiv">
          { form.data && (
            form.data.results.map((hero) => (
              <div className="searchedCharacter">
                <CardComplete heroes={hero} key={hero.id}/>
                <button className="addButton" onClick={maxLength} id={hero.id}>Add</button>
              </div>
            )))
          }
          {form.loading && (
            <h1>Cargando</h1>
          )}
          </div>
        </div>
      )}
      {form.error && (
        <div>
          <h1>Error : {form.error} </h1>
          <button onClick={handleError}>regresar</button>
        </div>
      )}
    </div>
  );
}

export default Searcher;