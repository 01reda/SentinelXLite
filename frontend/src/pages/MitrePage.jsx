import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function MitrePage({ activeTheme }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Cartographie MITRE ATT&CK</h2>
        <p className={`text-xs mt-1 ${activeTheme.subtext}`}>Matrice des tactiques et techniques adverses identifiées sur l'infrastructure.</p>
      </div>
      <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl shadow-xl grid grid-cols-3 gap-4 text-xs`}>
        <div className="p-4 rounded-xl bg-white/5 border border-inherit">
          <span className="text-purple-400 font-mono">T1110 - Brute Force</span>
          <p className="font-bold mt-1">Credential Access</p>
          <span className="text-[10px] text-rose-400 mt-2 block">Fréquence : Élevée</span>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-inherit">
          <span className="text-purple-400 font-mono">T1190 - Exploit Public App</span>
          <p className="font-bold mt-1">Initial Access</p>
          <span className="text-[10px] text-amber-400 mt-2 block">Fréquence : Moyenne</span>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-inherit">
          <span className="text-purple-400 font-mono">T1046 - Network Service Scan</span>
          <p className="font-bold mt-1">Discovery</p>
          <span className="text-[10px] text-blue-400 mt-2 block">Fréquence : Faible</span>
        </div>
      </div>
    </div>
  );
}