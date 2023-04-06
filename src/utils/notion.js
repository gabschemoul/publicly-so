export const addUser = async (data) => {
  const resp = await fetch("/api/notion/addUser", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const finalResp = await resp.json();

  return JSON.stringify(finalResp);
};

export const addBug = async (data, product, userEmail) => {
  await fetch("/api/notion/addBug", {
    method: "POST",
    body: JSON.stringify(data),
  });

  await fetch("https://www.publicly.so/api/logsnag", {
    method: "POST",
    body: JSON.stringify({
      channel: "new-bug",
      event: "New bug reported",
      description: "A user has just reported a bug!",
      tags: {
        product: product.name,
        title: data.properties.Title,
        description: data.properties.Description,
        email: userEmail,
      },
    }),
  });
};

export const addImprovement = async (data) => {
  await fetch("/api/notion/addImprovement", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const addFeature = async (data) => {
  await fetch("/api/notion/addFeature", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
