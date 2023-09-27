import { Route, Routes } from 'react-router-dom';
import './App.css';

// import Answers from './components/Admin/Answer';
import EditQuiz from './components/Admin/EditQuiz/index';
import QuizList from './components/Admin/QuizList';
import Login from './components/Login';
import Guest from './components/Guest';
import Enquete from './components/Enquete';
import Loading from './components/Loading';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/enquete" element={<Enquete />}></Route>
        <Route path="/guest" element={<Guest />} />
        <Route path="/admin/quizList" element={<QuizList />} />
        <Route path="/admin/editQuiz/:id" element={<EditQuiz />} />
      </Routes>
    </>
  );
}

export default App;
