import './App.css';

import { Route, Routes } from 'react-router-dom';

// import Answers from './components/Admin/Answer';
import EditQuiz from './components/Admin/EditQuiz/index';
import QuizList from './components/Admin/QuizList';
import Guest from './components/Guest';
import Enquete from './components/Guest/Enquete';
import Login from './components/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/enquete" element={<Enquete />}></Route>
        <Route path="/guest" element={<Guest />} />
        <Route path="/admin/quizList" element={<QuizList />} />
        <Route path="/admin/editQuiz/:id" element={<EditQuiz />} />
      </Routes>
    </>
  );
}

export default App;
