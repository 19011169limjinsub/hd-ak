import React from 'react';
import { Bot, Sparkles, Building2, Cpu, Car, Layers } from 'lucide-react';
import { PRESET_PROFILES } from '../data/presets';
import { CandidateProfile, IndustryType } from '../types';

interface HeaderProps {
  onSelectPreset: (profile: CandidateProfile) => void;
  activeIndustry: IndustryType;
  onFilterIndustry: (ind: IndustryType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectPreset,
  activeIndustry,
  onFilterIndustry,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  모빌리티 & 스마트팩토리 <span className="text-cyan-400">AI 취업 컨설턴트</span>
                </h1>
                <span className="text-[11px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 px-2 py-0.5 rounded-full">
                  합격자 DB 연동
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                스펙 데이터 분석 기반 직무 일치도(%), 합격 확률 예측 및 현업 맞춤형 피드백
              </p>
            </div>
          </div>

          {/* Industry Filter Buttons */}
          <div className="flex items-center gap-1.5 self-start md:self-auto bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => onFilterIndustry('integrated')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeIndustry === 'integrated'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>전체 산업</span>
            </button>
            <button
              type="button"
              onClick={() => onFilterIndustry('mobility')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeIndustry === 'mobility'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>모빌리티/항공</span>
            </button>
            <button
              type="button"
              onClick={() => onFilterIndustry('smartfactory')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeIndustry === 'smartfactory'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>스마트팩토리/설비</span>
            </button>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 flex items-center font-medium pr-1">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" />
            예시 스펙 1초 불러오기:
          </span>
          {PRESET_PROFILES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPreset(preset.profile)}
              className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-slate-700/60 hover:border-cyan-500/50 transition-colors flex items-center space-x-1"
            >
              <Building2 className="w-3 h-3 text-cyan-400" />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
