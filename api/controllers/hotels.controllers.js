var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectID;
var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function (req, res) {

    var db = dbconn.get();

    var offset = 0;
    var count = 5;

    var collection = db.collection('hotel');

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset,10);
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count,10);
    }


    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function (err, docs) {
            console.log("Found hotels", docs.length);
            res
                .status(200)
                .json(docs);
        });

};

module.exports.hotelsGetOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotel');

    var hotelId = req.params.hotelId;
    console.log('GET hotelId', hotelId);

    collection
        .findOne({
            _id : ObjectId(hotelId)
        }, function(err, doc) {
            res
                .status(200)
                .json(doc);
        });



    // var hotelId = req.params.hotelId;
    // var thisHotel = hotelData[hotelId];
    //
    // console.log("Get hotelId", hotelId);
    // res
    //     .status(200)
    //     .json(thisHotel);
};

module.exports.hotelsAddOne = function (req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotel');
    var newHotel;

    console.log("Post new hotel");

    if (req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        collection.insertOne(newHotel, function(err, response) {
            console.log("Hotel added", response);
            console.log("Hotel added", response.ops);
            res
                .status(201)
                .json(response.ops);
        });
     } else {
      console.log("Data missing from body");
      res
          .status(400)
          .json({message: "Required data missing from body"})
      }

};



















