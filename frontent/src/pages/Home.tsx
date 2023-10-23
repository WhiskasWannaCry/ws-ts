import styled from 'styled-components'
import React from 'react'


const Container = styled.div`
display: flex;
height: 100%;
width: 80%;
`

const Home = () => {
  return (
    <Container>
      It's Home page!
    </Container>
  )
}

export default Home;