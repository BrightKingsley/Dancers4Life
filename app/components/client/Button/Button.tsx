"use client";
export default function Button({
  children,
  color,
  className,
  type,
  onClick,
  loading,
}: {
  children: React.ReactNode;
  color?: "blue" | "green" | "pleep";
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: Function;
  loading?: boolean;
}) {
  return (
    <button
      onClick={(e) => {
        // e.stopPropagation();
        // e.preventDefault();
        onClick && onClick();
        console.log("btn clicked");
      }}
      className={`${
        color === "pleep"
          ? "bg-pleep-gradient"
          : color === "green"
          ? "bg-malipoma-green"
          : color === "blue"
          ? "bg-brand-orange"
          : "bg-brand-orange"
      } text-white font-semibold border border-brand-silver rounded-xl w-full p-3 flex items-center justify-center gap-2 active:scale-95 transition-transform duration-150 hover:outline-brand-orange hover:outline-offset-4 hover:outline-2 hover:outline active:bg-brand-red active:transition-colors focus:outline-none ${className}`}
      disabled={loading}
      type={type}
    >
      {loading ? "loading..." : children}
    </button>
  );
}
