
// Results, Tables, Profile, Rules — pastel palette, SVG icons

function ResultsScreen({ onBack, table }) {
  const finalBoard = LEADERBOARD.slice(0, 10);
  const myResult = finalBoard.find((p) => p.isMe);
  const isTop20 = table && table.prizeMode === 'top20';
  const totalPlayers = isTop20 ? (table.players || finalBoard.length) : finalBoard.length;
  const winnerCount = isTop20 ? getTournamentWinnerCount(totalPlayers) : 3;
  const won = myResult && myResult.rank <= winnerCount;

  return (
    <div style={{ padding: '20px 14px', textAlign: 'center' }}>
      <div style={{
        width: 64, height: 64, borderRadius: 16, margin: '0 auto 10px',
        background: won ? `${C.green}18` : `${C.accent}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={won ? C.green : C.text2} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" /><path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
          <path d="M4 22h16" /><path d="M10 22V10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V22" />
          <rect x="6" y="3" width="12" height="6" rx="1" />
        </svg>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.text1, marginBottom: 4 }}>
        {won ? '¡Felicidades!' : 'Partida Terminada'}
      </div>
      <div style={{ fontSize: 13, color: won ? C.green : C.text3, marginBottom: 22 }}>
        {won
          ? isTop20
            ? `Top ${myResult.rank} — Dentro del Top 20%`
            : `Top ${myResult.rank} — Ganaste $${(myResult.balance * 0.8).toFixed(0)}`
          : `Posición #${myResult?.rank || '-'}`}
      </div>

      <div style={{ padding: '12px 14px', background: C.card, borderRadius: 10, marginBottom: 16, textAlign: 'left' }}>
        {isTop20 ? (
          <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text1 }}>Distribución de premios</div>
              <div style={{
                padding: '3px 8px', background: C.green + '18', borderRadius: 6,
                display: 'flex', alignItems: 'center', gap: 4
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span style={{ fontSize: 9, fontWeight: 700, color: C.green }}>Top 20% · {winnerCount} ganadores</span>
              </div>
            </div>
            {(() => {
              const prize = table.prize || 0;
              const bands = getTournamentPrizeBands(totalPlayers, prize);
              const showBands = bands.slice(0, 5);
              const bandColors = [C.yellow, '#C0C0C0', '#CD7F32', C.text2, C.text3];
              return showBands.map((b, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 12, color: C.text2 }}>{b.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {b.perPerson && <span style={{ fontSize: 8, color: C.text3 }}>c/u</span>}
                    <span style={{ fontSize: 12, fontWeight: 700, color: bandColors[Math.min(i, bandColors.length - 1)] }}>+${b.amount.toLocaleString()}</span>
                  </div>
                </div>
              ));
            })()}
            <div style={{ fontSize: 10, color: C.text3, marginTop: 6 }}>Comisión plataforma: 5%</div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text1, marginBottom: 8 }}>Distribución de premios</div>
            {finalBoard.slice(0, 3).map((p) =>
            <div key={p.rank} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 12, color: p.isMe ? C.accentLight : C.text1 }}>
                  {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : '🥉'} {p.name}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>+${(p.balance * 0.8).toFixed(0)}</span>
              </div>
            )}
            <div style={{ fontSize: 10, color: C.text3, marginTop: 6 }}>Comisión plataforma: 5%</div>
          </React.Fragment>
        )}
      </div>

      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.text1, marginBottom: 8 }}>Ranking Final</div>
        {finalBoard.map((p) => {
          const isWinner = p.rank <= winnerCount;
          return (
          <div key={p.rank} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px',
            background: p.isMe ? `${C.accent}15` : 'transparent', borderRadius: 6
          }}>
              <span style={{ width: 18, fontSize: 11, fontWeight: 700, color: isWinner ? C.yellow : C.text3 }}>{p.rank}</span>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: p.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff', fontWeight: 700 }}>{p.name.slice(0, 2).toUpperCase()}</div>
              <span style={{ flex: 1, fontSize: 11, color: p.isMe ? C.accentLight : C.text1 }}>{p.name}</span>
              {isTop20 && isWinner && <span style={{ fontSize: 8, color: C.green, fontWeight: 700, padding: '1px 5px', background: C.green + '15', borderRadius: 4 }}>TOP 20%</span>}
              <span style={{ fontSize: 12, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums' }}>{p.balance.toFixed(0)}</span>
            </div>);
        })}
      </div>

      <button onClick={onBack} style={{
        width: '100%', marginTop: 20, padding: '13px', borderRadius: 8, fontSize: 14, fontWeight: 700,
        background: C.accent, color: '#fff', border: 'none', cursor: 'pointer'
      }}>Volver al Lobby</button>
    </div>);

}

function TablesScreen({ onJoinTable, initialFilter, onSelectTournament, onCreateTable, onRules }) {
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [showRules, setShowRules] = React.useState(false);
  const [showFriendsPanel, setShowFriendsPanel] = React.useState(false);
  const modeIcons = { basic: 'quick', tournament: 'free', home: 'friends' };

  const sectionRefs = React.useRef({});
  const scrollContainerRef = React.useRef(null);

  const categories = [
  { id: 'free', sport: 'quick', label: 'Libre', desc: 'Apuesta en cualquier deporte', color: SPORT_COLORS.quick },
  { id: 'football', sport: 'football', label: 'Fútbol', desc: 'Solo partidos de fútbol', color: SPORT_COLORS.football },
  { id: 'basketball', sport: 'basketball', label: 'Basket', desc: 'Solo partidos de basketball', color: SPORT_COLORS.basketball },
  { id: 'tennis', sport: 'tennis', label: 'Tenis', desc: 'Solo partidos de tenis', color: SPORT_COLORS.tennis }];


  const tournamentTables = TABLES.filter((t) => t.mode === 'tournament');

  const tablesForCategory = (cat) => [
  { id: cat.id + '-1', entry: 5, players: 8, maxPlayers: 10, prize: 5 * 10 * 0.95, timeLeft: '3h', label: 'Bronce' },
  { id: cat.id + '-2', entry: 10, players: 5, maxPlayers: 10, prize: 10 * 10 * 0.95, timeLeft: '3h', label: 'Plata' },
  { id: cat.id + '-3', entry: 25, players: 3, maxPlayers: 10, prize: 25 * 10 * 0.95, timeLeft: '3h', label: 'Oro' }];


  const handleJoinTable = (cat, mesa) => {
    const table = {
      id: 900 + (Math.random() * 100 | 0), mode: 'basic', category: cat.sport, entry: mesa.entry,
      players: mesa.players, maxPlayers: mesa.maxPlayers, timeLeft: mesa.timeLeft, prize: mesa.prize, level: 1,
      title: 'Partida Rápida — ' + cat.label,
      teams: [],
      objectives: [
      { id: 'o1', text: 'Realiza al menos 3 apuestas', type: 'progress', current: 0, target: 3, points: 100, deadline: '2h' },
      { id: 'o2', text: 'Gana al menos 2 apuestas', type: 'progress', current: 0, target: 2, points: 150, deadline: '1h 30m' }],

      prizeDistribution: { first: 50, second: 30, third: 20 }
    };
    onJoinTable(table);
  };

  const [activeSection, setActiveSection] = React.useState(initialFilter === 'tournament' ? 'tournament' : 'basic');

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const el = sectionRefs.current[sectionId];
    if (!el) return;

    // Find scrollable parent
    let parent = el.parentElement;
    while (parent) {
      const style = window.getComputedStyle(parent);
      const overflowY = style.overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight + 5) break;
      parent = parent.parentElement;
    }
    if (!parent) return;

    // Use getBoundingClientRect for accurate offset in real browser
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    parent.scrollTop = parent.scrollTop + (elRect.top - parentRect.top) - 52;
  };

  // Auto-scroll to tournament section when coming from lobby "Torneo" button
  React.useEffect(() => {
    if (initialFilter === 'tournament') {
      const timer = setTimeout(() => scrollToSection('tournament'), 150);
      return () => clearTimeout(timer);
    }
  }, []);

  // Jump-to tabs — sticky + active highlight
  const JumpTabs = () =>
  <div style={{
    display: 'flex', gap: 6,
    background: C.bg,
    position: 'sticky', top: 0, zIndex: 10, padding: "14px 14px 8px"
  }}>
      {[
    { id: 'basic', label: 'Partida Rápida' },
    { id: 'tournament', label: 'Torneo' },
    { id: 'friends', label: 'Partida con Amigos' }].
    map((m) => {
      const isActive = activeSection === m.id;
      return (
        <button key={m.id} onClick={() => {
          if (m.id === 'friends') {setShowFriendsPanel(true);setActiveSection('friends');return;}
          setShowFriendsPanel(false);
          scrollToSection(m.id);
        }} style={{
          flex: 1, padding: '9px 4px', fontSize: 10, fontWeight: isActive ? 700 : 600, cursor: 'pointer',
          background: isActive ? C.accent : C.card,
          color: isActive ? '#fff' : C.text2,
          border: 'none', borderRadius: 12,
          transition: 'all 0.15s'
        }}>{m.label}</button>);

    })}
    </div>;


  // Rules modal (same as before)
  const RulesModal = () =>
  <React.Fragment>
      <button onClick={() => onRules && onRules()} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%',
      padding: '14px', marginTop: 18, background: 'none', border: 'none', cursor: 'pointer'
    }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="1.8" strokeLinejoin="round"><path d="M4 4H20V20H4V4Z" /><path d="M8 9H16M8 13H13" strokeLinecap="round" /></svg>
        <span style={{ fontSize: 12, color: C.text3, fontWeight: 500 }}>¿Cómo funciona?</span>
      </button>
    </React.Fragment>;


  // ═══════ SECOND LEVEL — category selected, show ticket tiers ═══════
  if (selectedCategory) {
    const cat = categories.find((c) => c.id === selectedCategory);
    const mesas = tablesForCategory(cat);
    return (
      <div style={{ padding: '12px 14px' }}>
        <button onClick={() => setSelectedCategory(null)} style={{
          background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          padding: '0 0 14px', color: C.text2, fontSize: 12, fontWeight: 600
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.text2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          Volver
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: cat.color + '15', border: '1px solid ' + cat.color + '25', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SportIcon sport={cat.sport} size={22} color={cat.color} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text1 }}>Partida Rápida — {cat.label}</div>
            <div style={{ fontSize: 11, color: C.text3, marginTop: 2 }}>Elige tu partida según el ticket de entrada</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mesas.map((mesa) => {
            const spotsLeft = mesa.maxPlayers - mesa.players;
            const fillPct = mesa.players / mesa.maxPlayers * 100;
            return (
              <div key={mesa.id} style={{ background: C.card, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: cat.color + '12', border: '1px solid ' + cat.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <SportIcon sport={cat.sport} size={20} color={cat.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 22, fontWeight: 800, color: C.text1, letterSpacing: '-0.02em' }}>${mesa.entry}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                        <Icon name="clock" size={9} color={C.text3} />
                        <span style={{ fontSize: 10, color: C.text3, fontWeight: 500 }}>{mesa.timeLeft}</span>
                      </div>
                    </div>
                    <button onClick={() => handleJoinTable(cat, mesa)} style={{ padding: '10px 22px', fontSize: 12, fontWeight: 700, background: C.accent, color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer' }}>Entrar</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: C.border + '50', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: fillPct + '%', height: '100%', background: spotsLeft <= 2 ? C.red : C.green, borderRadius: 2, transition: 'width 0.3s' }}></div>
                    </div>
                    <span style={{ fontSize: 9, color: C.text2, fontWeight: 600, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{mesa.players}/{mesa.maxPlayers}</span>
                    <span style={{ fontSize: 9, color: spotsLeft <= 2 ? C.red : C.text3, fontWeight: 600 }}>
                      {spotsLeft <= 2 ? '¡' + spotsLeft + ' lugar' + (spotsLeft > 1 ? 'es' : '') + '!' : spotsLeft + ' libres'}
                    </span>
                  </div>
                </div>
              </div>);

          })}
        </div>
      </div>);

  }

  // ═══════ FRIENDS PANEL — inline create table ═══════
  if (showFriendsPanel) {
    return (
      <div>
        <div style={{
          display: 'flex', gap: 6,
          background: C.bg, position: 'sticky', top: 0, zIndex: 10, padding: "14px"
        }}>
          {[
          { id: 'basic', label: 'Partida Rápida' },
          { id: 'tournament', label: 'Torneo' },
          { id: 'friends', label: 'Partida con Amigos' }].
          map((m) => {
            const isActive = m.id === 'friends';
            return (
              <button key={m.id} onClick={() => {
                if (m.id === 'friends') return;
                setShowFriendsPanel(false);
                setActiveSection(m.id);
                setTimeout(() => scrollToSection(m.id), 80);
              }} style={{
                flex: 1, padding: '9px 4px', fontSize: 10, fontWeight: isActive ? 700 : 600, cursor: 'pointer',
                background: isActive ? C.accent : C.card,
                color: isActive ? '#fff' : C.text2,
                border: 'none', borderRadius: 12, transition: 'all 0.15s'
              }}>{m.label}</button>);

          })}
        </div>
        <CreateTableScreen
          onBack={() => {setShowFriendsPanel(false);setActiveSection('basic');}}
          onRoomCreated={() => {}}
          onStart={(config) => {
            const friendsTable = {
              id: 800 + (Math.random() * 100 | 0),
              mode: 'basic',
              category: config ? config.category : 'free',
              entry: config ? config.entry : 10,
              players: 1,
              maxPlayers: config ? config.maxPlayers : 6,
              timeLeft: config ? config.timeLimit : '3h',
              prize: config ? config.entry * config.maxPlayers * 0.95 : 57,
              level: 1,
              title: 'Partida con Amigos',
              teams: [],
              objectives: [
              { id: 'o1', text: 'Realiza al menos 3 apuestas', type: 'progress', current: 0, target: 3, points: 100, deadline: '2h' }],

              prizeDistribution: { first: 50, second: 30, third: 20 }
            };
            onJoinTable(friendsTable);
          }} />
        
      </div>);

  }

  // ═══════ FIRST LEVEL — all categories + tournaments in one list ═══════
  return (
    <div style={{ padding: '0 0 500px' }}>
      <JumpTabs />

      <div style={{ padding: '0 14px' }}>
        {/* ── Section: Partida Rápida ── */}
        <div ref={(el) => sectionRefs.current['basic'] = el} style={{ padding: "8px 0px 0px" }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <SportIcon sport="quick" size={18} color={SPORT_COLORS.quick} />
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>Partida Rápida</span>
            <span style={{ fontSize: 10, color: C.text3, fontWeight: 500 }}>3h • hasta 10 jugadores</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {categories.map((cat) =>
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{
              background: C.card, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14,
              padding: 0, cursor: 'pointer', textAlign: 'left', overflow: 'hidden', width: '100%'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px' }}>
                  <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: cat.color + '15', border: '1px solid ' + cat.color + '20',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <SportIcon sport={cat.sport} size={20} color={cat.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{cat.label}</span>
                      <span style={{ fontSize: 8, fontWeight: 700, color: cat.color, padding: '2px 6px', background: cat.color + '18', borderRadius: 30, textTransform: 'uppercase' }}>Partida Rápida</span>
                    </div>
                    <div style={{ fontSize: 10, color: C.text3, marginTop: 2 }}>{cat.desc}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, color: C.text3 }}>$5–$25</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* ── Section: Torneo ── */}
        <div ref={(el) => sectionRefs.current['tournament'] = el} style={{ padding: "8px 0px 0px" }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <img src="assets/torneos.svg" width="16" height="16" />
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>Torneos</span>
            <span style={{ fontSize: 10, color: C.text3, fontWeight: 500 }}>competencias especiales</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tournamentTables.map((t) => {
              const tournamentIcons = { champions: 'assets/champions-2.svg', worldcup: 'assets/mundial.svg' };
              const iconSrc = tournamentIcons[t.tournamentLogo] || null;
              const tournamentBgs = { champions: '#021549', worldcup: '#090909' };
              const tournamentBg = tournamentBgs[t.tournamentLogo] || C.yellow + '15';
              return (
                <button key={t.id} onClick={() => onSelectTournament ? onSelectTournament(t) : onJoinTable(t)} style={{
                  background: C.card, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14,
                  padding: 0, cursor: 'pointer', textAlign: 'left', overflow: 'hidden', width: '100%'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px' }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                      background: tournamentBg, border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      {iconSrc ?
                      <img src={iconSrc} width="24" height="24" style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} /> :

                      <Icon name="trophy" size={20} color={C.yellow} />
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.text1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</span>
                        <span style={{ fontSize: 8, fontWeight: 700, color: C.yellow, padding: '2px 6px', background: C.yellow + '18', borderRadius: 30, textTransform: 'uppercase', flexShrink: 0 }}>Torneo</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Icon name="clock" size={9} color={C.text3} />
                          <span style={{ fontSize: 9, color: C.text3 }}>{t.timeLeft}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Icon name="users" size={9} color={C.text3} />
                          <span style={{ fontSize: 9, color: C.text3 }}>{t.players.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Icon name="gift" size={9} color={C.green} />
                          <span style={{ fontSize: 9, color: C.green, fontWeight: 600 }}>${t.prize.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                      <span style={{ fontSize: 10, color: C.text3 }}>${t.entry}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                    </div>
                  </div>
                </button>);

            })}
          </div>
        </div>

        <RulesModal />
      </div>
    </div>);


}
function ProfileScreen() {
  const p = USER_PROFILE;
  const stats = [
  { label: 'Victorias', value: p.wins, color: C.green },
  { label: 'Derrotas', value: p.losses, color: C.red },
  { label: 'Win Rate', value: p.winRate + '%', color: C.text1 },
  { label: 'Ganancias', value: p.totalEarnings.toFixed(0), color: C.green }];


  return (
    <div style={{ padding: '20px 14px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 22 }}>
        <div style={{
          width: 68, height: 68, borderRadius: 16, background: p.avatar,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: '#fff', fontWeight: 700, marginBottom: 10
        }}>{p.name.slice(0, 2).toUpperCase()}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: C.text1 }}>{p.name}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          <span style={{ padding: '3px 10px', fontSize: 10, fontWeight: 700, background: `${C.yellow}18`, color: C.yellow, borderRadius: "16px" }}>{p.rank}</span>
          <span style={{ padding: '3px 10px', fontSize: 10, fontWeight: 700, background: C.card, color: C.text2, borderRadius: "16px" }}>Nivel {p.level}</span>
        </div>
      </div>

      <div style={{ padding: '14px', background: C.card, textAlign: 'center', marginBottom: 16, borderRadius: "16px" }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><Icon name="wallet" size={12} color={C.text3} /><span style={{ fontSize: 10, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Balance</span></div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.text1, margin: '4px 0 10px' }}>${p.balance.toFixed(2)}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button style={{ padding: '8px 20px', fontSize: 12, fontWeight: 700, background: C.accent, color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, borderRadius: "16px" }}><Icon name="deposit" size={13} color="#fff" />Depositar</button>
          <button style={{ padding: '8px 20px', fontSize: 12, fontWeight: 700, background: C.card, color: C.text1, border: `1px solid ${C.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, borderRadius: "16px" }}><Icon name="withdraw" size={13} color={C.text1} />Retirar</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {stats.map((s) =>
        <div key={s.label} style={{ padding: '12px', background: C.card, textAlign: 'center', borderRadius: "16px" }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 3 }}><Icon name={s.label === 'Victorias' ? 'trophy' : s.label === 'Derrotas' ? 'arrowDown' : s.label === 'Win Rate' ? 'percent' : 'chart'} size={11} color={s.color} /><span style={{ fontSize: 10, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</span></div>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}><Icon name="clock" size={14} color={C.text2} /><span style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>Historial Reciente</span></div>
        {[{ r: '1st', g: 'Rápida $10', c: C.green }, { r: '5th', g: 'Torneo Libre', c: C.text3 }, { r: '2nd', g: 'Rápida $25', c: C.green }].map((h, i) =>
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 10px', borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 12, color: C.text1 }}>{h.g}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: h.c }}>{h.r}</span>
          </div>
        )}
      </div>
    </div>);

}

function RulesScreen() {
  const modeIcons = { basic: 'quick', tournament: 'free', home: 'friends' };
  return (
    <div style={{ padding: '0 14px' }}>
      <div style={{ fontSize: 12, color: C.text2, marginBottom: 14, lineHeight: 1.5 }}>
        Aprende cómo funciona cada modalidad de juego.
      </div>

      <div style={{ padding: '14px', background: C.card, marginBottom: 12, borderRadius: "16px", margin: "0px 0px 12px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text1, marginBottom: 10 }}>¿Cómo funciona?</div>
        {[
        'Elige una modalidad y entra a una partida pagando la entrada en USD.',,
        'Haz apuestas en partidos en vivo usando las cuotas disponibles.',
        'Cada apuesta acertada suma fichas según la cuota. Quien más fichas acumule, gana.',
        'Los ganadores se llevan el pozo menos el 5% de comisión.'].
        map((text, i) =>
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
            <div style={{
            width: 22, height: 22, borderRadius: 6, background: `${C.accent}20`,
            color: C.accentLight, fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>{i + 1}</div>
            <span style={{ fontSize: 12, color: C.text2, lineHeight: 1.4 }}>{text}</span>
          </div>
        )}
      </div>

      {GAME_MODES.map((mode) =>
      <div key={mode.id} style={{ padding: '14px', background: C.card, marginBottom: 8, borderRadius: "16px", margin: "0px 0px 12px" }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, background: C.bgLight, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: "12px" }}>
              <SportIcon sport={modeIcons[mode.id]} size={20} color={C.accentLight} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>{mode.name}</div>
              <div style={{ fontSize: 11, color: C.text3 }}>{mode.desc}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {[{ l: 'Apuestas mín.', v: mode.minBets }, { l: 'Apuestas máx.', v: mode.maxBets }, { l: 'Tiempo límite', v: mode.timeLimit }, { l: 'Objetivo', v: mode.target }].map((s) =>
          <div key={s.l} style={{ padding: '7px 9px', background: C.bgLight, borderRadius: "16px" }}>
                <div style={{ fontSize: 9, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text1 }}>{s.v}</div>
              </div>
          )}
          </div>
          {mode.id === 'basic' &&
        <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.text3, marginBottom: 5, textTransform: 'uppercase' }}>Categorías:</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(SPORTS).map(([key, s]) =>
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', background: C.bgLight, borderRadius: "8px" }}>
                    <SportIcon sport={s.sport || key} size={14} color={s.color} />
                    <span style={{ fontSize: 10, color: C.text2, fontWeight: 500 }}>{s.name}</span>
                  </div>
            )}
              </div>
            </div>
        }
          {mode.id === 'home' &&
        <div style={{ marginTop: 8, padding: '8px 10px', background: `${C.accent}10`, border: `1px solid ${C.accent}25`, borderRadius: "16px" }}>
              <div style={{ fontSize: 11, color: C.accentLight, fontWeight: 500 }}>Configura tu propia partida privada con reglas personalizadas e invita a tus amigos.</div>
            </div>
        }
        </div>
      )}

    </div>);

}

window.ResultsScreen = ResultsScreen;
window.TablesScreen = TablesScreen;
window.ProfileScreen = ProfileScreen;
window.RulesScreen = RulesScreen;