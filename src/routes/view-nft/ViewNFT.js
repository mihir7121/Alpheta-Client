import './ViewNFT.css'
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import wolfImage from '../../assets/wolf-icon.svg'
import favouriteIcon from '../../assets/favourite.png'
import favouritedIcon from '../../assets/favourited.png'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { viewNFT, writeReview } from '../../apis/apis';
import Loading from '../../components/Loading';
import { sampleNFTItem } from '../../apis/test-data';
import { formatNumber, formatScore } from '../../utils/utils';
import RatingSlider from '../../components/RatingSlider';
import FillButton from '../../components/FillButton';
import ReviewCard from '../../components/ReviewCard';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';
import CallToAction from '../../components/CallToAction';
import { useModal } from '../../contexts/ModalContext';
import NFTArtwork from './tabs/NFTArtwork'
import NFTTeam from './tabs/NFTTeam'
import NFTCommunity from './tabs/NFTCommunity'
import NFTUtility from './tabs/NFTUtility';
import ThankReviewModal from '../../components/ThankReviewModal';
import NFTinfluencer from './tabs/NFTinfluencer';
import NFTRoadmap from './tabs/NFTRoadmap';
import NFTTweet from './tabs/NFTtweet';
import NFTLinks from './tabs/NFTLinks';

function ViewNFT() {
  const params = useParams()
  const [itemData, setItemData] = useState(null)

  const [selectedTab, setSelectedTab] = useState('artwork')

  const auth = useAuth();
  const userContext = useUser();
  const modal = useModal();

  const liked = itemData ? userContext.state.favourites.includes(itemData.id) : false

  const toggleLiked = async (event) => {
    event.stopPropagation()
    event.preventDefault();

    if (!auth.state.isAuthenticated) {
      modal.showConnectPromptModal()
      return
    }

    await userContext.favourite(itemData.slug, liked)
  }

  useEffect(() => {
    const loadItemDetails = async () => {
      const data = await viewNFT(params.slug)
      if (data.success) {
        setItemData(data)
      } else {
        alert(data.message)
      }
    }

    loadItemDetails()
  }, [])

  const getCurrentTabView = () => {
    if (selectedTab === 'artwork') {
      return <NFTArtwork />
    }
    if (selectedTab === 'theteam') {
      return <NFTTeam />
    }
    if (selectedTab === 'community') {
      return <NFTCommunity />
    }
    if (selectedTab === 'roadmap') {
      return <NFTRoadmap />
    }
    if (selectedTab === 'utility'){
      return <NFTUtility />
    }
    if (selectedTab === 'influencer'){
      return <NFTinfluencer />
    }
    if (selectedTab === 'toptweets'){
      return <NFTTweet />
    }
    if (selectedTab === 'importantlinks'){
      return <NFTLinks/>
    }
    return <div className="empty-placeholder">Nothing here yet</div>
  }

  const afterReview = (newData) => {
    const data = {}
    Object.assign(data, itemData)
    Object.assign(data, newData)
    setItemData(data)
  }

  return (
    <div>
      <Navbar></Navbar>
      <ThankReviewModal></ThankReviewModal>
      <div className='view-nft container'>
        {
          itemData ?
            <div>
              <div className='view-nft-top'>
                <img src={itemData.imageURL} />

                <div className='view-nft-content'>
                  <h1>{itemData.name}</h1>
                  <p>{itemData.description}</p>

                  <div className='nft-info-row'>
                    <div className='nft-score-section'>
                      <img title='Alpha Score' alt='Alpha Score' src={wolfImage} />
                      {formatScore(itemData.score)}
                    </div>

                    <div className='view-nft-fave' onClick={toggleLiked}>
                      <img src={liked ? favouritedIcon : favouriteIcon} />
                    </div>
                  </div>

                  <span className='nft-hint'>
                    Votes casted by {itemData.vote_count_user} users and {itemData.vote_count_alpha} alphas
                  </span>

                  <span className='divider'></span>

                  <div className='nft-stats'>
                    <div title={itemData.floorPrice}>
                      <span>Floor Price</span>
                      {
                        itemData.floorPrice ?
                          (formatNumber(itemData.floorPrice) + ' ETH')
                          : '--'
                      }
                    </div>

                    <div title={itemData.avgPrice}>
                      <span>Avg Price</span>
                      {formatNumber(itemData.avgPrice)} ETH
                    </div>

                    <div title={itemData.sales}>
                      <span>Sales</span>
                      {formatNumber(itemData.sales)}
                    </div>

                    <div title={itemData.marketCap}>
                      <span>Market Cap</span>
                      {formatNumber(itemData.marketCap)}
                    </div>

                    <div title={itemData.volume}>
                      <span>Volume</span>
                      {formatNumber(itemData.volume)}
                    </div>

                    <div title={itemData.owners}>
                      <span>Owners</span>
                      {formatNumber(itemData.owners)}
                    </div>
                  </div>

                  <span style={{ marginTop: '0px', marginBottom: '16px' }} className='divider'></span>

                  <div className='nft-links'>
                    <FillButton href={`https://opensea.io/collection/${itemData.slug}`}>
                      Buy Now
                    </FillButton>

                    {
                      itemData.discord ?
                        <a
                          className='nft-action'
                          style={{ '--color-accent': '#5465de' }}
                          href={itemData.discord}>

                          <i className='fab fa-discord'></i>
                        </a>
                        : null
                    }

                    {
                      itemData.twitter ?
                        <a
                          className='nft-action'
                          style={{ '--color-accent': '#1c99e6' }}
                          href={'https://twitter.com/' + itemData.twitter}>

                          <i className='fab fa-twitter'></i>
                        </a>
                        : null
                    }
                  </div>
                </div>
              </div>

              <div className='profile-content container'>
                <NFTTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

                <div style={{ marginBottom: '48px', width: '100%' }}>
                  {getCurrentTabView()}
                </div>
              </div>

              <div className='view-nft-reviews'>
                <h1>Reviews</h1>

                <WriteReview modal={modal} afterReview={afterReview} itemData={itemData}></WriteReview>

                {
                  itemData.reviews.length === 0 ?
                    <div className='empty-placeholder'>Be the first one to talk about this.</div>
                    : null
                }

                <div className='reviews-list'>
                  {
                    itemData.reviews.map((item, index) => {
                      return <ReviewCard item={item} key={index}></ReviewCard>
                    })
                  }
                </div>
              </div>
            </div>
            : <Loading></Loading>
        }
      </div>
      <Footer></Footer>
      <CallToAction></CallToAction>
    </div>
  )
}

function WriteReview({ itemData, afterReview, modal }) {
  const auth = useAuth()

  let myReview = null

  for (let i = 0; i < itemData.reviews.length; i++) {
    if (itemData.reviews[i].user.address === auth.state.address) {
      myReview = itemData.reviews[i]
      break
    }
  }

  const canEdit = myReview == null || ((new Date() - new Date(myReview.date)) > 1000 * 60 * 10)

  const [rating, setRating] = useState(myReview ? myReview.score : 0);
  const [text, setText] = useState(myReview ? myReview.text : '');
  const [submitting, setSubmitting] = useState(false);

  const handeTextChange = (event) => {
    if (checkAuth() || submitting) return
    setText(event.target.value);
  }

  const checkAuth = () => {
    if (!auth.state.isAuthenticated) {
      modal.showConnectPromptModal()
      return true
    }
    return false
  }

  const updateRating = (rating) => {
    if (checkAuth() || !canEdit || submitting) return
    setRating(rating)
  }

  const handleSubmitClick = async () => {
    if (rating === 0 || submitting) return
    if (checkAuth()) return

    setSubmitting(true)
    const result = await writeReview(auth.state.token, itemData.slug, text, rating)
    setSubmitting(false)

    if (result.success) {
      afterReview(result)
      modal.showThankReviewModal()
    } else {
      alert(result.message)
    }
  }

  return (
    <div className='write-review'>
      <h2>Your Review</h2>

      <RatingSlider rating={!canEdit ? myReview.score : rating} setRating={updateRating}></RatingSlider>

      <span className='your-rating'>Your Rating: {!canEdit ? myReview.score : rating} / 10</span>

      <textarea disabled={!canEdit || submitting} placeholder='Your review here...'
        value={!canEdit ? myReview.text : text} onChange={handeTextChange}></textarea>

      {
        canEdit ?
          <div className={'submit-btn' + (rating > 0 ? '' : ' btn-disabled')} onClick={handleSubmitClick}>
            <FillButton>{myReview ? 'Save Changes' : 'Submit'}</FillButton>
          </div>
          : null
      }
    </div>
  )
}

function NFTTabs({ selectedTab, setSelectedTab }) {
  const tabs = [
    {
      id: 'artwork',
      title: 'Artwork'
    },
    {
      id: 'theteam',
      title: 'The Team'
    },
    {
      id: 'community',
      title: 'Community'
    },
    {
      id: 'roadmap',
      title: 'Roadmap'
    },
    {
      id: 'utility',
      title: 'Utility'
    },
    {
      id: 'influencer',
      title: 'Influencer/Celebrity Owner'
    },
    {
      id: 'toptweets',
      title: 'Top Tweets'
    },
    {
      id: 'importantlinks',
      title: 'Important Links'
    },
    {
      id: 'resource',
      title: 'Resource'
    },
  ]

  const changeTab = (id) => {
    for (const i in tabs) {
      if (tabs[i].id === id) {
        if (tabs[i].disabled) {
          return
        }
        break
      }
    }
    setSelectedTab(id);
  }

  return (
    <div className='profile-tabs'>
      {
        tabs.map(tab => {
          const isSelected = selectedTab === tab.id
          return (
            <div onClick={() => changeTab(tab.id)} key={tab.title}
              className={
                'tab'
                + (isSelected ? ' tab-selected' : '')
                + (tab.disabled ? ' tab-disabled' : '')
              }>
              {tab.title}
            </div>
          )
        })
      }
    </div>
  )
}

export default ViewNFT;