import React from 'react';
import { ShieldAlert, Filter } from 'lucide-react';

export default function AttacksPage({ activeTheme, mockAttacks }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Analyse Avancée des Attaques</h2>
          <p className={`text-xs mt-1 ${activeTheme.subtext}`}>
            Filtrez et examinez les charges utiles et les signatures MITRE ATT&CK répertoriées.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 shadow-lg">
          <Filter className="w-4 h-4" /> Filtrer par Sévérité
        </button>
      </div>

      <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl shadow-xl space-y-4`}>
        <h3 className="font-bold text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500" /> Vecteurs de menaces en cours d'analyse
        </h3>
        <div className="space-y-3">
          {mockAttacks.map((atk) => (
            <div key={atk.id} className="p-4 rounded-xl bg-white/5 border border-inherit flex justify-between items-center">
              <div>
                <span className="font-mono text-xs text-blue-400">{atk.id} - {atk.mitre}</span>
                <h4 className="font-semibold text-sm mt-0.5">{atk.title}</h4>
                <p className="text-[11px] opacity-60 mt-1">IP Source : {atk.srcIp} | Heure : {atk.date}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                {atk.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}