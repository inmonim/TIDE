import Chat from '@/components/Chatting/Chat';
import {useRouter} from 'next/router';

function Messages() {
  const router = useRouter();

  return (
    <main
      className={`
    lg:p-[4rem] lg:pr-[calc(200px)] lg:pl-[calc(15%+100px)] text-sm lg:text-lg lg:h-screen lg:pb-[9rem] h-screen text-white flex flex-col lg:pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
      <Chat />
    </main>
  );
}
export default Messages;
