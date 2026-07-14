
// Bet History UI — Replaces "Mis Apuestas" tab
// Filters: Open/Closed segmented, player chips, tournament match filter

function BetHistoryView({ leaderboard, table, tableMatch, selectedPlayer, onSelectPlayer, externalBets }) {
  const [statusFilter, setStatusFilter] = React.useState('open'); // 'open' | 'closed'
  const [activePlayer, setActivePlayer] = React.useState(selectedPlayer || 'all');
  const [activeMatch, setActiveMatch] = React.useState('all');
  const [bracketOpen, setBracketOpen] = React.useState(false);

  React.useEffect(() => {
    if (selectedPlayer) setActivePlayer(selectedPlayer);
  }, [selectedPlayer]);

  // Generate history data
  const historyData = React.useMemo(() => {
    if (!table || !leaderboard) return { bets: [], bracket: null };
    // Fresh friends game — use external bets from actual gameplay
    if (table.friendPlayers) return { bets: externalBets || [], bracket: null };
    const sport = table.category || 'football';
    const home = tableMatch ? tableMatch.home : table.teams ? table.teams[0].name : 'Local';
    const away = tableMatch ? tableMatch.away : table.teams ? table.teams[1].name : 'Visitante';
    return generateBetHistory(leaderboard, sport, home, away, table.mode, table.tournamentLogo);
  }, [table?.id, leaderboard?.length, externalBets?.length]);

  const { bets, bracket } = historyData;

  // Apply filters
  let filtered = bets.filter((b) => statusFilter === 'open' ? b.isOpen : !b.isOpen);
  if (activePlayer !== 'all') filtered = filtered.filter((b) => b.playerId === activePlayer);
  if (activeMatch !== 'all') filtered = filtered.filter((b) => b.matchId === activeMatch);

  const handlePlayerChip = (name) => {
    setActivePlayer(name === activePlayer ? 'all' : name);
    if (onSelectPlayer) onSelectPlayer(name === activePlayer ? null : name);
  };

  // ---- TOURNAMENT BRACKET (mini) ----
  const TournamentBracket = () => {
    if (!bracket) return null;
    return (
      <div style={{ marginBottom: 8 }}>
        <button onClick={() => setBracketOpen(!bracketOpen)} style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '8px 12px', background: C.card, borderRadius: 10, border: 'none', cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {(() => {
              const tournamentIcons = { champions: 'assets/champions-2.svg', worldcup: 'assets/mundial.svg' };
              const iconSrc = table && table.tournamentLogo ? tournamentIcons[table.tournamentLogo] : null;
              return iconSrc ?
              <img src={iconSrc} width="14" height="14" style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} /> :
              <Icon name="trophy" size={12} color={C.yellow} />;
            })()}
            <span style={{ fontSize: 11, fontWeight: 600, color: C.text1 }}>{bracket.name}</span>
            {activeMatch !== 'all' &&
            <span style={{ fontSize: 9, padding: '2px 6px', background: `${C.accent}20`, color: C.accentLight, borderRadius: 4, fontWeight: 600 }}>
                Filtrado
              </span>
            }
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: bracketOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
        </button>

        {bracketOpen &&
        <div style={{ padding: '10px 0', overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: 2, minWidth: 'max-content', padding: '0 4px' }}>
              {bracket.rounds.map((round, ri) =>
            <div key={ri} style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 100 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.text3, textTransform: 'uppercase', textAlign: 'center', marginBottom: 4, letterSpacing: '0.03em' }}>
                    {round.name}
                  </div>
                  {round.matches.map((m) => {
                const isActive = activeMatch === m.id;
                return (
                  <button key={m.id} onClick={() => setActiveMatch(isActive ? 'all' : m.id)} style={{
                    padding: '6px 8px', borderRadius: 8, fontSize: 9, fontWeight: 600,
                    background: isActive ? `${C.accent}25` : C.card,
                    border: isActive ? `1px solid ${C.accent}` : `1px solid ${C.border}`,
                    color: isActive ? C.accentLight : C.text2,
                    cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
                    lineHeight: 1.3
                  }}>{m.label}</button>);

              })}
                  {/* Connector line */}
                  {ri < bracket.rounds.length - 1 &&
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 0 }}>
                      <div style={{ width: 8, height: 1, background: C.border }}></div>
                    </div>
              }
                </div>
            )}
            </div>
          </div>
        }
      </div>);

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flexShrink: 0, padding: "0px 12px" }}>
        {/* Player chips — Open/Closed mini switch + "Yo" always first after Todos */}
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 8, alignItems: 'center', padding: "0px" }}>
          {/* Mini Open/Closed switch */}
          <div style={{ display: 'flex', background: '#171C1F', padding: 2, flexShrink: 0, height: "26.8px", borderRadius: "16px" }}>
            {[{ id: 'open', label: 'Abiertas' }, { id: 'closed', label: 'Cerradas' }].map((s) =>
            <button key={s.id} onClick={() => setStatusFilter(s.id)} style={{ ...{
                padding: '4px 8px', fontSize: 9, fontWeight: 600,
                background: statusFilter === s.id ? C.card : 'transparent',
                color: statusFilter === s.id ? C.text1 : C.text3,
                border: 'none', cursor: 'pointer', transition: 'all 0.15s', borderRadius: 8,
                whiteSpace: 'nowrap', lineHeight: 1.2
              }, background: statusFilter === s.id ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0)" }}>{s.label}</button>
            )}
          </div>
          <button onClick={() => handlePlayerChip('all')} style={{
            fontWeight: 600,
            background: activePlayer === 'all' ? C.accent : C.card,
            color: activePlayer === 'all' ? '#fff' : C.text3,
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, borderRadius: "16px", height: "26.8px", fontSize: "11px", padding: "6px 10px"
          }}>Todos</button>
          {(() => {
            const me = leaderboard.find((p) => p.isMe);
            const others = leaderboard.filter((p) => !p.isMe);
            const ordered = me ? [me, ...others] : others;
            return ordered.map((p) =>
            <button key={p.name} onClick={() => handlePlayerChip(p.name)} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 10, fontWeight: 600,
              background: activePlayer === p.name ? p.isMe ? `${C.accent}25` : `${C.accent}20` : C.card,
              color: activePlayer === p.name ? C.accentLight : C.text3,
              border: activePlayer === p.name ? `1px solid ${C.accent}60` : `1px solid transparent`,
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.15s', borderRadius: "16px", padding: "4px 8px 4px 4px", height: "26.8px"
            }}>
                <div style={{
                width: 16, height: 16, flexShrink: 0,
                background: p.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 7, color: '#fff', fontWeight: 700, borderRadius: "223.2px"
              }}>{p.name.slice(0, 2).toUpperCase()}</div>
                {p.isMe ? 'Yo' : p.name.length > 10 ? p.name.slice(0, 10) + '…' : p.name}
              </button>
            );
          })()}
        </div>

        {/* Tournament bracket filter */}
        <TournamentBracket />
      </div>

      {/* Bets list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
        {filtered.length === 0 ?
        <div style={{ textAlign: 'center', padding: '40px 20px', color: C.text3, fontSize: 12 }}>
            No hay apuestas {statusFilter === 'open' ? 'abiertas' : 'cerradas'} con estos filtros
          </div> :

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {filtered.map((bet) =>
          <BetCard key={bet.id} bet={bet} />
          )}
          </div>
        }
      </div>
    </div>);

}

function BetCard({ bet }) {
  const isOwn = bet.isMe;
  const isClosed = !bet.isOpen;

  return (
    <div style={{
      padding: '10px 12px',
      background: isOwn ? `${C.accent}10` : C.card,
      border: isOwn ? `1px solid ${C.accent}25` : `1px solid ${C.border}40`, borderRadius: "16px"
    }}>
      {/* Top row: player + time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 5, flexShrink: 0,
            background: bet.playerAvatar, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8, color: '#fff', fontWeight: 700
          }}>{bet.playerId.slice(0, 2).toUpperCase()}</div>
          <span style={{ fontSize: 11, fontWeight: isOwn ? 700 : 500, color: isOwn ? C.accentLight : C.text1 }}>
            {isOwn ? 'Tú' : bet.playerId}
          </span>
          {isOwn && <span style={{ fontSize: 8, padding: '1px 5px', background: `${C.accent}20`, color: C.accentLight, fontWeight: 600, borderRadius: "16px" }}>TÚ</span>}
        </div>
        <span style={{ fontSize: 9, color: C.text3 }}>{bet.timeAgo}</span>
      </div>

      {/* Market + selection + match badge */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <div style={{ fontSize: 10, color: C.text3, flex: 1 }}>{bet.market}</div>
          <span style={{ ...{
              fontSize: 8, fontWeight: 600, color: C.text2, padding: '2px 7px',
              background: C.bgLight, borderRadius: 10, whiteSpace: 'nowrap',
              maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 0
            }, color: "rgb(255, 255, 255)" }}>{bet.matchLabel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text1 }}>{bet.selection}</span>
          <span style={{
            fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
            color: C.green, padding: '2px 8px', background: C.bgLight, borderRadius: "16px"
          }}>{bet.odd.toFixed(2)}</span>
        </div>
      </div>

      {/* Match label (for tournaments) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 9, color: C.text3 }}>{bet.matchLabel}</span>

        {/* Result indicator for closed bets */}
        {isClosed && bet.won !== null &&
        <span style={{
          fontSize: 9, fontWeight: 700, padding: '2px 8px',
          background: bet.won ? `${C.green}20` : `${C.red}20`,
          color: bet.won ? C.green : C.red, borderRadius: "16px"
        }}>
            {bet.won ? '✓ Ganada' : '✗ Perdida'}
          </span>
        }
        {!isClosed &&
        <span style={{
          fontSize: 9, fontWeight: 600, padding: '2px 8px',
          background: `${C.yellow}15`, color: C.yellow, borderRadius: "16px"
        }}>
            Pendiente
          </span>
        }
      </div>
    </div>);

}

window.BetHistoryView = BetHistoryView;
window.BetCard = BetCard;