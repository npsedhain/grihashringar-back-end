const assignId = model => {
  return model
    .find()
    .then(response => {
      if (!response.length) {
        return 1;
      }
      return response[response.length - 1]._id + 1;
    })
    .catch(error => {
      return null;
    });
};

module.exports = assignId;
