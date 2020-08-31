export default class User {
  private email: string = '';

  getEmail(): string {
    return this.email || '';
  }

  setEmail(email: string): void {
    this.email = email;
  }

  isSignedIn(): boolean {
    return !!this.getEmail().length;
  }

  reset(): void {
    this.setEmail('');
  }
}