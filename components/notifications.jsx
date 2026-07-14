
// Notifications panel — bottom sheet with grouped notifications, swipe-to-delete, inline actions, clickable items

// ─── Bell icon from notification-linear.svg ───
function NotifBellSvg({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none">
      <path d="M256.427 437.973C206.72 437.973 157.013 430.08 109.867 414.293C91.9467 408.107 78.2934 395.52 72.3201 379.093C66.1334 362.667 68.2667 344.533 78.0801 328.32L102.613 287.573C107.733 279.04 112.427 261.973 112.427 251.947V190.293C112.427 110.933 177.067 46.2935 256.427 46.2935C335.787 46.2935 400.427 110.933 400.427 190.293V251.947C400.427 261.76 405.12 279.04 410.24 287.787L434.56 328.32C443.733 343.68 445.44 362.24 439.253 379.093C433.067 395.947 419.627 408.747 402.773 414.293C355.84 430.08 306.133 437.973 256.427 437.973ZM256.427 78.2935C194.773 78.2935 144.427 128.427 144.427 190.293V251.947C144.427 267.52 138.027 290.56 130.133 304L105.6 344.747C100.907 352.64 99.6267 360.96 102.4 368C104.96 375.253 111.36 380.8 120.107 383.787C209.28 413.653 303.787 413.653 392.96 383.787C400.64 381.227 406.613 375.467 409.387 367.787C412.16 360.107 411.52 351.787 407.253 344.747L382.72 304C374.613 290.133 368.427 267.307 368.427 251.733V190.293C368.427 128.427 318.293 78.2935 256.427 78.2935Z" fill={color} />
      <path d="M296.107 84.0533C294.613 84.0533 293.12 83.84 291.627 83.4133C285.44 81.7067 279.467 80.4267 273.707 79.5733C255.573 77.2267 238.08 78.5067 221.653 83.4133C215.68 85.3333 209.28 83.4133 205.227 78.9333C201.173 74.4533 199.893 68.0533 202.24 62.2933C210.987 39.8933 232.32 25.1733 256.64 25.1733C280.96 25.1733 302.293 39.68 311.04 62.2933C313.173 68.0533 312.107 74.4533 308.053 78.9333C304.853 82.3467 300.373 84.0533 296.107 84.0533Z" fill={color} />
      <path d="M256.427 486.613C235.307 486.613 214.827 478.08 199.893 463.147C184.96 448.213 176.427 427.733 176.427 406.613H208.427C208.427 419.2 213.547 431.573 222.507 440.533C231.467 449.493 243.84 454.613 256.427 454.613C282.88 454.613 304.427 433.067 304.427 406.613H336.427C336.427 450.773 300.587 486.613 256.427 486.613Z" fill={color} />
    </svg>);

}
window.NotifBellSvg = NotifBellSvg;

// ─── Notification data ───

const NOTIFICATIONS_DATA = [
// Today
{
  id: 'n1', type: 'invitation', read: false, timestamp: Date.now() - 1000 * 60 * 8,
  title: 'Invitación a partida',
  body: 'BetMaster_AR te invitó a una partida privada de Fútbol.',
  fromName: 'BetMaster_AR', fromAvatar: '#3EAF84',
  table: {
    id: 'notif-inv1', title: 'Partida Privada $25', mode: 'basic', category: 'football',
    entry: 25, prize: 237.5, timeLeft: '2h 40m', level: 2,
    players: 3, maxPlayers: 8, teams: [],
    objectives: [{ id: 'o1', text: 'Realiza al menos 3 apuestas', type: 'progress', current: 0, target: 3, points: 100, deadline: '2h' }],
    prizeDistribution: { first: 50, second: 30, third: 20 }
  }
},
{
  id: 'n2', type: 'result', read: false, timestamp: Date.now() - 1000 * 60 * 35,
  title: 'Partida terminada',
  body: 'Partida Rápida — Fútbol',
  tableName: 'Partida Rápida — Fútbol',
  position: 2, amount: 42, won: true,
  resultData: {
    entry: 10, totalPlayers: 10, duration: '2h 45m',
    leaderboard: [
    { rank: 1, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 4850 },
    { rank: 2, name: 'You', avatar: '#016394', balance: 3920, isMe: true },
    { rank: 3, name: 'SharkBets', avatar: '#E17055', balance: 3100 },
    { rank: 4, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 2400 },
    { rank: 5, name: 'ProGambler', avatar: '#A29BFE', balance: 2100 }],

    prizeDistribution: { first: 60, second: 25, third: 15 },
    totalPrize: 95
  }
},
{
  id: 'n3', type: 'streak', read: false, timestamp: Date.now() - 1000 * 60 * 60 * 2,
  title: '¡Racha de victorias!',
  body: '¡Llevas 3 victorias seguidas! Seguí así 🔥'
},
{
  id: 'n4', type: 'closing', read: false, timestamp: Date.now() - 1000 * 60 * 60 * 3,
  title: 'Partida por cerrar',
  body: 'Partida Rápida — Basket termina en 15 minutos. ¡Hacé tus últimas apuestas!',
  tableId: 3
},
// Yesterday
{
  id: 'n5', type: 'tournament', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 26,
  title: 'Nuevo torneo disponible',
  body: 'Argentina en Mundial 2026 — ¡Inscribite ahora!',
  tournamentLogo: 'worldcup', tournamentId: 6
},
{
  id: 'n6', type: 'deposit', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 28,
  title: 'Depósito acreditado',
  body: 'Se acreditaron $500.00 en tu cuenta.',
  amount: 500, isDeposit: true,
  txData: { method: 'Transferencia bancaria', ref: 'TXN-2026-00482', date: '10 May 2026, 14:22', status: 'completed' }
},
{
  id: 'n7', type: 'result', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 30,
  title: 'Partida terminada',
  body: 'Partida Rápida — Libre',
  tableName: 'Partida Rápida — Libre',
  position: 5, amount: 25, won: false,
  resultData: {
    entry: 25, totalPlayers: 10, duration: '3h 00m',
    leaderboard: [
    { rank: 1, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 5200 },
    { rank: 2, name: 'NightOwlBet', avatar: '#FF7675', balance: 4100 },
    { rank: 3, name: 'AceBetter', avatar: '#55EFC4', balance: 3800 },
    { rank: 4, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 3200 },
    { rank: 5, name: 'You', avatar: '#016394', balance: 2900, isMe: true }],

    prizeDistribution: { first: 60, second: 25, third: 15 },
    totalPrize: 237.5
  }
},
{
  id: 'n15', type: 'deposit_error', read: false, timestamp: Date.now() - 1000 * 60 * 60 * 4,
  title: 'Error en el depósito',
  body: 'No se pudo procesar tu depósito de $100.00.',
  amount: 100,
  txData: { method: 'Tarjeta de crédito', ref: 'TXN-2026-00491', date: '12 May 2026, 09:15', status: 'error', errorMsg: 'La tarjeta fue rechazada por fondos insuficientes. Verificá el saldo de tu tarjeta o probá con otro método de pago.' }
},
// This week
{
  id: 'n8', type: 'invitation', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 72,
  title: 'Invitación a partida',
  body: 'LuckyDraw22 te invitó a una partida de Basket.',
  fromName: 'LuckyDraw22', fromAvatar: '#FDCB6E',
  expired: true,
  table: {
    id: 'notif-inv2', title: 'Amigos Basket $10', mode: 'basic', category: 'basketball',
    entry: 10, prize: 57, timeLeft: '—', level: 1,
    players: 6, maxPlayers: 6, teams: [],
    objectives: [{ id: 'o1', text: 'Realiza al menos 2 apuestas', type: 'progress', current: 0, target: 2, points: 80, deadline: '2h' }],
    prizeDistribution: { first: 50, second: 30, third: 20 }
  }
},
{
  id: 'n9', type: 'tournament', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 96,
  title: 'Nuevo torneo disponible',
  body: 'Champions League 2026 — Fase de Cuartos ya abierta.',
  tournamentLogo: 'champions', tournamentId: 4
},
{
  id: 'n10', type: 'result', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 100,
  title: 'Partida terminada',
  body: 'Partida Rápida — Tenis',
  tableName: 'Partida Rápida — Tenis',
  position: 1, amount: 85, won: true,
  resultData: {
    entry: 10, totalPlayers: 10, duration: '2h 30m',
    leaderboard: [
    { rank: 1, name: 'You', avatar: '#016394', balance: 6200, isMe: true },
    { rank: 2, name: 'SharkBets', avatar: '#E17055', balance: 5100 },
    { rank: 3, name: 'ProGambler', avatar: '#A29BFE', balance: 4400 },
    { rank: 4, name: 'RiskTaker_X', avatar: '#FAB1A0', balance: 3200 },
    { rank: 5, name: 'NewPlayer01', avatar: '#DFE6E9', balance: 2800 }],

    prizeDistribution: { first: 60, second: 25, third: 15 },
    totalPrize: 95
  }
},
// This month
{
  id: 'n11', type: 'withdrawal', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 24 * 12,
  title: 'Retiro procesado',
  body: 'Se retiraron $200.00 de tu cuenta.',
  amount: 200, isDeposit: false,
  txData: { method: 'Transferencia bancaria', ref: 'TXN-2026-00397', date: '30 Abr 2026, 18:30', status: 'completed' }
},
{
  id: 'n12', type: 'result', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 24 * 15,
  title: 'Partida terminada',
  body: 'Champions League 2026 — Octavos',
  tableName: 'Champions League 2026 — Octavos',
  position: 8, amount: 35, won: false,
  resultData: {
    entry: 35, totalPlayers: 220, duration: '4d',
    leaderboard: [
    { rank: 1, name: 'SharkBets', avatar: '#E17055', balance: 9500 },
    { rank: 2, name: 'LuckyDraw22', avatar: '#FDCB6E', balance: 8200 },
    { rank: 3, name: 'ProGambler', avatar: '#A29BFE', balance: 7000 },
    { rank: 7, name: 'NightOwlBet', avatar: '#FF7675', balance: 4200 },
    { rank: 8, name: 'You', avatar: '#016394', balance: 3800, isMe: true }],

    prizeDistribution: { first: 50, second: 30, third: 20 },
    totalPrize: 7315
  }
},
// Older
{
  id: 'n13', type: 'deposit', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 24 * 35,
  title: 'Depósito acreditado',
  body: 'Se acreditaron $1,000.00 en tu cuenta.',
  amount: 1000, isDeposit: true,
  txData: { method: 'Transferencia bancaria', ref: 'TXN-2026-00201', date: '07 Abr 2026, 10:45', status: 'completed' }
},
{
  id: 'n14', type: 'result', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 24 * 40,
  title: 'Partida terminada',
  body: 'Partida Rápida — Fútbol',
  tableName: 'Partida Rápida — Fútbol',
  position: 3, amount: 18, won: true,
  resultData: {
    entry: 10, totalPlayers: 10, duration: '2h 15m',
    leaderboard: [
    { rank: 1, name: 'BetMaster_AR', avatar: '#3EAF84', balance: 5400 },
    { rank: 2, name: 'CryptoKing_99', avatar: '#6C5CE7', balance: 4700 },
    { rank: 3, name: 'You', avatar: '#016394', balance: 4100, isMe: true },
    { rank: 4, name: 'AceBetter', avatar: '#55EFC4', balance: 3200 },
    { rank: 5, name: 'RiskTaker_X', avatar: '#FAB1A0', balance: 2600 }],

    prizeDistribution: { first: 60, second: 25, third: 15 },
    totalPrize: 95
  }
},
{
  id: 'n16', type: 'withdrawal_error', read: true, timestamp: Date.now() - 1000 * 60 * 60 * 24 * 8,
  title: 'Error en el retiro',
  body: 'No se pudo procesar tu retiro de $150.00.',
  amount: 150,
  txData: { method: 'Transferencia bancaria', ref: 'TXN-2026-00445', date: '04 May 2026, 16:10', status: 'error', errorMsg: 'La cuenta bancaria ingresada no es válida. Verificá los datos de tu cuenta bancaria e intentá nuevamente.' }
}];


// ─── Helpers ───

function getTimeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'ayer';
  if (days < 7) return `hace ${days}d`;
  return `hace ${Math.floor(days / 7)}sem`;
}

function groupNotifications(notifications) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterday = today - 86400000;
  const weekAgo = today - 86400000 * 7;
  const monthAgo = today - 86400000 * 30;
  const groups = [
  { label: 'Nuevas', items: [] },
  { label: 'Hoy', items: [] },
  { label: 'Ayer', items: [] },
  { label: 'Esta semana', items: [] },
  { label: 'Este mes', items: [] },
  { label: 'Antiguas', items: [] }];

  notifications.forEach((n) => {
    // Unread notifications go to "Nuevas" regardless of timestamp
    if (!n.read) { groups[0].items.push(n); return; }
    if (n.timestamp >= today) groups[1].items.push(n);else
    if (n.timestamp >= yesterday) groups[2].items.push(n);else
    if (n.timestamp >= weekAgo) groups[3].items.push(n);else
    if (n.timestamp >= monthAgo) groups[4].items.push(n);else
    groups[5].items.push(n);
  });
  return groups.filter((g) => g.items.length > 0);
}

// ─── Notification icon per type ───

function NotificationIcon({ type, notification }) {
  const size = 36;
  const iconSize = 16;

  if (type === 'tournament' && notification.tournamentLogo) {
    const logos = { champions: 'assets/champions-2.svg', worldcup: 'assets/mundial.svg' };
    const bgs = { champions: '#021549', worldcup: '#090909' };
    return (
      <div style={{ width: size, height: size, borderRadius: 10, flexShrink: 0, background: bgs[notification.tournamentLogo] || C.yellow + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
        <img src={logos[notification.tournamentLogo]} width={20} height={20} style={{ filter: 'brightness(0) invert(1)', objectFit: 'contain' }} />
      </div>);

  }
  if (type === 'invitation' && notification.fromAvatar) {
    return (
      <div style={{ width: size, height: size, borderRadius: 10, flexShrink: 0, background: notification.fromAvatar, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700, border: '1px solid rgba(255,255,255,0.08)' }}>
        {(notification.fromName || '??').slice(0, 2).toUpperCase()}
      </div>);

  }
  if (type === 'last_longer') {
    return (
      <div style={{ width: size, height: size, borderRadius: 10, flexShrink: 0, background: C.yellow + '18', border: '1px solid ' + C.yellow + '25', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={C.yellow} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>);

  }
  const configs = {
    result: { bg: C.accent + '18', border: C.accent + '25', imgSrc: 'assets/cup-new.svg' },
    deposit: { bg: C.green + '15', border: C.green + '20', imgSrc: 'assets/deposit.svg' },
    withdrawal: { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.12)', imgSrc: 'assets/export.svg' },
    deposit_error: { bg: C.red + '15', border: C.red + '25', imgSrc: 'assets/info-circle.svg' },
    withdrawal_error: { bg: C.red + '15', border: C.red + '25', imgSrc: 'assets/info-circle.svg' },
    streak: { bg: '#F59E0B18', border: '#F59E0B25', imgSrc: 'assets/fire.svg' },
    closing: { bg: C.red + '15', border: C.red + '20', imgSrc: 'assets/clock.svg' },
    tournament: { bg: C.yellow + '15', border: C.yellow + '20', color: C.yellow, icon: 'trophy' },
    invitation: { bg: C.accent + '18', border: C.accent + '25', color: C.accentLight, icon: 'users' }
  };
  const cfg = configs[type] || configs.result;

  // SVG image-based icons
  if (cfg.imgSrc) {
    return (
      <div style={{ width: size, height: size, borderRadius: 10, flexShrink: 0, background: cfg.bg, border: '1px solid ' + cfg.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={cfg.imgSrc} width={iconSize + 2} height={iconSize + 2} style={{ objectFit: 'contain' }} />
      </div>);
  }

  return (
    <div style={{ width: size, height: size, borderRadius: 10, flexShrink: 0, background: cfg.bg, border: '1px solid ' + cfg.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={cfg.icon} size={iconSize} color={cfg.color} />
    </div>);

}

// ─── Notification item — swipeable + clickable ───

function NotificationItem({ notification, onSwipeDelete, onAcceptInvite, onDeclineInvite, onTap }) {
  const [offsetX, setOffsetX] = React.useState(0);
  const [startX, setStartX] = React.useState(null);
  const [startY, setStartY] = React.useState(null);
  const [swiping, setSwiping] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [didMove, setDidMove] = React.useState(false);
  const THRESHOLD = 80;
  const MOVE_THRESHOLD = 8;

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setSwiping(true);
    setDidMove(false);
  };
  const handleTouchMove = (e) => {
    if (startX === null) return;
    const dx = e.touches[0].clientX - startX;
    if (Math.abs(dx) > MOVE_THRESHOLD) setDidMove(true);
    if (dx < 0) setOffsetX(Math.max(dx, -140));else
    setOffsetX(0);
  };
  const handleTouchEnd = () => {
    setSwiping(false);
    if (offsetX < -THRESHOLD) {
      setDismissed(true);
      setTimeout(() => onSwipeDelete && onSwipeDelete(notification.id), 250);
    } else {
      if (!didMove && onTap) onTap(notification);
      setOffsetX(0);
    }
    setStartX(null);
    setStartY(null);
  };

  const handleMouseDown = (e) => {
    const sx = e.clientX;
    setStartX(sx);
    setSwiping(true);
    setDidMove(false);
    let moved = false;
    let lastOff = 0;
    const onMove = (ev) => {
      const dx = ev.clientX - sx;
      if (Math.abs(dx) > MOVE_THRESHOLD) moved = true;
      const off = dx < 0 ? Math.max(dx, -140) : 0;
      lastOff = off;
      setOffsetX(off);
    };
    const onUp = () => {
      setSwiping(false);
      if (lastOff < -THRESHOLD) {
        setDismissed(true);
        setTimeout(() => onSwipeDelete && onSwipeDelete(notification.id), 250);
      } else {
        if (!moved && onTap) onTap(notification);
        setOffsetX(0);
      }
      setStartX(null);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const n = notification;
  const isUnread = !n.read;
  const isError = n.type === 'deposit_error' || n.type === 'withdrawal_error';

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      opacity: dismissed ? 0 : 1,
      maxHeight: dismissed ? 0 : 300,
      transition: dismissed ? 'opacity 0.2s, max-height 0.25s 0.05s' : swiping ? 'none' : 'transform 0.2s',
      marginBottom: dismissed ? 0 : undefined
    }}>
      {/* Red delete background */}
      <div style={{ position: 'absolute', inset: 0, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px', borderRadius: 12 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </div>

      {/* Notification content */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{
          position: 'relative', zIndex: 1,
          transform: `translateX(${offsetX}px)`,
          transition: swiping ? 'none' : 'transform 0.2s ease-out',
          background: C.card,
          borderRadius: 12, padding: '12px',
          display: 'flex', gap: 10, alignItems: 'flex-start',
          borderLeft: '3px solid transparent',
          cursor: 'pointer', userSelect: 'none'
        }}>
        
        <NotificationIcon type={n.type} notification={n} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ ...{ fontSize: 12, fontWeight: 700, color: isUnread ? C.text1 : C.text2, flex: 1 }, color: "rgb(255, 255, 255)" }}>{n.title}</span>
            <span style={{ fontSize: 9, color: C.text3, flexShrink: 0, fontWeight: 500 }}>{getTimeAgo(n.timestamp)}</span>
          </div>

          <div style={{ fontSize: 11, color: C.text3, lineHeight: 1.4, marginBottom: n.type === 'result' || n.type === 'invitation' || isError || n.type === 'deposit' || n.type === 'withdrawal' ? 8 : 0 }}>
            {n.body}
          </div>

          {/* Result details */}
          {n.type === 'result' &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, padding: '6px 10px', background: C.bgLight, borderRadius: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.text2 }}>#{n.position}</span>
              <div style={{ width: 1, height: 12, background: C.border }}></div>
              <span style={{ fontSize: 12, fontWeight: 800, color: n.won ? C.green : C.red, fontVariantNumeric: 'tabular-nums' }}>
                {n.won ? '+' : '-'}${n.amount}
              </span>
              <div style={{ flex: 1 }}></div>
              <span style={{ fontSize: 9, color: C.text3 }}>Ver detalle ›</span>
            </div>
          }

          {/* Deposit/withdrawal amount */}
          {(n.type === 'deposit' || n.type === 'withdrawal') &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, padding: '4px 10px', background: C.bgLight, borderRadius: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: n.type === 'deposit' ? C.green : C.text2, fontVariantNumeric: 'tabular-nums' }}>
                {n.type === 'deposit' ? '+' : '-'}${n.amount.toLocaleString()}
              </span>
              <span style={{ fontSize: 9, color: C.text3, fontWeight: 600 }}>USD</span>
              <div style={{ flex: 1 }}></div>
              <span style={{ fontSize: 9, color: C.text3 }}>Ver detalle ›</span>
            </div>
          }

          {/* Error deposit/withdrawal */}
          {isError &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, padding: '6px 10px', background: C.red + '12', border: '1px solid ' + C.red + '25', borderRadius: 8 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.red }}>
                ${n.amount} — Error
              </span>
              <div style={{ flex: 1 }}></div>
              <span style={{ fontSize: 9, color: C.text2 }}>Ver detalle ›</span>
            </div>
          }

          {/* Invitation actions */}
          {n.type === 'invitation' && !n.expired &&
          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <button onClick={(e) => {e.stopPropagation();onDeclineInvite && onDeclineInvite(n.id);}} style={{
              flex: 1, padding: '7px', fontSize: 11, fontWeight: 700,
              background: C.bgLight, color: C.text3,
              border: '1px solid ' + C.border, cursor: 'pointer', borderRadius: 8
            }}>Rechazar</button>
              <button onClick={(e) => {e.stopPropagation();onAcceptInvite && onAcceptInvite(n);}} style={{
              flex: 2, padding: '7px', fontSize: 11, fontWeight: 700,
              background: C.accent, color: '#fff',
              border: 'none', cursor: 'pointer', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
            }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                Unirme
              </button>
            </div>
          }

          {/* Expired invitation */}
          {n.type === 'invitation' && n.expired &&
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4, padding: '4px 10px', background: C.bgLight, borderRadius: 8 }}>
              <span style={{ fontSize: 10, color: C.text3, fontWeight: 600 }}>Expirada</span>
            </div>
          }

          {/* Closing + Tournament + Streak — subtle hint */}
          {(n.type === 'closing' || n.type === 'tournament' || n.type === 'streak') &&
          <div style={{ marginTop: 6 }}>
              <span style={{ fontSize: 9, color: C.text3 }}>
                {n.type === 'closing' ? 'Ir a la partida ›' : n.type === 'tournament' ? 'Ver torneo ›' : 'Ver perfil ›'}
              </span>
            </div>
          }

          {/* Last Longer invitation */}
          {n.type === 'last_longer' && n.lastLongerData &&
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, padding: '6px 10px', background: C.yellow + '08', border: '1px solid ' + C.yellow + '15', borderRadius: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: C.text1 }}>${n.lastLongerData.entry}</span>
              <div style={{ width: 1, height: 12, background: C.border }}></div>
              <span style={{ fontSize: 10, color: n.lastLongerData.isPublic ? C.green : C.yellow, fontWeight: 600 }}>
                {n.lastLongerData.isPublic ? 'Público' : 'Privado'}
              </span>
              <div style={{ flex: 1 }}></div>
              <span style={{ fontSize: 9, color: C.text3 }}>Ver invitación ›</span>
            </div>
          }
        </div>
      </div>
    </div>);

}

// ─── Notifications panel — bottom sheet with drag-to-dismiss ───

function NotificationsPanel({ open, onClose, onAcceptInvite, onNotificationTap, notificationVersion }) {
  const [notifications, setNotifications] = React.useState([...NOTIFICATIONS_DATA]);

  // Re-sync when new notifications are added externally
  React.useEffect(() => {
    if (notificationVersion > 0) {
      setNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const newOnes = NOTIFICATIONS_DATA.filter((n) => !existingIds.has(n.id));
        if (newOnes.length > 0) return [...newOnes, ...prev];
        return prev;
      });
    }
  }, [notificationVersion]);
  const [closing, setClosing] = React.useState(false);

  // Drag-to-dismiss state
  const [dragY, setDragY] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const dragStartY = React.useRef(null);
  const DISMISS_THRESHOLD = 100;

  // Reset drag when panel closes
  React.useEffect(() => {
    if (!open) {setDragY(0);}
  }, [open]);

  const handleClose = () => {
    // Mark all as read so "Nuevas" merge into time-based groups
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    // Also update the global data
    NOTIFICATIONS_DATA.forEach((n) => { n.read = true; });
    setClosing(true);
    setTimeout(() => {setClosing(false);setDragY(0);onClose();}, 250);
  };

  // Drag-to-dismiss handlers (on the panel header area)
  const handleDragTouchStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    setDragging(true);
  };
  const handleDragTouchMove = (e) => {
    if (dragStartY.current === null) return;
    const dy = e.touches[0].clientY - dragStartY.current;
    setDragY(Math.max(0, dy)); // only allow downward
  };
  const handleDragTouchEnd = () => {
    setDragging(false);
    if (dragY > DISMISS_THRESHOLD) {
      handleClose();
    } else {
      setDragY(0);
    }
    dragStartY.current = null;
  };
  // Mouse fallback for drag
  const handleDragMouseDown = (e) => {
    const sy = e.clientY;
    dragStartY.current = sy;
    setDragging(true);
    const onMove = (ev) => {
      const dy = ev.clientY - sy;
      setDragY(Math.max(0, dy));
    };
    const onUp = () => {
      setDragging(false);
      setDragY((prev) => {
        if (prev > DISMISS_THRESHOLD) {handleClose();}
        return 0;
      });
      dragStartY.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const handleDelete = (id) => {setNotifications((prev) => prev.filter((n) => n.id !== id));};
  const handleDeclineInvite = (id) => {setNotifications((prev) => prev.filter((n) => n.id !== id));};
  const handleAcceptInvite = (notification) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    if (onAcceptInvite && notification.table) onAcceptInvite(notification.table);
    handleClose();
  };
  const handleTapNotification = (notification) => {
    // Expired invitations or active invitations (have inline buttons) — no tap action
    if (notification.type === 'invitation') return;
    if (onNotificationTap) onNotificationTap(notification);
    handleClose();
  };

  if (!open && !closing) return null;

  const groups = groupNotifications(notifications);
  const isVisible = open && !closing;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div onClick={handleClose} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s'
      }}></div>

      {/* Panel */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: C.bgLight,
        borderRadius: '20px 20px 0 0',
        maxHeight: '82vh',
        display: 'flex', flexDirection: 'column',
        transform: isVisible ? `translateY(${dragY}px)` : 'translateY(100%)',
        transition: dragging ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
      }}>
        {/* Drag handle — swipe down to close */}
        <div
          onTouchStart={handleDragTouchStart}
          onTouchMove={handleDragTouchMove}
          onTouchEnd={handleDragTouchEnd}
          onMouseDown={handleDragMouseDown}
          style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px', flexShrink: 0, cursor: 'grab' }}>
          
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }}></div>
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '4px 16px 14px', flexShrink: 0,
          borderBottom: '1px solid ' + C.border
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NotifBellSvg size={18} color={C.text1} />
            <span style={{ fontSize: 16, fontWeight: 700, color: C.text1 }}>Notificaciones</span>
          </div>
          <button onClick={handleClose} style={{
            background: C.card, border: 'none', color: C.text3,
            width: 28, height: 28, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, cursor: 'pointer'
          }}>✕</button>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px' }}>
          {notifications.length === 0 ?
          <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, margin: '0 auto 14px', background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NotifBellSvg size={26} color={C.text3} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text2, marginBottom: 4 }}>No tenés notificaciones</div>
              <div style={{ fontSize: 11, color: C.text3, lineHeight: 1.5 }}>Cuando recibas invitaciones, resultados<br />o novedades, aparecerán acá.</div>
            </div> :

          groups.map((group) =>
          <div key={group.label}>
                <div style={{ padding: '12px 16px 6px', position: 'sticky', top: 0, zIndex: 5, background: C.bgLight }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.text3, letterSpacing: '0.02em' }}>{group.label}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 12px' }}>
                  {group.items.map((n) =>
              <NotificationItem
                key={n.id} notification={n}
                onSwipeDelete={handleDelete}
                onAcceptInvite={handleAcceptInvite}
                onDeclineInvite={handleDeclineInvite}
                onTap={handleTapNotification} />

              )}
                </div>
              </div>
          )
          }
        </div>
      </div>
    </div>);

}

// ─── Bell icon button for the header ───

function NotificationBell({ unreadCount, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: 'relative',
      background: C.card, border: 'none',
      width: 32, height: 32, borderRadius: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer'
    }}>
      <img src="assets/notification2.svg" width={16} height={16} style={{ objectFit: 'contain' }} />
      {unreadCount > 0 &&
      <span style={{
        position: 'absolute', top: 4, right: 4,
        width: 8, height: 8, borderRadius: '50%',
        background: C.accent,
        border: '2px solid ' + C.bgLight,
        boxShadow: '0 0 0 1px ' + C.accent + '40'
      }}></span>
      }
    </button>);

}

window.NotificationsPanel = NotificationsPanel;
window.NotificationBell = NotificationBell;
window.NOTIFICATIONS_DATA = NOTIFICATIONS_DATA;