import Head from "next/head";
import Image from "next/image";
import { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify Clone</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
        {/* Center */}
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

//render the session before the user, allowing everything to load before
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
