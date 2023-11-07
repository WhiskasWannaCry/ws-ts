import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { UserType, modalOpenCommentType } from '../types';

type contextType = {
  // Context of current logined user
  currentUser: UserType;
  setCurrentUser: Dispatch<SetStateAction<UserType>>;

  // Context of modal windows
  modalOpened: modalOpenCommentType;
  setModalOpened: Dispatch<SetStateAction<modalOpenCommentType>>;
};

export const Context = createContext<contextType>({} as contextType);
export const useSomeContext = () => useContext(Context);