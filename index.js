import Head from 'next/head'
import ClientelingApp from '../components/ClientelingApp'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Roma - Clienteling AI</title>
      </Head>
      <main>
        <ClientelingApp />
      </main>
    </div>
  )
}