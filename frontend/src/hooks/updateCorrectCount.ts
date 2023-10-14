export const updateCorrectCount = async (
  guestId: number,
  bingo: boolean,
  correctCount: number
) => {
  const data = {
    guest_id: guestId,
    bingo: bingo,
    correct_count: correctCount,
  };

  await fetch(`http://localhost:3000/guest_select_answer/${guestId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
