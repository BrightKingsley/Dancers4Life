"use client";
import Image from "next/image";
import NavLink from "../../client/NavLink";
import Link from "next/link";

export default function HeaderNav() {
  const navLinks: { title: string; href: string }[] = [
    { title: "classes", href: "/classes" },
    { title: "events", href: "/events" },
  ];

  return (
    <>
      {navLinks.map((link, i) => (
        <NavLink key={i} href={link.href} className={``}>
          {({ isActive }) => {
            return (
              <div
                className={`nav relative  px-8   ${
                  isActive && i !== 2 && "nav-active"
                }`}
              >
                <p>{link.title}</p>
              </div>
            );
          }}
        </NavLink>
      ))}
    </>
  );
}
