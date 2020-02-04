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

module.exports = {
  postNewWeight,
};
