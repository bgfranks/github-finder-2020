import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
})

// get search results and adds to state
export const searchUsers = async (text) => {
  // adds the url query param
  const params = new URLSearchParams({
    q: text,
  })

  // fetches the user serach from the api and sends the token
  const res = await github.get(`/search/users?${params}`)

  // returns the items
  return res.data.items
}

// get the user and repos
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ])

  return { user: user.data, repos: repos.data }
}
