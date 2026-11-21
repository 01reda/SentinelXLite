import React from 'react';
import { FileText } from 'lucide-react';

export default function IncidentsPage({ activeTheme }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Tickets d'Investigation SOC</h2>
        <p className={`text-xs mt-1 ${activeTheme.subtext}`}>Suivi des dossiers d'incidents ouverts par les analystes de garde.</p>
      </div>
      <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl shadow-xl`}>
        <p className="text-xs opacity-70">Aucun ticket critique non assigné pour le moment. Tout est sous contrôle.</p>
      </div>
    </div>
  );
}