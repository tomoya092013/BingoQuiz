export const createGuestAnswer = async (guestId: number, guestName: string) => {
  const data = {
    guest_id: guestId,
    guest_name: guestName,
    question_1_select_mark: '',
    question_2_select_mark: '',
    question_3_select_mark: '',
    question_4_select_mark: '',
    question_5_select_mark: '',
    question_6_select_mark: '',
    question_7_select_mark: '',
    question_8_select_mark: '',
    question_9_select_mark: '',
  };

  await fetch('http://localhost:3000/guest_select_answer', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
