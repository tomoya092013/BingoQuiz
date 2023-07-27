import React from 'react';
import { Route, Routes } from 'react-router-dom';

import QuizList from './components/Admin/QuizList';
import EditQuiz from './components/Admin/EditQuiz/index';
import Answers from './components/Admin/Answer';
// import AnswerOpen from './components/Admin/Answer/open';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/admin/editQuiz/:id" element={<EditQuiz />} />
        <Route path="/admin/answers" element={<Answers />} />
        {/* <Route path="/admin/answer/open" element={<AnswerOpen />} /> */}
      </Routes>
    </>
  );
}

export default App;
