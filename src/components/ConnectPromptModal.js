import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import './ConnectPromptModal.css'
import FillButton from './FillButton'

function ConnectPromptModal() {
  const auth = useAuth()
  const modal = useModal()

  if (auth.state.isAuthenticated) return;
  if (!modal.connectPromptModalVisible) return;

  const onConnectClick = () => {
    modal.hideConnectPromptModal()
    auth.connectWallet()
  }

  return (
    <div className='cpm-backdrop'>
      <div className='cpm-modal'>
        <h1>Connect Your Wallet</h1>
        <p>You need to connect your wallet to perform this action.</p>

        <FillButton onClick={onConnectClick}>Connect Now</FillButton>
        <span onClick={modal.hideConnectPromptModal} className='not-now'>&lt; Not now</span>
      </div>
    </div>
  )
}

export default ConnectPromptModal;