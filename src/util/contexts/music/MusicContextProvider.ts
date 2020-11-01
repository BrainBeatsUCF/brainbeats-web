import { BeatObject, PlaylistObject, PublicBeatObject, SampleObject } from '../../api/types';

export default class MusicContextProvider {
  private isPlaying: boolean = false;
  private id: string = "0";
  private audioPlayingType: string = "";
  private numBeats: number = 0;
  private numSamples: number = 0;
  private numShares: number = 0;
  private originalBeatArray = [] as BeatObject[];
  private originalRecommendedBeatArray = [] as BeatObject[];
  private originalPlaylistArray = [] as PlaylistObject[];
  private originalPublicBeatArray = [] as PublicBeatObject[];
  private originalSampleArray = [] as SampleObject[];
  
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

  public setOriginalBeatArray(originalBeatArray: BeatObject[]) {
    this.originalBeatArray = originalBeatArray;
  }

  public getOriginalBeatArray() {
    return this.originalBeatArray;
  }

  public setOriginalRecommendedBeatArray(originaRecommendedlBeatArray: BeatObject[]) {
    this.originalRecommendedBeatArray = originaRecommendedlBeatArray;
  }

  public getOriginalRecommendedBeatArray() {
    return this.originalRecommendedBeatArray;
  }

  public setOriginalPlaylistArray(originalPlaylistArray: PlaylistObject[]) {
    this.originalPlaylistArray = originalPlaylistArray;
  }

  public getOriginalPlaylistArray() {
    return this.originalPlaylistArray;
  }

  public setOriginalPublicBeatArray(originalPublicBeatArray: PlaylistObject[]) {
    this.originalPublicBeatArray = originalPublicBeatArray;
  }

  public getOriginalPublicBeatArray() {
    return this.originalPublicBeatArray;
  }

  public setOriginalSampleArray(originalSampleArray: SampleObject[]) {
    this.originalSampleArray = originalSampleArray;
  }

  public getOriginalSampleArray() {
    return this.originalSampleArray;
  }
}