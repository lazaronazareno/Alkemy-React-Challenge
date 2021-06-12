import React, { useEffect, useState } from "react";
import api from '../../api';
import GeneralButton from "../Buttons/button";
import CardComplete from "../CharacterCard/Card";
import './searcherStyles.scss';
import trash from '../../Assets/trash.svg';
import add from '../../Assets/add.svg';
import PowerStats from "../CharacterCard/powerStats";
import { Link } from "react-router-dom";

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
        setValues ({...form, loading: true, error:null})
            try{
              const data = await api.superhero.search(form.search);
              setValues({
                ...form,
                loading: false,
                data: data,
                error: data.error,
                showPowerstats:false,
                showAverageHW:false,
                showButton:false,
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
    
        let handleError = () => {
          setValues({...form, error:null, data:undefined});
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
    <div className="container-fluid bg-danger bg-gradient">
      <>
        {form.superheroes.length !== 0 &&(
          <div className="card mb-3 text-dark bg-warning p-4 align-items-center">
            <h1 className="card-title p-3 border border-3 border-dark">My Team</h1>
            <h2 className={`cardDiv1 ${form.showPowerstats ? "cardDiv2" : ""}`} >Type : {form.maxPowerStat}</h2>
            <div className="myTeamCharacters">
            {
              form.superheroes.map((teamHeroes) => (
                <div className="myTeamCharacterCard">
                  <CardComplete
                   heroes={teamHeroes} 
                   key={teamHeroes.id}
                   />
                  <GeneralButton onClick={removeHeroes} id={teamHeroes.id} image={trash} />
                </div>
              )) 
            }
            </div>
            { form.powerStats[0] !== 0 && (
              <>
              <button className="searchButtons" disabled={form.showButton} onClick={onClick}>Calculate Total PowerStats</button>
                <div className={`cardDiv1 ${form.showPowerstats ? "cardDiv2" : ""}`}>
                  <PowerStats powerStats={form.powerStats} superheroes={form.superheroes} />
              </div>
              <button className="searchButtons" disabled={form.showButton} onClick={getHeightWeight}>Calculate Total Height and Weight</button>
              </>
              )
            }
            { form.alignmentError && (
              <h2 className="searchText">{form.alignmentError}</h2>
            )}
            {form.heightAverage && form.weightAverage && (
              <div className={`cardDiv1 ${form.showAverageHW ? "cardDiv2" : ""}`}>
                <span>"Average Height : {form.heightAverage} Cms." </span>
                <span> "Average Weight : {form.weightAverage} Kgs." </span>
              </div>
            )}

          </div>
        )}
        </>
     {!form.error &&(
        <div className="card mb-3 text-dark bg-warning p-4 align-items-center">
          <h2 className="card-title p-3 border border-3 border-dark">Search Heroes</h2>
          <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input
                  name="search"
                  id="floatingInput"
                  className="form-control form-control-lg"
                  type="text"
                  onChange={handleInput}
                />
                <label for="floatingInput">Character Name : </label>
            </div>
            <button className="btn btn-primary btn-lg" type="submit" >
                Search
            </button>
            {form.loading && (
            <div className="d-flex justify-content-center m-3">
                <div className="spinner-border" role="status" />
            </div>
          )}
          </form>
          <div className="container d-flex justify-content-evenly p-3">
          { form.data && (
            form.data.results.map((hero) => (
              <>
                <CardComplete heroes={hero} key={hero.id}/>
                <GeneralButton onClick={maxLength} id={hero.id} image={add} />
              </>
            )))
          }
          </div>
        </div>
      )}
      {form.error && (
        <div className="errorDiv">
          <h1 className="searchText">Error : {form.error} </h1>
          <button className="searchButtons" onClick={handleError}>Back</button>
        </div>
      )}
      {!form.token && (
        <div className="errorDiv">
          <h1 className="searchText">Looks like you are trying to access without the password... Go back and login to access to this page!</h1>
          <Link className="searchButtons" to="/">Go back to Login</Link>
        </div>
      )}
    </div>
  );
}

export default Searcher;