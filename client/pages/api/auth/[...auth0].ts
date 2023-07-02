import {
  getSession,
  handleAuth,
  handleCallback,
  handleLogin,
  handleProfile,
} from "@auth0/nextjs-auth0";
import { afterCallback } from "../../../server/utils/after-login-callback";

export default handleAuth({
  async profile(req, res) {
    try {
      const session = getSession(req, res);
      if (session) {
        await handleProfile(req, res);
      } else {
        res.status(200).end("No session");
      }
    } catch (error) {}
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: "/oasis",
    });
  },
});
