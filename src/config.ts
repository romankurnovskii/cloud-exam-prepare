export const AUTH_TOKEN_NAME = 'CognitoIdToken';

interface ConfigOptions {
  frontend: { url: string };
  backend: { url: string };
  cognito: any;
  authentication: { provider: string };
}
declare global {
  interface Window {
    _env_: any;
  }
}

export const Config: ConfigOptions = {
  frontend: {
    url:
      process.env.REACT_APP_COGNITO_REDIRECT_URI ||
      window?._env_?.REACT_APP_COGNITO_REDIRECT_URI ||
      'http://localhost:3000',
  },
  backend: {
    url:
      process.env.REACT_APP_BE_SERVER_URL ||
      window?._env_?.REACT_APP_BE_SERVER_URL ||
      'http://localhost:8008',
  },
  cognito: {
    domain:
      process.env.REACT_APP_COGNITO_POOL_DOMAIN ||
      window?._env_?.REACT_APP_COGNITO_POOL_DOMAIN ||
      'localhost:5000',
    clientId:
      process.env.REACT_APP_COGNITO_CLIENT_ID ||
      window?._env_?.REACT_APP_COGNITO_CLIENT_ID ||
      null,
    redirectUrl:
      process.env.REACT_APP_COGNITO_REDIRECT_URI ||
      window?._env_?.REACT_APP_COGNITO_REDIRECT_URI ||
      null,
    region:
      process.env.REACT_APP_COGNITO_REGION ||
      window?._env_?.REACT_APP_COGNITO_REGION ||
      null,
    userPoolId:
      process.env.REACT_APP_COGNITO_USER_POOL_ID ||
      window?._env_?.REACT_APP_COGNITO_USER_POOL_ID ||
      'https://demoapi.server.com/v1/',
  },
  authentication: {
    provider: 'cognito',
  },
};
