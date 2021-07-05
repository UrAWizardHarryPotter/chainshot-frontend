import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {ethers} from 'ethers';
import pohABI from '../pohABI.json';
import React, { useState, useEffect, Component } from 'react';
import { List, Segment, Button, Input, Container, Divider, Form } from 'semantic-ui-react';
import IdPool, { abi as IdPool_ABI }  from '../../artifacts/contracts/IdPool.sol/IdPool.json';

class Verified extends Component {
    state = {
      address: '',
      verification: false,
      value: '',
      recipient: ''
    }

  async pohHuman() {
    // connect to metamask
    await ethereum.request({ method: 'eth_requestAccounts' });

    // set up ethers provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    // connect to proof of humanity
    let POH_CONTRACT_ADDRESS = '0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb';
    // Parse poh ABI
    let POH_ABI = JSON.parse(pohABI.result);

    // Assign new PoH Web3 instance
    const pohContract = new ethers.Contract(POH_CONTRACT_ADDRESS, POH_ABI, provider);

    let result = await pohContract.functions.isRegistered(address);

    this.setState({ address: address, verification: result[0] })
    console.log(this.state);

    return;
  }

  componentDidMount() {
    this.pohHuman();
  }

  async onSubmit() {
    // To access Ether value, reference this.state.value
    let ethValue = ethers.utils.parseEther(this.state.value.toString());
    console.log(ethValue);

    // Assign idPoolContract to contract address after the sample-script is deployed
    const idPoolAddress ='0x5FbDB2315678afecb367f032d93F642f64180aa3';

    // call the smart contract's .send message
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(idPoolAddress, IdPool_ABI, provider)
      try {
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();

        // take the event that was emiited and do something
        const tx = await contract.send(signerAddress, this.state.recipient, ethValue);

        // this takes the transaction invokation and waits until it is mined... you can pass how many blocks you want to wait
        await tx.wait();

      } catch (err) {
        console.log("Error: ", err)
      }
    }

    // To access recipient address, reference this.state.recipient
    // checks if recipient is verified in IdPool


    // if recipient is verified, transfer money to them
  }


  render() {
    return (
    <Layout home>
      <Head>
      </Head>
      <Divider></Divider>
      <Container textAlign='center'>YOU ARE {this.state.verification == false ? 'NOT VERIFIED' : 'VERIFIED'}</Container>
      <Divider></Divider>
      <List>
        <List.Item>
          <List.Header>My Wallet Address</List.Header>{this.state.address}
        </List.Item>
      </List>
        {/* Build this form to verify */}
      <Form onSubmit={this.onSubmit} >
         <Form.Field>
          <label>Recipient Address</label>
          <Input
            value={this.state.recipient}
            onChange={event => this.setState({ recipient: event.target.value })}
          />
          </Form.Field>
          <Form.Field>
           <label>Amount in Ether</label>
             <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
             />
          </Form.Field>
          <Button type='submit'>Submit</Button>
      </Form>
    </Layout>
    )
  }

}

export default Verified;