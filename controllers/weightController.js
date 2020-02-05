const helpers = require('../helpers/weightHelpers');

async function postNewWeight(req, res) {
  try {
    const newWeight = await helpers.postNewWeight(req.body);
    if (!newWeight) {
      res
        .status(500)
        .json({ message: 'There was a problem uploading a new weight' });
    }
    res.status(202).json({ message: 'Upload successful', data: req.body });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem uploading a new weight', error });
  }
}

async function getRecentWeightsById(req, res) {
  try {
    const weights = await helpers.getRecentWeightsById(req.user.id);
    if (!weights) {
      res
        .status(400)
        .json({ message: 'There was a problem retrieivng your data' });
    }
    res.status(200).json({ weights });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem retrieivng your data', error });
  }
}

async function getAllWeightsById(req, res) {
  try {
    const weights = await helpers.getAllWeightsById(req.user.id);
    if (!weights) {
      res
        .status(400)
        .json({ message: 'There was a problem retrieivng your data' });
    }
    res.status(200).json({ weights });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'There was a problem retrieivng your data', error });
  }
}

module.exports = {
  postNewWeight,
  getAllWeightsById,
  getRecentWeightsById,
};
