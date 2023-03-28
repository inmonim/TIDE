import {useState, useEffect} from 'react';

interface MsgInterFace {
  content: string;
  createdAt: any;
  nickname: string;
  email: string;
  type: string;
  id: string;
}

const Message = ({data, email}: {data: MsgInterFace; email: any}) => {
  // 채팅 데이터가 다 들어오고 난후 init
  const [init, setInit] = useState<boolean>(false);
  // 나인지 체크
  const [isMe, setIsMe] = useState<boolean>(false);
  // 시간세팅 분까지만
  // createdAt 값이 바로 안들어와서 조건처리
  let date = '';
  if (data.createdAt) {
    date = data.createdAt
      .toDate()
      .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }
  useEffect(() => {
    if (email === data.email) {
      setIsMe(true);
      setInit(true)
    } else {
      setIsMe(false);
      setInit(true)
    }
  }, []);

  return (
    <>
      {init ? (
        isMe ? (
          <div className="flex justify-end w-full px-2 h-fit">
            <div className="flex justify-end items-end w-3/5 my-[0.3rem]">
              <div className="mr-2 text-sm text-slate-400 min-w-fit">
                {date}
              </div>
              <div className="px-3 py-2 break-words bg-gray-800 rounded-tr-none rounded-2xl w-fit">
                {data.content}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full px-2">
            <div className="flex flex-col w-3/5 h-fit">
              <div className="my-1">{data.nickname}</div>
              <div className="flex items-end ">
                <div className="py-2 px-3 border-[0.1rem] rounded-tl-none rounded-2xl break-words w-fit">
                  {data.content}
                </div>
                <div className="ml-2 text-sm text-slate-400 min-w-fit">
                  {date}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        null
      )}
      {}
    </>
  );
};

export default Message;
