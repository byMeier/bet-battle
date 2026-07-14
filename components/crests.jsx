
// Team crest images — real logos
const teamCrestImages = {
  'Real Madrid': 'assets/crests/realmadrid.png',
  'Man City': 'assets/crests/manchestercity.png',
  'Arsenal': 'assets/crests/arsenal.png',
  'Liverpool': 'assets/crests/liverpool.png',
  'Lakers': 'assets/crests/lakers.png',
  'Celtics': 'assets/crests/celtics.png',
  'Djokovic': 'assets/crests/djokovich.png',
  'Alcaraz': 'assets/crests/alcaraz.png',
  'Barcelona': 'assets/crests/barcelona.png',
  'Atlético': 'assets/crests/atleticomadrid.png',
};

// TeamCrest — uses real PNG images when available
const TeamCrest = ({ name, color, size = 32 }) => {
  const imgSrc = teamCrestImages[name];
  if (imgSrc) {
    return (
      <div style={{ width: size, height: size, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={imgSrc} alt={name} style={{ width: size, height: size, objectFit: 'contain', display: 'block' }} />
      </div>
    );
  }
  // Fallback for unknown teams
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.3,
      background: `linear-gradient(135deg, ${color || '#3a5068'}, ${color ? color + '99' : '#2a3d50'})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.32, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
      border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0,
    }}>{initials}</div>
  );
};

window.TeamCrest = TeamCrest;
