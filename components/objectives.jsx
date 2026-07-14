
// Objectives Modal + In-Game Objectives Button/Panel

// Helper: detect if a hex color is light (needs dark text on top)
function isLightColor(hex) {
  if (!hex) return false;
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  // Perceived luminance
  return r * 0.299 + g * 0.587 + b * 0.114 > 180;
}
window.isLightColor = isLightColor;

// --- ACCEPTANCE MODAL (shown before joining a table) ---
function ObjectivesAcceptModal({ table, onAccept, onDecline, variant = 'default' }) {
  const [accepted, setAccepted] = React.useState(false);
  if (!table || !table.objectives) return null;
  const dist = table.prizeDistribution || { first: 60, second: 25, third: 15 };

  // Sport-specific color from table category
  const tableSport = table.category || 'free';
  const sportColor = SPORT_COLORS[tableSport] || SPORT_COLORS.quick;
  const sportIconKey = tableSport === 'free' ? 'quick' : tableSport;

  // Tournament-specific: use tournament logo if available
  const isTournament = table.mode === 'tournament';
  const tournamentIcons = { champions: 'assets/champions-2.svg', worldcup: 'assets/mundial.svg' };
  const tournamentColors = { champions: '#021549', worldcup: '#1a472a' };
  const hasCustomLogo = isTournament && table.tournamentLogo && tournamentIcons[table.tournamentLogo];

  // Use tournament-specific color if available, otherwise sport color
  const accentColor = isTournament && table.tournamentLogo && tournamentColors[table.tournamentLogo] ? tournamentColors[table.tournamentLogo] : sportColor;
  const accentIsLight = isLightColor(accentColor);
  const textOnAccent = accentIsLight ? '#111' : '#fff';

  const variantStyles = {
    default: { accent: accentColor, headerBg: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)` },
    gold: { accent: C.yellow, headerBg: `linear-gradient(135deg, ${C.yellow}25, ${C.red}10)` },
    minimal: { accent: C.text2, headerBg: C.card }
  };
  const vs = variantStyles[variant] || variantStyles.default;
  const vsIsLight = isLightColor(vs.accent);
  const vsTextOnAccent = vsIsLight ? '#111' : '#fff';

  // Compute a readable color for number badges on dark card backgrounds
  // Dark accent colors on dark bg are unreadable — lighten them
  const badgeTextColor = (() => {
    if (vsIsLight) return C.text1;
    const h = vs.accent.replace('#', '');
    const r = Math.min(255, parseInt(h.substring(0, 2), 16) + 120);
    const g = Math.min(255, parseInt(h.substring(2, 4), 16) + 120);
    const b = Math.min(255, parseInt(h.substring(4, 6), 16) + 120);
    return `rgb(${r},${g},${b})`;
  })();

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
    }}>
      <div style={{
        width: '100%', maxWidth: 360, background: C.bgLight,
        borderRadius: 20, overflow: 'hidden', maxHeight: '85vh',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 18px 16px', background: vs.headerBg,
          borderBottom: `1px solid ${C.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {hasCustomLogo ?
            <img src={tournamentIcons[table.tournamentLogo]} width={22} height={22} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} /> :
            <SportIcon sport={sportIconKey} size={22} color={vs.accent} />
            }
            <span style={{ fontSize: 16, fontWeight: 700, color: C.text1 }}>
              {table.title || 'Reglas y Objetivos'}
            </span>
          </div>
          <div style={{ fontSize: 11, color: C.text3, lineHeight: 1.5 }}>
            Para participar en esta partida debes aceptar cumplir los siguientes objetivos. 
            Si no los completás dentro del plazo, quedás eliminado de la partida.
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
          {/* Objectives list */}
          <div style={{ fontSize: 11, fontWeight: 700, color: C.text2, textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.04em' }}>
            Objetivos obligatorios
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            {table.objectives.map((obj, i) =>
            <div key={obj.id} style={{
              padding: '12px 14px', background: C.card, borderRadius: 12,
              border: `1px solid ${C.border}`
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                  width: 24, height: 24, borderRadius: 8, flexShrink: 0,
                  background: `${vs.accent}20`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 11, fontWeight: 700, color: badgeTextColor
                }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text1, lineHeight: 1.4, marginBottom: 6 }}>
                      {obj.text}
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>+{obj.points} pts</span>
                      <span style={{ fontSize: 10, color: C.text3 }}>⏱ {obj.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Prize distribution */}
          <div style={{ fontSize: 11, fontWeight: 700, color: C.text2, textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.04em' }}>
            Distribución del premio
          </div>
          {table.prizeMode === 'top20' ? (
          <div style={{
            padding: '12px 14px', background: C.card, borderRadius: 12,
            border: `1px solid ${C.border}`, marginBottom: 18
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: C.text1 }}>Premio total</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>${typeof table.prize === 'number' ? table.prize.toLocaleString() : table.prize}</span>
            </div>
            {/* Top 20% badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 0 8px',
              borderTop: `1px solid ${C.border}`, marginTop: 6
            }}>
              <div style={{
                padding: '4px 10px', background: C.green + '18', borderRadius: 8,
                display: 'flex', alignItems: 'center', gap: 5
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.green }}>Gana el Top 20%</span>
              </div>
              <span style={{ fontSize: 10, color: C.text3 }}>
                {table.players > 0 ? getTournamentWinnerCount(table.players) + ' ganadores' : 'según participantes'}
              </span>
            </div>
            {/* Graduated prize preview */}
            {table.players > 0 && (() => {
              const bands = getTournamentPrizeBands(table.players, table.prize);
              const showBands = bands.slice(0, 5);
              const bandColors = [C.yellow, '#C0C0C0', '#CD7F32', C.text2, C.text3];
              return (
                <div style={{ marginTop: 4 }}>
                  {showBands.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderTop: i === 0 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ fontSize: 11, color: C.text2 }}>{b.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {b.perPerson && <span style={{ fontSize: 8, color: C.text3, fontWeight: 500 }}>c/u</span>}
                        <span style={{ fontSize: 12, fontWeight: 700, color: bandColors[Math.min(i, bandColors.length - 1)] }}>${b.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  {bands.length > 5 && <div style={{ fontSize: 9, color: C.text3, textAlign: 'center', marginTop: 4 }}>+{bands.length - 5} posiciones más</div>}
                </div>
              );
            })()}
            <div style={{ marginTop: 8, borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
              <div style={{ fontSize: 10, color: C.text3, textAlign: 'center' }}>Premio escalonado: el 1° cobra más, bajando gradualmente</div>
            </div>
          </div>
          ) : (
          <div style={{
            padding: '12px 14px', background: C.card, borderRadius: 12,
            border: `1px solid ${C.border}`, marginBottom: 18
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.text1 }}>Premio total</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.green }}>${table.prize}</span>
            </div>
            {[
            { pos: '🥇 1er puesto', pct: dist.first, color: C.yellow },
            { pos: '🥈 2do puesto', pct: dist.second, color: '#C0C0C0' },
            { pos: '🥉 3er puesto', pct: dist.third, color: '#CD7F32' }].
            map((p, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderTop: i === 0 ? `1px solid ${C.border}` : 'none' }}>
                <span style={{ fontSize: 11, color: C.text2 }}>{p.pos}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, color: C.text3 }}>{p.pct}%</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>${(table.prize * p.pct / 100).toFixed(0)}</span>
                </div>
              </div>
            )}
            <div style={{ marginTop: 8, borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
              <div style={{ fontSize: 10, color: C.text3, textAlign: 'center' }}>Los demás puestos no reciben premio</div>
            </div>
          </div>
          )}

          {/* Accept checkbox */}
          <button onClick={() => setAccepted(!accepted)} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px',
            background: accepted ? `${vs.accent}10` : C.card,
            border: accepted ? `1px solid ${vs.accent}40` : `1px solid ${C.border}`,
            borderRadius: 12, cursor: 'pointer', width: '100%', textAlign: 'left'
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
              background: accepted ? vs.accent : 'transparent',
              border: accepted ? 'none' : `2px solid ${C.text3}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s'
            }}>
              {accepted && <span style={{ color: vsTextOnAccent, fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 11, color: C.text2, lineHeight: 1.5 }}>
              Acepto cumplir todos los objetivos dentro del plazo establecido. Entiendo que si no los completo, seré eliminado de la partida.
            </span>
          </button>
        </div>

        {/* Footer buttons */}
        <div style={{ padding: '14px 18px 20px', display: 'flex', gap: 8, borderTop: `1px solid ${C.border}` }}>
          <button onClick={onDecline} style={{
            flex: 1, padding: '12px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            background: C.card, color: C.text2, border: 'none', cursor: 'pointer'
          }}>Cancelar</button>
          <button onClick={onAccept} disabled={!accepted} style={{
            flex: 2, padding: '12px', borderRadius: 10, fontSize: 13, fontWeight: 700,
            background: accepted ? vs.accent : C.card,
            color: accepted ? vsTextOnAccent : C.text3,
            border: 'none', cursor: accepted ? 'pointer' : 'default',
            opacity: accepted ? 1 : 0.5, transition: 'all 0.2s'
          }}>Entrar por ${table.entry}</button>
        </div>
      </div>
    </div>);

}

// --- IN-GAME OBJECTIVES BUTTON + PANEL ---
function ObjectivesButton({ objectives, onClick, variant = 'default' }) {
  if (!objectives || objectives.length === 0) return null;
  const completed = objectives.filter((o) => o.current >= o.target).length;
  const total = objectives.length;
  const progress = total > 0 ? completed / total : 0;

  const variantColors = {
    default: C.accent,
    gold: C.yellow,
    minimal: C.text2
  };
  const color = variantColors[variant] || C.accent;

  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
      background: C.card, border: 'none', borderRadius: 10,
      cursor: 'pointer', width: '100%'
    }}>
      <img src="assets/task.svg" width={14} height={14} style={{ objectFit: 'contain', flexShrink: 0 }} />
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, fontWeight: 600, color: C.text1, marginBottom: 4 }}>
          <span>Objetivos</span>
          <span style={{ color: C.text3, fontWeight: 400 }}>{completed}/{total}</span>
        </div>
        {/* Progress bar */}
        <div style={{ width: '100%', height: 4, background: C.bgLight, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            width: `${progress * 100}%`, height: '100%',
            background: progress === 1 ? C.green : color,
            borderRadius: 2, transition: 'width 0.4s ease'
          }}></div>
        </div>
      </div>
      <span style={{ fontSize: 14, color: C.text3 }}>›</span>
    </button>);

}

function ObjectivesPanel({ table, onClose, variant = 'default' }) {
  if (!table || !table.objectives) return null;
  const objectives = table.objectives;
  const dist = table.prizeDistribution || { first: 60, second: 25, third: 15 };
  const completed = objectives.filter((o) => o.current >= o.target).length;

  const variantColors = {
    default: C.accent,
    gold: C.yellow,
    minimal: C.text2
  };
  const color = variantColors[variant] || C.accent;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end'
    }}>
      <div style={{
        width: '100%', background: C.bgLight,
        borderRadius: '20px 20px 0 0', maxHeight: '80vh',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }}></div>
        </div>

        {/* Header */}
        <div style={{ padding: '8px 18px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.text1 }}>Objetivos</div>
            <div style={{ fontSize: 11, color: C.text3, marginTop: 2 }}>{completed}/{objectives.length} completados</div>
          </div>
          <button onClick={onClose} style={{ background: C.card, border: 'none', color: C.text3, fontSize: 14, cursor: 'pointer', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Overall progress */}
        <div style={{ padding: '0 18px 14px' }}>
          <div style={{ width: '100%', height: 6, background: C.card, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              width: `${completed / objectives.length * 100}%`, height: '100%',
              background: completed === objectives.length ? C.green : color,
              borderRadius: 3, transition: 'width 0.4s ease'
            }}></div>
          </div>
        </div>

        {/* Objectives list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {objectives.map((obj, i) => {
              const done = obj.current >= obj.target;
              const pct = Math.min(obj.current / obj.target, 1);
              return (
                <div key={obj.id} style={{
                  padding: '12px 14px', background: C.card, borderRadius: 12,
                  border: done ? `1px solid ${C.green}40` : `1px solid ${C.border}`,
                  opacity: done ? 0.75 : 1
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                      background: done ? C.green : `${color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: done ? '#fff' : color
                    }}>{done ? '✓' : i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 12, fontWeight: 600, color: done ? C.text3 : C.text1,
                        lineHeight: 1.4, textDecoration: done ? 'line-through' : 'none'
                      }}>{obj.text}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ flex: 1, height: 4, background: C.bgLight, borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        width: `${pct * 100}%`, height: '100%',
                        background: done ? C.green : color,
                        borderRadius: 2, transition: 'width 0.3s'
                      }}></div>
                    </div>
                    <span style={{ fontSize: 10, color: C.text3, fontVariantNumeric: 'tabular-nums', minWidth: 28, textAlign: 'right' }}>
                      {obj.type === 'progress' ? `${obj.current}/${obj.target}` : done ? '✓' : '—'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>+{obj.points} pts</span>
                    <span style={{ fontSize: 10, color: done ? C.green : C.text3 }}>⏱ {obj.deadline}</span>
                  </div>
                </div>);

            })}
          </div>

          {/* Prize distribution */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.text2, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.04em' }}>Premio</div>
            {table.prizeMode === 'top20' ? (
            <div style={{ padding: '10px 14px', background: C.card, borderRadius: 12 }}>
              {/* Top 20% badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8,
                borderBottom: `1px solid ${C.border}`
              }}>
                <div style={{
                  padding: '3px 8px', background: C.green + '18', borderRadius: 6,
                  display: 'flex', alignItems: 'center', gap: 4
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.green }}>Gana el Top 20%</span>
                </div>
                <span style={{ fontSize: 10, color: C.text3, marginLeft: 'auto' }}>
                  {table.players > 0 ? getTournamentWinnerCount(table.players) + ' ganadores' : '—'}
                </span>
              </div>
              {/* Graduated prizes */}
              {table.players > 0 && (() => {
                const bands = getTournamentPrizeBands(table.players, table.prize);
                const showBands = bands.slice(0, 5);
                const bandColors = [C.yellow, '#C0C0C0', '#CD7F32', C.text2, C.text3];
                return showBands.map((b, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', padding: '5px 0',
                    borderTop: i > 0 ? `1px solid ${C.border}` : 'none'
                  }}>
                    <span style={{ fontSize: 11, color: C.text2 }}>{b.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {b.perPerson && <span style={{ fontSize: 8, color: C.text3 }}>c/u</span>}
                      <span style={{ fontSize: 12, fontWeight: 700, color: bandColors[Math.min(i, bandColors.length - 1)] }}>${b.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ));
              })()}
              <div style={{ fontSize: 9, color: C.text3, textAlign: 'center', marginTop: 6, paddingTop: 6, borderTop: `1px solid ${C.border}` }}>Escalonado: 1° cobra más, bajando gradualmente</div>
            </div>
            ) : (
            <div style={{ padding: '10px 14px', background: C.card, borderRadius: 12 }}>
              {[
              { pos: '🥇 1ro', pct: dist.first, color: C.yellow },
              { pos: '🥈 2do', pct: dist.second, color: '#C0C0C0' },
              { pos: '🥉 3ro', pct: dist.third, color: '#CD7F32' }].
              map((p, i) =>
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '5px 0',
                borderTop: i > 0 ? `1px solid ${C.border}` : 'none'
              }}>
                  <span style={{ fontSize: 11, color: C.text2 }}>{p.pos} — {p.pct}%</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>${(table.prize * p.pct / 100).toFixed(0)}</span>
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}

window.ObjectivesAcceptModal = ObjectivesAcceptModal;
window.ObjectivesButton = ObjectivesButton;
window.ObjectivesPanel = ObjectivesPanel;