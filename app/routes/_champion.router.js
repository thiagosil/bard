import Champion from '../models/champion.model';

export default (app, router) => {

  // ### Champion API Routes

  // Define routes for the champion item API

  router.route('/champion')

    // ### Create a champion item

    // Accessed at POST http://localhost:8080/api/champion

    // Create a champion item
    .post((req, res) => {

      Champion.create({

        name : req.body.name,
        riotId: req.body.riotId


      }, (err, champion) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Champion created: ${champion}`);

        Champion.find((err, champion) => {
          if(err)
            res.send(err);

          res.json(champion);
        });
      });
    })

    // ### Get all of the champion items

    // Accessed at GET http://localhost:8080/api/champion
    .get((req, res) => {

      // Use mongoose to get all champion items in the database
      Champion.find((err, champions) => {

        if(err)
          res.send(err);
        else
        {
            Champion.populateChampions(function(err, result) {
        });
          res.json(champions);
        }

      }).sort('name');
    });

  router.route('/champion/:champion_id')

    // ### Get a champion item by ID

    // Accessed at GET http://localhost:8080/api/champion/:champion_id
    .get((req, res) => {

      // Use mongoose to a single champion item by id in the database
      Champion.findOne(req.params.champion_id, (err, champion) => {

        if(err)
          res.send(err);

        else
          res.json(champion);
      });
    })

    // ### Update a champion item by ID

    // Accessed at PUT http://localhost:8080/api/champion/:champion_id
    .put((req, res) => {

      // use our champion model to find the champion item we want
      Champion.findOne({

        '_id' : req.params.champion_id

      }, (err, champion) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.text)
          champion.name = req.body.text;
          champion.riotId = req.body.riotId;

        // save the champion item
        return champion.save((err) => {

          if (err)
            res.send(err);

          return res.send(champion);

        });
      });
    })

    // ### Delete a champion item by ID

    // Accessed at DELETE http://localhost:8080/api/champion/:champion_id
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete champion with id: ${req.params.champion_id}`);

      Champion.remove({

        _id : req.params.champion_id
      }, (err, champion) => {

        if(err)
          res.send(err);

        console.log('Champion successfully deleted!');

        Champion.find((err, champions) => {
          if(err)
            res.send(err);

          res.json(champions);
        });
      });
    });
};
