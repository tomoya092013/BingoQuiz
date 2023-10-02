import { Stack } from '@mui/material';

import DogsSpeak from './Dogs';
import KatakuriSpeak from './Katakuri';

const DogsKatakuriSpeak = () => {
  return (
    <Stack
      maxWidth="800px"
      sx={{ backgroundColor: '#d6eeff' }}
      padding="20px 0"
    >
      <KatakuriSpeak
        speak={'おい、いぬ。お前は2人が幸せになると思うか？'}
        time={'12:20'}
      />
      <DogsSpeak
        name="テオ"
        speak={'あお〜ん！！'}
        icon={'/public/images/teo.png'}
        time={'12:23'}
      />
      <KatakuriSpeak speak={'お前もそう思うか？'} time={'12:24'} />
      <DogsSpeak
        name="ジン"
        speak={'わんわん！わお〜ん！！'}
        icon={'/public/images/jin.png'}
        time={'12:28'}
      />
      <KatakuriSpeak speak={'ま、まさかお前も！？。。。'} time={'12:29'} />
      <DogsSpeak
        name="やくも"
        speak={'みきちゃん大好き！'}
        icon={'/public/images/yakumo.png'}
        time={'12:45'}
      />
      <KatakuriSpeak
        speak={'ふっ...。ずいぶん未来をみていやがる...'}
        time={'12:46'}
      />
    </Stack>
  );
};

export default DogsKatakuriSpeak;
