import axios from 'axios'
import {PostType, Comment, UserSignInType, UserSignUpType, UserClientType} from './types'

// Get all posts from Posts Collection
// Return array of posts objects
export const getPosts = async ():Promise<PostType[]> => {
  const {data} = await axios.get('http://localhost:5000/get_posts')
  return data
}

export const signUpUser = async (user: UserSignUpType) => {
  const data = await axios.post('http://localhost:5000/auth/registration', user)
  return data
}

export const signInUser = async (user: UserSignInType) => {
  const data = await axios.post('http://localhost:5000/auth/login', user, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}

export const uploadNewImage = async (objectUrl: any) => {
  const data = await axios.post('http://localhost:5000/auth/upload_new_image', objectUrl)
  return data
}

export const addNewComment = async (comment: Comment, postID:string) => {
  const data = await axios.post('http://localhost:5000/add_new_comment', {comment,postID})
  return data
}

export const verifyCurrentUser = async (userLS:UserClientType) => {
  const data = await axios.get('http://localhost:5000/validation_current_user', {params:userLS})
  return data
}

export const addOrRemoveLike = async (userLSID:string, postID:any) => {
  const data = await axios.post('http://localhost:5000/add_or_remove_like', {userLSID,postID})
  return data
}

export const getUserFollowersIds = async (userLS:UserClientType) => {
  const data = await axios.get('http://localhost:5000/get_user_followers_ids', {params:userLS})
  return data
}

export const getUserFollowersInfo = async (ids:Array<string>) => {
  const data = await axios.get('http://localhost:5000/get_user_followers_info', {
    params:{ids:JSON.stringify(ids)}
  })
  return data
}

// It doesn't work, I left that for future changes
// export const getUsersForSearch = async () => {
//   const data = await axios.get('http://localhost:5000/get_user_for_search')
//   return data
// }