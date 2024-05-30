import { Token } from './token'
import { SupportedChainId } from '../constants'
/**
 * Known WETH9 implementation addresses, used in our implementation of Ether#wrapped
 */
export const WETH9: { [chainId: number]: Token } = {
  [SupportedChainId.MODE]: new Token(SupportedChainId.MODE, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped ETH'),
}
