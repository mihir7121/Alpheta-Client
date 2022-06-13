import {createContext, useContext, useEffect, useReducer, useState} from 'react'

const ModalContext = createContext();

function ModalProvider({children}) {
  const [modalVisible, setModalVisible] = useState(false)

  const showModal = () => {
    setModalVisible(true)
  }
  
  const hideModal = () => {
    setModalVisible(false)
  }

  const value = {modalVisible, showModal, hideModal}
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