const EMPTY_TILE_SYMBOL = " ";
const NUMBER_OF_ROW = 3 
const NUMBER_OF_COLUMN = 3
const FIRST_ROW = 0
const SECOND_ROW = 1
const THIRD_ROW = 2
const FIRST_COLUMN = 0
const SECOND_COLUMN = 1
const THIRD_COLUMN = 2
export class Game {
  private _lastSymbol = EMPTY_TILE_SYMBOL;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == EMPTY_TILE_SYMBOL) {
      if (player == "O") {
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
    if (this._board.TileAt(x, y).Symbol != EMPTY_TILE_SYMBOL) {
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
    if (this.isFirstRowFull() && this.isFirstRowFullWithSameSymbol()) {
      return this._board.TileAt(FIRST_ROW, FIRST_COLUMN)!.Symbol;
    }

    if (this.isSecondRowFull() && this.isSecondRowFullWithSameSymbol()) {
      return this._board.TileAt(SECOND_ROW, FIRST_COLUMN)!.Symbol;
    }

    if (this.isThirdRowFull() && this.isThirdRowFullWithSameSymbol()) {
      return this._board.TileAt(THIRD_ROW, FIRST_COLUMN)!.Symbol;
    }

    return " ";
  }

  private isFirstRowFull() {
    return (
      this._board.TileAt(FIRST_ROW, FIRST_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL &&
      this._board.TileAt(FIRST_ROW, SECOND_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL &&
      this._board.TileAt(FIRST_ROW, THIRD_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL
    );
  }

  private isFirstRowFullWithSameSymbol() {
    return (
      this._board.TileAt(FIRST_ROW, FIRST_COLUMN)!.Symbol == this._board.TileAt(FIRST_ROW, SECOND_COLUMN)!.Symbol &&
      this._board.TileAt(FIRST_ROW, THIRD_COLUMN)!.Symbol == this._board.TileAt(FIRST_ROW, SECOND_COLUMN)!.Symbol
    );
  }

  private isSecondRowFull() {
    return (
      this._board.TileAt(SECOND_ROW, FIRST_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL &&
      this._board.TileAt(SECOND_ROW, SECOND_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL &&
      this._board.TileAt(SECOND_ROW, THIRD_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL
    );
  }

  private isSecondRowFullWithSameSymbol() {
    return (
      this._board.TileAt(SECOND_ROW, FIRST_COLUMN)!.Symbol == this._board.TileAt(SECOND_ROW, SECOND_COLUMN)!.Symbol &&
      this._board.TileAt(SECOND_ROW, THIRD_COLUMN)!.Symbol == this._board.TileAt(SECOND_ROW, SECOND_COLUMN)!.Symbol
    );
  }

  private isThirdRowFull() {
    return (
      this._board.TileAt(THIRD_ROW, FIRST_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL &&
      this._board.TileAt(THIRD_ROW, SECOND_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL &&
      this._board.TileAt(THIRD_ROW, THIRD_COLUMN)!.Symbol != EMPTY_TILE_SYMBOL
    );
  }

  private isThirdRowFullWithSameSymbol() {
    return (
      this._board.TileAt(THIRD_ROW, FIRST_COLUMN)!.Symbol == this._board.TileAt(THIRD_ROW, SECOND_COLUMN)!.Symbol &&
      this._board.TileAt(THIRD_ROW, THIRD_COLUMN)!.Symbol == this._board.TileAt(THIRD_ROW, SECOND_COLUMN)!.Symbol
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
    for (let i = 0; i < NUMBER_OF_ROW; i++) {
      for (let j = 0; j < NUMBER_OF_COLUMN; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: EMPTY_TILE_SYMBOL };
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
