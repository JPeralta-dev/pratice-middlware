export enum Keys {
  BLACKLIST = "blacklist",
  RATE = "ratelimiting",
  IDEMPOTENCY = "idempotency",
}

export class GenerateKeyRedis {
  static generateKeyBlacklist(jti: String) {
    return `${Keys.BLACKLIST}:token:${jti}`;
  }
  static rateLimitingByIp(ip: string) {
    return `${Keys.RATE}:ip:${ip}`;
  }
  static rateLimitingByUser(user: string) {
    return `${Keys.RATE}:user:${user}`;
  }
  static rateLimitingByEndpoint(endpoint: string, identifier: string) {
    return `${Keys.RATE}:${endpoint}:${identifier}`;
  }
  static generateKeyIdempotency() {}
}
