import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import MainMenu from './components/MainMenu';
import { PostType, UserType } from './types'
import { Context, useSomeContext } from './shared/Context';



const { getPosts } = require('./utils')


const Container = styled.div`
  display: flex;
  width: 100%;
`

const HR = styled.div`
width: 1px;
  height: 100%;
background-color: #dae2db1d;
`

const App = () => {
  const [posts, setPosts] = useState<PostType[]>([])

  const [modalOpened, setModalOpened] = useState<Boolean>(true)
  const [currentUser, setCurrentUser] = useState<UserType>({
    id: "0",
    username: 'Guest',
    image: '',
    password: '',
    email: "",
  }) // Default guest account

  const [activeLink, setActiveLink] = useState<string>('Home')

  const activeLinkLS = localStorage.getItem("activeLink")
  const currentUserLS = localStorage.getItem("currentUser")
  useEffect(() => {
    if (!activeLinkLS) {
      localStorage.setItem("activeLink", "Home")
      setActiveLink("Home")
    } else {
      setActiveLink(activeLinkLS)
    }
    if (!currentUserLS) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
      setCurrentUser(currentUser)
    } else {
      setCurrentUser(JSON.parse(currentUserLS))
    }
  }, [])

  useEffect(() => {
    if (modalOpened) {
      // Запретить скроллинг при открытии модального окна
      document.body.style.overflow = "hidden";
    } else {
      // Разрешить скроллинг при закрытии модального окна
      document.body.style.overflow = "auto";
    }
  
    return () => {
      // Восстановить скроллинг при размонтировании компонента
      document.body.style.overflow = "auto";
    };
  }, [modalOpened]);

  const getData = async () => {
    try {
      const data = await getPosts();
      return data
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getData().then((data) => {
      setPosts(data)
    })
  }, [])
  return (
    <Container>
      <Context.Provider value={{ currentUser, setCurrentUser, modalOpened, setModalOpened }}>
        <MainMenu activeLink={activeLink} setActiveLink={setActiveLink}></MainMenu>
        <HR></HR>
        <Routes>
          <Route path='/' element={<Home posts={posts}></Home>}></Route>
          <Route path='/Contacts' element={<Contacts></Contacts>}></Route>
        </Routes>
      </Context.Provider>
    </Container>
  );
}

export default App;
