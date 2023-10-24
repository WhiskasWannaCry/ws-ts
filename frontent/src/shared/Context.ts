import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { UserType } from '../types';

type contextType = {
  currentUser: UserType;
  setCurrentUser: Dispatch<SetStateAction<UserType>>;
};

export const Context = createContext<contextType>({} as contextType);
export const useSomeContext = () => useContext(Context);