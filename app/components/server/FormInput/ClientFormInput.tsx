export default function ClientFormInput({
  name,
  type,
  placeholder,
  getInput,
  leading,
  trailing,
  className,
}: {
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  getInput?(value: string): void;
  leading?: React.ReactNode;
  placeholder?: string;
  trailing?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border p-2 flex items-center gap-2 ${className}`}
    >
      {leading}
      <input
        // onChange={(e) => getInput && getInput(e.target.value)}
        type={type}
        name={name}
        placeholder={placeholder}
        id=""
        className="focus:border-none w-full focus:outline-none bg-transparent placeholder:translate-y-[2px] flex-1"
      />
      {trailing}
    </div>
  );
}
