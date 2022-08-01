// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverterLib {
    function getPrice(AggregatorV3Interface priceRates)
        internal
        view
        returns (uint256)
    {
        (, int256 answer, , , ) = priceRates.latestRoundData();
        return uint256(answer * 10_000_000_000);
    }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceRates
    ) internal view returns (uint256) {
        uint256 priceInEth = getPrice(priceRates);
        return uint256((priceInEth * ethAmount) / 1_000_000_000_000_000_000);
    }
}
