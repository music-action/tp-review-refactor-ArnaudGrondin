/* eslint-disable */
const EMPTY_PLAY = " "
export class Game {
  private _lastSymbol = " ";
  private _board: Board = new Board();

  private readonly firstRow = 0;
  private readonly secondRow = 1;
  private readonly thirdRow = 2;
  private readonly firstColumn = 0;
  private readonly secondColumn = 1;
  private readonly thirdColumn = 2;

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
  let playerO : string = "O";
    if (this._lastSymbol == EMPTY_PLAY) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != EMPTY_PLAY) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    if (this.isRowFull(this.firstRow) && this.isRowFullWithSameSymbol(this.firstRow)) {
      return this._board.TileAt(this.firstRow, this.firstColumn)!.Symbol;
    }

    if (this.isRowFull(this.secondRow) && this.isRowFullWithSameSymbol(this.secondRow)) {
      return this._board.TileAt(this.secondRow, this.firstColumn)!.Symbol;
    }

    if (this.isRowFull(this.thirdRow) && this.isRowFullWithSameSymbol(this.thirdRow)) {
      return this._board.TileAt(this.thirdRow, this.firstColumn)!.Symbol;
    }

    return EMPTY_PLAY;
  }

  private isRowFull(row: number) : boolean{
    return (
      this._board.TileAt(row, this.firstColumn)!.Symbol !=
        EMPTY_PLAY &&
      this._board.TileAt(row, this.secondColumn)!.Symbol !=
        EMPTY_PLAY &&
      this._board.TileAt(row, this.thirdColumn)!.Symbol !=
        EMPTY_PLAY
    );
  }

  
  private isRowFullWithSameSymbol(row : number) :  boolean{
    return (
      this._board.TileAt(row, this.firstColumn)!.Symbol ==
        this._board.TileAt(row, this.secondColumn)!.Symbol &&
      this._board.TileAt(row, this.thirdColumn)!.Symbol ==
        this._board.TileAt(row, this.secondColumn)!.Symbol
    );
  }
  
  
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: EMPTY_PLAY };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
