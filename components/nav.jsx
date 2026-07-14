
// Bottom navigation + Header — Profile in header

function AppHeader({ title, subtitle, onBack, rightAction, onProfile, notificationBell, logoSrc }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px', background: C.bgLight,
      borderBottom: `1px solid ${C.border}`, minHeight: 44
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack &&
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: C.text2, fontSize: 20,
          cursor: 'pointer', padding: 4, display: 'flex', borderRadius: "16px"
        }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        }
        {logoSrc ?
        <img src={logoSrc} alt={title || 'Logo'} style={{ height: 22, display: 'block', width: "120px" }} /> :

        <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text1, letterSpacing: '-0.01em' }}>{title}</div>
            {subtitle && <div style={{ fontSize: 11, color: C.text3, marginTop: 1 }}>{subtitle}</div>}
          </div>
        }
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {rightAction && rightAction}
        {notificationBell && notificationBell}
        {onProfile &&
        <button onClick={onProfile} style={{ ...{
            width: 32, height: 32, borderRadius: 10, background: USER_PROFILE.avatar,
            border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: '#fff', fontWeight: 700
          }, background: "rgb(17, 124, 178)" }}>
            {USER_PROFILE.name.slice(0, 2).toUpperCase()}
          </button>
        }
      </div>
    </div>);

}

function BottomNav({ active, onNavigate }) {
  const items = [
  { id: 'home', label: 'Lobby', icon: (c) => <svg width="22" height="22" viewBox="0 0 512 512" fill="none"><path d="M398.296 42.6493H357.763C311.256 42.6493 286.723 67.1826 286.723 113.689V154.223C286.723 200.729 311.256 225.263 357.763 225.263H398.296C444.803 225.263 469.336 200.729 469.336 154.223V113.689C469.336 67.1826 444.803 42.6493 398.296 42.6493Z" fill={c} /><path d="M154.454 286.5H113.92C67.2003 286.5 42.667 311.033 42.667 357.54V398.073C42.667 444.793 67.2003 469.327 113.707 469.327H154.24C200.747 469.327 225.28 444.793 225.28 398.287V357.753C225.494 311.033 200.96 286.5 154.454 286.5Z" fill={c} /><path d="M134.187 225.689C184.732 225.689 225.707 184.714 225.707 134.169C225.707 83.6242 184.732 42.6493 134.187 42.6493C83.6419 42.6493 42.667 83.6242 42.667 134.169C42.667 184.714 83.6419 225.689 134.187 225.689Z" fill={c} /><path d="M377.826 469.34C428.371 469.34 469.346 428.365 469.346 377.82C469.346 327.275 428.371 286.3 377.826 286.3C327.281 286.3 286.306 327.275 286.306 377.82C286.306 428.365 327.281 469.34 377.826 469.34Z" fill={c} /></svg> },
  { id: 'play', label: 'Jugar', icon: (c) => <svg width="22" height="22" viewBox="0 0 512 512" fill="none"><path d="M167.893 90.0267C156.373 90.0267 146.133 92.5867 136.96 97.92C113.92 111.147 101.333 140.373 101.333 180.053V331.947C101.333 371.627 113.92 400.64 136.96 414.08C160 427.52 191.573 423.68 225.92 403.84L357.546 327.893C391.893 308.053 410.88 282.667 410.88 256C410.88 229.333 391.893 203.947 357.546 184.107L225.92 108.16C205.013 96.2133 185.386 90.0267 167.893 90.0267Z" fill={c} /></svg> },
  { id: 'rules', label: 'Partidas', icon: (c) => <svg width="22" height="22" viewBox="0 0 512 512" fill="none"><path d="M469.334 320V192C469.334 156.587 440.747 128 405.334 128H106.667C71.2537 128 42.667 156.587 42.667 192V320C42.667 355.413 71.2537 384 106.667 384H405.334C440.747 384 469.334 355.413 469.334 320Z" fill={c} /><path d="M126.507 416H385.493C392.32 416 397.227 422.187 395.947 428.8C390.187 460.373 371.627 469.333 327.04 469.333H184.96C140.16 469.333 121.813 460.373 116.053 428.8C114.773 422.187 119.68 416 126.507 416Z" fill={c} /><path d="M184.96 42.6667H327.04C371.84 42.6667 390.187 51.6267 395.947 83.2C397.227 89.8134 392.107 96 385.493 96H126.507C119.68 96 114.773 89.8134 116.053 83.2C121.813 51.6267 140.16 42.6667 184.96 42.6667Z" fill={c} /></svg> },
  { id: 'history', label: 'Amigos', icon: (c) => <svg width="22" height="22" viewBox="0 0 512 512" fill="none"><path d="M191.999 42.6667C136.106 42.6667 90.666 88.1067 90.666 144C90.666 198.827 133.546 243.2 189.439 245.12C191.146 244.907 192.853 244.907 194.133 245.12C194.559 245.12 194.773 245.12 195.199 245.12C195.413 245.12 195.413 245.12 195.626 245.12C250.239 243.2 293.119 198.827 293.333 144C293.333 88.1067 247.893 42.6667 191.999 42.6667Z" fill={c} /><path d="M300.372 301.867C240.853 262.187 143.786 262.187 83.8392 301.867C56.7458 320 41.8125 344.533 41.8125 370.773C41.8125 397.013 56.7458 421.333 83.6258 439.253C113.493 459.307 152.746 469.333 191.999 469.333C231.253 469.333 270.506 459.307 300.372 439.253C327.253 421.12 342.186 396.8 342.186 370.347C341.973 344.107 327.253 319.787 300.372 301.867Z" fill={c} /><path d="M426.454 156.587C429.867 197.973 400.427 234.24 359.68 239.147C359.467 239.147 359.467 239.147 359.254 239.147H358.614C357.334 239.147 356.054 239.147 354.987 239.573C334.294 240.64 315.307 234.027 301.014 221.867C322.987 202.24 335.574 172.8 333.014 140.8C331.52 123.52 325.547 107.733 316.587 94.2933C324.694 90.24 334.08 87.68 343.68 86.8267C385.494 83.2 422.827 114.347 426.454 156.587Z" fill={c} /><path d="M469.12 353.92C467.413 374.613 454.186 392.533 432 404.693C410.666 416.427 383.786 421.973 357.12 421.333C372.48 407.467 381.44 390.187 383.146 371.84C385.28 345.387 372.693 320 347.52 299.733C333.226 288.427 316.586 279.467 298.453 272.853C345.6 259.2 404.906 268.373 441.386 297.813C461.013 313.6 471.04 333.44 469.12 353.92Z" fill={c} /></svg> }];


  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
      padding: '8px 4px 20px', background: C.bgLight,
      borderTop: `1px solid ${C.border}`
    }}>
      {items.map((item) => {
        const isActive = active === item.id || item.id === 'play' && active === 'tables' || item.id === 'rules' && active === 'myTables';
        const iconColor = isActive ? '#fff' : '#fff';
        return (
          <button key={item.id} onClick={() => onNavigate(item.id)} style={{
            background: 'none',
            border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3,
            padding: '4px 12px',
            transition: 'all 0.15s',
            opacity: isActive ? 1 : 0.45
          }}>
            {item.icon(iconColor)}
            <span style={{ fontSize: 10, color: '#fff', fontWeight: isActive ? 700 : 400 }}>{item.label}</span>
          </button>);

      })}
    </div>);

}

window.AppHeader = AppHeader;
window.BottomNav = BottomNav;