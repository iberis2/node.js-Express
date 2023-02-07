const express = require("express");
const app = express();

const members = require("./members");

app.get("/api/members", (req, res) => {
  res.send(members);
});

app.get("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    res.status(200).send(member);
  } else {
    res.status(404).send({ message: `There's no such member` });
  }
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
