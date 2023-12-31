const assert = require('assert');
const ganache = require('ganache-cli');
const { Web3 }  = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach( async ()=> {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Deploys a contract to one of the fetched accounts
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [] })
        .send({ from: accounts[0], gas: '1000000' });

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(inbox);
    });
});