export interface Team {
  code: string;
  name: string;
  logo: string;
}
export interface Match {
  teamA: Team;
  teamB: Team;
  date: string;
  time: string;
  venue: string;
  matchNumber: Number;
}
