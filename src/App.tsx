import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminIndex from './components/Admin/Admin';
import AddAnswer from './components/Admin/CorrectAnswerList/AddAnswer';
import CorrectAnswerList from './components/Admin/CorrectAnswerList/CorrectAnswerList';
import CreateQuestion from './components/Admin/CreateQuestion';
import BingoList from './components/Admin/GuestAcswerList/BingoList';
import CorrectAnswerRate from './components/Admin/GuestAcswerList/CorrectAnswerRate';
import GuestAnswerList from './components/Admin/GuestAcswerList/GuestAnswerList';
import QuestionList from './components/Admin/QuestionList';
import BingoSheet from './components/Guest/BingoSheet';
import SelectAnswer from './components/Guest/SelectAnswer';
import LoginForm from './components/Login/LoginForm';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/admin/createQuestion" element={<CreateQuestion />} />
        <Route path="/admin/questionList" element={<QuestionList />} />
        <Route
          path="/admin/correctAnswerList"
          element={<CorrectAnswerList />}
        />
        <Route
          path="/admin/correctAnswerList/addAnswer"
          element={<AddAnswer />}
        />
        <Route path="/admin/guestAnswerList" element={<GuestAnswerList />} />
        <Route
          path="/admin/guestAnswerList/bingoList"
          element={<BingoList />}
        />
        <Route
          path="/admin/guestAnswerList/correctAnswerRate"
          element={<CorrectAnswerRate />}
        />
        <Route path="/guest">
          <Route path="bingoSheet" element={<BingoSheet />} />
          <Route path="questionList" element={<QuestionList />} />
          <Route path="selectAnswer" element={<SelectAnswer />} />
        </Route>
      </Routes>
      <Routes></Routes>
    </div>
  );
}

export default App;
