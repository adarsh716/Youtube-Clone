const authReducer = (state = { data: null }, actions) => {
  switch (actions.type) {
    case 'LOGIN':
      localStorage.setItem("Profile", JSON.stringify({ ...actions?.data }));
      return { ...state, data: actions?.data };
    case 'REGISTER':
      return { ...state,data:actions?.data };
    default:
      return state;
  }
};
export default authReducer;