export const emailWhenNewBetaUser = async (infos) => {
  console.log("infos:");
  console.log(infos);
  await fetch("https://www.publicly.so/api/email/newBetaUser", {
    method: "POST",
    body: JSON.stringify({
      name: infos.name,
      email: infos.email,
      product: infos.product,
    }),
  });
};
