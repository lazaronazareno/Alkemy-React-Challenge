const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TEAMMEMBER':
            return {
                ...state,
                myTeamList : [...state.myTeamList, action.payload]
            }
            case 'DELETE_TEAMMEMBER' :
                return {
                    ...state,
                    myTeamList: state.myTeamList.filter(items => items.memberId !== action.payload)
                }
                case 'GET_MYTEAM' :
                    return {
                        ...state,
                    }
        default: 
          return state;
    }
}

export default reducer;