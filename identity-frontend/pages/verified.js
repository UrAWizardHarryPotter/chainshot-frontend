import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {ethers} from 'ethers';
import pohABI from '../pohABI.json';
import React, { useState, useEffect, Component } from 'react';
import { List, Segment, Button, Input, Container, Divider, Form } from 'semantic-ui-react';
import

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

    // To access recipient address, reference this.state.recipient

    // if it does, we can transfer money to it (just use ethers on the front end)
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