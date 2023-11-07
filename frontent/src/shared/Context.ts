import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { UserType } from '../types';

type contextType = {
  // Context of current logined user
  currentUser: UserType;
  setCurrentUser: Dispatch<SetStateAction<UserType>>;

  // Context of modal windows
  modalOpened: Boolean;
  setModalOpened: Dispatch<SetStateAction<Boolean>>;
};

export const Context = createContext<contextType>({} as contextType);
export const useSomeContext = () => useContext(Context);