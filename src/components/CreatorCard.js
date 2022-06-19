import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';
import { useUser } from '../contexts/UserContext';
import { shortenAddress } from '../utils/utils';
import './CreatorCard.css'
import FillButton from './FillButton';

function CreatorCard({item}) {
  const userContext = useUser()
  const authContext = useAuth()
  const modal = useModal()

  const followed = userContext.state.following.includes(item._id)

  const toggleFollowing = async (event) => {
    event.stopPropagation()
    event.preventDefault();

    if (!authContext.state.isAuthenticated) {
      modal.showConnectPromptModal()
      return
    }

    await userContext.follow(item.address, followed)
  }

  return (
    <div className='creator-card'>
      <img src={`https://avatars.dicebear.com/api/identicon/${item.address}.svg`} alt='Creator' />
      <div>
        <Link to={'/profile/' + item.address}>{shortenAddress(item.address)}</Link>
        {/* <span className='creator-id'>@akharote1</span> */}
        <span className='creator-meta'>{item.review_count} reviews</span>
      </div>

      <div className='creator-action' onClick={toggleFollowing}>
        <FillButton small={true}>{followed ? 'Unfollow' : 'Follow'}</FillButton>
      </div>
    </div>
  )
}

export default CreatorCard;