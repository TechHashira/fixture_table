import { LeagueSort } from "./league";
import { teams, pairArray, oddArray } from "./mockValues";

describe("LeagueSort class", () => {
  const league = new LeagueSort(teams);
  it("should be defined", () => {
    expect(league).toBeDefined();
  });

  it("should make an array", () => {
    expect(Array.isArray(league.teams)).toBe(true);
  });
});

describe("addRestTeam", () => {
  it("should add a object if the array is odd", () => {
    const league = new LeagueSort(oddArray);
    expect(league.teams.length).toBeGreaterThan(pairArray.length);
  });
  it("shouldn't add a object if the array is is pair", () => {
    const league = new LeagueSort(pairArray);
    expect(league.teams.length).toBe(pairArray.length);
  });
});

describe("getLeague", () => {
  const league = new LeagueSort(teams);
  it("shoulbe an array", () => {
    expect(league.getLeague()).toBeInstanceOf(Array);
  });
});

describe("getTwoRoundsLeague", () => {
  const league = new LeagueSort(teams);
  it("should be reversed beteween properties", () => {
    const [firstRoundLeague, secondRoundLeague] = league.getTwoRoundsLeague();
    const firstMatch_FirstRoundLeague = firstRoundLeague[1][1];
    const firstMatch_SecondRoundLeague = secondRoundLeague[1][1];
    console.log(firstMatch_FirstRoundLeague, firstMatch_SecondRoundLeague);
    expect(firstMatch_FirstRoundLeague.local).toBe(
      firstMatch_SecondRoundLeague.visit
    );
  });
});
