import { useEffect, useState } from 'react';
import { getExplore } from '../../apis/apis';
import CallToAction from '../../components/CallToAction';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import NFTCard from '../../components/NFTCard';
import Pagination from '../../components/Pagination';
import './Explore.css'

function Explore() {
  const [exploreData, setExploreData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchText, setSearchText] = useState('');

  const loadExplore = async (page = currentPage) => {
    if (searchText && searchText.trim().length < 3) return
    setCurrentPage(page)
    setExploreData(null)

    const data = await getExplore(page, 20, searchText.trim())
    if (data.success) {
      setExploreData(data.projects)
      setPageCount(data.page_count)
    } else {
      alert(data.message)
    }
  } 

  useEffect(() => {
    const timeout = setTimeout(loadExplore, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [searchText])

  return (
    <div>
      <Navbar></Navbar>
      <div className='page-explore container'>
        <h1>Explore Artworks</h1>

        <SearchFilterRow 
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {
          exploreData ? 
          <div>
            <div className='nft-card-grid'>
              {exploreData.map((item, index) => {
                return <NFTCard key={item.slug + index} item={item}></NFTCard>
              })}
            </div>

            {
              exploreData.length === 0 ?
                <div className='empty-placeholder'>
                  No results found
                </div>
              : null
            }

            <Pagination
              currentPage={currentPage} 
              pageCount={pageCount}
              loadPage={loadExplore}
            ></Pagination>
          </div>
          : <Loading></Loading>
        }
      </div>

      <Footer></Footer>
      <CallToAction></CallToAction>
    </div>
  )
}

function SearchFilterRow({searchText, setSearchText}) {
  return (
    <div className='esf-row'>
      <div className='esf-search'>
        <input 
          placeholder='Search NFTs'
          value={searchText} 
          onChange={(event) => setSearchText(event.target.value)}
        ></input>
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