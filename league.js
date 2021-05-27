const teams = [
  {
    name: "1",
  },
  {
    name: "2",
  },
  {
    name: "3",
  },
  {
    name: "4",
  },
  {
    name: "5",
  },

  {
    name: "6",
  },
  {
    name: "7",
  },
  {
    name: "8",
  },
];

class LeagueSort {
  constructor(teams) {
    this.teams = this.addRestTeam(this.sortTeams(teams));
  }

  sortTeams(arr) {
    const sortedArray = arr
      .map((el) => ({ sort: Math.random(), value: el }))
      .sort((a, b) => a.sort - b.sort)
      .map((el) => el.value);
    return sortedArray;
  }
  addRestTeam(array) {
    let newArrayOfTeams = [...array];
    if (array.length % 2 !== 0) {
      newArrayOfTeams.push({ rest: true });
    }
    return array.length % 2 === 0 ? array : newArrayOfTeams;
  }

  getLeague() {
    const numJourneys = this.teams.length - 1;
    const numMatchsPerJourney = this.teams.length / 2;
    const isOdd = this.teams.find((el) => el.rest);
    const reverseTeams = [...this.teams].reverse().slice(1);
    let rounds = [];

    for (let i = 0, k = 0, aux = 0; i < numJourneys; i++) {
      rounds.push([]);
      for (let j = 0; j < numMatchsPerJourney; j++) {
        rounds[i].push({
          local: this.teams[k].name,
        });

        // First column
        if (j === 0 && !isOdd) {
          if (i % 2 === 0) {
            Object.assign(rounds[i][0], {
              visit: this.teams[this.teams.length - 1].name,
            });
          } else {
            Object.assign(rounds[i][0], {
              visit: rounds[i][0].local,
            });
            rounds[i][0].local = this.teams[this.teams.length - 1].name;
          }
        } else {
          if (j === 0) {
            rounds[i][0].rest = rounds[i][0].local;
            delete rounds[i][0].local;
          }
        }

        // Second element of each row
        if (j > 0) {
          Object.assign(rounds[i][j], {
            visit: reverseTeams[aux].name,
          });
          aux += 1;
        }

        k += 1;
        if (aux === this.teams.length - 1) aux = 0;

        if (k === numJourneys) {
          k = 0;
        }
      }
    }

    return rounds;
  }

  getTwoRoundsLeague() {
    const firstRoundLeague = this.getLeague();

    console.table(firstRoundLeague);

    const arrayToInvertTeams = [...firstRoundLeague];

    const twoRoundsLeague = arrayToInvertTeams.map((row) => {
      return row.map((match) => {
        let aux = match.local;
        match.local = match.visit;
        match.visit = aux;
        return match;
      });
    });
    console.table(twoRoundsLeague);
  }
}

const league = new LeagueSort(teams);
league.getTwoRoundsLeague();
