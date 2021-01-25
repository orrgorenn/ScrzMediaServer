const Building = require("../models/building");

exports.getBuildings = (req, res) => {
  Building.find()
    .then((buildings) => res.status(200).json(buildings))
    .catch((err) => res.status(400).json({ message: err }));
};

exports.getBuilding = (req, res) => {
  Building.findOne({ uid: req.params.id }).exec((err, building) => {
    if (err) return res.status(400).json({ message: "No such building." });

    return res.status(200).json(building);
  });
};

exports.createBuilding = (req, res) => {
  Building.findOne({ uid: req.body.uid }).exec((err, building) => {
    if (err || building)
      return res.status(400).json({
        message: `Building already registered for this ID. (${err.message})`,
      });

    const {
      uid,
      monthly_payment,
      image,
      title,
      city_code,
      last_updated_ip,
      status,
      master,
      rss,
      fullscreen,
    } = req.body;
    const _building = new Building({
      uid,
      monthly_payment,
      image,
      title,
      city_code,
      last_updated_ip,
      status,
      master,
      rss,
      fullscreen,
    });

    _building.save((err, building) => {
      if (err)
        return res
          .status(400)
          .json({ message: `Error while creating building. (${err.message})` });
      if (building)
        return res.status(201).json({ message: "Building Created." });
    });
  });
};

exports.editBuilding = (req, res) => {
  Building.update({ _id: req.params.id }, req.body).exec((err, user) => {
    if (err || !user)
      return res
        .status(400)
        .json({ message: "Error during updating building." });

    return res.status(200).json({ message: "Building updated successfully." });
  });
};

exports.deleteBuilding = (req, res) => {
  Building.remove({ _id: req.params.id }).exec((err, user) => {
    if (err) return res.status(400).json({ message: "No such building." });

    return res.status(200).json({ message: "Building deleted successfully." });
  });
};
