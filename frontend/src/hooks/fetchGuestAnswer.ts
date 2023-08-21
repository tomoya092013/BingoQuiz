type FetchGuestAnswer = {
  guest_id: number;
  question_1_select_mark: string;
  question_2_select_mark: string;
  question_3_select_mark: string;
  question_4_select_mark: string;
  question_5_select_mark: string;
  question_6_select_mark: string;
  question_7_select_mark: string;
  question_8_select_mark: string;
  question_9_select_mark: string;
};

export const fetchGuestAnswer = async (
  guestId: number
): Promise<FetchGuestAnswer> => {
  const res = await fetch(
    `http://localhost:3000/guest_select_answer/${guestId}`
  );

  const json = await res.json();
  return json.guestSelectAnswer;
};
