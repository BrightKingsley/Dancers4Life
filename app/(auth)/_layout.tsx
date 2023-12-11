export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-brand-orange/10 md:py-12  animate-fade-in w-full h-screen_ h-full flex items-center justify-center">
      <div className="rounded-xl max-w-[90%] bg-white w-fit md:w-[35rem] h-fit space-y-6 text-center p-4">
        {children}
      </div>
    </main>
  );
}
