
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';


export const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
};
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const registerSuccess = (token) => ({
  type: REGISTER_SUCCESS,
  payload: token
});
