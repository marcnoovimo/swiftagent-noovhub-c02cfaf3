
import React from 'react';
import { AuthContext } from './auth-context';
import { AuthContextProps } from './auth-types';
import { useAuthImplementation } from './auth-hooks-impl';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authState = useAuthImplementation();
  
  const contextValue: AuthContextProps = {
    session: authState.session,
    user: authState.user,
    signIn: authState.signIn,
    signOut: authState.signOut,
    resetPassword: authState.resetPassword,
    loading: authState.loading,
    demoMode: authState.demoMode,
    isAdmin: authState.isAdmin
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
