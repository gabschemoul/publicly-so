import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const notion = new Client({ auth: body.token });

  let featuresPageId;
  let featuresListId;

  await notion.databases
    .query({
      database_id: body.database_id,
    })
    .then((result) => {
      result.results.forEach((page) => {
        if (
          page.properties.Name.title[0].text.content === "Requested Features"
        ) {
          featuresPageId = page.id;
        }
      });
      if (featuresPageId === undefined) {
        res.status(500).send("Requested Features page not found");
      }
    })
    .then(async () => {
      await notion.blocks.children
        .list({
          block_id: featuresPageId,
        })
        .then((result) => {
          return result.results;
        })
        .then((result) => {
          result.forEach((page) => {
            if (
              page.type === "child_database" &&
              page.child_database.title === "Requested Features list"
            ) {
              featuresListId = page.id;
            }
          });
          if (featuresListId === undefined) {
            res.status(500).send("Requested Features list not found");
          }
        })
        .then(async () => {
          const finalData = {
            parent: {
              type: "database_id",
              database_id: featuresListId,
            },
            properties: {
              Description: body.properties.Description,
              Title: body.properties.Title,
              Attachments: body.properties.Attachments,
              "Notify user": body.properties.Notify,
              Status: body.properties.Status,
              Upvotes: body.properties.Upvotes,
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
            res.status(200).send("Requested feature sent");
          });
        });
    });
}
