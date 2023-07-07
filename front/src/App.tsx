import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminIndex from './components/Admin/Admin';
import CreateQuiz from './components/Admin/CreateQuiz';
import BingoList from './components/Admin/GuestAcswerList/BingoList';
import CorrectAnswerRate from './components/Admin/GuestAcswerList/CorrectAnswerRate';
import GuestAnswerList from './components/Admin/GuestAcswerList/GuestAnswerList';
import QuizList from './components/Admin/QuizList';
import SelectAnswer from './components/Guest/SelectAnswer';
import BingoSheet from './components/Guest/BingoSheet/BingoSheet';
import LoginForm from './components/Login/LoginForm';
import { ChatConnection } from './components/ChatConnection/ChatConnection';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/admin/createQuiz" element={<CreateQuiz />} />
        <Route path="/admin/quizList" element={<QuizList />} />
        <Route path="/admin/guestAnswerList" element={<GuestAnswerList />} />
        <Route
          path="/admin/guestAnswerList/bingoList"
          element={<BingoList />}
        />
        <Route
          path="/admin/guestAnswerList/correctAnswerRate"
          element={<CorrectAnswerRate />}
        />
        <Route path="/guest/:id">
          <Route path="bingoSheet" element={<BingoSheet />} />
          <Route path="quizList" element={<QuizList />} />
          <Route path="selectAnswer" element={<SelectAnswer />} />
        </Route>
        <Route path="chatConnection" element={<ChatConnection />} />
      </Routes>
      <Routes></Routes>
    </>
  );
}

export default App;
