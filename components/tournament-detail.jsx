
// Tournament Detail — shows phases/stages of a tournament

function TournamentDetailScreen({ tournament, onJoinPhase, onJoinFullTournament, joinedPhaseIds = [] }) {
  const [expandedPhase, setExpandedPhase] = React.useState(null);

  if (!tournament || !tournament.phases) return null;

  const phases = tournament.phases;
  const livePhase = phases.find((p) => p.status === 'live');
  const totalPrize = tournament.prize;
  const totalPlayers = tournament.players;

  // Auto-expand live phase on mount
  React.useEffect(() => {
    if (livePhase) setExpandedPhase(livePhase.id);
  }, []);

  // Tournament logo — uses brand SVG assets
  const TLogo = ({ type, size = 52 }) => {
    const tournamentIcons = { champions: 'assets/champions-2.svg', worldcup: 'assets/mundial.svg' };
    const iconSrc = tournamentIcons[type] || null;
    const bgColors = { champions: '#021549', worldcup: '#090909' };
    const bg = bgColors[type] || C.accent + '20';
    
    if (iconSrc) return (
      <div style={{
        width: size, height: size, borderRadius: size * 0.25, flexShrink: 0,
        background: bg, border: '2px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
      }}>
        <img src={iconSrc} width={size * 0.6} height={size * 0.6} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
      </div>
    );
    return <div style={{ width: size, height: size, borderRadius: size * 0.25, background: C.accent + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="trophy" size={size * 0.5} color={C.yellow} /></div>;
  };

  const statusConfig = {
    completed: { color: C.green, label: 'Completada', icon: '✓' },
    live: { color: C.red, label: 'En Vivo', icon: '●' },
    upcoming: { color: C.accent, label: 'Próxima', icon: '◦' },
    locked: { color: C.text3, label: 'Bloqueada', icon: '🔒' }
  };

  return (
    <div style={{ padding: "14px 14px 24px" }}>
      {/* Hero card */}
      <div style={{ background: C.card, borderRadius: 16, overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', gap: 14, background: `linear-gradient(135deg, ${C.yellow}10, ${C.accent}08)` }}>
          <TLogo type={tournament.tournamentLogo} size={52} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.text1, letterSpacing: '-0.02em' }}>{tournament.title}</div>
            <div style={{ fontSize: 11, color: C.text3, marginTop: 3 }}>{phases.length} fases · {totalPlayers.toLocaleString()} participantes</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid ' + C.border }}>
          {[
          { label: 'Pozo Total', value: '$' + totalPrize.toLocaleString(), color: C.green },
          { label: 'Entrada', value: '$' + tournament.entry, color: C.text1 },
          { label: 'Duración', value: tournament.timeLeft, color: C.text1 }].
          map((s, i) =>
          <div key={i} style={{ padding: '12px 8px', textAlign: 'center', borderRight: i < 2 ? '1px solid ' + C.border : 'none' }}>
              <div style={{ fontSize: 8, color: C.text3, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: s.color, marginTop: 3 }}>{s.value}</div>
            </div>
          )}
        </div>
      </div>

      {/* Join full tournament CTA */}
      <button onClick={onJoinFullTournament} style={{
        width: '100%', padding: '14px', marginBottom: 16,
        background: C.accent, color: '#fff', border: 'none',
        borderRadius: 14, fontSize: 13, fontWeight: 700, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
      }}>
        <Icon name="trophy" size={15} color="#fff" />
        Unirme al Torneo Completo — ${tournament.entry}
      </button>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, height: 1, background: C.border }}></div>
        <span style={{ fontSize: 10, color: C.text3, fontWeight: 600 }}>O juega por fases</span>
        <div style={{ flex: 1, height: 1, background: C.border }}></div>
      </div>

      {/* Phases timeline */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {phases.map((phase, i) => {
          const sc = statusConfig[phase.status];
          const isExpanded = expandedPhase === phase.id;
          const isLast = i === phases.length - 1;
          const isJoined = joinedPhaseIds.includes(phase.id);

          return (
            <div key={phase.id} style={{ display: 'flex', gap: 12 }}>
              {/* Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%', marginTop: 14, flexShrink: 0,
                  background: sc.color,
                  border: phase.status === 'live' ? '3px solid ' + sc.color + '40' : 'none',
                  animation: phase.status === 'live' ? 'blink 1.5s infinite' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}></div>
                {!isLast && <div style={{ width: 2, flex: 1, background: C.border, minHeight: 16 }}></div>}
              </div>

              {/* Phase card */}
              <div style={{
                flex: 1, marginBottom: isLast ? 0 : 8,
                background: C.card, borderRadius: 14,
                border: phase.status === 'live' ? '1px solid ' + C.red + '30' : '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden'
              }}>
                {/* Header — always visible */}
                <button onClick={() => setExpandedPhase(isExpanded ? null : phase.id)} style={{
                  width: '100%', padding: '14px', cursor: 'pointer',
                  background: 'none', border: 'none', textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: phase.status === 'locked' ? C.text3 : C.text1 }}>{phase.label}</span>
                      <span style={{
                        fontSize: 8, fontWeight: 700, color: sc.color,
                        padding: '2px 7px', background: sc.color + '15', borderRadius: 20,
                        display: 'inline-flex', alignItems: 'center', gap: 3
                      }}>
                        {phase.status === 'live' && <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.red, animation: 'blink 1.5s infinite' }}></span>}
                        {sc.label}
                      </span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  {/* Quick info row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: C.text3 }}>{phase.dateRange}</span>
                    <span style={{ fontSize: 10, color: C.text3 }}>·</span>
                    <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>${phase.prize.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: C.text3 }}>·</span>
                    <span style={{ fontSize: 10, color: C.text2, fontWeight: 500 }}>
                      <Icon name="users" size={9} color={C.text3} /> {phase.players > 0 ? phase.players.toLocaleString() : '—'}
                    </span>
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded &&
                <div style={{ padding: '0 14px 14px', borderTop: '1px solid ' + C.border }}>
                    {/* Stats grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 12, marginBottom: 12 }}>
                      <div style={{ padding: '10px 6px', background: C.bgLight, borderRadius: 10, textAlign: 'center' }}>
                        <div style={{ fontSize: 8, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Entrada</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: C.text1, marginTop: 2 }}>${phase.entry}</div>
                      </div>
                      <div style={{ padding: '10px 6px', background: C.bgLight, borderRadius: 10, textAlign: 'center' }}>
                        <div style={{ fontSize: 8, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Pozo</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: C.green, marginTop: 2 }}>${phase.prize.toLocaleString()}</div>
                      </div>
                      <div style={{ padding: '10px 6px', background: C.bgLight, borderRadius: 10, textAlign: 'center' }}>
                        <div style={{ fontSize: 8, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Jugadores</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: C.text1, marginTop: 2 }}>{phase.players > 0 ? phase.players : '—'}</div>
                      </div>
                    </div>

                    {/* Prize distribution */}
                    {phase.prizeMode === 'top20' ? (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                        background: C.green + '10', borderRadius: 10, marginBottom: 6
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        <span style={{ fontSize: 10, fontWeight: 700, color: C.green }}>Gana el Top 20%</span>
                        <span style={{ fontSize: 9, color: C.text3, marginLeft: 'auto' }}>
                          {phase.players > 0 ? getTournamentWinnerCount(phase.players) + ' ganadores' : 'según participantes'}
                        </span>
                      </div>
                      {phase.players > 0 && (() => {
                        const bands = getTournamentPrizeBands(phase.players, phase.prize);
                        const showBands = bands.slice(0, 4);
                        const bandColors = [C.yellow, '#C0C0C0', '#CD7F32', C.text2];
                        return (
                          <div style={{ padding: '6px 10px', background: C.bgLight, borderRadius: 10 }}>
                            {showBands.map((b, i) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                                <span style={{ fontSize: 10, color: C.text2 }}>{b.label}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                  {b.perPerson && <span style={{ fontSize: 8, color: C.text3 }}>c/u</span>}
                                  <span style={{ fontSize: 11, fontWeight: 700, color: bandColors[Math.min(i, bandColors.length - 1)] }}>${b.amount.toLocaleString()}</span>
                                </div>
                              </div>
                            ))}
                            {bands.length > 4 && <div style={{ fontSize: 8, color: C.text3, textAlign: 'center', marginTop: 2 }}>+{bands.length - 4} posiciones más</div>}
                          </div>
                        );
                      })()}
                    </div>
                    ) : (
                    phase.prizeDistribution &&
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                        {[
                    { pos: '🥇 1ro', pct: phase.prizeDistribution.first },
                    { pos: '🥈 2do', pct: phase.prizeDistribution.second },
                    { pos: '🥉 3ro', pct: phase.prizeDistribution.third }].
                    map((p) =>
                    <div key={p.pos} style={{ flex: 1, padding: '6px', background: C.bgLight, borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: 9, color: C.text3 }}>{p.pos}</div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: C.text1 }}>{p.pct}%</div>
                          </div>
                    )}
                      </div>
                    )}

                    {/* Winners if completed */}
                    {phase.status === 'completed' && phase.winners && phase.winners.length > 0 &&
                  <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: C.text3, textTransform: 'uppercase' }}>Top Ganadores</div>
                          {phase.prizeMode === 'top20' && phase.players > 0 &&
                            <span style={{ fontSize: 9, color: C.green, fontWeight: 600 }}>{getTournamentWinnerCount(phase.players)} ganadores en total</span>
                          }
                        </div>
                        {phase.winners.slice(0, 3).map((w) =>
                    <div key={w.rank} style={{
                      display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', marginBottom: 3,
                      background: C.bgLight, borderRadius: 10
                    }}>
                            <span style={{ fontSize: 12, width: 22, textAlign: 'center' }}>
                              {w.rank === 1 ? '🥇' : w.rank === 2 ? '🥈' : '🥉'}
                            </span>
                            <div style={{
                        width: 22, height: 22, borderRadius: 6, background: w.avatar,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 8, color: '#fff', fontWeight: 700
                      }}>{w.name.slice(0, 2).toUpperCase()}</div>
                            <span style={{ flex: 1, fontSize: 11, color: C.text1, fontWeight: 500 }}>{w.name}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: C.green }}>+${w.prize.toLocaleString()}</span>
                          </div>
                    )}
                      </div>
                  }

                    {/* Action buttons */}
                    {phase.status === 'live' &&
                  <button onClick={(e) => {e.stopPropagation();onJoinPhase(phase);}} style={{
                    width: '100%', padding: '12px', fontSize: 13, fontWeight: 700,
                    background: C.accent, color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                  }}>
                        {isJoined ?
                    <React.Fragment><Icon name="zap" size={13} color="#fff" /> Seguir jugando</React.Fragment> :

                    <React.Fragment><Icon name="zap" size={13} color="#fff" /> Entrar — ${phase.entry}</React.Fragment>
                    }
                      </button>
                  }
                    {phase.status === 'upcoming' &&
                  <button onClick={(e) => {e.stopPropagation();onJoinPhase(phase);}} style={{
                    width: '100%', padding: '12px', fontSize: 13, fontWeight: 700,
                    background: C.accent + '18', color: C.accentLight,
                    border: '1px solid ' + C.accent + '30',
                    borderRadius: 12, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                  }}>
                        <Icon name="target" size={13} color={C.accentLight} />
                        {isJoined ? 'Ya inscrito' : 'Pre-inscribirme — $' + phase.entry}
                      </button>
                  }
                    {phase.status === 'locked' &&
                  <div style={{
                    textAlign: 'center', padding: '10px', color: C.text3, fontSize: 11,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                  }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="1.5" strokeLinecap="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Se habilitará según resultados anteriores
                      </div>
                  }
                    {phase.status === 'completed' &&
                  <div style={{
                    textAlign: 'center', padding: '8px', color: C.green, fontSize: 11, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                  }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Fase completada
                      </div>
                  }
                  </div>
                }
              </div>
            </div>);

        })}
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>);

}

window.TournamentDetailScreen = TournamentDetailScreen;