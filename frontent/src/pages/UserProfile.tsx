import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSomeContext } from 'src/shared/Context'
import { uploadNewImage } from 'src/utils'
import styled from 'styled-components'
import uploadIcon from '../images/icons/upload_new_avatar.png'
import { AxiosResponse } from 'axios'
import { UserClientType } from 'src/types'

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
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
width: 30%;
background-color: #161616;
max-width: 200px;
overflow: hidden;
padding: 8px;
border: 8px solid #161616;
`



const UserImage = styled.img`
  height: 80%;
`
const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

const CustomFileUploadButton = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 8px;
  background-color: #ffffff29;
  color: #fff;
  border-radius: 4px;
  width: 50%;
  height: 80px;
  font-size: 12px;
  &:hover {
    background-color: #ffffff52;
  }
`;

const UploadIcon = styled.img`
width: 40%;
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

const UserFollowers = styled.div`
  width: 100%;
  height: 32px;
`

const UserFollowing = styled.div`
  width: 100%;
  height: 32px;
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
  const { guest, currentUser, setCurrentUser } = useSomeContext()
  const navigate = useNavigate()
    

  const sendFile = (file: any) => {
    if (!currentUser) {
      setCurrentUser(guest)
      navigate("/")
      return
    } else {
      try {
        const data = new FormData()
        data.append('avatar',file)
        data.append('userID',currentUser._id)
        uploadNewImage(data).then((res:AxiosResponse<any>) => {
          const {data} = res;
          const success = data;
          if(success) {
            const {newImage} = data
            setCurrentUser((prev) =>({
              ...prev,
              image:newImage}))
          }
          
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
  console.log(currentUser)
  return (
    <Container>
      <UserInfo>
        <UserImageContainer>
            <UserImage src={currentUser.image} alt='#'></UserImage>
          <FileInput id="file-upload-button" onChange={(e) => {
            e.target.files instanceof FileList && sendFile(e.target.files[0])
          }} />
          <CustomFileUploadButton htmlFor="file-upload-button">
            <UploadIcon src={uploadIcon} alt='#'></UploadIcon>
          </CustomFileUploadButton>
        </UserImageContainer>
        <OtherInfo>
          <UserName>{currentUser.username}</UserName>
          <UserEmail>{currentUser.email}</UserEmail>
          <UserFollowers>{currentUser.followers?.length} followers</UserFollowers>
          <UserFollowing>{currentUser.following?.length} following</UserFollowing>
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