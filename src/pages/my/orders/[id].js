import * as React from 'react';
import Head from "next/head";
import Container from "../../../containers/my-order-with-id";
import commerce from "../../../lib/commerce";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container />
    </>
  );
}
