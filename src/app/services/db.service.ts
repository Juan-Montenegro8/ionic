import { Injectable,WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import Block from '../block';
import { Observable, Subject } from 'rxjs';

const DB_BLOCKS_PREFIX = 'blockdb_'; // Prefijo para diferenciar bases de datos de diferentes dispositivos

const DB_BLOCKS = 'blockdb';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private blocksSignal: WritableSignal<Block[]> = signal<Block[]>([]);
  private blocksSubject: Subject<Block[]> = new Subject<Block[]>();

  private deviceId: string = ''; // Aquí deberías asignar el valor adecuado a deviceId

  constructor() {}

  async initializePlugin(): Promise<boolean> {
    this.db = await this.sqlite.createConnection(DB_BLOCKS, false, 'no_encryption', 1, false);
    await this.db.open();

    const schema = `
      CREATE TABLE IF NOT EXISTS blocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT,
        previousHash TEXT,
        timestamp TEXT,
        hash TEXT NOT NULL
        

      );
    `;
    await this.db.execute(schema);

    this.loadBlocks();
    return true;
  }

  async loadBlocks(): Promise<void> {
    const blocks = await this.db.query('SELECT * FROM blocks');
    this.blocksSignal.set(blocks.values || []);
    this.blocksSubject.next(blocks.values || []);
  }

  getBlocks(): WritableSignal<Block[]> {
    return this.blocksSignal;
  }

  subscribeBlocks(): Observable<Block[]> {
    return this.blocksSubject.asObservable();
  }

  async addBlock(newBlock: Block): Promise<void> {
    let estado = '';
    if (newBlock.data == '0') {
      estado = 'Apagado';
    } else {
      estado = 'Encendido';
    }
    const query = 'INSERT INTO blocks (data, timestamp, hash, previousHash) VALUES (?,?,?, ?)';
    const values = [estado, newBlock.timestamp, newBlock.hash, newBlock.previousHash];

    try {
      await this.db.query(query, values);
      this.loadBlocks();
    } catch (error) {
      console.error('Error al agregar bloque en la base de datos:', error);
      throw error;
    }
  }
}
