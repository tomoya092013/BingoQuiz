import { SetStateAction } from 'react';

import { Button, Input, Stack } from '@mui/material';

type Props = {
  katakuriText: string;
  handleInputChange: (e: { target: { value: SetStateAction<string> } }) => void;
  openKatakuri: () => void;
};

const Katakuri = ({ katakuriText, handleInputChange, openKatakuri }: Props) => {
  return (
    <Stack direction="row" justifyContent="center">
      <Input
        value={katakuriText}
        onChange={handleInputChange}
        sx={{ color: 'gray', fontSize: '4px' }}
      />
      <Button onClick={openKatakuri}>未来</Button>
    </Stack>
  );
};

export default Katakuri;
