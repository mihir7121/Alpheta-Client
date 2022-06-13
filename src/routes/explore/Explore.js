import { useEffect, useState } from 'react';
import { getExplore } from '../../apis/apis';
import CallToAction from '../../components/CallToAction';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import NFTCard from '../../components/NFTCard';
import './Explore.css'

function Explore() {
  const [exploreData, setExploreData] = useState(null);

  const loadExplore = async () => {
    const data = await getExplore()
    if (data.success) {
      setExploreData(data.projects)
    } else {
      alert(data.message)
    }
  } 

  useEffect(() => {
    loadExplore()
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <div className='page-explore container'>
        <h1>Explore Artworks</h1>

        {
          exploreData ? 
          <div>
            <SearchFilterRow></SearchFilterRow>

            <div className='nft-card-grid'>
              {exploreData.map((item, index) => {
                return <NFTCard key={item.slug + index} item={item}></NFTCard>
              })}
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

function SearchFilterRow() {
  return (
    <div className='esf-row'>
      <div className='esf-search'>
        <input disabled={true} placeholder='Search NFTs'></input>
      </div>
      <div className='esf-filter'>
        <div>Sort By</div>
        <select disabled={true}>
          <option>----</option>
          <option>Name</option>
          <option>Alpha Score</option>
          <option>Date</option>
        </select>
      </div>
    </div>
  )
}

export default Explore;