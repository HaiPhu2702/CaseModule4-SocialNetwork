import GoogleStrategy from "passport-google-oauth20"
import passport from "passport"
import {User} from "../schema/user.model";
passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});


passport.use(new GoogleStrategy({
        clientID:'262351243087-59viarrbs51fnvj2ih5uonlrdics739g.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    async function(request,accessToken, refreshToken, profile, done) {
        try{
            let user = await User.findOne({
                google_id: profile.id
            })
            if (!user) {
                let data = {
                    username: profile.displayName,
                    google_id: profile.id
                }
                let user = new User(data);
                await user.save()

            }
            return done(null, user)
        }catch (e) {
            return done(null, false)
        }
    }
));


export default passport