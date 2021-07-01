import React, {useState,useEffect} from 'react';
import {Text, View, StyleSheet,TextInput} from 'react-native';
import Button from '../components/Button';
import CopyTextBox from '../components/CopyTextBox';
import {theme} from '../services/Common/theme';
import CButton from '../components/CButton';
//import sendOnlyone from '../components/SendTokens'
//import ApproveLiquidity from '../components/ApproveLiquidity'
//import AddDTLiquidity from '../components/AddDTLiquidity'
//import getCurrentTokens from '../components/AddDTLiquidity'
//import Joinswap from '../components/Joinswap'
//import JoinswapExternAmountIn from '../components/JoinswapExternAmountIn'
import * as StakesUtil from '../components/AddDTLiquidity'
import {contracts, web3} from '../web3/utils'
import {OceanPool}  from '../components/OceanPool'

const ocean = new OceanPool()

 export const UnStakeDT = async(account, poolAddress, amount, naximumPoolShares) => {
    try{
      //await ocean.removeDTLiquidity(contracts.walletAddress,contracts.newPool2,'20','0.5')       
      await ocean.removeDTLiquidity(account, poolAddress, amount, naximumPoolShares)       
      }  catch(error) {
      
    }
  }
 
  export const ApproveLiquidity = async(account, tokenAddress, spender, amount ) => {
    try{

      //const dtAddress = await ocean.getDTAddress(spender)
      await ocean.approve(account,tokenAddress,spender,amount)
      //console.log({spender: contracts.newPool3, dtAddress: dtAddress})
           
    }
    catch(error) {
      
    }
  }

  export const StakeDT = async(account, poolAddress, amount) =>{

    try {
    await ocean.addDTLiquidity(account, poolAddress, amount)
    
    } catch (error) {
      
    }
}

