// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DMT is ERC20 {
    constructor(uint256 initialSupply) ERC20("Dream Meme Token", "DMT") {
        _mint(msg.sender, initialSupply);
    }
}
