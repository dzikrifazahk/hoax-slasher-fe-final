import { CommunityServices } from "./community.service";
import { DebunkingServices } from "./debunking.service";
import { NewsServices } from "./news.service";
import { UsersServices } from "./users.service";
import { EventServices } from "./event.service";
import { TrustedSourceServices } from "./trusted-souce.service";
import { UrlRequestServices } from "./url-request.service";

export const newsService = new NewsServices();
export const usersService = new UsersServices();
export const debunkingService = new DebunkingServices();
export const communityService = new CommunityServices();
export const eventServices = new EventServices();
export const trustedSourceService = new TrustedSourceServices();
export const urlReqService = new UrlRequestServices();