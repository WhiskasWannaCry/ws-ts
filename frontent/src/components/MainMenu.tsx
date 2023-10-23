import styled from 'styled-components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
width: 20%;
height: 100%;
padding: 10px;
`

const Logo = styled.div`
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100px;
font-size: 24px;
font-weight: 1000;
border: 1px solid #dae2db40;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  padding: 10px;
  border: 1px solid #dae2db40;
`

const Link = styled.a`
display: flex;
justify-content: center;
align-items: center;
margin: 10px;
font-size: 20px;
text-decoration: none;
width: 100%;
height: 48px;
font-weight: 500;
border-radius: 10px;
&:hover {
  background-color: #dae2db1f;
}
`

const MainMenu = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>Some Logo</Logo>
      <Nav>
        <Link href='/'>Home</Link>
        <Link href='/Contacts'>Contacts</Link>
      </Nav>
    </Container>
  )
}

export default MainMenu;