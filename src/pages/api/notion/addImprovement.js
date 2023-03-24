import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const notion = new Client({ auth: body.token });

  let improvementsPageId;
  let improvementsListId;

  await notion.databases
    .query({
      database_id: body.database_id,
    })
    .then((result) => {
      result.results.forEach((page) => {
        if (page.properties.Name.title[0].text.content === "Improvements") {
          improvementsPageId = page.id;
        }
      });
      if (improvementsPageId === undefined) {
        res.status(500);
      }
    })
    .then(async () => {
      await notion.blocks.children
        .list({
          block_id: improvementsPageId,
        })
        .then((result) => {
          return result.results;
        })
        .then((result) => {
          result.forEach((page) => {
            if (
              page.type === "child_database" &&
              page.child_database.title === "Improvements list"
            ) {
              improvementsListId = page.id;
            }
          });
          if (improvementsListId === undefined) {
            res.status(500);
          }
        })
        .then(async () => {
          const finalData = {
            parent: {
              type: "database_id",
              database_id: improvementsListId,
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
          await notion.pages.create(finalData).then(() => {
            res.status(200);
          });
        });
    });
}
