export const emailWhenNewBetaUser = async (email) => {
  await fetch("https://www.publicly.so/api/email/newBetaUser", {
    method: "POST",
    body: JSON.stringify({
      name: email.name,
      email: email.email,
      product: email.product,
    }),
  });
};
