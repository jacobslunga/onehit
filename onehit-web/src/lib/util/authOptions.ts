import { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { spotifyApi } from "../spotify/spotifyApi";

const baseURL = process.env.API_BASE_URL as string;

async function refreshOneHitToken(refresh_token: string) {
  const res = await fetch(`${baseURL}/users/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }

  return await res.json();
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, user }: { account: any; user: any }) {
      if (!account) {
        return false;
      }

      spotifyApi.setAccessToken(account.access_token);

      const me = await spotifyApi.getMe();
      console.log("Me", me);

      const res = await fetch(`${baseURL}/users/auth/login/spotify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: me.body.display_name,
          image_url: me.body.images ? me.body.images[0].url : null,
          email: me.body.email,
          spotify_url: me.body.external_urls.spotify,
          spotify_id: me.body.id,
          display_name: me.body.display_name,
        }),
      });

      if (!res.ok) {
        return false;
      }

      const data = await res.json();

      (user as any).oneHitAccessToken = data.oneHitAccessToken;
      (user as any).oneHitRefreshToken = data.oneHitRefreshToken;
      (user as any).oneHitExpiresAt = data.oneHitExpiresAt;

      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.spotifyAccessToken = token.spotifyAccessToken;
      session.spotifyRefreshToken = token.spotifyRefreshToken;
      session.spotifyExpiresAt = token.spotifyExpiresAt;
      session.oneHitAccessToken = token.oneHitAccessToken;
      session.oneHitRefreshToken = token.oneHitRefreshToken;
      session.oneHitExpiresAt = token.oneHitExpiresAt;
      session.id = token.id;
      return session;
    },
    async jwt({ token, user, account }: { [key: string]: any }) {
      if (account && user) {
        token.spotifyAccessToken = account.access_token;
        token.spotifyRefreshToken = account.refresh_token;
        token.spotifyExpiresAt = account.expires_at;
        token.id = user.id;
        token.oneHitAccessToken = user.oneHitAccessToken;
        token.oneHitRefreshToken = user.oneHitRefreshToken;
        token.oneHitExpiresAt = user.oneHitExpiresAt;
      }

      spotifyApi.setAccessToken(token.spotifyAccessToken);
      spotifyApi.setRefreshToken(token.spotifyRefreshToken);

      if (Math.floor(Date.now() / 1000) > token.spotifyExpiresAt) {
        try {
          const refresh = await spotifyApi.refreshAccessToken();
          token.spotifyAccessToken = refresh.body.access_token;
          token.spotifyExpiresAt = Math.floor(Date.now() / 1000) + 3600;

          spotifyApi.setAccessToken(refresh.body.access_token);
        } catch (err) {
          console.log(err);
        }
      }

      if (
        Math.floor(Date.now()) > token.oneHitExpiresAt &&
        token.oneHitRefreshToken
      ) {
        try {
          const { accessToken, expiresAt } = await refreshOneHitToken(
            token.oneHitRefreshToken
          );
          token.oneHitAccessToken = accessToken;
          token.oneHitExpiresAt = expiresAt;
        } catch (err) {
          console.log(err);
        }
      }

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
