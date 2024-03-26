const authReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };
    case 'REGISTER':
      return { ...state, data: action?.data };
      case 'SUBSCRIBE_TO_CHANNEL':
        return {
          ...state,
          data: {
            ...state.data,
            subscriberIds: action.payload.subscriberIds
          }
        };
  
      case 'UNSUBSCRIBE_FROM_CHANNEL':
        return {
          ...state,
          data: {
            ...state.data,
            subscriberIds: action.payload.subscriberIds
          }
        };
    default:
      return state;
  }
};

export default authReducer;
