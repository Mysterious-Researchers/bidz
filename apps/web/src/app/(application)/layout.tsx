import { Header } from "@/app/(application)/_components/header";
import { Footer } from "@/app/(application)/_components/footer";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
