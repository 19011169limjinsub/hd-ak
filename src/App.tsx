/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SpecForm } from './components/SpecForm';
import { ReportView } from './components/ReportView';
import { BenchmarkRadar } from './components/BenchmarkRadar';
import { ActionRoadmap } from './components/ActionRoadmap';
import { InterviewSim } from './components/InterviewSim';
import { SpecSimulatorModal } from './components/SpecSimulatorModal';
import { PRESET_PROFILES } from './data/presets';
import { CandidateProfile, DetailedAnalysis, IndustryType } from './types';
import { analyzeProfile } from './utils/matcher';
import { 
  FileText, 
  BarChart3, 
  Flame, 
  MessageSquare, 
  Sparkles,
  Bot
} from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<CandidateProfile>(PRESET_PROFILES[0].profile);
  const [analysis, setAnalysis] = useState<DetailedAnalysis>(() => analyzeProfile(PRESET_PROFILES[0].profile));
  const [isLoading, setIsLoading] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'report' | 'benchmark' | 'roadmap' | 'interview'>('report');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [activeIndustryFilter, setActiveIndustryFilter] = useState<IndustryType>('integrated');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Handle running full analysis
  const runAnalysis = async (targetProfile = profile) => {
    setIsLoading(true);
    setStatusMessage('합격자 데이터베이스 대조 및 정밀 분석을 수행하고 있습니다...');

    const controller = new AbortController();
    const timeoutTimer = setTimeout(() => controller.abort(), 3500);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetProfile),
        signal: controller.signal,
      });
      clearTimeout(timeoutTimer);

      if (response.ok) {
        const data: DetailedAnalysis = await response.json();
        setAnalysis(data);
        setStatusMessage(data.isAiEnhanced ? 'AI 기반 심층 정밀 분석이 완료되었습니다.' : '합격자 DB 벤치마크 분석이 완료되었습니다.');
      } else {
        // Fallback to client-side deterministic analysis
        const clientAnalysis = analyzeProfile(targetProfile);
        setAnalysis(clientAnalysis);
        setStatusMessage('합격자 DB 벤치마크 분석이 완료되었습니다.');
      }
    } catch (err) {
      clearTimeout(timeoutTimer);
      console.warn('Backend call skipped or timed out, using deterministic benchmark analysis:', err);
      const clientAnalysis = analyzeProfile(targetProfile);
      setAnalysis(clientAnalysis);
      setStatusMessage('합격자 DB 벤치마크 분석이 완료되었습니다.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleSelectPreset = (presetProfile: CandidateProfile) => {
    setProfile(presetProfile);
    runAnalysis(presetProfile);
  };

  const handleApplySimulatedProfile = (newProfile: CandidateProfile) => {
    setProfile(newProfile);
    runAnalysis(newProfile);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        onSelectPreset={handleSelectPreset}
        activeIndustry={activeIndustryFilter}
        onFilterIndustry={ind => {
          setActiveIndustryFilter(ind);
          if (ind !== 'integrated') {
            setProfile(prev => ({ ...prev, targetIndustry: ind }));
          }
        }}
      />

      {/* Status Toast / Banner */}
      {statusMessage && (
        <div className="bg-cyan-950/90 border-b border-cyan-800 text-cyan-200 text-xs py-2 px-4 text-center flex items-center justify-center space-x-2 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Content Area: 2-Column Responsive Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Spec Input Form (5 cols on lg) */}
          <section className="lg:col-span-5 h-full">
            <div className="sticky top-20">
              <SpecForm
                profile={profile}
                onChange={setProfile}
                onSubmit={() => runAnalysis(profile)}
                isLoading={isLoading}
              />
            </div>
          </section>

          {/* Right Column: Analysis Dashboard & Tabs (7 cols on lg) */}
          <section className="lg:col-span-7 space-y-4">
            {/* Result Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/60 p-1.5 rounded-xl border gap-1 text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveResultTab('report')}
                className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                  activeResultTab === 'report'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>공식 분석 리포트</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('benchmark')}
                className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                  activeResultTab === 'benchmark'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>합격자 DB 대조</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('roadmap')}
                className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                  activeResultTab === 'roadmap'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>액션 로드맵</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveResultTab('interview')}
                className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                  activeResultTab === 'interview'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>면접/자소서 시뮬</span>
              </button>
            </div>

            {/* Tab Views */}
            {activeResultTab === 'report' && (
              <ReportView
                analysis={analysis}
                profile={profile}
                onOpenSimulator={() => setIsSimulatorOpen(true)}
              />
            )}

            {activeResultTab === 'benchmark' && (
              <BenchmarkRadar
                analysis={analysis}
                profile={profile}
              />
            )}

            {activeResultTab === 'roadmap' && (
              <ActionRoadmap
                analysis={analysis}
                profile={profile}
              />
            )}

            {activeResultTab === 'interview' && (
              <InterviewSim
                analysis={analysis}
                profile={profile}
              />
            )}
          </section>
        </div>
      </main>

      {/* What-If Simulator Modal */}
      <SpecSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        currentProfile={profile}
        currentAnalysis={analysis}
        onApplyProfile={handleApplySimulatedProfile}
      />

      {/* Simple Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>모빌리티(자율주행, 전기차, 로보틱스, 항공우주) & 스마트팩토리(MES, 자동화, AI 비전) 직무 매칭 AI</span>
          <span className="text-slate-400 font-mono">v1.0 • Professional Career Analytics</span>
        </div>
      </footer>
    </div>
  );
}
