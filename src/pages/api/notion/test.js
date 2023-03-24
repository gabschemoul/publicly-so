import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  /*const notion = new Client({
    auth: "secret_X4QpDn54IoNTt2TPAM8M1Q6bpozSv0vAtdcfcYSlpsW",
  });

  await notion.databases
    .query({
      database_id: "0af7796538ca4428b6b2cb541a594ede",
    })
    .then((result) => {
      res.status(200).json(result);
    });*/
  /*await notion.databases
    .query({
      database_id: "3e7af979b64c4fcbafde10eabe2f78a4",
    })
    .then((result) => {
      result.results.forEach((user) => {
        console.log(user.properties);
      });
      res.status(200).json(result.results[1]);
    });*/
  /*const data = {
    properties: {
      Email: {
        email: "carlou@gmail.com",
      },
      Name: {
        title: [
          {
            text: {
              content: "Carlou Thomou",
            },
          },
        ],
      },
    },
  };*/
  /*await fetch("/api/notion/addUser", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => {
    res.status(200).json(response);
  });*/
  /*await fetch("/hello").then((response) => {
    res.status(200).json(response);
  });*/
}
