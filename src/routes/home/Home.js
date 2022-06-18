import './Home.css'
import Navbar from '../../components/Navbar';
import bannerBg from '../../assets/oc-bg.png';
import wolfImage from '../../assets/wolf-icon.svg';
import redWolfImage from '../../assets/wolf.svg';
import FillButton from '../../components/FillButton';
import CreatorCard from '../../components/CreatorCard';
import NFTCard from '../../components/NFTCard';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { getExplore, getLeaderboard, getNFTLeaderboard } from '../../apis/apis.js';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import CallToAction from '../../components/CallToAction';

function Home() {
  const [exploreData, setExploreData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(null);

  const loadExplore = async () => {
    const data = await getNFTLeaderboard(8)
    if (data.success) {
      setExploreData(data.projects)
    } else {
      alert(data.message)
    }
  } 

  const loadLeaderboard = async () => {
    const data = await getLeaderboard()
    if (data.success) {
      setLeaderboardData(data.leaderboard)
    } else {
      alert(data.message)
    }
  } 

  useEffect(() => {
    loadExplore()
    // loadLeaderboard()
  }, [])

  return (
    <div className='page-home'>
      <Navbar />
      <div className='home-banner'>
        <img src={bannerBg} />
      </div>

      <div className='banner-content'>
        <h1>
          IMDb FOR <span>NFTs</span>
        </h1>

        <p>
          <b>Find profitable NFTs in a matter of minutes</b>
          <br/>
          <br/>
          Alpheta is the world's first NFT rating platform showcasing ratings and reviews given to NFT Projects by Alpheta Users and Experts. 
          <br /><br/>
          We work on a <span>Vote to Earn</span> mechanism, where our top voters get to be the Alphas and earn ETH + gain access to several rewards.
        </p>

        <Link to='/explore'>
          <FillButton>Explore Now</FillButton>
        </Link>
      </div>

      <section className='container w-is-alpha'>
        <div>
          <h1>What is <span>Alpha Score</span>?</h1>
          <p>
            There are new projects coming up daily, and with limited resources for proper research, people are losing money in scams or average projects. Introducing Alpha Score, the ultimate guide to your NFT journey.
            <br/>
            <br/>
            On Alpheta each NFT Project has an Alpha Score, carefully curated by the votes of registered Alpheta Users and our Top Voters - The Alphas!
          </p>
        </div>
        <img className='wolf-right' alt='Wolf' src={redWolfImage} />
      </section>

      {/* <section className='container'>
        <div>
          <h1>Top Voters - The Alphas</h1>
        </div>

        { 
          leaderboardData ? 
          <div className='creator-card-grid'>
            {
              leaderboardData.map((item, index) => {
                return <CreatorCard key={index} item={item}></CreatorCard>
              })
            }
          </div>
          : <Loading></Loading>
        }
      </section> */}

      <section className='container'>
        <div style={{marginBottom: '32px'}}>
          <h1>Top Projects</h1>
          {
            exploreData ? 
            <div className='nft-card-grid'>
            {
              exploreData.map((item, index) => {
                return <NFTCard key={item.slug} item={item}></NFTCard>
              })
            }
            </div>
            : <Loading></Loading>
          }
          
        </div>

        <Link to='/explore'>
          <FillButton>Explore More</FillButton>
        </Link>
      </section>

      <Footer></Footer>
      <CallToAction></CallToAction>
    </div>
  );
}

export default Home;