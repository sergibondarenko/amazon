import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { Header, Banner, ProductFeed } from '../components';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return { props: { session } };
}

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head><title>Amazon</title></Head>
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed />
      </main>
    </div>
  );
}
