const BookingContract = artifacts.require("BookingContract");

module.exports = function (deployer) {
  deployer.deploy(BookingContract);
};
