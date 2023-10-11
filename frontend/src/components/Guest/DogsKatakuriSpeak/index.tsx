import { Button, Stack } from '@mui/material';

import { StyledTypography } from '../';
import { JIN, KATAKURI, TEO, YAKUMO } from '../GuestBingoSheet/Icons';
import LeftSpeak from './LeftSpeak';
import RightSpeak from './RightSpeak';

type Props = {
  ScrollTop: () => void;
};

const DogsKatakuriSpeak = ({ ScrollTop }: Props) => {
  return (
    <Stack
      maxWidth="800px"
      sx={{ backgroundColor: '#d6eeff' }}
      marginTop="20px"
      padding="40px 0"
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignContent="center"
        width="100%"
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignContent="center"
          width="80%"
          sx={{
            backgroundColor: 'pink',
            borderRadius: '20px',
            padding: '10px',
            marginBottom: '20px',
          }}
        >
          <StyledTypography>犬とカタクリの会話</StyledTypography>
        </Stack>
      </Stack>
      <RightSpeak
        name={'カタクリ'}
        speak={'おい、いぬ。説明しろ。'}
        icon={KATAKURI}
        time={'12:20'}
        kidoku={'既読3'}
      />
      <LeftSpeak
        name="テオ"
        speak={'ビンゴシートのマスを押せば問題がでてきます！'}
        icons={[TEO]}
        time={'12:23'}
      />
      <LeftSpeak
        name={'ジン'}
        speak={'シャンブルズを押すとビンゴシートがシャッフルします'}
        icons={[JIN]}
        time={'12:24'}
      />
      <LeftSpeak
        name="やくも"
        speak={'外れるとマスがグレーになります。正解するとズドｵンてなります。'}
        icons={[YAKUMO]}
        time={'12:28'}
      />
      <RightSpeak
        name={'カタクリ'}
        speak={'お前らは、2人がどんな夫婦になると思う？'}
        icon={KATAKURI}
        time={'13:22'}
        kidoku={'既読3'}
      />
      <LeftSpeak
        name="テオ ジン やくも"
        speak={
          'ずっとニコニコ仲良しに決まっているワン！でもみんなと遊びたがりの2人なので、みんなこれからも2人と遊んであげて下さいワン！そしたらもっとニコニコ楽しいワン！！'
        }
        icons={[TEO, JIN, YAKUMO]}
        time={'13:25'}
        sx={{ margin: '30px 10px' }}
      />
      <RightSpeak
        name={'カタクリ'}
        speak={'ふっ...。ずいぶん未来を見てやがる...'}
        icon={KATAKURI}
        time={'23:45'}
        kidoku={'既読3'}
      />
      <RightSpeak
        name={'カタクリ'}
        speak={'これ押すとビンゴシートに戻れる...'}
        icon={KATAKURI}
        time={'23:45'}
        kidoku={'既読3'}
      >
        <Button variant="contained" onClick={ScrollTop} sx={{ margin: '10px' }}>
          ボタン
        </Button>
      </RightSpeak>
    </Stack>
  );
};

export default DogsKatakuriSpeak;
