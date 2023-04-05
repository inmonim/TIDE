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
    <div className="grid grid-cols-3 place-items-start gap-2 flex-wrap">
      {emotions.map(emotion => (
        <div className="" key={emotion.id}>
          <label className="flex my-4 mx-4">
            <input
              className="w-[20px]"
              type="checkbox"
              name="music-emotion"
              value={emotion.id}
              checked={selectedEmotion === emotion.id}
              onChange={handleEmotionSelection}
            />
            <div className="text-2xl mx-2">{emotion.name}</div>
          </label>
        </div>
      ))}
    </div>
  );
}
export default MusicEmotion;
