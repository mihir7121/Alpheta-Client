import {createContext, useContext, useEffect, useReducer} from 'react'
import { favouriteItem, getInteractions, followUser } from '../apis/apis.js';

const UserContext = createContext();


function UserReducer(state, action) {
  const newData = {...state}
  switch (action.type) {

    case 'load':
      newData.favourites = action.data.favourites
      newData.following = action.data.following
      newData.followers = action.data.followers
      return newData

    case 'favourites':
      newData.favourites = action.favourites
      return newData

    case 'following':
      newData.following = action.following
      return newData

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider({children}) {
  const [state, dispatch] = useReducer(UserReducer, {
    address: null,
    favourites: [],
    followers: [],
    following: []
  })

  const load = async (address) => {
    const interactions = await getInteractions();
    if (interactions.success) {
      dispatch({
        type: 'load',
        data: interactions
      })
    } else {
      alert(interactions.message)
    }
  }

  const favourite = async (slug, remove = false) => {
    const res = await favouriteItem(slug, remove);
    if (res.success) {
      dispatch({
        type: 'favourites',
        favourites: res.favourites
      })
    } else {
      alert(res.message)
    }
  }

  const follow = async (address, remove = false) => {
    const res = await followUser(address, remove);
    if (res.success) {
      dispatch({ 
        type: 'following',
        following: res.following
      })
    } else {
      alert(res.message)
    }
  }
  
  const value = {state, dispatch, load, favourite, follow}
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export {UserProvider, useUser}