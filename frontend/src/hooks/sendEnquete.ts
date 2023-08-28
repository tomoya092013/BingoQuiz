import { EnqueteTotal } from '../types';

export const sendEnquete = async (guestId: number, enquete: EnqueteTotal[]) => {
  const data = {
    guest_id: guestId,
    enquete_1: enquete[0].tomoya,
    enquete_2: enquete[1].tomoya,
    enquete_3: enquete[2].tomoya,
    enquete_4: enquete[3].tomoya,
    enquete_5: enquete[4].tomoya,
  };

  try {
    await fetch(`http://localhost:3000/enquete/${guestId}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error', error);
  }
};
