
// Match Selection View — Select which match to bet on inside a game table
// Shows matches filtered by sport category, with search, sport pills, "En Vivo" + "Próximos" sections

function MatchSelectionView({ tableSport, onSelectMatch }) {
  const [view, setView] = React.useState('main'); // 'main' | 'allLive' | 'allFeatured'
  const [search, setSearch] = React.useState('');
  const [sportFilter, setSportFilter] = React.useState('all');

  const isLibre = !tableSport || tableSport === 'free' || tableSport === 'quick';

  const filterBySport = (matches) => {
    if (isLibre) {
      if (sportFilter === 'all') return matches;
      return matches.filter((m) => m.sport === sportFilter);
    }
    return matches.filter((m) => m.sport === tableSport);
  };

  const applySearch = (matches) => {
    if (!search) return matches;
    const s = search.toLowerCase();
    return matches.filter((m) =>
    m.home.toLowerCase().includes(s) ||
    m.away.toLowerCase().includes(s) ||
    m.league.toLowerCase().includes(s)
    );
  };

  const liveMatches = filterBySport(LIVE_MATCHES);
  const featuredMatches = filterBySport(FEATURED_MATCHES);

  const sportPills = [
  { id: 'all', label: 'Todo' },
  { id: 'football', label: 'Fútbol', sport: 'football' },
  { id: 'basketball', label: 'Basket', sport: 'basketball' },
  { id: 'tennis', label: 'Tenis', sport: 'tennis' }];


  // Sport filter pills component
  const SportPills = () => {
    if (!isLibre) return null;
    return (
      <div className="hide-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 12, flexShrink: 0 }}>
        {sportPills.map((s) =>
        <button key={s.id} onClick={() => setSportFilter(s.id)} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '7px 12px', borderRadius: 20, cursor: 'pointer',
          background: sportFilter === s.id ? C.accent : C.card,
          border: 'none', whiteSpace: 'nowrap', flexShrink: 0
        }}>
            {s.sport && <SportIcon sport={s.sport} size={14} color={sportFilter === s.id ? '#fff' : C.text3} />}
            <span style={{ fontSize: 11, fontWeight: 600, color: sportFilter === s.id ? '#fff' : C.text3 }}>{s.label}</span>
          </button>
        )}
      </div>);

  };

  // Section header with "Ver todos"
  const SectionHead = ({ title, count, isLive, onViewAll }) =>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {isLive && <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.red, display: 'inline-block', animation: 'blink 1.5s infinite' }}></span>}
        <span style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>{title}</span>
        <span style={{ fontSize: 10, color: C.text3, fontWeight: 500 }}>({count})</span>
      </div>
      {count > 2 &&
    <button onClick={onViewAll} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: 11, fontWeight: 600, color: C.text2, padding: '4px 0'
    }}>Ver todos ›</button>
    }
    </div>;


  // Back button
  const BackBtn = ({ onClick }) =>
  <button onClick={onClick} style={{
    background: 'none', border: 'none', cursor: 'pointer', display: 'flex',
    alignItems: 'center', gap: 6, padding: '0 0 12px', color: C.text2, fontSize: 12, fontWeight: 600
  }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.text2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      Volver
    </button>;


  // Compact match card for the selection list
  const SelectableMatchCard = ({ match, isLive }) => {
    const isFootball = match.sport === 'football';
    return (
      <button onClick={() => onSelectMatch(match)} style={{
        width: '100%', background: C.card, borderRadius: 14, padding: '12px 14px',
        border: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8
      }}>
        {/* League + badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <SportIcon sport={match.sport} size={14} color={SPORT_COLORS[match.sport] || C.text3} />
            <span style={{ fontSize: 10, color: C.text2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
              {match.leagueFull || match.league}
            </span>
          </div>
          {isLive ?
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.red, animation: 'blink 1.5s infinite' }}></span>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.red }}>{match.minute}</span>
            </div> :

          <span style={{ fontSize: 9, color: C.text3, fontWeight: 500 }}>{match.time} • {match.date}</span>
          }
        </div>

        {/* Teams */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TeamCrest name={match.home} color={match.homeColor} size={20} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.text1, flex: 1 }}>{match.home}</span>
            {isLive && <span style={{ fontSize: 14, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', minWidth: 18, textAlign: 'right' }}>
              {match.score.split(' - ')[0] || match.score.split(' ')[0]}
            </span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TeamCrest name={match.away} color={match.awayColor} size={20} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.text1, flex: 1 }}>{match.away}</span>
            {isLive && <span style={{ fontSize: 14, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', minWidth: 18, textAlign: 'right' }}>
              {match.score.split(' - ')[1] || match.score.split(' ')[2] || ''}
            </span>}
          </div>
        </div>

        {/* Quick odds preview */}
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ flex: 1, padding: '5px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
            <span style={{ fontSize: 8, color: C.text3 }}>1 </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{match.odds.home.toFixed(2)}</span>
          </div>
          {match.odds.draw != null &&
          <div style={{ flex: 1, padding: '5px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
              <span style={{ fontSize: 8, color: C.text3 }}>x </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{match.odds.draw.toFixed(1)}</span>
            </div>
          }
          <div style={{ flex: 1, padding: '5px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
            <span style={{ fontSize: 8, color: C.text3 }}>2 </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{match.odds.away.toFixed(2)}</span>
          </div>
          {match.markets &&
          <div style={{ padding: '5px 8px', textAlign: 'center', background: C.bgLight, borderRadius: "16px", color: "rgb(255, 255, 255)" }}>
              <span style={{ ...{ fontSize: 10, fontWeight: 700, color: C.accentLight }, color: "rgb(255, 255, 255)" }}>+{match.markets}</span>
            </div>
          }
        </div>
      </button>);

  };

  // ---- "VER TODOS" views ----
  if (view === 'allLive') {
    const filtered = applySearch(liveMatches);
    return (
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <BackBtn onClick={() => {setView('main');setSearch('');}} />
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar partido en vivo..."
          style={{
            width: '100%', padding: '10px 12px 10px 32px', background: C.card,
            border: `1px solid ${C.border}`, borderRadius: 12, color: C.text1,
            fontSize: 12, outline: 'none', fontFamily: 'inherit'
          }} />
          <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <Icon name="search" size={14} color={C.text3} />
          </div>
        </div>
        <SportPills />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 ?
          <div style={{ textAlign: 'center', padding: '40px 20px', color: C.text3, fontSize: 12 }}>No hay partidos en vivo</div> :

          filtered.map((m) => <SelectableMatchCard key={m.id} match={m} isLive={true} />)
          }
        </div>
      </div>);

  }

  if (view === 'allFeatured') {
    const filtered = applySearch(featuredMatches);
    return (
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <BackBtn onClick={() => {setView('main');setSearch('');}} />
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar partido próximo..."
          style={{
            width: '100%', padding: '10px 12px 10px 32px', background: C.card,
            border: `1px solid ${C.border}`, borderRadius: 12, color: C.text1,
            fontSize: 12, outline: 'none', fontFamily: 'inherit'
          }} />
          <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <Icon name="search" size={14} color={C.text3} />
          </div>
        </div>
        <SportPills />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 ?
          <div style={{ textAlign: 'center', padding: '40px 20px', color: C.text3, fontSize: 12 }}>No hay partidos próximos</div> :

          filtered.map((m) => <SelectableMatchCard key={m.id} match={m} isLive={false} />)
          }
        </div>
      </div>);

  }

  // ---- MAIN VIEW ----
  return (
    <div style={{ padding: "0px 12px 10px" }}>
      {/* Sport header */}
      {!isLibre &&
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '6px 10px', background: C.card, borderRadius: 12 }}>
          <SportIcon sport={tableSport} size={20} color={SPORT_COLORS[tableSport]} />
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text1 }}>
            Partidos de {SPORTS[tableSport]?.name || tableSport}
          </span>
        </div>
      }

      <SportPills />

      {/* Subtitle */}
      <div style={{ fontSize: 11, color: C.text3, marginBottom: 12, fontWeight: 500 }}>
        Elegí un partido para apostar
      </div>

      {/* En Vivo section */}
      {liveMatches.length > 0 &&
      <React.Fragment>
          <SectionHead title="En Vivo" count={liveMatches.length} isLive={true}
        onViewAll={() => setView('allLive')} />
          {liveMatches.slice(0, 2).map((m) =>
        <SelectableMatchCard key={m.id} match={m} isLive={true} />
        )}
        </React.Fragment>
      }

      {/* Próximos section */}
      {featuredMatches.length > 0 &&
      <React.Fragment>
          <SectionHead title="Próximos" count={featuredMatches.length} isLive={false}
        onViewAll={() => setView('allFeatured')} />
          {featuredMatches.slice(0, 2).map((m) =>
        <SelectableMatchCard key={m.id} match={m} isLive={false} />
        )}
        </React.Fragment>
      }

      {liveMatches.length === 0 && featuredMatches.length === 0 &&
      <div style={{ textAlign: 'center', padding: '40px 20px', color: C.text3, fontSize: 12 }}>
          No hay partidos disponibles en esta categoría
        </div>
      }

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
.hide-scrollbar::-webkit-scrollbar{display:none;}`}</style>
    </div>);

}

// Selected match header — shown above betting markets
function SelectedMatchHeader({ match, onBack }) {
  const isLive = !!match.score;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
      background: C.card, borderBottom: `1px solid ${C.border}`, flexShrink: 0
    }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 2,
        display: 'flex', alignItems: 'center', flexShrink: 0
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.text2} strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <SportIcon sport={match.sport} size={12} color={SPORT_COLORS[match.sport] || C.text3} />
          <span style={{ fontSize: 9, color: C.text3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {match.leagueFull || match.league}
          </span>
          {isLive &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.red, animation: 'blink 1.5s infinite' }}></span>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.red }}>{match.minute}</span>
            </div>
          }
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flex: 1, minWidth: 0 }}>
            <TeamCrest name={match.home} color={match.homeColor} size={18} />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.text1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{match.home}</span>
          </div>
          {isLive ?
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
              {match.score}
            </span> :

          <span style={{ fontSize: 10, color: C.text3, flexShrink: 0 }}>vs</span>
          }
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, flex: 1, minWidth: 0, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: C.text1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{match.away}</span>
            <TeamCrest name={match.away} color={match.awayColor} size={18} />
          </div>
        </div>
      </div>
    </div>);

}

window.MatchSelectionView = MatchSelectionView;
window.SelectedMatchHeader = SelectedMatchHeader;