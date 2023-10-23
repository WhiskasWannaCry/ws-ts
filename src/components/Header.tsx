import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
width: 100%;
height: 80px;
`

interface headerProps {
  backgroundColor:string,
}

const Header: React.FC<headerProps> = ({backgroundColor}) => {
  return (
    <Container style={{backgroundColor}}>

    </Container>
  )
}

export default Header;