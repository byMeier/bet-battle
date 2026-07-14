
// Betting markets mock data generator
// Generates realistic odds and market structures per sport

function generateFootballMarkets(home, away, homePlayers, awayPlayers) {
  // Helper to generate realistic odds
  const r = (min, max) => +(min + Math.random() * (max - min)).toFixed(2);

  return {
    categories: ['Popular', 'Goles', 'Resultado', 'Tarjetas', 'Córners', 'Jugadores', 'Tiempos'],
    markets: [
      // ---- POPULAR ----
      {
        id: 'resultado_final', title: 'Resultado final', category: 'Popular',
        type: '1x2',
        columns: [home, 'Empate', away],
        rows: [{ label: '', odds: [r(1.6,2.8), r(2.5,3.8), r(2.2,4.5)] }]
      },
      {
        id: 'doble_oportunidad', title: 'Doble oportunidad', category: 'Popular',
        type: '1x2',
        columns: [`${home} o empate`, `Empate o ${away}`, `${home} o ${away}`],
        rows: [{ label: '', odds: [r(1.15,1.5), r(1.2,1.6), r(1.3,1.7)] }]
      },
      {
        id: 'ambos_anotan', title: 'Ambos equipos anotarán', category: 'Popular',
        type: 'yesno',
        rows: [{ label: '', odds: [r(1.7,2.4), r(1.5,1.9)] }]
      },
      {
        id: 'goles_over_under', title: 'Goles — Más/Menos de', category: 'Popular',
        type: 'overunder',
        columns: ['Más de', 'Menos de'],
        rows: [
          { label: '0.5', odds: [r(1.05,1.15), r(5.5,8.0)] },
          { label: '1.5', odds: [r(1.2,1.5), r(2.5,3.5)] },
          { label: '2.5', odds: [r(1.8,2.8), r(1.3,1.7)] },
          { label: '3.5', odds: [r(2.8,4.5), r(1.15,1.4)] },
          { label: '4.5', odds: [r(5.0,8.0), r(1.04,1.15)] },
        ]
      },

      // ---- GOLES ----
      {
        id: 'resultado_ambos_anotan', title: `Resultado / Ambos anotarán`, category: 'Goles',
        type: 'grid',
        columns: ['Sí', 'No'],
        rows: [
          { label: home, odds: [r(3.5,7.0), r(2.5,4.5)] },
          { label: away, odds: [r(5.0,10.0), r(3.0,5.5)] },
          { label: 'Empate', odds: [r(3.5,5.5), r(4.0,7.0)] },
        ]
      },
      {
        id: 'partido_rango_goles', title: 'Partido — Rango de goles', category: 'Goles',
        type: 'grid',
        columns: ['Sí', 'No'],
        rangeLabel: '1-3',
        rows: [{ label: 'Partido - Goles', odds: [r(1.2,1.5), r(2.5,3.5)] }]
      },
      {
        id: 'equipo_rango_goles', title: 'Equipo — Rango de goles', category: 'Goles',
        type: 'grid',
        columns: ['Sí', 'No'],
        rangeLabel: '1-3',
        rows: [
          { label: home, odds: [r(1.3,1.7), r(2.0,3.0)] },
          { label: away, odds: [r(1.4,1.9), r(1.8,2.8)] },
        ]
      },
      {
        id: 'marcador_correcto', title: 'Marcador correcto', category: 'Goles',
        type: 'correct_score',
        home: home, away: away,
        baseOdd: r(5.0,7.0)
      },
      {
        id: 'resultados_rango_goles', title: 'Resultados / Rango de goles', category: 'Goles',
        type: 'grid',
        columns: ['Sí', 'No'],
        rangeLabel: '2-4',
        rows: [
          { label: home, odds: [r(3.5,5.0), r(4.0,6.0)] },
          { label: 'Empate', odds: [r(4.0,6.0), r(5.0,7.0)] },
          { label: away, odds: [r(5.0,8.0), r(6.0,9.0)] },
        ]
      },
      {
        id: 'doble_oportunidad_rango', title: 'Doble oportunidad / Rango de goles', category: 'Goles',
        type: 'grid',
        columns: ['Sí', 'No'],
        rangeLabel: '2-4',
        rows: [
          { label: `${home} o empate`, odds: [r(2.0,2.5), r(2.5,3.2)] },
          { label: `Empate o ${away}`, odds: [r(2.5,3.0), r(3.0,3.8)] },
          { label: `${home} o ${away}`, odds: [r(2.2,2.8), r(2.8,3.5)] },
        ]
      },

      // ---- RESULTADO ----
      {
        id: 'empate_no_valida', title: 'Empate — Apuesta no válida', category: 'Resultado',
        type: '1x2_no_draw',
        columns: [home, away],
        rows: [{ label: '', odds: [r(1.3,1.8), r(1.9,2.8)] }]
      },
      {
        id: 'handicap', title: 'Hándicap', category: 'Resultado',
        type: 'grid',
        columns: [home, 'Empate', away],
        rows: [
          { label: '-1', odds: [r(3.0,5.0), r(3.0,4.0), r(1.5,2.2)] },
          { label: '+1', odds: [r(1.2,1.5), r(4.0,6.0), r(5.0,9.0)] },
        ]
      },
      {
        id: 'medio_tiempo', title: 'Medio tiempo / Final', category: 'Resultado',
        type: 'grid',
        columns: [home, 'Empate', away],
        rows: [
          { label: `${home} / ${home}`, odds: [r(2.5,4.5), null, null] },
          { label: `Empate / ${home}`, odds: [null, r(4.0,7.0), null] },
          { label: `${away} / ${away}`, odds: [null, null, r(5.0,10.0)] },
          { label: `Empate / Empate`, odds: [null, r(3.5,5.0), null] },
        ]
      },

      // ---- TARJETAS ----
      {
        id: 'tarjetas_over_under', title: 'Tarjetas — Más/Menos de', category: 'Tarjetas',
        type: 'overunder',
        columns: ['Más de', 'Menos de'],
        rows: [
          { label: '2.5', odds: [r(1.5,2.0), r(1.7,2.2)] },
          { label: '3.5', odds: [r(1.8,2.5), r(1.4,1.8)] },
          { label: '4.5', odds: [r(2.2,3.2), r(1.2,1.5)] },
        ]
      },
      {
        id: 'tarjetas_equipo', title: 'Tarjetas por equipo — Más/Menos de', category: 'Tarjetas',
        type: 'overunder_team',
        columns: ['Más de', 'Menos de'],
        teams: [
          { team: home, rows: [{ label: '1.5', odds: [r(1.6,2.2), r(1.5,2.0)] }, { label: '2.5', odds: [r(2.5,3.8), r(1.2,1.5)] }] },
          { team: away, rows: [{ label: '1.5', odds: [r(1.5,2.0), r(1.6,2.2)] }, { label: '2.5', odds: [r(2.3,3.5), r(1.2,1.6)] }] }
        ]
      },
      {
        id: 'tarjeta_roja', title: 'Tarjeta roja en el partido', category: 'Tarjetas',
        type: 'yesno',
        rows: [{ label: '', odds: [r(4.0,6.0), r(1.1,1.2)] }]
      },

      // ---- CÓRNERS ----
      {
        id: 'corners_over_under', title: 'Tiros de esquina — Más/Menos de', category: 'Córners',
        type: 'overunder3',
        columns: ['Más de', 'Exactamente', 'Menos de'],
        rows: [
          { label: '7', odds: [r(2.8,3.8), r(5.0,9.0), r(1.5,2.0)] },
          { label: '9', odds: [r(1.8,2.5), r(5.5,8.5), r(1.7,2.4)] },
          { label: '11', odds: [r(1.3,1.7), r(6.0,10.0), r(2.5,3.8)] },
        ]
      },
      {
        id: 'corners_equipo', title: 'Tiros de esquina por equipo', category: 'Córners',
        type: 'overunder_team',
        columns: ['Más de', 'Menos de'],
        teams: [
          { team: home, rows: [{ label: '3.5', odds: [r(1.6,2.2), r(1.5,2.0)] }, { label: '5.5', odds: [r(2.5,3.8), r(1.2,1.5)] }] },
          { team: away, rows: [{ label: '3.5', odds: [r(1.5,2.1), r(1.6,2.1)] }, { label: '5.5', odds: [r(2.3,3.5), r(1.3,1.6)] }] }
        ]
      },

      // ---- JUGADORES ----
      {
        id: 'jugador_gol_asist', title: 'Jugador — Anotará o asistencia', category: 'Jugadores',
        type: 'player_table',
        columns: ['Gol', 'Asistencia', 'Gol o Asist.'],
        players: [
          ...homePlayers.map(p => ({ ...p, team: home, odds: [r(2.5,6.5), r(3.5,9.5), r(2.0,3.5)] })),
          ...awayPlayers.map(p => ({ ...p, team: away, odds: [r(2.5,6.5), r(3.5,9.5), r(2.0,3.5)] })),
        ]
      },
      {
        id: 'primer_anotador', title: 'Primer anotador', category: 'Jugadores',
        type: 'player_list',
        players: [
          ...homePlayers.map(p => ({ ...p, team: home, odd: r(5.0,15.0) })),
          ...awayPlayers.map(p => ({ ...p, team: away, odd: r(5.0,15.0) })),
        ]
      },

      // ---- TIEMPOS ----
      {
        id: '1t_rango_goles', title: '1° tiempo — Rango de goles', category: 'Tiempos',
        type: 'grid',
        columns: ['Sí', 'No'],
        rangeLabel: '0-1',
        rows: [{ label: '1° tiempo - Goles', odds: [r(1.15,1.4), r(2.8,4.0)] }]
      },
      {
        id: '2t_rango_goles', title: '2° tiempo — Rango de goles', category: 'Tiempos',
        type: 'grid',
        columns: ['Sí', 'No'],
        rangeLabel: '1-2',
        rows: [{ label: '2° tiempo - Goles', odds: [r(1.3,1.6), r(2.2,3.2)] }]
      },
      {
        id: '1t_resultado', title: '1° tiempo — Resultado', category: 'Tiempos',
        type: '1x2',
        columns: [home, 'Empate', away],
        rows: [{ label: '', odds: [r(2.5,4.0), r(1.8,2.5), r(3.5,6.0)] }]
      },
      {
        id: '1t_goles_ou', title: '1° tiempo — Más/Menos goles', category: 'Tiempos',
        type: 'overunder',
        columns: ['Más de', 'Menos de'],
        rows: [
          { label: '0.5', odds: [r(1.5,2.0), r(1.7,2.2)] },
          { label: '1.5', odds: [r(3.0,4.5), r(1.15,1.35)] },
        ]
      },
    ]
  };
}

function generateBasketballMarkets(home, away, homePlayers, awayPlayers) {
  const r = (min, max) => +(min + Math.random() * (max - min)).toFixed(2);
  return {
    categories: ['Popular', 'Puntos', 'Resultado', 'Jugadores', 'Quarters'],
    markets: [
      {
        id: 'ganador', title: 'Ganador', category: 'Popular',
        type: '1x2_no_draw',
        columns: [home, away],
        rows: [{ label: '', odds: [r(1.5,2.5), r(1.5,2.5)] }]
      },
      {
        id: 'puntos_ou', title: 'Puntos — Más/Menos de', category: 'Popular',
        type: 'overunder',
        columns: ['Más de', 'Menos de'],
        rows: [
          { label: '200.5', odds: [r(1.7,2.1), r(1.7,2.1)] },
          { label: '210.5', odds: [r(1.85,2.3), r(1.6,1.95)] },
          { label: '220.5', odds: [r(2.2,2.8), r(1.4,1.7)] },
        ]
      },
      {
        id: 'handicap_bk', title: 'Hándicap', category: 'Resultado',
        type: 'overunder',
        columns: [home, away],
        rows: [
          { label: '-4.5', odds: [r(1.8,2.2), r(1.7,2.0)] },
          { label: '-8.5', odds: [r(2.2,2.8), r(1.4,1.7)] },
        ]
      },
      {
        id: 'puntos_equipo_ou', title: 'Puntos por equipo — Más/Menos', category: 'Puntos',
        type: 'overunder_team',
        columns: ['Más de', 'Menos de'],
        teams: [
          { team: home, rows: [{ label: '105.5', odds: [r(1.8,2.1), r(1.7,2.0)] }, { label: '110.5', odds: [r(2.1,2.6), r(1.5,1.8)] }] },
          { team: away, rows: [{ label: '105.5', odds: [r(1.75,2.1), r(1.7,2.05)] }, { label: '110.5', odds: [r(2.0,2.5), r(1.5,1.85)] }] },
        ]
      },
      {
        id: 'jugador_puntos', title: 'Jugador — Puntos', category: 'Jugadores',
        type: 'player_table',
        columns: ['Más 20.5', 'Más 25.5', 'Más 30.5'],
        players: [
          ...homePlayers.map(p => ({ ...p, team: home, odds: [r(1.5,2.2), r(2.2,3.5), r(3.5,6.0)] })),
          ...awayPlayers.map(p => ({ ...p, team: away, odds: [r(1.5,2.2), r(2.2,3.5), r(3.5,6.0)] })),
        ]
      },
      {
        id: '1q_ganador', title: '1er Quarter — Ganador', category: 'Quarters',
        type: '1x2_no_draw',
        columns: [home, away],
        rows: [{ label: '', odds: [r(1.8,2.2), r(1.8,2.2)] }]
      },
      {
        id: '1q_puntos', title: '1er Quarter — Más/Menos puntos', category: 'Quarters',
        type: 'overunder',
        columns: ['Más de', 'Menos de'],
        rows: [
          { label: '50.5', odds: [r(1.75,2.1), r(1.75,2.1)] },
          { label: '55.5', odds: [r(2.1,2.6), r(1.5,1.8)] },
        ]
      },
    ]
  };
}

function generateTennisMarkets(home, away, homePlayers, awayPlayers) {
  const r = (min, max) => +(min + Math.random() * (max - min)).toFixed(2);
  return {
    categories: ['Popular', 'Sets', 'Games', 'Jugadores'],
    markets: [
      {
        id: 'ganador_t', title: 'Ganador del partido', category: 'Popular',
        type: '1x2_no_draw',
        columns: [home, away],
        rows: [{ label: '', odds: [r(1.4,2.5), r(1.5,2.8)] }]
      },
      {
        id: 'total_sets', title: 'Total sets', category: 'Popular',
        type: 'overunder',
        columns: ['Más de', 'Menos de'],
        rows: [
          { label: '2.5', odds: [r(1.6,2.3), r(1.6,2.3)] },
          { label: '3.5', odds: [r(2.5,4.0), r(1.2,1.5)] },
        ]
      },
      {
        id: 'resultado_sets', title: 'Resultado en sets', category: 'Sets',
        type: 'grid',
        columns: [home, away],
        rows: [
          { label: '2-0', odds: [r(2.0,3.5), r(2.5,4.5)] },
          { label: '2-1', odds: [r(3.0,4.5), r(3.5,5.5)] },
          { label: '0-2', odds: [r(2.5,4.5), r(2.0,3.5)] },
          { label: '1-2', odds: [r(3.5,5.5), r(3.0,4.5)] },
        ]
      },
      {
        id: 'games_ou', title: 'Total games — Más/Menos', category: 'Games',
        type: 'overunder',
        columns: ['Más de', 'Menos de'],
        rows: [
          { label: '20.5', odds: [r(1.7,2.2), r(1.7,2.1)] },
          { label: '22.5', odds: [r(1.9,2.5), r(1.5,1.9)] },
          { label: '24.5', odds: [r(2.3,3.0), r(1.3,1.6)] },
        ]
      },
      {
        id: '1set_ganador', title: '1er Set — Ganador', category: 'Sets',
        type: '1x2_no_draw',
        columns: [home, away],
        rows: [{ label: '', odds: [r(1.6,2.2), r(1.6,2.2)] }]
      },
      {
        id: 'aces_ou', title: 'Aces — Más/Menos', category: 'Jugadores',
        type: 'overunder_team',
        columns: ['Más de', 'Menos de'],
        teams: [
          { team: home, rows: [{ label: '4.5', odds: [r(1.7,2.2), r(1.6,2.0)] }] },
          { team: away, rows: [{ label: '4.5', odds: [r(1.6,2.1), r(1.7,2.1)] }] },
        ]
      },
    ]
  };
}

// Players data per team
const TEAM_PLAYERS = {
  'Arsenal': [
    { name: 'B. Saka', number: 7 }, { name: 'K. Havertz', number: 29 },
    { name: 'G. Martinelli', number: 11 }, { name: 'M. Ødegaard', number: 8 },
    { name: 'L. Trossard', number: 19 }, { name: 'D. Rice', number: 41 },
  ],
  'Liverpool': [
    { name: 'M. Salah', number: 11 }, { name: 'D. Núñez', number: 9 },
    { name: 'L. Díaz', number: 7 }, { name: 'D. Jota', number: 20 },
    { name: 'C. Gakpo', number: 18 }, { name: 'A. Mac Allister', number: 10 },
  ],
  'Real Madrid': [
    { name: 'V. Jr.', number: 7 }, { name: 'J. Bellingham', number: 5 },
    { name: 'K. Mbappé', number: 9 }, { name: 'Rodrygo', number: 11 },
    { name: 'L. Modrić', number: 10 }, { name: 'E. Valverde', number: 8 },
  ],
  'Man City': [
    { name: 'E. Haaland', number: 9 }, { name: 'P. Foden', number: 47 },
    { name: 'J. Grealish', number: 10 }, { name: 'B. Silva', number: 20 },
    { name: 'K. De Bruyne', number: 17 }, { name: 'J. Doku', number: 11 },
  ],
  'Barcelona': [
    { name: 'R. Lewandowski', number: 9 }, { name: 'L. Yamal', number: 19 },
    { name: 'Raphinha', number: 11 }, { name: 'Pedri', number: 8 },
    { name: 'F. Torres', number: 7 }, { name: 'D. Olmo', number: 20 },
  ],
  'Atlético': [
    { name: 'A. Griezmann', number: 7 }, { name: 'Á. Correa', number: 10 },
    { name: 'A. Sörloth', number: 9 }, { name: 'J. Álvarez', number: 19 },
    { name: 'S. Lino', number: 12 }, { name: 'R. De Paul', number: 5 },
  ],
  'Lakers': [
    { name: 'L. James', number: 23 }, { name: 'A. Davis', number: 3 },
    { name: 'A. Reaves', number: 15 }, { name: 'D. Russell', number: 1 },
    { name: 'R. Hachimura', number: 28 }, { name: 'J. Redick', number: 4 },
  ],
  'Celtics': [
    { name: 'J. Tatum', number: 0 }, { name: 'J. Brown', number: 7 },
    { name: 'D. White', number: 8 }, { name: 'K. Porzingis', number: 8 },
    { name: 'J. Holiday', number: 4 }, { name: 'A. Horford', number: 42 },
  ],
  'Djokovic': [{ name: 'N. Djokovic', number: 1 }],
  'Alcaraz': [{ name: 'C. Alcaraz', number: 1 }],
  'Sabalenka': [{ name: 'A. Sabalenka', number: 1 }],
  'Swiatek': [{ name: 'I. Swiatek', number: 1 }],
  'Sinner': [{ name: 'J. Sinner', number: 1 }],
  'Zverev': [{ name: 'A. Zverev', number: 1 }],
  'Nadal': [{ name: 'R. Nadal', number: 1 }],
  'Ruud': [{ name: 'C. Ruud', number: 1 }],
  'Murray': [{ name: 'A. Murray', number: 1 }],
  'Medvedev': [{ name: 'D. Medvedev', number: 1 }],
  'Inter': [
    { name: 'L. Martínez', number: 10 }, { name: 'M. Thuram', number: 9 },
    { name: 'H. Çalhanoğlu', number: 20 }, { name: 'N. Barella', number: 23 },
  ],
  'AC Milan': [
    { name: 'R. Leão', number: 10 }, { name: 'O. Giroud', number: 9 },
    { name: 'C. Pulisic', number: 11 }, { name: 'T. Reijnders', number: 14 },
  ],
  'Bayern': [
    { name: 'H. Kane', number: 9 }, { name: 'J. Musiala', number: 42 },
    { name: 'L. Sané', number: 10 }, { name: 'S. Gnabry', number: 7 },
  ],
  'Dortmund': [
    { name: 'S. Fullkrug', number: 14 }, { name: 'J. Brandt', number: 19 },
    { name: 'M. Reus', number: 11 }, { name: 'K. Adeyemi', number: 27 },
  ],
  'Warriors': [
    { name: 'S. Curry', number: 30 }, { name: 'K. Thompson', number: 11 },
    { name: 'A. Wiggins', number: 22 }, { name: 'D. Green', number: 23 },
  ],
  'Bucks': [
    { name: 'G. Antetokounmpo', number: 34 }, { name: 'D. Lillard', number: 0 },
    { name: 'K. Middleton', number: 22 }, { name: 'B. Lopez', number: 11 },
  ],
  'Real Madrid Basket': [
    { name: 'S. Llull', number: 23 }, { name: 'G. Deck', number: 1 },
    { name: 'F. Causeur', number: 2 }, { name: 'W. Tavares', number: 22 },
  ],
  'Olympiacos': [
    { name: 'S. Vezenkov', number: 17 }, { name: 'K. Sloukas', number: 11 },
    { name: 'T. Walkup', number: 10 }, { name: 'M. Fall', number: 33 },
  ],
  'River Plate': [
    { name: 'M. Borja', number: 9 }, { name: 'N. De La Cruz', number: 10 },
    { name: 'P. Solari', number: 7 }, { name: 'E. Barco', number: 28 },
  ],
  'Boca Juniors': [
    { name: 'E. Cavani', number: 10 }, { name: 'M. Merentiel', number: 16 },
    { name: 'K. Mac Allister', number: 28 }, { name: 'S. Romero', number: 1 },
  ],
  'PSG': [
    { name: 'O. Dembélé', number: 10 }, { name: 'R. Kolo Muani', number: 23 },
    { name: 'Bradley Barcola', number: 29 }, { name: 'V. Zaïre-Emery', number: 33 },
  ],
  'Marseille': [
    { name: 'P. Aubameyang', number: 10 }, { name: 'J. Clauss', number: 7 },
    { name: 'A. Sanchez', number: 9 }, { name: 'V. Rongier', number: 21 },
  ],
  'Rosario Central': [
    { name: 'A. Marinelli', number: 10 }, { name: 'G. Vecchio', number: 7 },
  ],
  'Libertad Asunción': [
    { name: 'H. Villalba', number: 9 }, { name: 'D. Cardozo', number: 10 },
  ],
  'Topuria': [{ name: 'I. Topuria', number: 1 }],
  'Holloway': [{ name: 'M. Holloway', number: 1 }],
  'Nuggets': [
    { name: 'N. Jokic', number: 15 }, { name: 'J. Murray', number: 27 },
    { name: 'M. Porter Jr.', number: 1 }, { name: 'A. Gordon', number: 50 },
  ],
  'Thunder': [
    { name: 'S. Gilgeous-Alexander', number: 2 }, { name: 'J. Williams', number: 12 },
    { name: 'C. Holmgren', number: 7 }, { name: 'L. Dort', number: 5 },
  ],
};

// Main generator: picks the right sport
function generateBettingMarkets(match) {
  const home = match.home;
  const away = match.away;
  const hp = TEAM_PLAYERS[home] || [{ name: 'Jugador 1', number: 10 }, { name: 'Jugador 2', number: 7 }];
  const ap = TEAM_PLAYERS[away] || [{ name: 'Jugador 1', number: 9 }, { name: 'Jugador 2', number: 11 }];

  if (match.sport === 'basketball') return generateBasketballMarkets(home, away, hp, ap);
  if (match.sport === 'tennis') return generateTennisMarkets(home, away, hp, ap);
  return generateFootballMarkets(home, away, hp, ap);
}

window.generateBettingMarkets = generateBettingMarkets;
window.TEAM_PLAYERS = TEAM_PLAYERS;
