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

function ViewNFT() {
  const params = useParams()
  const [itemData, setItemData] = useState(null)

  const auth = useAuth();
  const userContext = useUser();
  const modal = useModal();

  const liked = itemData ? userContext.state.favourites.includes(itemData.id) : false

  const toggleLiked = async (event) => {
    event.stopPropagation()
    event.preventDefault();

    if (!auth.state.isAuthenticated) {
      modal.showModal()
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

  const afterReview = (newData) => {
    const data = {}
    Object.assign(data, itemData)
    Object.assign(data, newData)
    setItemData(data)
  }

  return (
    <div>
      <Navbar></Navbar>
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
                    <img title='Alpha Score' alt='Alpha Score' src={wolfImage}/>
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

                <span style={{marginTop: '0px', marginBottom: '16px'}} className='divider'></span>
              </div>
            </div>

            <div className='view-nft-reviews'>
              <h1>Reviews</h1>

              <WriteReview modal={modal} afterReview={afterReview} itemData={itemData}></WriteReview>
              
              {
                itemData.reviews.length === 0 ?
                  <div className='empty-placeholder'>No reviews available</div>
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

function WriteReview({itemData, afterReview, modal}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const auth = useAuth()

  const handeTextChange = (event) => {
    if (checkAuth()) return
    setText(event.target.value);
  }

  const checkAuth = () => {
    if (!auth.state.isAuthenticated) {
      modal.showModal()
      return true
    }
    return false
  }

  const updateRating = (rating) => {
    if (checkAuth()) return
    setRating(rating)
  }

  const handleSubmitClick = async () => {
    if (rating === 0) return
    if (checkAuth()) return

    const result = await writeReview(auth.state.token, itemData.slug, text, rating)
    if (result.success) {
      alert('Review was saved')
      afterReview(result)
    } else {
      alert(result.message)
    }
  }

  let myReview = null

  for (let i = 0; i < itemData.reviews.length; i++) {
    if (itemData.reviews[i].user.address === auth.state.address) {
      myReview = itemData.reviews[i]
      break
    }
  }

  return (
    <div className='write-review'>
      <h2>Your Review</h2>

      <RatingSlider rating={myReview ? myReview.score : rating} setRating={updateRating}></RatingSlider>

      <span className='your-rating'>Your Rating: {myReview ? myReview.score : rating} / 10</span>

      <textarea disabled={myReview != null} placeholder='Your review here...' 
          value={myReview ? myReview.text : text} onChange={handeTextChange}></textarea>

      {
        !myReview ?
          <div className={'submit-btn' + (rating > 0 ? '' : ' btn-disabled')} onClick={handleSubmitClick}>
            <FillButton>Submit</FillButton>
          </div>
        : null
      }
    </div>
  )
}

export default ViewNFT;