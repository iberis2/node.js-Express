const express = require('express');

const app = express();

const db = require('./models');
const { Member } = db;

app.use(express.json());

app.get('/api/members', async (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = await Member.findAll({
      where: { team },
      order: [['id', 'DESC']],
    });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll({ order: [['id', 'ASC']] });
    res.send(members);
  }
});

app.get('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({ where: { id } });
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({
      message: `Member with id ${id} not found~~!`,
    });
  }
});

app.post('/api/members', async (req, res) => {
  const newMember = req.body;
  const member = Member.build(newMember);
  await member.save();
  res.send(member);
});

app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const result = await Member.update(newInfo, { where: { id } });
  if (result[0]) {
    res.send({ message: `Member with id ${id} updated` });
  } else {
    res.status(404).send({
      message: `Member with id ${id} not found~~!`,
    });
  }
});

app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = await Member.findOne({ where: { id } });
  if (member) {
    Object.assign(member, newInfo);
    res.send(member);
    member.save();
  } else {
    res.status(404).send({
      message: `Member with id ${id} not found~~!`,
    });
  }
});

app.delete('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCount = await Member.destroy({ where: { id } });

  if (deletedCount) {
    res.send({ message: `Member with id ${id} deleted` });
  } else {
    res.status(404).send({
      message: `Member with id ${id} not found~~!`,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});
