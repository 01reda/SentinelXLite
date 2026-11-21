// CONFIGURATION DES 3 PALETTES DE THÈMES
export const THEMES = {
    dark: {
      name: 'Cyber Dark',
      desc: 'Ambiance SOC classique sur fond nuit',
      bg: 'bg-slate-950',
      sidebar: 'bg-slate-900/90 border-slate-800',
      card: 'bg-slate-900/60 border-slate-800',
      text: 'text-slate-100',
      subtext: 'text-slate-400',
      primary: '#3b82f6',
      attackColor: '#ef4444',
      detectionColor: '#10b981',
      glow: 'rgba(59, 130, 246, 0.15)',
    },
    light: {
      name: 'Clair Épuré',
      desc: 'Haute visibilité pour environnements éclairés',
      bg: 'bg-slate-100',
      sidebar: 'bg-white/90 border-slate-200',
      card: 'bg-white/80 border-slate-200',
      text: 'text-slate-900',
      subtext: 'text-slate-500',
      primary: '#2563eb',
      attackColor: '#dc2626',
      detectionColor: '#059669',
      glow: 'rgba(37, 99, 235, 0.1)',
    },
    cyberGreen: {
      name: 'Sombre + Vert Néon',
      desc: 'Style Terminal Hacker / Matrix SOC',
      bg: 'bg-black',
      sidebar: 'bg-zinc-950/90 border-emerald-900/50',
      card: 'bg-zinc-950/80 border-emerald-900/40',
      text: 'text-emerald-100',
      subtext: 'text-emerald-500/80',
      primary: '#10b981',
      attackColor: '#f43f5e',
      detectionColor: '#10b981',
      glow: 'rgba(16, 185, 129, 0.2)',
    }
  };
  
  // DONNÉES FACTICES SOC
  export const MOCK_ATTACKS = [
    { id: 'ATK-8901', title: 'Brute Force SSH (Root)', severity: 'Critique', srcIp: '192.168.1.105', mitre: 'T1110.001', status: 'Mitigué', count: 1420, date: '10:42:15' },
    { id: 'ATK-8902', title: 'SQL Injection on /api/login', severity: 'Élevée', srcIp: '10.0.0.44', mitre: 'T1190', status: 'En cours', count: 86, date: '10:39:00' },
    { id: 'ATK-8903', title: 'XSS Payload dans Formulaire Client', severity: 'Moyenne', srcIp: '172.16.0.12', mitre: 'T1059.007', status: 'Bloqué', count: 12, date: '10:15:22' },
    { id: 'ATK-8904', title: 'Port Scan SYN Sweep', severity: 'Faible', srcIp: '192.168.1.200', mitre: 'T1046', status: 'Analysé', count: 5400, date: '09:58:04' },
  ];
  
  export const MOCK_GRAPH_DATA = [
    { time: '10:00', attack: 30, detect: 28 },
    { time: '10:10', attack: 55, detect: 50 },
    { time: '10:20', attack: 85, detect: 80 },
    { time: '10:30', attack: 40, detect: 38 },
    { time: '10:40', attack: 95, detect: 92 },
    { time: '10:50', attack: 65, detect: 65 },
  ];