import React from 'react';
import { Activity, Terminal, AlertTriangle, Server, CheckCircle2, Eye, BarChart3 } from 'lucide-react';

export default function GlobalDashboard({ 
  activeTheme, 
  detectionProgress, 
  mitigationProgress, 
  mockAttacks, 
  onSelectAttack,
  chartTimeframe,
  setChartTimeframe
}) {

  // Configuration dynamique des données du graphique selon la période (24h, 7 jours, 4 semaines)
  const chartDataConfig = {
    hour: {
      title: "Volumétrie sur 24 Heures (00:00 - 23:00)",
      bars: Array.from({ length: 24 }, (_, i) => {
        const h = i < 10 ? `0${i}:00` : `${i}:00`;
        const attacks = Math.floor(Math.sin(i / 3) * 60 + 80 + Math.random() * 30);
        const detections = Math.floor(attacks * 0.95);
        return { label: h, attacks, detections };
      })
    },
    day: {
      title: "Volumétrie sur la Semaine (Lundi - Dimanche)",
      bars: [
        { label: "Lundi", attacks: 420, detections: 410 },
        { label: "Mardi", attacks: 580, detections: 570 },
        { label: "Mercredi", attacks: 310, detections: 305 },
        { label: "Jeudi", attacks: 790, detections: 780 },
        { label: "Vendredi", attacks: 940, detections: 920 },
        { label: "Samedi", attacks: 620, detections: 610 },
        { label: "Dimanche", attacks: 450, detections: 445 },
      ]
    },
    week: {
      title: "Volumétrie Globale par Semaine (Mois en cours)",
      bars: [
        { label: "Semaine 1", attacks: 3200, detections: 3150 },
        { label: "Semaine 2", attacks: 4100, detections: 4020 },
        { label: "Semaine 3", attacks: 2900, detections: 2850 },
        { label: "Semaine 4", attacks: 5300, detections: 5210 },
      ]
    }
  };

  const currentData = chartDataConfig[chartTimeframe] || chartDataConfig.week;
  const maxVal = Math.max(...currentData.bars.map(b => b.attacks));

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Tableau de Bord de Sécurité Globale</h2>
        <p className={`text-xs mt-1 ${activeTheme.subtext}`}>
          Supervision en temps réel des flux réseau, taux de détection automatisés et mitigation des vulnérabilités.
        </p>
      </div>

      {/* Jauges circulaires et KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl flex items-center justify-between shadow-xl`}>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${activeTheme.subtext}`}>Taux de Détection</span>
            <p className="text-2xl font-black mt-2">{detectionProgress}%</p>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3 h-3" /> +3.2% cette heure
            </span>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" className="opacity-10" />
              <circle 
                cx="40" cy="40" r="32" 
                stroke={activeTheme.detectionColor} 
                strokeWidth="6" 
                strokeDasharray={200}
                strokeDashoffset={200 - (200 * detectionProgress) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <Activity className="w-6 h-6 absolute text-emerald-400" />
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl flex items-center justify-between shadow-xl`}>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${activeTheme.subtext}`}>Mitigation Bloquée</span>
            <p className="text-2xl font-black mt-2">{mitigationProgress}%</p>
            <span className="text-[10px] text-blue-400 font-mono mt-1 block">Règles Pare-feu Actives</span>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" className="opacity-10" />
              <circle 
                cx="40" cy="40" r="32" 
                stroke={activeTheme.primary} 
                strokeWidth="6" 
                strokeDasharray={200}
                strokeDashoffset={200 - (200 * mitigationProgress) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <Terminal className="w-6 h-6 absolute text-blue-400" />
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl flex justify-between items-center shadow-xl`}>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${activeTheme.subtext}`}>Attaques Récentes</span>
            <p className="text-3xl font-black mt-2 text-rose-500">6,938</p>
            <span className="text-[10px] text-rose-400 font-mono mt-1 block">Pics détectés à 10:40</span>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500">
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl flex justify-between items-center shadow-xl`}>
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${activeTheme.subtext}`}>Agents en Ligne</span>
            <p className="text-3xl font-black mt-2 text-emerald-400">14 / 14</p>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">100% Fonctionnel</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Server className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* ================= GRAPHIQUE DUAL (HAUTEUR FIXE ET ALIGNÉE) ================= */}
      <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl shadow-xl space-y-6`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" /> {currentData.title}
            </h3>
            <p className={`text-xs ${activeTheme.subtext}`}>Comparaison en temps réel entre flux malveillants et détections automatisées</p>
          </div>

          {/* Sélecteur de Période (Heure / Jour / Semaine) */}
          <div className="flex bg-black/40 p-1 rounded-xl border border-inherit text-xs font-semibold">
            <button 
              onClick={() => setChartTimeframe('hour')}
              className={`px-3 py-1.5 rounded-lg transition-all ${chartTimeframe === 'hour' ? 'bg-blue-600 text-white shadow' : 'opacity-70 hover:opacity-100'}`}
            >
              Par Heure (24h)
            </button>
            <button 
              onClick={() => setChartTimeframe('day')}
              className={`px-3 py-1.5 rounded-lg transition-all ${chartTimeframe === 'day' ? 'bg-blue-600 text-white shadow' : 'opacity-70 hover:opacity-100'}`}
            >
              Par Jour
            </button>
            <button 
              onClick={() => setChartTimeframe('week')}
              className={`px-3 py-1.5 rounded-lg transition-all ${chartTimeframe === 'week' ? 'bg-blue-600 text-white shadow' : 'opacity-70 hover:opacity-100'}`}
            >
              Par Semaine
            </button>
          </div>
        </div>

        {/* Zone des barres comparatives avec hauteur strictement bridée */}
        <div className="overflow-x-auto pt-4 border-t border-inherit">
          <div className={`flex items-end justify-between h-48 gap-1 sm:gap-2 ${chartTimeframe === 'hour' ? 'min-w-[750px]' : 'w-full'}`}>
            {currentData.bars.map((bar, idx) => {
              const attackHeight = Math.max(12, (bar.attacks / maxVal) * 100);
              const detectionHeight = Math.max(12, (bar.detections / maxVal) * 100);

              return (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                  <div className="w-full flex justify-center items-end gap-0.5 sm:gap-1 h-36 px-0.5">
                    {/* Barre Rouge : Attaques */}
                    <div 
                      style={{ height: `${attackHeight}%` }} 
                      className="w-1/2 bg-rose-500/80 hover:bg-rose-500 rounded-t-sm sm:rounded-t-md transition-all relative cursor-pointer"
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/90 text-rose-400 text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        {bar.attacks} Attaques
                      </span>
                    </div>

                    {/* Barre Verte : Détections */}
                    <div 
                      style={{ height: `${detectionHeight}%` }} 
                      className="w-1/2 bg-emerald-500/80 hover:bg-emerald-500 rounded-t-sm sm:rounded-t-md transition-all relative cursor-pointer"
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/90 text-emerald-400 text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        {bar.detections} Détectées
                      </span>
                    </div>
                  </div>

                  {/* Étiquettes d'heures / jours parfaitement calées */}
                  <span className={`font-mono text-center opacity-70 mt-2 block truncate ${
                    chartTimeframe === 'hour' ? 'text-[9px]' : 'text-[11px]'
                    }`}>
                    {chartTimeframe === 'hour' && idx % 2 !== 0 ? '\u00A0' : bar.label}
                    </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-6 pt-2 text-xs font-mono opacity-80 border-t border-inherit">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-rose-500 inline-block" /> Flux d'attaques brutes</span>
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Détections & Mitigations réussies</span>
        </div>
      </div>

      {/* Tableau interactif des attaques */}
      <div className={`rounded-2xl border ${activeTheme.card} backdrop-blur-xl shadow-xl overflow-hidden`}>
        <div className="p-6 border-b border-inherit flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Détails des Attaques Détectées</h3>
            <p className={`text-xs ${activeTheme.subtext}`}>Cliquez sur un événement pour ouvrir l'analyse médico-légale</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
            {mockAttacks.length} Événements critiques
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-inherit bg-white/5 opacity-70 uppercase tracking-wider font-mono">
                <th className="p-4">ID Attaque</th>
                <th className="p-4">Type / Titre</th>
                <th className="p-4">Sévérité</th>
                <th className="p-4">IP Source</th>
                <th className="p-4">MITRE ATT&CK</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {mockAttacks.map((attack) => (
                <tr 
                  key={attack.id} 
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onSelectAttack(attack)}
                >
                  <td className="p-4 font-mono text-blue-400 font-bold">{attack.id}</td>
                  <td className="p-4 font-semibold">{attack.title}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      attack.severity === 'Critique' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      attack.severity === 'Élevée' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {attack.severity}
                    </span>
                  </td>
                  <td className="p-4 font-mono opacity-80">{attack.srcIp}</td>
                  <td className="p-4 font-mono text-xs text-purple-400">{attack.mitre}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 opacity-90">
                      <span className={`w-2 h-2 rounded-full ${attack.status.includes('Isolé') ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`} />
                      {attack.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}