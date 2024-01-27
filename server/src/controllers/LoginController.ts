import { NextFunction, Request, Response } from "express";
import { controller, get, enumerable, use, post, bodyValidator } from "./decorators";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Logged request!");
  next();
}

const DEFAULT_CREDENTIALS = {
  email: "demo@demo.es",
  password: "password",
};

@controller("/")
class LoginController {
  @get("/login")
  @use(logger)
  @enumerable(true)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="post">
        <div>
          <label>Email</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post("/login")
  @use(logger)
  @enumerable(true)
  @bodyValidator("email", "password")
  postLogin(req: RequestWithBody, res: Response): void {
    const { email, password } = req.body; // body is available thanks to body-parser package

    if (email === DEFAULT_CREDENTIALS.email && password === DEFAULT_CREDENTIALS.password) {
      req.session = { loggedIn: true };

      res.redirect("/");
    } else {
      res.send("Invalid credentials");
    }
  }
}

// const descriptors = Object.getOwnPropertyDescriptors(LoginController.prototype);
// console.log(descriptors);
