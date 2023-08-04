import React from 'react';
import { useRecoilValue } from 'recoil';

import { userInfoSelector } from '../../store';

const User: React.FC = () => {
  const user = useRecoilValue(userInfoSelector);

  return (
    <>
      名前:{user.name} ID:{user.id}
    </>
  );
};

export default User;
