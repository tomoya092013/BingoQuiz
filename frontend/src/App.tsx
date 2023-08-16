import { Route, Routes } from 'react-router-dom';

// import Answers from './components/Admin/Answer';
import EditQuiz from './components/Admin/EditQuiz/index';
import QuizList from './components/Admin/QuizList';
import User from './components/User';
import Login from './components/Login';
import USerQuizList from './components/User/UserQuizList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/quizList" element={<QuizList />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/quizList" element={<USerQuizList />} />
        <Route path="/admin/editQuiz/:id" element={<EditQuiz />} />
      </Routes>
    </>
  );
}

export default App;
