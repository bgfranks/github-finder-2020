import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  // set the loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  // get search results and adds to state
  const searchUsers = async (text) => {
    setLoading()

    // adds the url query param
    const params = new URLSearchParams({
      q: text,
    })

    // fetches the user serach from the api and sends the token
    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const { items } = await res.json()

    // dispatches the seach and sends the search data
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // clears the user search from state
  const clearUsers = () => {
    dispatch({ type: 'CLEAR_USERS' })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
