import Image from "next/image";
import HeaderNav from "./HeaderNav";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full shrink-0 z-40 bg-white relative">
      <div className="w-[90%] mx-auto flex items-center justify-between py-2">
        <Link href={"/"} className="flex gap-2 items-center justify-between">
          <div className="w-8 h-8">
            <Image
              src="/images/logos/dance4life.png"
              alt="logo"
              width={240}
              height={240}
            />
          </div>
          <p className="font-bold text-malipoma-green">Dance4Life</p>
        </Link>
        <div className="flex ml-auto md:justify-start items-center gap-4 w-fit md:w-auto bg-white px-6 md:p-0 md:static bottom-0 left-0">
          <HeaderNav />
          <Link href={"/account"} className="flex items-center gap-2">
            <button className="flex items-center gap-2 transition-all duration-150 hover:rounded-xl p-[1px] md:pl-2 hover:bg-brand-orange/10">
              <div className="w-8 h-8 overflow-clip rounded-full bg-[#F9C3E0]">
                <Image
                  src={`/images/users/1.png`}
                  alt="home"
                  width={240}
                  height={240}
                />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
