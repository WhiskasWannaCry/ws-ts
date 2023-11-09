import styled from 'styled-components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
width: 20%;
top:0;
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

const Link = styled.a<{ $linkname: string,$activelink:string }>`
display: flex;
justify-content: center;
align-items: center;
margin: 10px;
font-size: 16px;
text-decoration: none;
width: 100%;
height: 48px;
font-weight: 500;
border-radius: 10px;
${({$linkname,$activelink}) => $linkname === $activelink ? (
  "background-color:#dae2db16;"
  ):null}
&:hover {
  background-color: #dae2db1f;
}
`

const MainMenu = (props:{activeLink:string, setActiveLink:React.Dispatch<React.SetStateAction<string>>}) => {
  const navigate = useNavigate()

  const handleClick = (linkName:string):void => {
    props.setActiveLink(linkName)
    localStorage.setItem('activeLink',linkName)
  }

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>Some Logo</Logo>
      <Nav>
        <Link $linkname="Home" $activelink={props.activeLink} onClick={() => handleClick("Home")} href='/'>Home</Link>
        <Link $linkname="Contacts" $activelink={props.activeLink} onClick={() => handleClick('Contacts')} href='/Contacts'>Contacts</Link>
      </Nav>
    </Container>
  )
}

export default MainMenu;