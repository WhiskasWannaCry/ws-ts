import { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import MainMenu from './components/MainMenu';
import { PostType, UserClientType, UserType, modalOpenCommentType } from './types'
import { Context, useSomeContext } from './shared/Context';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { verifyCurrentUser } from './utils';
import Followers from './pages/Followers';
import SearchUsers from './pages/SearchUsers';
import UserProfile from './pages/UserProfile';

// !!! require after default imports only !!!
const { getPosts } = require('./utils')

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  justify-content: space-around;
`

const HR = styled.div`
width: 1px;
  height: 100%;
background-color: #dae2db1d;
@media (max-width:768px) {
  display: none;
}
`

const App = () => {
  const [posts, setPosts] = useState<PostType[]>([])

  const [modalOpened, setModalOpened] = useState<modalOpenCommentType>({
    opened: false,
    postId: '',
  })
  const [currentUser, setCurrentUser] = useState<UserClientType>({
    username: 'Guest',
    image: "http://localhost:5000/users_images/guest.png",
    _id: '',
    email: "",
    token: "",
    followers: [],
    following: [],
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
    if (modalOpened.opened) {
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

  useEffect(() => {
    const userLS = JSON.parse(localStorage.getItem('currentUser')!)
 
    verifyCurrentUser(userLS).then(res => {
       // data = { success: boolean, userID?:string }
      const {data} = res;
      const {success} = data;
      if(!success) {
        const guest = {
          username: 'Guest',
          image: "http://localhost:5000/users_images/guest.png",
          _id: '',
          email: "",
          token: "",
          followers: [],
          following: [],
        }
        const {message} = data;
        alert(message)
        setCurrentUser(guest)
        localStorage.setItem("currentUser", JSON.stringify(guest))
      }
    })
  },[])

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
          <Route path='/Search' element={<SearchUsers></SearchUsers>}></Route>

          <Route path='/Profile/:userID' element={<UserProfile></UserProfile>}></Route>
          <Route path='/Followers/:userID' element={<Followers></Followers>}></Route>
        </Routes>
      </Context.Provider>
    </Container>
  );
}

export default App;
