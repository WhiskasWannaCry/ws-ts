import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSomeContext } from 'src/shared/Context'
import { uploadNewImage } from 'src/utils'
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
-webkit-box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.26) inset;
-moz-box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.26) inset;
box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.26) inset;
`

const UserImageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
width: 30%;
overflow: hidden;
padding: 8px;
border: 1px solid #dae2db40;
`

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

const CustomFileUploadButton = styled.label`
  cursor: pointer;
  padding: 10px;
  background-color: #ffffff29;
  color: #fff;
  border-radius: 4px;
  &:hover {
    background-color: #ffffff52;
  }
`;

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
  const userLS = JSON.parse(localStorage.getItem("currentUser")!)
  const { currentUser, setCurrentUser } = useSomeContext()
  const [selectedFile, setSelectedFile] = useState<any>("")
  const [preview, setPreview] = useState<any>("")

  const navigate = useNavigate()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        //In server it doesnt work now, need more logic!
        uploadNewImage(objectUrl)

        
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e:any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

  // if some troubles with user from userLS or other troubles with currentUser state, navigate to home page
  useEffect(() => {
    if (userLS.token === "") {
      navigate("/")
    }
  }, [])

  return (
    <Container>
      <UserInfo>
        <UserImageContainer>
          <UserImage src={currentUser.image} alt='#'></UserImage>
          <FileInput id="file-upload-button" onChange={onSelectFile}/>
          <CustomFileUploadButton htmlFor="file-upload-button">
            Загрузить файл
          </CustomFileUploadButton>
        </UserImageContainer>
        <OtherInfo>
          <UserName>{currentUser.username}</UserName>
          <UserEmail>{currentUser.email}</UserEmail>
          <UserFollowers>{currentUser.followers.length} followers</UserFollowers>
          <UserFollowing>{currentUser.following.length} following</UserFollowing>
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