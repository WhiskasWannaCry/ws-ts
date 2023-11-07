import styled from 'styled-components'
import { PostType } from '../types'
import Post from '../shared/Post'
import Authorization from '../shared/Authorization'
// import { useSomeContext } from '../shared/Context'

const Container = styled.div`
display: flex;
height: 100%;
width: 80%;
`

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 width: 70%;
 padding: 8%;
 padding-top: 0px;
 border: 1px solid #dae2db1c;
 background-color: #1a1b1ea6;
`

const Home = (props: { posts: PostType[] }) => {

  return (
    <Container>
      <Posts>
        {props.posts?.length ? props.posts.map((post:PostType) => (
          <Post key={post.authorID} post={post}></Post>
        )) : null}
      </Posts>
      <Authorization></Authorization>
    </Container>
  )
}

export default Home;