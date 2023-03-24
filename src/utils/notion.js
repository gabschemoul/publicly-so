export const addUser = async (data) => {
  const resp = await fetch("/api/notion/addUser", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const finalResp = await resp.json();

  return JSON.stringify(finalResp);
};

export const addBug = async (data) => {
  await fetch("/api/notion/addBug", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const addImprovement = async (data) => {
  await fetch("/api/notion/addImprovement", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
