import authReducer from "../../reducers/auth";

test("should set uid login", () => {
  const action = {
    type: "LOGIN",
    uid: "abc1234abc"
  };
  const state = authReducer({}, action);

  expect(state.uid).toBe(action.uid);
});

test("should clear uid fro logout", () => {
  const action = {
    type: "LOGOUT"
  };
  const state = authReducer({}, action);

  expect(state).toEqual({});
});
