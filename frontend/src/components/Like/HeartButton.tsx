import {useState, useEffect, useRef} from 'react';
import HeartFilled from './buttons/HeartFilled.png';
import HeartEmpty from './buttons/HeartEmpty.png';

const HeartButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button onClick={handleLike}>
      <img
        src={isLiked ? HeartFilled.toString() : HeartEmpty.toString()}
        alt="Like button"
      />
    </button>
  );
};

export default HeartButton;
