import {FC, useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/router';
import {useAppDispatch, useAppSelector} from 'store'; //스토어 생성단계에서 export한 커스텀 
import {followWaitAsync} from 'store/api/features/followWaitSlice';

export type RightBarProps = {
  barType: Number;
};

const RightBar: FC<RightBarProps> = props => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  interface followWaitInterFace {
    nickname: string;
    profile_img_path: string;
    introduce: string;
  }

  const [followWaitList, setFollowWaitList] = useState<followWaitInterFace[]>([]);

  const {status, followWaiters} = useAppSelector(state => {
    console.log(state.followWait, 333);
    return state.followWait;
  });
  const {barType} = props;

  useEffect(() => {
    dispatch(followWaitAsync());
    setFollowWaitList(followWaiters)
    }, []);

  const userArr = [
    '그래서니가뭘할수있는데',
    '그래서니가뭘',
    '유진스',
    '노진스',
    'Jjisoo',
    'Emmanuel',
    'GigaChad',
    '울산약골손수민씨',
    '부산핵주먹정인모',
    '부울경핵찐따한상현',
    '이거몇글자까지가능한겨',
    '오늘점심규동규동'
  ];

  return (
    <>
      <AnimatePresence key={router.route}>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{
            duration: 0.8
          }}>
          <div
            className={`w-[calc(3%+200px)] h-[calc(100%-140px)] bg-[#1E272FF6] fixed right-2 top-[2.7rem] z-[25] rounded-xl overflow-hidden border-2 border-sky-700`}>
            <div className={`w-[100%] h-[30px] bg-[#2E608C]`}>
              <p className={`text-white pl-2 pt-[2px]`}>
                {barType === 1 ? 'Notification' : 'Friends'}
              </p>
            </div>
            <div
              className={`w-[100%] h-[95%] overflow-y-auto p-3 scrollbar-hide text-white`}>
              {/* 그래서니가뭘 이미지 / 그래서니가뭘 팔로우신청 */}
              
              {followWaitList ? followWaitList.map((followWaiter, index) => (
                <div className={`flex flex-row mb-2`} key={index}>
                  <div
                    className={`rounded-lg min-w-[3rem] min-h-[3rem] w-12 h-12 bg-white`}></div>
                  <div className={`ml-3 flex items-center`}>
                    <p className={`text-xs text-white`}>
                      {followWaiter.nickname}님이 팔로우 신청을 보냈습니다.
                    </p>
                  </div>
                </div>
              )):<></>}
              
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default RightBar;
