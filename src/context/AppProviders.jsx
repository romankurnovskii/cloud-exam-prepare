import * as React from 'react';
import { AuthProvider } from './AuthProvider';

function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProviders;
