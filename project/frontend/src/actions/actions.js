export const UPDATE_PLAYERS = "UPDATE_PLAYERS";
export const SET_API_STATUS = "SET_API_STATUS";

export const updatePlayers = (previousPlayers, currentPlayers) => ({
  type: UPDATE_PLAYERS,
  payload: { previousPlayers, currentPlayers },
});

export const setApiStatus = (status,role) => ({
  type: SET_API_STATUS,
  payload: {status,role},
});
