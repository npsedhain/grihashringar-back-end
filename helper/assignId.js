const assignId = (model) => {
  return model.find()
    .then(response => {
      return response.length + 1;
    })
    .catch(error => {
      return null;
    });
};

module.exports = assignId;