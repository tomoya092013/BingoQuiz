import React from 'react';
import { Route, Routes } from 'react-router-dom';

import QuizList from './components/Admin/QuizList';
import EditQuiz from './components/Admin/EditQuiz/index';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/admin/editQuiz/:id" element={<EditQuiz />} />
      </Routes>
    </>
  );
}

export default App;
