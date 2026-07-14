
// Lobby / Home screen — En Vivo badge, icons, illustrated mode cards

function LobbyScreen({ onJoinTable, onSelectMode, onProfile, myTableIds = [], onViewMyTables, onResumeTable, onBetMatch, findTable, onBannerTap }) {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState('sports');

  const filters = [
  { id: 'all', label: 'Todo', sport: 'free' },
  { id: 'football', label: 'Fútbol', sport: 'football' },
  { id: 'basketball', label: 'Basket', sport: 'basketball' },
  { id: 'tennis', label: 'Tenis', sport: 'tennis' },
  { id: 'baseball', label: 'Baseball', sport: 'baseball' },
  { id: 'hockey', label: 'Hockey', sport: 'hockey' },
  { id: 'esports', label: 'E-Sports', sport: 'esports' },
  { id: 'rugby', label: 'Rugby', sport: 'rugby' },
  { id: 'boxing', label: 'Boxeo', sport: 'boxing' },
  { id: 'golf', label: 'Golf', sport: 'golf' }];


  const filteredMatches = activeFilter === 'all' ?
  LIVE_MATCHES : LIVE_MATCHES.filter((m) => m.sport === activeFilter);

  return (
    <div style={{ padding: '4px 0 16px' }}>
      {/* Promo banners — auto-scrolling carousel */}
      {(() => {
        const banners = [
        { id: 1, img: 'assets/batalla-opt.png', action: 'play' },
        { id: 2, img: 'assets/worldcup-opt.png', action: 'worldcup' },
        { id: 3, img: 'assets/champions-opt.png', action: 'champions' },
        { id: 4, img: 'assets/amigos-opt.png', action: 'friends' }];

        const [bannerIdx, setBannerIdx] = React.useState(0);
        const total = banners.length;
        const touchRef = React.useRef({ startX: 0, startY: 0, swiping: false });
        const autoTimerRef = React.useRef(null);

        // Auto-scroll, resets on swipe
        const resetAutoTimer = () => {
          if (autoTimerRef.current) clearInterval(autoTimerRef.current);
          autoTimerRef.current = setInterval(() => {
            setBannerIdx((prev) => (prev + 1) % total);
          }, 4000);
        };

        React.useEffect(() => {
          resetAutoTimer();
          return () => { if (autoTimerRef.current) clearInterval(autoTimerRef.current); };
        }, [total]);

        const onTouchStart = (e) => {
          const t = e.touches[0];
          touchRef.current = { startX: t.clientX, startY: t.clientY, swiping: true };
        };
        const onTouchEnd = (e) => {
          if (!touchRef.current.swiping) return;
          const dx = e.changedTouches[0].clientX - touchRef.current.startX;
          const dy = e.changedTouches[0].clientY - touchRef.current.startY;
          touchRef.current.swiping = false;
          if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) setBannerIdx((prev) => Math.min(prev + 1, total - 1));
            else setBannerIdx((prev) => Math.max(prev - 1, 0));
            resetAutoTimer();
          } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
            // Tap — trigger banner action
            const banner = banners[bannerIdx];
            if (banner && onBannerTap) onBannerTap(banner.action);
          }
        };

        const onBannerClick = () => {
          if (touchRef.current.didSwipe) return;
          const banner = banners[bannerIdx];
          if (banner && onBannerTap) onBannerTap(banner.action);
        };

        const onMouseDown = (e) => {
          const sx = e.clientX;
          touchRef.current = { startX: sx, startY: e.clientY, swiping: true, didSwipe: false };
          const onMouseMove = (ev) => {
            // prevent text selection while dragging
            ev.preventDefault();
          };
          const onMouseUp = (ev) => {
            const dx = ev.clientX - sx;
            const dy = ev.clientY - touchRef.current.startY;
            if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
              touchRef.current.didSwipe = true;
              if (dx < 0) setBannerIdx((prev) => Math.min(prev + 1, total - 1));
              else setBannerIdx((prev) => Math.max(prev - 1, 0));
              resetAutoTimer();
            } else {
              touchRef.current.didSwipe = false;
            }
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        };

        return (
          <div style={{ padding: '8px 14px 0', margin: "6px 0px 0px", borderStyle: "solid", borderWidth: "0px" }}>
            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onClick={onBannerClick}
              style={{
              position: 'relative', width: '100%', height: 120,
              borderRadius: 16, overflow: 'hidden', background: '#171c1f',
              border: '1px solid rgba(255,255,255,0.10)',
              touchAction: 'pan-y', cursor: 'pointer'
            }}>
              {/* Slides */}
              <div style={{
                display: 'flex', width: `${total * 100}%`, height: '100%',
                transform: `translateX(-${bannerIdx * (100 / total)}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}>
                {banners.map((b) =>
                <div key={b.id} style={{
                  width: `${100 / total}%`, height: '100%',
                  flexShrink: 0,
                  overflow: 'hidden'
                }}>
                    <img src={b.img} alt="" style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      display: 'block'
                    }} />
                  </div>
                )}
              </div>
              {/* Dots indicator */}
              <div style={{
                position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
                display: 'flex', gap: 5, zIndex: 10
              }}>
                {banners.map((b, i) =>
                <div key={b.id} onClick={(e) => { e.stopPropagation(); setBannerIdx(i); resetAutoTimer(); }} style={{
                  width: i === bannerIdx ? 16 : 6, height: 6, borderRadius: 3,
                  background: i === bannerIdx ? '#fff' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s', cursor: 'pointer'
                }}></div>
                )}
              </div>
            </div>
          </div>);


      })()}

      {/* Game Modes — illustrated cards */}
      <div style={{ padding: "14px 14px 0px" }}>
        <div className="hide-scrollbar" style={{ display: 'flex', overflowX: 'auto', paddingBottom: 4, padding: "0px 14px", gap: "10px", height: "160px", margin: "0px -14px", WebkitOverflowScrolling: 'touch' }}>
          {/* Game mode cards — Figma style with bg images */}
          {/* Partida Rápida */}
          <button onClick={() => onSelectMode('basic')} style={{
            flex: '0 0 auto', width: 170, height: 140, padding: 0,
            background: '#111', border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 16, cursor: 'pointer', textAlign: 'left', overflow: 'hidden',
            position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/sports-bg-opt.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 16 }}></div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 1 }}></div>
            <div style={{ ...{ position: 'absolute', top: 8, right: 8, zIndex: 2, fontSize: 9, fontWeight: 700, color: C.green, WebkitBackdropFilter: 'blur(15px)', backdropFilter: 'blur(15px)', padding: '3px 8px', borderRadius: 8, background: `${C.green}30` }, background: "rgba(38, 113, 74, 0.745)" }}>3h</div>
            <div style={{ position: 'relative', zIndex: 2, padding: '0 12px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Partida Rápida</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 2, lineHeight: 1.3 }}>Partida rápida, hasta 3 horas</div>
            </div>
          </button>
          {/* Torneo */}
          <button onClick={() => onSelectMode('tournament')} style={{
            flex: '0 0 auto', width: 170, height: 140, padding: 0,
            background: '#111', border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 16, cursor: 'pointer', textAlign: 'left', overflow: 'hidden',
            position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/mode-tournament-opt.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 16 }}></div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 1 }}></div>
            <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, fontSize: 9, fontWeight: 700, color: C.yellow, WebkitBackdropFilter: 'blur(15px)', backdropFilter: 'blur(15px)', padding: '3px 8px', borderRadius: 8, background: `${C.yellow}30` }}>48h</div>
            <div style={{ position: 'relative', zIndex: 2, padding: '0 12px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Torneo</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 2, lineHeight: 1.3 }}>Competencias especiales</div>
            </div>
          </button>
          {/* Partida con Amigos */}
          <button onClick={() => onSelectMode('home')} style={{
            flex: '0 0 auto', width: 170, height: 140, padding: 0,
            background: '#111', border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 16, cursor: 'pointer', textAlign: 'left', overflow: 'hidden',
            position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(assets/mode-friends-opt.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 16 }}></div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 16, background: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 1 }}></div>
            <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, fontSize: 9, fontWeight: 700, color: '#fff', WebkitBackdropFilter: 'blur(15px)', backdropFilter: 'blur(15px)', padding: '3px 8px', borderRadius: 8, background: 'rgba(255,255,255,0.20)' }}>∞</div>
            <div style={{ position: 'relative', zIndex: 2, padding: '0 12px 12px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Partida con Amigos</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.8)', marginTop: 2, lineHeight: 1.3 }}>Crea tu partida privada</div>
            </div>
          </button>
        </div>
      </div>

      {/* Mis partidas — only tables user has joined and are live */}
      {(() => {
        const lookupFn = findTable || ((id) => TABLES.find((t) => t.id === id));
        const myTables = myTableIds.map((id) => lookupFn(id)).filter(Boolean);
        if (myTables.length === 0) return null;
        return (
          <div style={{ padding: "0px 14px 20.3999px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text1, letterSpacing: '0.01em' }}>Partidas en curso</span>
              <span onClick={onViewMyTables} style={{ ...{ fontSize: 11, color: C.text2, fontWeight: 600, cursor: 'pointer' }, color: "rgba(255, 255, 255, 0.804)" }}>Ver todos ›</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {myTables.slice(0, 2).map((table) =>
              <TableCard key={table.id} table={table} isMyTable={true} onJoin={() => onResumeTable(table)} />
              )}
            </div>
          </div>);

      })()}

      {/* — Partidos en Vivo — horizontal scroll */}
      <div style={{ padding: "0px" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <img src="assets/live.svg" width="18" height="18" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(331deg) brightness(104%) contrast(97%)', animation: 'blinkSoft 1.5s infinite' }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>Partidos en Vivo</span>
          </div>
          <button onClick={() => onSelectMode('allLive')} style={{ ...{
              padding: '5px 12px', fontSize: 10, fontWeight: 700,
              background: C.accent, color: '#fff', border: 'none', borderRadius: 20, cursor: 'pointer'
            }, background: "rgba(1, 99, 148, 0)", padding: "5px 1.59998px 5px 12px", color: "rgba(255, 255, 255, 0.804)", fontWeight: "600" }}>Ver todos ›
</button>
        </div>
        <div className="hide-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 14px 4px', WebkitOverflowScrolling: 'touch' }}>
          {filteredMatches.map((match) => <div key={match.id} style={{ flex: '0 0 300px' }}><LiveMatchCard match={match} onTap={() => onBetMatch && onBetMatch(match)} /></div>
          )}
        </div>
      </div>

      {/* — Partidos Destacados — horizontal scroll */}
      <div style={{ padding: '16px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 14px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <img src="assets/destacado.svg" width="16" height="16" style={{ opacity: 0.8, filter: 'brightness(0) invert(1)' }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>Partidos Destacados</span>
          </div>
          <button onClick={() => onSelectMode('allFeatured')} style={{ ...{
              padding: '5px 12px', fontSize: 10, fontWeight: 600,
              background: C.card, color: C.text2, border: 'none', borderRadius: 20, cursor: 'pointer'
            }, background: "rgba(23, 28, 31, 0)", padding: "5px 0px 5px 12px", color: "rgba(255, 255, 255, 0.796)" }}>Ver todos ›</button>
        </div>
        <div className="hide-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 14px 4px', WebkitOverflowScrolling: 'touch' }}>
          {FEATURED_MATCHES.map((match) =>
          <div key={match.id} style={{ flex: '0 0 300px' }}><FeaturedMatchCard match={match} onTap={() => onBetMatch && onBetMatch(match)} /></div>
          )}
        </div>
      </div>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes blinkSoft{0%,100%{opacity:1}50%{opacity:0.6}}
.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
.hide-scrollbar::-webkit-scrollbar{display:none;}`}</style>
    </div>);

}

// Mock friend table invitations (pending)
const FRIEND_INVITATIONS = [
  {
    id: 'inv1',
    fromId: 2, fromName: 'BetMaster_AR', fromAvatar: '#3EAF84', fromOnline: true,
    table: {
      id: 'finv1', title: 'Partida Privada $25', mode: 'basic', category: 'football',
      entry: 25, prize: 237.5, timeLeft: '2h 40m', level: 2,
      players: 3, maxPlayers: 8,
      teams: [], objectives: [
        { id: 'o1', text: 'Realiza al menos 3 apuestas', type: 'progress', current: 0, target: 3, points: 100, deadline: '2h' },
      ],
      prizeDistribution: { first: 50, second: 30, third: 20 }
    },
    sentAgo: 'hace 5 min',
  },
  {
    id: 'inv2',
    fromId: 4, fromName: 'LuckyDraw22', fromAvatar: '#FDCB6E', fromOnline: true,
    table: {
      id: 'finv2', title: 'Amigos Basket $10', mode: 'basic', category: 'basketball',
      entry: 10, prize: 57, timeLeft: '3h', level: 1,
      players: 2, maxPlayers: 6,
      teams: [], objectives: [
        { id: 'o1', text: 'Realiza al menos 2 apuestas', type: 'progress', current: 0, target: 2, points: 80, deadline: '2h' },
      ],
      prizeDistribution: { first: 50, second: 30, third: 20 }
    },
    sentAgo: 'hace 12 min',
  },
];

function InvitationCard({ inv, onAccept, onDecline }) {
  const modeColor = inv.table.mode === 'tournament' ? C.yellow : C.green;
  const modeLabel = inv.table.mode === 'tournament' ? 'Torneo' : 'Rápida';
  const spotsLeft = inv.table.maxPlayers ? inv.table.maxPlayers - inv.table.players : null;
  const sportInfo = SPORTS[inv.table.category] || SPORTS.free;

  return (
    <div style={{ background: C.card, borderRadius: 16, overflow: 'hidden', border: '1px solid ' + C.accent + '30' }}>
      {/* Header: from friend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px', borderBottom: '1px solid ' + C.border }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, background: inv.fromAvatar,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: '#fff', fontWeight: 700
          }}>{inv.fromName.slice(0, 2).toUpperCase()}</div>
          <span style={{
            position: 'absolute', bottom: -1, right: -1, width: 8, height: 8,
            borderRadius: '50%', background: inv.fromOnline ? C.green : C.text3,
            border: '2px solid ' + C.card
          }}></span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.text1 }}>{inv.fromName}</span>
          <div style={{ fontSize: 10, color: C.text3, marginTop: 1 }}>te invitó a una partida · {inv.sentAgo}</div>
        </div>
        <span style={{ fontSize: 8, fontWeight: 700, color: modeColor, padding: '2px 6px', background: modeColor + '18', borderRadius: 20, textTransform: 'uppercase', flexShrink: 0 }}>{modeLabel}</span>
      </div>

      {/* Table info */}
      <div style={{ padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: sportInfo.color + '15', border: '1px solid ' + sportInfo.color + '20',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <SportIcon sport={sportInfo.sport || inv.table.category} size={20} color={sportInfo.color} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.table.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.text1 }}>${inv.table.entry} <span style={{ fontWeight: 400, color: C.text3 }}>entrada</span></span>
              <span style={{ fontSize: 9, color: C.text3 }}>·</span>
              <Icon name="clock" size={9} color={C.text3} />
              <span style={{ fontSize: 9, color: C.text3 }}>{inv.table.timeLeft}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 9, color: C.text3 }}>Premio</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.green }}>${inv.table.prize}</div>
          </div>
        </div>

        {/* Spots bar */}
        {spotsLeft !== null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ flex: 1, height: 4, background: C.border + '50', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: (inv.table.players / inv.table.maxPlayers * 100) + '%', height: '100%', background: spotsLeft <= 2 ? C.red : C.green, borderRadius: 2 }}></div>
            </div>
            <span style={{ fontSize: 9, color: C.text2, fontWeight: 600, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{inv.table.players}/{inv.table.maxPlayers}</span>
            <span style={{ fontSize: 9, color: spotsLeft <= 2 ? C.red : C.text3, fontWeight: 600 }}>{spotsLeft} libre{spotsLeft !== 1 ? 's' : ''}</span>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onDecline && onDecline(inv.id)} style={{
            flex: 1, padding: '10px', fontSize: 12, fontWeight: 700,
            background: C.bgLight, color: C.text3,
            border: '1px solid ' + C.border, cursor: 'pointer', borderRadius: 12
          }}>Rechazar</button>
          <button onClick={() => onAccept && onAccept(inv.table)} style={{
            flex: 2, padding: '10px', fontSize: 12, fontWeight: 700,
            background: C.accent, color: '#fff',
            border: 'none', cursor: 'pointer', borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Unirme
          </button>
        </div>
      </div>
    </div>
  );
}

function MyTablesScreen({ myTableIds, onResumeTable, onJoinTable, findTable, onOpenLastLonger }) {
  const [filter, setFilter] = React.useState('all');
  const [invitations, setInvitations] = React.useState(FRIEND_INVITATIONS);
  const myLastLongers = window.MY_LAST_LONGERS || [];

  const modes = [
    { id: 'all', label: 'Todas' },
    { id: 'basic', label: 'Rápidas' },
    { id: 'tournament', label: 'Torneos' },
    { id: 'friends', label: 'Amigos' },
    { id: 'lastLonger', label: 'Last Longer' },
  ];

  const lookup = findTable || ((id) => TABLES.find((t) => t.id === id));
  const myTables = myTableIds.map((id) => lookup(id)).filter(Boolean);
  const myFriendTables = myTables.filter(t =>
    (t.title && t.title.toLowerCase().includes('amigo')) || t.mode === 'home'
  );
  const otherTables = myTables.filter(t =>
    !((t.title && t.title.toLowerCase().includes('amigo')) || t.mode === 'home')
  );
  const filtered = filter === 'all' ? myTables : otherTables.filter((t) => t.mode === filter);
  const totalFriendsBadge = myFriendTables.length + invitations.length;
  const declineInvitation = (id) => setInvitations(prev => prev.filter(i => i.id !== id));

  return (
    <div style={{ padding: '12px 14px' }}>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
        {modes.map((m) => {
          const isActive = filter === m.id;
          const friendBadge = m.id === 'friends' && totalFriendsBadge > 0 ? totalFriendsBadge : 0;
          const llBadge = m.id === 'lastLonger' && myLastLongers.length > 0 ? myLastLongers.length : 0;
          const badge = friendBadge || llBadge;
          return (
            <button key={m.id} onClick={() => setFilter(m.id)} style={{
              padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
              background: isActive ? C.accent : C.card,
              color: isActive ? '#fff' : C.text2,
              border: 'none', borderRadius: 12, whiteSpace: 'nowrap', flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 4
            }}>
              {m.label}
              {badge > 0 && (
                <span style={{
                  fontSize: 8, fontWeight: 700, padding: '1px 4px', borderRadius: 8,
                  background: isActive ? 'rgba(255,255,255,0.25)' : C.yellow + '25',
                  color: isActive ? '#fff' : C.yellow, lineHeight: 1.4
                }}>{badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Todas / Rápidas / Torneos */}
      {filter !== 'friends' && filter !== 'lastLonger' && (
        filtered.length === 0
          ? <div style={{ textAlign: 'center', padding: '40px 20px', color: C.text3, fontSize: 13 }}>No tienes partidas activas en esta categoría</div>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {filtered.map((table) => <TableCard key={table.id} table={table} isMyTable={true} onJoin={() => onResumeTable(table)} />)}
            </div>
      )}

      {/* Last Longer tab */}
      {filter === 'lastLonger' && (
        myLastLongers.length === 0
          ? <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}>
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text3 }}>Sin Last Longers</div>
              <div style={{ fontSize: 11, color: C.text3, marginTop: 4 }}>Únete a uno dentro de un torneo en curso</div>
            </div>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {myLastLongers.map((ll) => (
                <MyLastLongerCard key={ll.id} ll={ll} onTap={() => onOpenLastLonger && onOpenLastLonger(ll)} />
              ))}
            </div>
      )}

      {/* Amigos tab */}
      {filter === 'friends' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Mis partidas con amigos en curso */}
          {myFriendTables.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent, boxShadow: '0 0 0 3px ' + C.accent + '30' }}></span>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.text2 }}>Mis partidas con amigos</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {myFriendTables.map((table) => (
                  <TableCard key={table.id} table={table} isMyTable={true} onJoin={() => onResumeTable(table)} />
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {myFriendTables.length > 0 && invitations.length > 0 && (
            <div style={{ height: 1, background: C.border, margin: '2px 0' }}></div>
          )}

          {/* Invitaciones pendientes */}
          {invitations.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.yellow, boxShadow: '0 0 0 3px ' + C.yellow + '30' }}></span>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.text2 }}>Invitaciones — {invitations.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {invitations.map((inv) => (
                  <InvitationCard
                    key={inv.id}
                    inv={inv}
                    onAccept={(table) => { declineInvitation(inv.id); onJoinTable && onJoinTable(table); }}
                    onDecline={declineInvitation}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {myFriendTables.length === 0 && invitations.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text3 }}>Sin partidas con amigos</div>
              <div style={{ fontSize: 11, color: C.text3, marginTop: 4 }}>Crea una desde el lobby o espera una invitación</div>
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}

function MatchCard({ match, onBetMatch }) {
  const [selected, setSelected] = React.useState(null);
  const halfLabel = match.sport === 'football' ? parseInt(match.minute) > 45 ? '2da Mitad' : '1ra Mitad' :
  match.sport === 'basketball' ? match.minute : match.sport === 'tennis' ? match.minute : '';

  const handleOddClick = (type) => {
    if (selected === type) {
      setSelected(null);
    } else {
      setSelected(type);
      if (onBetMatch) onBetMatch(match);
    }
  };

  return (
    <div style={{ padding: '14px 16px', background: C.card, borderRadius: 16 }}>
      {/* En Vivo badge row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 3,
          padding: '3px 8px', fontSize: 10, fontWeight: 700,
          background: C.red, color: '#fff', borderRadius: "12px"
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', display: 'inline-block', animation: 'blink 1.5s infinite' }}></span>
          En Vivo
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.text1 }}>{match.minute}</span>
        <span style={{ fontSize: 10, color: C.text3 }}>{halfLabel}</span>
        <div style={{ flex: 1 }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <SportIcon sport={match.sport} size={12} color={C.text3} />
          <span style={{ fontSize: 10, color: C.text3 }}>{match.league}</span>
        </div>
      </div>

      {/* Teams — vertical layout like reference */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TeamCrest name={match.home} color={match.homeColor} size={26} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text1, flex: 1 }}>{match.home}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', minWidth: 20, textAlign: 'center' }}>{match.score.split(' - ')[0] || match.score.split(' ')[0]}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <TeamCrest name={match.away} color={match.awayColor} size={26} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text1, flex: 1 }}>{match.away}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums', minWidth: 20, textAlign: 'center' }}>{match.score.split(' - ')[1] || match.score.split(' ')[2] || ''}</span>
        </div>
      </div>

      {/* Odds */}
      <div style={{ display: 'flex', gap: 5 }}>
        <StakeOddBtn label={match.home} value={match.odds.home} active={selected === 'home'} onClick={() => handleOddClick('home')} />
        {match.odds.draw != null && <StakeOddBtn label="empate" value={match.odds.draw} active={selected === 'draw'} onClick={() => handleOddClick('draw')} />}
        <StakeOddBtn label={match.away} value={match.odds.away} active={selected === 'away'} onClick={() => handleOddClick('away')} />
      </div>
    </div>);

}

function StakeOddBtn({ label, value, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '8px 6px', cursor: 'pointer',
      background: active ? `${C.accent}25` : C.bgLight,
      border: active ? `1px solid ${C.accent}60` : '1px solid transparent',
      textAlign: 'left', transition: 'all 0.12s', borderRadius: "12px"
    }}>
      <div style={{ fontSize: 9, color: C.text3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: active ? C.accentLight : C.oddText, fontVariantNumeric: 'tabular-nums' }}>{value.toFixed(2)}</div>
    </button>);

}

function TableCard({ table, onJoin, isMyTable }) {
  const sportInfo = SPORTS[table.category] || SPORTS.free;
  const isFull = table.maxPlayers ? table.players >= table.maxPlayers : false;
  const spotsLeft = table.maxPlayers ? table.maxPlayers - table.players : null;
  const modeConfig = {
    basic: { icon: 'zap', gradient: `linear-gradient(135deg, ${C.green}18, ${C.accent}10)`, label: 'Rápida', badgeColor: C.green },
    tournament: { icon: 'trophy', gradient: `linear-gradient(135deg, ${C.yellow}18, ${C.red}10)`, label: 'Torneo', badgeColor: C.yellow }
  };
  const mc = modeConfig[table.mode] || modeConfig.basic;

  // Tournament logo SVGs
  const TournamentLogo = ({ type, size = 44 }) => {
    const config = {
      champions: { icon: 'assets/champions-2.svg', bg: '#021549' },
      worldcup: { icon: 'assets/mundial.svg', bg: '#090909' }
    };
    const c = config[type];
    if (!c) return null;
    return (
      <div style={{
        width: size, height: size, borderRadius: size * 0.25, flexShrink: 0,
        background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
      }}>
        <img src={c.icon} width={size * 0.6} height={size * 0.6} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
      </div>);

  };

  // Table thumbnail: overlapping team crests or tournament logo
  const TableThumbnail = () => {
    // Mesa con Amigos — handshake icon
    if (table.title && table.title.includes('Amigos')) {
      return (
        <div style={{
          width: 50, height: 50, borderRadius: 12, flexShrink: 0,
          background: `${C.accent}15`, border: `1px solid ${C.accent}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img src="assets/amigos-icon.svg" width={26} height={26} style={{ objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(45%) sepia(80%) saturate(400%) hue-rotate(160deg) brightness(95%) contrast(90%)' }} />
        </div>);
    }
    if (table.tournamentLogo) {
      return (
        <div style={{
          width: 50, height: 50, borderRadius: 12, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(135deg, ${mc.badgeColor}15, ${mc.badgeColor}08)`
        }}>
          <TournamentLogo type={table.tournamentLogo} size={44} />
        </div>);

    }
    if (table.teams && table.teams.length >= 2) {
      return (
        <div style={{
          width: 50, height: 50, flexShrink: 0, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ position: 'absolute', left: 0, top: 4 }}>
            <TeamCrest name={table.teams[0].name} color={table.teams[0].color} size={32} />
          </div>
          <div style={{ position: 'absolute', right: 0, bottom: 4 }}>
            <TeamCrest name={table.teams[1].name} color={table.teams[1].color} size={32} />
          </div>
        </div>);

    }
    // Fallback: sport category icon or mode icon
    const sportColor = SPORTS[table.category] ? SPORTS[table.category].color : mc.badgeColor;
    return (
      <div style={{
        width: 50, height: 50, borderRadius: 12, flexShrink: 0,
        background: `${sportColor}15`, border: `1px solid ${sportColor}20`,
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <SportIcon sport={table.category || 'free'} size={22} color={sportColor} />
      </div>);

  };

  return (
    <div style={{ background: C.card, borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ background: mc.gradient, borderBottom: `1px solid ${mc.badgeColor}15`, opacity: "0", height: "0px" }}></div>
      <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Thumbnail */}
        <TableThumbnail />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Title row — table name + En Vivo badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.text1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{table.title || `Partida #${table.id}`}</span>
            {isMyTable && !table.waiting && <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3, flexShrink: 0,
              padding: '2px 6px', fontSize: 8, fontWeight: 700,
              background: C.red, color: '#fff', borderRadius: "30px"
            }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff', display: 'inline-block', animation: 'blink 1.5s infinite' }}></span>
              En Vivo
            </span>}
            {isMyTable && table.waiting && <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3, flexShrink: 0,
              padding: '2px 6px', fontSize: 8, fontWeight: 700,
              background: C.yellow, color: '#000', borderRadius: "30px"
            }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#000', display: 'inline-block', animation: 'blink 1.5s infinite' }}></span>
              Sala de espera
            </span>}
          </div>

          {/* Category + time + level row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
            <span style={{
              fontSize: 8, fontWeight: 700, color: mc.badgeColor, padding: '2px 5px',
              background: `${mc.badgeColor}15`, textTransform: 'uppercase', borderRadius: "30px"
            }}>{mc.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Icon name="clock" size={10} color={C.text3} />
              <span style={{ fontSize: 9, color: C.text3 }}>{table.timeLeft}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Icon name="shield" size={10} color={C.text3} />
              <span style={{ fontSize: 9, color: C.text3, fontWeight: 600 }}>Lvl {table.level}+</span>
            </div>
          </div>

          {/* Seat dots + prize — or participant count for tournaments */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {table.maxPlayers ?
              <React.Fragment>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: Math.min(table.maxPlayers, 10) }).map((_, i) => {
                    const filled = i < Math.min(table.players, table.maxPlayers);
                    const isLastFilled = i === Math.min(table.players, table.maxPlayers) - 1;
                    return (
                      <div key={i} style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: filled ? isLastFilled ? C.accentLight : C.green : `${C.border}`,
                        transition: 'all 0.2s',
                        opacity: filled ? 1 : 0.4
                      }}></div>);
                  })}
                  </div>
                  <span style={{ fontSize: 9, color: isFull ? C.red : C.text2, fontWeight: 600, marginLeft: 4, fontVariantNumeric: 'tabular-nums' }}>
                    {isFull ? 'Llena' : `${spotsLeft}`}
                  </span>
                </React.Fragment> :

              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="users" size={11} color={C.text3} />
                  <span style={{ fontSize: 10, color: C.text2, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{table.players.toLocaleString()} participantes</span>
                </div>
              }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Icon name="gift" size={10} color={C.green} />
              <span style={{ fontSize: 9, color: C.green, fontWeight: 600 }}>Prize: ${table.prize}</span>
            </div>
          </div>
        </div>

        {/* Entry price + button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <button onClick={onJoin} disabled={isFull && !isMyTable} style={{ ...{
              padding: '8px 14px', fontSize: 11, fontWeight: 700,
              background: isMyTable ? 'rgba(255, 255, 255, 0.05)' : isFull ? C.border : C.accent,
              color: isMyTable ? C.text2 : isFull ? C.text3 : '#fff',
              border: 'none', cursor: isFull && !isMyTable ? 'default' : 'pointer',
              opacity: isFull && !isMyTable ? 0.5 : 1, borderRadius: "12px"
            }, color: "rgb(255, 255, 255)" }}>{isMyTable ? (table.waiting ? 'Ver sala' : 'Seguir') : isFull ? 'Llena' : table.mode === 'tournament' ? 'Unirme' : 'Entrar'}</button>
          {!isMyTable && <span style={{ fontSize: 9, color: C.text3, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${table.entry}</span>}
        </div>
      </div>
    </div>);

}

function MyLastLongerCard({ ll, onTap }) {
  const playerCount = ll.players.length;
  const prize = (ll.entry * playerCount * 0.95).toFixed(0);
  const spotsLeft = ll.maxPlayers - playerCount;
  const isMine = ll.mine || ll.creator === USER_PROFILE.name;

  return (
    <button onClick={onTap} style={{
      background: C.card, border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14,
      padding: '13px 14px', cursor: 'pointer', textAlign: 'left', width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Trophy / entry badge */}
        <div style={{
          width: 46, height: 46, borderRadius: 12, flexShrink: 0,
          background: C.yellow + '15', border: '1px solid ' + C.yellow + '25',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.yellow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.text1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>${ll.entry} · {ll.creator}</span>
            {isMine
              ? <span style={{ fontSize: 9, fontWeight: 600, color: C.accent, padding: '2px 6px', background: C.accent + '15', borderRadius: 20, flexShrink: 0 }}>Mío</span>
              : <span style={{ fontSize: 9, fontWeight: 600, color: ll.isPublic ? C.green : C.yellow, padding: '2px 6px', background: (ll.isPublic ? C.green : C.yellow) + '15', borderRadius: 20, flexShrink: 0 }}>{ll.isPublic ? 'Público' : 'Privado'}</span>}
          </div>
          {ll.tournamentName && (
            <div style={{ fontSize: 10, color: C.text3, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ll.tournamentName}</div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>Pozo: ${prize}</span>
            <span style={{ fontSize: 10, color: C.text3 }}>·</span>
            <span style={{ fontSize: 10, color: C.text3 }}>{playerCount}/{ll.maxPlayers} jugadores</span>
          </div>
        </div>

        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
      </div>
    </button>);

}

window.LobbyScreen = LobbyScreen;
window.MyTablesScreen = MyTablesScreen;
window.MyLastLongerCard = MyLastLongerCard;
window.TableCard = TableCard;