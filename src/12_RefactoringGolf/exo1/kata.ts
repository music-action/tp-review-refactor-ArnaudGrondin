/* eslint-disable */

// read the code
export class Game {
  private _lastSymbol = " ";
  private _toto: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    if (this.IsFirstMove()) {
      if (this.PlayerIsX(symbol)) {
      }
    } else if (this.PlayerRepeated(symbol)) {
    } else if (this.AlreadyPlayedTile(x, y)) {
    }
    this.UpdateGameState(symbol, x, y);
  }

  private AlreadyPlayedTile(x: number, y: number): boolean {
    if (this._toto.TileAt(x, y).Symbol != " ") {
      throw new Error("Invalid position");
    }
    return false;
  }

  public IsFirstMove(): boolean {
    if (this._lastSymbol == " ") return true;
    return false;
  }

  private PlayerIsX(symbol: string): boolean {
    if (symbol == "O") {
      throw new Error("Invalid first player");
    }
    return true;
  }

  public PlayerRepeated(symbol: string): boolean {
    if (symbol == this._lastSymbol) throw new Error("Invalid next player");
    return false;
  }

  private UpdateGameState(symbol: string, x: number, y: number) {
    this._lastSymbol = symbol;
    this._toto.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    if (this.PositionsFirstRowTaken()) {
      if (this.FirstRowFullSameSymbol()) {
        return this._toto.TileAt(0, 0)!.Symbol;
      }
    }

    if (this.PositionsSecondRowTaken()) {
      if (this.MiddleRowFullSameSymbol()) {
        return this._toto.TileAt(1, 0)!.Symbol;
      }
    }

    if (this.PositionsThirdRowTaken()) {
      if (this.ThirdRowFullSameSymbol()) {
        return this._toto.TileAt(2, 0)!.Symbol;
      }
    }

    return " ";
  }

  private ThirdRowFullSameSymbol(): boolean {
    return (
      this._toto.TileAt(2, 0)!.Symbol == this._toto.TileAt(2, 1)!.Symbol &&
      this._toto.TileAt(2, 2)!.Symbol == this._toto.TileAt(2, 1)!.Symbol
    );
  }

  private PositionsThirdRowTaken(): boolean {
    return (
      this._toto.TileAt(2, 0)!.Symbol != " " &&
      this._toto.TileAt(2, 1)!.Symbol != " " &&
      this._toto.TileAt(2, 2)!.Symbol != " "
    );
  }

  private FirstRowFullSameSymbol(): boolean {
    return (
      this._toto.TileAt(0, 0)!.Symbol == this._toto.TileAt(0, 1)!.Symbol &&
      this._toto.TileAt(0, 2)!.Symbol == this._toto.TileAt(0, 1)!.Symbol
    );
  }

  private PositionsFirstRowTaken(): boolean {
    return (
      this._toto.TileAt(0, 0)!.Symbol != " " &&
      this._toto.TileAt(0, 1)!.Symbol != " " &&
      this._toto.TileAt(0, 2)!.Symbol != " "
    );
  }

  private PositionsSecondRowTaken(): boolean {
    return (
      this._toto.TileAt(1, 0)!.Symbol != " " &&
      this._toto.TileAt(1, 1)!.Symbol != " " &&
      this._toto.TileAt(1, 2)!.Symbol != " "
    );
  }

  private MiddleRowFullSameSymbol(): boolean {
    return (
      this._toto.TileAt(1, 0)!.Symbol == this._toto.TileAt(1, 1)!.Symbol &&
      this._toto.TileAt(1, 2)!.Symbol == this._toto.TileAt(1, 1)!.Symbol
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
        const tile: Tile = { X: i, Y: j, Symbol: " " };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}

// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review
