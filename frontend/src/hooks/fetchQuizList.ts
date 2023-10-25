import { Quiz } from '../types';

export const fetchQuizList = async (): Promise<Quiz[]> => {
  const res = await fetch(`https://${import.meta.env.VITE_API_URL}/quizzes`);
  const json: Quiz[] = await res.json();
  return json;
};
