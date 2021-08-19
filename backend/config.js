// eslint-disable-next-line import/no-anonymous-default-export
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.REACT_APP_ACCESS_TOKEN_SECRET;
const JWT_REFRESH = process.env.REACT_APP_REFRESH_TOKEN_SECRET;
const STRIPE_TEST_KEY = process.env.STRIPE_SECRET_TEST_KEY;

export { JWT_SECRET, JWT_REFRESH, STRIPE_TEST_KEY };
