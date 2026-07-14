
// Match history data — all completed games for the user profile

const MATCH_HISTORY = [
  // Most recent first
  {
    id: 'mh1', type: 'rapid', sport: 'football', won: true,
    tableName: 'Partida Rápida — Fútbol', position: 2, amount: 42, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 35,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '2h 45m',
      leaderboard: [
        { rank: 1, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 4850 },
        { rank: 2, name: 'You', avatar: '#016394', balance: 3920, isMe: true },
        { rank: 3, name: 'SharkBets', avatar: '#E17055', balance: 3100 },
        { rank: 4, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 2400 },
        { rank: 5, name: 'ProGambler', avatar: '#A29BFE', balance: 2100 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
  {
    id: 'mh2', type: 'rapid', sport: 'free', won: false,
    tableName: 'Partida Rápida — Libre', position: 5, amount: 25, entry: 25,
    timestamp: Date.now() - 1000 * 60 * 60 * 30,
    resultData: {
      entry: 25, totalPlayers: 10, duration: '3h 00m',
      leaderboard: [
        { rank: 1, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 5200 },
        { rank: 2, name: 'NightOwlBet', avatar: '#FF7675', balance: 4100 },
        { rank: 3, name: 'AceBetter', avatar: '#55EFC4', balance: 3800 },
        { rank: 4, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 3200 },
        { rank: 5, name: 'You', avatar: '#016394', balance: 2900, isMe: true }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 237.5
    }
  },
  {
    id: 'mh3', type: 'rapid', sport: 'tennis', won: true,
    tableName: 'Partida Rápida — Tenis', position: 1, amount: 85, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 60 * 100,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '2h 30m',
      leaderboard: [
        { rank: 1, name: 'You', avatar: '#016394', balance: 6200, isMe: true },
        { rank: 2, name: 'SharkBets', avatar: '#E17055', balance: 5100 },
        { rank: 3, name: 'ProGambler', avatar: '#A29BFE', balance: 4400 },
        { rank: 4, name: 'RiskTaker_X', avatar: '#FAB1A0', balance: 3200 },
        { rank: 5, name: 'NewPlayer01', avatar: '#DFE6E9', balance: 2800 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
  {
    id: 'mh4', type: 'tournament', sport: 'football', won: false, tournamentLogo: 'champions',
    tableName: 'Champions League 2026 — Octavos', position: 8, amount: 35, entry: 35,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 15,
    resultData: {
      entry: 35, totalPlayers: 220, duration: '4d',
      leaderboard: [
        { rank: 1, name: 'SharkBets', avatar: '#E17055', balance: 9500 },
        { rank: 2, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 8200 },
        { rank: 3, name: 'ProGambler', avatar: '#A29BFE', balance: 7000 },
        { rank: 7, name: 'NightOwlBet', avatar: '#FF7675', balance: 4200 },
        { rank: 8, name: 'You', avatar: '#016394', balance: 3800, isMe: true }
      ],
      prizeDistribution: { first: 50, second: 30, third: 20 }, totalPrize: 7315
    }
  },
  {
    id: 'mh5', type: 'rapid', sport: 'football', won: true,
    tableName: 'Partida Rápida — Fútbol', position: 3, amount: 18, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 40,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '2h 15m',
      leaderboard: [
        { rank: 1, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 5400 },
        { rank: 2, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 4700 },
        { rank: 3, name: 'You', avatar: '#016394', balance: 4100, isMe: true },
        { rank: 4, name: 'AceBetter', avatar: '#55EFC4', balance: 3200 },
        { rank: 5, name: 'RiskTaker_X', avatar: '#FAB1A0', balance: 2600 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
  {
    id: 'mh6', type: 'rapid', sport: 'basketball', won: true,
    tableName: 'Partida Rápida — Basket', position: 1, amount: 120, entry: 50,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3,
    resultData: {
      entry: 50, totalPlayers: 10, duration: '2h 55m',
      leaderboard: [
        { rank: 1, name: 'You', avatar: '#016394', balance: 7200, isMe: true },
        { rank: 2, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 5900 },
        { rank: 3, name: 'NightOwlBet', avatar: '#FF7675', balance: 4800 },
        { rank: 4, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 3500 },
        { rank: 5, name: 'ProGambler', avatar: '#A29BFE', balance: 2900 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 475
    }
  },
  {
    id: 'mh7', type: 'tournament', sport: 'football', won: true, tournamentLogo: 'champions',
    tableName: 'Champions League 2026 — Grupos', position: 2, amount: 55, entry: 25,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 22,
    resultData: {
      entry: 25, totalPlayers: 312, duration: '7d',
      leaderboard: [
        { rank: 1, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 8200 },
        { rank: 2, name: 'You', avatar: '#016394', balance: 7100, isMe: true },
        { rank: 3, name: 'SharkBets', avatar: '#E17055', balance: 6400 },
        { rank: 4, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 5100 },
        { rank: 5, name: 'AceBetter', avatar: '#55EFC4', balance: 4300 }
      ],
      prizeDistribution: { first: 50, second: 30, third: 20 }, totalPrize: 5850
    }
  },
  {
    id: 'mh8', type: 'rapid', sport: 'tennis', won: false,
    tableName: 'Partida Rápida — Tenis', position: 7, amount: 10, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '1h 50m',
      leaderboard: [
        { rank: 1, name: 'AceBetter', avatar: '#55EFC4', balance: 5800 },
        { rank: 2, name: 'ProGambler', avatar: '#A29BFE', balance: 4600 },
        { rank: 3, name: 'SharkBets', avatar: '#E17055', balance: 4200 },
        { rank: 6, name: 'RiskTaker_X', avatar: '#FAB1A0', balance: 2100 },
        { rank: 7, name: 'You', avatar: '#016394', balance: 1800, isMe: true }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
  {
    id: 'mh9', type: 'rapid', sport: 'football', won: true,
    tableName: 'Partida Rápida — Fútbol', position: 1, amount: 57, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '2h 30m',
      leaderboard: [
        { rank: 1, name: 'You', avatar: '#016394', balance: 6800, isMe: true },
        { rank: 2, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 5200 },
        { rank: 3, name: 'NightOwlBet', avatar: '#FF7675', balance: 4100 },
        { rank: 4, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 3300 },
        { rank: 5, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 2800 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
  {
    id: 'mh10', type: 'rapid', sport: 'basketball', won: false,
    tableName: 'Partida Rápida — Basket', position: 6, amount: 25, entry: 25,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 9,
    resultData: {
      entry: 25, totalPlayers: 10, duration: '2h 40m',
      leaderboard: [
        { rank: 1, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 5400 },
        { rank: 2, name: 'ProGambler', avatar: '#A29BFE', balance: 4600 },
        { rank: 3, name: 'NewPlayer01', avatar: '#DFE6E9', balance: 3800 },
        { rank: 5, name: 'SharkBets', avatar: '#E17055', balance: 2700 },
        { rank: 6, name: 'You', avatar: '#016394', balance: 2200, isMe: true }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 237.5
    }
  },
  {
    id: 'mh11', type: 'rapid', sport: 'free', won: true,
    tableName: 'Partida Rápida — Libre', position: 2, amount: 30, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 12,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '2h 10m',
      leaderboard: [
        { rank: 1, name: 'NightOwlBet', avatar: '#FF7675', balance: 5500 },
        { rank: 2, name: 'You', avatar: '#016394', balance: 4800, isMe: true },
        { rank: 3, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 4200 },
        { rank: 4, name: 'AceBetter', avatar: '#55EFC4', balance: 3100 },
        { rank: 5, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 2600 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
  {
    id: 'mh12', type: 'rapid', sport: 'football', won: false,
    tableName: 'Partida Rápida — Fútbol', position: 4, amount: 50, entry: 50,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 18,
    resultData: {
      entry: 50, totalPlayers: 10, duration: '3h 00m',
      leaderboard: [
        { rank: 1, name: 'SharkBets', avatar: '#E17055', balance: 7200 },
        { rank: 2, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 6100 },
        { rank: 3, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 5200 },
        { rank: 4, name: 'You', avatar: '#016394', balance: 4100, isMe: true },
        { rank: 5, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 3400 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 475
    }
  },
  {
    id: 'mh13', type: 'tournament', sport: 'football', won: true, tournamentLogo: null,
    tableName: 'Copa Libertadores — Fase 1', position: 3, amount: 28, entry: 15,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 25,
    resultData: {
      entry: 15, totalPlayers: 150, duration: '5d',
      leaderboard: [
        { rank: 1, name: 'ProGambler', avatar: '#A29BFE', balance: 7800 },
        { rank: 2, name: 'NightOwlBet', avatar: '#FF7675', balance: 6500 },
        { rank: 3, name: 'You', avatar: '#016394', balance: 5900, isMe: true },
        { rank: 4, name: 'SharkBets', avatar: '#E17055', balance: 4800 },
        { rank: 5, name: 'RiskTaker_X', avatar: '#FAB1A0', balance: 3900 }
      ],
      prizeDistribution: { first: 50, second: 30, third: 20 }, totalPrize: 2137.5
    }
  },
  {
    id: 'mh14', type: 'rapid', sport: 'tennis', won: true,
    tableName: 'Partida Rápida — Tenis', position: 1, amount: 57, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 30,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '1h 45m',
      leaderboard: [
        { rank: 1, name: 'You', avatar: '#016394', balance: 5600, isMe: true },
        { rank: 2, name: 'AceBetter', avatar: '#55EFC4', balance: 4300 },
        { rank: 3, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 3700 },
        { rank: 4, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 2900 },
        { rank: 5, name: 'ProGambler', avatar: '#A29BFE', balance: 2100 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
  {
    id: 'mh15', type: 'rapid', sport: 'basketball', won: false,
    tableName: 'Partida Rápida — Basket', position: 8, amount: 10, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 35,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '2h 20m',
      leaderboard: [
        { rank: 1, name: 'RiskTaker_X', avatar: '#FAB1A0', balance: 4900 },
        { rank: 2, name: 'NewPlayer01', avatar: '#DFE6E9', balance: 3800 },
        { rank: 3, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 3200 },
        { rank: 7, name: 'NightOwlBet', avatar: '#FF7675', balance: 1600 },
        { rank: 8, name: 'You', avatar: '#016394', balance: 1200, isMe: true }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
  {
    id: 'mh16', type: 'rapid', sport: 'free', won: true,
    tableName: 'Partida Rápida — Libre', position: 1, amount: 142, entry: 25,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 42,
    resultData: {
      entry: 25, totalPlayers: 10, duration: '2h 55m',
      leaderboard: [
        { rank: 1, name: 'You', avatar: '#016394', balance: 7400, isMe: true },
        { rank: 2, name: 'SharkBets', avatar: '#E17055', balance: 6100 },
        { rank: 3, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 5200 },
        { rank: 4, name: 'ProGambler', avatar: '#A29BFE', balance: 4000 },
        { rank: 5, name: 'AceBetter', avatar: '#55EFC4', balance: 3100 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 237.5
    }
  },
  {
    id: 'mh17', type: 'tournament', sport: 'football', won: false, tournamentLogo: 'worldcup',
    tableName: 'Argentina Mundial 2026 — Amistosos', position: 12, amount: 20, entry: 20,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 48,
    resultData: {
      entry: 20, totalPlayers: 500, duration: '3d',
      leaderboard: [
        { rank: 1, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 9800 },
        { rank: 2, name: 'AceBetter', avatar: '#55EFC4', balance: 8500 },
        { rank: 3, name: 'RiskTaker_X', avatar: '#FAB1A0', balance: 7200 },
        { rank: 11, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 3400 },
        { rank: 12, name: 'You', avatar: '#016394', balance: 3100, isMe: true }
      ],
      prizeDistribution: { first: 50, second: 30, third: 20 }, totalPrize: 9500
    }
  },
  {
    id: 'mh18', type: 'rapid', sport: 'football', won: true,
    tableName: 'Partida Rápida — Fútbol', position: 2, amount: 23, entry: 10,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 55,
    resultData: {
      entry: 10, totalPlayers: 10, duration: '2h 00m',
      leaderboard: [
        { rank: 1, name: 'NightOwlBet', avatar: '#FF7675', balance: 5200 },
        { rank: 2, name: 'You', avatar: '#016394', balance: 4500, isMe: true },
        { rank: 3, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 3800 },
        { rank: 4, name: 'SharkBets', avatar: '#E17055', balance: 3000 },
        { rank: 5, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 2400 }
      ],
      prizeDistribution: { first: 60, second: 25, third: 15 }, totalPrize: 95
    }
  },
];

window.MATCH_HISTORY = MATCH_HISTORY;
