import { Link } from 'react-router-dom';
import { discordLink, emailAddress, facebookLink, instagramLink, twitterLink } from '../config';
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-inner container'>
        <div>
          <span className='footer-title'>
            Contact
          </span>
          
          <a href={'mailto:' + emailAddress}>
            <i className='fas fa-envelope'></i>
              {emailAddress}
            </a>
        </div>

        <div>
          <span className='footer-title'>
            Links
          </span>

          <Link to='/'>Home</Link>
          <Link to='/explore'>Explore</Link>
          <Link to='/leaderboard'>Leaderboard</Link>
          <Link to='/faq'>FAQs</Link>
          <Link to='/feedback'>Feedback</Link>
        </div>

        <div>
          <span className='footer-title'>
            Social
          </span>
          
          <a href={instagramLink}>
            <i className='fab fa-instagram'></i>
            Instagram
          </a>
          <a href={facebookLink}>
            <i className='fab fa-facebook'></i>
            Facebook</a>
          <a href={twitterLink}>
            <i className='fab fa-twitter'></i>
            Twitter
          </a>
          <a href={discordLink}>
            <i className='fab fa-discord'></i>
            Discord
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer;