const express = require("express");
const app = express();

let members = require("./members");

app.use(express.json()); // 추가된 미들웨어

app.get("/api/members", (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMember = members.filter((m) => m.team === team);
    res.status(201).send(teamMember);
  } else {
    res.status(201).send(members);
  }
});

app.get("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    res.status(201).send(member);
  } else {
    res.status(404).send({ message: `There's no such member with the id` });
  }
});

app.post("/api/members", (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.status(201).send(newMember);
});

app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    for (prop in newInfo) {
      member[prop] = newInfo[prop];
    }
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.delete("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const membersCount = members.length;
  members = members.filter((member) => member.id !== Number(id));
  if (members.length < membersCount) {
    res.send({ message: "Deleted" });
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.listen(3003, () => {
  console.log("Server is listening...");
});
