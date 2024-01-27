import { Request, Response } from "express";
import { controller, get, enumerable } from "./decorators";

@controller("/")
class RootController {
  @get("/")
  @enumerable(true)
  getRoot(req: Request, res: Response): void {
    if (req.session?.loggedIn) {
      res.send(`
        <div>
          <p>You are logged in</p>
          <a href="/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <p>You are not logged in</p>
          <a href="/login">Login</a>
        </div>
      `);
    }
  }
}
