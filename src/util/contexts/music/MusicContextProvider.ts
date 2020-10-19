export default class MusicContextProvider {
  private isPlaying: boolean = false;
  private id: string = "0";
  private audioPlayingType: string = "";
  private numBeats: number = 0;
  private numSamples: number = 0;
  private numShares: number = 0;
  
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
  
  public setAudioPlayingType(audioPlayingType: string) {
    this.audioPlayingType = audioPlayingType;
  }

  public getAudioPlayingType(): string {
   return this.audioPlayingType;
  }

  public setNumBeats(numBeats: number) {
    this.numBeats = numBeats;
  }

  public getNumBeats(): number {
    return this.numBeats;
  }

  public setNumSamples(numSamples: number) {
    this.numSamples = numSamples;
  }

  public getNumSamples(): number {
    return this.numSamples;
  }

  public setNumShares(numShares: number) {
    this.numShares = numShares;
  }

  public getNumShares(): number {
    return this.numShares;
  }
}