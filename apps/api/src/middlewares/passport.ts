import passport from "passport";
import type { Profile } from "passport-google-oauth20";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import type { RequestHandler } from "express";
import { Config } from "@api/config/env";
import userService from "@api/services/user";
import { GoogleProfileDto } from "@api/dtos/google-profile";

const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: Config.GOOGLE_CLIENT_ID,
        clientSecret: Config.GOOGLE_CLIENT_SECRET,
        callbackURL: Config.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile: Profile, done) => {
        try {
          // DB에서 사용자 찾거나 생성
          // TODO : auth provider 정보 저장
          const user = await userService.findOrCreate(
            GoogleProfileDto.fromProfile(profile)
          );
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    // 로그인 성공시 userid를 세션에 저장
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      // 요청시 세션에 저장된 userid를 사용하여 사용자 정보를 조회
      const user = await userService.getById(id);

      // req.user에 사용자 정보 저장
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

configurePassport();

export const passportMiddleware = passport.initialize();
export const passportSession = passport.session();
export const googleLoginHandler = passport.authenticate("google", {
  scope: ["email", "profile"],
}) as RequestHandler;
export const googleCallbackAuthenticate = passport.authenticate("google", {
  successRedirect: Config.FRONTEND_URL,
  failureRedirect: `${Config.FRONTEND_URL}/login`,
}) as RequestHandler;
