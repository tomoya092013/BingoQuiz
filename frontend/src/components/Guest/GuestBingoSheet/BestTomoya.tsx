import { useRecoilValue } from 'recoil';

import { Stack } from '@mui/material';

import { guestInfoState } from '../../../store';
import LeftSpeak from '../DogsKatakuriSpeak/LeftSpeak';
import RightSpeak from '../DogsKatakuriSpeak/RightSpeak';
import { JIN, TEO, YAKUMO } from './Icons';

const BestTomoya = () => {
  const guestInfo = useRecoilValue(guestInfoState);
  if (guestInfo === null) return <></>;
  return (
    <Stack
      maxWidth="800px"
      sx={{ backgroundColor: '#d6eeff' }}
      padding="50px 0"
    >
      <LeftSpeak
        speak={
          '※「ぼくたちはテンションが上がると暴言を吐くことがあります。冷静になるよう努めますので、どうか暖かく見守ってください。」'
        }
        icons={[TEO, JIN, YAKUMO]}
        sx={{ marginBottom: '80px' }}
      />
      <LeftSpeak
        name="ジン"
        speak={'そうです。わたしは犬です。「ニャー」なんて言わないのです。'}
        icons={[JIN]}
      />

      <RightSpeak
        name="テオ"
        speak={
          'え、この違和感に気付いたあなたって...。探偵ですか！？工藤新一ですか！？'
        }
        icon={TEO}
      />
      <LeftSpeak
        name="やくも"
        speak={
          '今回は、みきちゃんが選ぶ「マスター・オブ・アルティメットキングともくん」を決めようと思います！'
        }
        icons={[YAKUMO]}
      />
      <RightSpeak name="テオ" speak={'そんなの、一択だろ！！'} icon={TEO} />
      <LeftSpeak
        name="ジン"
        speak={'はい、わたしもこれしかないと思います。簡単なことです。'}
        icons={[JIN]}
      />
      <RightSpeak name="やくも" speak={'せーーーーっの！'} icon={YAKUMO} />
      <LeftSpeak
        speak={'「1番！」「２番！」「３番！」'}
        icons={[TEO, JIN, YAKUMO]}
      />
      <LeftSpeak
        name="テオ"
        speak={'テめおらこのやロ！！チョーしのってんじゃねーぞ！ダラっ！！！！'}
        icons={[TEO]}
      />
      <RightSpeak
        name="ジン"
        speak={
          'なめてんじゃねーぞ！！てメーのふわふわの毛むしって、毛玉雪だるま作って、玄関に並べンぞおラ！！！！'
        }
        icon={JIN}
      />
      <LeftSpeak
        name="やくも"
        speak={'１番もいいし、２番もいいなー。ぼくらじゃ決めれないよ〜泣'}
        icons={[YAKUMO]}
      />
      <LeftSpeak
        speak={` 「ぼくたちではみきちゃんが選ぶ「マスター・オブ・アルティメットキングともくん」が分かりません。${guestInfo.name}のお力を貸してください。」`}
        icons={[TEO, JIN, YAKUMO]}
        sx={{ margin: '20px' }}
      />
    </Stack>
  );
};

export default BestTomoya;
