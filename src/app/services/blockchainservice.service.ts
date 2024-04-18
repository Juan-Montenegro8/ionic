import { Injectable } from '@angular/core';
import Block from '../block';
import { DbserviceService } from './db.service';
import * as CryptoJS from 'crypto-js';
//prevBlock.index+1,data,prevBlock.hash,prevBlock.date
@Injectable({
  providedIn: 'root'
})
export class BlockchainserviceService {

  private blocks: Block[] = [];

  constructor(private dbService: DbserviceService) {
    this.initializeBlockchain();
  }

  private async initializeBlockchain(): Promise<void> {
    await this.dbService.initializePlugin();

    if (this.blocks.length === 0) {
      // Si la cadena está vacía, crear el bloque génesis y agregarlo
      const genesisBlock = this.createGenesisBlock();
      this.blocks.push(genesisBlock);
    }

    this.dbService.subscribeBlocks().subscribe((blocks: Block[]) => {
      this.blocks = blocks;
    });
  }

  getBlockchain(): Block[] {
    return this.blocks;
  }

  createGenesisBlock(): Block {
    const newData = "";
    const date = new Date().toISOString().slice(0, 16).replace('T', ' ');

    // El bloque génesis no tiene un bloque previo, por lo que los valores de prevBlock.index+1 y prevBlock.hash son vacíos ('')
    return new Block(1, newData, '', date, '');
  }

  addBlock(newBlock: Block): void {
    
    newBlock.hash = newBlock.calculateHash();

    // Agregar el bloque a la base de datos
    this.dbService.addBlock(newBlock)
      .then(() => console.log('Bloque almacenado en la base de datos '))
      .catch(error => console.error('Error al almacenar el bloque en la base de datos:', error));


  }

  



  getLatestBlock(): Block | null {
    // Obtener el último bloque almacenado en la base de datos
    return this.blocks.length > 0 ? this.blocks[this.blocks.length - 1] : null;
  }
}
