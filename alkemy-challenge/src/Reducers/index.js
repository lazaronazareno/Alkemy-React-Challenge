const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_TEAMMEMBER':
            return {
                ...state,
                myTeamList : state.myTeamList.concat(action.payload),
                loading: !state.loading
            }
            case 'DELETE_TEAMMEMBER' :
                return {
                    ...state,
                    myTeamList: state.myTeamList.filter(items => items.memberId !== action.payload),
                    team: state.team.filter(items => items.id !== action.payload)
                }
                case 'GET_MYTEAM' :
                    return {
                        ...state,
                        team : state.team.concat(action.payload),
                    }
        default: 
          return state;
    }
}

export default reducer;