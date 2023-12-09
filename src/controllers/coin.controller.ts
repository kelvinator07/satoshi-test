import { Request, Response } from "express";
import coinRepository from "../repositories/coin.repository";

export default class CoinController {
  async findAll(req: Request, res: Response) {
    const queryData = req.query;
    try {
      const coins = await coinRepository.retrieveAll(queryData);
      res.status(200).send(coins);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving coins.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const coin = await coinRepository.retrieveById(id);

      if (coin) {
        res.status(200).send(coin);
      } else {
        res.status(404).send({
          message: `Cannot find Coin with id=${id}.`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Coin with id=${id}.`,
      });
    }
  }
}
