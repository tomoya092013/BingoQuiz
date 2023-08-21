import { Quiz } from '../types';

export const fetchQuizList = async (): Promise<Quiz[]> => {
  const res = await fetch('http://localhost:3000/quizzes');
  const json: Quiz[] = await res.json();
  return json;
};
