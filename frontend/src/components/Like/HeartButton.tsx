import {useState, useEffect, useRef} from 'react';
import {likeSong, likeSongCheck} from 'store/api/features/likeSlice';
import {useAppDispatch, useAppSelector} from 'store';

function HeartButton({songId}: {songId: any}) {
  const dispatch = useAppDispatch();

  const {check} = useAppSelector(state => state.like);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  // const likeCount = useAppSelector(selectLikeCount);

  const likeSongID = () => {
    // 좋아요 요청
    setIsLiked(prev => !prev);
    dispatch(likeSong(songId));
    dispatch(likeSongCheck(songId));
  };
  useEffect(() => {
    // 조아요 체크
    if (check) {
      setIsLiked(check);
    }
    dispatch(likeSongCheck(songId));
  }, [check]);

  return (
    // <button onClick={handleLike}>
    //   <img
    //     className="hover: animate-bounce"
    //     src={`/buttons/${isLiked ? 'HeartFilled.png' : 'HeartEmpty.png'}`}
    //     style={{width: '50px', height: '50px'}}
    //     alt="Like button"
    //   />
    // </button>
    <button onClick={likeSongID}>
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
