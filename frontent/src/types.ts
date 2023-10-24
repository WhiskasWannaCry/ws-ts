export type PostType = {
  whoPostedID:string,
  text:string,
  likes:Array<string>,
  image:string,
  subscribersIds:Array<string>,
}

export type UserType = {
  username: string,
  age: number,
  image: string,
  password: string,
}