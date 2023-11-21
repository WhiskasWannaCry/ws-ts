import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getUserFollowersIds, getUserFollowersInfo } from '../utils'
import { UserClientType, followerInfo } from '../types'
import { useSomeContext } from '../shared/Context'

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 20px;
border: 1px solid #dae2db40;
margin-top: 8px;
margin-right: 8px;
`

const FollowersField = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`

const Follower = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 8px;
width: 100%;
height: 200px;
padding: 8px;
border-radius: 4px;
border: 1px solid #dae2db22;
-webkit-box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.2) inset;
-moz-box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.2) inset;
box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.2) inset;
`

const FollowerImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 20%;
overflow: hidden;
border: 1px solid #dae2db22;
padding: 8px;
`

const FollowerImage = styled.img`
width: 100%;
`

const FollowerInfo = styled.div`
display: flex;
flex-direction: column;
  width: 60%;
  height: 100%;
  margin-left: 8px;
`
const FollowerName = styled.div`
font-size: 16px;
`

const FollowerEmail = styled.div`
margin-top: 8px;
color: gray;
`


const Followers = () => {
  const { guest, currentUser, setCurrentUser } = useSomeContext()
  const [followers, setFollowers] = useState<followerInfo[]>([])
  console.log(currentUser)
  useEffect(() => {

    if (!currentUser) {
      try {
        setCurrentUser(guest)
      } catch (e) {
        console.log(e)
      }
    }
    getUserFollowersIds(currentUser).then((res: any) => {
      const { data } = res;
      try {
        const { success } = data;
        // If responsed data has false success key, alert "Server error"
        if (!success) {
          const { message } = data;
          alert(message)
          return
        }
        // Else get obj with user's _id and followers from "data" key
        const { userIDAndFollowers } = data;
        getUserFollowersInfo(userIDAndFollowers.followers).then((res: any) => {
          try {
            const { data } = res;
            const { success } = data;
            if (!success) {
              const { message } = data;
              alert(message)
              return
            }
            const { followersInfoArr } = data;
            setFollowers(followersInfoArr)
            console.log(followersInfoArr)
          } catch (e) {
            console.log(e)
          }
        })
      } catch (e) {
        console.log(e)
      }
    })
  }, [])

  return (
    <Container>
      <h1>Here is user's Followers page!</h1>
      <FollowersField>
        {followers.length ? (
          followers.map((follower: followerInfo) => (
            <Follower>
              <FollowerImageContainer>
                <FollowerImage src={follower.image}></FollowerImage>
              </FollowerImageContainer>
              <FollowerInfo>
                <FollowerName>{follower.username}</FollowerName>
                <FollowerEmail>{follower.email}</FollowerEmail>
              </FollowerInfo>
            </Follower>
          ))
        ) : (<span>You haven't any followers</span>)}
      </FollowersField>
    </Container>
  )
}

export default Followers;