import '../ViewNFT.css'
import { useEffect, useState } from "react"
import Loading from "../../../components/Loading";

function NFTTeam() {
    return (
        <div>
            <ul>
                <li>Gordon Goner (Greg Solano) - Writer and Book Critic, Co-Founder of Yuga Labs <a style={{ '--color-accent': '#1c99e6' }} href={'https://twitter.com/GordonGoner'}><i className='fab fa-twitter'></i></a></li>
                <li>Gargamel (Wylie Aronow) - Former Student, Co-Founder of Yuga Labs <a style={{ '--color-accent': '#1c99e6' }} href={'https://twitter.com/CryptoGarga'}><i className='fab fa-twitter'></i></a></li>
                <li>Emperor Tomato Ketchup (Kerem) - Software Engineer, Co-Founder of Yuga Labs <a style={{ '--color-accent': '#1c99e6' }} href={'https://twitter.com/TomatoBAYC'}><i className='fab fa-twitter'></i></a></li>
                <li>No Sass (Zeshan) - Software Engineer, Co-Founder of Yuga Labs <a style={{ '--color-accent': '#1c99e6' }} href={'https://twitter.com/SassBAYC'}><i className='fab fa-twitter'></i></a></li>
                {/* <a
                className='nft-action'
                style={{ '--color-accent': '#1c99e6' }}
                href={'https://twitter.com/GordonGoner'}>
                <i className='fab fa-twitter'></i>
            </a> */}
            </ul>
            <p>This story starts with a few friends who wanted to make something all their own. The BAYC NFT collection was technically created by Yuga Labs. That’s the parent company of BAYC. The goal of Yuga Labs is, in effect, to build a media empire entirely centered around NFTs. Making the BAYC NFTs was the first step toward fulfilling this ambition. Prior to BAYC, Gargamel and Gordon Goner had been involved in crypto to a minor degree. Neither had experience innovating in the space, but they had been trading since 2017. Tomato and Sass were both a bit newer to NFTs and crypto. The four came together and created the company Yuga Labs, and then they launched BAYC through Yuga Labs. The lead artist behind BAYC’s original collection is a woman who goes by “Seneca” or “All Seeing Seneca.” Other artists included Thomas Dagley, Migwashere, and a couple who chose to remain anonymous. Today, Seneca has dropped her own NFTs, and she is working to gain recognition for her work and contributions to Bored Apes.</p>
        </div>
    )
}

export default NFTTeam;