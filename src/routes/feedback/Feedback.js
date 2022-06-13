import { useState } from 'react';
import { sendFeedback } from '../../apis/apis.js';
import CallToAction from '../../components/CallToAction.js';
import FillButton from '../../components/FillButton.js';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './Feedback.css'

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

                    <div className={isDisabled() ? 'btn-disabled' : ''} style={{marginLeft: 'auto'}}>
                      <FillButton onClick={submitFeedback}>Submit</FillButton>
                    </div>
                  </form>
                </div>

                <div className='feedback-right'>
                  <h2>Why your feedback matters</h2>
                  <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt dolor vitae velit vehicula, imperdiet finibus arcu finibus. Sed molestie malesuada turpis et aliquet. Donec bibendum purus eu ipsum facilisis tempus. Phasellus ullamcorper faucibus diam id auctor. Fusce purus nibh, aliquam at posuere in, tempus quis turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed scelerisque dignissim tortor vel interdum. Vivamus laoreet enim molestie libero elementum elementum. Sed venenatis, ligula eget viverra interdum, nisi sem lacinia elit, id finibus lacus lacus nec mauris. Sed aliquam dapibus mauris, a dictum purus elementum vitae. Aliquam hendrerit, nisl eu pellentesque interdum, lacus felis ultricies massa, non imperdiet elit tellus at ex. Morbi in euismod sem, quis tristique elit. Fusce feugiat enim sit amet sem porttitor, a tincidunt erat elementum. Maecenas tempor augue vitae arcu ultricies tempor. Mauris sit amet porta massa.
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