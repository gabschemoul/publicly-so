import React, { useEffect } from "react";

export default function index() {
  return <div></div>;
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;

  return {
    redirect: {
      destination: `/products/${slug}/bugs`,
      permanent: false,
    },
  };
}
