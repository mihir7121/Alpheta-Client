import { discordLink } from '../config';
import './CallToAction.css'

function CallToAction() {
  return (
    <a className='call-to-action' href={discordLink}>
      <i className='fab fa-discord'></i>
    </a>
  )
}

export default CallToAction;