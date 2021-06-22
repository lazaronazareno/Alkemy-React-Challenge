import api from '../api'

const initialState = {
    "myTeamList":[],
    "searchList":[],
    "team" : [],
    "searchError" : undefined,
    "loading" : false,
    "error": null,
    "powerStats" : [],
    "sumPowerStats" : [],
}

const ADD_TEAMMEMBER = 'ADD_TEAMMEMBER';
const DELETE_TEAMMEMBER = 'DELETE_TEAMMEMBER';
const GET_MYTEAM = 'GET_MYTEAM';
const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS';
const FETCH_MYTEAM = 'FETCH_MYTEAM';
const IS_LOADING = 'IS_LOADING';
const GET_POWERSTATS = 'GET_POWERSTATS';
const SUM_POWERSTATS = 'SUM_POWERSTATS';

//reducer

export default function reducer (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case ADD_TEAMMEMBER :
            if (state.myTeamList.length <= 5){
                return {
                    ...state,
                    myTeamList : (state.myTeamList.concat(action.payload)).filter((v,i,a) => a.indexOf(v) === i),
                    loading: false
                }
            }else {
                return {
                    ...state,
                    loading:false,
                    error: "Your team is full"
                }
            }
        case DELETE_TEAMMEMBER :
            return {
                ...state,
                myTeamList: state.myTeamList.filter(items => items !== action.payload),
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
                    searchList : [],
                    loading: false
                }
            }else {
                return {
                    ...state,
                    searchList : action.payload.results,
                    error: null,
                    loading: false
                }
            }
        case FETCH_MYTEAM :
            return {
                ...state,
                team : action.payload,
                loading : false
            }
        case IS_LOADING :
            return {
                ...state,
                loading : true
            }
        case GET_POWERSTATS :
            return {
                ...state,
                powerStats : action.payload,
                loading : false
            }
        case SUM_POWERSTATS : 
        return {
            ...state,
            sumPowerStats : action.payload,
            loading : false
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
            payload : data,
        })
      } catch (error) {
        dispatch({
            type: SEARCH_CHARACTERS,
            payload : error,
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
    if (superheroes.length <= 6) {
        dispatch({
            type: FETCH_MYTEAM,
            payload : superheroes,
        })
    }
    })
}

export const isLoading = () => (dispatch, getState) => {
    dispatch({
        type: IS_LOADING,
        payload : true
    })
}

export const getPowerStats = (team) => (dispatch, getState) => {
    const powerStats = []
    team.forEach((team) => {
    powerStats.push(team.powerstats)
    })
    dispatch({
        type: GET_POWERSTATS,
        payload : powerStats
    })
}

export const sumPowerStats = (powerStats) => (dispatch, getState) => {
    let attributesSumIntelligence = powerStats.reduce((total, currentValue) => 
    total + parseInt(currentValue.intelligence),0);
    let attributesSumStrength = powerStats.reduce((total, currentValue) => 
    total + parseInt(currentValue.strength),0);
    let attributesSumSpeed = powerStats.reduce((total, currentValue) => 
    total + parseInt(currentValue.speed),0);
    let attributesSumDurability = powerStats.reduce((total, currentValue) => 
    total + parseInt(currentValue.durability),0);
    let attributesSumPower = powerStats.reduce((total, currentValue) => 
    total + parseInt(currentValue.power),0);
    let attributesSumCombat = powerStats.reduce((total, currentValue) => 
    total + parseInt(currentValue.combat),0);
    const sumAttributes = [];
    sumAttributes.push(attributesSumIntelligence,attributesSumStrength, attributesSumSpeed, attributesSumDurability, attributesSumPower, attributesSumCombat);
    console.log(sumAttributes)
    dispatch({
        type : SUM_POWERSTATS,
        payload : sumAttributes
    })
}