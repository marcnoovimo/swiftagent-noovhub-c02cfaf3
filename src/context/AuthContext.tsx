
// Re-export everything from the new files
import { AuthProvider } from './auth-provider';
import { useAuth } from './auth-hooks';
import { AuthContext } from './auth-context';
import { AuthContextProps } from './auth-types';

export { AuthProvider, useAuth, AuthContext };
export type { AuthContextProps };
