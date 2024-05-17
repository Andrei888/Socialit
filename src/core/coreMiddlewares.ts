import { Middleware } from "redux";
import { middleware as notificationMiddleware } from "./notifications";

const middlewares: Array<Middleware> = [notificationMiddleware];

export default middlewares;
