import {useState, useEffect} from 'react';
interface MsgInterFace {
  content: string;
  createdAt: any;
  nickname: string;
  type: string;
  id: string;
}

const Message = ({data}: {data: MsgInterFace}) => {
  const [date, setDate] = useState<string>('');
  // 시간세팅 분까지만
  // 여기현재 오류 고치자
  useEffect(() => {
    setDate(
      data.createdAt
        .toDate()
        .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
    );
  }, []);

  return (
    <div className="flex items-center">
      <div className="p-2 my-5 border-[1px] rounded-lg break-words w-2/5">
        {data.content}
      </div>
      <div className="ml-2">{date}</div>
    </div>
  );
};

export default Message;
