const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { Users } = require("../db");
require("dotenv").config();
const authConfig = require("../config/auth");

//sirve para autenticar endpoints
//el payload del jwt va a ser el Users id

passport.use(
  "jwt-auth",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.secret,
    },
    (authenticateUser = async (jwtPayload, done) => {
        console.log(jwtPayload)
      try {
        var findUser = await Users.findOne({
          where: { id: jwtPayload.id },
        });
        done(null, findUser);
      } catch (err) {
        done(err);
      }
    })
  )
);

passport.use(
  "jwt-admin",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.secret,
    },
    (authorizeAdmin = async (jwtPayload, done) => {
      try {
        if (jwtPayload.status === "Admin") {
          let adminCheck = await Users.findOne({
            where: {
              id: jwtPayload.id,
              status: "Admin",
            },
          });
          done(null, adminCheck);
        } else done(null, false, { message: "Users is not an admin!" });
      } catch (error) {
        done(error);
      }
    })
  )
);

passport.use(
  "jwt-banned",
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.secret,
    },
    (rejectBanned = async (jwtPayload, done) => {
      try {
        if (jwtPayload.status === "Banned") {
          done(null, false, {
            message: "Users is banned, they cannot review!",
          });
        } else done(null, true);
      } catch (error) {
        done(error);
      }
    })
  )

);

