
// Betting Markets UI — 1win style: filled bg accordions, separated odd pills, white numbers

function BettingMarketsView({ match, onPlaceBet, selectedBets = [] }) {
  const [activeCategory, setActiveCategory] = React.useState('Popular');
  const [collapsed, setCollapsed] = React.useState({});
  const [correctScore, setCorrectScore] = React.useState({ home: 0, away: 0 });

  const data = React.useMemo(() => {
    if (!match) return { categories: [], markets: [] };
    return generateBettingMarkets(match);
  }, [match?.id]);

  const toggleCollapse = (id) => setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  const filteredMarkets = data.markets.filter(m => m.category === activeCategory);

  const isBetSelected = (marketId, rowIdx, colIdx) =>
    selectedBets.some(b => b.marketId === marketId && b.rowIdx === rowIdx && b.colIdx === colIdx);

  const handleOddClick = (marketId, marketTitle, label, oddValue, rowIdx, colIdx) => {
    if (!oddValue || oddValue === null) return;
    onPlaceBet && onPlaceBet({ marketId, marketTitle, label, odd: oddValue, rowIdx, colIdx, match });
  };

  // Chevron SVG
  const Chevron = ({ open }) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke={C.text3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // ---- ODD CELL (separated pill, filled bg, white numbers) ----
  const OddCell = ({ label, value, selected, onClick, small }) => {
    if (value === null || value === undefined) return <div style={{ flex: 1 }}></div>;
    return (
      <button onClick={onClick} style={{
        flex: 1, padding: small ? '8px 4px' : '10px 6px',
        background: selected ? `${C.accent}30` : '#272C32',
        border: selected ? `1.5px solid ${C.accent}` : 'none',
        borderRadius: 10, cursor: 'pointer', transition: 'all 0.12s',
        textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3
      }}>
        {label && <span style={{ fontSize: 9, color: C.text3, fontWeight: 500, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{label}</span>}
        <span style={{
          fontSize: small ? 12 : 14, fontWeight: 700,
          color: selected ? C.accentLight : '#fff',
          fontVariantNumeric: 'tabular-nums'
        }}>{value.toFixed(2)}</span>
      </button>
    );
  };

  // ---- INLINE ODD (for over/under rows) ----
  const InlineOdd = ({ label, value, selected, onClick }) => {
    if (value === null || value === undefined) return <div style={{ flex: 1 }}></div>;
    return (
      <button onClick={onClick} style={{
        flex: 1, padding: '8px 10px',
        background: selected ? `${C.accent}20` : 'transparent',
        border: 'none', cursor: 'pointer', transition: 'all 0.12s',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid #272C32`
      }}>
        <span style={{ fontSize: 11, color: C.text2, fontWeight: 500 }}>{label}</span>
        <span style={{
          fontSize: 13, fontWeight: 700,
          color: selected ? C.accentLight : '#fff',
          fontVariantNumeric: 'tabular-nums'
        }}>{value.toFixed(2)}</span>
      </button>
    );
  };

  // ---- ACCORDION (filled bg container, chevron) ----
  const Accordion = ({ market }) => {
    const isCollapsed = collapsed[market.id] || false;
    return (
      <div style={{
        background: '#171C1F', borderRadius: 14, overflow: 'hidden',
        marginBottom: 8, border: 'none'
      }}>
        <button onClick={() => toggleCollapse(market.id)} style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '13px 14px', background: 'none',
          border: 'none', cursor: 'pointer',
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text1, textAlign: 'left' }}>
            {market.title}
          </span>
          <Chevron open={!isCollapsed} />
        </button>
        {!isCollapsed && (
          <div style={{ padding: '0 14px 14px' }}>
            {renderMarketBody(market)}
          </div>
        )}
      </div>
    );
  };

  // ---- MARKET BODY RENDERERS ----
  const renderMarketBody = (market) => {
    switch (market.type) {
      case '1x2': return render1X2(market);
      case '1x2_no_draw': return render1X2(market);
      case 'yesno': return renderYesNo(market);
      case 'overunder': return renderOverUnder(market);
      case 'overunder3': return renderOverUnder3(market);
      case 'overunder_team': return renderOverUnderTeam(market);
      case 'grid': return renderGrid(market);
      case 'correct_score': return renderCorrectScore(market);
      case 'player_table': return renderPlayerTable(market);
      case 'player_list': return renderPlayerList(market);
      default: return null;
    }
  };

  const render1X2 = (market) => (
    <div style={{ display: 'flex', gap: 6 }}>
      {market.columns.map((col, ci) => (
        <OddCell key={ci} label={col} value={market.rows[0].odds[ci]}
          selected={isBetSelected(market.id, 0, ci)}
          onClick={() => handleOddClick(market.id, market.title, col, market.rows[0].odds[ci], 0, ci)} />
      ))}
    </div>
  );

  const renderYesNo = (market) => (
    <div style={{ display: 'flex', gap: 6 }}>
      <OddCell label="Sí" value={market.rows[0].odds[0]}
        selected={isBetSelected(market.id, 0, 0)}
        onClick={() => handleOddClick(market.id, market.title, 'Sí', market.rows[0].odds[0], 0, 0)} />
      <OddCell label="No" value={market.rows[0].odds[1]}
        selected={isBetSelected(market.id, 0, 1)}
        onClick={() => handleOddClick(market.id, market.title, 'No', market.rows[0].odds[1], 0, 1)} />
    </div>
  );

  const renderOverUnder = (market) => (
    <div>
      <div style={{ display: 'flex', marginBottom: 2 }}>
        {market.columns.map((col, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: C.text3, fontWeight: 600, padding: '4px 0' }}>{col}</div>
        ))}
      </div>
      {market.rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex' }}>
          {row.odds.map((odd, ci) => (
            <InlineOdd key={ci}
              label={`${market.columns[ci]} ${row.label}`}
              value={odd}
              selected={isBetSelected(market.id, ri, ci)}
              onClick={() => handleOddClick(market.id, market.title, `${market.columns[ci]} ${row.label}`, odd, ri, ci)} />
          ))}
        </div>
      ))}
    </div>
  );

  const renderOverUnder3 = (market) => (
    <div>
      <div style={{ display: 'flex', marginBottom: 2 }}>
        {market.columns.map((col, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: C.text3, fontWeight: 600, padding: '4px 0' }}>{col}</div>
        ))}
      </div>
      {market.rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex' }}>
          {row.odds.map((odd, ci) => (
            <InlineOdd key={ci}
              label={`${market.columns[ci]} ${row.label}`}
              value={odd}
              selected={isBetSelected(market.id, ri, ci)}
              onClick={() => handleOddClick(market.id, market.title, `${market.columns[ci]} ${row.label}`, odd, ri, ci)} />
          ))}
        </div>
      ))}
    </div>
  );

  const renderOverUnderTeam = (market) => (
    <div>
      <div style={{ display: 'flex', marginBottom: 2 }}>
        <div style={{ flex: 1 }}></div>
        {market.columns.map((col, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: C.text3, fontWeight: 600, padding: '4px 0' }}>{col}</div>
        ))}
      </div>
      {market.teams.map((team, ti) => (
        <div key={ti} style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.text1, marginBottom: 2, paddingLeft: 4 }}>{team.team}</div>
          {team.rows.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, fontSize: 10, color: C.text3, paddingLeft: 4 }}>{row.label}</div>
              {row.odds.map((odd, ci) => (
                <InlineOdd key={ci} label="" value={odd}
                  selected={isBetSelected(market.id, `${ti}-${ri}`, ci)}
                  onClick={() => handleOddClick(market.id, market.title, `${team.team} ${market.columns[ci]} ${row.label}`, odd, `${ti}-${ri}`, ci)} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderGrid = (market) => (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
        <div style={{ flex: 1.2 }}></div>
        {market.columns.map((col, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: C.text3, fontWeight: 600 }}>{col}</div>
        ))}
      </div>
      {market.rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
          <div style={{ flex: 1.2, fontSize: 11, color: C.text2, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.label}</div>
          {row.odds.map((odd, ci) => (
            <OddCell key={ci} value={odd} small
              selected={isBetSelected(market.id, ri, ci)}
              onClick={() => handleOddClick(market.id, market.title, `${row.label} — ${market.columns[ci]}`, odd, ri, ci)} />
          ))}
        </div>
      ))}
    </div>
  );

  const renderCorrectScore = (market) => {
    const calcOdd = (h, a) => {
      const base = market.baseOdd || 6.0;
      const diff = h + a;
      return +(base + diff * 2.5 + Math.abs(h - a) * 1.2).toFixed(2);
    };
    const odd = calcOdd(correctScore.home, correctScore.away);

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: C.text3, marginBottom: 6, fontWeight: 600 }}>{market.home}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setCorrectScore(p => ({ ...p, home: Math.max(0, p.home - 1) }))} style={{
                width: 30, height: 30, borderRadius: 8, background: '#272C32', border: 'none',
                color: C.text1, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>−</button>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', minWidth: 24, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{correctScore.home}</span>
              <button onClick={() => setCorrectScore(p => ({ ...p, home: Math.min(9, p.home + 1) }))} style={{
                width: 30, height: 30, borderRadius: 8, background: '#272C32', border: 'none',
                color: C.text1, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>+</button>
            </div>
          </div>
          <span style={{ fontSize: 16, color: C.text3, fontWeight: 700 }}>—</span>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: C.text3, marginBottom: 6, fontWeight: 600 }}>{market.away}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setCorrectScore(p => ({ ...p, away: Math.max(0, p.away - 1) }))} style={{
                width: 30, height: 30, borderRadius: 8, background: '#272C32', border: 'none',
                color: C.text1, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>−</button>
              <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', minWidth: 24, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{correctScore.away}</span>
              <button onClick={() => setCorrectScore(p => ({ ...p, away: Math.min(9, p.away + 1) }))} style={{
                width: 30, height: 30, borderRadius: 8, background: '#272C32', border: 'none',
                color: C.text1, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>+</button>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <OddCell value={odd} label={`${correctScore.home} - ${correctScore.away}`}
            selected={isBetSelected(market.id, 'score', 0)}
            onClick={() => handleOddClick(market.id, market.title, `${correctScore.home}-${correctScore.away}`, odd, 'score', 0)} />
        </div>
      </div>
    );
  };

  const renderPlayerTable = (market) => {
    const [showAll, setShowAll] = React.useState(false);
    const visible = showAll ? market.players : market.players.slice(0, 6);
    return (
      <div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
          <div style={{ flex: 1.5 }}></div>
          {market.columns.map((col, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: C.text3, fontWeight: 600 }}>{col}</div>
          ))}
        </div>
        {visible.map((player, pi) => (
          <div key={pi} style={{
            display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4,
            padding: '4px 0', borderTop: pi > 0 ? `1px solid #272C32` : 'none'
          }}>
            <div style={{ flex: 1.5, display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                background: '#272C32', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: C.text3
              }}>{player.number}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{player.name}</div>
            </div>
            {player.odds.map((odd, ci) => (
              <OddCell key={ci} value={odd} small
                selected={isBetSelected(market.id, pi, ci)}
                onClick={() => handleOddClick(market.id, market.title, `${player.name} — ${market.columns[ci]}`, odd, pi, ci)} />
            ))}
          </div>
        ))}
        {market.players.length > 6 && (
          <button onClick={() => setShowAll(!showAll)} style={{
            width: '100%', padding: '8px', background: 'none', border: 'none',
            color: C.text3, fontSize: 11, cursor: 'pointer', fontWeight: 600
          }}>{showAll ? 'Mostrar menos ▴' : 'Mostrar más ▾'}</button>
        )}
      </div>
    );
  };

  const renderPlayerList = (market) => {
    const [showAll, setShowAll] = React.useState(false);
    const visible = showAll ? market.players : market.players.slice(0, 6);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {visible.map((player, pi) => (
          <div key={pi} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 4px',
            borderTop: pi > 0 ? `1px solid #272C32` : 'none'
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6, flexShrink: 0,
              background: '#272C32', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: C.text3
            }}>{player.number}</div>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: C.text1 }}>{player.name}</span>
            <span style={{ fontSize: 10, color: C.text3 }}>{player.team}</span>
            <span style={{
              fontSize: 13, fontWeight: 700, color: '#fff', fontVariantNumeric: 'tabular-nums',
              padding: '6px 12px', background: '#272C32', borderRadius: 8, cursor: 'pointer', border: 'none'
            }} onClick={() => handleOddClick(market.id, market.title, player.name, player.odd, pi, 0)}>
              {player.odd.toFixed(2)}
            </span>
          </div>
        ))}
        {market.players.length > 6 && (
          <button onClick={() => setShowAll(!showAll)} style={{
            width: '100%', padding: '8px', background: 'none', border: 'none',
            color: C.text3, fontSize: 11, cursor: 'pointer', fontWeight: 600
          }}>{showAll ? 'Mostrar menos ▴' : 'Mostrar más ▾'}</button>
        )}
      </div>
    );
  };

  if (!match) return <div style={{ padding: 20, textAlign: 'center', color: C.text3 }}>No hay partido seleccionado</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Category pills — active filled, rest with bg */}
      <div style={{
        display: 'flex', gap: 6, overflowX: 'auto', padding: '10px 10px',
        flexShrink: 0
      }}>
        {data.categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '7px 14px', borderRadius: 20, fontSize: 11, fontWeight: 600,
            background: activeCategory === cat ? C.accent : '#272C32',
            color: activeCategory === cat ? '#fff' : C.text2,
            border: 'none',
            cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s', flexShrink: 0
          }}>{cat}</button>
        ))}
      </div>

      {/* Markets list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 10px 10px' }}>
        {filteredMarkets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 30, color: C.text3, fontSize: 12 }}>
            No hay mercados disponibles en esta categoría
          </div>
        ) : (
          filteredMarkets.map(market => <Accordion key={market.id} market={market} />)
        )}
      </div>
    </div>
  );
}

window.BettingMarketsView = BettingMarketsView;
