import { useState, useEffect, createContext, useContext } from 'react';
import { CognitoAuthObserver, UserDataType } from 'cognito-token-observer';
import jsCookie from 'js-cookie';
import { Config } from '../config';

const { frontend, cognito } = Config;

const LOGIN_COGNITO_URL = `${cognito.domain}/login?client_id=${cognito.clientId}&response_type=code&scope=email+openid+profile&redirect_uri=${frontend.url}`;

const LOGOUT_COGNITO_URL = `${cognito.domain}/logout?client_id=${cognito.clientId}&logout_uri=${frontend.url}&redirect_uri=${frontend.url}`;

type LocalUserDataType = UserDataType & {
  permisssions?: {
    canAddQuestion: boolean;
  };
};

type UpdateUserDataPayload = {
  name: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  userData: LocalUserDataType;
  updateUserData: (payload: UpdateUserDataPayload) => void;
  saveAuthData: (urlHash: string) => Promise<boolean>;
  login: () => void;
  logout: () => void;
};

const initUserData: LocalUserDataType = {
  name: '',
  email: '',
  permisssions: {
    canAddQuestion: false,
  },
  exp: 0,
};

const initContextData: AuthContextType = {
  isAuthenticated: false,
  userData: initUserData,
  updateUserData: () => {},
  saveAuthData: async () => true,
  login: () => {},
  logout: () => {},
};

const cognitoAuthorizer = CognitoAuthObserver({
  clientId: process.env.REACT_APP_COGNITO_CLIENT_ID || '',
  poolDomain: process.env.REACT_APP_COGNITO_POOL_DOMAIN || '',
  redirectUrl: process.env.REACT_APP_COGNITO_REDIRECT_URI || '',
  region: process.env.REACT_APP_COGNITO_REGION || '',
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || '',
});

const AuthContext = createContext<AuthContextType>(initContextData);

function AuthProvider(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMetadata, setUserMetadata] =
    useState<LocalUserDataType>(initUserData);

  const onTokenUpdate = (isValid: boolean) => {
    const userData = cognitoAuthorizer.getUserData();
    if (JSON.stringify(userMetadata) !== JSON.stringify(userData)) {
      setUserMetadata({
        ...userMetadata,
        ...userData,
      });
    }

    setIsAuthenticated(isValid);
  };

  // cognitoAuthorizer.init()
  cognitoAuthorizer.onTokenUpdate(onTokenUpdate, 'key01');

  useEffect(() => {
    cognitoAuthorizer.init().then((res) => {
      if (res) {
        const idToken = localStorage.getItem('CognitoIdToken') as string;
        if (idToken) {
          jsCookie.set('id_token', idToken);
        }
        const userDataResponse =
          cognitoAuthorizer.getUserData() as LocalUserDataType;
        setUserMetadata({
          ...userMetadata,
          ...userDataResponse,
        });
      }
      setIsAuthenticated(isActive);
    });
    const isActive = cognitoAuthorizer.isActive();
  }, []);

  const login = () => {
    window.location.href = LOGIN_COGNITO_URL;
  };

  const register = () => {};

  const logout = () => {
    cognitoAuthorizer.clearTokens();
    window.location.href = LOGOUT_COGNITO_URL;
  };

  const updateUserData = (payload: UpdateUserDataPayload) => {
    setUserMetadata({
      ...userMetadata,
      ...payload,
    });
  };

  const saveAuthData = async (): Promise<boolean> => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const code = params['code'];
    let res;
    if (!isAuthenticated && code) {
      res = await cognitoAuthorizer
        .fetchCognitoTokens(code)
        .then((res) => {
          setUserMetadata(cognitoAuthorizer.getUserData() as LocalUserDataType);
          setIsAuthenticated(true);
        })
        .catch((e) => {
          console.error(e);
          return false;
        });
    }

    return res || false;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData: userMetadata,
        login,
        logout,
        register,
        updateUserData,
        saveAuthData,
      }}
      {...props}
    />
  );
}

const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };
