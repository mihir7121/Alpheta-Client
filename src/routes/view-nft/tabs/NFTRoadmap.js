import BAYCRoadmap from '../../../assets/BAYCRoadmap2.0.png';
import { useEffect, useState } from "react"
import Loading from "../../../components/Loading";

function NFTRoadmap() {
    return (
        <div>
            <h1>Roadmap 1.0</h1>
            <p>10% - We pay back our moms.</p>
            <p>20% - We release the Caged Apes. 5 Caged Apes (tokens held back from the sale) are airdropped to random Apeholders.</p>
            <p>40% - BAYC gets its own YouTube channel, BAYC LoFi Radio - Beats to Ape into Shitcoins To.</p>
            <p>60% - Member-Exclusive BAYC Merch Store gets unlocked, featuring Limited Edition tees, hoodies, and other goodies.</p>
            <p>80% - The clubhouse image becomes interactive and the Mysterious Note becomes legible, beginning a treasure hunt. The first to solve the mystery will be rewarded 5 ETH and a Bored Ape.</p>
            <p>90% - The Bored Ape liquidity pool is initiated.</p>
            <p>100% - The Mutant Ape (NFT Breeding) Arcade Machine gets ﬁxed. And we cook up new ways to ape with our friends.</p>
            <h1>Roadmap 2.0</h1>
            <img src={BAYCRoadmap}/>
        </div>
    )
}

export default NFTRoadmap;