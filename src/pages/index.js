import React, { } from 'react';
import Head from 'next/head';

import Home from "../components/home/home";

export default function index() {
  return <>
    <Head>
      <title>Gus Ryan</title>
      <meta name="description" content="Gus Ryan" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/icon.png" />
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700&display=swap" rel="stylesheet" />
    </Head>

    <Home />
  </>
};