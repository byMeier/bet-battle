
// 1win-style match cards — dark theme, compact odds, league header

// Signal icon for live indicator
const SignalIcon = ({ size = 12, color = '#fff' }) =>
<svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="12" r="2" fill={color} />
    <path d="M4.5 9.5C5.5 8.2 6.7 7.5 8 7.5s2.5.7 3.5 2" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
    <path d="M2 7C3.8 4.8 5.8 3.5 8 3.5S12.2 4.8 14 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
  </svg>;


// Live match card (1win style, dark)
function LiveMatchCard({ match, onTap }) {
  const halfLabel = match.sport === 'football' ? parseInt(match.minute) > 45 ? '2da Mitad' : '1ra Mitad' :
  match.sport === 'basketball' ? match.minute : match.sport === 'tennis' ? match.minute : '';
  const liveText = match.sport === 'football' ? `${halfLabel} ${match.minute}` : `${match.minute}`;

  return (
    <div onClick={() => onTap && onTap(match)} style={{
      background: C.card, borderRadius: 16,
      cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: "14px 16px", gap: "0px", justifyContent: "flex-start", letterSpacing: "0px"
    }}>
      {/* League header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <SportIcon sport={match.sport} size={14} color={C.text3} />
        <span style={{ fontSize: 11, color: C.text2, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{match.league}</span>
      </div>

      {/* Live badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <SignalIcon size={12} color={C.red} />
          <span style={{ fontSize: 10, fontWeight: 700, color: C.red }}>{liveText}</span>
        </div>
      </div>

      {/* Teams with scores */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TeamCrest name={match.home} color={match.homeColor} size={22} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text1, flex: 1 }}>{match.home}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', minWidth: 20, textAlign: 'right' }}>
            {match.score.split(' - ')[0] || match.score.split(' ')[0]}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TeamCrest name={match.away} color={match.awayColor} size={22} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text1, flex: 1 }}>{match.away}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', minWidth: 20, textAlign: 'right' }}>
            {match.score.split(' - ')[1] || match.score.split(' ')[2] || ''}
          </span>
        </div>
      </div>

      {/* Odds row — separated pills */}
      <div style={{ margin: "8px 0px 0px" }}>
        <div style={{ fontSize: 9, color: C.text3, marginBottom: 4 }}>Full time result</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
            <span style={{ fontSize: 9, color: C.text3 }}>1</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginLeft: 6 }}>{match.odds.home.toFixed(2)}</span>
          </div>
          {match.odds.draw != null &&
          <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
              <span style={{ fontSize: 9, color: C.text3 }}>x</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginLeft: 6 }}>{match.odds.draw.toFixed(1)}</span>
            </div>
          }
          <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
            <span style={{ fontSize: 9, color: C.text3 }}>2</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginLeft: 6 }}>{match.odds.away.toFixed(2)}</span>
          </div>
          {match.markets &&
          <div style={{ padding: '7px 10px', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
              <span style={{ ...{ fontSize: 11, fontWeight: 700, color: C.accentLight }, color: "rgb(255, 255, 255)" }}>+{match.markets}</span>
            </div>
          }
        </div>
      </div>
    </div>);

}

// Featured/upcoming match card (1win style, dark)
function FeaturedMatchCard({ match, onTap }) {
  return (
    <div onClick={() => onTap && onTap(match)} style={{
      background: C.card, borderRadius: 16, padding: '14px 16px',
      cursor: 'pointer', display: 'flex', flexDirection: 'column'
    }}>
      {/* League header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <SportIcon sport={match.sport} size={14} color={C.text3} />
        <span style={{ fontSize: 11, color: C.text2, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{match.league}</span>
      </div>

      {/* Time + date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <img src="assets/fechas.svg" width={11} height={11} style={{ objectFit: 'contain', opacity: 0.5 }} />
        <span style={{ fontSize: 10, color: C.text3 }}>{match.time} • {match.date}</span>
      </div>

      {/* Teams */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TeamCrest name={match.home} color={match.homeColor} size={22} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>{match.home}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TeamCrest name={match.away} color={match.awayColor} size={22} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>{match.away}</span>
        </div>
      </div>

      {/* Odds row */}
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 9, color: C.text3, marginBottom: 4 }}>Full time result</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
            <span style={{ fontSize: 9, color: C.text3 }}>1</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginLeft: 6 }}>{match.odds.home.toFixed(2)}</span>
          </div>
          {match.odds.draw != null &&
          <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
              <span style={{ fontSize: 9, color: C.text3 }}>x</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginLeft: 6 }}>{match.odds.draw.toFixed(1)}</span>
            </div>
          }
          <div style={{ flex: 1, padding: '7px 0', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
            <span style={{ fontSize: 9, color: C.text3 }}>2</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginLeft: 6 }}>{match.odds.away.toFixed(2)}</span>
          </div>
          {match.markets &&
          <div style={{ padding: '7px 10px', textAlign: 'center', background: C.bgLight, borderRadius: 8 }}>
              <span style={{ ...{ fontSize: 11, fontWeight: 700, color: C.accentLight }, color: "rgb(255, 255, 255)" }}>+{match.markets}</span>
            </div>
          }
        </div>
      </div>
    </div>);

}

// Full-screen: All Live Matches with search + filters
function AllLiveScreen({ onBetMatch, onBack }) {
  const [search, setSearch] = React.useState('');
  const [sportFilter, setSportFilter] = React.useState('all');

  const sports = [
  { id: 'all', label: 'Todo' },
  { id: 'football', label: 'Fútbol', sport: 'football' },
  { id: 'basketball', label: 'Basket', sport: 'basketball' },
  { id: 'tennis', label: 'Tenis', sport: 'tennis' }];


  let filtered = LIVE_MATCHES;
  if (sportFilter !== 'all') filtered = filtered.filter((m) => m.sport === sportFilter);
  if (search) filtered = filtered.filter((m) =>
  m.home.toLowerCase().includes(search.toLowerCase()) ||
  m.away.toLowerCase().includes(search.toLowerCase()) ||
  m.league.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '12px 14px' }}>
      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <Icon name="search" size={14} color={C.text3} />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar partido en vivo..."
          style={{
            width: '100%', background: C.card,
            border: `1px solid ${C.border}`, borderRadius: 12, color: C.text1,
            fontSize: 12, outline: 'none', fontFamily: 'inherit',
            position: 'relative', padding: "10px 12px"
          }} />
        
        <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <Icon name="search" size={14} color={C.text3} />
        </div>
      </div>

      {/* Sport filters */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 14, margin: "0px 0px 10px" }}>
        {sports.map((s) =>
        <button key={s.id} onClick={() => setSportFilter(s.id)} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '7px 12px', borderRadius: 20, cursor: 'pointer',
          background: sportFilter === s.id ? C.accent : C.card,
          border: 'none', whiteSpace: 'nowrap'
        }}>
            {s.id !== 'all' && <SportIcon sport={s.sport} size={14} color={sportFilter === s.id ? '#fff' : C.text3} />}
            <span style={{ fontSize: 11, fontWeight: 600, color: sportFilter === s.id ? '#fff' : C.text3 }}>{s.label}</span>
          </button>
        )}
      </div>

      {/* Match list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 ?
        <div style={{ textAlign: 'center', padding: '40px 20px', color: C.text3, fontSize: 13 }}>No hay partidos en vivo en esta categoría</div> :

        filtered.map((match) =>
        <LiveMatchCard key={match.id} match={match} onTap={() => onBetMatch && onBetMatch(match)} />
        )
        }
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>);

}

// Full-screen: All Featured/Upcoming Matches with search + filters
function AllFeaturedScreen({ onBetMatch }) {
  const [search, setSearch] = React.useState('');
  const [sportFilter, setSportFilter] = React.useState('all');

  const sports = [
  { id: 'all', label: 'Todo' },
  { id: 'football', label: 'Fútbol', sport: 'football' },
  { id: 'basketball', label: 'Basket', sport: 'basketball' },
  { id: 'tennis', label: 'Tenis', sport: 'tennis' }];



  let filtered = FEATURED_MATCHES;
  if (sportFilter !== 'all') filtered = filtered.filter((m) => m.sport === sportFilter);
  if (search) filtered = filtered.filter((m) =>
  m.home.toLowerCase().includes(search.toLowerCase()) ||
  m.away.toLowerCase().includes(search.toLowerCase()) ||
  m.league.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '12px 14px' }}>
      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar partido..."
          style={{
            width: '100%', background: C.card,
            border: `1px solid ${C.border}`, borderRadius: 12, color: C.text1,
            fontSize: 12, outline: 'none', fontFamily: 'inherit', padding: "10px 12px"
          }} />
        
        <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <Icon name="search" size={14} color={C.text3} />
        </div>
      </div>

      {/* Sport filters */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 14 }}>
        {sports.map((s) =>
        <button key={s.id} onClick={() => setSportFilter(s.id)} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '7px 12px', borderRadius: 20, cursor: 'pointer',
          background: sportFilter === s.id ? C.accent : C.card,
          border: 'none', whiteSpace: 'nowrap'
        }}>
            {s.id !== 'all' && <SportIcon sport={s.sport} size={14} color={sportFilter === s.id ? '#fff' : C.text3} />}
            <span style={{ fontSize: 11, fontWeight: 600, color: sportFilter === s.id ? '#fff' : C.text3 }}>{s.label}</span>
          </button>
        )}
      </div>

      {/* Match list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 ?
        <div style={{ textAlign: 'center', padding: '40px 20px', color: C.text3, fontSize: 13 }}>No hay partidos destacados</div> :

        filtered.map((match) =>
        <FeaturedMatchCard key={match.id} match={match} onTap={() => onBetMatch && onBetMatch(match)} />
        )
        }
      </div>
    </div>);

}

window.LiveMatchCard = LiveMatchCard;
window.FeaturedMatchCard = FeaturedMatchCard;
window.AllLiveScreen = AllLiveScreen;
window.AllFeaturedScreen = AllFeaturedScreen;
window.SignalIcon = SignalIcon;