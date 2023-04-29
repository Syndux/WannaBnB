const prettifyTimestamp = (timestamp) => {
  return timestamp.toISOString().replace("T", " ").substring(0, 19);
};

const prettifyDatestamp = (datestamp) => {
  return datestamp.toISOString().replace("T", " ").substring(0, 10);
}

const prettifyDateTime = (objectArray) => {
  if (Array.isArray(objectArray)) {
    objectArray.forEach((object) => {
      object.dataValues.createdAt = prettifyTimestamp(object.createdAt);
      object.dataValues.updatedAt = prettifyTimestamp(object.updatedAt);
    });
  } else {
    objectArray.dataValues.createdAt = prettifyTimestamp(objectArray.createdAt);
    objectArray.dataValues.updatedAt = prettifyTimestamp(objectArray.updatedAt);
  }
};

const prettifyStartEnd = (objectArray) => {
  if (Array.isArray(objectArray)) {
    objectArray.forEach((object) => {
      object.dataValues.startDate = prettifyDatestamp(object.startDate);
      object.dataValues.endDate = prettifyDatestamp(object.endDate);
    });
  } else {
    objectArray.dataValues.startDate = prettifyDatestamp(objectArray.startDate);
    objectArray.dataValues.endDate = prettifyDatestamp(objectArray.endDate);
  }
};

module.exports = {
  prettifyDateTime, prettifyStartEnd
};
