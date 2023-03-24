import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const notion = new Client({ auth: body.token });

  let usersPageId;
  let usersListId;

  await notion.databases
    .query({
      database_id: body.database_id,
    })
    .then((result) => {
      result.results.forEach((page) => {
        if (page.properties.Name.title[0].text.content === "Users") {
          usersPageId = page.id;
        }
      });
      if (usersPageId === undefined) {
        res.status(400).end();
      }
    })
    .then(async () => {
      await notion.blocks.children
        .list({
          block_id: usersPageId,
        })
        .then((result) => {
          return result.results;
        })
        .then((result) => {
          result.forEach((page) => {
            if (
              page.type === "child_database" &&
              page.child_database.title === "Users list"
            ) {
              usersListId = page.id;
            }
          });
          if (usersListId === undefined) {
            res.status(400).end();
          }
        })
        .then(async () => {
          const finalData = {
            parent: {
              type: "database_id",
              database_id: usersListId,
            },
            properties: body.user.properties,
          };

          await notion.databases
            .query({
              database_id: usersListId,
            })
            .then(async (result) => {
              let userId;
              result.results.forEach((user) => {
                if (
                  user.properties.Email.email.toLowerCase() ===
                  body.user.properties.Email.email.toLowerCase()
                ) {
                  userId = user.id;
                }
              });

              if (userId) {
                res.status(200).json({ id: userId });
              } else {
                await notion.pages.create(finalData).then((result) => {
                  res.status(200).json({ id: result.id });
                });
              }
            });
          /*await notion.pages.create(finalData).then((result) => {
            res.status(200);
          });*/
        });
    });
}
