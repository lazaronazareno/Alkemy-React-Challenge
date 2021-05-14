import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import api from '../../api';
import CardComplete from "../CharacterCard/Card";


function Searcher (props) {
  const history = useHistory();
    const [form, setValues] = useState({
        search: '',
        loading:false,
        error:null,
        data:undefined,
        token: props.history,
        superheroes:{},
        superheroesId : {},
        item:[]
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
              console.log(data)
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
    let addHero = (props) => {
      setValues({
        ...form,
        superheroes:form.data.results,
        superheroesId:form.data.results[0].id,
      })
      console.log(form.superheroes)
      console.log(form.superheroesId)
      console.log(props.target.id)
    }

  return (
    <>
      <div> 
        {form.superheroes &&(
          <>
            <h1>My Team</h1>
            { form.superheroes.results.map((hero) => (
              <>
                <CardComplete heroes={hero} key={hero.id}/>
                <button onClick={addHero}>Remover del team</button>
              </>
            ))
          }
          </>
        )}
      </div>
     {!form.error &&(
        <section className="login__container">
          <h2>Buscar Heroe</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
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
                <button onClick={addHero} id={hero.id}>Agregar al team</button>
                <button onClick={addHero}>Remover del team</button>
              </>
            )))
          }
          {form.loading && (
            <h1>Cargando</h1>
          )}

        </section>
        
      )}
          {form.error && (
            <>
              <h1>Error : {form.error} </h1>
              <Link onClick={history.goBack}>Volver</Link>
            </>
          )}
    </>
  );
}

export default Searcher;