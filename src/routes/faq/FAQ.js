import { useState } from 'react';
import CallToAction from '../../components/CallToAction.js';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './FAQ.css'

function FAQ() {
  const faqs = [
    {
      title: 'What is Alpheta?',
      content: `Alpheta is the world's first NFT rating platform that showcases people's and experts' opinion on NFT Projects. Basically, it is like the IMDb rating, but for NFTs. The NFT world is booming, new projects are coming up everyday. However, there are very less sources to do proper research about individual projects, which leads to people losing their money in rugs or hype. With Alpheta, we aim to bring you a platform where you can do proper research about any NFT Project, get market validation and opinion through the Alpha Score, and find profitable NFTs within minutes. `,
    },
    {
      title: 'How to get started as an Alpheta User and Voter?',
      content: 'To start with, you need to connect your wallet. Currently we have MetaMask and WalletConnect as options currently and are working on bringing more options to you. \nTo connect with MetaMask, you need to have the chrome extension or the app.\nConnecting your wallet automatically makes you an Alpheta User, and all you have to do now is go through the projects listed and start rating them and writing reviews for them. This helps you showcase your opinion on NFT Projects. Giving quality votes can help you become a Top Voter, called the Alphas, which will give you access to certain rewards.',
    }, 
    {
      title: 'Why do I need a wallet to rate NFTs?',
      content: 'This is done to avoid spams and manipulation of the score with fake bots. We want our Alpha Score to be highly credible and accurate.',
    },
    {
      title: 'What are the factors you should consider before rating a project?',
      content: 'Before rating a project, consider the following factors -\n\n1) Artwork and the Artist \n\n2) Utility and Roadmap - what does the future look like for this project?\n\n3) Team - is it verified?\n\n4) Community - size and engagement\n\n5) Floor Price Changes\n\n6) Trade Volume\n\n7) Market Cap\n\n8) Credibility - who are the people backing this project?'
    }, 
    {
      title: 'How can I use Alpheta to find profitable NFT Projects?',
      content: 'Like we said, Alpheta helps you find profitable NFT Projects. The Alpha Score will determine the value of a project in the eyes of people. You can read reviews as well. Along with that, we provide basic data so you can form your own opinions. We are currently working on adding many other metrics and data that will help you find everything you need to do your research, right here!',
    }, 
    {
      title: 'How does the Alpha Score work?',
      content: `The Alpha Score works solely on people's opinion. We as a platform do not rate any NFTs, it is for the voice of the people. We are partnering with many NFT experts to become Alpheta Users, so it brings more credibility to the score. The final score is calculated by the average of total votes. `,
    }, 
    {
      title: 'Who are the Alphas, how to be one, and what do they get?',
      content: `The Alphas are the top voters of Alpheta. Currently, it is top 10, which will keep increasing as we increase our user base. Top Voters are not decided by the number of votes, but by the quality of the voter. Some factors that decide the quality of a voter is the accuracy of votes, frequency of votes, no spams, and credibility of the voter in the form of following.\n\nThe top voters or the Alphas, will be getting multiple rewards like - \n\n-> earn ETH monthly and make passive income\n\n-> verified profile on leaderboards section\n\n-> special whitelist spots for our NFT launches\n\n-> access to a private community channel\n\n-> access to special private giveaways by our partner NFT projects\n\nTo claim these rewards, the Alphas will be added to a private channel on our discord server every month.`,
    }, 
    {
      title: 'How does the Vote to Earn mechanism work?',
      content: 'Vote to Earn works only for the Alphas. You need to be a Top Voter to earn. Top Voters or the Alphas will be given several incentives, the main one being monthly ETH giveaway to help make passive income. ',
    }, 
    {
      title: 'What all features are available on Alpheta?',
      content: `Currently we provide these features -\n\n-> Alpha Score - our main feature, which let's you vote and give reviews to NFT Projects, and let's you find the public opinion about any project.\n\n-> Data - Currently, we provide the basic data about projects like the Floor Price, Sales Volume, Market Cap, etc.\n\n-> Leaderboards - This page showcases the Top Projects and Top Voters.\n\n-> Profiles - Every user has a profile. You can follow other users, track their activity, see their favourite collections, and see their personal NFT collections and creations.\n\nThis is just the Beta Version of our product, and we are currently working on many other features that will help you find everything you need, right here. Join our Discord Community to stay updated.`,
    },
    {
      title: 'How can I get my NFT listed on Alpheta?',
      content: 'Currently, we are in our Beta Phase. We are listing NFT Project on our own, according to community opinion. However, if you wish to list your NFT Project on our platform, mail us at alpheta.nft@gmail.com.\n\nAttach the following information in the mail -\n\n-> Name of the Project\n\n-> Marketplace Link\n\n-> Website Link\n\n-> Socials of the Project\n\n-> Name of the Founders\n\n-> Contact Details of Founders\n\n-> Socials of Founders',
    }, 
    {
      title: 'How can I stay updated with new features, announcements, rewards, and giveaways?',
      content: 'To stay updated, join our Discord Server. We are building a community, and providing utilities like NFTs of the Week, Upcoming Launches, and HOTs. All information about rewards will be on our Discord as well.',
    }
    
  ]

  return (
    <div>
      <Navbar></Navbar>
      <div className='page-faq container'>
        <h1>Frequently Asked Questions</h1>

        {
          faqs.map((faq, index) => {
            return <FAQCard key={index} faq={faq}></FAQCard>
          })
        }
      </div>

      <Footer></Footer>
      <CallToAction></CallToAction>
    </div>
  )
}

function FAQCard({faq}) {
  const [expanded, setExpanded] = useState(false)

  const toggleFAQ = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={'faq-card' + (expanded ? ' faq-expanded' : '')}>
      <div className='faq-header' onClick={toggleFAQ}>
        <span className='faq-title'>{faq.title}</span>
        <div>
          <i className='fas fa-chevron-down'></i>
        </div>
      </div>
      <div style={{whiteSpace: "pre-line"}} className='faq-content'>{faq.content}</div>
    </div>
  )
}

export default FAQ;