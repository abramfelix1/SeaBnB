const setPreview = (spots) => {
  if (spots[0].dataValues.id) {
    for (const i in spots) {
      if (spots[i].dataValues.previewImage.length) {
        const url = spots[i].dataValues.previewImage[0].dataValues.url;
        spots[i].dataValues.previewImage = url;
      } else {
        spots[i].dataValues.previewImage = "Preview Image Unavailable";
      }
    }
  }
};

module.exports = {
  setPreview,
};
