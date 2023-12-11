export default function Overlay({ onClick }: { onClick: Function }) {
  return (
    <div
      title="close"
      onClick={() => onClick()}
      className="absolute cursor-pointer top-0 left-0 w-full h-full bg-brand-orange/10 z-20"
    />
  );
}
