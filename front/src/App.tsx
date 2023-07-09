import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminIndex from './components/Admin/Admin';
import LoginForm from './components/Login/LoginForm';
import QuizList from './components/Admin/QuizList';
import EditQuiz from './components/Admin/EditQuiz/index';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/admin/quizList" element={<QuizList />} />
        <Route path="/admin/editQuiz/:id" element={<EditQuiz />} />
      </Routes>
    </>
  );
}

export default App;
