export type Comment = {
    id: string,
    authorID: string,
    text: string,
}

export type PostType = {
  _id: string,
  authorID:string,
  text:string,
  likes:number,
  image:string,
  subscribersIds:Array<string>,
  comments: Array<Comment>,
}

export type UserType = {
  _id: string,
  email: string,
  username: string,
  image: string,
  password: string,
}

export type modalOpenCommentType = {
  opened: Boolean,
  postId: string,
}

export interface UserClientType {
  _id:string,
  email: string,
  token: string,
  username: string,
  image: string,
}
export interface UserSignInType {
  email: string,
  password: string,
}

// Now not working
// export interface UserSignInResponseType {
//   success: Boolean,
//   message: string,
//   user?: UserClientType,
// }

export interface UserSignUpType {
  email: string,
  username: string,
  image: string,
  password: string,
}