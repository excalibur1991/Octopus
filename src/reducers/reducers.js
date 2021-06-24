const initialState = {
  account: '',
  seedPhrase: '',
}

const reducers = (state = initialState, action) => {
  let val = {}
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        account: action.payload,
      };
      break
    case 'UPDATE_SEEDPHRASE':
      return {
        ...state,
        seedPhrase: action.payload,
      };
      break
    default:
      val = state
  }
  return val
}

export default reducers
