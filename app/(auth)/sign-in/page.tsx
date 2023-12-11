import { AuthForm } from "../../components/server";

export default function Login() {
  return (
    <main className="w-full md:py-12 flex items-center justify-center bg-brand-orange/10">
      <AuthForm action="login" />
    </main>
  );
}
