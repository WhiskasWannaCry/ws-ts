import styled from 'styled-components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Import icons
import homeIcon from '../images/icons/home.png'
import searchIcon from '../images/icons/search.png'
import contactUsIcon from '../images/icons/contact_us.png'
import logoIcon from '../images/icons/logo.png'

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
max-height: 800px;
width: 20%;
top:0;
padding: 10px;
border: 1px solid #dae2db40;
margin: 8px;
transition: all 0.5s;
@media (max-width:1280px) {
  width: 10%;
}
@media (max-width:768px) {
  position: absolute;
  top: 20px;
  left: 0;
  height: 400px;
  background-color: #161616;
}
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
@media (max-width:1280px) {
  display: none;
}
`

const LogoIconContainer = styled.div`
cursor: pointer;
width: 100%;
padding: 8px;
`

const LogoIcon = styled.img`
display: none;
width: 100%;
@media (max-width:1280px) {
  display: block;
}
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

const LinkContainer = styled.div<{ $linkname: string, $activelink: string }>`
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 48px;
margin: 10px;
border-radius: 10px;
padding: 8px;
${({ $linkname, $activelink }) => $linkname === $activelink ? (
    "background-color:#dae2db16;"
  ) : null}
&:hover {
  background-color: #dae2db1f;
}`

const LinkIcon = styled.img`
height: 100%;
`

const Link = styled.span`
display: flex;
justify-content: center;
align-items: center;
font-size: 16px;
width: 80%;
height: 48px;
font-weight: 500;
@media (max-width:1280px) {
  display: none;
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
      <LogoIconContainer onClick={() => navigate('/')}>
        <LogoIcon src={logoIcon} alt='#'></LogoIcon>
      </LogoIconContainer>
      <HR1></HR1>
      <Nav>
        <LinkContainer $linkname="Home" $activelink={props.activeLink} onClick={() => {
          setActiveButton("Home")
          navigate('/')
        }}>
          <LinkIcon src={homeIcon} alt='#'></LinkIcon>
          <Link>Home</Link>
        </LinkContainer>
        <LinkContainer $linkname="Contacts" $activelink={props.activeLink} onClick={() => {
          setActiveButton("Contacts")
          navigate('/Contacts')
        }}>
          <LinkIcon src={contactUsIcon} alt='#'></LinkIcon>
          <Link>Contacts</Link>
        </LinkContainer>
        <LinkContainer $linkname="Search" $activelink={props.activeLink} onClick={() => {
          setActiveButton("Search")
          navigate('/Search')
        }}>
          <LinkIcon src={searchIcon} alt='#'></LinkIcon>
          <Link>Search</Link>
        </LinkContainer>
      </Nav>
    </Container>
  )
}

export default MainMenu;