import React, { useState } from 'react';
import { CandidateProfile, DetailedAnalysis } from '../types';
import { analyzeProfile } from '../utils/matcher';
import { X, Sparkles, TrendingUp, Check, ArrowRight } from 'lucide-react';

interface SpecSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: CandidateProfile;
  currentAnalysis: DetailedAnalysis;
  onApplyProfile: (newProfile: CandidateProfile) => void;
}

export const SpecSimulatorModal: React.FC<SpecSimulatorModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  currentAnalysis,
  onApplyProfile
}) => {
  if (!isOpen) return null;

  const [simProfile, setSimProfile] = useState<CandidateProfile>({ ...currentProfile });
  const simulatedAnalysis = analyzeProfile(simProfile);

  const deltaMatch = simulatedAnalysis.matchPercentage - currentAnalysis.matchPercentage;

  const upgradeLanguage = (level: string) => {
    setSimProfile({
      ...simProfile,
      languageScore: {
        type: 'TOEIC_SPEAKING',
        level
      }
    });
  };

  const toggleSimSkill = (skill: string) => {
    if (simProfile.skills.includes(skill)) {
      setSimProfile({
        ...simProfile,
        skills: simProfile.skills.filter(s => s !== skill)
      });
    } else {
      setSimProfile({
        ...simProfile,
        skills: [...simProfile.skills, skill]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white">스펙 가상 업그레이드 시뮬레이터</h3>
              <p className="text-xs text-slate-400">
                어학, 보유 툴 또는 학점 변화 시 합격 일치도 변화를 실시간으로 테스트합니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Comparison Delta Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-indigo-950/80 border border-cyan-800/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-cyan-400">예상 직무 일치도 변화</div>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="text-2xl font-black text-slate-400 line-through">
                  {currentAnalysis.matchPercentage}%
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400 self-center" />
                <span className="text-3xl font-black text-cyan-300">
                  {simulatedAnalysis.matchPercentage}%
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  deltaMatch > 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                }`}>
                  {deltaMatch >= 0 ? `+${deltaMatch}%p` : `${deltaMatch}%p`}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-semibold text-slate-400">경쟁력 등급</div>
              <div className="text-base font-bold text-emerald-400 mt-1">
                {currentAnalysis.competitiveness} → {simulatedAnalysis.competitiveness}
              </div>
            </div>
          </div>

          {/* Test 1: Language Score Simulator */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-white">
              1. 어학 성적 향상 가상 테스트 (현재: {currentProfile.languageScore.level || '미취득'})
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: '토스 IL (110점)', val: 'IL (110점)' },
                { label: '토스 IM3 (130점)', val: 'IM3 (130점)' },
                { label: '토스 IH (140~150점)', val: 'IH (140점)' },
                { label: '토스 AL (160점+)', val: 'AL (160점)' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => upgradeLanguage(item.val)}
                  className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                    simProfile.languageScore.level === item.val
                      ? 'bg-cyan-600 text-white font-bold border-cyan-400 shadow-sm'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Test 2: Add Missing Key Skills */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-white">
              2. 직무 핵심 툴 추가 가상 테스트 (클릭하여 토글)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['ROS2', 'PLC', 'C++', 'Python', 'MATLAB/Simulink', 'OpenCV', 'CATIA', 'CAN 통신', 'Docker'].map((sk, idx) => {
                const hasSkill = simProfile.skills.includes(sk);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleSimSkill(sk)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-all ${
                      hasSkill
                        ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {hasSkill ? `✓ ${sk}` : `+ ${sk}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test 3: GPA Adjust */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-white">
                3. 학점(GPA) 미세 조정 가상 테스트: {simProfile.gpa.toFixed(2)} / {simProfile.maxGpa}
              </label>
              <button
                type="button"
                onClick={() => setSimProfile({ ...simProfile, gpa: currentProfile.gpa })}
                className="text-[11px] text-cyan-400 hover:underline"
              >
                원래 학점으로 초기화
              </button>
            </div>
            <input
              type="range"
              min="2.5"
              max={simProfile.maxGpa}
              step="0.05"
              value={simProfile.gpa}
              onChange={e => setSimProfile({ ...simProfile, gpa: parseFloat(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl font-medium transition-colors"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => {
              onApplyProfile(simProfile);
              onClose();
            }}
            className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-600/30 transition-all flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4" />
            <span>이 시뮬레이션 스펙을 프로필에 적용하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
