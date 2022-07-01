import { API_ROOT_DEBUG, API_ROOT_PROD, isDebug } from "../config"

export const API_ROOT = isDebug ? API_ROOT_DEBUG : API_ROOT_PROD

export const getExplore = async (page = 1, limit = 20, q = '') => {
  const res = await fetch(`${API_ROOT}/project/explore?limit=${limit}&page=${page}&q=${q}`)
  const data = await res.json()
  return data;
}

export const viewNFT = async (slug) => {
  const res = await fetch(`${API_ROOT}/project/view/${slug}`)
  const data = await res.json()
  return data;
}

export const getLeaderboard = async (limit = 12) => {
  const res = await fetch(`${API_ROOT}/user/leaderboard?limit=${limit}`)
  const data = await res.json()
  return data;
}

export const getNFTLeaderboard = async (limit = 10) => {
  const res = await fetch(`${API_ROOT}/project/leaderboard?limit=${limit}`)
  const data = await res.json()
  return data;
}

export const getInteractions = async () => {
  const res = await fetch(`${API_ROOT}/user/interactions`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
  const data = await res.json()
  return data;
}

export const getUserProfile = async (address) => {
  const res = await fetch(`${API_ROOT}/user/view/${address}`)
  const data = await res.json()
  return data;
}

export const getUserFavourites = async (address) => {
  const res = await fetch(`${API_ROOT}/user/view/${address}/favourites`)
  const data = await res.json()
  return data;
}

export const getUserActivities = async (address) => {
  const res = await fetch(`${API_ROOT}/user/view/${address}/activities`)
  const data = await res.json()
  return data;
}

export const favouriteItem = async (slug, remove) => {
  const res = await fetch(`${API_ROOT}/project/${remove ? 'un' : ''}favourite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      slug: slug
    })
  })
  const data = await res.json()
  return data;
}

export const followUser = async (address, remove) => {
  const res = await fetch(`${API_ROOT}/user/${remove ? 'un' : ''}follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      address: address
    })
  })
  const data = await res.json()
  return data;
}

export const updateUsername = async (username) => {
  const res = await fetch(`${API_ROOT}/user/update-username`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      username
    })
  })
  const data = await res.json()
  return data;
}

export const authenticate = async (account) => {
  const res = await fetch(`${API_ROOT}/user/authenticate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address: account
    })
  })
  const data = await res.json()
  return data;
}

export const verify = async (account, signature) => {
  const res = await fetch(`${API_ROOT}/user/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address: account,
      signature: signature
    })
  })
  const data = await res.json()
  return data;
}

export const checkAuth = async () => {
  const res = await fetch(`${API_ROOT}/user/check-auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
  const data = await res.json()
  return data;
}


export const writeReview = async (token, slug, text, score) => {
  const res = await fetch(`${API_ROOT}/project/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      slug,
      text,
      score
    })
  })
  const data = await res.json()
  return data;
}

export const sendFeedback = async (email, feedback) => {
  const res = await fetch(`${API_ROOT}/user/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      email,
      feedback
    })
  })
  const data = await res.json()
  return data;
}