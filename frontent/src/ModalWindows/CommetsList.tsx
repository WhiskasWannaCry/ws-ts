import styled from 'styled-components'
import { useSomeContext } from '../shared/Context'
import { PostType } from '../types'

const Container = styled.div`
position: fixed;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: #00000081;
`

const CloseModal = styled.div`
display: flex;
justify-content: flex-end;
width: 100%;
padding: 16px;
background-color: #00000000;
`

const Close = styled.span`
cursor: pointer;
width: 10px;
background-color: #00000000;
font-size: 24px;
`

const PostContainer = styled.div`
display: flex;
 border: 1px solid #dae2db1c;
 background-color: #00000000;
 width: 80%;
 height: calc(55vw - 5vw); 
 max-height: 80vh;
`

const ImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
width: 50%;
height: 100%;
border: 1px solid #dae2db2f;
`

const Image = styled.img`
height: 100%;
`

const InfoContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 50%;
`

const PostAuthor = styled.div`
width: 100%;
height: 10%;
border-bottom: 1px solid #dae2db2f;
font-weight: 800;
padding: 16px;
`

const Comments = styled.div`
display: flex;
flex-direction: column;
overflow: auto;
width: 100%;
height: 100%;
padding: 16px;
`

const Comment = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 80px;
max-height: 120px;
padding: 8px;
border: 1px solid #dae2db2f;
margin-top: 4px;
`

const CommentAuthor = styled.span`
display: flex;
width: 100%;
`

const Text = styled.span`
display: flex;
width: 100%;
`

const CommentsList = (props: { post: PostType }) => {
  const { setModalOpened } = useSomeContext()
  const { post } = props;
  const imageURL = `http://localhost:5000/${post.image}`
  console.log(post)
  return (
    <Container>
      <CloseModal>
        <Close onClick={() => setModalOpened(prev => ({
          ...prev,
          opened: false,
        }))}><b>x</b></Close>
      </CloseModal>
      <PostContainer>
        <ImageContainer>
          <Image src={imageURL} alt=""></Image>
        </ImageContainer>
        <InfoContainer>
          <PostAuthor>{post.authorID}</PostAuthor>
          <Comments>
            {post.comments.length ? (
              post.comments.map(comment => (
                <Comment>
                  <CommentAuthor><b>{comment.authorID}</b></CommentAuthor>
                  <Text>{comment.text}</Text>
                </Comment>
              ))
            ) : (null)}
          </Comments>
        </InfoContainer>
      </PostContainer>
    </Container>
  )
}

export default CommentsList;