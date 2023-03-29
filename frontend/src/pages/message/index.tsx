import Chat from '@/components/Chatting/Chat';
import {useRouter} from 'next/router';

function Messages() {
  const router = useRouter();

  return (
    <main
      className={`
    p-[4rem] lg12:pr-[calc(200px)] lg12:pl-[calc(15%+100px)] lg:h-screen pb-[9rem] text-white flex flex-col min-h-[100vh] pt-[calc(2rem+40px)] bg-gradient-to-t from-blue-900 to-slate-900 `}>
      <Chat />
    </main>
  );
}
export default Messages;
