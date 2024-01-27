import { Request, Response } from "express";
import { controller, get, enumerable } from "./decorators";

@controller("/")
class LoginController {
  @get("/login")
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
