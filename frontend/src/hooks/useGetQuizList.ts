import { useEffect, useState } from 'react';

type Quiz = {
  id: number;
  title: string;
  correct_mark: string;
  is_ancer_opened: boolean;
  created_at: Date;
  updated_at: Date;
};

export const useGetQuizList = () => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  useEffect(() => {
    getQuizList();
  }, []);

  const getQuizList = async () => {
    const res = await fetch('http://localhost:3001/quizzes');
    const json: Quiz[] = await res.json();
    setQuizList(json);
  };
  return { quizList };
};
