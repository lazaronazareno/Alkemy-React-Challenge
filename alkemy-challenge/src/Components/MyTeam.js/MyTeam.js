import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeamMember, isLoading, getPowerStats, sumPowerStats, getHeightWeight } from '../../redux/reducers';
import CardComplete from "../CharacterCard/Card";
import PowerStats from "../CharacterCard/powerStats";

const MyTeam = (props) => {
  const dispatch = useDispatch();
  const team = useSelector(store => store.superheroes.myTeamList)
  const loading = useSelector(state => state.superheroes.loading)
  const error = useSelector(state => state.superheroes.error)
  const powerStats = useSelector(state => state.superheroes.powerStats)
  const totalPowerStats = useSelector(state => state.superheroes.sumPowerStats)
  const maxPowerStat = useSelector(state => state.superheroes.maxPowerStat)
  const heightWeight = useSelector(state => state.superheroes.totalWeightHeight)
    
    useEffect(() => {
      dispatch(isLoading())
      dispatch(getPowerStats(team))
      return ;
// eslint-disable-next-line
    }, [])

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className={`card mb-3 d-flex flex-column text-dark bg-warning p-4 w-75 ${(team.length >= 1) ? "h-75" : ""}`}>
        <h2 className="card-title p-3 border border-3 border-dark">My Team</h2>
        { maxPowerStat === 0 && (<h3> Type : Intelligence</h3>)}
        { maxPowerStat === 1 && (<h3> Type : Strength</h3>)}
        { maxPowerStat === 2 && (<h3> Type : Speed</h3>)}
        { maxPowerStat === 3 && (<h3> Type : Durability</h3>)}
        { maxPowerStat === 4 && (<h3> Type : Power</h3>)}
        { maxPowerStat === 5 && (<h3> Type : Combat</h3>)}
        { loading === true && (
          <div className="d-flex justify-content-center m-3">
              <div className="spinner-border" role="status" />
          </div>
        )}
        { team.length === 0 &&(<h2>Looks like this section is empty... Add characters to your team in the search page </h2>)}
        <div className="container d-flex flex-wrap justify-content-evenly overflow">
          { team.map((teamHeroes) => (
              <div className={`d-flex position-relative col-md-3 ${(team.length > 4) ? "col-md-1" : ""}`} key={teamHeroes.id}>
                <CardComplete
                 heroes={teamHeroes} 
                 key={teamHeroes.id} />
                <button type="button" className="btn btn-danger m-1 position-absolute top-0 start-0" id={teamHeroes.id} onClick={() => dispatch(deleteTeamMember(teamHeroes.id))}> Quit
                </button>
              </div>
            ))}
        </div>
        { team.length > 0 && (
          <>
            <button className="btn btn-primary btn-sm mb-1" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={() => dispatch(sumPowerStats(powerStats))}>
             Calcule Total PowerStats
            </button>
            <div className="collapse" id="collapseExample">
              <PowerStats powerstats={totalPowerStats} superheroes={team}/>
            </div>
            <button className="btn btn-primary btn-sm" data-bs-toggle="collapse" href="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2" onClick={() => dispatch(getHeightWeight(team))} >
              Calcule Total Height and Weight
            </button>          
            <div className="collapse" id="collapseExample2">
              <span>"Average Height : {heightWeight[0]} Cms." </span>
              <span> "Average Weight : {heightWeight[1]} Kgs." </span>
            </div>
          </>
        )}
        { error && (
          <h3>Error : {error}</h3>
        )}
      </div>
    </div>
  );
}

export default MyTeam;