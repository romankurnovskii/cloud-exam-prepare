import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bulma-components';

import { EXAM_LIST } from '../config';
import { useAuthContext } from '../context/AuthProvider';
import { getExamList, getUserInfo } from '../util/axios';
import { getLocalExamCode, setLocalExamCode } from '../util/helpers';

export default function HeaderCurrentExam() {
  const [exam, setExam] = useState<string>('Choose exam');
  const [examTitle, setExamTitle] = useState<string>('');
  const [exams, setExams] = useState(EXAM_LIST);
  const { updateUserData } = useAuthContext();

  const examCodesMap = exams.map((ex) => {
    return (
      <Dropdown.Item renderAs='a' key={ex.code} value={ex.code}>
        {ex.name}
      </Dropdown.Item>
    );
  });

  const getExamTitle = (examCode: string): string => {
    const _exam = exams.filter((ex) => (ex.code === examCode ? ex : null));
    return _exam.length > 0 ? _exam[0].name : '';
  };

  const onChangeExamHandler = (e: string) => {
    setExam(e);
    setExamTitle(getExamTitle(e));
    setLocalExamCode(e);
    getUserInfo().then((res) => {
      const userData = res.data;
      if (userData) {
        updateUserData(userData);
      }
    });
  };

  useEffect(() => {
    const examCode = getLocalExamCode();
    getExamList().then((data) => {
      setExams(data.data);
    });
    onChangeExamHandler(examCode);
    setExam(examCode);
  }, []);

  return (
    <div
      className='block'
      style={{
        alignItems: 'center',
        display: 'flex',
        padding: '20px',
        height: 50,
        justifyContent: 'space-between',
      }}
    >
      <h2 className='subtitle'>
        {/* {examTitle !== '' ? 'Please choose exam' : ('Exam questions 2023: ' + examTitle)} */}
        {examTitle}
      </h2>
      <Dropdown
        closeOnSelect={false}
        color=''
        label={exam}
        onChange={onChangeExamHandler}
      >
        {examCodesMap}
      </Dropdown>
    </div>
  );
}
