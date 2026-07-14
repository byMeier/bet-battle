
// Create Private Table flow — invite friends, configure settings

function CreateTableScreen({ onBack, onStart, onRoomCreated, resumeConfig, onConfirmedChange }) {
  const [roomCode] = React.useState(() => {
    if (resumeConfig && resumeConfig.roomCode) return resumeConfig.roomCode;
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  });
  const [step, setStep] = React.useState(resumeConfig ? 'ready' : 'config');
  const [config, setConfig] = React.useState(resumeConfig ? resumeConfig.config : {
    entry: 10,
    category: 'free',
    timeLimit: '3h',
    maxPlayers: 10,
    minBets: 3,
    visibility: 'private'
  });
  const [invited, setInvited] = React.useState(resumeConfig ? resumeConfig.invited : []);
  const [confirmed, setConfirmed] = React.useState(resumeConfig ? resumeConfig.confirmed || [] : []);
  const [codeCopied, setCodeCopied] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);

  // Notify parent when waiting room is created
  const roomCreatedRef = React.useRef(false);
  React.useEffect(() => {
    if (step === 'ready' && onRoomCreated && !roomCreatedRef.current) {
      roomCreatedRef.current = true;
      onRoomCreated(config, invited, roomCode);
    }
  }, [step]);

  const friends = (window.MOCK_FRIENDS || []).map((f) => ({ id: f.id, name: f.name, avatar: f.avatar, online: f.online, level: f.level }));


  const toggleInvite = (id) => {
    setInvited((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  // Simulate confirmations (only for unconfirmed invites)
  React.useEffect(() => {
    if (step === 'ready') {
      const iv = setInterval(() => {
        setConfirmed((prev) => {
          const pending = invited.filter((id) => !prev.includes(id));
          if (pending.length === 0) {clearInterval(iv);return prev;}
          if (Math.random() > 0.4) {
            const next = [...prev, pending[0]];
            return next;
          }
          return prev;
        });
      }, 1500);
      return () => clearInterval(iv);
    }
  }, [step, invited]);

  // Persist confirmed to parent whenever it changes
  React.useEffect(() => {
    if (onConfirmedChange && confirmed.length > 0) {
      onConfirmedChange(confirmed);
    }
  }, [confirmed]);

  const entryOptions = [0, 5, 10, 25, 50, 100];
  const timeOptions = ['1h', '2h', '3h', '6h', '12h'];
  const playerOptions = [4, 6, 8, 10];
  const categories = [
  { id: 'free', label: 'Libre' },
  { id: 'football', label: 'Fútbol' },
  { id: 'basketball', label: 'Basket' },
  { id: 'tennis', label: 'Tenis' }];


  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Spacer top */}
      <div style={{ height: "0px" }}></div>

      {/* STEP 1: Config */}
      {step === 'config' &&
      <div style={{ padding: "14px 14px 0px" }}>
          {/* Entry amount */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
              <img src="assets/entrance.svg" width={13} height={13} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Entrada</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {entryOptions.map((amt) =>
            <button key={amt} onClick={() => setConfig((p) => ({ ...p, entry: amt }))} style={{
              flex: 1, padding: '10px 4px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: config.entry === amt ? `${C.accent}25` : C.card,
              color: config.entry === amt ? C.accentLight : C.text2,
              border: config.entry === amt ? `1px solid ${C.accent}` : 'none', borderRadius: "16px"
            }}>{amt === 0 ? 'Gratis' : '$' + amt}</button>
            )}
            </div>
            <div style={{ fontSize: 10, color: C.text3, marginTop: 4 }}>{config.entry === 0 ? 'Partida libre' : 'USD por jugador'}</div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
              <SportIcon sport="free" size={13} color="rgba(255,255,255,0.8)" />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Categoría</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {categories.map((cat) =>
            <button key={cat.id} onClick={() => setConfig((p) => ({ ...p, category: cat.id }))} style={{
              flex: 1, padding: '8px 4px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              background: config.category === cat.id ? `${C.accent}25` : C.card,
              color: config.category === cat.id ? C.accentLight : C.text2,
              border: config.category === cat.id ? `1px solid ${C.accent}` : 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, borderRadius: "16px"
            }}>
                  <SportIcon sport={cat.id === 'free' ? 'free' : cat.id} size={16} color={config.category === cat.id ? C.accentLight : C.text3} />
                  {cat.label}
                </button>
            )}
            </div>
          </div>

          {/* Time limit */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
              <img src="assets/duration.svg" width={13} height={13} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Duración</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {timeOptions.map((t) =>
            <button key={t} onClick={() => setConfig((p) => ({ ...p, timeLimit: t }))} style={{
              flex: 1, padding: '10px 4px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              background: config.timeLimit === t ? `${C.accent}25` : C.card,
              color: config.timeLimit === t ? C.accentLight : C.text2,
              border: config.timeLimit === t ? `1px solid ${C.accent}` : 'none', borderRadius: "16px"
            }}>{t}</button>
            )}
            </div>
          </div>

          {/* Max players */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
              <img src="assets/player.svg" width={13} height={13} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Jugadores máx.</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {playerOptions.map((n) =>
            <button key={n} onClick={() => setConfig((p) => ({ ...p, maxPlayers: n }))} style={{
              flex: 1, padding: '10px 4px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: config.maxPlayers === n ? `${C.accent}25` : C.card,
              color: config.maxPlayers === n ? C.accentLight : C.text2,
              border: config.maxPlayers === n ? `1px solid ${C.accent}` : 'none', borderRadius: "16px"
            }}>{n}</button>
            )}
            </div>
          </div>

          {/* Visibility */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
              <img src="assets/eye.svg" width={13} height={13} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Visibilidad</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[{ id: 'private', label: 'Privada', desc: 'Solo con invitación' }, { id: 'public', label: 'Pública', desc: 'Cualquiera puede unirse' }].map((v) =>
            <button key={v.id} onClick={() => setConfig((p) => ({ ...p, visibility: v.id }))} style={{
              flex: 1, padding: '10px 8px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              background: config.visibility === v.id ? `${C.accent}25` : C.card,
              color: config.visibility === v.id ? C.accentLight : C.text2,
              border: config.visibility === v.id ? `1px solid ${C.accent}` : 'none', borderRadius: "16px",
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2
            }}>
              <span>{v.label}</span>
              <span style={{ fontSize: 8, fontWeight: 500, color: config.visibility === v.id ? C.accentLight : C.text3, opacity: 0.8 }}>{v.desc}</span>
            </button>
            )}
            </div>
          </div>

          {/* Summary */}
          <div style={{
          padding: '12px 14px', background: C.card, marginBottom: 16, borderRadius: "16px"
        }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 6, textTransform: 'uppercase' }}>Resumen</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div><span style={{ fontSize: 9, color: C.text3 }}>Entrada</span><div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{config.entry === 0 ? 'Gratis' : '$' + config.entry}</div></div>
              <div><span style={{ fontSize: 9, color: C.text3 }}>Duración</span><div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{config.timeLimit}</div></div>
              <div><span style={{ fontSize: 9, color: C.text3 }}>Jugadores</span><div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>Hasta {config.maxPlayers}</div></div>
              <div><span style={{ fontSize: 9, color: C.text3 }}>Premio est.</span><div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{config.entry === 0 ? 'Sin premio' : '$' + (config.entry * config.maxPlayers * 0.95).toFixed(0)}</div></div>
            </div>
          </div>

          <button onClick={() => setStep('invite')} style={{
          width: '100%', padding: '14px', fontSize: 14, fontWeight: 700,
          background: C.accent, color: '#fff', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: "16px"
        }}>
            Siguiente: Invitar Amigos <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
      }

      {/* STEP 2: Invite friends */}
      {step === 'invite' &&
      <div style={{ padding: "8px 14px 0px" }}>
          {/* Share link — arriba */}
          <div style={{
          padding: '10px 12px', background: C.card, marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 8, borderRadius: "16px"
        }}>
            <Icon name="hash" size={16} color={C.text3} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: C.text3 }}>Comparte el enlace</div>
              <div style={{ fontSize: 11, color: C.accentLight, fontFamily: 'monospace' }}>betbattle.gg/partida/{roomCode}</div>
            </div>
            <button style={{
            padding: '5px 10px', fontSize: 10, fontWeight: 700,
            background: `${C.accent}20`, color: C.accentLight, border: 'none', cursor: 'pointer', borderRadius: "16px"
          }} onClick={() => {navigator.clipboard.writeText('betbattle.gg/partida/' + roomCode).catch(() => {});setLinkCopied(true);setTimeout(() => setLinkCopied(false), 2000);}}>{linkCopied ? 'Copiado' : 'Copiar'}</button>
          </div>

          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>
            Selecciona amigos para invitar ({invited.length}/{config.maxPlayers - 1} máx.)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 16 }}>
            {friends.map((f) => {
            const isInvited = invited.includes(f.id);
            const maxReached = invited.length >= config.maxPlayers - 1 && !isInvited;
            return (
              <button key={f.id} onClick={() => !maxReached && toggleInvite(f.id)} disabled={maxReached && !isInvited} style={{
                padding: '10px 12px', background: isInvited ? `${C.accent}12` : C.card,
                display: 'flex', alignItems: 'center', gap: 10,
                border: isInvited ? `1px solid ${C.accent}40` : '1px solid transparent',
                cursor: maxReached ? 'default' : 'pointer', opacity: maxReached ? 0.4 : 1, borderRadius: "16px"
              }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                    width: 36, height: 36, borderRadius: 10, background: f.avatar,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff', fontWeight: 700,
                    opacity: f.online ? 1 : 0.5
                  }}>{f.name.slice(0, 2).toUpperCase()}</div>
                    <span style={{
                    position: 'absolute', bottom: -1, right: -1, width: 8, height: 8,
                    borderRadius: '50%', background: f.online ? C.green : C.text3,
                    border: `2px solid ${isInvited ? C.bgLight : C.card}`
                  }}></span>
                  </div>
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>{f.name}</div>
                    <div style={{ fontSize: 10, color: C.text3 }}>Lvl {f.level} · {f.online ? 'Online' : 'Offline'}</div>
                  </div>
                  <div style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: isInvited ? C.accent : C.border,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s'
                }}>
                    {isInvited && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                  </div>
                </button>);

          })}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep('config')} style={{
            flex: 1, padding: '13px', fontSize: 13, fontWeight: 700,
            background: C.card, color: 'rgba(255,255,255,0.8)', border: `1px solid ${C.border}`, cursor: 'pointer', borderRadius: "16px"
          }}>Atrás</button>
            <button onClick={() => setStep('ready')} style={{
            flex: 2, padding: '13px', fontSize: 13, fontWeight: 700,
            background: C.accent, color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, borderRadius: "16px"
          }}>
              Crear Partida {invited.length > 0 && `(${invited.length} invitados)`}
            </button>
          </div>
        </div>
      }

      {/* STEP 3: Waiting room */}
      {step === 'ready' &&
      <div style={{ padding: "14px 14px 0px" }}>
          {/* Code — arriba */}
          <div style={{
          padding: '12px 14px', background: C.card, marginBottom: 8,
          display: 'flex', alignItems: 'center', borderRadius: "16px", position: 'relative'
        }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: C.text3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>Código de sala</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: 'monospace', letterSpacing: '0.15em' }}>{roomCode}</div>
            </div>
            <button style={{ ...{
              padding: '6px 12px', fontSize: 10, fontWeight: 700,
              background: `${C.accent}20`, color: C.accentLight, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4, borderRadius: "16px", position: 'absolute', right: 14
            }, color: "rgba(255, 255, 255, 0.8)", background: "rgba(255, 255, 255, 0.05)", opacity: codeCopied ? 0.8 : 1, transition: 'opacity 0.2s' }} onClick={() => {navigator.clipboard.writeText(roomCode).catch(() => {});setCodeCopied(true);setTimeout(() => setCodeCopied(false), 2000);}}>{codeCopied ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Copiado</> : <><img src="assets/copy.svg" width="12" height="12" style={{ opacity: 0.9 }} /> Copiar</>}</button>
          </div>

          {/* Room header */}
          <div style={{
          padding: '16px', background: C.card, marginBottom: 12, textAlign: 'center', borderRadius: "16px"
        }}>
            <div style={{ fontSize: 10, color: C.text3, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Partida Privada</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text1, marginBottom: 2 }}>{config.entry === 0 ? 'Gratis' : '$' + config.entry}</div>
            <div style={{ fontSize: 11, color: C.text3 }}>{config.timeLimit} · Hasta {config.maxPlayers} jugadores</div>
            <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8,
            padding: '4px 10px', background: `${C.green}15`,
            fontSize: 11, fontWeight: 600, color: C.green, borderRadius: "16px"
          }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.green, animation: 'blink 1.5s infinite' }}></span>
              Esperando jugadores...
            </div>
          </div>

          {/* Players in room */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 8, textTransform: 'uppercase' }}>
              Jugadores ({1 + confirmed.length}/{config.maxPlayers})
            </div>

            {/* You (host) */}
            <div style={{
            padding: '10px 12px', background: `${C.accent}10`,
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4,
            border: `1px solid ${C.accent}25`, borderRadius: "16px"
          }}>
              <div style={{
              width: 32, height: 32, borderRadius: 8, background: C.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, color: '#fff', fontWeight: 700
            }}>PL</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.accentLight }}>Player_2847 <span style={{ fontSize: 9, color: C.text3, fontWeight: 500 }}>(Tú — Host)</span></div>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.green, background: `${C.green}15`, padding: '2px 6px', borderRadius: "16px" }}>Listo</span>
            </div>

            {/* Confirmed players */}
            {confirmed.map((id) => {
            const f = friends.find((x) => x.id === id);
            if (!f) return null;
            return (
              <div key={id} style={{
                padding: '10px 12px', background: C.card,
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, borderRadius: "16px"
              }}>
                  <div style={{
                  width: 32, height: 32, borderRadius: 8, background: f.avatar,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: '#fff', fontWeight: 700
                }}>{f.name.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text1 }}>{f.name}</div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: C.green, background: `${C.green}15`, padding: '2px 6px', borderRadius: "16px" }}>Aceptó</span>
                </div>);

          })}

            {/* Pending invites */}
            {invited.filter((id) => !confirmed.includes(id)).map((id) => {
            const f = friends.find((x) => x.id === id);
            if (!f) return null;
            return (
              <div key={id} style={{
                padding: '10px 12px', background: C.card, borderRadius: 8,
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, opacity: 0.6
              }}>
                  <div style={{
                  width: 32, height: 32, borderRadius: 8, background: f.avatar,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: '#fff', fontWeight: 700
                }}>{f.name.slice(0, 2).toUpperCase()}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text2 }}>{f.name}</div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 600, color: C.yellow, background: `${C.yellow}15`, padding: '2px 6px', borderRadius: 4 }}>Pendiente...</span>
                </div>);

          })}

            {/* Empty slots */}
            {Array.from({ length: config.maxPlayers - 1 - invited.length }).map((_, i) =>
          <div key={`empty-${i}`} style={{
            padding: '10px 12px', background: C.card,
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, opacity: 0.3, borderRadius: "16px"
          }}>
                <div style={{
              width: 32, height: 32, borderRadius: 8, background: C.border,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px dashed ${C.text3}`
            }}>
                  <Icon name="user" size={14} color={C.text3} />
                </div>
                <span style={{ fontSize: 11, color: C.text3 }}>Lugar disponible</span>
              </div>
          )}
          </div>

          <div style={{ height: 80 }}></div>
          <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
        </div>
      }
      {/* Floating "Empezar Partida" button for waiting room */}
      {step === 'ready' &&
      <div style={{
        position: 'sticky', bottom: 0, left: 0, right: 0, zIndex: 20,
        padding: '12px 14px 16px',
        background: `linear-gradient(transparent, ${C.bg} 30%)`
      }}>
          <button onClick={() => {
          const confirmedFriends = confirmed.map((id) => friends.find((f) => f.id === id)).filter(Boolean);
          onStart && onStart(config, confirmedFriends);
        }} style={{
          width: '100%', padding: '16px', fontSize: 15, fontWeight: 700,
          background: confirmed.length > 0 ? C.accent : C.border,
          color: confirmed.length > 0 ? '#fff' : C.text3,
          border: 'none', cursor: confirmed.length > 0 ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 16,
          boxShadow: confirmed.length > 0 ? '0 4px 24px rgba(1,99,148,0.4)' : 'none',
          transition: 'all 0.2s'
        }}>
            <Icon name="zap" size={18} color={confirmed.length > 0 ? '#fff' : C.text3} />
            {confirmed.length > 0 ? `Empezar Partida (${1 + confirmed.length} jugadores)` : 'Esperando jugadores...'}
          </button>
        </div>
      }
    </div>);

}

window.CreateTableScreen = CreateTableScreen;