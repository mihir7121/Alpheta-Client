import './ReviewCard.css'
import wolfImage from '../assets/wolf-icon.svg';
import { formatScore, shortenAddress } from '../utils/utils';
import { Link } from 'react-router-dom';

function ReviewCard({item}) {
  return (
    <div className='review-card'>
      <img src={`https://avatars.dicebear.com/api/identicon/${item.user.address}.svg`} />

      <div>
        <Link to={'/profile/' + item.user.address} className='review-author'>
          {item.user.username || shortenAddress(item.user.address)}
        </Link>
        <div className='review-score' alt={'Rated ' + item.score}>
          <img src={wolfImage} alt='' />
          {item.score}
        </div>

        {
          item.text.trim() != '' ?
            <p>
              {item.text}
            </p>
          : null
        }
      </div>
    </div>
  )
}

export default ReviewCard