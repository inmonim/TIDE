import {useState, useEffect, useRef} from 'react';
import HeartFilled from './buttons/HeartFilled.png';
import HeartEmpty from './buttons/HeartEmpty.png';

function HeartButton() {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button onClick={handleLike}>
      <img
        className="hover: animate-bounce"
        src={`/buttons/${isLiked ? 'HeartFilled.png' : 'HeartEmpty.png'}`}
        style={{width: '50px', height: '50px'}}
        alt="Like button"
      />
    </button>
  );
}

export default HeartButton;
