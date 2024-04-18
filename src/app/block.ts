import * as CryptoJS from 'crypto-js';


export default class Block {
  
  constructor(
    public id: number,
    
    public data: string,
    public previousHash: string,
    public timestamp: string,
    
    public hash: string
  ) {
    this.id = id;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
  }



  calculateHash(): string {


    return CryptoJS.SHA256(
      
      this.id + this.data + this.previousHash + this.timestamp  
      //prevBlock.index+1,data,prevBlock.hash,prevBlock.date
    ).toString();
  }
}

// export default Block;
