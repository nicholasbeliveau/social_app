

export interface League {
  id:   number;
  name: string;
}

export interface Game {
  id: number
  date: string
  teams: {
    home: {
      id: number,
      name: string,
      logo: string
    }
    away: {
      id: number,
      name: string,
      logo: string
    }
  }
  scores: {
    home: number,
    away: number
  }
}

export interface Team {
  city: string,
  name: string,
  username: string
}