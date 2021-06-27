import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addTeamMember, searchCharacters, isLoading, getGoodBadList, fetchMyTeam } from '../../redux/reducers';
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
    dispatch(getGoodBadList(team))
    return ;
// eslint-disable-next-line
    }, [myTeamList])

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className={`card mb-3 text-dark bg-warning p-4 m-2 w-75 media ${(searchList.length > 1) ? "h-75" : ""}`}>
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
          { loading === true && (
            <div className="d-flex justify-content-center m-3">
                <div className="spinner-border" role="status" />
            </div>
          )}
        </form>
        <div className="container-fluid d-flex flex-wrap justify-content-evenly overflow ">
          { searchList.map((hero) => (
            <div className="d-flex position-relative col-md-3" key={hero.id}>
              <CardComplete heroes={hero} key={hero.id}/>
              <button type="button" className="btn btn-danger m-1 position-absolute top-0 start-0" id={hero.id} onClick={() => addHero(hero.id)}> Add
              </button>
            </div>
            ))}
        </div>
        {error && (
          <h1 className="text-danger">{error}</h1>
        )}
      </div>
    </div>
  );
}

export default Searcher;