require('dotenv').config();

class ConfigService {

  constructor(
    private env: { [k: string]: string | undefined },
  ) {
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getSecret() {
    return this.getValue('SECRET', true);
  }

  public getEnv(key) {
    return this.getValue(key, true);
  }

  public getMongoURI() {
    return this.getValue('DB_URI', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    'DB_URI'
  ]);

export { configService };