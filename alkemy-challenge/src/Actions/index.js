export const addTeamMember = payload => ({
    type: 'ADD_TEAMMEMBER',
    payload,
});

export const deleteTeamMember = payload => ({
    type: 'DELETE_TEAMMEMBER',
    payload,
});

export const getMyTeam = payload => ({
    type: 'GET_MYTEAM',
    payload,
})