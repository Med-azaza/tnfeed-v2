import Head from "next/head";

export default function MainHeader({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
