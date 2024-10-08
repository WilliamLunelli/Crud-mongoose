import e, { Request, Response } from "express";
import { Product } from "../models/Product";
import Users from "../models/Users";

export const home = async (req: Request, res: Response) => {



  let users = await Users.find({}).sort({ "name.firstName": 1 });

  res.render("pages/home", {
    users,
  });
};
