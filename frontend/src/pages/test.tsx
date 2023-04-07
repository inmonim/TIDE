import styles from '@/styles/Home.module.css';
import {useCallback} from 'react';
import {useAppDispatch, useAppSelector, wrapper} from 'store';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'; // getServerSideProps type
import {increment, decrement, fetchAsync} from 'store/api/features/countSlice';

// SSR: 서버에서 구동되는 영역
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async () => {
    // 서버 영역에서 Redux 사용
    // await store.dispatch(fetchAsync());
    // 전달할 props가 있으면 전달
    return {
      props: {
        message: 'SSR!!'
      }
    };
  });

export default function Test(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const dispatch = useAppDispatch();
  const {value, status} = useAppSelector(state => {
    return state.counter;
  });
  // reducer 시험용
  // 불필요한 렌더링을 방지하기 위해서인데 컴포넌트에 속성으로 들어가는 함수는 useCallback으로 감싸주는것이 좋다
  const onIncrement = useCallback(() => dispatch(increment()), []);
  const onDecrement = useCallback(() => dispatch(decrement()), []);
  // redux-thunk
  const onReduxThunk = useCallback(() => dispatch(fetchAsync()), []);

  return (
    <>
      <main className={styles.main}>
        <div>Test</div>
        <div className="text-2xl text-white">
          {value} | {status}
        </div>
        <button className="w-10 text-2xl border-2" onClick={onIncrement}>
          +
        </button>
        <button className="w-10 text-2xl border-2" onClick={onDecrement}>
          -
        </button>
        <button className="w-10 text-2xl border-2" onClick={onReduxThunk}>
          X
        </button>
      </main>
    </>
  );
}
