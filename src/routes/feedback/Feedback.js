import { useState } from 'react';
import { sendFeedback } from '../../apis/apis.js';
import CallToAction from '../../components/CallToAction.js';
import FillButton from '../../components/FillButton.js';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './Feedback.css'

// async function myComponent() {
//   const navigate = useNavigate()

//   useEffect(() => {
//     setTimeout(() => {
//       navigate('/')
//     }, 2000)
//   }, [])
//   return;
// }

function Feedback() {
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')
  const [sentFeedback, setSentFeedback] = useState(false)
  const [isSendingFeedback, setSendingFeedback] = useState(false)

  const isDisabled = () => {
    return email.trim().length === 0 || feedback.trim().length < 5 || isSendingFeedback
  }

  const submitFeedback = async () => {
    if (isDisabled()) return
    setSendingFeedback(true)
    try {
      const data = await sendFeedback(email, feedback)
      if (data.success) {
        setSendingFeedback(false)
        setSentFeedback(true)
      } else {
        alert(data.message)
        setSendingFeedback(false)
        setSentFeedback(false)
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred while submitting your feedback')
      setSendingFeedback(false)
      setSentFeedback(false)
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className='page-feedback container'>
        {
          !sentFeedback ?
            <>
              <h1>Submit Feedback</h1>

              <div className='feedback-grid'>
                <div className='feedback-card'>
                  <form>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder='Your Email Address' />

                    <label htmlFor='feedback_text'>Feedback</label>
                    <textarea type='text' id='feedback_text'
                      value={feedback}
                      onChange={(event) => setFeedback(event.target.value)}
                      placeholder='Your feedback here...' />

                    <div className={isDisabled() ? 'btn-disabled' : ''} style={{ marginLeft: 'auto' }}>
                      <FillButton onClick={submitFeedback}>Submit</FillButton>
                    </div>
                  </form>
                </div>

                <div className='feedback-right'>
                  <h2>Why your feedback matters</h2>
                  <p>
                    We are committed to enhancing the Alpheta experience and would like to hear your views about the platform and our concept. We would like to know what we do well, what we should continue, and what we should improve on. Your feedback, positive or negative, is very valuable to us.<br></br><br></br> It will help us -<br></br>
                    1) Take important decisions regarding the platform<br></br>
                    2) Improve the experience for our users and make the required changes.<br></br>
                    3) Give our community a chance to voice their opinions and help us take Alpheta in the direction our community wants
                  </p>
                </div>
              </div>
            </>
            :
            <>
              <h1>Thank you for your feedback</h1>
            </>
        }
      </div>

      <Footer></Footer>
      <CallToAction></CallToAction>
    </div>
  )
}

export default Feedback;