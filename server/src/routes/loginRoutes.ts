import { Router, Request, Response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const DEFAULT_CREDENTIALS = {
  email: "demo@demo.es",
  password: "password",
};

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

router.get("/login", (req: Request, res: Response): void => {
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
});

router.post("/login", (req: RequestWithBody, res: Response): void => {
  const { email, password } = req.body; // body is available thanks to body-parser package

  if (!email) throw new Error("You must define 'email'");
  if (!password) throw new Error("You must define 'password'");

  if (email === DEFAULT_CREDENTIALS.email && password === DEFAULT_CREDENTIALS.password) {
    req.session = { loggedIn: true };

    res.redirect("/");
  } else {
    res.send("Invalid credentials");
  }
});

export { router };
