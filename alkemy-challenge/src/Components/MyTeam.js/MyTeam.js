import React, { useEffect, useState } from "react";
import CardComplete from "../CharacterCard/Card";
import PowerStats from "../CharacterCard/powerStats";

function MyTeam () {
  const [form, setValues] = useState({
      search: '',
      loading:false,
      error:null,
      data:undefined,
      superheroesId : [],
      superheroes:[],
      powerStats:[],
      showPowerstats:false,
      showAverageHW:false,
      maxPowerStat:'',
      maxPowerStatsIndex: 0,
      alignmentError:'',
      heightAverage:'',
      weightAverage: '',
      showButton: true,
    });

        let removeHeroes =(props) => {
          let deleteItem = form.superheroes.map(i => i.id).indexOf(props.target.id)
          form.superheroesId.splice(deleteItem,1)
          form.superheroes.splice(deleteItem,1)
          setValues({
            ...form,
            loading: false,
            superheroesId:form.superheroesId,
            superheroes:form.superheroes,
            alignmentError:'',
            showPowerstats:false,
            showAverageHW:false,
            showButton:false
            });
        };

        let sumPowerstats = () => {
          let powerStatsList = form.superheroes.map((pStats) => pStats.powerstats);
          let attributesList = powerStatsList.map(atr => atr);
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
          const sumAttributes = [];
          sumAttributes.push(attributesSumIntelligence,attributesSumStrength, attributesSumSpeed, attributesSumDurability, attributesSumPower, attributesSumCombat);
          setValues({...form, powerStats:form.powerStats = sumAttributes})
          getIndex();
        };

        let getIndex = () => {
          let maxAttribute = Math.max(...form.powerStats);
          let index = form.powerStats.indexOf(maxAttribute);
          if (index === 0) {
            setValues({
              ...form,
              maxPowerStat:'Intelligence'
            });
          } else if (index === 1) {
            setValues({
              ...form,
              maxPowerStat:'Strength',
            });
          } else if (index === 2) {
            setValues({
              ...form,
              maxPowerStat:'Speed',
            });
          }else if (index === 3) {
            setValues({
              ...form,
              maxPowerStat:'Durability',
            });
          } else if (index === 4) {
            setValues({
              ...form,
              maxPowerStat:'Power',
            });
          } else if (index === 5) {
            setValues({
              ...form,
              maxPowerStat:'Combat',
            });
           } else {
              setValues({
                ...form,
                });
          }
        };

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
          let weightTotalLength = weightsTotal.length
          let weightsAverage = weightTotalSum / weightTotalLength;

          setValues({
            ...form,
            heightAverage: heightsAverage,
            weightAverage: weightsAverage,
            showAverageHW: true,
          });
        };

        let onClick = () => {
          sumPowerstats();
          setValues({
            ...form,
            showPowerstats:true,
          });
        };

        useEffect(() => {
          const timer = setTimeout(() => {
            sumPowerstats();
            getIndex();
          }, 1000);
          return () => clearTimeout(timer);
        }, [form.superheroes]);


  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <>
      <h2 className="card-title p-3 border border-3 border-dark">My Team</h2>
        {form.superheroes.length !== 0 &&(
          <div className="card mb-3 text-dark bg-warning p-4 m-2 w-50 h-75">
            <h3>Type : {form.maxPowerStat}</h3>
            <div className="container d-flex flex-wrap justify-content-evenly p-3 overflow">
            {
              form.superheroes.map((teamHeroes) => (
                <div className="d-flex position-relative col-md-3">
                  <CardComplete
                   heroes={teamHeroes} 
                   key={teamHeroes.id}
                   />
                  <button type="button" className="btn btn-danger m-1 position-absolute top-0 start-0" id={teamHeroes.id} onClick={removeHeroes}> Quit
                  </button>
                </div>
              )) 
            }
            </div>
            { form.powerStats[0] !== 0 && (
              <>
                <button className="btn btn-primary btn-sm mb-1" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={onClick} >
                  Calcule Total PowerStats
                </button>
                <div className="collapse" id="collapseExample">
                  <PowerStats powerStats={form.powerStats} superheroes={form.superheroes} />
                </div>
                <button className="btn btn-primary btn-sm mb-3"data-bs-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2" onClick={getHeightWeight} >
                  Calcule Total Height and Weight
                </button>
              </>
              )
            }
            { form.alignmentError && (
              <h3>{form.alignmentError}</h3>
            )}
            {form.heightAverage && form.weightAverage && (
              <div className="collapse" id="collapseExample2">
                <span>"Average Height : {form.heightAverage} Cms." </span>
                <span> "Average Weight : {form.weightAverage} Kgs." </span>
              </div>
            )}

          </div>
        )}
        </>
    </div>
  );
}

export default MyTeam;