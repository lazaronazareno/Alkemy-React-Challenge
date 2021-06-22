import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTeamMember, searchCharacters, isLoading, fetchMyTeam } from '../../redux/reducers';
import api from '../../api';
import CardComplete from "../CharacterCard/Card";
import './searcherStyles.scss';

const Searcher = (props) => {
  const dispatch = useDispatch();

  const searchList = useSelector(store => store.superheroes.searchList)
  const myTeamList = useSelector(store => store.superheroes.myTeamList)
  const team = useSelector(store => store.superheroes.team)
  const error = useSelector(state => state.superheroes.error)
  const loading = useSelector(state => state.superheroes.loading)

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
    
      let handleInput = event => {
        setValues({
          ...form,
          [event.target.name]: event.target.value
        });
      };
        
      let handleSubmit = async event => {
        event.preventDefault();
        dispatch(isLoading())
        dispatch(searchCharacters(form.search))
        };

      let addHero = (id) => {
        dispatch(isLoading())
        dispatch(addTeamMember(id))
      }

      useEffect(() => {
        dispatch(isLoading())
        dispatch(fetchMyTeam(myTeamList))
        return ;
  // eslint-disable-next-line
      }, [myTeamList])

       let getHeroes = (props) => {
          setValues({...form, loading: true, superheroesId:form.superheroesId.push(props.target.id)});
          const promises = [];
            myTeamList.forEach((id) => {
              promises.push(api.superhero.addHero(id));
            });
          Promise.all(promises).then((responses)=> {
            const superheroes = responses.map((response) => response);
            setValues({...form, loading:false, superheroes:superheroes, showPowerstats:false, showAverageHW:false, showButton:false, alignmentError: ''});
          });
        };

        let maxLength = (props) => {
          let good = 'good';
          let bad = 'bad';
          let alignment = form.superheroes.map((alignment) => alignment.biography.alignment);
          let maxAlignmentGood = alignment.filter((str) => str === good);
          let maxAlignmentBad = alignment.filter((str) => str === bad);
          if (form.superheroes.length < 6) {
            if((maxAlignmentGood.length <=2) && (maxAlignmentBad.length <=2) ) {
              getHeroes(props);
              setValues({
                ...form,
                alignmentError: 'Adding Character'
              });
            } else if (maxAlignmentGood.length === 3 && maxAlignmentBad.length <3) {
              getHeroes(props);
              setValues({
                ...form,
                alignmentError: 'You already have 3 members of the same alignment "good", Adding "bad'
              });
            } else if ((maxAlignmentBad.length === 3 ) && (maxAlignmentGood.length <3)) {
              getHeroes(props);
              setValues({
                ...form,
                alignmentError: 'You already have 3 members of the same alignment "bad", Adding "good'
              });
            } else {
              setValues({
                ...form,
                alignmentError: 'Error : You already have 3 members of the same alignment! Remove the "extra" character.'
              });
            }
          } else {
            setValues({
              ...form,
              alignmentError: 'Your team is full'
            });
          }
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
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
        <div className={`card mb-3 text-dark bg-warning p-4 m-2 w-75 ${(searchList.length > 1) ? "h-75" : ""}`}>
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <h2 className="card-title p-3 border border-3 border-dark">Search Heroes</h2>
            <div className="form-floating mb-3">
                <input
                  name="search"
                  id="floatingInput"
                  className="form-control form-control-lg"
                  type="text"
                  onChange={handleInput}
                />
                <label htmlFor="floatingInput">Character Name : </label>
            </div>
            <button className="btn btn-primary btn-lg mb-3" type="submit" >
                Search
            </button>
            {loading === true && (
              <div className="d-flex justify-content-center m-3">
                  <div className="spinner-border" role="status" />
              </div>
            )}
          </form>
            <div className="container-fluid d-flex flex-wrap justify-content-evenly overflow ">
              {
                searchList.map((hero) => (
                  <div className="position-relative col-md-3">
                    <CardComplete heroes={hero} key={hero.id}/>
                    <button type="button" className="btn btn-danger m-1 position-absolute top-0 start-0" id={hero.id} onClick={() => addHero(hero.id)}> Add
                    </button>
                  </div>
                ))
              }
            </div>
            {error && (
                <h1 className="text-danger">Error : {error} </h1>
            )}
          </div>
    </div>
  );
}

export default Searcher;