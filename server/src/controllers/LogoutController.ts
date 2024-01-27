import { Request, Response } from "express";
import { controller, get, enumerable } from "./decorators";

@controller("/")
class LogoutController {
  @get("/logout")
  @enumerable(true)
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect("/");
  }
}
