import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserActivities } from "../../../apis/apis";
import Loading from "../../../components/Loading";

function ProfileActivity({userData}) {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const loadItemDetails = async () => {
      const data = await getUserActivities(userData.address)
      if (data.success) {
        setActivities(data.activities)
      } else {
        alert(data.message)
      }
    } 

    loadItemDetails()
  }, [userData.address])
  
  return (
    activities ? 
      (
        activities.length > 0 ?
          <div className="activity-list">
            {
              activities.map((item, index) => {
                return <ActivityCard item={item} key={item._id} />
              })
            }
          </div>
        : <div className="empty-placeholder">No recent activites</div>
      )
    : <Loading></Loading>
  )
}

function ActivityCard({item}) {
  const getMessage = () => {
    if (item.activity_type === 'review') {
      return (
        <span>
          Wrote a review for 
          <Link to={'/view/' + item.target_project_slug}>
            {item.target_project_name || item.target_project_slug}
          </Link>
        </span>
      )
    }

    if (item.activity_type === 'favourite') {
      return (
        <span>
          Favourited 
          <Link to={'/view/' + item.target_project_slug}>
            {item.target_project_name || item.target_project_slug}
          </Link>
        </span>
      )
    }

    if (item.activity_type === 'follow') {
      return (
        <span>
          Followed 
          <Link to={'/profile/' + item.target_user_address}>
            {item.target_user_name || item.target_user_address}
          </Link>
        </span>
      )
    }

    return 'Unknown'
  }

  const imageURL = item.imageURL 
    || `https://avatars.dicebear.com/api/identicon/${item.target_user_address}.svg`

  return (
    <div className="activity-card">
      <img src={imageURL}/>

      <div>
        {getMessage()}
      </div>
    </div>
  )
}

export default ProfileActivity