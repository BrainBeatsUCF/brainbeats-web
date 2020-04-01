export default class MusicContextProvider {
  private isPlaying: boolean = false;
  
  //Todo:  not sure if this is the right way, maybe have to use async
  public getPlayingStatus() {
    return this.isPlaying;
  }
}