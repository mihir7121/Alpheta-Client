import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import './ThankReviewModal.css'
import FillButton from './FillButton'
import { Link } from 'react-router-dom';

function ThankReviewModal() {
  const auth = useAuth()
  const modal = useModal()

  if (!auth.state.isAuthenticated) return;
  if (!modal.thankReviewModalVisible) return;

  return (
    <div className='trm-backdrop'>
      <div className='trm-modal'>
        <h1>Thank you for your review</h1>
        <p>Some content here... Please give feedback....</p>

        <Link to='/feedback'>
          <FillButton>Give Feedback</FillButton>
        </Link>
        <span onClick={modal.hideThankReviewModal} className='not-now'>&lt; Not now</span>
      </div>
    </div>
  )
}

export default ThankReviewModal;