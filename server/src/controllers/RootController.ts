import { NextFunction, Request, Response } from "express";
import { controller, get, enumerable, use } from "./decorators";

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("You must be logged in to access this page");
}

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

  @get("/protected")
  @enumerable(true)
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send("Welcome to this protected route, logged in user");
  }
}
