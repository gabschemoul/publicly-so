import mail from "@sendgrid/mail";
//import client from "@sendgrid/client";

mail.setApiKey(process.env.SENDGRID_API_KEY);
//client.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req, res) => {
  const body = JSON.parse(req.body);

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
  /*
  const currentDate = new Date();
  const formatedDate =
    currentDate.getMonth() +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear();

  const contactData = [
    {
      email: body.email,
      full_name: body.name,
      product: body.product,
      sign_up_date: formatedDate,
    },
  ];

  const headers = {
    "on-behalf-of":
      "The subuser's username. This header generates the API call as if the subuser account was making the call.",
  };

  const request = {
    url: `/v3/contactdb/recipients`,
    method: "POST",
    headers: headers,
    body: contactData,
  };

  client
    .request(request)
    .then(([response, body]) => {
      console.log("response.statusCode");
      console.log(response.statusCode);
      console.log("response.body");
      console.log(response.body);
      console.log("body");
      console.log(body);
    })
    .catch((error) => {
      console.error("error");
      console.error(error);
      console.log("error.response");
      console.log(error.response);
      console.log("error.response.body");
      console.log(error.response.body);
    });
*/
  mail.send(data);
  mail.send(userData);

  res.status(200).json({ status: "Ok" });
};

export default handler;

/*import { mailOptions, transporter } from "@/nodemailer/config";

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    try {
      await transporter.sendMail({
        ...mailOptions,
        //...generateEmailContent(data),
        subject: data.subject,
        text: "test, ça marche",
        html: "<h1>Test</h1><p>Ca marche!</p>",
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};

export default handler;*/
