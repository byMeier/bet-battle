
// Bet history mock data generator
// Generates realistic betting history for all players in a table

const BET_MARKETS_POOL = {
  football: [
    { market: 'Resultado final', selections: ['Local gana', 'Empate', 'Visitante gana'] },
    { market: 'Goles — Más/Menos de 2.5', selections: ['Más de 2.5', 'Menos de 2.5'] },
    { market: 'Ambos equipos anotarán', selections: ['Sí', 'No'] },
    { market: 'Doble oportunidad', selections: ['Local o empate', 'Visitante o empate', 'Local o visitante'] },
    { market: 'Hándicap -1', selections: ['Local -1', 'Visitante +1'] },
    { market: 'Goles — Más/Menos de 1.5', selections: ['Más de 1.5', 'Menos de 1.5'] },
    { market: 'Marcador correcto', selections: ['1-0', '2-1', '0-0', '1-1', '2-0', '0-1'] },
    { market: 'Primer anotador', selections: ['Jugador A', 'Jugador B', 'Jugador C'] },
    { market: '1° tiempo — Resultado', selections: ['Local', 'Empate', 'Visitante'] },
    { market: 'Tarjetas — Más/Menos de 3.5', selections: ['Más de 3.5', 'Menos de 3.5'] },
    { market: 'Córners — Más/Menos de 9', selections: ['Más de 9', 'Menos de 9'] },
    { market: 'Empate — Apuesta no válida', selections: ['Local', 'Visitante'] },
  ],
  basketball: [
    { market: 'Ganador', selections: ['Local gana', 'Visitante gana'] },
    { market: 'Puntos — Más/Menos de 210.5', selections: ['Más de 210.5', 'Menos de 210.5'] },
    { market: 'Hándicap -4.5', selections: ['Local -4.5', 'Visitante +4.5'] },
    { market: '1er Quarter — Ganador', selections: ['Local', 'Visitante'] },
    { market: 'Puntos — Más/Menos de 220.5', selections: ['Más de 220.5', 'Menos de 220.5'] },
    { market: 'Jugador — Más de 25.5 puntos', selections: ['Jugador A', 'Jugador B'] },
  ],
  tennis: [
    { market: 'Ganador del partido', selections: ['Jugador 1', 'Jugador 2'] },
    { market: 'Total sets — Más/Menos de 2.5', selections: ['Más de 2.5', 'Menos de 2.5'] },
    { market: 'Resultado en sets', selections: ['2-0', '2-1', '0-2', '1-2'] },
    { market: '1er Set — Ganador', selections: ['Jugador 1', 'Jugador 2'] },
    { market: 'Total games — Más/Menos de 22.5', selections: ['Más de 22.5', 'Menos de 22.5'] },
  ],
};

// Tournament bracket structure for tournament tables
const TOURNAMENT_BRACKETS = {
  worldcup: {
    name: 'Mundial 2026',
    rounds: [
      { name: 'Fase de grupos', matches: [
        { id: 'g1', label: 'Argentina vs México', teams: ['Argentina', 'México'] },
        { id: 'g2', label: 'Argentina vs Polonia', teams: ['Argentina', 'Polonia'] },
        { id: 'g3', label: 'Argentina vs Arabia Saudita', teams: ['Argentina', 'Arabia Saudita'] },
      ]},
      { name: 'Octavos', matches: [
        { id: 'r16_1', label: 'Argentina vs Australia', teams: ['Argentina', 'Australia'] },
      ]},
      { name: 'Cuartos', matches: [
        { id: 'qf1', label: 'Argentina vs Países Bajos', teams: ['Argentina', 'Países Bajos'] },
      ]},
      { name: 'Semis', matches: [
        { id: 'sf1', label: 'Argentina vs Croacia', teams: ['Argentina', 'Croacia'] },
      ]},
      { name: 'Final', matches: [
        { id: 'f1', label: 'Argentina vs Francia', teams: ['Argentina', 'Francia'] },
      ]},
    ]
  },
  champions: {
    name: 'Champions League',
    rounds: [
      { name: 'Liga', matches: [
        { id: 'cl1', label: 'R. Madrid vs Man City', teams: ['Real Madrid', 'Man City'] },
        { id: 'cl2', label: 'Arsenal vs PSG', teams: ['Arsenal', 'PSG'] },
        { id: 'cl3', label: 'Barcelona vs Bayern', teams: ['Barcelona', 'Bayern'] },
      ]},
      { name: 'Octavos', matches: [
        { id: 'cl_r16', label: 'R. Madrid vs Dortmund', teams: ['Real Madrid', 'Dortmund'] },
      ]},
      { name: 'Cuartos', matches: [
        { id: 'cl_qf', label: 'R. Madrid vs Arsenal', teams: ['Real Madrid', 'Arsenal'] },
      ]},
      { name: 'Semis', matches: [
        { id: 'cl_sf', label: 'R. Madrid vs Barcelona', teams: ['Real Madrid', 'Barcelona'] },
      ]},
      { name: 'Final', matches: [
        { id: 'cl_f', label: 'Gran Final', teams: ['TBD', 'TBD'] },
      ]},
    ]
  },
  generic: {
    name: 'Torneo',
    rounds: [
      { name: 'Ronda 1', matches: [{ id: 'r1', label: 'Partido 1', teams: ['Equipo A', 'Equipo B'] }] },
      { name: 'Semis', matches: [{ id: 'sf', label: 'Semifinal', teams: ['TBD', 'TBD'] }] },
      { name: 'Final', matches: [{ id: 'fin', label: 'Final', teams: ['TBD', 'TBD'] }] },
    ]
  }
};

function generateBetHistory(leaderboard, sport, home, away, tableMode, tournamentLogo) {
  const r = (min, max) => +(min + Math.random() * (max - min)).toFixed(2);
  const pool = BET_MARKETS_POOL[sport] || BET_MARKETS_POOL.football;

  // Replace generic names with actual team/player names
  const replaceNames = (s) => s.replace('Local', home).replace('Visitante', away)
    .replace('Jugador 1', home).replace('Jugador 2', away)
    .replace('Jugador A', home).replace('Jugador B', away).replace('Jugador C', home);

  // Get bracket matches for tournament filtering
  const bracket = TOURNAMENT_BRACKETS[tournamentLogo] || (tableMode === 'tournament' ? TOURNAMENT_BRACKETS.generic : null);
  const bracketMatches = bracket ? bracket.rounds.flatMap(r => r.matches) : [];

  const allBets = [];

  leaderboard.forEach(player => {
    const betCount = 8 + Math.floor(Math.random() * 3); // 8-10
    for (let i = 0; i < betCount; i++) {
      const mkt = pool[Math.floor(Math.random() * pool.length)];
      const sel = mkt.selections[Math.floor(Math.random() * mkt.selections.length)];
      const odd = r(1.3, 6.0);
      const isOpen = Math.random() > 0.5;
      const won = !isOpen ? Math.random() > 0.45 : null;
      const timeAgo = Math.floor(Math.random() * 120);

      const bet = {
        id: `${player.name}-${i}`,
        playerId: player.name,
        playerAvatar: player.avatar,
        isMe: player.isMe || false,
        market: replaceNames(mkt.market),
        selection: replaceNames(sel),
        odd: odd,
        isOpen: isOpen,
        won: won,
        timeAgo: timeAgo < 60 ? `hace ${timeAgo}m` : `hace ${Math.floor(timeAgo / 60)}h ${timeAgo % 60}m`,
        matchLabel: bracketMatches.length > 0
          ? bracketMatches[Math.floor(Math.random() * bracketMatches.length)].label
          : `${home} vs ${away}`,
        matchId: bracketMatches.length > 0
          ? bracketMatches[Math.floor(Math.random() * bracketMatches.length)].id
          : 'main',
      };
      allBets.push(bet);
    }
  });

  // Sort by time
  allBets.sort((a, b) => {
    const ta = parseInt(a.timeAgo.replace(/\D/g, ''));
    const tb = parseInt(b.timeAgo.replace(/\D/g, ''));
    return ta - tb;
  });

  return { bets: allBets, bracket };
}

window.generateBetHistory = generateBetHistory;
window.TOURNAMENT_BRACKETS = TOURNAMENT_BRACKETS;
