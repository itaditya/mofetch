export default (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  setTimeout(() => {
    res.end(JSON.stringify([
      {
        id: 1,
        name: 'User 1',
      },
      {
        id: 2,
        name: 'User 2',
      },
    ]));
  }, 1000);
};
