
// Detail modals for notifications — result detail, transaction detail
// Both are bottom-sheet overlays inside the phone frame

// ─── Game Result Detail Modal ───

function GameResultDetailModal({ notification, onClose, onBack }) {
  const [closing, setClosing] = React.useState(false);
  const n = notification;
  const rd = n.resultData;
  const won = n.won;

  const doClose = () => {
    setClosing(true);
    setTimeout(() => {setClosing(false);onClose();}, 250);
  };

  const isVisible = !closing;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 210, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={doClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s'
      }}></div>

      <div style={{
        position: 'relative', zIndex: 1, background: C.bgLight,
        borderRadius: '20px 20px 0 0', maxHeight: '88vh',
        display: 'flex', flexDirection: 'column',
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }}></div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 16px 14px', borderBottom: '1px solid ' + C.border, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="trophy" size={18} color={won ? C.green : C.text2} />
            <span style={{ fontSize: 16, fontWeight: 700, color: C.text1 }}>Resumen de Partida</span>
          </div>
          <button onClick={doClose} style={{ background: C.card, border: 'none', color: C.text3, width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
          {/* Hero result */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, margin: '0 auto 10px',
              background: won ? C.green + '15' : C.red + '12',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {won ?
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg> :

              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              }
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.text1, marginBottom: 4 }}>
              {won ? '¡Felicidades!' : 'Partida Terminada'}
            </div>
            <div style={{ fontSize: 13, color: C.text3, marginBottom: 8 }}>{n.tableName || n.body}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: C.text3, fontWeight: 600, marginBottom: 2 }}>Posición</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: n.position <= 3 ? C.yellow : C.text1 }}>#{n.position}</div>
              </div>
              <div style={{ width: 1, height: 30, background: C.border }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: C.text3, fontWeight: 600, marginBottom: 2 }}>{won ? 'Ganancia' : 'Pérdida'}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: won ? C.green : C.red, fontVariantNumeric: 'tabular-nums' }}>
                  {won ? '+' : '-'}${n.amount}
                </div>
              </div>
            </div>
          </div>

          {/* Game info stats */}
          {rd &&
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
              {[
            { l: 'Entrada', v: '$' + rd.entry },
            { l: 'Jugadores', v: rd.totalPlayers },
            { l: 'Duración', v: rd.duration }].
            map((s) =>
            <div key={s.l} style={{ padding: '10px', background: C.card, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: C.text3, fontWeight: 600, marginBottom: 3 }}>{s.l}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{s.v}</div>
                </div>
            )}
            </div>
          }

          {/* Prize distribution */}
          {rd && rd.prizeDistribution &&
          <div style={{ padding: '12px 14px', background: C.card, borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text1, marginBottom: 10 }}>Distribución de premios</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[
              { pos: '1ro', pct: rd.prizeDistribution.first, medal: '🥇' },
              { pos: '2do', pct: rd.prizeDistribution.second, medal: '🥈' },
              { pos: '3ro', pct: rd.prizeDistribution.third, medal: '🥉' }].
              map((p) =>
              <div key={p.pos} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', background: C.bgLight, borderRadius: 8 }}>
                    <div style={{ fontSize: 14, marginBottom: 2 }}>{p.medal}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.green }}>${(rd.totalPrize * p.pct / 100).toFixed(0)}</div>
                    <div style={{ fontSize: 9, color: C.text3, marginTop: 1 }}>{p.pct}%</div>
                  </div>
              )}
              </div>
              <div style={{ fontSize: 9, color: C.text3, marginTop: 8 }}>Pozo total: ${rd.totalPrize.toLocaleString()} · Comisión: 5%</div>
            </div>
          }

          {/* Leaderboard */}
          {rd && rd.leaderboard &&
          <div style={{ padding: '12px 14px', background: C.card, borderRadius: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text1, marginBottom: 10 }}>Ranking Final</div>
              {rd.leaderboard.map((p) =>
            <div key={p.rank} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '7px 6px',
              background: p.isMe ? C.accent + '12' : 'transparent',
              borderRadius: 8, marginBottom: 2
            }}>
                  <span style={{ width: 20, fontSize: 11, fontWeight: 700, color: p.rank <= 3 ? C.yellow : C.text3, textAlign: 'center' }}>
                    {p.rank <= 3 ? ['🥇', '🥈', '🥉'][p.rank - 1] : '#' + p.rank}
                  </span>
                  <div style={{
                width: 24, height: 24, borderRadius: 7, background: p.avatar,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, color: '#fff', fontWeight: 700
              }}>{p.name.slice(0, 2).toUpperCase()}</div>
                  <span style={{ flex: 1, fontSize: 11, fontWeight: p.isMe ? 700 : 500, color: p.isMe ? C.accentLight : C.text1 }}>
                    {p.isMe ? 'Vos' : p.name}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums' }}>
                    {p.balance.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 9, color: C.text3, fontWeight: 500 }}>pts</span>
                </div>
            )}
            </div>
          }

          {/* Close button */}
          <button onClick={doClose} style={{
            width: '100%', padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 700,
            background: C.accent, color: '#fff', border: 'none', cursor: 'pointer'
          }}>Cerrar</button>
        </div>
      </div>
    </div>);

}

// ─── Transaction Detail Modal ───

function TransactionDetailModal({ notification, onClose, onRetry }) {
  const [closing, setClosing] = React.useState(false);
  const n = notification;
  const tx = n.txData || {};
  const isError = n.type === 'deposit_error' || n.type === 'withdrawal_error';
  const isDeposit = n.type === 'deposit' || n.type === 'deposit_error';
  const typeLabel = isDeposit ? 'Depósito' : 'Retiro';

  const doClose = () => {
    setClosing(true);
    setTimeout(() => {setClosing(false);onClose();}, 250);
  };

  const isVisible = !closing;

  const statusConfig = isError ?
  { label: 'Error', color: C.red, bg: C.red + '15', icon: 'alertCircle' } :
  { label: 'Completado', color: C.green, bg: C.green + '15', icon: 'check' };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 210, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={doClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s'
      }}></div>

      <div style={{
        position: 'relative', zIndex: 1, background: C.bgLight,
        borderRadius: '20px 20px 0 0', maxHeight: '85vh',
        display: 'flex', flexDirection: 'column',
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }}></div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 16px 14px', borderBottom: '1px solid ' + C.border, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name={isDeposit ? 'deposit' : 'withdraw'} size={18} color={isError ? C.red : isDeposit ? C.green : C.text2} />
            <span style={{ ...{ fontSize: 16, fontWeight: 700, color: C.text1 }, color: "rgb(255, 255, 255)" }}>Detalle de {typeLabel}</span>
          </div>
          <button onClick={doClose} style={{ background: C.card, border: 'none', color: C.text3, width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 24px' }}>
          {/* Amount hero */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, margin: '0 auto 12px',
              background: statusConfig.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {isError ?
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg> :

              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
            </div>
            <div style={{
              fontSize: 28, fontWeight: 800,
              color: isError ? C.red : isDeposit ? C.green : C.red,
              fontVariantNumeric: 'tabular-nums', marginBottom: 4
            }}>
              {isDeposit && !isError ? '+' : isError ? '' : '-'}${n.amount.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: C.text3 }}>USD</div>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 20, marginTop: 10,
              background: statusConfig.bg
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusConfig.color }}></div>
              <span style={{ fontSize: 11, fontWeight: 700, color: statusConfig.color }}>{statusConfig.label}</span>
            </div>
          </div>

          {/* Transaction details */}
          <div style={{ padding: '14px', background: C.card, borderRadius: 14, marginBottom: 16 }}>
            {[
            { label: 'Tipo', value: typeLabel },
            { label: 'Método', value: tx.method || '—' },
            { label: 'Referencia', value: tx.ref || '—' },
            { label: 'Fecha', value: tx.date || '—' }].
            map((row, i, arr) =>
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0',
              borderBottom: i < arr.length - 1 ? '1px solid ' + C.border : 'none'
            }}>
                <span style={{ fontSize: 12, color: C.text3, fontWeight: 500 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: C.text1, fontWeight: 600, textAlign: 'right', maxWidth: '60%', wordBreak: 'break-all' }}>{row.value}</span>
              </div>
            )}
          </div>

          {/* Error message */}
          {isError && tx.errorMsg &&
          <div style={{
            padding: '14px', background: C.red + '10',
            border: '1px solid ' + C.red + '25',
            borderRadius: 14, marginBottom: 16
          }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.red }}>Detalle del error</span>
              </div>
              <div style={{ fontSize: 11, color: C.text2, lineHeight: 1.5 }}>{tx.errorMsg}</div>
            </div>
          }

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {isError &&
            <button onClick={() => {doClose();if (onRetry) onRetry(n);}} style={{
              flex: 2, padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 700,
              background: C.accent, color: '#fff', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Reintentar
              </button>
            }
            <button onClick={doClose} style={{
              flex: isError ? 1 : 1, padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 700,
              background: isError ? C.card : C.accent,
              color: isError ? C.text2 : '#fff',
              border: isError ? '1px solid ' + C.border : 'none',
              cursor: 'pointer'
            }}>
              {isError ? 'Cerrar' : 'Cerrar'}
            </button>
          </div>
        </div>
      </div>
    </div>);

}

// ─── Last Longer Summary Modal (action sheet) ───

function LastLongerSummaryModal({ notification, onClose, onAccept }) {
  const n = notification;
  const ll = n.lastLongerData;
  if (!ll) return null;

  const getLLPrizeInfo = (entry, playerCount) => {
    const total = entry * playerCount;
    const commission = total * 0.05;
    const prize = total - commission;
    if (playerCount < 4) return { winners: 1, splits: [{ pos: '1ro', pct: 100 }], prize };
    if (playerCount < 10) return { winners: 2, splits: [{ pos: '1ro', pct: 65 }, { pos: '2do', pct: 35 }], prize };
    return { winners: 3, splits: [{ pos: '1ro', pct: 50 }, { pos: '2do', pct: 30 }, { pos: '3ro', pct: 20 }], prize };
  };

  const info = getLLPrizeInfo(ll.entry, ll.players.length);
  const spotsLeft = ll.maxPlayers - ll.players.length;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 210,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
    }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)'
      }}></div>

      {/* Sheet */}
      <div style={{
        position: 'relative', zIndex: 1, background: C.bgLight,
        borderRadius: '20px 20px 0 0', maxHeight: '85vh',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }}></div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text1 }}>Invitación Last Longer</div>
              <div style={{ fontSize: 11, color: C.text3, marginTop: 1 }}>{ll.tournamentName || 'Torneo'}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 9, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                color: ll.isPublic ? C.green : C.yellow,
                background: (ll.isPublic ? C.green : C.yellow) + '15'
              }}>{ll.isPublic ? 'Público' : 'Privado'}</span>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.text3, fontSize: 18, cursor: 'pointer' }}>✕</button>
            </div>
          </div>

          {/* Creator card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, padding: '12px', background: C.card, borderRadius: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: ll.creatorAvatar,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: '#fff', fontWeight: 700
            }}>{ll.creator.slice(0, 2).toUpperCase()}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{ll.creator}</div>
              <div style={{ fontSize: 11, color: C.text3 }}>te invitó a participar</div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <div style={{ padding: '12px', background: C.card, borderRadius: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: C.text3, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Entrada</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.text1 }}>${ll.entry}</div>
            </div>
            <div style={{ padding: '12px', background: C.card, borderRadius: 14, textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: C.text3, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Pozo estimado</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>${info.prize.toFixed(0)}</div>
            </div>
          </div>

          {/* Spots bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '10px 12px', background: C.card, borderRadius: 14 }}>
            <div style={{ display: 'flex', gap: 3, flex: 1 }}>
              {Array.from({ length: Math.min(ll.maxPlayers, 10) }).map((_, i) =>
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i < ll.players.length ? C.green : C.border,
                opacity: i < ll.players.length ? 1 : 0.4
              }}></div>
              )}
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.text2 }}>{ll.players.length}/{ll.maxPlayers}</span>
            <span style={{ fontSize: 10, color: spotsLeft <= 2 ? C.red : C.text3, fontWeight: 600 }}>
              {spotsLeft} {spotsLeft === 1 ? 'libre' : 'libres'}
            </span>
          </div>

          {/* Prize distribution */}
          <div style={{ padding: '12px', background: C.card, borderRadius: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Distribución de premios</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {info.splits.map((s, i) =>
              <div key={s.pos} style={{ flex: 1, padding: '8px', background: C.bgLight, borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 14, marginBottom: 2 }}>{['🥇', '🥈', '🥉'][i] || ''}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.green }}>${(info.prize * s.pct / 100).toFixed(0)}</div>
                  <div style={{ fontSize: 9, color: C.text3 }}>{s.pct}%</div>
                </div>
              )}
            </div>
          </div>

          {/* Participants list */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Participantes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {ll.players.map((name) =>
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: C.card, borderRadius: 10 }}>
                  <div style={{
                  width: 28, height: 28, borderRadius: 8, background: name === ll.creator ? ll.creatorAvatar : C.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, color: '#fff', fontWeight: 700
                }}>{name.slice(0, 2).toUpperCase()}</div>
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: C.text1 }}>{name}</span>
                  {name === ll.creator && <span style={{ fontSize: 9, color: C.text3, fontWeight: 600 }}>Creador</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fixed bottom actions */}
        <div style={{ padding: '12px 16px 24px', borderTop: '1px solid ' + C.border, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onClose} style={{
              flex: 1, padding: '14px', fontSize: 13, fontWeight: 700,
              background: C.card, color: C.text2, border: '1px solid ' + C.border,
              borderRadius: 12, cursor: 'pointer'
            }}>Rechazar</button>
            <button onClick={() => {if (onAccept) onAccept(ll);}} style={{
              flex: 2, padding: '14px', fontSize: 13, fontWeight: 700,
              background: C.accent, color: '#fff', border: 'none',
              borderRadius: 12, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              Unirme por ${ll.entry}
            </button>
          </div>
        </div>
      </div>
    </div>);

}

window.GameResultDetailModal = GameResultDetailModal;
window.TransactionDetailModal = TransactionDetailModal;
window.LastLongerSummaryModal = LastLongerSummaryModal;