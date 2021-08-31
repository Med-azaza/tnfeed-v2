import Head from "next/head";

export default function MainHeader({ title }) {
  return (
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
        rel="stylesheet"
      ></link>
      <title>{title}</title>
    </Head>
  );
}
