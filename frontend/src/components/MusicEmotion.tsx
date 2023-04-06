import React, {useState} from 'react';

type Emotion = {
  id: number;
  name: string;
};

type MusicEmotionProps = {
  emotions: Emotion[];
};

function MusicEmotion({emotions}: MusicEmotionProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const handleEmotionSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {value} = event.target;
    setSelectedEmotion(Number(value));
  };

  console.log(selectedEmotion, 'selectedEmotion');

  return (
    <div className="grid grid-cols-3 md:flex-wrap md:grid-cols-3 md:grid md:place-items-start md:gap-2">
      {emotions.map(emotion => (
        <div className="" key={emotion.id}>
          <label className="flex mx-2 my-2 md:my-4 md:mx-4">
            <input
              className="md:w-[20px] w-[10px]"
              type="checkbox"
              name="music-emotion"
              value={emotion.id}
              checked={selectedEmotion === emotion.id}
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
