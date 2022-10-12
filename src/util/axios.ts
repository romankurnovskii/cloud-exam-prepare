import axios, { Method } from 'axios';
import { AUTH_TOKEN_NAME, Config } from '../config';
import { AnswerPayloadRequestType, NewCommentPayloadType, NewQuestionPayloadType, OnSendAnswerResponseType, QuestionType, RandomQuestionResponseType } from '../types';

const { backend } = Config;

enum SERVER_ENDPOINTS {
  GET_PROGRESS_DATA = '/aws/getProgressData',
  GET_QUESTION = '/aws/getQuestion',
  GET_RANDOM_QUESTION = '/aws/getRandomQuestion',
  GET_USER_INFO = '/aws/getUserInfo',
  ADD_ANSWER = '/aws/addAnswer',
  ADD_NEW_COMMENT = '/aws/addComment',
  ADD_NEW_QUESTION = '/aws/addNewQuestion',
}

const getAccessToken = () => {
  return localStorage.getItem(AUTH_TOKEN_NAME);
};

export const getAxiosUrlAndHeaders = (
  urlPath: string,
  accessToken = null
): [string, any] => {
  const url = backend.url + urlPath;
  const token = getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return [url, headers];
};

export const ApiBeResolver = async (
  method: Method,
  urlPath: string,
  data?: any
): Promise<any> => {
  const [url, headers] = getAxiosUrlAndHeaders(urlPath);
  const options = {
    url,
    method,
    headers,
    data,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('FETCH ERROR:', url, error);
    // error.response.data.message
    return Promise.reject(error);
  }
};

export const getQuestion = async (questionId: string) => {
  return ApiBeResolver('POST', SERVER_ENDPOINTS.GET_QUESTION, {
    visitorInfo: getAccessToken(),
    question_id: questionId,
  }) as Promise<{ data: QuestionType; status: string }>;
};

export const getRandomQuestion = async (): Promise<RandomQuestionResponseType> => {
  return ApiBeResolver('POST', SERVER_ENDPOINTS.GET_RANDOM_QUESTION, {
    visitorInfo: getAccessToken(),
  });
};

export const getUserInfo = async () => {
  return ApiBeResolver('POST', SERVER_ENDPOINTS.GET_USER_INFO, {
    visitorInfo: getAccessToken(),
  });
};

export const getProgressData = async () => {
  return ApiBeResolver('POST', SERVER_ENDPOINTS.GET_PROGRESS_DATA, {
    visitorInfo: getAccessToken(),
  });
};

/*
{
    "correct_answers": [
        4
    ],
    "is_answer_correct": false,
    "status": "SUCCESS"
}
*/
export const sendAnswerResult = async (
  payload: AnswerPayloadRequestType
): Promise<OnSendAnswerResponseType> => {
  return ApiBeResolver('POST', SERVER_ENDPOINTS.ADD_ANSWER, {
    ...payload,
    visitorInfo: getAccessToken(),
    task: 'ANSWER_TO_QUESTION',
  });
};

export const addNewQuestion = async (questionData: NewQuestionPayloadType) => {
  return ApiBeResolver('POST', SERVER_ENDPOINTS.ADD_NEW_QUESTION, {
    visitorInfo: getAccessToken(),
    ...questionData,
  });
};

export const sendComment = async (payload: NewCommentPayloadType) => {
  return ApiBeResolver('POST', SERVER_ENDPOINTS.ADD_NEW_COMMENT, {
    visitorInfo: getAccessToken(),
    ...payload,
    task: 'ADD_COMMENT',
  });
};
