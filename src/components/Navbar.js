import './Navbar.css'
import logo from './../assets/alpheta-text-logo.svg'
import FillButton from './FillButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { shortenAddress } from '../utils/utils';

function Navbar({isStatic}) {
  const [sticky, setSticky] = useState(false)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [mobileNavVisible, setMobileNavVisible] = useState(false)
  
  const auth = useAuth()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60 && !sticky) setSticky(true)
      else if (window.scrollY < 60 && sticky) setSticky(false)
    })
  }, [sticky])

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible)
  }

  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <div className={
      'navbar' 
      + (sticky ? ' sticky' : '')
      + (isStatic ? ' nav-static' : '')
      + (mobileNavVisible ? ' mnav-expanded' : '')
      }>
      <Link className='logo' to='/'><img alt='Alpheta Logo' src={logo} /></Link>
      <NavItem link="/" title='Home'></NavItem>
      <NavItem link="/explore" title='Explore'></NavItem>
      <NavItem link="/leaderboard" title='Leaderboard'></NavItem>
      <NavItem link="/faq" title='FAQs'></NavItem>

      {
        !auth.state.isAuthenticated ? 
          <div className='nav-connect' onClick={auth.connectWallet}>
            <FillButton>Connect Wallet</FillButton>
          </div>
        : 
        <div className='nav-profile-details' onClick={toggleDropdown}>
          <span>{shortenAddress(auth.state.address)}</span>
          <img className='profile-icon' src={`https://avatars.dicebear.com/api/identicon/${auth.state.address}.svg`} />
        </div>
      }

      {
        dropdownVisible && auth.state.isAuthenticated ?
          <div className='nav-dropdown'>
            <Link to='/profile'>Profile</Link>
            <a onClick={logout}>Logout</a>
          </div>
        : null
      }

      <div onClick={toggleMobileNav} className='mnav-toggle'>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <MobileNav auth={auth}></MobileNav>
    </div>
  )
}

function NavItem(props) {
  return (
    <Link to={props.link} className='navitem'>
      {props.title}
    </Link>
  )
}

function MobileNav({auth}) {
  return (
    <div className='mnav'>
      {
        !auth.state.isAuthenticated ? 
          <div className='nav-connect' onClick={auth.connectWallet}>
            <FillButton>Connect Wallet</FillButton>
          </div>
        : 
        <>
          <div className='nav-profile-details'>
            <img className='profile-icon' src={`https://avatars.dicebear.com/api/identicon/${auth.state.address}.svg`} />
            <span>{shortenAddress(auth.state.address)}</span>
          </div>

          <FillButton small={true}>Logout</FillButton>
        </>
      }

      <div className='mnav-btns'>
        <Link to='/' className='mnav-btn'>Home</Link>
        <Link to='/explore' className='mnav-btn'>Explore</Link>
        <Link to='/leaderboard' className='mnav-btn'>Leaderboard</Link>
        <Link to='/faq' className='mnav-btn'>FAQs</Link>
        {
          auth.state.isAuthenticated ?
            <Link to='/profile' className='mnav-btn'>Profile</Link>
          : null
        }
      </div>
    </div>
  )
}

export default Navbar;