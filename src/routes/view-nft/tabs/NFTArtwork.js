import { useEffect, useState } from "react"
import Loading from "../../../components/Loading";

function NFTArtwork() {
  // const [favourites, setFavourites] = useState(null);

  // useEffect(() => {
  //   const loadItemDetails = async () => {
  //     const data = await getUserFavourites(userData.address)
  //     if (data.success) {
  //       setFavourites(data.favourites)
  //     } else {
  //       alert(data.message)
  //     }
  //   } 

  //   loadItemDetails()
  // }, [userData.address])
  
  return (
    <p>Each Bored Ape is unique and programmatically generated from over 170 possible traits, including expression, headwear, clothing, and more. All apes are dope, but some are rarer than others. ERC-721 Bored Ape non-fungible tokens (NFTs) contain more than 170 variables in possible traits. As a result, each of the 10,000 NFTs is unique. Varying traits include facial expressions, fur color, clothing, and accessories. Plus, some traits are rarer than others, such as laser eyes or golden fur (two sub-1% traits). Currently, the floor price for entry is 94 ETH for a regular Bored Ape with common features. However, the price for rare traits is substantially higher. For example, the solid gold fur ape with shooting laser eyes, BAYC #3749 (or “The Captain”), sold for 740 ETH ( around $3.9 million at the time). The apes are stored as ERC-721 tokens on the Ethereum blockchain and hosted on IPFS.</p>
  )
}

export default NFTArtwork;