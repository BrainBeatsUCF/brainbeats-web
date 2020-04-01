export default class MusicContextProvider {
  private isPlaying: boolean = false;
  
  //Todo:  not sure if this is the right way, maybe have to use async
  public getPlayingStatus(): boolean {
    return this.isPlaying;
  }

  public togglePlayingStatus(): void {
    console.log("TOGGLING");
    this.isPlaying = !this.isPlaying;
    return;
  }
}