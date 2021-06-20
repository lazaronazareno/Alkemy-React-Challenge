import api from '../api'

const initialState = {
    "myTeamList":[],
    "searchList":[],
    "searchError" : undefined,
    "memberId" : [],
    "team" : [],
    "loading" : false,
    "error": null,

}

const ADD_TEAMMEMBER = 'ADD_TEAMMEMBER';
const DELETE_TEAMMEMBER = 'DELETE_TEAMMEMBER';
const GET_MYTEAM = 'GET_MYTEAM';
const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS';
const FETCH_MYTEAM = 'FETCH_MYTEAM';

//reducer

export default function reducer (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case ADD_TEAMMEMBER :
            return {
                ...state,
                myTeamList : state.myTeamList.concat(action.payload),
                loading: !state.loading
            }
        case DELETE_TEAMMEMBER :
            return {
                ...state,
                myTeamList: state.myTeamList.filter(items => items.memberId !== action.payload),
                team: state.team.filter(items => items.id !== action.payload)
            }
        case GET_MYTEAM :
            return {
                ...state,
                team : state.team.concat(action.payload),
            }
        case SEARCH_CHARACTERS :
            if(action.payload.response === 'error') {
                return {
                    ...state,
                    error: action.payload.error,
                    searchList : []
                }
            }else {
                return {
                    ...state,
                    searchList : action.payload.results,
                    error: null,
                }
            }
        case FETCH_MYTEAM :
            return {
                ...state,
                team : action.payload
            }
        default: 
          return state;
    }
}

//actions

export const addTeamMember = (memberId) => (dispatch, getState) => {
    dispatch({
        type: ADD_TEAMMEMBER,
        payload: memberId
    })
}

export const deleteTeamMember = (memberId) => (dispatch, getState) =>{
    dispatch({
        type: DELETE_TEAMMEMBER,
        payload : memberId
    })
}

export const getMyTeam = () => (dispatch, getState) =>{
    dispatch({
        type: GET_MYTEAM,
    })
}

export const searchCharacters = (form) => async (dispatch, getState) => {
    try {
        const data = await api.superhero.search(form)
        dispatch({
            type: SEARCH_CHARACTERS,
            payload : data
        })
      } catch (error) {
        dispatch({
            type: SEARCH_CHARACTERS,
            payload : error
        })
      }
}

export const fetchMyTeam = (myTeamList) => async (dispatch, getState) => {
    const promises = []
    myTeamList.forEach((id) => {
    promises.push(api.superhero.addHero(id))
    })
    Promise.all(promises).then((responses)=> {
    const superheroes = responses.map((response) => response)
    dispatch({
        type: FETCH_MYTEAM,
        payload : superheroes
    })
    })
}