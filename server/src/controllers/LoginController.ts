import { NextFunction, Request, Response } from "express";
import { controller, get, enumerable, use } from "./decorators";

function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Logged request!");
  next();
}

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
}

// const descriptors = Object.getOwnPropertyDescriptors(LoginController.prototype);
// console.log(descriptors);
