import NextAuth, { getServerSession } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: String(process.env.LINKEDIN_CLIENT_ID),
      clientSecret: String(process.env.LINKEDIN_CLIENT_SECRET),
      authorization: {
        params: {
          scope: "openid profile email",
          response_type: "code",
        },
      },
      issuer: "https://www.linkedin.com/oauth",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo",
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      checks: ["state"],
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt" as "jwt",
    maxAge: 24 * 60 * 60,
  },
  debug: true,
  callbacks: {
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.role = String(user.role?.name || "").toUpperCase();
      }
      return token;
    },
  },
};

export default authOptions
const handler = NextAuth(authOptions);


// Export as GET and POST methods
export const handlers = {
  GET: handler,
  POST: handler,
};


// // Export a function to get the session
// export const auth = async () => {
//   const session = await getServerSession(authOptions);
//   return session;
// };
// app/api/auth/[...nextauth]/route.ts
// import NextAuth, { type NextAuthOptions } from "next-auth";
// import LinkedInProvider from "next-auth/providers/linkedin";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     LinkedInProvider({
//       clientId: String(process.env.LINKEDIN_CLIENT_ID),
//       clientSecret: String(process.env.LINKEDIN_CLIENT_SECRET),
//       authorization: {
//         params: {
//           scope: "openid profile email",
//           response_type: "code",
//         },
//       },
//       issuer: "https://www.linkedin.com/oauth",
//       jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
//       userinfo: {
//         url: "https://api.linkedin.com/v2/userinfo",
//       },
//       profile(profile) {
//         return {
//           id: profile.sub,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//         };
//       },
//       checks: ["state"],
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60,
//   },
//   debug: true,
//   callbacks: {
//     async session({ session, token }: any) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }
//       session.user.role = token.role;
//       return session;
//     },
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.role = String(user.role?.name || "").toUpperCase();
//       }
//       return token;
//     },
//   },
//   // Add cookies configuration
//   cookies: {
//     state: {
//       name: 'next-auth.state',
//       options: {
//         httpOnly: true,
//         sameSite: 'lax',
//         path: '/',
//         secure: process.env.NODE_ENV === 'production',
//       },
//     },
//   },
// };

// // Create and export the route handlers
// const handler = NextAuth(authOptions);

// // Export as GET and POST methods
// export const handlers = {
//   GET: handler,
//   POST: handler,
// };


// import NextAuth, { type NextAuthOptions } from "next-auth";
// import LinkedInProvider from "next-auth/providers/linkedin";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     LinkedInProvider({
//       clientId: String(process.env.LINKEDIN_CLIENT_ID),
//       clientSecret: String(process.env.LINKEDIN_CLIENT_SECRET),
//       authorization: {
//         params: {
//           scope:
//             "openid profile email w_member_social r_liteprofile r_emailaddress",
//           response_type: "code",
//         },
//       },
//       issuer: "https://www.linkedin.com/oauth",
//       jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
//       userinfo: {
//         // Enhanced userinfo endpoint with additional fields
//         url: "https://api.linkedin.com/v2/userinfo",
//       },
//       // Additional profile endpoint for more data
//       async profile(profile, tokens) {
//         // Fetch basic profile data
//         const basicProfileRes = await fetch("https://api.linkedin.com/v2/me", {
//           headers: {
//             Authorization: `Bearer ${tokens.access_token}`,
//           },
//         });
//         const basicProfile = await basicProfileRes.json();

//         // Fetch email address
//         const emailRes = await fetch(
//           "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
//           {
//             headers: {
//               Authorization: `Bearer ${tokens.access_token}`,
//             },
//           }
//         );
//         const emailData = await emailRes.json();

//         // Fetch profile picture
//         const profilePicRes = await fetch(
//           "https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))",
//           {
//             headers: {
//               Authorization: `Bearer ${tokens.access_token}`,
//             },
//           }
//         );
//         const pictureData = await profilePicRes.json();

//         // Get the profile picture URL (highest quality)
//         const profilePicture =
//           pictureData.profilePicture?.["displayImage~"]?.elements?.[0]
//             ?.identifiers?.[0]?.identifier || null;

//         // Enhanced user object with additional fields
//         return {
//           id: profile.sub,
//           name: `${basicProfile.localizedFirstName} ${basicProfile.localizedLastName}`,
//           email: emailData.elements?.[0]?.["handle~"]?.emailAddress,
//           image: profilePicture,
//           // Additional fields
//           firstName: basicProfile.localizedFirstName,
//           lastName: basicProfile.localizedLastName,
//           headline: basicProfile.headline || null,
//           countryCode: basicProfile.countryOfResidence || null,
//           industry: basicProfile.industryName || null,
//           vanityName: basicProfile.vanityName || null,
//         };
//       },
//       checks: ["state"],
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       // Save the access token and user details to the token
//       if (account && user) {
//         token.accessToken = account.access_token;
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       // Add custom user fields to the session
//       session.user = {
//         ...session.user,
//         id: token.user?.id,
//         firstName: token.user?.firstName,
//         lastName: token.user?.lastName,
//         headline: token.user?.headline,
//         countryCode: token.user?.countryCode,
//         industry: token.user?.industry,
//         vanityName: token.user?.vanityName,
//       };
//       // Add access token to session if needed
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   secret: process.env.AUTH_SECRET,
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60,
//   },
//   debug: true,
//   cookies: {
//     state: {
//       name: "next-auth.state",
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// // Export as GET and POST methods
// export const handlers = {
//   GET: handler,
//   POST: handler,
// };
