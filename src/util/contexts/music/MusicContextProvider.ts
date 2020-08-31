export default class MusicContextProvider {
  private isPlaying: boolean = false;
  private id: string = "0";
  
  public getPlayingStatus(): boolean {
    return this.isPlaying;
  }

  public togglePlayingStatus(): void {
    this.isPlaying = !this.isPlaying;
  }

  public playNew(): void {
    this.isPlaying = true;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getCurrentId(): string {
    return this.id;
  }
}