import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from 'store';
import {emotionSongAsync} from 'store/api/features/MusicEmotionSlice';

function MusicEmotion({userId, songId, emotions}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [emotion, setSelectedEmotion] = useState<number | null>(null);
  const handleEmotionSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {value} = event.target;
    setSelectedEmotion(Number(value));
    dispatch(emotionSongAsync({userId, songId, emotion}));
  };

  // console.log(selectedEmotion, 'selectedEmotion');

  return (
    <div className="grid grid-cols-3 md:flex-wrap md:grid-cols-3 md:grid md:place-items-start md:gap-2">
      {emotions.map((emotion: any) => (
        <div className="" key={emotion.id}>
          <label className="flex mx-1 my-1 md:my-4 md:mx-4">
            <input
              className="md:w-[20px] w-[10px]"
              type="radio"
              name="music-emotion"
              value={emotion.id}
              // checked={emotion === emotion.id}
              onChange={handleEmotionSelection}
            />
            <div className="mx-2 text-[14px] md:text-2xl">{emotion.name}</div>
          </label>
        </div>
      ))}
    </div>
  );
}
export default MusicEmotion;
