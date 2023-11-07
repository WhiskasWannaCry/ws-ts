import react, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Comment, PostType } from '../types'
import { useSomeContext } from "../shared/Context"
import AddComment from './AddComment'
import CommentsList from '../ModalWindows/CommetsList'

const Container = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
  width: 100%;
  min-height: 400px;
  border: 1px solid #dae2db22;
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

const Comments = styled.span`
cursor: pointer;
color: gray;
font-size: 12px;
margin-top: 12px;
`

const Post = (props: { post: PostType }) => {
  const { post } = props;
  const imageURL = `http://localhost:5000/${post.image}`
  const { currentUser, setCurrentUser } = useSomeContext();
  const { modalOpened, setModalOpened } = useSomeContext();
  const [postComments, setPostComments] = useState<Array<Comment>>([])

  useEffect(() => {
    setPostComments(post.comments)
  },[])

  return (
    <Container key={post.authorID}>
      <Username><b>{post.authorID}</b></Username>
      <ImageContainer>
        <Image src={imageURL} alt=""></Image>
      </ImageContainer>
      <Like>

      </Like>
      <Likes><b>{post.likes} отметок "Нравится"</b></Likes>
      <Username><b>{post.authorID}:</b></Username>
      <Text>{post.text}</Text>
      <Comments onClick={() => setModalOpened(prev => ({
        ...prev,
        opened:true,
        postId:post._id,
      }))}>Посмотреть все комментарии ({postComments.length})</Comments>
      {currentUser._id !== '0' ? <AddComment postID={post._id} setPostComments={setPostComments}></AddComment> : null}
      {modalOpened.opened && modalOpened.postId === post._id ? <CommentsList post={post} postComments={postComments}></CommentsList> : null}
    </Container>
  )
}

export default Post;