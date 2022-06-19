import './NFTCard.css'
import favouriteIcon from './../assets/favourite.png'
import favouritedIcon from './../assets/favourited.png'
import wolfIcon from './../assets/wolf-icon.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext.js'
import { useAuth } from '../contexts/AuthContext'
import { formatScore } from '../utils/utils'
import { useModal } from '../contexts/ModalContext'
import FillButton from './FillButton'

function NFTCard({item}) {
  const userContext = useUser();
  const auth = useAuth();
  const modal = useModal();

  const liked = userContext.state.favourites.includes(item._id)

  const toggleLiked = async (event) => {
    event.stopPropagation()
    event.preventDefault();

    if (!auth.state.isAuthenticated) {
      modal.showConnectPromptModal()
      return
    }

    await userContext.favourite(item.slug, liked)
  }

  const onBuyClick = async (event) => {
    event.stopPropagation()
    event.preventDefault();
    window.open(event.target.href)
  }

  return (
    <Link to={`/view/${item.slug}`}  className='nft-card'>
      <div className='nft-image'>
        <img src={item.imageURL} />

        <div onClick={toggleLiked} className='nft-favourite'>
          <img src={liked ? favouritedIcon : favouriteIcon} />
        </div>
      </div>
      <div className='nft-content'>
        {/* <div className='nft-artist'>
          <img src='https://oction.vercel.app/assets/img/art/art2.jpg'/>
          @akharote1
        </div> */}

        <span className='nft-title'>{item.name}</span>

        <p>
          {item.description}
        </p>

        <span className='nft-meta-type'>Alpha Score</span>
        <span className='nft-score'>
          {formatScore(item.score)}
          <img src={wolfIcon} />
        </span>

        <div className='nft-card-links'>
          <FillButton small={true} onClick={onBuyClick} href={`https://opensea.io/collection/${item.slug}`}>
            Buy Now
          </FillButton>

          {
            item.discord ?
              <a 
                className='nft-card-action' 
                style={{'--color-accent': '#5465de'}} 
                href={item.discord}>

                <i className='fab fa-discord'></i>
              </a>
            : null
          }

          {
            item.twitter ?
              <a 
                className='nft-card-action' 
                style={{'--color-accent': '#1c99e6'}} 
                href={'https://twitter.com/' + item.twitter}>

                <i className='fab fa-twitter'></i>
              </a>
            : null
          }
        </div>
      </div>
    </Link>
  )
}

export default NFTCard