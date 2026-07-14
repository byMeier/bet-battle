
// Friends screen — add friends, invite to tables, manage friend list

const MOCK_FRIENDS = [
{ id: 1, name: 'CryptoKing_99', avatar: '#6C5CE7', online: true, level: 15, winRate: 72 },
{ id: 2, name: 'BetMaster_AR', avatar: '#3EAF84', online: true, level: 10, winRate: 65 },
{ id: 3, name: 'SharkBets', avatar: '#E17055', online: false, level: 8, winRate: 58 },
{ id: 4, name: 'LuckyDraw22', avatar: '#FDCB6E', online: true, level: 14, winRate: 61 },
{ id: 5, name: 'ProGambler', avatar: '#A29BFE', online: false, level: 7, winRate: 55 },
{ id: 6, name: 'NightOwlBet', avatar: '#FF7675', online: false, level: 9, winRate: 48 }];

window.MOCK_FRIENDS = MOCK_FRIENDS;


const FRIEND_REQUESTS = [
{ id: 101, name: 'NewChallenger', avatar: '#74B9FF', level: 4 },
{ id: 102, name: 'BetRookie_X', avatar: '#FD79A8', level: 2 }];

window.FRIEND_REQUESTS = FRIEND_REQUESTS;


function FriendsScreen({ onInviteToTable, onNavigate }) {
  const [tab, setTab] = React.useState('friends');
  const [searchText, setSearchText] = React.useState('');
  const [friends, setFriends] = React.useState(() => [...MOCK_FRIENDS]);
  const [requests, setRequests] = React.useState(() => [...FRIEND_REQUESTS]);
  const [showInviteModal, setShowInviteModal] = React.useState(null);
  const [inviteSent, setInviteSent] = React.useState({});

  const tabs = [
  { id: 'friends', label: 'Amigos', count: friends.length },
  { id: 'requests', label: 'Solicitudes', count: requests.length },
  { id: 'search', label: 'Buscar' }];


  const onlineFriends = friends.filter((f) => f.online);
  const offlineFriends = friends.filter((f) => !f.online);

  const acceptRequest = (id) => {
    const req = requests.find((r) => r.id === id);
    if (req) {
      const newFriend = { ...req, online: false, winRate: 50 };
      setFriends((prev) => [...prev, newFriend]);
      setRequests((prev) => prev.filter((r) => r.id !== id));
      // Persist to global arrays so data survives remount
      if (!MOCK_FRIENDS.find((f) => f.id === req.id)) {
        MOCK_FRIENDS.push(newFriend);
      }
      // Remove from global requests
      const idx = FRIEND_REQUESTS.findIndex((r) => r.id === id);
      if (idx !== -1) FRIEND_REQUESTS.splice(idx, 1);
    }
  };

  const sendInvite = (friendId) => {
    setInviteSent((prev) => ({ ...prev, [friendId]: true }));
    setTimeout(() => setShowInviteModal(null), 800);
  };

  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', margin: '10px 12px', background: C.card, borderRadius: 16, padding: 3 }}>
        {tabs.map((t) =>
        <button key={t.id} onClick={() => setTab(t.id)} style={{
          flex: 1, padding: '9px 6px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          background: tab === t.id ? C.accent : 'transparent',
          color: tab === t.id ? '#fff' : C.text3, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, borderRadius: "12px"
        }}>
            {t.label}
            {t.count > 0 &&
          <span style={{
            fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 16,
            background: tab === t.id ? 'rgba(255,255,255,0.2)' : `${C.accent}25`,
            color: tab === t.id ? '#fff' : C.accentLight
          }}>{t.count}</span>
          }
          </button>
        )}
      </div>

      {/* Friends list */}
      {tab === 'friends' &&
      <div style={{ padding: '0 12px' }}>
          {/* Online */}
          {onlineFriends.length > 0 &&
        <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8, padding: '4px 0' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }}></span>
                <span style={{ ...{ fontSize: 11, fontWeight: 700, color: C.text2 }, color: "rgb(255, 255, 255)" }}>En línea — {onlineFriends.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
                {onlineFriends.map((f) =>
            <FriendRow key={f.id} friend={f} onInvite={() => setShowInviteModal(f)} />
            )}
              </div>
            </div>
        }

          {/* Offline */}
          {offlineFriends.length > 0 &&
        <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8, padding: '4px 0' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.text3 }}></span>
                <span style={{ ...{ fontSize: 11, fontWeight: 700, color: C.text3 }, color: "rgb(255, 255, 255)" }}>Desconectados — {offlineFriends.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {offlineFriends.map((f) =>
            <FriendRow key={f.id} friend={f} onInvite={() => setShowInviteModal(f)} />
            )}
              </div>
            </div>
        }

          {/* Create private table CTA */}
          <button onClick={() => onNavigate && onNavigate('createTable')} style={{
          width: '100%', marginTop: 16, padding: '14px', borderRadius: 16,
          background: `linear-gradient(135deg, ${C.accentLight}15, ${C.accent}10)`,
          border: `1px solid ${C.accent}30`, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
            <div style={{
            width: 40, height: 40, borderRadius: 16,
            background: `${C.accent}20`, display: 'flex',
            alignItems: 'center', justifyContent: 'center'
          }}>
              <img src="assets/amigos-icon.svg" width={22} height={22} style={{ objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(45%) sepia(80%) saturate(400%) hue-rotate(160deg) brightness(95%) contrast(90%)' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text1 }}>Crear Partida con Amigos</div>
              <div style={{ fontSize: 10, color: C.text3, marginTop: 2 }}>Invita a tus amigos a una partida privada</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <path d="M7 4L13 10L7 16" stroke={C.text3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      }

      {/* Requests */}
      {tab === 'requests' &&
      <div style={{ padding: '0 12px' }}>
          {requests.length === 0 &&
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <Icon name="users" size={32} color={C.text3} />
              <div style={{ fontSize: 13, color: C.text3, marginTop: 10 }}>No hay solicitudes pendientes</div>
            </div>
        }
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {requests.map((req) =>
          <div key={req.id} style={{
            padding: '10px 14px', background: C.card, borderRadius: 16,
            display: 'flex', alignItems: 'center', gap: 10
          }}>
                <div style={{
              width: 36, height: 36, borderRadius: 16, background: req.avatar,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: '#fff', fontWeight: 700
            }}>{req.name.slice(0, 2).toUpperCase()}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>{req.name}</div>
                  <div style={{ fontSize: 10, color: C.text3, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Icon name="shield" size={9} color={C.text3} /> Nivel {req.level}
                  </div>
                </div>
                <button onClick={() => acceptRequest(req.id)} style={{
              padding: '6px 12px', fontSize: 10, fontWeight: 700,
              background: C.accent, color: '#fff', border: 'none', cursor: 'pointer', borderRadius: "12px"
            }}>Aceptar</button>
                <button onClick={() => { setRequests((prev) => prev.filter((r) => r.id !== req.id)); const idx = FRIEND_REQUESTS.findIndex((r) => r.id === req.id); if (idx !== -1) FRIEND_REQUESTS.splice(idx, 1); }} style={{
              padding: '6px 10px', fontSize: 10, fontWeight: 700,
              background: C.card, color: C.text3, border: `1px solid ${C.border}`, cursor: 'pointer', borderRadius: "8px"
            }}>✕</button>
              </div>
          )}
          </div>
        </div>
      }

      {/* Search */}
      {tab === 'search' &&
      <div style={{ padding: '0 12px' }}>
          <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
          background: C.card, borderRadius: 16, marginBottom: 12
        }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.text3} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar jugador por nombre..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 13, color: C.text1, fontFamily: 'inherit'
            }} />
          
          </div>
          {searchText.length > 2 &&
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Mock search results */}
              {[
          { id: 201, name: `${searchText}_Player`, avatar: '#81ECEC', level: 6, online: true },
          { id: 202, name: `Pro_${searchText}`, avatar: '#E17055', level: 11, online: false }].
          map((result) =>
          <div key={result.id} style={{
            padding: '10px 14px', background: C.card, borderRadius: 16,
            display: 'flex', alignItems: 'center', gap: 10
          }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                width: 36, height: 36, borderRadius: 16, background: result.avatar,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: '#fff', fontWeight: 700
              }}>{result.name.slice(0, 2).toUpperCase()}</div>
                    <span style={{
                position: 'absolute', bottom: -1, right: -1, width: 8, height: 8,
                borderRadius: '50%', background: result.online ? C.green : C.text3,
                border: `2px solid ${C.card}`
              }}></span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>{result.name}</div>
                    <div style={{ fontSize: 10, color: C.text3 }}>Nivel {result.level}</div>
                  </div>
                  <button style={{
              padding: '6px 12px', borderRadius: 6, fontSize: 10, fontWeight: 700,
              background: `${C.accent}20`, color: C.accentLight,
              border: `1px solid ${C.accent}40`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 3
            }}>
                    <Icon name="user" size={10} color={C.accentLight} /> Agregar
                  </button>
                </div>
          )}
            </div>
        }
          {searchText.length <= 2 && searchText.length > 0 &&
        <div style={{ textAlign: 'center', padding: 20, color: C.text3, fontSize: 12 }}>Escribe al menos 3 caracteres</div>
        }
          {searchText.length === 0 &&
        <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <Icon name="users" size={28} color={C.text3} />
              <div style={{ fontSize: 12, color: C.text3, marginTop: 8 }}>Busca jugadores para agregarlos como amigos</div>
            </div>
        }
        </div>
      }

      {/* Invite modal */}
      {showInviteModal &&
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50
      }} onClick={() => setShowInviteModal(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{
          width: '100%', maxWidth: 393, background: C.bgLight, borderRadius: '16px 16px 0 0',
          padding: '20px 16px 28px', borderTop: `1px solid ${C.border}`
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.text1 }}>Invitar a {showInviteModal.name}</span>
              <button onClick={() => setShowInviteModal(null)} style={{ background: 'none', border: 'none', color: C.text3, fontSize: 16, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: C.card, borderRadius: 16, marginBottom: 14 }}>
              <div style={{
              width: 40, height: 40, borderRadius: 16, background: showInviteModal.avatar,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: '#fff', fontWeight: 700
            }}>{showInviteModal.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text1 }}>{showInviteModal.name}</div>
                <div style={{ fontSize: 10, color: C.text3 }}>Nivel {showInviteModal.level} · Win Rate {showInviteModal.winRate}%</div>
              </div>
              {showInviteModal.online && <span style={{ marginLeft: 'auto', fontSize: 9, color: C.green, fontWeight: 600, background: `${C.green}15`, padding: '2px 6px', borderRadius: "8px" }}>Online</span>}
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: C.text2, marginBottom: 8 }}>Invitar a partida:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              {TABLES.filter((t) => t.players < t.maxPlayers).slice(0, 3).map((table) => {
              const sent = inviteSent[`${showInviteModal.id}-${table.id}`];
              return (
                <div key={table.id} style={{
                  padding: '10px 12px', background: C.card, borderRadius: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.text1 }}>{table.title || `Partida #${table.id}`}</div>
                      <div style={{ fontSize: 10, color: C.text3 }}>{table.players}/{table.maxPlayers} jugadores · {table.timeLeft}</div>
                    </div>
                    <button onClick={() => sendInvite(`${showInviteModal.id}-${table.id}`)} disabled={sent} style={{
                    padding: '6px 12px', fontSize: 10, fontWeight: 700,
                    background: sent ? `${C.green}15` : C.accent, color: sent ? C.green : '#fff',
                    border: 'none', cursor: sent ? 'default' : 'pointer', borderRadius: "8px"
                  }}>{sent ? '✓ Enviada' : 'Invitar'}</button>
                  </div>);

            })}
            </div>

            <button onClick={() => {setShowInviteModal(null);onNavigate && onNavigate('tables');}} style={{
            width: '100%', padding: '12px', borderRadius: 16, fontSize: 13, fontWeight: 700,
            background: `${C.accent}15`, color: C.accentLight,
            border: `1px solid ${C.accent}30`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
          }}>
              <Icon name="users" size={14} color={C.accentLight} /> Crear Partida Privada con {showInviteModal.name}
            </button>
          </div>
        </div>
      }
    </div>);

}

function FriendRow({ friend, onInvite }) {
  return (
    <div style={{
      background: C.card, borderRadius: 16,
      display: 'flex', alignItems: 'center', gap: 10, padding: "10px 14px 12px", margin: "0px"
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 16, background: friend.avatar,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, color: '#fff', fontWeight: 700,
          opacity: friend.online ? 1 : 0.6
        }}>{friend.name.slice(0, 2).toUpperCase()}</div>
        <span style={{
          position: 'absolute', bottom: -1, right: -1, width: 8, height: 8,
          borderRadius: '50%', background: friend.online ? C.green : C.text3,
          border: `2px solid ${C.card}`
        }}></span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ ...{ fontSize: 13, fontWeight: 600, color: friend.online ? C.text1 : C.text2 }, color: "rgba(255, 255, 255, 0.8)" }}>{friend.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 10, color: C.text3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Icon name="shield" size={9} color={C.text3} /> Lvl {friend.level}
          </span>
          <span style={{ fontSize: 10, color: C.text3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Icon name="percent" size={9} color={C.text3} /> {friend.winRate}%
          </span>
        </div>
      </div>
      {friend.online &&
      <button onClick={onInvite} style={{
        padding: '6px 12px', fontSize: 10, fontWeight: 700,
        background: `${C.green}15`, color: C.green,
        border: `1px solid ${C.green}30`, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 3, borderRadius: "12px"
      }}>
          <Icon name="zap" size={10} color={C.green} /> Invitar
        </button>
      }
    </div>);

}

window.FriendsScreen = FriendsScreen;