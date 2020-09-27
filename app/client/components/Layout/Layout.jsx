import { Footer, Header } from 'components';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-recruitment-light-gray">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
