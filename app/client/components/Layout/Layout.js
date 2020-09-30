import { Footer, Header } from 'components';

const Layout = ({ children, currentUser }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentUser={currentUser} />
      <main className="flex-1 bg-recruitment-light-gray">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
