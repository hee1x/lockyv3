const { assert } = require("console");

var Booking = artifacts.require("./BookingContract.sol")

contract("BookingContract", function(accounts){
    it("does booking", function(){
        return Booking.deployed().then(function(instance){
            return instance.registerNewBooking("1", "Whai Hoe", "locker1", "Nicholas");
        });
    });

});