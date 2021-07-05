//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

/**
Contract creates a pool of unique humans
-Humanity is verified though Proof of Personhood protocols
-Data for each human is stored in IPFS
-Verified users can add more addresses and contacts, and send moeny to each other
*/

import "hardhat/console.sol";

contract IdPool {

    /* Storage */

    uint public identityId;     // Identity number
    mapping(uint => Identity) identities; // Maps an Id number to an Identity

    /* Structs */

    struct Identity {
        uint identityId; // Identity Number
        address owner; // Main user address
        string metadataCID; // User profile data stored in IPFS
        //address[] validAddresses; // Array of valid addresses held by user
    }

    /* Events */

    event IdentityCreated(
        Identity identityTx
    );

    event Verified(
        uint iId
    );

    event NewTx(
        uint date,
        address indexed from,
        address to,
        uint amount
    );


    constructor() {
        identityId = 1;
    }

    // ************************ //
    // *       Identity       * //
    // ************************ //

    function createIdentity(
        string memory _metadataCID,
        address _owner)
        external {
            require(_owner == msg.sender);


            Identity memory identityTx = Identity({
                identityId: identityId,
                owner: _owner,
                metadataCID: _metadataCID
            });

            identities[identityId] = identityTx;
            identityId++;
            emit IdentityCreated(identityTx);
    }

    function verifyIdentity(
        uint _identityId,
        address _owner)
        private returns (bool) {
            if(identities[_identityId].owner == _owner) {
                emit Verified(_identityId);
                return true;
            } else {
                return false;
            }
    }

    // ************************ //
    // *     Functionality    * //
    // ************************ //

    function send(uint _identityId, address payable recipient, uint amount) public payable {
        require(verifyIdentity(_identityId, recipient));

        recipient.transfer(amount);

        emit NewTx(block.timestamp, msg.sender, recipient, amount);
    }


}