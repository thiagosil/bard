import mongoose from 'mongoose';

let request = require('request-json');

// Create a `schema` for the `Todo` object
let championSchema = new mongoose.Schema({
  name: { type : String },
  riotId: { type: Number},
  key: { type: String }
});

championSchema.statics.populateChampions = function(cb) {
  let championsUrl = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=c4ff4533-ac86-45d0-b871-8c536c48c977";
  let client = request.createClient(championsUrl);

  client.get('', function(err, res, body) {
    let champions = [];

    let keys = Object.keys(body.data);

    keys.forEach( element => {
      let champion = new Champion({
        name: body.data[element].name,
        riotId: body.data[element].id,
        key: body.data[element].key });

      getChampionData(champion).then(function(result) {
        if(result)
          currentChampion._id = result._id;

        createOrUpdateChampion(champion);
      });

    });

    return champions;
  });
};

let getChampionData = function (champion)
{
  let promise = Champion.findOne({ name: champion.name }).exec();
  return promise;
}

let createOrUpdateChampion = function(champion){
  var query = { name: champion.name },
    options = { upsert: true, new: true, setDefaultsOnInsert: true};

  Champion.findOneAndUpdate(query, champion, options, function(error, champion) {
    if (error)
      throw error;

     champion;
  });
}

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)

let Champion = mongoose.model('Champion', championSchema);
export default Champion;
