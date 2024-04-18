// import Block from './block';

// class Blockchain {
//   chain: Block[];

//   constructor() {
//     this.chain = [this.createGenesisBlock()];
//   }

//   createGenesisBlock(): Block {
   
//     const newData = "inicio"; // Example data
//     const date = new Date().toISOString().slice(0, 16).replace('T', ' ');

//     return new Block(1, newData, '', date,'');
//     //prevBlock.index+1,data,prevBlock.hash,prevBlock.date
    
//   }

//   getLatestBlock(): Block {
//     return this.chain[this.chain.length - 1];
//   }

//   addBlock(newBlock: Block): void {
//     newBlock.previousHash = this.getLatestBlock().hash;
//     newBlock.hash = newBlock.calculateHash();
//     this.chain.push(newBlock);
//   }

//   isValid(): boolean {
//     for (let i = 1; i < this.chain.length; i++) {
//       const currentBlock = this.chain[i];
//       const previousBlock = this.chain[i - 1];

//       if (currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
//         return false;
//       }
//     }

//     return true;
//   }
// }

// export default Blockchain;
