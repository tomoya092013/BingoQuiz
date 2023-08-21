import { Route, Routes } from 'react-router-dom';

// import Answers from './components/Admin/Answer';
import EditQuiz from './components/Admin/EditQuiz/index';
import QuizList from './components/Admin/QuizList';
import Login from './components/Login';
import Guest from './components/Guest';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/quizList" element={<QuizList />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/admin/editQuiz/:id" element={<EditQuiz />} />
      </Routes>
    </>
  );
}

export default App;
