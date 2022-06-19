import {createContext, useContext, useEffect, useReducer, useState} from 'react'

const ModalContext = createContext();

function ModalProvider({children}) {
  const [connectPromptModalVisible, setConnectPromptModalVisible] = useState(false)
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false)

  const showConnectPromptModal = () => {
    setConnectPromptModalVisible(true)
  }
  
  const hideConnectPromptModal = () => {
    setConnectPromptModalVisible(false)
  }

  const showEditProfileModal = () => {
    setEditProfileModalVisible(true)
  }
  
  const hideEditProfileModal = () => {
    setEditProfileModalVisible(false)
  }
  const value = {
    connectPromptModalVisible, 
    showConnectPromptModal, 
    hideConnectPromptModal,
    editProfileModalVisible,
    showEditProfileModal, 
    hideEditProfileModal,
  }
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export {ModalProvider, useModal}