const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
}

const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `http://www.google.com/map?q=${lat},${lng}`,
    createdAt:new Date().getTime()
  }
}

module.exports = { generateLocationMessage, generateMessage };