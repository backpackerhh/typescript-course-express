import { Router, Request, Response, NextFunction } from "express";

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("You must be logged in to access this page");
}

const router = Router();

router.get("/", (req: Request, res: Response): void => {
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
});

router.get("/protected", requireAuth, (req: Request, res: Response): void => {
  res.send("Welcome to this protected route, logged in user");
});

export { router };
