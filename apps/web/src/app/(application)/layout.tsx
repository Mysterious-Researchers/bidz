import { Header } from "@/app/(application)/_components/navigation/header";
import { Footer } from "@/app/(application)/_components/navigation/footer";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-480px)] w-full flex-1 flex-col bg-slate-50">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
