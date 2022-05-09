import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
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

  // get single user
  const getUser = async (login) => {
    setLoading()

    // fetches the user from the api and sends the token
    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (res.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await res.json()

      // dispatches the user and sends the user data
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  // gets the users repos
  const getUserRepos = async (login) => {
    setLoading()

    // sorts the number of repo based on created date and sets the number displayed to 10
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    })

    // fetches the repos serach from the api and sends the token
    const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const data = await res.json()

    // dispatches the repos and sends the repos data
    dispatch({
      type: 'GET_REPOS',
      payload: data,
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
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
