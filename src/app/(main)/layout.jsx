import Navbar from '@/components/Navbar';
import NewsLetter from '@/components/NewsLetter';
import Footer from '@/components/Footer';

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <NewsLetter />
      <Footer />
    </>
  );
}
export default MainLayout;
