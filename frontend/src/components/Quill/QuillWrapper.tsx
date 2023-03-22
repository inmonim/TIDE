import dynamic from 'next/dynamic';

const QuillWrapper = dynamic(() => import('@/components/Quill/QuillEditor'), {
  ssr: false,
  loading: () => <p className={`bg-[none]`}>Loading ...</p>
});
export default function Wrapper() {
  return (
      <QuillWrapper />

  )
}
