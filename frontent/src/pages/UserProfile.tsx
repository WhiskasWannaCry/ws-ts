import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSomeContext } from 'src/shared/Context'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
width: 80%;
padding: 20px;
border: 1px solid #dae2db40;
margin-top: 8px;
margin-right: 8px;
`

const UserInfo = styled.div`
display: flex;
width: 100%;
height: 300px;
border: 1px solid #dae2db40;
padding: 16px;
`

const UserImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 30%;
overflow: hidden;
padding: 8px;
border: 1px solid #dae2db40;
`

const UserImage = styled.img`
  width: 100%;
`

const OtherInfo = styled.div`
display: flex;
margin-left: 8px;
flex-direction: column;
`

const UserName = styled.div`
  width: 100%;
  overflow: hidden;
  height: 32px;
  font-size: 16px;
`

const UserEmail = styled.div`
width: 100%;
  overflow: hidden;
  height: 32px;
  color: gray;
`


const CustomHR = styled.span`
width: 80%;
border: 1px solid #dae2db40;
margin-top: 24px;
`

const NavLinks = styled.nav`
display: flex;
justify-content: center;
align-items: center;
  width: 40%;
  border-left: 1px solid #dae2db40;
  border-bottom: 1px solid #dae2db40;
  border-right: 1px solid #dae2db40;
  height: 40px;
`

const NavLink = styled.div`
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
  width: 30%;
  height: 100%;
  font-size: 16px;
  &:hover {
    background-color: #ffffff21;
  }
`

const ProfilePosts = styled.div`
display: flex;
justify-content: center;
width: 100%;
flex-wrap: wrap;
gap: 8px;
margin-top: 16px;
`

const ProfilePost = styled.div`
display: flex;
background-color: #ffffff21;
width: 20vw;
height: calc(25vw - 5vw);
max-height: 400px;
max-width: 400px;
`


const UserProfile = () => {
  const userLS = JSON.parse(localStorage.getItem("currentUser")!)
  const { currentUser, setCurrentUser } = useSomeContext()
  const navigate = useNavigate()

  // if some troubles with user from userLS or other troubles with currentUser state, navigate to home page
  useEffect(() => {
    if (currentUser.token === "") {
      navigate("/")
    }
  }, [])

  return (
    <Container>
      <UserInfo>
        <UserImageContainer>
          <UserImage src={currentUser.image} alt='#'></UserImage>
        </UserImageContainer>
        <OtherInfo>
          <UserName>{currentUser.username}</UserName>
          <UserEmail>{currentUser.email}</UserEmail>
        </OtherInfo>
      </UserInfo>
      <CustomHR></CustomHR>
      <NavLinks>
        <NavLink>Posts</NavLink>
      </NavLinks>
      <ProfilePosts>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
        <ProfilePost></ProfilePost>
      </ProfilePosts>
    </Container>
  )
}

export default UserProfile;