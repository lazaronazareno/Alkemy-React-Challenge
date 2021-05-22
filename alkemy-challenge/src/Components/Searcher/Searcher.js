import React, { useEffect, useState } from "react";
import api from '../../api';
import CardComplete from "../CharacterCard/Card";


function Searcher (props) {
  const [form, setValues] = useState({
      search: '',
      loading:false,
      error:null,
      data:undefined,
      token: props.location.state,
      superheroes: undefined,
      superheroesId : [],
      ids:[],
      powerStats:[],
      show:false,
      maxPowerStat:'',
      alignmentError:''
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
            const ids = responses.map((response) => response);
            setValues({...form, loading:false, ids:ids, show:false});
          });
        }

        let goodOrBad = () => {
          let alignment = form.ids.map((alignment) => alignment.biography.alignment)
        }

        let maxLength = (props) => {
          let good = 'good';
          let bad = 'bad';
          let alignment = form.ids.map((alignment) => alignment.biography.alignment)
          let maxAlignmentGood = alignment.filter((str) => str === good);
          let maxAlignmentBad = alignment.filter((str) => str === bad);
          if (form.ids.length <=5 && maxAlignmentGood.length <= 2 && maxAlignmentBad.length <= 3) {
              getHeroes(props)
              goodOrBad()
          } else {
            setValues({
              ...form,
              alignmentError: 'You already have 3 members of the same alignment'
            })
          }
        } 

        let removeHeroes =(props) => {
          let deleteItem = form.ids.map(i => i.id).indexOf(props.target.id)
          form.superheroesId.splice(deleteItem,1)
          form.ids.splice(deleteItem,1)
          setValues({...form, loading: false, superheroesId:form.superheroesId, ids:form.ids});
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
          let powerStatsList = form.ids.map((pStats) => pStats.powerstats)
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

        let onClick = () => {
          sumPowerstats();
          setValues({
            ...form,
            show:true
          })
        }

        useEffect(() => {
          const timer = setTimeout(() => {
            sumPowerstats()
            goodOrBad()
          }, 1000);
          return () => clearTimeout(timer);
        }, [form.ids])


  return (
    <div>
        {form.superheroesId &&(
          <>
            <h1>My Team</h1>
            <h2 className={`cardDiv1 ${form.show ? "cardDiv2" : ""}`} >Type : {form.maxPowerStat}</h2>
            {
              form.ids.map((teamHeroes) => (
                <>
                  <CardComplete
                   heroes={teamHeroes} 
                   key={teamHeroes.id}
                   />
                  <button onClick={removeHeroes} id={teamHeroes.id}>Remover del team</button>
                </>
              ))
              
            }
            { form.alignmentError && (
              <h2>{form.alignmentError}</h2>
            )}
            <button onClick={onClick}>Calculate Total PowerStats</button>
            { form.powerStats && (
                <div className={`cardDiv1 ${form.show ? "cardDiv2" : ""}`}>
                  <h1>Total PowerStats</h1>
                <span className="cardName">Intelligence : {form.powerStats[0]}</span>
                <meter className="stats" 
                  min="0" 
                  max={form.ids.length*100} 
                  high={form.ids.length*75} 
                  low={form.ids.length*25} 
                  optimum={form.ids.length*100} 
                  value={form.powerStats[0]}
                  >intelligence
                </meter>
                <span className="cardName">Strength : {form.powerStats[1]}</span>
                <meter className="stats"
                    min="0"
                    max={form.ids.length*100} 
                    high={form.ids.length*75}
                    low={form.ids.length*25} 
                    optimum={form.ids.length*100} 
                    value={form.powerStats[1]}
                    >Strength
                </meter>
                <span className="cardName">Speed : {form.powerStats[2]}</span>
                <meter className="stats" 
                  min="0" 
                  max={form.ids.length*100} 
                  high={form.ids.length*75} 
                  low={form.ids.length*25} 
                  optimum={form.ids.length*100} 
                  value={form.powerStats[2]}
                  >Speed
                </meter>
                <span className="cardName">Durability : {form.powerStats[3]}</span>
                <meter className="stats" 
                  min="0" 
                  max={form.ids.length*100} 
                  high={form.ids.length*75} 
                  low={form.ids.length*25} 
                  optimum={form.ids.length*100} 
                  value={form.powerStats[3]}
                  >Durability
                </meter>
                <span className="cardName">Power : {form.powerStats[4]}</span>
                <meter className="stats"
                   min="0" 
                   max={form.ids.length*100} 
                   high={form.ids.length*75} 
                   low={form.ids.length*25} 
                   optimum={form.ids.length*100} 
                   value={form.powerStats[4]}
                   >Power
                </meter>
                <span className="cardName">Combat : {form.powerStats[5]}</span>
                <meter className="stats"
                   min="0" 
                   max={form.ids.length*100} 
                   high={form.ids.length*75} 
                   low={form.ids.length*25} 
                   optimum={form.ids.length*100} 
                   value={form.powerStats[5]}
                   >Combat
                </meter>
              </div>
              )
            }

          </>
        )}
     {!form.error &&(
        <div className="form">
          <h2>Buscar Heroe</h2>
          <form className="form" onSubmit={handleSubmit}>
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
          { form.data && (
            form.data.results.map((hero) => (
              <>
                <CardComplete heroes={hero} key={hero.id}/>
                <button onClick={maxLength} id={hero.id}>Agregar al team</button>
              </>
            )))
          }
          {form.loading && (
            <h1>Cargando</h1>
          )}
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