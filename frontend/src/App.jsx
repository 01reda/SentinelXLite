import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, LayoutDashboard, Radio, FileText, Settings,
  ChevronDown, ChevronRight, Search, Sliders, X, Check, Eye, Download, ShieldCheck
} from 'lucide-react';
import './styles/theme.css';
import { THEMES, MOCK_ATTACKS } from './constants/themeData';

// Import de tes pages isolées
import GlobalDashboard from './pages/GlobalDashboard';
import AttacksPage from './pages/AttacksPage';
import WazuhStreamPage from './pages/WazuhStreamPage';
import MitrePage from './pages/MitrePage';
import IncidentsPage from './pages/IncidentsPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  const [currentThemeKey, setCurrentThemeKey] = useState('dark');
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [previewThemeKey, setPreviewThemeKey] = useState('dark');

  // Mode de création de thème personnalisé
  const [isCustomThemeMode, setIsCustomThemeMode] = useState(false);
  const [customTheme, setCustomTheme] = useState({
    name: 'Thème Personnalisé',
    bg: 'bg-slate-950',
    card: 'bg-slate-900/60 border-slate-800',
    sidebar: 'bg-slate-900/40 border-slate-800',
    text: 'text-slate-100',
    subtext: 'text-slate-400',
    primary: '#3b82f6',
    detectionColor: '#10b981'
  });

  // Navigation & Onglets actifs
  const [openMenus, setOpenMenus] = useState({ dashboard: true, alerts: false, incidents: false });
  const [activeTab, setActiveTab] = useState('global');

  // Animation des jauges & Drawer d'attaque
  const [detectionProgress, setDetectionProgress] = useState(0);
  const [mitigationProgress, setMitigationProgress] = useState(0);
  const [selectedAttack, setSelectedAttack] = useState(null);

  // État interactif pour le graphique dual (Heure / Jour / Semaine)
  const [chartTimeframe, setChartTimeframe] = useState('week');

  // État dynamique pour les attaques (permet de simuler l'isolation d'IP ou la résolution)
  const [attacksList, setAttacksList] = useState(MOCK_ATTACKS);

  // Détermination du thème actif (soit un thème prédéfini, soit le thème custom)
  const activeTheme = isCustomThemeMode 
    ? customTheme 
    : (THEMES[currentThemeKey] || THEMES['dark']);

  useEffect(() => {
    setDetectionProgress(0);
    setMitigationProgress(0);
    const timer1 = setTimeout(() => setDetectionProgress(87), 150);
    const timer2 = setTimeout(() => setMitigationProgress(94), 300);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [currentThemeKey, isCustomThemeMode]);

  const toggleSubmenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleIsolateIP = (ip) => {
    setAttacksList(prev => prev.map(atk => atk.srcIp === ip ? { ...atk, status: 'Isolé & Bloqué' } : atk));
    setSelectedAttack(prev => prev ? { ...prev, status: 'Isolé & Bloqué' } : null);
  };

  return (
<div className={`flex h-screen w-screen overflow-hidden ${activeTheme.bg} ${activeTheme.text} transition-colors duration-300 font-sans`}>
      
      {/* ================= BARRE LATÉRALE VERTICALE ================= */}
      <aside className={`w-72 flex flex-col justify-between border-r ${activeTheme.sidebar} backdrop-blur-md z-20`}>
        <div>
          <div className="p-5 flex items-center gap-3 border-b border-inherit">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-600 to-blue-600 text-white shadow-lg shadow-blue-500/20">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold tracking-wider text-lg flex items-center gap-1.5">
                SENTINEL<span className="text-blue-500 font-extrabold">X</span>
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-widest opacity-60">SOC Security Engine</span>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            <div>
              <button
                onClick={() => toggleSubmenu('dashboard')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-sm font-semibold"
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-blue-500" />
                  <span>Tableau de Bord</span>
                </div>
                {openMenus.dashboard ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
              </button>

              {openMenus.dashboard && (
                <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-700/40 pl-3 text-xs">
                  <button 
                    onClick={() => setActiveTab('global')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${activeTab === 'global' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'opacity-70 hover:opacity-100'}`}
                  >
                    Vue Globale & KPIs
                  </button>
                  <button 
                    onClick={() => setActiveTab('attacks')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${activeTab === 'attacks' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'opacity-70 hover:opacity-100'}`}
                  >
                    Analyse des Attaques
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleSubmenu('alerts')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-sm font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Radio className="w-5 h-5 text-rose-500" />
                  <span>Surveillance Alertes</span>
                </div>
                {openMenus.alerts ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
              </button>

              {openMenus.alerts && (
                <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-700/40 pl-3 text-xs">
                  <button 
                    onClick={() => setActiveTab('wazuhStream')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${activeTab === 'wazuhStream' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'opacity-70 hover:opacity-100'}`}
                  >
                    Flux Temps Réel (Wazuh)
                  </button>
                  <button 
                    onClick={() => setActiveTab('mitre')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${activeTab === 'mitre' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'opacity-70 hover:opacity-100'}`}
                  >
                    Cartographie MITRE ATT&CK
                  </button>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => toggleSubmenu('incidents')}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all text-sm font-semibold"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  <span>Gestion Incidents</span>
                </div>
                {openMenus.incidents ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
              </button>

              {openMenus.incidents && (
                <div className="ml-9 mt-1 space-y-1 border-l-2 border-slate-700/40 pl-3 text-xs">
                  <button 
                    onClick={() => setActiveTab('incidentsList')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${activeTab === 'incidentsList' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'opacity-70 hover:opacity-100'}`}
                  >
                    Tickets d'investigation
                  </button>
                  <button 
                    onClick={() => setActiveTab('reports')}
                    className={`block w-full text-left py-2 px-3 rounded-lg transition-all ${activeTab === 'reports' ? 'bg-blue-600/20 text-blue-400 font-bold' : 'opacity-70 hover:opacity-100'}`}
                  >
                    Rapports d'escalade
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-inherit">
          <button
            onClick={() => { 
              setPreviewThemeKey(currentThemeKey); 
              setThemeModalOpen(true); 
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-medium border border-inherit shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-slate-400 animate-spin-slow" />
              <span>Personnaliser le Style</span>
            </div>
            <Sliders className="w-4 h-4 opacity-60" />
          </button>
        </div>
      </aside>

      {/* ================= EN-TÊTE & CORPS DE PAGE ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className={`h-16 border-b ${activeTheme.sidebar} backdrop-blur-md px-8 flex items-center justify-between z-10`}>
          <span className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            API NET Core : Connectée (localhost:5143)
          </span>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
              <input type="text" placeholder="Rechercher une IP..." className="bg-white/5 border border-inherit rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none w-64" />
            </div>
            <div className="flex items-center gap-3 border-l border-inherit pl-6">
              <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500 flex items-center justify-center font-bold text-xs">MR</div>
              <div className="text-xs">
                <p className="font-semibold">Mohamed Reda</p>
                <p className="text-[10px] opacity-60">Analyste SOC Lead</p>
              </div>
            </div>
          </div>
        </header>

        {/* AFFICHAGE CONDITIONNEL DES PAGES ISOLÉES */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'global' && (
            <GlobalDashboard 
              activeTheme={activeTheme} 
              detectionProgress={detectionProgress} 
              mitigationProgress={mitigationProgress} 
              mockAttacks={attacksList}
              onSelectAttack={setSelectedAttack}
              chartTimeframe={chartTimeframe}
              setChartTimeframe={setChartTimeframe}
            />
          )}
          {activeTab === 'attacks' && <AttacksPage activeTheme={activeTheme} mockAttacks={attacksList} />}
          {activeTab === 'wazuhStream' && <WazuhStreamPage activeTheme={activeTheme} />}
          {activeTab === 'mitre' && <MitrePage activeTheme={activeTheme} />}
          {activeTab === 'incidentsList' && <IncidentsPage activeTheme={activeTheme} />}
          {activeTab === 'reports' && <ReportsPage activeTheme={activeTheme} />}
        </main>
      </div>

      {/* ================= MODAL PERSONNALISATION DU STYLE & FABRICATION DE THÈME ================= */}
      {themeModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Sliders className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold">Personnalisation du Style & Thème SOC</h3>
              </div>
              <button onClick={() => setThemeModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Onglets choix de mode : Prédéfini (3 thèmes) ou Custom (Fabrication libre) */}
            <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button 
                onClick={() => setIsCustomThemeMode(false)}
                className={`flex-1 py-2 rounded-lg transition-all ${!isCustomThemeMode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Thèmes Prédéfinis (3 choix)
              </button>
              <button 
                onClick={() => setIsCustomThemeMode(true)}
                className={`flex-1 py-2 rounded-lg transition-all ${isCustomThemeMode ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                Créer Mon Propre Thème (Custom)
              </button>
            </div>

            {isCustomThemeMode ? (
              <div className="space-y-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs shadow-inner">
                <p className="text-slate-400">Personnalisez en temps réel les trois couleurs maîtresses de votre SOC :</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 1. Couleur de Fond */}
                  <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <label className="block font-semibold text-slate-300">Couleur de Fond</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={customTheme.bgHex || "#030712"} 
                        onChange={(e) => {
                          const hex = e.target.value;
                          setCustomTheme(prev => ({...prev, bgHex: hex, bg: ''})) // Utilise le style en ligne pour un contrôle parfait
                        }}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                      />
                      <span className="font-mono text-slate-300 text-xs">Arrière-plan</span>
                    </div>
                  </div>

                  {/* 2. Couleur Principale (Global Accent) */}
                  <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <label className="block font-semibold text-slate-300">Couleur Globale (Accent)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={customTheme.primary} 
                        onChange={(e) => setCustomTheme(prev => ({...prev, primary: e.target.value}))}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                      />
                      <span className="font-mono text-slate-300 text-xs">{customTheme.primary}</span>
                    </div>
                  </div>

                  {/* 3. Couleur d'Écriture (Texte) */}
                  <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <label className="block font-semibold text-slate-300">Couleur d'Écriture</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={customTheme.textHex || "#f8fafc"} 
                        onChange={(e) => {
                          const hex = e.target.value;
                          setCustomTheme(prev => ({...prev, textHex: hex, text: ''}))
                        }}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                      />
                      <span className="font-mono text-slate-300 text-xs">Textes</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Prévisualisation en direct :</span>
              <div className={`p-4 rounded-2xl border ${isCustomThemeMode ? customTheme.bg : THEMES[previewThemeKey].bg} ${isCustomThemeMode ? customTheme.text : THEMES[previewThemeKey].text} border-slate-700 transition-all`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold">Exemple de Carte SOC en Direct</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono" style={{ backgroundColor: isCustomThemeMode ? customTheme.primary : THEMES[previewThemeKey].primary, color: '#fff' }}>
                    Actif
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
              <button onClick={() => setThemeModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold hover:bg-slate-800">
                Annuler
              </button>
              <button 
                onClick={() => { 
                  if (!isCustomThemeMode) {
                    setCurrentThemeKey(previewThemeKey);
                  }
                  setThemeModalOpen(false); 
                }} 
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 shadow-lg flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Appliquer les Modifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TIROIR LATÉRAL (DRAWER FORENSIC AVANCÉ) ================= */}
      {selectedAttack && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end animate-fade-in">
          <div className={`w-full max-w-lg h-full border-l ${activeTheme.sidebar} ${activeTheme.text} p-6 overflow-y-auto space-y-6 animate-slide-left shadow-2xl`}>
            <div className="flex justify-between items-center border-b border-inherit pb-4">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold">Dossier # {selectedAttack.id}</span>
                <h3 className="text-lg font-bold mt-0.5">{selectedAttack.title}</h3>
              </div>
              <button onClick={() => setSelectedAttack(null)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fiche d'investigation médico-légale */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 space-y-3 border border-inherit">
                <div className="flex justify-between items-center">
                  <span className="opacity-60">Niveau de Sévérité :</span>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    selectedAttack.severity === 'Critique' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>{selectedAttack.severity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60">Adresse IP Source :</span>
                  <span className="font-mono text-blue-400 font-bold">{selectedAttack.srcIp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60">Technique MITRE ATT&CK :</span>
                  <span className="font-mono text-purple-400">{selectedAttack.mitre}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60">Horodatage Capture :</span>
                  <span className="font-mono">{selectedAttack.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60">Statut de Mitigation :</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {selectedAttack.status}
                  </span>
                </div>
              </div>

              {/* Analyse technique de la charge utile (Payload) */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-300">Analyse de la Charge Utile (Payload Capturé) :</h4>
                <div className="p-3 rounded-xl bg-black/50 border border-inherit font-mono text-[11px] text-rose-400 overflow-x-auto">
                  <code>POST /api/v1/auth/login HTTP/1.1\nHost: target.soc\nUser-Agent: Mozilla/5.0 (Unauthorized Exploit Probe)\nPayload: UNION SELECT null, username, password FROM users --</code>
                </div>
              </div>

              {/* Actions d'intervention pour l'analyste */}
              <div className="pt-4 space-y-3">
                <button 
                  onClick={() => handleIsolateIP(selectedAttack.srcIp)}
                  className="w-full py-3 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-500 shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <ShieldAlert className="w-4 h-4" /> Isoler l'IP Source Immédiatement du Réseau
                </button>
                <button 
                  onClick={() => alert(`Téléchargement du fichier PCAP forensic pour l'attaque ${selectedAttack.id}...`)}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-inherit flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4" /> Télécharger le Rapport PCAP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}      