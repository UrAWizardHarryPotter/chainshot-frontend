const IPFS = require('ipfs-mini');
const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

function uploadIPFS(data) {
    const data = "hey I'm a human!";
    ipfs.add(data, (err, hash) => {
        if(err) {
            return console.log(err);
        }
        console.log("Profile was stored")
        return("https://ipfs.infura.io/ipfs/" + hash);
    });
}