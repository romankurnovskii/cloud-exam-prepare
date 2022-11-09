import { useEffect, useState } from 'react';
import { Box, Dropdown } from 'react-bulma-components';

import { EXAM_CODES } from '../config';
import { getLocalExamCode, setLocalExamCode } from '../util/helpers';

export default function HeaderCurrentExam() {
  const [exam, setExam] = useState<string>('Choose exam');

  const examCodesMap = Object.entries(EXAM_CODES).map((e) => {
    return (
      <Dropdown.Item renderAs='a' value={e[0]}>
        {e[1]}
      </Dropdown.Item>
    );
  });

  const onChangeExamHandler = (e: string) => {
    setExam(e);
    setLocalExamCode(e);
  };

  useEffect(() => {
    const examCode = getLocalExamCode();
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
      <h2 className='subtitle'>Exam questions 2022: {EXAM_CODES[exam]} </h2>
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
