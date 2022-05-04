import { Profile } from 'passport-discord';

export interface DiscordProfile extends Profile {
  accessToken: string;
  fetchedAt: string;
}
