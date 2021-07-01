// for 'tests/SampleTest.ts'

pragma solidity ^0.8.6;

contract SampleContract {

    function anything () public {}

    function alwaysFail () public pure {
        revert();
    }

    function returnSomething () public pure returns (uint) {
        return 5;
    }
}
