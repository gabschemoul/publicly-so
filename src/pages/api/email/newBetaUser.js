import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req, res) => {
  const body = JSON.parse(req.body);

  await fetch("https://www.publicly.so/api/logsnag", {
    method: "POST",
    body: JSON.stringify({
      channel: "new-beta-user",
      event: "New beta user",
      description: "A beta user has just signed up!",
      tags: {
        email: body.email,
        name: body.name,
        product: body.product,
      },
    }),
  });

  const userData = {
    to: body.email,
    from: {
      name: "Gabriel from Publicly",
      email: "hey@indiegab.dev",
    },
    templateId: "d-432dee59adbe4559ba929f44519a5cd5",
  };

  try {
    await mail.send(userData);
  } catch (error) {
    throw new Error("Email could not be sent, Please try again later");
  }

  res.status(200).json({ status: "Ok" });
};

export default handler;
