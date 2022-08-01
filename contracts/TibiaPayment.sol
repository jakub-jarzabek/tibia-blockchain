//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "./PriceConverter.sol";

contract TibiaPayment {
    using PriceConverterLib for uint256;
    error TibiaPayment__Not_Enough_Eth();

    event PaymentSuccessful(uint32 accountId, uint32 ppAmount);

    address payable public immutable i_owner;
    mapping(uint8 => uint32) public rates;

    AggregatorV3Interface private s_priceConverter;

    constructor(
        uint8[] memory _eurPrices,
        uint32[] memory _ppAmount,
        address _priceConverter
    ) {
        for (uint8 i = 0; i < _eurPrices.length; i++) {
            rates[_eurPrices[i]] = _ppAmount[i];
        }
        i_owner = payable(msg.sender);
        s_priceConverter = AggregatorV3Interface(_priceConverter);
    }

    function donate(uint32 _accountId, uint8 _eurPrice)
        public
        payable
        returns (bool success)
    {
        console.log(msg.value);
        console.log(msg.value.getConversionRate(s_priceConverter));

        if (
            msg.value.getConversionRate(s_priceConverter) < _eurPrice * 10**18
        ) {
            revert TibiaPayment__Not_Enough_Eth();
        }
        emit PaymentSuccessful(_accountId, rates[_eurPrice]);
        return true;
    }
}
