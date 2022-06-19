import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNFTLeaderboard, getLeaderboard } from '../../apis/apis.js';
import CallToAction from '../../components/CallToAction.js';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading.js';
import Navbar from '../../components/Navbar';
import NFTCard from '../../components/NFTCard.js';
import wolfIcon from './../../assets/wolf-icon.svg'
import { formatScore, shortenAddress } from '../../utils/utils.js';
import './Leaderboard.css'

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [nftLeaderboardData, setNFTLeaderboardData] = useState(null);

  const loadLeaderboard = async () => {
    const data = await getLeaderboard(12)
    if (data.success) {
      if (data.leaderboard.length > 12) {
        data.leaderboard = data.leaderboard.slice(0, 12)
      }
      setLeaderboardData(data.leaderboard)
    } else {
      alert(data.message)
    }
  } 

  const loadNFTLeaderboard = async () => {
    const data = await getNFTLeaderboard(12)
    if (data.success) {
      setNFTLeaderboardData(data.projects)
    } else {
      alert(data.message)
    }
  } 

  useEffect(() => {
    loadLeaderboard()
    loadNFTLeaderboard()
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <div className='page-leaderboard container'>
        <h1>Top Projects</h1>

        {
          nftLeaderboardData ?
          <div className='nft-card-grid'>
            {
              nftLeaderboardData.map((item, index) => {
                return (
                  <NFTLeaderCard key={index} rank={index + 1} item={item}></NFTLeaderCard>
                )
              })
            }
          </div>
          : <Loading></Loading>
        }

        <div div style={{height: '64px'}}></div>

        <h1>Top Voters - The Alphas</h1>

        {
          leaderboardData ?
          <div className='leaders-grid'>
            {
              leaderboardData.map((item, index) => {
                return (
                  <LeaderCard key={index} rank={index + 1} item={item}></LeaderCard>
                )
              })
            }
          </div>
          : <Loading></Loading>
        }
      </div>

      <Footer></Footer>
      <CallToAction></CallToAction>
    </div>
  )
}

function LeaderCard({rank, item}) {
  return (
    <Link to={'/profile/' + item.address} className='leader-card'>
      <img src={`https://avatars.dicebear.com/api/identicon/${item.address}.svg`} />
      <div>
        {
          item.username || 'Unnamed'
        }
        <span>{shortenAddress(item.address)}</span>
        <span>{item.review_count} reviews</span>
      </div>
      <span className='leader-rank'>{rank}</span>
    </Link>
  )
}

function NFTLeaderCard({rank, item}) {
  return (
    <Link to={'/view/' + item.slug} className='nft-leader-card'>
      <span className='nft-leader-rank'>
        {rank}.
      </span>
      <img className='nft-leader-img'
        src={item.imageURL} />
      <div>
        {item.name}
        <span>
          <img src={wolfIcon} />
          {formatScore(item.score)}
        </span>
      </div>
    </Link>
  )
}

export default Leaderboard;