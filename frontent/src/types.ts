export interface Comment {
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