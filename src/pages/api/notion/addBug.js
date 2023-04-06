import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  console.log("api notion addBug");
  const body = JSON.parse(req.body);
  const notion = new Client({ auth: body.token });

  let bugsPageId;
  let bugsListId;

  console.log("api notion addBug await notion.databases.query");
  await notion.databases
    .query({
      database_id: body.database_id,
    })
    .then((result) => {
      result.results.forEach((page) => {
        if (page.properties.Name.title[0].text.content === "Bugs") {
          bugsPageId = page.id;
        }
      });
      if (bugsPageId === undefined) {
        res.status(500);
      }
    })
    .then(async () => {
      console.log("api notion addBug await notion.blocks.children.list");
      await notion.blocks.children
        .list({
          block_id: bugsPageId,
        })
        .then((result) => {
          return result.results;
        })
        .then((result) => {
          result.forEach((page) => {
            if (
              page.type === "child_database" &&
              page.child_database.title === "Bugs list"
            ) {
              bugsListId = page.id;
            }
          });
          if (bugsListId === undefined) {
            res.status(500);
          }
        })
        .then(async () => {
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
          console.log("api notion addBug await notion.pages.create(finalData)");
          await notion.pages.create(finalData).then(() => {
            res.status(200);
          });
        });
    });
}
