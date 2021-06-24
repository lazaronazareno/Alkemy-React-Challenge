import api from '../superheroesApi'

const initialState = {
    "myTeamList":[],
    "searchList":[],
    "loading" : false,
    "error": null,
    "powerStats" : [],
    "sumPowerStats" : [],
    "myTeamGood" : [],
    "myTeamBad" : [],
    "totalWeightHeight" : "",
    "maxPowerStat" : null,
}

const ADD_TEAMMEMBER = 'ADD_TEAMMEMBER';
const DELETE_TEAMMEMBER = 'DELETE_TEAMMEMBER';
const SEARCH_CHARACTERS = 'SEARCH_CHARACTERS';
const IS_LOADING = 'IS_LOADING';
const GET_POWERSTATS = 'GET_POWERSTATS';
const SUM_POWERSTATS = 'SUM_POWERSTATS';
const GET_WEIGHTHEIGHT = 'GET_WEIGHTHEIGHT';
const SET_GOODBADLIST = 'SET_GOODBADLIST';

export default function reducer (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case ADD_TEAMMEMBER :
            if (state.myTeamList.length <= 5){
                if (state.myTeamGood.length <= 2 && state.myTeamBad.length <= 2){
                    return {
                        ...state,
                        myTeamList : state.myTeamList.concat(state.searchList.filter(a => a.id.indexOf(action.payload) !== -1)),
                        loading: false,
                    }
                } else if (state.myTeamGood.length === 3 && state.myTeamBad.length < 3){
                    return {
                        ...state,
                        myTeamList : state.myTeamList.concat(state.searchList.filter(a => a.id.indexOf(action.payload) !== -1)),
                        loading: false,
                        error : 'You already have 3 members of the same alignment "good", Adding "bad'
                    }
                } else if (state.myTeamGood.length < 3 && state.myTeamBad.length === 3){
                    return {
                        ...state,
                        myTeamList : state.myTeamList.concat(state.searchList.filter(a => a.id.indexOf(action.payload) !== -1)),
                        loading: false,
                        error : 'You already have 3 members of the same alignment "bad", Adding "good'
                    }
                } else  {
                    return {
                        ...state,
                        loading:false,
                        error: 'You already have 3 members of the same alignment! Remove the "extra" character.'
                    }
                }
            } else {
                return {
                    ...state,
                    loading:false,
                    error: "Your team is full"
                }
            }
        case DELETE_TEAMMEMBER :
            return {
                ...state,
                myTeamList: state.myTeamList.filter(items => items.id !== action.payload),
                error: null
            }
        case SET_GOODBADLIST :
            return {
                ...state,
                myTeamGood :  state.myTeamList.filter(good => good.biography.alignment.indexOf('good') !== -1),
                myTeamBad :  state.myTeamList.filter(bad => bad.biography.alignment.indexOf('bad') !== -1),
                loading: false
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
        case IS_LOADING :
            return {
                ...state,
                loading : true,
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
            maxPowerStat : action.payload.indexOf(Math.max(...action.payload)),
            loading : false
        }
        case GET_WEIGHTHEIGHT :
            return {
                ...state,
                totalWeightHeight : [action.payload, action.weightsAverage]
            }
        default: 
          return state;
    }
}

export const addTeamMember = (member) => (dispatch, getState) => {
    dispatch({
        type: ADD_TEAMMEMBER,
        payload: member
    })
}

export const deleteTeamMember = (memberId) => (dispatch, getState) =>{
    dispatch({
        type: DELETE_TEAMMEMBER,
        payload : memberId
    })
}

export const getGoodBadList = (myTeamList) => (dispatch, getState)=> {
    dispatch({
        type: SET_GOODBADLIST,
        dispatch : myTeamList
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
    dispatch({
        type : SUM_POWERSTATS,
        payload : sumAttributes
    })
}

export const getHeightWeight = (team) => (dispatch, getState) => {
    let heightTotal = team.map((heights) => heights.appearance);
    console.log(heightTotal)
    let heightsTotal = heightTotal.map((heightsProm) => heightsProm.height[1]);
    console.log(heightsTotal)
    let heightTotalSum = heightsTotal.reduce((total, currentValue) => 
    (parseInt(total) + parseInt(currentValue)));
    console.log(parseInt(heightTotalSum))
    let heightsAverage = parseInt(heightTotalSum) / heightsTotal.length;
    console.log(heightsAverage)
    
    let weightTotal = team.map((weights) => weights.appearance);
    let weightsTotal = weightTotal.map((weightsProm) => weightsProm.weight[1]);
    let weightTotalSum = weightsTotal.reduce((total, currentValue) => 
    (parseInt(total) + parseInt(currentValue)));
    let weightTotalLength = weightsTotal.length
    let weightsAverage = parseInt(weightTotalSum) / weightTotalLength;
    console.log(weightsAverage)
    dispatch({
        type : GET_WEIGHTHEIGHT,
        payload : heightsAverage, weightsAverage
    })
}