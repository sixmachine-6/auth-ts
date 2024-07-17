import { Request, Response } from "express";
import { bodyValidators, controller, get, post } from "../decorators";
import { Methods } from "../enums/Methods";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

@controller("/auth")
class AuthController {
  @get("/login")
  getLogin(req: Request, res: Response) {
    res.send(`
        <form method="POST">
        <h2>Auth-TS by TS</h2>
        <div>
        <label>Email</label>
        <input name="email" type="email"/>
        </div>
        <div>
        <label>Password</label>
        <input name="password" type="password"/>
        </div>
        <button>submit</button>
        </form>`);
  }

  @post("/login")
  @bodyValidators("email", "password")
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === "hi@hi.com" && password === "password") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  logout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/");
  }
}
