import { EnqueteTotal } from '../types';

export const fetchEnquetes = async (): Promise<EnqueteTotal[]> => {
  const res = await fetch('http://localhost:3000/guest_select_answer');
  const json = await res.json();
  return json;
};
