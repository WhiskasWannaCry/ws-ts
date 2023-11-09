import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { UserClientType, modalOpenCommentType } from '../types';

type contextType = {
  // Context of current logined user
  currentUser: UserClientType;
  setCurrentUser: Dispatch<SetStateAction<UserClientType>>;

  // Context of modal windows
  modalOpened: modalOpenCommentType;
  setModalOpened: Dispatch<SetStateAction<modalOpenCommentType>>;
};

export const Context = createContext<contextType>({} as contextType);
export const useSomeContext = () => useContext(Context);