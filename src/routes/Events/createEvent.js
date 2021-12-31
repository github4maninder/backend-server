const {missingParameters} = require("../../library/eventsUtils");

module.exports = (req, res) =>
{
    if (!req.user) return res.status(400).send("Not Logged In.");
    

    if (missingParameters(req))
        return res.status(400).send("Not All Parameters Provided.");

    Events.create(
        {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            host: req.body.host,
            status: req.body.status,
            date: req.body.date,
            ownerId: req.user.id,
        })
        .then(function(eventData)
        {
            User.findOne(
                {
                    where:
                    {
                        id: req.user.id,
                    },
                })
                .then(function(userData)
                {
                    userData
                        .addEvents(eventData)
                        .then(function(success)
                        {
                            return res.json(
                            {
                                name: eventData.name,
                                location: eventData.location,
                                description: eventData.description,
                                host: eventData.host,
                                eventImage: eventData.eventImage,
                                status: eventData.status,
                                date: eventData.date,
                            });
                        })
                        .catch(function()
                        {
                            console.log(error);
                            return res.status(500).send("Internal Server Error.");
                        });
                })
                .catch(function()
                {
                    console.log(error);
                    return res.status(500).send("Internal Server Error.");
                });
        })
        .catch(function(error)
        {
            console.log(error);
            return res.status(500).send("Internal Server Error.");
        });
};