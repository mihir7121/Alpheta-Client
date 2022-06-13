import { useEffect, useState } from "react"
import { getUserFavourites } from "../../../apis/apis"
import Loading from "../../../components/Loading";
import NFTCard from "../../../components/NFTCard";

function ProfileFavourites({userData}) {
  const [favourites, setFavourites] = useState(null);

  useEffect(() => {
    const loadItemDetails = async () => {
      const data = await getUserFavourites(userData.address)
      if (data.success) {
        setFavourites(data.favourites)
      } else {
        alert(data.message)
      }
    } 

    loadItemDetails()
  }, [userData.address])
  
  return (
    favourites ? 
      (
        favourites.length > 0 ?
          <div className="nft-card-grid">
            {
              favourites.map((item, index) => {
                return <NFTCard key={item.slug} item={item}></NFTCard>
              })
            }
          </div>
        : <div className="empty-placeholder">No favourites yet</div>
      )
    : <Loading></Loading>
  )
}

export default ProfileFavourites