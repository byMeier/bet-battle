
// Tournament-specific tabs — multiple matchdays, progress, future matches

// Tournament matchday data
const TOURNAMENT_MATCHDAYS = [
{
  id: 'md1', label: '16avos', date: '05 May', status: 'live',
  matches: [
  { id: 't1', sport: 'football', league: 'Champions League', home: 'Real Madrid', away: 'Man City', homeColor: '#D4AF37', awayColor: '#6CABDD', score: '1 - 0', minute: "62'", date: '05 May', time: '21:00', odds: { home: 1.85, draw: 3.40, away: 2.10 }, status: 'live', markets: 67 },
  { id: 't2', sport: 'football', league: 'Champions League', home: 'Arsenal', away: 'Atlético', homeColor: '#EF0107', awayColor: '#CE3524', score: '2 - 1', minute: "78'", date: '05 May', time: '21:00', odds: { home: 1.45, draw: 4.20, away: 3.80 }, status: 'live', markets: 55 },
  { id: 't3', sport: 'football', league: 'Champions League', home: 'Barcelona', away: 'PSG', homeColor: '#A50044', awayColor: '#004170', score: '0 - 0', minute: "25'", date: '05 May', time: '18:45', odds: { home: 1.60, draw: 3.80, away: 4.50 }, status: 'live', markets: 48 },
  { id: 't1b', sport: 'football', league: 'Champions League', home: 'Bayern', away: 'Porto', homeColor: '#DC052D', awayColor: '#003087', date: '05 May', time: '18:45', odds: { home: 1.35, draw: 5.00, away: 7.50 }, status: 'live', score: '1 - 1', minute: "55'", markets: 60 }]

},
{
  id: 'md2', label: '8vos', date: '08 May', status: 'upcoming',
  matches: [
  { id: 't4', sport: 'football', league: 'Champions League', home: 'A confirmar', away: 'A confirmar', homeColor: '#555', awayColor: '#555', date: '08 May', time: '16:00', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0, tbd: true },
  { id: 't5', sport: 'football', league: 'Champions League', home: 'A confirmar', away: 'A confirmar', homeColor: '#555', awayColor: '#555', date: '08 May', time: '16:00', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0, tbd: true },
  { id: 't6', sport: 'football', league: 'Champions League', home: 'A confirmar', away: 'A confirmar', homeColor: '#555', awayColor: '#555', date: '08 May', time: '21:00', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0, tbd: true },
  { id: 't6b', sport: 'football', league: 'Champions League', home: 'A confirmar', away: 'A confirmar', homeColor: '#555', awayColor: '#555', date: '08 May', time: '21:00', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0, tbd: true }]

},
{
  id: 'md3', label: 'Cuartos', date: '12 May', status: 'upcoming',
  matches: [
  { id: 't7', sport: 'football', league: 'Champions League', home: 'A confirmar', away: 'A confirmar', homeColor: '#555', awayColor: '#555', date: '12 May', time: '21:00', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0, tbd: true },
  { id: 't8', sport: 'football', league: 'Champions League', home: 'A confirmar', away: 'A confirmar', homeColor: '#555', awayColor: '#555', date: '12 May', time: '21:00', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0, tbd: true }]

},
{
  id: 'md4', label: 'Semis', date: '19 May', status: 'locked',
  matches: []
},
{
  id: 'md5', label: 'Final', date: '26 May', status: 'locked',
  matches: []
}];


// Phase-specific matchdays — each phase only shows its own matches
const PHASE_MATCHDAYS = {};

// Cuartos de Final (live) — only its own matchdays, no Semis/Final
PHASE_MATCHDAYS['cl-quarters'] = TOURNAMENT_MATCHDAYS.filter((md) => ['md1', 'md2', 'md3'].includes(md.id));

// Fase de Grupos — completed
PHASE_MATCHDAYS['cl-groups'] = [
{ id: 'g1', label: 'Fecha 1', date: '15 Abr', status: 'completed',
  matches: [
  { id: 'g1a', sport: 'football', league: 'CL - Grupo A', home: 'Real Madrid', away: 'AC Milan', homeColor: '#D4AF37', awayColor: '#E4002B', score: '3 - 1', minute: 'FT', odds: { home: 1.50, draw: 4.20, away: 5.50 }, status: 'completed', markets: 45 },
  { id: 'g1b', sport: 'football', league: 'CL - Grupo B', home: 'Man City', away: 'PSG', homeColor: '#6CABDD', awayColor: '#004170', score: '2 - 2', minute: 'FT', odds: { home: 1.70, draw: 3.60, away: 4.20 }, status: 'completed', markets: 52 },
  { id: 'g1c', sport: 'football', league: 'CL - Grupo C', home: 'Bayern', away: 'Inter', homeColor: '#DC052D', awayColor: '#0068A8', score: '1 - 0', minute: 'FT', odds: { home: 1.60, draw: 3.80, away: 5.00 }, status: 'completed', markets: 48 }]

},
{ id: 'g2', label: 'Fecha 2', date: '17 Abr', status: 'completed',
  matches: [
  { id: 'g2a', sport: 'football', league: 'CL - Grupo A', home: 'AC Milan', away: 'Real Madrid', homeColor: '#E4002B', awayColor: '#D4AF37', score: '0 - 2', minute: 'FT', odds: { home: 2.80, draw: 3.40, away: 2.40 }, status: 'completed', markets: 45 },
  { id: 'g2b', sport: 'football', league: 'CL - Grupo B', home: 'PSG', away: 'Man City', homeColor: '#004170', awayColor: '#6CABDD', score: '1 - 3', minute: 'FT', odds: { home: 2.20, draw: 3.30, away: 3.10 }, status: 'completed', markets: 50 },
  { id: 'g2c', sport: 'football', league: 'CL - Grupo C', home: 'Arsenal', away: 'Dortmund', homeColor: '#EF0107', awayColor: '#FDE100', score: '2 - 0', minute: 'FT', odds: { home: 1.65, draw: 3.70, away: 4.80 }, status: 'completed', markets: 55 }]

},
{ id: 'g3', label: 'Fecha 3', date: '22 Abr', status: 'completed',
  matches: [
  { id: 'g3a', sport: 'football', league: 'CL - Grupo A', home: 'Dortmund', away: 'AC Milan', homeColor: '#FDE100', awayColor: '#E4002B', score: '3 - 1', minute: 'FT', odds: { home: 1.90, draw: 3.40, away: 3.80 }, status: 'completed', markets: 50 },
  { id: 'g3b', sport: 'football', league: 'CL - Grupo C', home: 'Inter', away: 'Bayern', homeColor: '#0068A8', awayColor: '#DC052D', score: '1 - 1', minute: 'FT', odds: { home: 3.10, draw: 3.20, away: 2.20 }, status: 'completed', markets: 48 }]

}];


// Octavos de Final — completed
PHASE_MATCHDAYS['cl-r16'] = [
{ id: 'r1', label: 'Ida', date: '24 Abr', status: 'completed',
  matches: [
  { id: 'r1a', sport: 'football', league: 'CL - Octavos', home: 'Real Madrid', away: 'Dortmund', homeColor: '#D4AF37', awayColor: '#FDE100', score: '2 - 0', minute: 'FT', odds: { home: 1.55, draw: 4.00, away: 5.20 }, status: 'completed', markets: 60 },
  { id: 'r1b', sport: 'football', league: 'CL - Octavos', home: 'Arsenal', away: 'Inter', homeColor: '#EF0107', awayColor: '#0068A8', score: '1 - 1', minute: 'FT', odds: { home: 1.80, draw: 3.50, away: 4.00 }, status: 'completed', markets: 55 },
  { id: 'r1c', sport: 'football', league: 'CL - Octavos', home: 'Man City', away: 'AC Milan', homeColor: '#6CABDD', awayColor: '#E4002B', score: '3 - 0', minute: 'FT', odds: { home: 1.45, draw: 4.30, away: 6.00 }, status: 'completed', markets: 58 }]

},
{ id: 'r2', label: 'Vuelta', date: '28 Abr', status: 'completed',
  matches: [
  { id: 'r2a', sport: 'football', league: 'CL - Octavos', home: 'Dortmund', away: 'Real Madrid', homeColor: '#FDE100', awayColor: '#D4AF37', score: '1 - 1', minute: 'FT', odds: { home: 2.40, draw: 3.30, away: 2.80 }, status: 'completed', markets: 60 },
  { id: 'r2b', sport: 'football', league: 'CL - Octavos', home: 'Inter', away: 'Arsenal', homeColor: '#0068A8', awayColor: '#EF0107', score: '0 - 2', minute: 'FT', odds: { home: 2.60, draw: 3.20, away: 2.70 }, status: 'completed', markets: 55 }]

}];


// Semifinales — upcoming, matches TBD
PHASE_MATCHDAYS['cl-semis'] = [
{ id: 's1', label: 'Ida', date: '12 May', status: 'upcoming',
  matches: [
  { id: 's1a', sport: 'football', league: 'CL - Semis', home: 'Por definir', away: 'Por definir', homeColor: '#555', awayColor: '#555', time: '21:00', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0 }]

},
{ id: 's2', label: 'Vuelta', date: '19 May', status: 'upcoming',
  matches: [
  { id: 's2a', sport: 'football', league: 'CL - Semis', home: 'Por definir', away: 'Por definir', homeColor: '#555', awayColor: '#555', time: '21:00', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0 }]

}];


// Final — locked
PHASE_MATCHDAYS['cl-final'] = [
{ id: 'f1', label: 'Final', date: '26 May', status: 'locked', matches: [] }];


// World Cup — Fase de Grupos upcoming
PHASE_MATCHDAYS['wc-groups'] = [
{ id: 'wg1', label: 'Fecha 1', date: '14 Jun', status: 'upcoming',
  matches: [
  { id: 'wg1a', sport: 'football', league: 'Grupo C', home: 'Argentina', away: 'Arabia Saudita', homeColor: '#75AADB', awayColor: '#006C35', time: '13:00', odds: { home: 1.15, draw: 8.50, away: 21.00 }, status: 'upcoming', markets: 85 },
  { id: 'wg1b', sport: 'football', league: 'Grupo C', home: 'México', away: 'Polonia', homeColor: '#006847', awayColor: '#DC143C', time: '19:00', odds: { home: 2.20, draw: 3.20, away: 3.30 }, status: 'upcoming', markets: 72 }]

},
{ id: 'wg2', label: 'Fecha 2', date: '18 Jun', status: 'upcoming',
  matches: [
  { id: 'wg2a', sport: 'football', league: 'Grupo C', home: 'Argentina', away: 'México', homeColor: '#75AADB', awayColor: '#006847', time: '19:00', odds: { home: 1.40, draw: 4.50, away: 7.50 }, status: 'upcoming', markets: 80 },
  { id: 'wg2b', sport: 'football', league: 'Grupo C', home: 'Polonia', away: 'Arabia Saudita', homeColor: '#DC143C', awayColor: '#006C35', time: '13:00', odds: { home: 1.60, draw: 3.80, away: 5.50 }, status: 'upcoming', markets: 65 }]

},
{ id: 'wg3', label: 'Fecha 3', date: '26 Jun', status: 'upcoming',
  matches: [
  { id: 'wg3a', sport: 'football', league: 'Grupo C', home: 'Argentina', away: 'Polonia', homeColor: '#75AADB', awayColor: '#DC143C', time: '19:00', odds: { home: 1.35, draw: 5.00, away: 8.00 }, status: 'upcoming', markets: 78 },
  { id: 'wg3b', sport: 'football', league: 'Grupo C', home: 'Arabia Saudita', away: 'México', homeColor: '#006C35', awayColor: '#006847', time: '19:00', odds: { home: 4.00, draw: 3.40, away: 1.90 }, status: 'upcoming', markets: 68 }]

}];


// WC other phases — locked
var wcPhaseLabels = { 'wc-r16': '8vos', 'wc-quarters': 'Cuartos', 'wc-semis': 'Semi', 'wc-final': 'Final' };
['wc-r16', 'wc-quarters', 'wc-semis', 'wc-final'].forEach(function (pid) {
  PHASE_MATCHDAYS[pid] = [
  { id: pid + '-1', label: wcPhaseLabels[pid], date: '—', status: 'locked', matches: [] }];

});

window.PHASE_MATCHDAYS = PHASE_MATCHDAYS;

function TournamentGameTabs({ leaderboard, myBets, onPlaceBet, tableMatch, onMarketBet, selectedBets, table, historyPlayer, onSelectHistoryPlayer, balance, myBetCount }) {
  // Use phase-specific matchdays if entering a single phase, otherwise all tournament matchdays
  // Get matchdays: phase-specific > tournament aggregate > fallback
  const matchdays = React.useMemo(() => {
    if (table && table.phaseId && PHASE_MATCHDAYS[table.phaseId]) return PHASE_MATCHDAYS[table.phaseId];
    if (table && table.phases) {
      const all = [];
      table.phases.forEach((phase) => {
        const pmd = PHASE_MATCHDAYS[phase.id];
        if (pmd) {
          pmd.forEach((md) => {
            all.push({ ...md, phaseLabel: phase.label });
          });
        } else if (phase.status === 'locked' || phase.status === 'upcoming') {
          all.push({ id: phase.id + '-md', label: phase.label, date: phase.dateRange ? phase.dateRange.split(' ')[0] : '—', status: phase.status === 'locked' ? 'locked' : 'upcoming', matches: phase.status === 'upcoming' ? [
            { id: phase.id + '-tbd1', sport: table.category || 'football', league: table.title || '', home: 'A confirmar', away: 'A confirmar', homeColor: '#555', awayColor: '#555', time: '—', odds: { home: 0, draw: 0, away: 0 }, status: 'upcoming', markets: 0, tbd: true }] :
            [] });
        }
      });
      if (all.length > 0) return all;
    }
    return TOURNAMENT_MATCHDAYS;
  }, [table]);
  const [tab, setTab] = React.useState('matchdays');
  const [selectedMatchday, setSelectedMatchday] = React.useState(matchdays[0] ? matchdays[0].id : 'md1');
  const [showFullRanking, setShowFullRanking] = React.useState(false);
  const [rankingSearch, setRankingSearch] = React.useState('');
  const filteredRanking = React.useMemo(() => {
    if (!rankingSearch.trim()) return leaderboard;
    const q = rankingSearch.toLowerCase();
    return leaderboard.filter((p) => p.name.toLowerCase().includes(q));
  }, [leaderboard, rankingSearch]);
  const tabs = [
  { id: 'matchdays', label: 'Fechas', icon: 'assets/fechas-tab.svg' },
  { id: 'progress', label: 'Mi Torneo', icon: 'assets/user-tab.svg' },
  { id: 'leaderboard', label: 'Ranking', icon: 'assets/ranking.svg' },
  { id: 'history', label: 'Historial', icon: 'assets/history.svg' }];


  const currentMD = matchdays.find((md) => md.id === selectedMatchday);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: "4px 0px 0px" }}>
      {/* Tabs */}
      <div style={{ display: 'flex', margin: '10px 12px', background: C.card, borderRadius: 16, padding: 3 }}>
        {tabs.map((t) =>
        <button key={t.id} onClick={() => setTab(t.id)} style={{
          flex: 1, padding: '9px 6px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          background: tab === t.id ? C.accent : 'transparent',
          color: tab === t.id ? '#fff' : C.text3, border: 'none', borderRadius: 12,
          whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
        }}>{t.icon && <img src={t.icon} width={12} height={12} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: tab === t.id ? 1 : 0.5 }} />}{t.label}</button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* MATCHDAYS TAB */}
        {tab === 'matchdays' &&
        <div>
            {/* Matchday selector — horizontal scroll */}
            <div className="hide-scrollbar" style={{
            display: 'flex', gap: 6, overflowX: 'auto',
            WebkitOverflowScrolling: 'touch', borderBottom: '1px solid ' + C.border, borderWidth: "0px", borderBottomStyle: "solid", borderBottomColor: "rgb(42, 48, 54)", padding: "0px 14px 10px"
          }}>
              {matchdays.map((md) => {
              const isActive = md.id === selectedMatchday;
              const isLive = md.status === 'live';
              const isLocked = md.status === 'locked';
              return (
                <button key={md.id} onClick={() => !isLocked && setSelectedMatchday(md.id)} style={{
                  flex: '0 0 auto', padding: '8px 14px', borderRadius: 10, cursor: isLocked ? 'default' : 'pointer',
                  background: isActive ? '#016394' : '#171C1F',
                  border: 'none',
                  opacity: isLocked ? 0.4 : 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {isLive && <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.red, animation: 'blink 1.5s infinite' }}></span>}
                      <span style={{ ...{ fontSize: 11, fontWeight: 700, color: isActive ? C.text1 : C.text2 }, color: "rgba(255, 255, 255, 0.9)" }}>{md.label}</span>
                    </div>
                    <span style={{ ...{ fontSize: 9, color: C.text3 }, color: "rgb(255, 255, 255)" }}>{md.date}</span>
                  </button>);

            })}
            </div>

            {/* Matches for selected matchday */}
            {currentMD && currentMD.matches.length > 0 ?
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: "0px 14px 10px" }}>
                {currentMD.matches.map((match) =>
            <TournamentMatchCard key={match.id} match={match} matchday={currentMD} onMarketBet={onMarketBet} selectedBets={selectedBets} />
            )}
              </div> :
          currentMD && currentMD.status === 'locked' ?
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <div style={{ fontSize: 13, color: C.text3, fontWeight: 600 }}>Por definir</div>
                <div style={{ fontSize: 11, color: C.text3, marginTop: 4 }}>Los partidos se definirán según los resultados</div>
              </div> :

          <div style={{ textAlign: 'center', padding: '40px 20px', color: C.text3, fontSize: 12 }}>
                Sin partidos para esta fecha
              </div>
          }
          </div>
        }

        {/* MY TOURNAMENT PROGRESS */}
        {tab === 'progress' &&
        <div style={{ padding: "0px 14px 14px" }}>
            {/* Progress overview card */}
            <div style={{ background: C.card, borderRadius: 16, padding: '16px', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>Mi progreso</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }}></span>
                  <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>Activo</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                <div style={{ padding: '10px', background: C.bgLight, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.text3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 3 }}>Posición</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.yellow }}>#{leaderboard.find((p) => p.isMe)?.rank || '-'}</div>
                  <div style={{ fontSize: 9, color: C.text3 }}>de {table && table.players > 0 ? table.players.toLocaleString() : leaderboard.length}</div>
                </div>
                <div style={{ padding: '10px', background: C.bgLight, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.text3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 3 }}>Fichas</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.green }}>{balance}</div>
                </div>
                <div style={{ padding: '10px', background: C.bgLight, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.text3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 3 }}>Apuestas</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.text1 }}>{myBetCount}</div>
                </div>
              </div>

              {/* Tournament timeline */}
              <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Calendario</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {matchdays.map((md, i) => {
                const isLive = md.status === 'live';
                const isUpcoming = md.status === 'upcoming';
                const isLocked = md.status === 'locked';
                const dotColor = isLive ? C.red : isUpcoming ? C.accent : C.border;
                return (
                  <div key={md.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16 }}>
                        <div style={{
                        width: 10, height: 10, borderRadius: '50%', background: dotColor,
                        border: isLive ? '2px solid ' + C.red + '40' : 'none',
                        animation: isLive ? 'blink 1.5s infinite' : 'none'
                      }}></div>
                        {i < matchdays.length - 1 &&
                      <div style={{ width: 2, height: 28, background: C.border, marginTop: 2 }}></div>
                      }
                      </div>
                      <div style={{ flex: 1, paddingBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: isLive ? C.text1 : isLocked ? C.text3 : C.text2 }}>{md.label}</span>
                          {isLive && <span style={{ fontSize: 8, fontWeight: 700, color: C.red, padding: '1px 5px', background: C.red + '15', borderRadius: 20 }}>EN VIVO</span>}
                          {isUpcoming && <span style={{ fontSize: 8, fontWeight: 600, color: C.text3 }}>{md.date}</span>}
                          {isLocked && <span style={{ fontSize: 8, fontWeight: 600, color: C.text3 }}>Por definir</span>}
                        </div>
                        <div style={{ fontSize: 10, color: C.text3, marginTop: 2 }}>
                          {md.matches.length > 0 ? md.matches.length + ' partidos' : isLocked ? 'Depende de resultados' : 'Sin partidos'}
                        </div>
                      </div>
                    </div>);

              })}
              </div>
            </div>

            {/* Prize structure — top 20% */}
            <div style={{ background: C.card, borderRadius: 16, padding: '16px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text1, marginBottom: 4 }}>Premios del torneo</div>
              <div style={{ fontSize: 10, color: C.text3, marginBottom: 12 }}>Top 20% de participantes ganan premios</div>
              {(() => {
              const totalPlayers = table && table.players > 0 ? table.players : leaderboard.length;
              const winnerCount = getTournamentWinnerCount(totalPlayers);
              const prize = table ? table.prize : 0;
              const bands = getTournamentPrizeBands(totalPlayers, prize);
              const showBands = bands.slice(0, 6);
              const bandColors = [C.yellow, '#C0C0C0', '#CD7F32', C.text2, C.text3, C.text3];
              return (
                <React.Fragment>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, padding: '8px 10px', background: C.bgLight, borderRadius: 8 }}>
                      <span style={{ fontSize: 10, color: C.text3 }}>Participantes:</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{totalPlayers}</span>
                      <span style={{ fontSize: 10, color: C.text3, marginLeft: 'auto' }}>Pagan:</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{winnerCount} jugadores</span>
                    </div>
                    {showBands.map((b, i) =>
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 10px', marginBottom: 4, background: C.bgLight, borderRadius: 8
                  }}>
                        <span style={{ fontSize: 12, color: C.text1 }}>{b.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 10, color: C.text3 }}>{b.pct}%</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: bandColors[Math.min(i, bandColors.length - 1)] }}>
                            ${b.amount.toLocaleString()}{b.perPerson ? ' c/u' : ''}
                          </span>
                        </div>
                      </div>
                  )}
                    {bands.length > 6 && <div style={{ fontSize: 9, color: C.text3, textAlign: 'center', marginTop: 4 }}>+{bands.length - 6} posiciones más cobran</div>}
                  </React.Fragment>);

            })()}
            </div>
          </div>
        }

        {/* RANKING */}
        {tab === 'leaderboard' &&
        (() => {
          const totalPlayers = table && table.players > 0 ? table.players : leaderboard.length;
          const winnerCount = getTournamentWinnerCount(totalPlayers);
          const prizes = calcTournamentPrizes(totalPlayers, table ? table.prize : 0);
          const prizeMap = {};
          prizes.forEach((p) => {prizeMap[p.rank] = p.amount;});
          const displayList = rankingSearch.trim() ? filteredRanking : showFullRanking ? leaderboard : leaderboard.slice(0, 100);

          const RankChangeIndicator = ({ p }) => {
            if (p.prevRank == null) return <span style={{ fontSize: 9, color: C.text3, width: 22, textAlign: 'center', flexShrink: 0 }}>—</span>;
            const diff = p.prevRank - p.rank;
            if (diff > 0) return <span style={{ fontSize: 9, fontWeight: 700, color: C.green, width: 22, textAlign: 'center', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill={C.green}><path d="M5 1L9 7H1L5 1Z" /></svg>{diff}
            </span>;
            if (diff < 0) return <span style={{ fontSize: 9, fontWeight: 700, color: C.red, width: 22, textAlign: 'center', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <svg width="8" height="8" viewBox="0 0 10 10" fill={C.red}><path d="M5 9L1 3H9L5 9Z" /></svg>{Math.abs(diff)}
            </span>;
            return <span style={{ fontSize: 9, color: C.text3, width: 22, textAlign: 'center', flexShrink: 0 }}>—</span>;
          };

          return (
            <div style={{ display: 'flex', flexDirection: 'column', padding: "0px 14px 10px", gap: 6 }}>
            {/* Search bar — always visible */}
            <div style={{ position: 'relative' }}>
              <input
                  type="text" placeholder="Buscar jugador..."
                  value={rankingSearch}
                  onChange={(e) => setRankingSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '9px 12px 9px 32px', fontSize: 12,
                    background: C.card, border: '1px solid ' + C.border,
                    color: C.text1, outline: 'none', boxSizing: 'border-box', borderRadius: "16px"
                  }} />
                
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            </div>

            {/* Top 20% zone label */}
            {!rankingSearch.trim() &&
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0' }}>
              <div style={{ padding: '3px 8px', background: '#2a2510', border: '1px solid ' + C.yellow + '35', display: 'flex', alignItems: 'center', gap: 4, borderRadius: "16px" }}>
                <img src="assets/star-ll.svg" width={10} height={10} style={{ objectFit: 'contain' }} />
                <span style={{ fontSize: 9, fontWeight: 700, color: C.yellow }}>Top 20%</span>
              </div>
              <span style={{ fontSize: 9, color: C.text3 }}>{winnerCount} de {totalPlayers.toLocaleString()} cobran premio</span>
            </div>
              }

            {/* Player rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {displayList.map((p) => {
                  const isWinner = p.rank <= winnerCount;
                  const prizeAmt = prizeMap[p.rank] || 0;
                  return (
                    <button key={p.rank + '-' + p.name} onClick={() => {onSelectHistoryPlayer(p.name);if (showFullRanking) setShowFullRanking(false);setTab('history');}} style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px',
                      background: p.isMe ? C.accent + '15' : isWinner ? '#2a251080' : 'transparent',

                      border: p.isMe ? '1px solid ' + C.accent + '30' : isWinner ? '1px solid ' + C.yellow + '18' : '1px solid transparent',
                      cursor: 'pointer', width: '100%', textAlign: 'left', borderRadius: "16px"
                    }}>
                  <span style={{ width: 22, fontSize: 12, fontWeight: 700, textAlign: 'center', color: p.rank <= 3 ? C.yellow : isWinner ? C.yellow + 'bb' : C.text3 }}>{p.rank}</span>
                  <RankChangeIndicator p={p} />
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: p.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 700, flexShrink: 0 }}>{p.name.slice(0, 2).toUpperCase()}</div>
                  <span style={{ flex: 1, fontSize: 11, fontWeight: p.isMe ? 700 : 400, color: p.isMe ? C.accentLight : C.text1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
                  {isWinner && prizeAmt > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: C.green, flexShrink: 0 }}>${prizeAmt.toLocaleString()}</span>}
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{p.balance.toFixed(0)}</div>
                  <span style={{ fontSize: 14, color: C.text3 }}>›</span>
                </button>);

                })}
            </div>

            {/* Ver todos button */}
            {!showFullRanking && !rankingSearch.trim() && leaderboard.length > 100 &&
              <button onClick={() => setShowFullRanking(true)} style={{
                width: '100%', padding: '14px', marginTop: 4,
                background: C.card, border: '1px solid ' + C.border, borderRadius: 12,
                color: C.accentLight, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accentLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              Ver todos los jugadores ({leaderboard.length})
            </button>
              }

            {showFullRanking && !rankingSearch.trim() &&
              <button onClick={() => setShowFullRanking(false)} style={{
                width: '100%', padding: '10px', marginTop: 4,
                background: 'none', border: 'none', borderRadius: 8,
                color: C.text3, fontSize: 11, fontWeight: 600, cursor: 'pointer'
              }}>
              Mostrar menos
            </button>
              }

            {rankingSearch.trim() && filteredRanking.length === 0 &&
              <div style={{ textAlign: 'center', padding: '30px 20px', color: C.text3, fontSize: 12 }}>
              No se encontraron jugadores
            </div>
              }
          </div>);

        })()
        }

        {/* HISTORY */}
        {tab === 'history' &&
        <BetHistoryView leaderboard={leaderboard} table={table} tableMatch={tableMatch} selectedPlayer={historyPlayer} onSelectPlayer={onSelectHistoryPlayer} />
        }
      </div>
    </div>);

}

// Match card for tournament matchdays — expands to full betting markets
function TournamentMatchCard({ match, matchday, onMarketBet, selectedBets }) {
  const [expanded, setExpanded] = React.useState(false);
  const isLive = match.status === 'live';
  const matchDate = match.date || matchday && matchday.date || '';
  const matchTime = match.time || '';

  // Build a full match object compatible with BettingMarketsView
  const fullMatch = React.useMemo(() => ({
    ...match,
    id: match.id,
    sport: match.sport || 'football',
    league: match.league,
    home: match.home,
    away: match.away,
    homeColor: match.homeColor,
    awayColor: match.awayColor,
    score: match.score || '0 - 0',
    minute: match.minute || '',
    odds: match.odds,
    viewers: match.viewers || 0,
    markets: match.markets || 50
  }), [match]);

  return (
    <div style={{ background: C.card, borderRadius: 14, overflow: 'hidden' }}>
      <button onClick={() => setExpanded(!expanded)} style={{
        width: '100%', padding: '12px 14px', cursor: 'pointer',
        background: 'none', border: 'none', textAlign: 'left'
      }}>
        {/* Status badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          {isLive ?
          <React.Fragment>
              <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              padding: '2px 7px', fontSize: 9, fontWeight: 700,
              background: C.red, color: '#fff', borderRadius: 20
            }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff', animation: 'blink 1.5s infinite' }}></span>
                {match.minute}
              </span>
              {matchDate &&
            <span style={{ fontSize: 9, color: C.text3, fontWeight: 500 }}>{matchDate} · {matchTime}</span>
            }
            </React.Fragment> :

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 600, color: C.accent, padding: '2px 9px', background: C.accent + '15', borderRadius: 20 }}>
              {matchDate && <span style={{ color: C.text2, fontWeight: 500 }}>{matchDate}</span>}
              {matchDate && matchTime && <span style={{ color: C.text3, fontWeight: 400 }}>·</span>}
              {matchTime}
            </span>
          }
          <span style={{ fontSize: 10, color: C.text3 }}>{match.league}</span>
          <div style={{ flex: 1 }}></div>
          <span style={{ ...{ fontSize: 9, color: C.accent, fontWeight: 600 }, color: "rgb(255, 255, 255)" }}>{match.markets} mercados</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}><path d="M6 9l6 6 6-6" /></svg>
        </div>

        {/* Teams */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              {match.tbd || match.home === 'A confirmar' ? <SportIcon sport={match.sport || 'football'} size={22} color={C.text3} /> : <TeamCrest name={match.home} color={match.homeColor} size={22} />}
              <span style={{ fontSize: 12, fontWeight: 600, color: match.tbd ? C.text3 : C.text1 }}>{match.home}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {match.tbd || match.away === 'A confirmar' ? <SportIcon sport={match.sport || 'football'} size={22} color={C.text3} /> : <TeamCrest name={match.away} color={match.awayColor} size={22} />}
              <span style={{ fontSize: 12, fontWeight: 600, color: match.tbd ? C.text3 : C.text1 }}>{match.away}</span>
            </div>
          </div>
          {isLive &&
          <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.text1, fontVariantNumeric: 'tabular-nums' }}>{match.score}</div>
            </div>
          }
        </div>
      </button>

      {/* Expanded: full betting markets */}
      {expanded &&
      <div style={{ borderTop: '1px solid ' + C.border }}>
          <BettingMarketsView match={fullMatch} onPlaceBet={onMarketBet} selectedBets={selectedBets} />
        </div>
      }
    </div>);

}

window.TournamentGameTabs = TournamentGameTabs;
window.TOURNAMENT_MATCHDAYS = TOURNAMENT_MATCHDAYS;