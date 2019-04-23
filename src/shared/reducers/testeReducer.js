export default function testeReducer (state = 0, action) {
  switch (action.type) {
    case 'TESTANDO_USER':
      return action.payload
    default:
      return state
  }
}
