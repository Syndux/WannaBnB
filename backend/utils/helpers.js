const prettifyDateTime = (objectArray) => {
  objectArray.forEach((object) => {
    object.dataValues.createdAt = object.createdAt
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
    object.dataValues.updatedAt = object.updatedAt
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
  });
};

module.exports = {
  prettifyDateTime,
};
