import { EnqueteTotal } from '../types';

export const fetchEnquetes = async (): Promise<EnqueteTotal[]> => {
  const res = await fetch(
    `https://${import.meta.env.VITE_API_URL}/guest_select_answer`
  );
  const json = await res.json();
  return json;
};
