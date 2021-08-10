import { PoolBalance } from '../components/TokenBalance'

export interface FormTradeData extends PoolBalance {
  // in reference to datatoken, buy = swap from ocean to dt ( buy dt) , sell = swap from dt to ocean (sell dt)
  type: 'buy' | 'sell'
  slippage: string
}

export interface TradeItem {
  amount: number
  token: string
  maxAmount: number
}

export const initialValues: FormTradeData = {
  ocean: undefined,
  datatoken: undefined,
  type: 'buy',
  slippage: '5'
}

export const slippagePresets = ['0.05', '0.1', '0.15', '0.25', '0.5']
export const tokensPresets = ['OCEAN', 'PHECOR-0', 'QUICKRA-0', 'DAI', 'USDT']

// validationSchema lives in components/organisms/AssetActions/Trade/FormTrade.tsx
