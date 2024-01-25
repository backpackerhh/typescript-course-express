import { Router, Request, Response } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

router.get("/", (req: Request, res: Response): void => {
  res.send("Hi there from router!");
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

  res.send(email.toUpperCase());
});

export { router };
