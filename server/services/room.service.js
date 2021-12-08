const { Room } = require("../models/room.model");
const { Cinema } = require("../models/cinemas.model");

module.exports.getCinemasRoom = async (req, res, next) => {
  //handdler get room of cinemas from room
  try {
    const listRoom = await Room.find();
    res.status(200).json(listRoom);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

//create room into cinemas
module.exports.newCinemasRoom = async (req, res, next) => {
  //handdler create room into cinemas
  try {
    const { cinemaId } = req.body;

    //create a new room
    const newRoom = new Room(req.body);
    //get cinema
    const cinema = await Cinema.findById(cinemaId);
    newRoom.cinemas = cinema;
    cinema.rooms.push(newRoom);
    //save the room
    await newRoom.save();
    //add room to the cinema's cinema array 'room'
    //save the cinema
    await cinema.save();
    res.status(201).json(newRoom);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.updateRoom = async (req, res, next) => {
  //handdler update room
  if (!req.body) {
    return res.status(400).send({ message: "Phòng không thể trống!" });
  }

  const id = req.params.id;
  Room.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Phòng không tồn tại!`,
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports.deleteRoom = async (req, res, next) => {
  //handdler delete cinemas
  try {
    const id = req.params.id;
    Room.findByIdAndUpdate(id, { status: "false" }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Phòng không tồn tại!`,
        });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
module.exports.getRoomById = async (req, res, next) => {
  //handdler delete cinemas
  try {
    const id = req.params.id;
    Room.findById(id).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Phòng không tồn tại!`,
        });
      } else {
        res.status(200).json(data);
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
