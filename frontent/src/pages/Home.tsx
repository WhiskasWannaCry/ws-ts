import styled from 'styled-components'
import React from 'react'


const Container = styled.div`
display: flex;
height: 100%;
width: 80%;
`

const Posts = styled.div`
 width: 100%;
 border: 1px solid #dae2db40;
`
import {Post} from '../types'

const Home = (props:{ posts:Post }) => {
  return (
    <Container>
      <Posts>

      </Posts>
    </Container>
  )
}

export default Home;