
// Profile screen v2 — new icons, match history with search/filter/pagination,
// avatar change modal with crop preview, name edit modal with pencil icon

// ─── Sport label helper ───
function getSportLabel(sport) {
  const labels = { football: 'Fútbol', basketball: 'Basket', tennis: 'Tenis', free: 'Libre' };
  return labels[sport] || 'Libre';
}
function getSportColor(sport) {
  return SPORT_COLORS[sport] || SPORT_COLORS.quick;
}

// ─── Match History Card (minimized notification style) ───
function MatchHistoryCard({ match, onTap }) {
  const won = match.won;
  const posColor = match.position <= 3 ? C.yellow : C.text2;
  const sportColor = getSportColor(match.sport);
  const sportLabel = getSportLabel(match.sport);

  // Format date
  const d = new Date(match.timestamp);
  const day = d.getDate().toString().padStart(2, '0');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const dateStr = day + ' ' + months[d.getMonth()];

  return (
    <div onClick={() => onTap && onTap(match)} style={{
      background: C.card, borderRadius: 12, padding: '10px 12px',
      display: 'flex', alignItems: 'center', gap: 10,
      cursor: 'pointer', border: '1px solid ' + C.border,
      transition: 'background 0.15s'
    }}>
      {/* Icon — sport-specific */}
      {(() => {
        const isTournament = match.type === 'tournament';
        const tournamentIcons = { champions: 'assets/champions-2.svg', worldcup: 'assets/mundial.svg' };
        const tournamentBgs = { champions: '#021549', worldcup: '#090909' };
        const hasCustomLogo = isTournament && match.tournamentLogo && tournamentIcons[match.tournamentLogo];

        if (hasCustomLogo) {
          return (
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: tournamentBgs[match.tournamentLogo] || C.yellow + '15',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: won ? 1 : 0.55
            }}>
              <img src={tournamentIcons[match.tournamentLogo]} width={18} height={18} style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
            </div>);

        }

        // Sport icon (rapid or tournament without custom logo)
        const iconColor = won ? sportColor : C.text3;
        return (
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: sportColor + (won ? '15' : '08'),
            border: '1px solid ' + sportColor + (won ? '25' : '12'),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: won ? 1 : 0.6
          }}>
            <SportIcon sport={match.sport === 'free' ? 'quick' : match.sport} size={18} color={iconColor} />
          </div>);

      })()}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.text1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            {match.tableName}
          </span>
          <span style={{ fontSize: 9, color: C.text3, flexShrink: 0 }}>{dateStr}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 8, fontWeight: 700, padding: '1px 6px', borderRadius: 20,
            background: (match.type === 'tournament' ? C.yellow : sportColor) + '18',
            color: match.type === 'tournament' ? C.yellow : sportColor,
            textTransform: 'uppercase'
          }}>
            {match.type === 'tournament' ? 'Torneo' : sportLabel}
          </span>
          <span style={{ fontSize: 10, color: C.text3 }}>${match.entry} entrada</span>
          <span style={{ fontSize: 10, color: C.text3 }}>·</span>
          <span style={{ fontSize: 10, color: C.text3 }}>{match.resultData.totalPlayers} jug.</span>
        </div>
      </div>

      {/* Result */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: posColor }}>#{match.position}</div>
        <div style={{
          fontSize: 12, fontWeight: 800,
          color: won ? C.green : C.red,
          fontVariantNumeric: 'tabular-nums'
        }}>
          {won ? '+' : '-'}${match.amount}
        </div>
      </div>

      {/* Chevron */}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
    </div>);

}

// ─── Match History Section ───
function MatchHistorySection({ onViewDetail }) {
  const [search, setSearch] = React.useState('');
  const [filterResult, setFilterResult] = React.useState('all'); // all | won | lost
  const [filterType, setFilterType] = React.useState('all'); // all | rapid | tournament
  const [filterSport, setFilterSport] = React.useState('all'); // all | football | basketball | tennis | free
  const [showFilters, setShowFilters] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const PAGE_SIZE = 10;

  // Filter
  let filtered = [...MATCH_HISTORY];

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter((m) => m.tableName.toLowerCase().includes(q));
  }
  if (filterResult === 'won') filtered = filtered.filter((m) => m.won);
  if (filterResult === 'lost') filtered = filtered.filter((m) => !m.won);
  if (filterType === 'rapid') filtered = filtered.filter((m) => m.type === 'rapid');
  if (filterType === 'tournament') filtered = filtered.filter((m) => m.type === 'tournament');
  if (filterSport !== 'all') filtered = filtered.filter((m) => m.sport === filterSport);

  // Sort by timestamp desc
  filtered.sort((a, b) => b.timestamp - a.timestamp);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const paged = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const activeFilterCount = (filterResult !== 'all' ? 1 : 0) + (filterType !== 'all' ? 1 : 0) + (filterSport !== 'all' ? 1 : 0);

  const handleTap = (match) => {
    // Build a notification-like object for the detail modal
    const notif = {
      type: 'result',
      tableName: match.tableName,
      position: match.position,
      amount: match.amount,
      won: match.won,
      resultData: match.resultData,
      body: match.tableName
    };
    if (onViewDetail) onViewDetail(notif);
  };

  // Filter pill component
  const FilterPill = ({ label, value, active, onClick }) =>
  <button onClick={onClick} style={{
    padding: '5px 10px', fontSize: 10, fontWeight: active ? 700 : 500,
    background: active ? 'rgba(255,255,255,0.15)' : C.bgLight,
    color: active ? '#fff' : C.text3,
    border: active ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
    borderRadius: 20, cursor: 'pointer', whiteSpace: 'nowrap'
  }}>{label}</button>;


  return (
    <div style={{ marginTop: 18 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
        <img src="assets/clock-new.svg" width={15} height={15} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: C.text1, flex: 1 }}>Historial de Partidas</span>
        <span style={{ fontSize: 10, color: C.text3 }}>{MATCH_HISTORY.length} partidas</span>
      </div>

      {/* Search bar */}
      <div style={{ ...{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
          background: C.bgLight, borderRadius: 10, padding: '8px 10px',
          border: '1px solid ' + C.border
        }, background: "rgb(23, 28, 31)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={search}
          onChange={(e) => {setSearch(e.target.value);setPage(0);}}
          placeholder="Buscar partida..."
          style={{
            flex: 1, background: 'none', border: 'none', outline: 'none',
            fontSize: 12, color: C.text1, fontFamily: 'Inter, sans-serif'
          }} />
        
        {search &&
        <button onClick={() => {setSearch('');setPage(0);}} style={{
          background: 'none', border: 'none', color: C.text3, cursor: 'pointer',
          padding: 0, fontSize: 14, lineHeight: 1
        }}>✕</button>
        }

        {/* Filter toggle */}
        <button onClick={() => setShowFilters(!showFilters)} style={{
          background: activeFilterCount > 0 ? 'rgba(255,255,255,0.15)' : 'none',
          border: activeFilterCount > 0 ? '1px solid rgba(255,255,255,0.25)' : 'none',
          color: activeFilterCount > 0 ? '#fff' : C.text3,
          cursor: 'pointer', padding: '2px 6px', borderRadius: 6,
          display: 'flex', alignItems: 'center', gap: 3,
          fontSize: 10, fontWeight: 600
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="10" y1="18" x2="14" y2="18" />
          </svg>
          {activeFilterCount > 0 && activeFilterCount}
        </button>
      </div>

      {/* Filter section — floating dropdown */}
      <div style={{ position: 'relative' }}>
      {showFilters &&
        <div style={{
          position: 'absolute', top: 0, right: 0, zIndex: 50,
          width: 'auto',
          background: C.bgLight, borderRadius: 12, padding: '10px 12px',
          border: '1px solid ' + C.border,
          boxShadow: '0 8px 24px rgba(0,0,0,0.45)'
        }}>
          {/* Result filter */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: C.text3, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Resultado</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <FilterPill label="Todas" active={filterResult === 'all'} onClick={() => {setFilterResult('all');setPage(0);setShowFilters(false);}} />
              <FilterPill label="Victorias" active={filterResult === 'won'} onClick={() => {setFilterResult('won');setPage(0);setShowFilters(false);}} />
              <FilterPill label="Derrotas" active={filterResult === 'lost'} onClick={() => {setFilterResult('lost');setPage(0);setShowFilters(false);}} />
            </div>
          </div>

          {/* Type filter */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: C.text3, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Tipo</div>
            <div style={{ display: 'flex', gap: 4 }}>
              <FilterPill label="Todas" active={filterType === 'all'} onClick={() => {setFilterType('all');setPage(0);setShowFilters(false);}} />
              <FilterPill label="Rápida" active={filterType === 'rapid'} onClick={() => {setFilterType('rapid');setPage(0);setShowFilters(false);}} />
              <FilterPill label="Torneo" active={filterType === 'tournament'} onClick={() => {setFilterType('tournament');setPage(0);setShowFilters(false);}} />
            </div>
          </div>

          {/* Sport filter */}
          <div>
            <div style={{ fontSize: 9, color: C.text3, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Deporte</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <FilterPill label="Todos" active={filterSport === 'all'} onClick={() => {setFilterSport('all');setPage(0);setShowFilters(false);}} />
              <FilterPill label="Fútbol" active={filterSport === 'football'} onClick={() => {setFilterSport('football');setPage(0);setShowFilters(false);}} />
              <FilterPill label="Basket" active={filterSport === 'basketball'} onClick={() => {setFilterSport('basketball');setPage(0);setShowFilters(false);}} />
              <FilterPill label="Tenis" active={filterSport === 'tennis'} onClick={() => {setFilterSport('tennis');setPage(0);setShowFilters(false);}} />
              <FilterPill label="Libre" active={filterSport === 'free'} onClick={() => {setFilterSport('free');setPage(0);setShowFilters(false);}} />
            </div>
          </div>

          {/* Clear filters */}
          {activeFilterCount > 0 &&
          <button onClick={() => {setFilterResult('all');setFilterType('all');setFilterSport('all');setPage(0);setShowFilters(false);}} style={{
            marginTop: 8, background: 'none', border: 'none', color: '#fff',
            fontSize: 10, fontWeight: 600, cursor: 'pointer', padding: 0
          }}>Limpiar filtros</button>
          }
        </div>
        }
      </div>

      {/* Results list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {paged.length === 0 ?
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 12, color: C.text3 }}>No se encontraron partidas</div>
          </div> :

        paged.map((m) =>
        <MatchHistoryCard key={m.id} match={m} onTap={handleTap} />
        )
        }
      </div>

      {/* Pagination */}
      {totalPages > 1 &&
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 8, marginTop: 12, paddingBottom: 8
      }}>
          <button
          onClick={() => setPage(Math.max(0, safePage - 1))}
          disabled={safePage === 0}
          style={{
            width: 30, height: 30, borderRadius: 8,
            background: safePage === 0 ? C.bgLight : C.card,
            border: '1px solid ' + C.border,
            color: safePage === 0 ? C.text3 + '50' : C.text2,
            cursor: safePage === 0 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
          
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          {Array.from({ length: totalPages }).map((_, i) =>
        <button key={i} onClick={() => setPage(i)} style={{
          width: 30, height: 30, borderRadius: 8, fontSize: 11, fontWeight: 700,
          background: i === safePage ? C.accent : C.card,
          color: i === safePage ? '#fff' : C.text2,
          border: i === safePage ? 'none' : '1px solid ' + C.border,
          cursor: 'pointer'
        }}>{i + 1}</button>
        )}

          <button
          onClick={() => setPage(Math.min(totalPages - 1, safePage + 1))}
          disabled={safePage >= totalPages - 1}
          style={{
            width: 30, height: 30, borderRadius: 8,
            background: safePage >= totalPages - 1 ? C.bgLight : C.card,
            border: '1px solid ' + C.border,
            color: safePage >= totalPages - 1 ? C.text3 + '50' : C.text2,
            cursor: safePage >= totalPages - 1 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
          
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      }
    </div>);

}

// ─── Avatar Change Modal ───
function AvatarChangeModal({ open, onClose, onConfirm, currentAvatar, currentName }) {
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [step, setStep] = React.useState('choose'); // choose | preview
  const fileInputRef = React.useRef(null);
  const cameraInputRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setPreviewUrl(null);
      setStep('choose');
    }
  }, [open]);

  const handleFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreviewUrl(ev.target.result);
      setStep('preview');
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (onConfirm && previewUrl) onConfirm(previewUrl);
    onClose();
  };

  if (!open) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 210, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)'
      }}></div>

      <div style={{
        position: 'relative', zIndex: 1, background: C.bgLight,
        borderRadius: '20px 20px 0 0',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }}></div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 16px 14px', borderBottom: '1px solid ' + C.border }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: C.text1 }}>Cambiar foto de perfil</span>
          <button onClick={onClose} style={{ background: C.card, border: 'none', color: C.text3, width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ padding: '20px 16px 24px' }}>
          {step === 'choose' ?
          <React.Fragment>
              {/* Current avatar preview */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{
                width: 80, height: 80, borderRadius: '50%', margin: '0 auto 10px',
                background: typeof currentAvatar === 'string' && currentAvatar.startsWith('#') ? currentAvatar : C.accent,
                backgroundImage: typeof currentAvatar === 'string' && !currentAvatar.startsWith('#') ? `url(${currentAvatar})` : 'none',
                backgroundSize: 'cover', backgroundPosition: 'center',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, color: '#fff', fontWeight: 700,
                border: '3px solid ' + C.border
              }}>
                  {typeof currentAvatar === 'string' && currentAvatar.startsWith('#') && (currentName || 'PL').slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontSize: 11, color: C.text3 }}>Foto actual</div>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px',
                background: C.card, border: '1px solid ' + C.border, borderRadius: 14,
                cursor: 'pointer', width: '100%', textAlign: 'left'
              }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accentLight} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>Subir desde dispositivo</div>
                    <div style={{ fontSize: 10, color: C.text3 }}>Seleccionar un archivo de tu galería</div>
                  </div>
                </button>

                <button onClick={() => cameraInputRef.current && cameraInputRef.current.click()} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px',
                background: C.card, border: '1px solid ' + C.border, borderRadius: 14,
                cursor: 'pointer', width: '100%', textAlign: 'left'
              }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.green + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>Sacar una foto</div>
                    <div style={{ fontSize: 10, color: C.text3 }}>Usar la cámara de tu dispositivo</div>
                  </div>
                </button>
              </div>

              {/* Hidden inputs */}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileSelect} style={{ display: 'none' }} />
            </React.Fragment> :

          <React.Fragment>
              {/* Preview with circular crop */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: C.text3, marginBottom: 12 }}>Vista previa</div>
                <div style={{
                width: 120, height: 120, borderRadius: '50%', margin: '0 auto',
                overflow: 'hidden', border: '3px solid ' + C.accent,
                boxShadow: '0 0 0 6px ' + C.accent + '15'
              }}>
                  <img src={previewUrl} style={{
                  width: '100%', height: '100%', objectFit: 'cover'
                }} />
                </div>
              </div>

              {/* Confirm / cancel */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => {setStep('choose');setPreviewUrl(null);}} style={{
                flex: 1, padding: '13px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                background: C.card, color: C.text2, border: '1px solid ' + C.border, cursor: 'pointer'
              }}>Volver</button>
                <button onClick={handleConfirm} style={{
                flex: 2, padding: '13px', borderRadius: 12, fontSize: 13, fontWeight: 700,
                background: C.accent, color: '#fff', border: 'none', cursor: 'pointer'
              }}>Confirmar foto</button>
              </div>
            </React.Fragment>
          }
        </div>
      </div>
    </div>);

}

// ─── Name Edit Modal ───
function NameEditModal({ open, onClose, currentName, onSave }) {
  const [name, setName] = React.useState(currentName || '');
  const MAX_LEN = 20;

  React.useEffect(() => {
    if (open) setName(currentName || '');
  }, [open, currentName]);

  if (!open) return null;

  const isValid = name.trim().length > 0 && name.length <= MAX_LEN;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 210, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)'
      }}></div>

      <div style={{
        position: 'relative', zIndex: 1, background: C.bgLight,
        borderRadius: 20, width: 'calc(100% - 48px)', maxWidth: 340,
        padding: '24px 20px'
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text1, marginBottom: 4 }}>Editar nombre</div>
        <div style={{ fontSize: 11, color: C.text3, marginBottom: 16 }}>Máximo {MAX_LEN} caracteres</div>

        <div style={{
          display: 'flex', alignItems: 'center',
          background: C.card, borderRadius: 12, padding: '12px 14px',
          border: '1px solid ' + (name.length > MAX_LEN ? C.red : C.border),
          marginBottom: 6
        }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, MAX_LEN + 5))}
            maxLength={MAX_LEN + 5}
            autoFocus
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 14, color: C.text1, fontWeight: 600,
              fontFamily: 'Inter, sans-serif'
            }}
            onKeyDown={(e) => {if (e.key === 'Enter' && isValid) {onSave(name.trim());onClose();}}} />
          
        </div>
        <div style={{
          fontSize: 10, fontWeight: 600, textAlign: 'right', marginBottom: 16,
          color: name.length > MAX_LEN ? C.red : C.text3
        }}>
          {name.length}/{MAX_LEN}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '12px', borderRadius: 12, fontSize: 13, fontWeight: 700,
            background: C.card, color: C.text2, border: '1px solid ' + C.border, cursor: 'pointer'
          }}>Cancelar</button>
          <button onClick={() => {if (isValid) {onSave(name.trim());onClose();}}} disabled={!isValid} style={{
            flex: 2, padding: '12px', borderRadius: 12, fontSize: 13, fontWeight: 700,
            background: isValid ? C.accent : C.card, color: isValid ? '#fff' : C.text3,
            border: 'none', cursor: isValid ? 'pointer' : 'default',
            opacity: isValid ? 1 : 0.5
          }}>Guardar</button>
        </div>
      </div>
    </div>);

}


// ─── ProfileScreen v2 ───
function ProfileScreen({ onViewMatchDetail }) {
  const [avatarUrl, setAvatarUrl] = React.useState(null);
  const [userName, setUserName] = React.useState(USER_PROFILE.name);
  const [avatarModalOpen, setAvatarModalOpen] = React.useState(false);
  const [nameModalOpen, setNameModalOpen] = React.useState(false);
  const p = USER_PROFILE;

  const currentAvatar = avatarUrl || p.avatar;

  const stats = [
  { label: 'Victorias', value: p.wins, color: C.green, icon: 'cup3' },
  { label: 'Derrotas', value: p.losses, color: C.red, iconType: 'svg' },
  { label: 'Win Rate', value: p.winRate + '%', color: C.text1, iconType: 'svg' },
  { label: 'Ganancias', value: p.totalEarnings.toFixed(0), color: C.green, iconType: 'svg' }];


  return (
    <div style={{ padding: '20px 14px' }}>
      {/* Avatar + Name section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 22 }}>
        {/* Avatar — tappable */}
        <div
          onClick={() => setAvatarModalOpen(true)}
          style={{
            position: 'relative', cursor: 'pointer', marginBottom: 10
          }}>
          
          <div style={{
            width: 68, height: 68, borderRadius: 16,
            background: typeof currentAvatar === 'string' && currentAvatar.startsWith('#') ? currentAvatar : C.accent,
            backgroundImage: typeof currentAvatar === 'string' && !currentAvatar.startsWith('#') ? `url(${currentAvatar})` : 'none',
            backgroundSize: 'cover', backgroundPosition: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: '#fff', fontWeight: 700
          }}>
            {typeof currentAvatar === 'string' && currentAvatar.startsWith('#') && userName.slice(0, 2).toUpperCase()}
          </div>
          {/* Camera overlay badge */}
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 22, height: 22, borderRadius: '50%',
            background: C.accent, border: '2px solid ' + C.bgLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        </div>

        {/* Name + pencil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text1 }}>{userName}</div>
          <button onClick={() => setNameModalOpen(true)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.8
          }}>
            <img src="assets/pencil.svg" width={14} height={14} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
          </button>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          <span style={{ padding: '3px 10px', fontSize: 10, fontWeight: 700, background: C.yellow + '18', color: C.yellow, borderRadius: 16 }}>{p.rank}</span>
          <span style={{ padding: '3px 10px', fontSize: 10, fontWeight: 700, background: C.card, color: C.text2, borderRadius: 16 }}>Nivel {p.level}</span>
        </div>
      </div>

      {/* Balance card */}
      <div style={{ padding: '14px', background: C.card, textAlign: 'center', marginBottom: 16, borderRadius: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <img src="assets/wallet-new.svg" width={13} height={13} style={{ objectFit: 'contain', opacity: 0.5 }} />
          <span style={{ fontSize: 10, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>Balance</span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: C.text1, margin: '4px 0 10px' }}>${p.balance.toFixed(2)}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button style={{
            padding: '8px 20px', fontSize: 12, fontWeight: 700,
            background: C.accent, color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4, borderRadius: 16
          }}>
            <img src="assets/deposit-new.svg" width={14} height={14} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            Depositar
          </button>
          <button style={{
            padding: '8px 20px', fontSize: 12, fontWeight: 700,
            background: C.card, color: C.text1, border: '1px solid ' + C.border, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4, borderRadius: 16
          }}>
            <img src="assets/export-new.svg" width={14} height={14} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            Retirar
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {stats.map((s) =>
        <div key={s.label} style={{ padding: '12px', background: C.card, textAlign: 'center', borderRadius: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 3 }}>
              {s.icon === 'cup3' ?
            <img src="assets/cup-new.svg" width={12} height={12} style={{ objectFit: 'contain' }} /> :

            <Icon
              name={s.label === 'Derrotas' ? 'arrowDown' : s.label === 'Win Rate' ? 'percent' : 'chart'}
              size={11}
              color={s.color} />

            }
              <span style={{ fontSize: 10, color: C.text3, textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        )}
      </div>

      {/* Match History */}
      <MatchHistorySection onViewDetail={onViewMatchDetail} />

      {/* Modals */}
      <AvatarChangeModal
        open={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        onConfirm={(url) => setAvatarUrl(url)}
        currentAvatar={currentAvatar}
        currentName={userName} />
      
      <NameEditModal
        open={nameModalOpen}
        onClose={() => setNameModalOpen(false)}
        currentName={userName}
        onSave={(newName) => {setUserName(newName);USER_PROFILE.name = newName;}} />
      
    </div>);

}

window.MatchHistoryCard = MatchHistoryCard;
window.MatchHistorySection = MatchHistorySection;
window.AvatarChangeModal = AvatarChangeModal;
window.NameEditModal = NameEditModal;
window.ProfileScreen = ProfileScreen;