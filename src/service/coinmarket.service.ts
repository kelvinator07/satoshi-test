import nodeCron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
import Coin from "../models/coin.model";
import coinRepository from "../repositories/coin.repository";

dotenv.config();

const coinGeckoUrl: string = process.env.COIN_GECKO_URL as string;
const cronTimer: string = process.env.CRON_TIMER as string;

export default class CoinMarketService {
  private coins: any;

  constructor() {
    this.coins = this.getTopCoinsLatestPrices();
    this.saveToDatabase(this.coins);
    this.cronJob();
  }

  async getTopCoinsLatestPrices() {
    try {
      const response = await axios.get(coinGeckoUrl);
      return response.data;
    } catch (error) {
      console.log("An Error occured ", error);
      return null;
    }
  }

  async fetchPricesEvery15mins() {
    const coins = await this.getTopCoinsLatestPrices();
    for (const coin of coins) {
      await coinRepository.update(coin);
    }
  }

  async saveToDatabase(response: any[]) {
    await Coin.bulkCreate(response, {
      fields: ["symbol", "name", "current_price"],
    });
  }

  cronJob() {
    nodeCron.schedule(cronTimer, this.fetchPricesEvery15mins);
  }
}

const data = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    current_price: 44160,
    market_cap: 863929376371,
    market_cap_rank: 1,
    fully_diluted_valuation: 927316729636,
    total_volume: 24917011489,
    high_24h: 44676,
    low_24h: 43134,
    price_change_24h: 810.08,
    price_change_percentage_24h: 1.86872,
    market_cap_change_24h: 15683853576,
    market_cap_change_percentage_24h: 1.84898,
    circulating_supply: 19564531,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -36.0442,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 65021.34677,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-09T00:00:58.854Z",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    current_price: 2358.47,
    market_cap: 283054038646,
    market_cap_rank: 2,
    fully_diluted_valuation: 283054038646,
    total_volume: 20725063116,
    high_24h: 2385.1,
    low_24h: 2341.39,
    price_change_24h: -1.2228903631521462,
    price_change_percentage_24h: -0.05182,
    market_cap_change_24h: -159104544.3626709,
    market_cap_change_percentage_24h: -0.05618,
    circulating_supply: 120220036.172264,
    total_supply: 120220036.172264,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -51.66159,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 544516.35035,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: [Object],
    last_updated: "2023-12-09T00:00:55.863Z",
  },
  {
    id: "tether",
    symbol: "usdt",
    name: "Tether",
    image:
      "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    current_price: 0.999978,
    market_cap: 90313892605,
    market_cap_rank: 3,
    fully_diluted_valuation: 90313892605,
    total_volume: 44347162953,
    high_24h: 1.002,
    low_24h: 0.998789,
    price_change_24h: -0.000568996861950999,
    price_change_percentage_24h: -0.05687,
    market_cap_change_24h: 195322513,
    market_cap_change_percentage_24h: 0.21674,
    circulating_supply: 90335643094.1393,
    total_supply: 90335643094.1393,
    max_supply: null,
    ath: 1.32,
    ath_change_percentage: -24.34046,
    ath_date: "2018-07-24T00:00:00.000Z",
    atl: 0.572521,
    atl_change_percentage: 74.84909,
    atl_date: "2015-03-02T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-09T00:00:26.917Z",
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
    current_price: 238.83,
    market_cap: 36744857678,
    market_cap_rank: 4,
    fully_diluted_valuation: 36744857678,
    total_volume: 908965126,
    high_24h: 239.95,
    low_24h: 232.55,
    price_change_24h: 5.49,
    price_change_percentage_24h: 2.35485,
    market_cap_change_24h: 918327634,
    market_cap_change_percentage_24h: 2.56326,
    circulating_supply: 153856150,
    total_supply: 153856150,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -65.20125,
    ath_date: "2021-05-10T07:24:17.097Z",
    atl: 0.0398177,
    atl_change_percentage: 599698.99034,
    atl_date: "2017-10-19T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-09T00:00:53.055Z",
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    current_price: 0.672728,
    market_cap: 36379328710,
    market_cap_rank: 5,
    fully_diluted_valuation: 67414264496,
    total_volume: 1764457257,
    high_24h: 0.673823,
    low_24h: 0.639625,
    price_change_24h: 0.02849618,
    price_change_percentage_24h: 4.42328,
    market_cap_change_24h: 1806607862,
    market_cap_change_percentage_24h: 5.22553,
    circulating_supply: 53957460767,
    total_supply: 99988170772,
    max_supply: 100000000000,
    ath: 3.4,
    ath_change_percentage: -80.19811,
    ath_date: "2018-01-07T00:00:00.000Z",
    atl: 0.00268621,
    atl_change_percentage: 24952.33243,
    atl_date: "2014-05-22T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-09T00:00:57.053Z",
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756",
    current_price: 75.01,
    market_cap: 31939635292,
    market_cap_rank: 6,
    fully_diluted_valuation: 42315941648,
    total_volume: 3662821036,
    high_24h: 74.99,
    low_24h: 68.01,
    price_change_24h: 7,
    price_change_percentage_24h: 10.29313,
    market_cap_change_24h: 3102063735,
    market_cap_change_percentage_24h: 10.75702,
    circulating_supply: 425973562.192782,
    total_supply: 564360620.80087,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -71.45347,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 0.500801,
    atl_change_percentage: 14718.1262,
    atl_date: "2020-05-11T19:35:23.449Z",
    roi: null,
    last_updated: "2023-12-09T00:00:59.469Z",
  },
  {
    id: "usd-coin",
    symbol: "usdc",
    name: "USDC",
    image:
      "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    current_price: 0.999691,
    market_cap: 24500076101,
    market_cap_rank: 7,
    fully_diluted_valuation: 24499055404,
    total_volume: 11499912584,
    high_24h: 1.001,
    low_24h: 0.995607,
    price_change_24h: -0.000176314036258174,
    price_change_percentage_24h: -0.01763,
    market_cap_change_24h: 195262418,
    market_cap_change_percentage_24h: 0.80339,
    circulating_supply: 24498195319.2211,
    total_supply: 24497174701.5021,
    max_supply: null,
    ath: 1.17,
    ath_change_percentage: -14.7737,
    ath_date: "2019-05-08T00:40:28.300Z",
    atl: 0.877647,
    atl_change_percentage: 13.87887,
    atl_date: "2023-03-11T08:02:13.981Z",
    roi: null,
    last_updated: "2023-12-09T00:00:53.380Z",
  },
  {
    id: "staked-ether",
    symbol: "steth",
    name: "Lido Staked Ether",
    image:
      "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
    current_price: 2354.32,
    market_cap: 21747474303,
    market_cap_rank: 8,
    fully_diluted_valuation: 21747474303,
    total_volume: 18555194,
    high_24h: 2383.93,
    low_24h: 2341.6,
    price_change_24h: 1.43,
    price_change_percentage_24h: 0.0607,
    market_cap_change_24h: 45571772,
    market_cap_change_percentage_24h: 0.20999,
    circulating_supply: 9228459.13673478,
    total_supply: 9228459.13673478,
    max_supply: 9228459.13673478,
    ath: 4829.57,
    ath_change_percentage: -51.19454,
    ath_date: "2021-11-10T14:40:47.256Z",
    atl: 482.9,
    atl_change_percentage: 388.11614,
    atl_date: "2020-12-22T04:08:21.854Z",
    roi: null,
    last_updated: "2023-12-09T00:00:56.463Z",
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    current_price: 0.546168,
    market_cap: 19189709851,
    market_cap_rank: 9,
    fully_diluted_valuation: 24676559063,
    total_volume: 1595695273,
    high_24h: 0.566338,
    low_24h: 0.453343,
    price_change_24h: 0.089688,
    price_change_percentage_24h: 19.64783,
    market_cap_change_24h: 3202190804,
    market_cap_change_percentage_24h: 20.02932,
    circulating_supply: 34994220267.1944,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -82.30978,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 2736.38223,
    atl_date: "2020-03-13T02:22:55.044Z",
    roi: null,
    last_updated: "2023-12-09T00:00:55.001Z",
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    current_price: 0.101484,
    market_cap: 14385640174,
    market_cap_rank: 10,
    fully_diluted_valuation: 14385653329,
    total_volume: 1405293372,
    high_24h: 0.103311,
    low_24h: 0.095875,
    price_change_24h: 0.00542869,
    price_change_percentage_24h: 5.65166,
    market_cap_change_24h: 756637059,
    market_cap_change_percentage_24h: 5.55167,
    circulating_supply: 142155146383.705,
    total_supply: 142155276383.705,
    max_supply: null,
    ath: 0.731578,
    ath_change_percentage: -86.12964,
    ath_date: "2021-05-08T05:08:23.458Z",
    atl: 0.0000869,
    atl_change_percentage: 116664.21949,
    atl_date: "2015-05-06T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-09T00:00:51.941Z",
  },
];
