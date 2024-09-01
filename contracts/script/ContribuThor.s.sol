// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ContribuThor} from "../src/ContribuThor.sol";

contract ContribuThorScript is Script {
    ContribuThor public contribuThor;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        contribuThor = new ContribuThor();

        vm.stopBroadcast();
    }
}
