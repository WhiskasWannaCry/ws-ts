import react from 'react'
import styled from 'styled-components'
import { PostType } from '../types'

const Container = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
  width: 100%;
  min-height: 400px;
  border: 1px solid #dae2db40;
  padding: 20px;
  border-radius: 4px;
`

const Username = styled.span`
margin-top: 8px;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  border: 1px solid #dae2db40;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 4px;
`

const Image = styled.img`
height: 100%;
`

const Text = styled.div`
width: 100%;
margin-top: 8px;
`

const Likes = styled.div`
width: 100%;
margin-top: 8px;
`

const Like = styled.div`
`

const Post = (props: { post: PostType }) => {
  const imageURL = `http://localhost:5000/${props.post.image}`
  return (
    <Container key={props.post.whoPostedID}>
      <Username><b>{props.post.whoPostedID}</b></Username>
      <ImageContainer>
        <Image src={imageURL} alt=""></Image>
      </ImageContainer>
      <Like>
        
      </Like>
      <Likes><b>{props.post.likes} отметок "Нравится"</b></Likes>
      <Username><b>{props.post.whoPostedID}:</b></Username>
      <Text>{props.post.text}</Text>
    </Container>
  )
}

export default Post;