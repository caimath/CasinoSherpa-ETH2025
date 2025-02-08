// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;
    uint256 public minimumBet;

    event BetResult(address indexed player, uint256 amountBet, bool win);

    constructor(uint256 _minimumBet) {
        owner = msg.sender;
        minimumBet = _minimumBet;
    }

    // Fonction de pari (pile ou face)
    function bet() external payable {
        require(msg.value >= minimumBet, "Mise insuffisante");

        // Pseudo-aléatoire (NON sécurisé en prod)
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 2;
        bool win = (random == 1);

        if (win) {
            uint256 winAmount = msg.value * 2;
            require(address(this).balance >= winAmount, "Fonds insuffisants");
            payable(msg.sender).transfer(winAmount);
        }

        emit BetResult(msg.sender, msg.value, win);
    }
}