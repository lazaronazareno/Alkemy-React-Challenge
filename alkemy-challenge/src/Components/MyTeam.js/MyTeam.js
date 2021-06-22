import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeamMember, isLoading, getPowerStats, sumPowerStats } from '../../redux/reducers';
import CardComplete from "../CharacterCard/Card";
import PowerStats from "../CharacterCard/powerStats";

const MyTeam = (props) => {
  const dispatch = useDispatch();
  const team = useSelector(store => store.superheroes.team)
  const loading = useSelector(state => state.superheroes.loading)
  const powerStats = useSelector(state => state.superheroes.powerStats)
  const totalPowerStats = useSelector(state => state.superheroes.sumPowerStats)

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
    
    useEffect(() => {
      dispatch(isLoading())
      dispatch(getPowerStats(team))
      return ;
// eslint-disable-next-line
    }, [])

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

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className={`card mb-3 d-flex flex-column text-dark bg-warning p-4 m-2 w-75 ${(team.length >= 1) ? "h-75" : ""}`}>
        <h2 className="card-title p-3 border border-3 border-dark">My Team</h2>
        <h3>Type : {form.maxPowerStat}</h3>
        {loading === true && (
          <div className="d-flex justify-content-center m-3">
              <div className="spinner-border" role="status" />
          </div>
        )}
        <div className="container d-flex flex-wrap justify-content-evenly overflow">
          {
            team.map((teamHeroes) => (
              <div className={`d-flex position-relative col-md-3 ${(team.length > 4) ? "col-md-1" : ""}`} key={teamHeroes.id}>
                <CardComplete
                 heroes={teamHeroes} 
                 key={teamHeroes.id}
                 />
                <button type="button" className="btn btn-danger m-1 position-absolute top-0 start-0" id={teamHeroes.id} onClick={() => dispatch(deleteTeamMember(teamHeroes.id))}> Quit
                </button>
              </div>
            )) 
          }
        </div>
            <button className="btn btn-primary btn-sm mb-1" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => dispatch(sumPowerStats(powerStats))}>
             Calcule Total PowerStats
            </button>
            <div className="collapse" id="collapseExample">
        { totalPowerStats.length>0 && (
          <PowerStats powerstats={totalPowerStats} superheroes={team}/>
        )
        }
            </div>
            <button className="btn btn-primary btn-sm mb-3"data-bs-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2" onClick={getHeightWeight} >
              Calcule Total Height and Weight
            </button>          
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
    </div>
  );
}

export default MyTeam;