import {useState, useEffect, useRef} from 'react';
import HeartFilled from './buttons/HeartFilled.png';
import HeartEmpty from './buttons/HeartEmpty.png';
import {useSelector, useDispatch} from 'react-redux';
import {
  likeAsync,
  selectLikeCount,
  selectisLiked,
  likeSong
} from 'store/api/features/likeSlice';
import {useAppDispatch, useAppSelector} from 'store';

function HeartButton({songId}: {songId: number}) {
  const alreadyLiked = useAppSelector(selectisLiked(songId));
  const [isLiked, setIsLiked] = useState<boolean>(alreadyLiked);
  const likeCount = useAppSelector(selectLikeCount);

  const dispatch = useAppDispatch();

  const handleLike = () => {
    if (!alreadyLiked) {
      setIsLiked(true);
      dispatch(likeSong({songId}));
    }
  };

  useEffect(() => {
    setIsLiked(alreadyLiked);
  }, [alreadyLiked]);

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
