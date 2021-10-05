import Head from 'next/head';
import { Header } from '../components';

export default function Home() {
  return (
    <div>
      <Head><title>Amazon</title></Head>
      <Header />
    </div>
  );
}
