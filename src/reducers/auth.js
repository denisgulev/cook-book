import * as actions from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        uid: action.uid
      };
    case actions.LOGOUT:
      return {};
    default:
      return state;
  }
};
