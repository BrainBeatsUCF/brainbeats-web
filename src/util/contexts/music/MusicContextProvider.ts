export default class MusicContextProvider {
  private isPlaying: boolean = false;
  private id: string = "0";
  // GABE
  private songIdList: Array<number> = [];
  private songId: number = 0;
  // END GABE
  
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

  /**
   * Adds song id from AudioDataTesting jsons.
   * @param {number[]} songIds - List of songids
   * @returns {void}
   */
  public enqueue(songIds: Array<number>): void{
    songIds.forEach(songId => this.songIdList.push(songId))
  }

  /**
   * Clear songid list for next list of samples/playlist/beats.
   * @returns {void}
   */
  public emptyList(): void{
    this.songIdList = [];
  }

  /**
   * Checks to see if songList is empty before enqueuing new batch of songs.
   * @returns {boolean}
   */
  public emptyListCheck(): boolean{
    return (this.songIdList.length == 0) ? true : false
  }

  public printList(): Array<number>{
    return this.songIdList;
  }

  public setSongId(newSongId: number): void{
    this.songId = newSongId;
  }

  public getSongId(): number{
    return this.songId;
  }
}