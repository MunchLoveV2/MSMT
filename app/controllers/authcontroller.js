var exports = (module.exports = {});
var db = require("../models");
const yelp = require('yelp-fusion');
var apiKey = '81fLxhTR0I7D6azLHNAUlu88BxvFgonIl8rD-oguXUftxtdkI5DjI0AB8SEQ1w2uG3N5WobKaHuyY-Hng_jhLPFHYeuptXgzycy2gEbJxg-V_TU8wJ4A35ASpsWVW3Yx';

exports.signup = function(req, res) {
  res.json(req.user);
};
exports.error = function(req, res) {
  res.json("error");
};
exports.login = function(req, res) {
  console.log("lol");
};



exports.searchresults = function(req, res) {
  const location = req.params.location;

  // Place holder for Yelp Fusion's API Key. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const apiKey = '81fLxhTR0I7D6azLHNAUlu88BxvFgonIl8rD-oguXUftxtdkI5DjI0AB8SEQ1w2uG3N5WobKaHuyY-Hng_jhLPFHYeuptXgzycy2gEbJxg-V_TU8wJ4A35ASpsWVW3Yx';

  const searchRequest = {
    term:'coffee',
    location: location
  };

  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {

    var businesses = [];

      
    response.jsonBody.businesses.forEach(business => {
      var dataObject = {
        businessID: business.id,
        name: business.name,
        rating: business.rating,
        phone: business.phone,
        image: business.image_url,
        price: business.price
      }  
        businesses.push(dataObject);
    });

    res.json(businesses);

    

  }).catch(e => {
    console.log(e);
  });
};

exports.favorites = function(req, res) {
  db.Userfavorite.findAll({
    where: {
      UserinfoId: req.user.id
    }
  }).then(function(data) {

    const businesses = []
 

    data.forEach(business => {
      businesses.push(business.dataValues);
    })

    res.json(businesses);

  });

};

exports.aboutus = function(req, res) {
};


exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};

exports.frontpage = function(req, res) {
  console.log("HELLLOOOOOO>>>>>>>>>", req.user);
  console.log(req.isAuthenticated());
};

exports.front = function(req, res) {
  res.redirect("/frontpage");
};
