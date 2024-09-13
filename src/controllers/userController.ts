import { Request, Response } from "express";
import Users from "../models/Users";
import { send } from "process";
import exp from "constants";

export const nome = (req: Request, res: Response) => {
  let nome: string = req.query.nome as string;
  let idade: string = req.query.idade as string;

  res.render("pages/nome", {
    nome,
    idade,
  });
};

export const idadeForm = (req: Request, res: Response) => {
  res.render("pages/idade");
};

export const idadeAction = (req: Request, res: Response) => {
  let mostrarIdade: boolean = false;
  let idade: number = 0;

  if (req.body.ano) {
    let anoNascimento: number = parseInt(req.body.ano as string);
    let anoAtual: number = new Date().getFullYear();
    idade = anoAtual - anoNascimento;
    mostrarIdade = true;
  }

  res.render("pages/idade", {
    idade,
    mostrarIdade,
  });
};

export const addUserAction = async (req: Request, res: Response) => {
  let newUser = new Users();
  newUser.name = { firstName: req.body.firstName, lastName: req.body.lastName };
  newUser.email = req.body.email;
  newUser.age = req.body.age;
  if (
    typeof req.body.interests[0] === "string" &&
    req.body.interests[0].includes(",")
  ) {
    newUser.interests = req.body.interests[0]
      .split(",")
      .map((item: string) => item.trim());
  } else {
    newUser.interests = req.body.interests;
  }
  let resultado = await newUser.save();
  console.log(resultado);
  res.redirect("/");
};

export const incrementAgeAction = async (req: Request, res: Response) => {
  let id = req.params.id;  
  let user = await Users.findById(id);

  if(user) {
    user.age = user.age + 1;
    user.save();
    res.redirect("/")
  }else{
    console.log("User not found")
  }
}

export const removeUserDB = async (req: Request, res: Response) => {
  let id = req.params.id;
  await Users.findByIdAndDelete(id);
  res.redirect("/")
}