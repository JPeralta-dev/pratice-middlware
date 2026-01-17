export class User {
  constructor(
    private username: string,
    private password: string,
  ) {
    (this.username, this.password);
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }
}
