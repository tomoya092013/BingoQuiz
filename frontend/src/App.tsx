import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Answers from './components/Admin/Answer';
import EditQuiz from './components/Admin/EditQuiz/index';
import QuizList from './components/Admin/QuizList';
import User from './components/User';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin/editQuiz/:id" element={<EditQuiz />} />
        {/* <Route path="/admin/answers" element={<Answers />} /> */}
      </Routes>
    </>
  );
}

export default App;
