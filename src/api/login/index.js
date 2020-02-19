// 引入
import { get, post } from "@/config/index.js";

export const RegCode = arg => post("/node/user/getCode", arg);
export const Register = arg => post("/node/user/register", arg);
export const LoginBtn = arg => post("/node/user/login", arg);
export const GetInfo = arg => get("/node/user/login", arg);
export const GetExample = arg => get("/test/get", arg);
