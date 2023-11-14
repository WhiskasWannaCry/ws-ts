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
border: 1px solid #dae2db40;
margin: 8px;
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
`

const HR1 = styled.span`
  width: 100%;
  margin-top: 16px;
  height: 1px;
  background-color: #dae2db40;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  padding: 10px;
  margin-top: 16px;
`

const Link = styled.a<{ $linkname: string, $activelink: string }>`
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
${({ $linkname, $activelink }) => $linkname === $activelink ? (
    "background-color:#dae2db16;"
  ) : null}
&:hover {
  background-color: #dae2db1f;
}
`

const MainMenu = (props: { activeLink: string, setActiveLink: React.Dispatch<React.SetStateAction<string>> }) => {
  const navigate = useNavigate()

  const setActiveButton = (linkName: string): void => {
    props.setActiveLink(linkName)
    localStorage.setItem('activeLink', linkName)
  }

  return (
    <Container>
      <Logo onClick={() => navigate('/')}>Some Logo</Logo>
      <HR1></HR1>
      <Nav>
        <Link $linkname="Home" $activelink={props.activeLink} onClick={() => setActiveButton("Home")} href='/'>Home</Link>
        <Link $linkname="Contacts" $activelink={props.activeLink} onClick={() => setActiveButton('Contacts')} href='/Contacts'>Contacts</Link>
        <Link $linkname="Search" $activelink={props.activeLink} onClick={() => setActiveButton("Search")} href='/Search'>Search</Link>
      </Nav>
    </Container>
  )
}

export default MainMenu;