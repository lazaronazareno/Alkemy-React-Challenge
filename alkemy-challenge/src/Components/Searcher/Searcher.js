import React, { useState } from "react";
import api from '../../api';
import CardComplete from "../CharacterCard/Card";


function Searcher (props) {
    const [form, setValues] = useState({
        search: '',
        loading:false,
        loading2:false,
        error:null,
        error2:null,
        data:undefined,
        token: props.location.state,
        superheroes: undefined,
        superheroesId : [],
        ids:[],
      });
    
      let handleInput = event => {
        setValues({
          ...form,
          [event.target.name]: event.target.value
        });
      };

      
      let handleSubmit = async event => {
        event.preventDefault();
        setValues ({loading: true, error:null})
            try{
              const data = await api.superhero.search(form.search);
              setValues({
                ...form,
                loading: false,
                data: data,
                error: data.error,
              });
            } catch (error) {
              console.log(error)
              setValues({
                ...form,
                loading: false,
                error: error,
              });
            };
    };


   let getHeroes = (props) => {
      setValues({...form, loading: true, error:null, superheroesId:form.superheroesId.push(props.target.id)});
      console.log(form.superheroesId);
      const promises = [];
      form.superheroesId.forEach((id) => {
        promises.push(api.superhero.addHero(id));
        console.log(promises)
      })

      Promise.all(promises).then((responses)=> {
        const ids = responses.map((response) => response);
        console.log(responses.results)
        console.log(responses)
        console.log(ids)
        setValues({...form, ids:ids});
        console.log(ids)
      })
    }
    

  return (
    <>
      <div> 
        {form.superheroesId &&(
          <>
            <h1>My Team</h1>
            {
              form.ids.map((teamHeroes) => (
                <>
                  <CardComplete heroes={teamHeroes} key={teamHeroes.id}/>
                  <button>Remover del team</button>
                </>
              ))
            }
          </>
        )}
      </div>
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
                <button onClick={getHeroes} id={hero.id}>Agregar al team</button>
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
          <button>regresar</button>
        </div>
      )}
    </>
  );
}

export default Searcher;