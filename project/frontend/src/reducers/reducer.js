// reducer.js
import { UPDATE_PLAYERS, SET_API_STATUS } from "../actions/actions";

const initialState = {
  players: {
    previous: [],
    current: [],
    positions: [],
  },
  apiStatus: "fail",
  role:""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYERS:
      console.log("reducer", action.payload);
      // Calculate positions based on user ID and score
      const previousPlayers = action.payload.previousPlayers.map(
        (player, index) => ({ ...player, position: index + 1 })
      );
      const currentPlayers = action.payload.currentPlayers.map(
        (player, index) => ({ ...player, position: index + 1 })
      );

      // Update positions in state
      const positions = currentPlayers.map((currentPlayer) => {
        const prevPlayer = previousPlayers.find(
          (prevPlayer) => prevPlayer.userID === currentPlayer.userID
        );
        if (!prevPlayer) return currentPlayer.position;
        const positionChange = currentPlayer.position - prevPlayer.position;
        return positionChange !== 0
          ? currentPlayer.position
          : prevPlayer.position;
      });

      // Assuming you have a SET_API_STATUS action
      return {
        ...state,
        players: {
          previous: previousPlayers,
          current: currentPlayers,
          positions: positions,
          apiStatus: action.payload.apiStatus,
        },
      };

    case SET_API_STATUS:
      return {
        ...state,
        apiStatus: action.payload.status,
        role :action.payload.role
      };

    default:
      return state;
  }
};

export default reducer;
