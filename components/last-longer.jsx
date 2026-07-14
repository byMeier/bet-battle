
// Last Longer — side bet within tournaments

// Sample data for public Last Longers
const SAMPLE_LAST_LONGERS = [
{ id: 'll1', tableId: 4, creator: 'CryptoKing_99', creatorAvatar: '#6C5CE7', entry: 50, players: ['CryptoKing_99', 'BetMaster_AR', 'SharkBets'], maxPlayers: 10, isPublic: true, status: 'open' },
{ id: 'll2', tableId: 4, creator: 'LuckyDraw22', creatorAvatar: '#FDCB6E', entry: 100, players: ['LuckyDraw22', 'ProGambler'], maxPlayers: 6, isPublic: true, status: 'open' },
{ id: 'll3', tableId: 4, creator: 'NightOwlBet', creatorAvatar: '#FF7675', entry: 200, players: ['NightOwlBet', 'AceBetter', 'RiskTaker_X', 'NewPlayer01'], maxPlayers: 8, isPublic: true, status: 'open' },
{ id: 'll4', tableId: 6, creator: 'GauchoApuestas', creatorAvatar: '#75AADB', entry: 50, players: ['GauchoApuestas', 'MessiFan_10', 'ElPibe'], maxPlayers: 10, isPublic: true, status: 'open' },
{ id: 'll5', tableId: 6, creator: 'Scaloni_Tactics', creatorAvatar: '#2ECC71', entry: 150, players: ['Scaloni_Tactics', 'DiMaria_Fan'], maxPlayers: 6, isPublic: true, status: 'open' }];


function LastLongerPanel({ table, leaderboard, onClose, onExposeCreate, onTitleChange, onExposeBack }) {
  const [view, setView] = React.useState('browse'); // browse, create, detail

  // Expose the create trigger to parent
  React.useEffect(() => {
    if (onExposeCreate) onExposeCreate(() => setView('create'));
    if (onExposeBack) onExposeBack(() => {setView('browse');setSelectedLL(null);if (onTitleChange) onTitleChange(null);});
  }, []);
  const [myLastLongers, setMyLastLongers] = React.useState([]);
  const currentTableId = table ? table.id : null;
  const [publicLLs, setPublicLLs] = React.useState(() => {
    const all = [...(window.INJECTED_LAST_LONGERS || []), ...SAMPLE_LAST_LONGERS];
    return all.filter((ll) => ll.tableId === currentTableId);
  });
  const [selectedLL, setSelectedLL] = React.useState(null);
  const [llRanking, setLlRanking] = React.useState([]);
  const prevLlRankingRef = React.useRef({});

  const enterDetail = (ll) => {
    setSelectedLL(ll);
    setView('detail');
    if (onTitleChange) onTitleChange(ll.creator + ' · $' + ll.entry);
  };

  const exitDetail = () => {
    setView('browse');
    setSelectedLL(null);
    if (onTitleChange) onTitleChange(null);
  };

  // Update LL ranking from tournament leaderboard
  React.useEffect(() => {
    if (view === 'detail' && selectedLL) {
      const prevRanks = prevLlRankingRef.current;
      const players = selectedLL.players.map((name) => {
        const lb = leaderboard.find((p) => p.name === name);
        return {
          name,
          balance: lb ? lb.balance : 800 + Math.random() * 2000,
          avatar: lb ? lb.avatar : C.accent,
          isMe: lb ? lb.isMe : name === USER_PROFILE.name
        };
      }).sort((a, b) => b.balance - a.balance).map((p, i) => {
        const prevRank = prevRanks[p.name] !== undefined ? prevRanks[p.name] : i + 1;
        return { ...p, llRank: i + 1, change: prevRank - (i + 1) };
      });
      const newRanks = {};
      players.forEach((p) => {newRanks[p.name] = p.llRank;});
      prevLlRankingRef.current = newRanks;
      setLlRanking(players);
    }
  }, [view, selectedLL, leaderboard]);

  // Create form state
  const [createConfig, setCreateConfig] = React.useState({
    entry: 50,
    isPublic: true,
    maxPlayers: 10,
    invited: []
  });

  const entryPresets = [10, 25, 50, 100, 250, 500];

  const getPrizeInfo = (entry, playerCount) => {
    const total = entry * playerCount;
    const commission = total * 0.05;
    const prize = total - commission;
    if (playerCount < 4) return { winners: 1, splits: [{ pos: '🥇 1ro', pct: 100 }], prize };
    if (playerCount < 10) return { winners: 2, splits: [{ pos: '🥇 1ro', pct: 65 }, { pos: '🥈 2do', pct: 35 }], prize };
    return { winners: 3, splits: [{ pos: '🥇 1ro', pct: 50 }, { pos: '🥈 2do', pct: 30 }, { pos: '🥉 3ro', pct: 20 }], prize };
  };

  const tournamentName = table ? table.title || table.tournamentName || '' : '';

  const handleCreate = () => {
    const newLL = {
      id: 'll-' + Date.now(),
      tableId: currentTableId,
      creator: USER_PROFILE.name,
      creatorAvatar: USER_PROFILE.avatar,
      entry: createConfig.entry,
      players: [USER_PROFILE.name],
      maxPlayers: createConfig.maxPlayers,
      isPublic: createConfig.isPublic,
      status: 'open',
      tournamentName, mine: true
    };
    setMyLastLongers((prev) => [newLL, ...prev]);
    if (createConfig.isPublic) setPublicLLs((prev) => [newLL, ...prev]);
    window.registerMyLastLonger(newLL, tournamentName);
    setView('browse');
  };

  const handleJoin = (ll) => {
    const updated = { ...ll, players: [...ll.players, USER_PROFILE.name] };
    setPublicLLs((prev) => prev.map((l) => l.id === ll.id ? updated : l));
    setMyLastLongers((prev) => [updated, ...prev.filter((l) => l.id !== ll.id)]);
    window.registerMyLastLonger(updated, tournamentName);
    setSelectedLL(null);
  };

  const allMine = myLastLongers;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 40,
      display: 'flex', flexDirection: 'column',
      background: C.bg
    }}>
      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* CREATE VIEW */}
        {view === 'create' &&
        <div style={{ padding: '16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text1, marginBottom: 16 }}>Crear Last Longer</div>

            {/* Type */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Tipo</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ id: true, label: 'Público' }, { id: false, label: 'Privado' }].map((opt) =>
              <button key={String(opt.id)} onClick={() => setCreateConfig((p) => ({ ...p, isPublic: opt.id }))} style={{
                flex: 1, padding: '10px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: createConfig.isPublic === opt.id ? C.accent + '25' : C.card,
                color: createConfig.isPublic === opt.id ? C.accentLight : C.text2,
                border: createConfig.isPublic === opt.id ? '1px solid ' + C.accent : '1px solid transparent',
                borderRadius: 12
              }}>{opt.label}</button>
              )}
              </div>
              <div style={{ fontSize: 10, color: C.text3, marginTop: 6 }}>
                {createConfig.isPublic ? 'Cualquier miembro del torneo puede unirse' : 'Solo jugadores que invites'}
              </div>
            </div>

            {/* Entry */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Entrada</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {entryPresets.map((amt) =>
              <button key={amt} onClick={() => setCreateConfig((p) => ({ ...p, entry: amt }))} style={{
                padding: '8px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: createConfig.entry === amt ? C.accent + '25' : C.card,
                color: createConfig.entry === amt ? C.accentLight : C.text2,
                border: createConfig.entry === amt ? '1px solid ' + C.accent : '1px solid transparent',
                borderRadius: 12, minWidth: 56, textAlign: 'center'
              }}>${amt}</button>
              )}
              </div>
              {/* Custom input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 11, color: C.text3 }}>Otro:</span>
                <input type="number" min="1" value={createConfig.entry} onChange={(e) => setCreateConfig((p) => ({ ...p, entry: Math.max(1, parseInt(e.target.value) || 0) }))} style={{
                width: 80, padding: '6px 10px', fontSize: 13, fontWeight: 700,
                background: C.card, border: '1px solid ' + C.border, borderRadius: 8,
                color: C.text1, outline: 'none'
              }} />
              </div>
            </div>

            {/* Max players */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Jugadores máx.</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[2, 4, 6, 8, 10].map((n) =>
              <button key={n} onClick={() => setCreateConfig((p) => ({ ...p, maxPlayers: n }))} style={{
                flex: 1, padding: '8px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                background: createConfig.maxPlayers === n ? C.accent + '25' : C.card,
                color: createConfig.maxPlayers === n ? C.accentLight : C.text2,
                border: createConfig.maxPlayers === n ? '1px solid ' + C.accent : '1px solid transparent',
                borderRadius: 12
              }}>{n}</button>
              )}
              </div>
            </div>

            {/* Preview */}
            {(() => {
            const info = getPrizeInfo(createConfig.entry, createConfig.maxPlayers);
            return (
              <div style={{ padding: '14px', background: C.card, borderRadius: 14, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Resumen</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 9, color: C.text3 }}>Entrada</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>${createConfig.entry}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: C.text3 }}>Pozo estimado</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.green }}>${info.prize.toFixed(0)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: C.text3 }}>Comisión</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text2 }}>5%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: C.text3 }}>Ganadores</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>{info.winners}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {info.splits.map((s) =>
                  <div key={s.pos} style={{ flex: 1, padding: '6px', background: C.bgLight, borderRadius: 8, textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: C.text3 }}>{s.pos}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.text1 }}>{s.pct}%</div>
                      </div>
                  )}
                  </div>
                </div>);

          })()}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setView('browse')} style={{
              flex: 1, padding: '13px', fontSize: 13, fontWeight: 700,
              background: C.card, color: C.text2, border: '1px solid ' + C.border, borderRadius: 12, cursor: 'pointer'
            }}>Cancelar</button>
              <button onClick={handleCreate} style={{
              flex: 2, padding: '13px', fontSize: 13, fontWeight: 700,
              background: C.accent, color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer'
            }}>Crear Last Longer</button>
            </div>
          </div>
        }

        {/* DETAIL VIEW — live ranking */}
        {view === 'detail' && selectedLL && (() => {
          const prizeInfo = getPrizeInfo(selectedLL.entry, selectedLL.players.length);
          const myPlayer = llRanking.find((p) => p.isMe || p.name === USER_PROFILE.name);
          const myRank = myPlayer ? myPlayer.llRank : '—';
          const timeLeft = table ? table.timeLeft : '—';
          return (
            <div style={{ padding: "12px 16px 16px" }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 12, marginTop: 8 }}>
                <div style={{ padding: '10px 6px', background: C.card, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, color: C.text3, fontWeight: 600, textTransform: 'uppercase' }}>Pozo</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.green }}>${prizeInfo.prize.toFixed(0)}</div>
                </div>
                <div style={{ padding: '10px 6px', background: C.card, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, color: C.text3, fontWeight: 600, textTransform: 'uppercase' }}>Tu posición</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: C.accentLight }}>#{myRank}</div>
                </div>
                <div style={{ padding: '10px 6px', background: C.card, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, color: C.text3, fontWeight: 600, textTransform: 'uppercase' }}>Tiempo</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{timeLeft}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
                <div style={{ padding: '8px', background: C.card, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, color: C.text3, fontWeight: 600, textTransform: 'uppercase' }}>Entrada</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>${selectedLL.entry}</div>
                </div>
                <div style={{ padding: '8px', background: C.card, borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 8, color: C.text3, fontWeight: 600, textTransform: 'uppercase' }}>Jugadores</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{selectedLL.players.length}/{selectedLL.maxPlayers}</div>
                </div>
              </div>
              <div style={{ padding: '10px 12px', background: C.card, borderRadius: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Quien se lleva el pozo</div>
                {prizeInfo.splits.map((s, i) => {
                  const winner = llRanking[i];
                  if (!winner) return null;
                  const amount = (prizeInfo.prize * s.pct / 100).toFixed(0);
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i > 0 ? '1px solid ' + C.border : 'none' }}>
                      <span style={{ fontSize: 14 }}>{['🥇', '🥈', '🥉'][i]}</span>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: winner.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#fff', fontWeight: 700 }}>{winner.name.slice(0, 2).toUpperCase()}</div>
                      <span style={{ flex: 1, fontSize: 11, fontWeight: winner.isMe ? 700 : 500, color: winner.isMe ? C.accentLight : C.text1 }}>{winner.isMe ? 'Vos' : winner.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>${amount}</span>
                    </div>);

                })}
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Ranking en vivo</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {llRanking.map((p) =>
                <div key={p.name} style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                  background: p.isMe ? C.accent + '15' : 'transparent',
                  border: p.isMe ? '1px solid ' + C.accent + '30' : '1px solid transparent',
                  borderRadius: 8
                }}>
                    <span style={{ width: 20, fontSize: 12, fontWeight: 700, textAlign: 'center', color: p.llRank <= 3 ? C.yellow : C.text3 }}>{p.llRank}</span>
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: p.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>{p.name.slice(0, 2).toUpperCase()}</div>
                    <span style={{ flex: 1, fontSize: 12, fontWeight: p.isMe ? 700 : 400, color: p.isMe ? C.accentLight : C.text1 }}>{p.isMe ? 'Vos' : p.name}</span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', minWidth: 40, textAlign: 'right' }}>{p.balance.toFixed(0)}</div>
                    <span style={{ fontSize: 10, fontWeight: 600, minWidth: 22, textAlign: 'center', color: p.change > 0 ? C.green : p.change < 0 ? C.red : C.text3 }}>
                      {p.change > 0 ? '▲' + p.change : p.change < 0 ? '▼' + Math.abs(p.change) : '—'}
                    </span>
                  </div>
                )}
              </div>
            </div>);

        })()}

        {/* BROWSE VIEW */}
        {view === 'browse' &&
        <div style={{ padding: '12px 16px' }}>
            {/* My active Last Longers */}
            {allMine.length > 0 &&
          <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text1, marginBottom: 10 }}>Mis Last Longers</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {allMine.map((ll) =>
              <LLCard key={ll.id} ll={ll} isMine={true} getPrizeInfo={getPrizeInfo} onTap={() => enterDetail(ll)} />
              )}
                </div>
              </div>
          }

            {/* Public Last Longers */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text1, marginBottom: 10 }}>Last Longers Públicos</div>
              {publicLLs.filter((ll) => !ll.players.includes(USER_PROFILE.name)).length === 0 ?
            <div style={{ textAlign: 'center', padding: '30px 20px', color: C.text3, fontSize: 12 }}>
                  No hay Last Longers disponibles. ¡Crea uno!
                </div> :

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {publicLLs.filter((ll) => !ll.players.includes(USER_PROFILE.name)).map((ll) =>
              <LLCard key={ll.id} ll={ll} isMine={false} getPrizeInfo={getPrizeInfo} onTap={() => setSelectedLL(ll)} />
              )}
                </div>
            }
            </div>
          </div>
        }
      </div>

      {/* Join modal — action sheet (only for non-joined LLs) */}
      {selectedLL && view !== 'detail' &&
      <div style={{
        position: 'absolute', inset: 0, zIndex: 50,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
      }}>
          <div onClick={() => setSelectedLL(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }}></div>
          <div style={{
          position: 'relative', zIndex: 1, background: C.bgLight,
          borderRadius: '20px 20px 0 0', padding: '0 0 24px', maxHeight: '80vh', display: 'flex', flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', flexShrink: 0 }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }}></div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 0' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text1 }}>Last Longer</div>
                <button onClick={() => setSelectedLL(null)} style={{ background: 'none', border: 'none', color: C.text3, fontSize: 18, cursor: 'pointer' }}>✕</button>
              </div>

              {/* Creator info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, padding: '12px', background: C.card, borderRadius: 14 }}>
                <div style={{
                width: 40, height: 40, borderRadius: 12, background: selectedLL.creatorAvatar,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: '#fff', fontWeight: 700
              }}>{selectedLL.creator.slice(0, 2).toUpperCase()}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{selectedLL.creator}</div>
                  <div style={{ fontSize: 10, color: C.text3 }}>{selectedLL.isPublic ? 'Público' : 'Privado'} · {selectedLL.players.length}/{selectedLL.maxPlayers} jugadores</div>
                </div>
                <span style={{
                fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                color: selectedLL.isPublic ? C.green : C.yellow,
                background: (selectedLL.isPublic ? C.green : C.yellow) + '15'
              }}>{selectedLL.isPublic ? 'Público' : 'Privado'}</span>
              </div>

              {/* Stats grid */}
              {(() => {
              const currentInfo = getPrizeInfo(selectedLL.entry, selectedLL.players.length);
              const spotsLeft = selectedLL.maxPlayers - selectedLL.players.length;
              return (
                <React.Fragment>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                      <div style={{ padding: '12px', background: C.card, borderRadius: 14, textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: C.text3, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Entrada</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: C.text1 }}>${selectedLL.entry}</div>
                      </div>
                      <div style={{ padding: '12px', background: C.card, borderRadius: 14, textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: C.text3, fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>Pozo estimado</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>${currentInfo.prize.toFixed(0)}</div>
                      </div>
                    </div>

                    {/* Spots bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '10px 12px', background: C.card, borderRadius: 14 }}>
                      <div style={{ display: 'flex', gap: 3, flex: 1 }}>
                        {Array.from({ length: Math.min(selectedLL.maxPlayers, 10) }).map((_, i) =>
                      <div key={i} style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: i < selectedLL.players.length ? C.green : C.border,
                        opacity: i < selectedLL.players.length ? 1 : 0.4
                      }}></div>
                      )}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.text2 }}>{selectedLL.players.length}/{selectedLL.maxPlayers}</span>
                      <span style={{ fontSize: 10, color: spotsLeft <= 2 ? C.red : C.text3, fontWeight: 600 }}>
                        {spotsLeft} {spotsLeft === 1 ? 'libre' : 'libres'}
                      </span>
                    </div>

                    {/* Prize distribution */}
                    <div style={{ padding: '12px', background: C.card, borderRadius: 14, marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Distribución de premios</div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {currentInfo.splits.map((s, i) =>
                      <div key={s.pos} style={{ flex: 1, padding: '8px', background: C.bgLight, borderRadius: 10, textAlign: 'center' }}>
                            <div style={{ fontSize: 14, marginBottom: 2 }}>{['🥇', '🥈', '🥉'][i] || ''}</div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: C.green }}>${(currentInfo.prize * s.pct / 100).toFixed(0)}</div>
                            <div style={{ fontSize: 9, color: C.text3 }}>{s.pct}%</div>
                          </div>
                      )}
                      </div>
                    </div>
                  </React.Fragment>);

            })()}

              {/* Participants */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text3, marginBottom: 8, textTransform: 'uppercase' }}>Participantes</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {selectedLL.players.map((name) => {
                  const lb = leaderboard.find((p) => p.name === name);
                  return (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: C.card, borderRadius: 10 }}>
                        <div style={{
                        width: 28, height: 28, borderRadius: 8, background: name === selectedLL.creator ? selectedLL.creatorAvatar : lb ? lb.avatar : C.accent,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 9, color: '#fff', fontWeight: 700
                      }}>{name.slice(0, 2).toUpperCase()}</div>
                        <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: C.text1 }}>{name}</span>
                        {name === selectedLL.creator && <span style={{ fontSize: 9, color: C.text3, fontWeight: 600 }}>Creador</span>}
                        {lb && <span style={{ fontSize: 10, color: C.text3 }}>#{lb.rank}</span>}
                      </div>);

                })}
                </div>
              </div>
            </div>

            {/* Fixed bottom actions */}
            <div style={{ padding: '0 16px', flexShrink: 0 }}>
              {!selectedLL.players.includes(USER_PROFILE.name) ?
            <button onClick={() => handleJoin(selectedLL)} style={{
              width: '100%', padding: '14px', fontSize: 14, fontWeight: 700,
              background: C.accent, color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer'
            }}>Unirme por ${selectedLL.entry}</button> :

            <div style={{ textAlign: 'center', padding: '10px', fontSize: 12, color: C.green, fontWeight: 600 }}>
                  ✓ Ya estás participando
                </div>
            }
            </div>
          </div>
        </div>
      }
    </div>);

}

function LLCard({ ll, isMine, getPrizeInfo, onTap }) {
  const info = getPrizeInfo(ll.entry, ll.players.length);
  const spotsLeft = ll.maxPlayers - ll.players.length;

  return (
    <button onClick={onTap} style={{
      background: C.card, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14,
      padding: '14px', cursor: 'pointer', textAlign: 'left', width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Entry badge */}
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: C.accent + '15', border: '1px solid ' + C.accent + '25',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.text1, lineHeight: 1 }}>${ll.entry}</span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.text1 }}>{ll.creator}</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: ll.isPublic ? C.green : C.yellow, padding: '2px 6px', background: (ll.isPublic ? C.green : C.yellow) + '15', borderRadius: 20 }}>
              {ll.isPublic ? 'Público' : 'Privado'}
            </span>
            {isMine &&
            <span style={{ fontSize: 9, fontWeight: 600, color: C.accent, padding: '2px 6px', background: C.accent + '15', borderRadius: 20 }}>Mío</span>
            }
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>Pozo: ${info.prize.toFixed(0)}</span>
            <span style={{ fontSize: 10, color: C.text3 }}>·</span>
            <span style={{ fontSize: 10, color: C.text3 }}>{info.winners} ganador{info.winners > 1 ? 'es' : ''}</span>
          </div>
          {/* Player dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {Array.from({ length: Math.min(ll.maxPlayers, 10) }).map((_, i) =>
              <div key={i} style={{
                width: 7, height: 7, borderRadius: '50%',
                background: i < ll.players.length ? C.green : C.border,
                opacity: i < ll.players.length ? 1 : 0.4
              }}></div>
              )}
            </div>
            <span style={{ fontSize: 9, color: spotsLeft <= 2 ? C.red : C.text3, fontWeight: 600, marginLeft: 4 }}>
              {spotsLeft <= 0 ? 'Lleno' : spotsLeft + ' libres'}
            </span>
          </div>
        </div>

        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
      </div>
    </button>);

}

window.INJECTED_LAST_LONGERS = window.INJECTED_LAST_LONGERS || [];

// Global registry of Last Longers the user has joined or created.
// Read by MyTablesScreen so the user can see their Last Longers outside the game.
window.MY_LAST_LONGERS = window.MY_LAST_LONGERS || [];
window.registerMyLastLonger = function (ll, tournamentName) {
  if (!ll) return;
  const entry = { ...ll, tournamentName: tournamentName || ll.tournamentName || '', joinedAt: Date.now() };
  const existing = window.MY_LAST_LONGERS.find((l) => l.id === ll.id);
  if (existing) {
    Object.assign(existing, entry);
  } else {
    window.MY_LAST_LONGERS.unshift(entry);
  }
};
window.LastLongerPanel = LastLongerPanel;