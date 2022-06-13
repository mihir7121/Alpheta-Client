import './Profile.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '../../apis/apis'
import FillButton from '../../components/FillButton'
import Footer from '../../components/Footer'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext'
import { shortenAddress } from '../../utils/utils'
import bannerDefault from './../../assets/banner-default.jpg'
import wolfImage from '../../assets/wolf-icon.svg'
import ProfileFavourites from './tabs/ProfileFavourites'
import { useUser } from '../../contexts/UserContext'
import CallToAction from '../../components/CallToAction'
import ProfileActivity from './tabs/ProfileActivity'

function Profile() {
  const params = useParams()
  const auth = useAuth()
  const [selectedTab, setSelectedTab] = useState('activity')
  const [userData, setUserData] = useState(null)

  const address = params.address || auth.state.address
  const isOwn = address === auth.state.address 

  const userContext = useUser()

  const followed = userData ? userContext.state.following.includes(userData._id) : false

  const toggleFollowing = async (event) => {
    event.stopPropagation()
    event.preventDefault();
    await userContext.follow(userData.address, followed)
  }

  useEffect(() => {
    const loadItemDetails = async () => {
      if (address == null) return
      const data = await getUserProfile(address)
      if (data.success) {
        setUserData(data.profile)
      } else {
        alert(data.message)
      }
    } 

    loadItemDetails()
  }, [address])

  const getCurrentTabView = () => {
    if (selectedTab === 'favourites') {
      return <ProfileFavourites userData={userData} />
    }

    if (selectedTab === 'activity') {
      return <ProfileActivity userData={userData} />
    }

    return <div className="empty-placeholder">Nothing here yet</div>
  }

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(userData.address)
    alert('The wallet address has been copied to clipboard')
  }

  return (
    <div>
      <Navbar isStatic={true}></Navbar>
      <div className='page-profile'>
        {
          userData ?
            <div className='page-profile-inner'>
              <div className='profile-header' />
              <div className='profile-img'>
                <img src={`https://avatars.dicebear.com/api/identicon/${userData.address}.svg`} />
              </div>

              <div className='profile-details container'>
                <h2>
                  {
                    userData.isAlpha ?
                      <img alt='Alpha User' title='Alpha User' src={wolfImage} />  
                    : null
                  }
                  {userData.username || 'Unnamed'}
                  {
                    isOwn ?
                      <span className='profile-edit'>
                        <i className='fas fa-edit'></i>
                      </span>
                    : null
                  }
                </h2>
                <span className='profile-id' onClick={copyAddressToClipboard}>{userData.address}</span>

                <div className='profile-stats'>
                  <div>
                    <span>{userData.followers}</span>
                    Followers
                  </div>

                  <div>
                    <span>{userData.following}</span>
                    Following
                  </div>
                </div>

                <div className='profile-actions'>
                  {
                    !isOwn ?
                      <FillButton onClick={toggleFollowing}>{followed ? 'Unfollow' : 'Follow'}</FillButton>
                    : null
                  }
                </div>
              </div>

              <div className='profile-content container'>
                <ProfileTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

                <div style={{marginBottom: '48px', width: '100%'}}>
                  {getCurrentTabView()}
                </div>
              </div>
            </div>
          : <Loading />
        }
      </div>
      <Footer></Footer>
      <CallToAction></CallToAction>
    </div>
  )
}

function ProfileTabs({selectedTab, setSelectedTab}) {
  const tabs = [
    {
      id: 'favourites',
      title: 'Favourites'
    },
    {
      id: 'created',
      title: 'Created',
      disabled: true
    },
    {
      id: 'collected',
      title: 'Collected',
      disabled: true
    },
    {
      id: 'activity',
      title: 'Activity'
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
    setSelectedTab(id)
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

export default Profile