import {createContext, useContext, useEffect, useReducer} from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { authenticate, checkAuth, verify } from '../apis/apis.js';
import { useUser } from './UserContext.js';

const AuthContext = createContext();

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'f28a418bd96844379f096d0c2a3131fb'
      }
    }
  }
});

function AuthReducer(state, action) {
  switch (action.type) {
    case 'set':
      return action.data
    case 'verify':
      const newState = Object.assign({}, state)
      newState.verified = true
      return newState
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AuthProvider({children}) {
  const [state, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: false,
    address: null,
    token: null,
    verified: false
  })

  const userContext = useUser()

  const signIn = async (connection, account) => {
    const user = await authenticate(account);
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(user.nonce.toString());
    const data = await verify(account, signature);

    if (!data.success) {
      localStorage.clear();
      
      dispatch({
        'type': 'verify'
      })
      return alert(data.message)
    }

    localStorage.setItem('token', data.token);

    dispatch({
      type: 'set',
      data: {
        isAuthenticated: true,
        token: data.token,
        address: account,
        verified: true
      }
    })

    userContext.load(account)
  }

  const connectWallet = async () => {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const accounts = await provider.listAccounts();

    if (!localStorage.getItem('token'))
      signIn(connection, accounts[0]);
    else {
      connectWalletIfLoggedIn()
    }
  }

  const connectWalletIfLoggedIn = async () => {
    if (!localStorage.getItem('token')) {
      dispatch({
        type: 'verify'
      })
      return
    }

    const authData = await checkAuth()

    if (authData.success) {
      dispatch({
        type: 'set',
        data: {
          isAuthenticated: true,
          token: localStorage.getItem('token'),
          address: authData.user.address,
          username: authData.user.username,
          verified: true
        }
      });

      userContext.load(authData.address)
    } else {
      localStorage.clear()
      dispatch({
        'type': 'verify'
      })
    }
  }

  useEffect(() => {
    connectWalletIfLoggedIn()
  }, [])
  
  const value = {state, dispatch, connectWallet}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export {AuthProvider, useAuth}