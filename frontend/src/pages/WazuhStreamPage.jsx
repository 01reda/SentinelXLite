import React from 'react';
import { Radio, Shield } from 'lucide-react';

export default function WazuhStreamPage({ activeTheme }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Flux Temps Réel (Wazuh SIEM)</h2>
        <p className={`text-xs mt-1 ${activeTheme.subtext}`}>Événements de sécurité bruts capturés par les agents Wazuh connectés.</p>
      </div>
      <div className={`p-6 rounded-2xl border ${activeTheme.card} backdrop-blur-xl shadow-xl space-y-4 font-mono text-xs`}>
        <div className="flex items-center gap-2 text-emerald-400">
          <Radio className="w-4 h-4 animate-ping" />
          <span>Écoute active sur le socket Wazuh (Port 1514)...</span>
        </div>
        <div className="bg-black/40 p-4 rounded-xl border border-inherit space-y-2 opacity-90">
          <p>[10:45:12] [Wazuh-Agent-01] Rule: 5716 - SSH brute force attempt detected from 192.168.1.105</p>
          <p>[10:45:14] [Wazuh-Agent-04] Rule: 1002 - Generic SQL Injection pattern found in HTTP POST request</p>
          <p>[10:45:18] [Wazuh-Agent-02] Rule: 550 - Integrity checksum changed for /etc/passwd</p>
        </div>
      </div>
    </div>
  );
}