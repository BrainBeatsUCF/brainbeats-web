class MusicIndex{
    private static songIndex:number = -1;

    public static getSongIndex(): number { 
        return this.songIndex;
     }
    public static setSongIndex(newSongIndex: number):void {
        this.songIndex = newSongIndex;
    }
}

function getSongIndex(): number{
    return MusicIndex.getSongIndex();
}

function setSongIndex(newSongIndex: number): void{
    return MusicIndex.setSongIndex(newSongIndex);
}

export {getSongIndex, setSongIndex}