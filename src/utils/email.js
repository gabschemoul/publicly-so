export const emailWhenNewBetaUser = async (infos) => {
  await fetch("https://www.publicly.so/api/email/newBetaUser", {
    method: "POST",
    body: JSON.stringify({
      name: infos.name,
      email: infos.email,
      product: infos.product,
    }),
  });
};
