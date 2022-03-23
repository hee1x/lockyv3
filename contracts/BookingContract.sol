// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.12;

contract BookingContract {
    
    struct Booking {
        uint bookingNo;
        string documentNo;
        string receiver;
        string locker;
        string booker;
        bool collected;
    }
        
    mapping(uint => Booking) public bookingList;
    uint public bookingCount;
    
    function registerNewBooking (
        string memory _documentNo,
        string memory _receiver, 
        string memory _locker,
        string memory _booker

    ) public {
        bookingCount ++;
        bookingList[bookingCount] = Booking(bookingCount, _documentNo,_receiver, _locker, _booker, false); 
    }
    function collected(
        uint _bookingNo,
        string memory _documentNo, 
        string memory _receiver, 
        string memory _locker, 
        string memory _booker

    ) public{

    bookingList[_bookingNo] = Booking(_bookingNo, _documentNo,_receiver, _locker, _booker, true); 
}

}
