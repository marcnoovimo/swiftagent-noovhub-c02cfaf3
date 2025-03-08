
import { createContext } from 'react';
import { AuthContextProps } from './auth-types';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
