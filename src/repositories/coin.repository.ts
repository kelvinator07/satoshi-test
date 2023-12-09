import { Op } from "sequelize";
import Coin from "../models/coin.model";

interface ICoinRepository {
  retrieveAll(searchParams: {
    title: string;
    symbol: string;
  }): Promise<{
    totalItems: any;
    coins: any;
    totalPages: number;
    currentPage: number;
  }>;
  retrieveById(coinId: number): Promise<Coin | null>;
  update(coin: Coin): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data: any, page: number, limit: number) => {
  const { count: totalItems, rows: coins } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, coins, totalPages, currentPage };
};

class CoinRepository implements ICoinRepository {
  async retrieveAll(searchParams: {
    name?: string;
    symbol?: string;
    page?: number;
    size?: number;
  }): Promise<{
    totalItems: any;
    coins: any;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const condition: SearchCondition = {};

      if (searchParams?.name) {
        condition.name = { [Op.iLike]: `%${searchParams.name}%` };
      }

      if (searchParams?.symbol) {
        condition.symbol = { [Op.iLike]: `%${searchParams.symbol}%` };
      }

      const options = {
        where: condition,
      };

      const page = Number(searchParams?.page);
      const size = Number(searchParams?.size);

      const { limit, offset } = getPagination(page, size);

      const data = await Coin.findAndCountAll({ ...options, limit, offset });

      return getPagingData(data, page, limit);
    } catch (error) {
      throw new Error("Failed to retrieve Coins!");
    }
  }

  async retrieveById(coinId: number): Promise<Coin | null> {
    try {
      return await Coin.findByPk(coinId);
    } catch (error) {
      throw new Error("Failed to retrieve Coin!");
    }
  }

  async update(coin: Coin): Promise<number> {
    const { name, symbol, current_price } = coin;

    try {
      const affectedRows = await Coin.update(
        { current_price },
        { where: { name: name, symbol: symbol } },
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Coin!");
    }
  }
}

export default new CoinRepository();
