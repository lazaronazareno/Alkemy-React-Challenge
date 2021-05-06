import React, { useState } from "react";
import api from '../../api';
import CardComplete from "../CharacterCard/Card";

const Searcher = props => {
    const [form, setValues] = useState({
        search: '',
        pass: false,
        loading:false,
        error:null,
        data:undefined,
      });
    
      const handleInput = event => {
        setValues({
          ...form,
          [event.target.name]: event.target.value
        });
      };
    
      const handleSubmit = async event => {
        event.preventDefault();
        setValues ({loading: true, error:null})
            try{
              const data = await api.id.search(form.search);
              console.log(form)
              setValues({
                loading: false,
                data: data,
              });
            } catch (error){
              console.log(form.error)
              setValues({
                loading: false,
                error: error,
              });
            };
    };

  return (
    <>
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
          {handleSubmit && (
              <CardComplete heroes={form.data} key={form.data.id}/>
          )}
          {form.search.length > 2 && handleSubmit (
              form.data.map((heroes) =>
                <CardComplete heroes={heroes.data} key={heroes.data.id}/>
              )
          )}

        </section>
    </>
  );
}

export default Searcher;