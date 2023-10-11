import { useRecoilValue } from 'recoil';

import { Stack } from '@mui/material';

import { guestInfoState } from '../../../store';
import LeftSpeak from '../DogsKatakuriSpeak/LeftSpeak';
import RightSpeak from '../DogsKatakuriSpeak/RightSpeak';
import { JIN, TEO, YAKUMO } from './Icons';

const BestMiki = () => {
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
        name="テオ"
        speak={'そろそろはっきりさせた方が良いと思うの。'}
        icons={[TEO]}
      />
      <RightSpeak name="ジン" speak={'はい、私もそう思います。'} icon={JIN} />
      <LeftSpeak
        name="やくも"
        speak={
          'ともくんが選ぶ「THE・BESTオブTHE・ベストみきちゃん」を決めるんだよね？'
        }
        icons={[YAKUMO]}
      />
      <RightSpeak name="テオ" speak={'です。'} icon={TEO} />
      <LeftSpeak name="ジン" speak={'です、です。'} icons={[JIN]} />
      <RightSpeak
        name="テオ"
        speak={'正直、そんな迷うことでもないんだけどね。'}
        icon={TEO}
      />
      <LeftSpeak
        name="ジン"
        speak={'私もそう思います。こんなの一択です。'}
        icons={[JIN]}
      />
      <RightSpeak name="やくも" speak={'せーーーーっの！'} icon={YAKUMO} />
      <LeftSpeak
        speak={'「1番！」「２番！」「３番！」'}
        icons={[TEO, JIN, YAKUMO]}
      />
      <LeftSpeak
        name="テオ"
        speak={'テめー！！目ついてんのか！？アーん！？'}
        icons={[TEO]}
      />
      <RightSpeak
        name="ジン"
        speak={
          'なめてんじゃねーぞ！！てメーのふわふわの毛むしって、耳かきの綿にしてやんヨおら！！'
        }
        icon={JIN}
      />
      <LeftSpeak
        name="やくも"
        speak={'どのみきちゃんも好きだー！！！！'}
        icons={[YAKUMO]}
      />
      <RightSpeak name="やくも" speak={'せーーーーっの！'} icon={YAKUMO} />
      <LeftSpeak
        speak={` 「ぼくたちではともくんが選ぶ「THE・BESTオブTHE・ベストみきちゃん」が分かりません。${guestInfo.name}のお力を貸してください。」`}
        icons={[TEO, JIN, YAKUMO]}
        sx={{ margin: '20px' }}
      />
    </Stack>
  );
};

export default BestMiki;
