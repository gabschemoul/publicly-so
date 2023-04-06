export const addUser = async (data) => {
  const resp = await fetch("/api/notion/addUser", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const finalResp = await resp.json();

  return JSON.stringify(finalResp);
};

export const addBug = async (data, product, userEmail) => {
  console.log("utils notion addBug");
  await fetch("/api/notion/addBug", {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log("utils notion logsnag");
  await fetch("/api/logsnag", {
    method: "POST",
    body: JSON.stringify({
      channel: "new-bug",
      event: "New bug reported",
      description: "A user has just reported a bug!",
      tags: {
        product: product.name,
        title: data.properties.Title.title[0].text.content,
        description: data.properties.Description.rich_text[0].text.content,
        email: userEmail,
      },
    }),
  });
  console.log("utils notion end");
};

export const addImprovement = async (data, product, userEmail) => {
  await fetch("/api/notion/addImprovement", {
    method: "POST",
    body: JSON.stringify(data),
  });

  await fetch("https://www.publicly.so/api/logsnag", {
    method: "POST",
    body: JSON.stringify({
      channel: "new-improvement",
      event: "New improvement suggested",
      description: "A user has just suggested an improvement!",
      tags: {
        product: product.name,
        title: data.properties.Title.title[0].text.content,
        description: data.properties.Description.rich_text[0].text.content,
        email: userEmail,
      },
    }),
  });
};

export const addFeature = async (data, product, userEmail) => {
  await fetch("/api/notion/addFeature", {
    method: "POST",
    body: JSON.stringify(data),
  });

  await fetch("https://www.publicly.so/api/logsnag", {
    method: "POST",
    body: JSON.stringify({
      channel: "new-feature-request",
      event: "New feature requested",
      description: "A user has just requested a new feature!",
      tags: {
        product: product.name,
        title: data.properties.Title.title[0].text.content,
        description: data.properties.Description.rich_text[0].text.content,
        email: userEmail,
      },
    }),
  });
};
