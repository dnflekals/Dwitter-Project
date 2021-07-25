import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.js";

const secret = "uk2P&OBWnMA^dbt8wU48ttWex&#N^gLW";

export async function signup(req, res, next) {
  const { username, password, name, email, url } = req.body;

  const signupComp = await authRepository.signupCompare(username);
  if (signupComp) {
    res.status(409).json({ message: `username(${username}) is duplicated.` });
  } else {
    const user = {
      id: Date.now().toString(),
      username,
      password,
      name,
      email,
      url,
    };
    const users = await authRepository.addUser(user);
    res.status(201).json(users);
  }
}

export async function login(req, res, next) {
  const { username, password } = req.body;

  const loginComp = await authRepository.loginCompare(username, password);
  if (loginComp) {
    const token = jwt.sign(
      {
        id: username,
        isAdmin: true,
      },
      secret,
      { expiresIn: 1000 }
    );
    res.status(201).json(token);
  } else {
    res.status(400).json({ message: `username or password is wrong.` });
  }
}
