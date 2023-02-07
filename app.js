const express = require("express");
const app = express();

app.use(express.json())

const members = require("./members");

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
    res.status(404).send({ message: `There's no such member` });
  }
});

app.post('/api/members', (req, res)=>{
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
})

app.listen(3000, () => {
  console.log("Server is listening...");
});
