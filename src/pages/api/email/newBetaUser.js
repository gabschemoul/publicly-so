import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req, res) => {
  const body = JSON.parse(req.body);

  console.log("Entring newBetaUser.js");

  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Product: ${body.product}\r\n
  `;

  const data = {
    to: "gabschemoul@gmail.com",
    from: "hey@indiegab.dev",
    subject: "[Publicly] A new beta user has just signed up!",
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  const userData = {
    to: body.email,
    from: {
      name: "Gabriel from Publicly",
      email: "hey@indiegab.dev",
    },
    templateId: "d-432dee59adbe4559ba929f44519a5cd5",
  };

  console.log("About to send it");

  (async () => {
    try {
      await mail.send(data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
  (async () => {
    try {
      await mail.send(userData);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
  /*
  mail.send("data");
  mail.send(data).then(
    () => {
      console.log("data sent");
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
  mail.send("userData");
  mail.send(userData).then(
    () => {
      console.log("user data sent");
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
*/
  res.status(200).json({ status: "Ok" });
};

export default handler;
