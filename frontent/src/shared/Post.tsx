import react, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Comment, PostType } from '../types'
import { useSomeContext } from "../shared/Context"
import AddComment from './AddComment'
import OpenedPost from '../ModalWindows/OpenedPost'

// Images
import likedIcon from '../images/icons/liked.png'
import NotLikedIcon from '../images/icons/not_liked.png'
import commentIcon from '../images/icons/comment.png'
import { addOrRemoveLike } from '../utils'

const Container = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
  width: 100%;
  min-height: 400px;
  border: 1px solid #dae2db22;
  padding: 20px;
  border-radius: 4px;
  -webkit-box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.2) inset;
-moz-box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.2) inset;
box-shadow: 4px 0px 32px 17px rgba(0, 0, 0, 0.2) inset;
`

const Username = styled.span`
margin-top: 8px;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(35vw - 5vw); 
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

const Actions = styled.div`
display: flex;
align-items: center;
padding: 4px;
width: 100%;
height: 32px;
gap: 8px;
`

const Like = styled.img`
cursor: pointer;
height: 100%;
`

const CommentImg = styled.img`
cursor: pointer;
height: 100%;
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
  const [likesCounter, setLikesCounter] = useState<number>(post.likes)

  const likePost = () => {
    const userLS = JSON.parse(localStorage.getItem('currentUser')!)
    const {_id} = post;
    addOrRemoveLike(userLS._id,_id).then(res => {
      const {data} = res;
      const {success} = data
      if(success) {
        const {post} = data
        setLikesCounter(post.likes.length)
      }
    })
  }

  useEffect(() => {
    setPostComments(post.comments)
    setLikesCounter(post.likes)
  }, [])

  return (
    <Container key={post.authorID}>
      <Username><b>{post.authorID}</b></Username>
      <ImageContainer>
        <Image src={imageURL} alt=""></Image>
      </ImageContainer>
      <Actions>
        <Like src={NotLikedIcon} alt='like' onClick={likePost}></Like>
        <CommentImg src={commentIcon} alt='comment' onClick={() => {
          setModalOpened({
            opened: true,
            postId: post._id,
          })
        }}></CommentImg>
      </Actions>
      <Likes><b>{likesCounter} отметок "Нравится"</b></Likes>
      <Username><b>{post.authorID}:</b></Username>
      <Text>{post.text}</Text>
      <Comments onClick={() => setModalOpened(prev => ({
        ...prev,
        opened: true,
        postId: post._id,
      }))}>Посмотреть все комментарии ({postComments.length})</Comments>
      {currentUser._id ? <AddComment postID={post._id} setPostComments={setPostComments}></AddComment> : null}
      {modalOpened.opened && modalOpened.postId === post._id ? <OpenedPost post={post} postComments={postComments}></OpenedPost> : null}
    </Container>
  )
}

export default Post;