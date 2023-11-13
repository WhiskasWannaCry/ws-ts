import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getUserFriendsIds, getUserFriendsInfo } from '../utils'
import { UserClientType, friendInfo } from '../types'
import { useSomeContext } from '../shared/Context'

const Container = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
padding: 20px;
border: 1px solid #dae2db40;
margin-top: 8px;
margin-right: 8px;
`

const FriendsField = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`

const Friend = styled.div`
display: flex;
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

const FriendImageContainer = styled.div`
height: 100%;
width: 20%;
overflow: hidden;
`

const FriendImage = styled.img`
width: 100%;
`

const FriendInfo = styled.div`
display: flex;
flex-direction: column;
  width: 60%;
  height: 100%;
`
const FriendName = styled.div`

`

const FriendEmail = styled.div`

`


const Friends = () => {
  const { setCurrentUser } = useSomeContext()
  const [friends, setFriends] = useState<friendInfo[]>([])

  useEffect(() => {
    const userLS = JSON.parse(localStorage.getItem('currentUser')!)
    if (!userLS) {
      try {
        // <Default guest account>
        const guest: UserClientType = {
          username: 'Guest',
          image: "http://localhost:5000/users_images/guest.png",
          _id: '',
          email: "",
          token: "",
        }
        // </ Default guest account>
        setCurrentUser(guest)
        localStorage.setItem("currentUser", JSON.stringify(guest))
      } catch (e) {
        console.log(e)
      }
    }
    getUserFriendsIds(userLS).then((res: any) => {
      const { data } = res;
      try {
        const { success } = data;
        // If responsed data has false success key, alert "Server error"
        if (!success) {
          const { message } = data;
          alert(message)
          return
        }
        // Else get obj with user's _id and friends from "data" key
        const { userIDAndFriends } = data;
        getUserFriendsInfo(userIDAndFriends.friends).then((res: any) => {
          try {
            const { data } = res;
            const { success } = data;
            if (!success) {
              const { message } = data;
              alert(message)
              return
            }
            const { friendsInfoArr } = data;
            setFriends(friendsInfoArr)
            console.log(friendsInfoArr)
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
      <h1>Here is user's friends page!</h1>
      <FriendsField>
        {friends.length ? (
          friends.map((friend: friendInfo) => (
            <Friend>
              <FriendImageContainer>
                <FriendImage src={friend.image}></FriendImage>
              </FriendImageContainer>
              <FriendInfo>
                <FriendName>{friend.username}</FriendName>
                <FriendEmail>{friend.email}</FriendEmail>
              </FriendInfo>
            </Friend>
          ))
        ) : (<span>You haven't any friends</span>)}
      </FriendsField>
    </Container>
  )
}

export default Friends;