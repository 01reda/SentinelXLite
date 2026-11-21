import React from 'react';
import { FileText } from 'lucide-react';

export default function ReportsPage({ activeTheme }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Rapports d'Escalade</h2>
        <p className={`text-xs mt-1 ${activeTheme.subtext}`}>Génération automatique de rapports d'incidents au format PDF / CSV.</p>
      </div>
      <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl shadow-xl flex gap-4`}>
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 shadow-lg">
          Générer le Rapport Hebdomadaire SOC
        </button>
      </div>
    </div>
  );
}