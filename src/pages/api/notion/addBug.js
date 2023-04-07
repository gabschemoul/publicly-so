import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  console.log("d");
  const body = JSON.parse(req.body);
  const notion = new Client({ auth: body.token });

  let bugsPageId;
  let bugsListId;

  console.log("e");

  await notion.databases
    .query({
      database_id: body.database_id,
    })
    .then((result) => {
      console.log("f");
      result.results.forEach((page) => {
        if (page.properties.Name.title[0].text.content === "Bugs") {
          bugsPageId = page.id;
        }
      });
      if (bugsPageId === undefined) {
        console.log("g");
        res.status(500);
      }
    })
    .then(async () => {
      console.log("h");
      await notion.blocks.children
        .list({
          block_id: bugsPageId,
        })
        .then((result) => {
          console.log("i");
          return result.results;
        })
        .then((result) => {
          console.log("j");
          result.forEach((page) => {
            if (
              page.type === "child_database" &&
              page.child_database.title === "Bugs list"
            ) {
              bugsListId = page.id;
            }
          });
          if (bugsListId === undefined) {
            console.log("k");
            res.status(500);
          }
        })
        .then(async () => {
          console.log("l");
          const finalData = {
            parent: {
              type: "database_id",
              database_id: bugsListId,
            },
            properties: {
              Description: body.properties.Description,
              Title: body.properties.Title,
              Attachments: body.properties.Attachments,
              "Notify user": body.properties.Notify,
              Status: body.properties.Status,
              User: {
                relation: [
                  {
                    id: body.user.id,
                  },
                ],
              },
            },
          };
          console.log("m");
          await notion.pages.create(finalData).then(() => {
            console.log("n");
            res.status(200);
          });
          console.log("o");
        });
      console.log("p");
    });
  console.log("q");
}
