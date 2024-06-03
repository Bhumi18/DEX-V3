import { Protocol } from 'routersdk18';
import { Token, TradeType } from 'sdkcore18';
import _ from 'lodash';

import {
  // MixedRoute,
  RouteWithValidQuote,
  // V1Route,
  V3Route,
} from '../../../../routers';
import { ChainId } from '../../../../util';

import { CachedRoute } from './cached-route';

interface CachedRoutesParams {
  routes: CachedRoute<V3Route>[];
  chainId: ChainId;
  tokenIn: Token;
  tokenOut: Token;
  protocolsCovered: Protocol[];
  blockNumber: number;
  tradeType: TradeType;
  originalAmount: string;
  blocksToLive?: number;
}

/**
 * Class defining the route to cache
 *
 * @export
 * @class CachedRoute
 */
export class CachedRoutes {
  public readonly routes: CachedRoute<V3Route>[];
  public readonly chainId: ChainId;
  public readonly tokenIn: Token;
  public readonly tokenOut: Token;
  public readonly protocolsCovered: Protocol[];
  public readonly blockNumber: number;
  public readonly tradeType: TradeType;
  public readonly originalAmount: string;

  public blocksToLive: number;

  /**
   * @param routes
   * @param chainId
   * @param tokenIn
   * @param tokenOut
   * @param protocolsCovered
   * @param blockNumber
   * @param tradeType
   * @param originalAmount
   * @param blocksToLive
   */
  constructor({
    routes,
    chainId,
    tokenIn,
    tokenOut,
    protocolsCovered,
    blockNumber,
    tradeType,
    originalAmount,
    blocksToLive = 0,
  }: CachedRoutesParams) {
    this.routes = routes;
    this.chainId = chainId;
    this.tokenIn = tokenIn;
    this.tokenOut = tokenOut;
    this.protocolsCovered = protocolsCovered;
    this.blockNumber = blockNumber;
    this.tradeType = tradeType;
    this.originalAmount = originalAmount;
    this.blocksToLive = blocksToLive;
  }

  /**
   * Factory method that creates a `CachedRoutes` object from an array of RouteWithValidQuote.
   *
   * @public
   * @static
   * @param routes
   * @param chainId
   * @param tokenIn
   * @param tokenOut
   * @param protocolsCovered
   * @param blockNumber
   * @param tradeType
   * @param originalAmount
   */
  public static fromRoutesWithValidQuotes(
    routes: RouteWithValidQuote[],
    chainId: ChainId,
    tokenIn: Token,
    tokenOut: Token,
    protocolsCovered: Protocol[],
    blockNumber: number,
    tradeType: TradeType,
    originalAmount: string
  ): CachedRoutes | undefined {
    if (routes.length == 0) return undefined;

    const cachedRoutes = _.map(
      routes,
      (route: RouteWithValidQuote) =>
        new CachedRoute({ route: route.route, percent: route.percent })
    );

    return new CachedRoutes({
      routes: cachedRoutes,
      chainId,
      tokenIn,
      tokenOut,
      protocolsCovered,
      blockNumber,
      tradeType,
      originalAmount,
    });
  }

  /**
   * Function to determine if, given a block number, the CachedRoute is expired or not.
   *
   * @param currentBlockNumber
   */
  public notExpired(currentBlockNumber: number): boolean {
    return currentBlockNumber - this.blockNumber <= this.blocksToLive;
  }
}
