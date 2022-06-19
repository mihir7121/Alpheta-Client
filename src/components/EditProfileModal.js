import './EditProfileModal.css'
import { useState } from 'react';
import { updateUsername } from '../apis/apis';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import FillButton from './FillButton'

function EditProfileModal() {
  const auth = useAuth()
  const modal = useModal()

  const [error, setError] = useState(null)
  const [sending, setSending] = useState(false)
  const [username, setUsername] = useState('')

  if (!auth.state.isAuthenticated) return;
  if (!modal.editProfileModalVisible) return;

  const disabled = sending || !(/^[a-zA-Z0-9_]{3,25}$/.test(username))

  const updateUsernameClick = async () => {
    if (disabled) return
    
    setSending(true)
    const data = await updateUsername(username)
    setSending(false)

    if (data.success) {
      window.location.reload()
    } else {
      setError(data.message)
    }
  }

  return (
    <div className='epm-backdrop'>
      <div className='epm-modal'>
        <h1>Update Your Username</h1>
        <p>You will be visible by this name all across Alpheta.</p>

        <input 
          className='epm-name'
          placeholder='Your Username'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        {
          error ?
            <span className='epm-error'>
              {error}
            </span>
          : null
        }

        <div className={disabled ? 'btn-disabled' : ''}>
          <FillButton onClick={updateUsernameClick}>Update Username</FillButton>
        </div>

        <span onClick={modal.hideEditProfileModal} className='not-now'>&lt; Not now</span>
      </div>
    </div>
  )
}

export default EditProfileModal;