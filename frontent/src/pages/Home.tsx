import styled from 'styled-components'
import React from 'react'
import { PostType } from '../types'
import Post from '../shared/Post'

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
 border: 1px solid #dae2db40;
`

const Home = (props: { posts: PostType[] }) => {
  return (
    <Container>
      <Posts>
        {props.posts.length ? props.posts.map(post => (
          <Post key={post.whoPostedID} post={post}></Post>
        )) : null}
      </Posts>
    </Container>
  )
}

export default Home;