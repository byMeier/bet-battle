
// Matchmaking screen — animated sport ball loading

function MatchmakingScreen({ table, onCancel, onMatched }) {
  const [phase, setPhase] = React.useState('searching');
  const [dots, setDots] = React.useState(0);
  const [playersFound, setPlayersFound] = React.useState(table ? table.players : 3);
  const maxPlayers = table ? table.maxPlayers : 10;

  React.useEffect(() => {
    const dotInterval = setInterval(() => setDots((d) => (d + 1) % 4), 500);
    const playerInterval = setInterval(() => {
      setPlayersFound((p) => {if (p >= maxPlayers) {clearInterval(playerInterval);return p;}return p + 1;});
    }, 1200);
    return () => {clearInterval(dotInterval);clearInterval(playerInterval);};
  }, []);

  React.useEffect(() => {
    if (playersFound >= maxPlayers && phase === 'searching') {
      setPhase('found');
      setTimeout(() => {setPhase('entering');setTimeout(() => onMatched && onMatched(), 1500);}, 2000);
    }
  }, [playersFound, phase]);

  const sportKey = table ? table.category || 'free' : 'free';
  // Get the sport-specific color for the ball
  const ballColor = SPORT_COLORS[sportKey] || SPORT_COLORS.free;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px', minHeight: '100%', textAlign: 'center'
    }}>
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 28 }}>
        {/* Pulse rings */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${ballColor}30`, animation: 'mmPulse 2s ease-in-out infinite' }}></div>
        <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: `2px solid ${ballColor}50`, animation: 'mmPulse 2s ease-in-out infinite 0.3s' }}></div>
        <div style={{ position: 'absolute', inset: 16, borderRadius: '50%', border: `1px solid ${ballColor}25`, animation: 'mmPulse 2s ease-in-out infinite 0.6s' }}></div>
        {/* Center ball — animated bounce + spin */}
        <div style={{
          position: 'absolute', inset: 24, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: phase === 'entering' ? 'none' : 'mmBounce 1s ease-in-out infinite'
        }}>
          {phase === 'entering' ?
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: `${C.green}20`, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div> :

          <div style={{ animation: 'mmSpin 3s linear infinite', width: '100%', height: '100%' }}>
              <SportIcon sport={sportKey} size={72} color={ballColor} />
            </div>
          }
        </div>
        {/* Shadow under ball */}
        {phase !== 'entering' &&
        <div style={{
          position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
          width: 50, height: 8, borderRadius: '50%',
          background: `radial-gradient(ellipse, ${ballColor}20 0%, transparent 70%)`,
          animation: 'mmShadow 1s ease-in-out infinite'
        }}></div>
        }
      </div>

      <div style={{ fontSize: 18, fontWeight: 700, color: C.text1, marginBottom: 4 }}>
        {phase === 'searching' && `Buscando jugadores${'.'.repeat(dots)}`}
        {phase === 'found' && '¡Partida completa!'}
        {phase === 'entering' && 'Entrando a la partida...'}
      </div>
      <div style={{ fontSize: 12, color: C.text3, marginBottom: 28 }}>
        {phase === 'searching' && 'Emparejando por nivel y disponibilidad'}
        {phase === 'found' && 'Preparando partida'}
        {phase === 'entering' && 'Conectando con otros jugadores'}
      </div>

      {table &&
      <div style={{ width: '100%', padding: '14px 16px', background: C.card, marginBottom: 20, borderRadius: "16px" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div><span style={{ fontSize: 9, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Entrada</span><div style={{ fontSize: 15, fontWeight: 700, color: C.text1 }}>${table.entry}</div></div>
            <div style={{ textAlign: 'center' }}><span style={{ fontSize: 9, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Nivel</span><div style={{ fontSize: 15, fontWeight: 700, color: C.text1 }}>{table.level}+</div></div>
            <div style={{ textAlign: 'right' }}><span style={{ fontSize: 9, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Premio</span><div style={{ fontSize: 15, fontWeight: 700, color: C.green }}>${table.prize}</div></div>
          </div>
        </div>
      }

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
        {Array.from({ length: maxPlayers }).map((_, i) => {
          const found = i < playersFound;
          const isMe = i === playersFound - 1 && found;
          return (
            <div key={i} style={{
              width: 34, height: 34, borderRadius: 8, background: found ? isMe ? C.accent : C.cardHover : C.card,
              border: found ? 'none' : `1px dashed ${C.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, color: '#fff', fontWeight: 700,
              transition: 'all 0.3s', transform: found ? 'scale(1)' : 'scale(0.85)', opacity: found ? 1 : 0.3
            }}>
              {found && (isMe ?
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg> :

              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg>)
              }
            </div>);

        })}
      </div>

      <div style={{ fontSize: 13, color: C.text2, marginBottom: 28, fontVariantNumeric: 'tabular-nums' }}>
        {playersFound}/{maxPlayers} jugadores
      </div>

      {phase === 'searching' &&
      <button onClick={onCancel} style={{
        padding: '11px 28px', fontSize: 13, fontWeight: 700,
        background: `${C.red}18`, color: C.red, border: `1px solid ${C.red}30`, cursor: 'pointer', borderRadius: "16px"
      }}>Cancelar búsqueda</button>
      }

      <style>{`
@keyframes mmPulse { 0%,100% { transform:scale(1);opacity:1 } 50% { transform:scale(1.12);opacity:0.4 } }
@keyframes mmBounce { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-10px) } }
@keyframes mmSpin { 0% { transform:rotate(0deg) } 100% { transform:rotate(360deg) } }
@keyframes mmShadow { 0%,100% { transform:translateX(-50%) scale(1);opacity:0.6 } 50% { transform:translateX(-50%) scale(0.6);opacity:0.3 } }
      `}</style>
    </div>);

}

window.MatchmakingScreen = MatchmakingScreen;