const moment = require("moment");

// const isDate = (value, { req, location, path }) => {
const isDate = (value) => {

    // console.log(value);
    // console.log(req, location, path);

    if (!value) { return false; }

    return moment(value).isValid();
};

module.exports = {
    isDate
};