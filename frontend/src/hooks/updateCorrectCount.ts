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

  await fetch(
    `https://${import.meta.env.VITE_API_URL}/guest_select_answer/${guestId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
};
