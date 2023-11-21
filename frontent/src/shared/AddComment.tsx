import styled from "styled-components";
import React, { useState } from "react";
import { addNewComment } from '../utils'
import { useSomeContext } from "./Context";
import { Comment } from '../types'
import { Dispatch, SetStateAction  } from 'react'


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  margin-top: 12px;
`

const Input = styled.input`
  border: 1px solid #dae2db40;
  padding: 4px;
  width: 60%;
  height: 100%;
  background-color: #161616;
  border-radius: 4px;
`

const AddNewCommentBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  border: 1px solid #dae2db40;
  background-color: #37394571;
  font-size: 10px;
`

const AddComment = (props: { postID: string, setPostComments:Dispatch<SetStateAction<Array<Comment>>>  }) => {
  const { guest, currentUser, setCurrentUser } = useSomeContext()
  const [commentText, setCommentText] = useState<string>('')

  const newComment = async () => {
    if(!commentText) {
      alert("Incorrect comment!")
      return
    }
    if (!currentUser) {
      alert("You is not a user!")
      setCurrentUser(guest)
      return
    }
    const comment: Comment = {
      id: String(Date.now()),
      authorID: currentUser._id,
      text: commentText,
    }
    addNewComment(comment, props.postID).then(res => {
      const { data } = res;
      props.setPostComments(data)
    })
    setCommentText("")
  }

  return (
    <Container>
      <Input placeholder='Добавьте комментарий'
        onChange={(e) => setCommentText((e!.target as HTMLInputElement)!.value)}
        value={commentText}>
      </Input>
      {commentText ? <AddNewCommentBtn onClick={newComment}>Добавить комментарий</AddNewCommentBtn> : null}
    </Container>
  )
}

export default AddComment;