module.exports = (req, res) => {
  if (!req.user) return res.status(403).send("Not Logged In.");
  if (!req.params.id || !req.params.blockId) return res.status(400).send("Not All Parameters Provided.");

  User.findOne(
    {
      where:
      {
        id: req.user.id,
      },
    },
  )
    .then((userData) => {
      User.findOne(
        {
          where:
          {
            id: req.params.blockId,
          },
        },
      )
        .then((blockData) => {
          userData
            .addBlocked(blockData)
            .then(() => res.json(userData))
            .catch((error) => {
              console.log(error);
              return res.status(500).send("Internal Server Error.");
            });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).send("Internal Server Error.");
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send("Internal Server Error.");
    });
};
