
// Live Game Table — pastel palette, SVG icons, team crests

function GameTableScreen({ table, onBack, myTableIds = [], onSwitchTable, findTable, lastLongerOpen, onOpenLastLonger, onCloseLastLonger, lastLongerJoined, onExposeCreateLL, onLLTitleChange, onExposeLLBack }) {
  const [balance, setBalance] = React.useState(1000);
  const [selectedBet, setSelectedBet] = React.useState(null);
  const [betAmount, setBetAmount] = React.useState(100);
  const [myBets, setMyBets] = React.useState([]);
  const [selectedBets, setSelectedBets] = React.useState([]);
  const isFriendsGame = table && table.friendPlayers;
  const [allBets, setAllBets] = React.useState([]);
  const [leaderboard, setLeaderboard] = React.useState(() => {
    if (table && table.friendPlayers) {
      return table.friendPlayers.map((p, i) => ({ ...p, rank: i + 1 }));
    }
    // For tournaments, generate a larger realistic leaderboard
    if (table && table.mode === 'tournament') {
      const count = table.players > 10 ? Math.min(table.players, 200) : (10 + Math.floor(Math.random() * 91)); // 10-100
      const botNames = ['CryptoKing_99','BetMaster_AR','SharkBets','LuckyDraw22','ProGambler','NightOwlBet','AceBetter','RiskTaker_X','StormBet','BigPlay_77','ElRey_21','WinStreak','TopBet_10','FastCash','DarkHorse','MrOdds','BetNinja','ChipLeader','AllIn_99','GoldenBet','SilverFox','BronzAge','IronBet_3','Titan_Bet','HotStreak','LuckyStar','BetBoss','PokerFace','HighStake','DeepPlay','SharpEye','QuickWin','MaxBet_01','ProTip','EagleBet','HawkEye_7','SnipeBet','ClutchKing','BraveBet_5','CalmStorm','RapidFire','SteadyHand','WiseGuy_88','CoolBet','ZenMaster','AlphaBet','BetGenius','TrueAim','GhostBet','ShadowPlay','Blitz_99','ThunderBet','StrikeGold','MaverickBet','RoguePlay','AceHigh','RoyalFlush','FullHouse','JackpotJoe','DiamondBet','SpadeKing','HeartBeat_7','CloverLuck','StarBet_11','MoonShot','SunRise_99','CosmicBet','NovaStar','PulseBet','VortexPlay','NeonBet_22','PixelPlay','TurboWin','RocketBet','BlazeKing','FrostBite','IceCold_5','FireStorm','ThunderClap','BoltBet_33','FlashWin','StealthBet','NightHawk','DawnBreak','TwilightBet','HorizonPlay','ZenithBet','NadirBet','ApexPlay','SummitBet','PeakBet_7','ValleyBet','OceanDeep','TidalWave','CoralBet_1','ReefPlay','SandStorm'];
      const botAvatars = ['#6C5CE7','#E17055','#FDCB6E','#A29BFE','#55EFC4','#FF7675','#74B9FF','#FAB1A0','#81ECEC','#DFE6E9','#00B894','#E84393','#0984e3','#fdcb6e','#e17055','#6c5ce7','#00cec9','#fab1a0','#a29bfe','#fd79a8'];
      const players = [];
      for (let i = 0; i < count; i++) {
        const isMe = i === Math.floor(count * 0.3); // Place "You" around 30th percentile
        players.push({
          rank: i + 1,
          name: isMe ? 'You' : botNames[i % botNames.length] + (i >= botNames.length ? '_' + Math.floor(i / botNames.length) : ''),
          avatar: isMe ? C.accent : botAvatars[i % botAvatars.length],
          balance: Math.max(200, Math.floor(5000 - i * (4000 / count) + (Math.random() - 0.5) * 500)),
          bets: Math.floor(Math.random() * 12) + 1,
          isMe: isMe
        });
      }
      players.sort((a, b) => b.balance - a.balance);
      players.forEach((p, i) => p.rank = i + 1);
      return players;
    }
    return LEADERBOARD.map((p) => ({ ...p }));
  });
  const [timeLeft] = React.useState(table ? table.timeLeft : '2h 15m');
  const [showBetSlip, setShowBetSlip] = React.useState(false);
  const [showObjectives, setShowObjectives] = React.useState(false);
  const [historyPlayer, setHistoryPlayer] = React.useState(null);
  const [bettingMatch, setBettingMatch] = React.useState(null);

  // Find the match linked to this table
  const tableMatch = React.useMemo(() => {
    const linked = LIVE_MATCHES.find((m) => m.tableId === (table && table.id));
    if (linked) return linked;
    // Fallback: try to build a match from table teams data
    if (table && table.teams && table.teams.length >= 2) {
      return { id: table.id, sport: table.category || 'football', league: '', home: table.teams[0].name, away: table.teams[1].name, homeColor: table.teams[0].color, awayColor: table.teams[1].color, score: '0 - 0', minute: "0'", odds: { home: 2.0, draw: 3.0, away: 3.5 } };
    }
    // Last fallback: use first live match
    return LIVE_MATCHES[0];
  }, [table]);

  React.useEffect(() => {
    if (isFriendsGame) return; // No random updates for friends games
    const iv = setInterval(() => {
      setLeaderboard((prev) => {
        const updated = prev.map((p) => {
          if (p.isMe) return { ...p, prevRank: p.rank, balance };
          return { ...p, prevRank: p.rank, balance: Math.max(0, p.balance + (Math.random() - 0.45) * 200) };
        }).sort((a, b) => b.balance - a.balance).map((p, i) => ({ ...p, rank: i + 1 }));
        return updated;
      });
    }, 3000);
    return () => clearInterval(iv);
  }, [balance, isFriendsGame]);

  const handleMarketBet = (betInfo) => {
    // Toggle selection
    const existing = selectedBets.findIndex((b) => b.marketId === betInfo.marketId && b.rowIdx === betInfo.rowIdx && b.colIdx === betInfo.colIdx);
    if (existing >= 0) {
      setSelectedBets((prev) => prev.filter((_, i) => i !== existing));
      setSelectedBet(null);
      setShowBetSlip(false);
    } else {
      setSelectedBets((prev) => [...prev, betInfo]);
      setSelectedBet({ match: betInfo.match || bettingMatch || tableMatch, type: betInfo.label, odd: betInfo.odd });
      setShowBetSlip(true);
    }
  };

  const placeBet = (match, type, odd) => {setSelectedBet({ match, type, odd });setShowBetSlip(true);};

  const confirmBet = () => {
    if (!selectedBet || betAmount > balance) return;
    const potentialWin = betAmount * selectedBet.odd;
    const won = Math.random() > 0.45;
    const matchLabel = selectedBet.match ? selectedBet.match.home + ' vs ' + selectedBet.match.away : 'Apuesta';
    setMyBets((prev) => [{ id: Date.now(), match: matchLabel, type: selectedBet.type, odd: selectedBet.odd, amount: betAmount, won, payout: won ? potentialWin : 0 }, ...prev]);
    const newBalance = won ? balance + potentialWin - betAmount : balance - betAmount;
    setBalance(newBalance);

    if (isFriendsGame) {
      const newBets = [];
      const friendUpdates = [];
      // My bet
      newBets.push({ id: 'me-' + Date.now(), playerId: 'You', playerAvatar: C.accent, isMe: true,
        market: selectedBet.type, selection: selectedBet.type, odd: selectedBet.odd,
        isOpen: true, won: null, timeAgo: 'ahora', matchLabel, matchId: 'main' });
      // Pre-calculate friend bets before setState
      leaderboard.forEach((p) => {
        if (p.isMe) return;
        if (Math.random() > 0.4) {
          const fOdd = +(1.3 + Math.random() * 4.7).toFixed(2);
          const fAmount = [50, 100, 150, 200][Math.floor(Math.random() * 4)];
          const fWon = Math.random() > 0.45;
          const balChange = fWon ? fAmount * fOdd - fAmount : -fAmount;
          newBets.push({ id: p.name + '-' + Date.now() + '-' + Math.random(),
            playerId: p.name, playerAvatar: p.avatar, isMe: false,
            market: selectedBet.type, selection: selectedBet.type, odd: fOdd,
            isOpen: true, won: null, timeAgo: 'ahora', matchLabel, matchId: 'main' });
          friendUpdates.push({ name: p.name, balChange });
        }
      });
      // Now update leaderboard with pre-calculated results
      setLeaderboard((prev) => {
        const updated = prev.map((p) => {
          if (p.isMe) return { ...p, balance: newBalance, bets: (p.bets || 0) + 1 };
          const update = friendUpdates.find((u) => u.name === p.name);
          if (update) return { ...p, balance: Math.max(0, p.balance + update.balChange), bets: (p.bets || 0) + 1 };
          return p;
        });
        return updated.sort((a, b) => b.balance - a.balance).map((p, i) => ({ ...p, rank: i + 1 }));
      });
      setAllBets((prev) => [...newBets, ...prev]);
    }

    setShowBetSlip(false);setSelectedBet(null);setSelectedBets([]);
  };

  const myRank = leaderboard.find((p) => p.isMe)?.rank || '-';

  // Table switcher state
  const [showSwitcher, setShowSwitcher] = React.useState(false);
  const lookupFn = findTable || ((id) => TABLES.find((t) => t.id === id));
  const activeTables = myTableIds.map((id) => lookupFn(id)).filter(Boolean);
  const otherTables = activeTables.filter((t) => !table || t.id !== table.id);

  const isTournament = table && table.mode === 'tournament';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Last Longer panel */}
      {lastLongerOpen && isTournament &&
      <LastLongerPanel table={table} leaderboard={leaderboard} onClose={onCloseLastLonger} onExposeCreate={onExposeCreateLL} onTitleChange={onLLTitleChange} onExposeBack={onExposeLLBack} />
      }
      {/* Floating chips — bottom-right: Last Longer + Partidas selector */}
      <div style={{ position: 'absolute', bottom: 12, right: 14, zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        {/* Expanded switcher panel */}
        {showSwitcher && activeTables.length > 1 &&
        <div style={{
          background: C.bgLight, border: '1px solid ' + C.border,
          borderRadius: 14, padding: '10px', minWidth: 200, maxWidth: 260,
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.text1 }}>Mis partidas activas</span>
              <button onClick={() => setShowSwitcher(false)} style={{ background: 'none', border: 'none', color: C.text3, fontSize: 14, cursor: 'pointer', padding: '0 2px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {activeTables.map((t) => {
              const isCurrent = table && t.id === table.id;
              const sport = t.category || 'free';
              const tIsTournament = t.mode === 'tournament';
              const tournamentIconsSw = { champions: 'assets/champions-2.svg', worldcup: 'assets/mundial.svg' };
              const tournamentBgsSw = { champions: '#021549', worldcup: '#090909' };
              const hasLogo = tIsTournament && t.tournamentLogo && tournamentIconsSw[t.tournamentLogo];
              const sportColor = SPORT_COLORS[sport] || SPORT_COLORS.quick;
              const iconBg = hasLogo ? tournamentBgsSw[t.tournamentLogo] || C.bgLight : sportColor + '15';
              const iconBorder = hasLogo ? 'rgba(255,255,255,0.08)' : sportColor + '25';
              return (
                <button key={t.id} onClick={() => {if (!isCurrent && onSwitchTable) {onSwitchTable(t);setShowSwitcher(false);}}} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
                  background: isCurrent ? C.accent + '20' : C.card,
                  border: isCurrent ? '1px solid ' + C.accent + '50' : '1px solid transparent',
                  borderRadius: 10, cursor: isCurrent ? 'default' : 'pointer',
                  width: '100%', textAlign: 'left'
                }}>
                    <div style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: iconBg, border: '1px solid ' + iconBorder,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                      {hasLogo ?
                    <img src={tournamentIconsSw[t.tournamentLogo]} width={16} height={16} style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} /> :
                    <SportIcon sport={sport === 'free' ? 'quick' : sport} size={14} color={sportColor} />
                    }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: isCurrent ? C.text1 : C.text2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.title || 'Partida #' + t.id}
                      </div>
                      <div style={{ fontSize: 9, color: C.text3, marginTop: 1 }}>{t.timeLeft}</div>
                    </div>
                    {isCurrent && <span style={{ fontSize: 8, fontWeight: 700, color: C.accent, padding: '2px 6px', background: C.accent + '15', borderRadius: 20 }}>ACTUAL</span>}
                    {!isCurrent && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>}
                  </button>);
            })}
            </div>
          </div>
        }

        {/* Collapsed pills row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Last Longer chip — only for tournaments */}
          {isTournament &&
          <button onClick={() => onOpenLastLonger && onOpenLastLonger()} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '8px 12px',
            background: lastLongerJoined ? C.green : '#2a2510',
            color: lastLongerJoined ? '#fff' : C.yellow,
            border: '1px solid ' + (lastLongerJoined ? C.green + '60' : C.yellow + '35'),
            borderRadius: 24, cursor: 'pointer',
            fontSize: 11, fontWeight: 700, boxShadow: '0 4px 18px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
              <img src="assets/star-ll.svg" width={14} height={14} style={{ objectFit: 'contain', flexShrink: 0 }} />
              <span>{lastLongerJoined ? 'Activo' : 'Last Longer'}</span>
              {lastLongerJoined && <span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: C.green, border: '1.5px solid ' + C.card }}></span>}
            </button>
          }

          {/* Partidas selector chip — always visible when multiple tables */}
          {activeTables.length > 1 &&
          <button onClick={() => setShowSwitcher(!showSwitcher)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', background: C.accent, color: '#fff',
            border: 'none', borderRadius: 24, cursor: 'pointer',
            fontSize: 12, fontWeight: 700, boxShadow: '0 4px 18px rgba(0,0,0,0.5)'
          }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
              <span>{activeTables.length}</span>
              <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.85 }}>partidas</span>
            </button>
          }
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 14px', background: `${C.red}10`, borderBottom: `1px solid ${C.red}20` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.red, animation: 'blink 1.5s infinite' }}></span>
          <span style={{ ...{ fontSize: 10, fontWeight: 700, color: C.red }, color: "rgb(255, 255, 255)" }}>EN VIVO</span>
        </div>
        <span style={{ fontSize: 10, color: C.text3, fontVariantNumeric: 'tabular-nums' }}>⏱ {timeLeft}</span>
        <span style={{ ...{ fontSize: 10, color: C.text2, fontWeight: 600 }, color: "rgba(255, 255, 255, 0.8)" }}>#{myRank}/{leaderboard.length}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', padding: '7px 14px', background: C.card, borderBottom: `1px solid ${C.border}`, gap: 10 }}>
        <div style={{ flexShrink: 0, minWidth: 75 }}>
          <div style={{ fontSize: 8, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Mi Balance</div>
          <div style={{ fontWeight: 700, color: C.green, fontVariantNumeric: 'tabular-nums', fontSize: 16, lineHeight: 1.2 }}>
            {balance.toFixed(0)} <span style={{ fontWeight: 500, color: C.text3, fontSize: 9 }}>fichas</span>
          </div>
        </div>
        {/* Objectives button inline */}
        {table && table.objectives &&
        <div style={{ flex: 1, minWidth: 0 }}>
          <ObjectivesButton objectives={table.objectives} onClick={() => setShowObjectives(true)} />
        </div>
        }

        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 'auto' }}>
          <div style={{ fontSize: 8, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Apuestas</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.text1, lineHeight: 1.2 }}>{myBets.length}</div>
        </div>
      </div>

      {isTournament ?
      <TournamentGameTabs leaderboard={leaderboard} myBets={myBets} onPlaceBet={placeBet} tableMatch={tableMatch} onMarketBet={handleMarketBet} selectedBets={selectedBets} table={table} historyPlayer={historyPlayer} onSelectHistoryPlayer={(p) => setHistoryPlayer(p)} balance={balance} myBetCount={myBets.length} /> :

      <GameTabs availableMatches={LIVE_MATCHES.slice(0, 4)} leaderboard={leaderboard} myBets={myBets} onPlaceBet={placeBet} tableMatch={tableMatch} onMarketBet={handleMarketBet} selectedBets={selectedBets} table={table} historyPlayer={historyPlayer} onSelectHistoryPlayer={(p) => setHistoryPlayer(p)} bettingMatch={bettingMatch} onSelectBettingMatch={(m) => setBettingMatch(m)} onClearBettingMatch={() => {setBettingMatch(null);setSelectedBets([]);setSelectedBet(null);setShowBetSlip(false);}} allBets={allBets} />
      }

      {showBetSlip && selectedBet &&
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, background: C.bgLight,
        borderTop: `1px solid ${C.border}`, padding: '16px 14px 24px', zIndex: 40, borderRadius: "16px 16px 0px 0px"
      }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text1 }}>Ticket de Apuesta</span>
            <button onClick={() => setShowBetSlip(false)} style={{ background: 'none', border: 'none', color: C.text3, fontSize: 16, cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ padding: '10px 12px', background: C.card, marginBottom: 12, borderRadius: "16px" }}>
            <div style={{ fontSize: 11, color: C.text3 }}>{selectedBet.match.home} vs {selectedBet.match.away}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>{selectedBet.type}</span>
              <span style={{ ...{ fontSize: 13, fontWeight: 700, color: C.oddText }, color: "rgb(255, 255, 255)" }}>{selectedBet.odd.toFixed(2)}</span>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: C.text3, marginBottom: 6, fontWeight: 600, textTransform: 'uppercase' }}>Cantidad de fichas</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[50, 100, 200, 500].map((amt) =>
            <button key={amt} onClick={() => setBetAmount(amt)} style={{
              flex: 1, padding: '9px 4px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              background: betAmount === amt ? `${C.accent}30` : C.card,
              color: betAmount === amt ? C.accentLight : C.text2,
              border: betAmount === amt ? `1px solid ${C.accent}` : 'none', borderRadius: "16px"
            }}>{amt}</button>
            )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 12 }}>
            <span style={{ color: C.text3 }}>Ganancia potencial</span>
            <span style={{ color: C.green, fontWeight: 700 }}>{(betAmount * selectedBet.odd).toFixed(0)} fichas</span>
          </div>
          <button onClick={confirmBet} disabled={betAmount > balance} style={{
          width: '100%', padding: '13px', fontSize: 14, fontWeight: 700,
          background: betAmount > balance ? C.card : C.accent, color: betAmount > balance ? C.text3 : '#fff',
          border: 'none', cursor: betAmount > balance ? 'default' : 'pointer', borderRadius: "16px"
        }}>{betAmount > balance ? 'Balance insuficiente' : 'Confirmar Apuesta'}</button>
        </div>
      }
      {showObjectives && table &&
      <ObjectivesPanel table={table} onClose={() => setShowObjectives(false)} />
      }
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>);

}

function GameTabs({ availableMatches, leaderboard, myBets, onPlaceBet, tableMatch, onMarketBet, selectedBets, table, historyPlayer, onSelectHistoryPlayer, bettingMatch, onSelectBettingMatch, onClearBettingMatch, allBets }) {
  const [tab, setTab] = React.useState('matches');
  const tabs = [{ id: 'matches', label: 'Apostar', icon: 'assets/betbattle-icon.svg' }, { id: 'leaderboard', label: 'Ranking', icon: 'assets/ranking.svg' }, { id: 'history', label: 'Historial', icon: 'assets/history.svg' }];

  const tableSport = table ? table.category || 'free' : 'free';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: "4px 0px 0px" }}>
      <div style={{ display: 'flex', margin: '10px 12px', background: C.card, borderRadius: 16, padding: 3 }}>
        {tabs.map((t) =>
        <button key={t.id} onClick={() => setTab(t.id)} style={{
          flex: 1, padding: '9px 6px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          background: tab === t.id ? C.accent : 'transparent',
          color: tab === t.id ? '#fff' : C.text3, border: 'none', borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
        }}>{t.icon && <img src={t.icon} width={12} height={12} style={{ objectFit: 'contain', filter: tab === t.id ? 'brightness(0) invert(1)' : 'brightness(0) invert(1)', opacity: tab === t.id ? 1 : 0.5 }} />}{t.label}</button>
        )}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {tab === 'matches' && !bettingMatch &&
        <MatchSelectionView tableSport={tableSport} onSelectMatch={onSelectBettingMatch} />
        }
        {tab === 'matches' && bettingMatch &&
        <React.Fragment>
            <SelectedMatchHeader match={bettingMatch} onBack={onClearBettingMatch} />
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <BettingMarketsView match={bettingMatch} onPlaceBet={onMarketBet} selectedBets={selectedBets} />
            </div>
          </React.Fragment>
        }
        {tab === 'leaderboard' &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: "0px 14px 10px" }}>
            {leaderboard.map((p) =>
          <button key={p.rank} onClick={() => {onSelectHistoryPlayer(p.name);setTab('history');}} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
            background: p.isMe ? `${C.accent}15` : 'transparent', borderRadius: 8,
            border: p.isMe ? `1px solid ${C.accent}30` : '1px solid transparent',
            cursor: 'pointer', width: '100%', textAlign: 'left'
          }}>
                <span style={{ width: 22, fontSize: 12, fontWeight: 700, textAlign: 'center', color: p.rank <= 3 ? C.yellow : C.text3 }}>{p.rank}</span>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: p.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>{p.name.slice(0, 2).toUpperCase()}</div>
                <span style={{ flex: 1, fontSize: 12, fontWeight: p.isMe ? 700 : 400, color: p.isMe ? C.accentLight : C.text1 }}>{p.name}</span>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text1, fontVariantNumeric: 'tabular-nums' }}>{p.balance.toFixed(0)}</div>
                <span style={{ fontSize: 14, color: C.text3 }}>›</span>
              </button>
          )}
          </div>
        }
        {tab === 'history' &&
        <BetHistoryView leaderboard={leaderboard} table={table} tableMatch={tableMatch} selectedPlayer={historyPlayer} onSelectPlayer={onSelectHistoryPlayer} externalBets={allBets} />
        }
      </div>
    </div>);

}

function GameOddBtn2({ label, value, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      flex: 1, padding: '7px 4px', cursor: 'pointer',
      background: h ? `${C.accent}20` : C.bgLight, border: h ? `1px solid ${C.accent}` : '1px solid transparent',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, transition: 'all 0.12s', borderRadius: "12px"
    }}>
      <span style={{ fontSize: 9, color: C.text3 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: h ? C.accentLight : C.oddText }}>{value.toFixed(2)}</span>
    </button>);

}

window.GameTableScreen = GameTableScreen;