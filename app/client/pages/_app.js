import 'styles/tailwind.css';
import buildClient from 'lib/api-client';
import Layout from 'components/Layout';

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <Layout currentUser={currentUser}>
      <Component currentUser={currentUser} {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/auth/me');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser,
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
