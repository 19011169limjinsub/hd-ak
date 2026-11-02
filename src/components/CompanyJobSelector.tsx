import React, { useMemo } from 'react';
import { CandidateProfile, DetailedAnalysis, CompanyBenchmark } from '../types';
import { COMPANY_BENCHMARKS } from '../data/benchmarks';
import { analyzeProfile, findBenchmark } from '../utils/matcher';
import { 
  Building2, 
  Target, 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BarChart2
} from 'lucide-react';

interface CompanyJobSelectorProps {
  profile: CandidateProfile;
  onChangeProfile: (profile: CandidateProfile) => void;
  onRunAnalysis: () => void;
  isLoading: boolean;
}

export const CompanyJobSelector: React.FC<CompanyJobSelectorProps> = ({
  profile,
  onChangeProfile,
  onRunAnalysis,
  isLoading
}) => {
  // Live instant calculation of acceptance rate and match percentage for the selected company
  const liveAnalysis = useMemo(() => {
    return analyzeProfile(profile);
  }, [profile]);

  const currentBenchmark = useMemo(() => {
    return findBenchmark(profile);
  }, [profile]);

  // Extract unique companies from database
  const uniqueCompanies = useMemo(() => {
    const names = Array.from(new Set(COMPANY_BENCHMARKS.map(b => b.companyName)));
    return names;
  }, []);

  // Filter available departments and roles for the selected company
  const availableBenchmarksForCompany = useMemo(() => {
    return COMPANY_BENCHMARKS.filter(b => b.companyName === profile.targetCompany);
  }, [profile.targetCompany]);

  const handleSelectCompany = (companyName: string) => {
    const defaultForCompany = COMPANY_BENCHMARKS.find(b => b.companyName === companyName);
    if (defaultForCompany) {
      onChangeProfile({
        ...profile,
        targetCompany: defaultForCompany.companyName,
        targetDepartment: defaultForCompany.department,
        targetRole: defaultForCompany.roleTitle,
        targetIndustry: defaultForCompany.industry
      });
    } else {
      onChangeProfile({
        ...profile,
        targetCompany: companyName
      });
    }
  };

  const handleSelectBenchmark = (benchmarkId: string) => {
    const found = COMPANY_BENCHMARKS.find(b => b.id === benchmarkId);
    if (found) {
      onChangeProfile({
        ...profile,
        targetCompany: found.companyName,
        targetDepartment: found.department,
        targetRole: found.roleTitle,
        targetIndustry: found.industry
      });
    }
  };

  const getCompetitivenessBadge = (level: string) => {
    switch (level) {
      case '상':
        return {
          bg: 'bg-emerald-950/90 border-emerald-500 text-emerald-300',
          text: '상 (합격 유력권)',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />
        };
      case '중상':
        return {
          bg: 'bg-blue-950/90 border-blue-500 text-blue-300',
          text: '중상 (서류 통과 안정권)',
          icon: <TrendingUp className="w-4 h-4 text-blue-400" />
        };
      case '중':
        return {
          bg: 'bg-amber-950/90 border-amber-500 text-amber-300',
          text: '중 (프로젝트 방어 필요)',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />
        };
      default:
        return {
          bg: 'bg-rose-950/90 border-rose-500 text-rose-300',
          text: '보완 필요 (어학/핵심툴 집중)',
          icon: <AlertTriangle className="w-4 h-4 text-rose-400" />
        };
    }
  };

  const compBadge = getCompetitivenessBadge(liveAnalysis.competitiveness);
  const normalizedGpa = (profile.gpa / profile.maxGpa) * 4.5;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-slate-950/80 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold flex items-center justify-center">
            2
          </span>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center">
              <Target className="w-4 h-4 mr-1.5 text-cyan-400" />
              원하는 회사 & 관련 부서 직무 선택 칸
            </h3>
            <p className="text-[11px] text-slate-400">
              목표 기업과 부서/직무를 선택하면 해당 합격자 DB와 실시간 대조하여 합격률을 제시합니다.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded-full">
          실시간 합격률 연동
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Quick Company Badges */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
            <span>주요 추천 회사 선택</span>
            <span className="text-[11px] text-slate-400">클릭 시 자동 설정</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {uniqueCompanies.map((compName, idx) => {
              const isSelected = profile.targetCompany === compName;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectCompany(compName)}
                  className={`p-2 rounded-xl border text-xs font-medium text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-950/90 border-cyan-500 text-cyan-300 font-bold shadow-md ring-1 ring-cyan-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="truncate">{compName}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Company, Department, and Role Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Company Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              목표 회사명 (직접입력 가능)
            </label>
            <input
              type="text"
              value={profile.targetCompany}
              onChange={e => onChangeProfile({ ...profile, targetCompany: e.target.value })}
              placeholder="예: 현대자동차, 현대차/모트라스"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              관련 부서 / 사업부
            </label>
            {availableBenchmarksForCompany.length > 0 ? (
              <select
                value={profile.targetDepartment}
                onChange={e => {
                  const selDept = e.target.value;
                  const matched = availableBenchmarksForCompany.find(b => b.department === selDept);
                  if (matched) {
                    onChangeProfile({
                      ...profile,
                      targetDepartment: matched.department,
                      targetRole: matched.roleTitle,
                      targetIndustry: matched.industry
                    });
                  } else {
                    onChangeProfile({ ...profile, targetDepartment: selDept });
                  }
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {availableBenchmarksForCompany.map(b => (
                  <option key={b.id} value={b.department}>
                    {b.department}
                  </option>
                ))}
                <option value={profile.targetDepartment}>직접 입력 부서</option>
              </select>
            ) : (
              <input
                type="text"
                value={profile.targetDepartment}
                onChange={e => onChangeProfile({ ...profile, targetDepartment: e.target.value })}
                placeholder="예: 생산기술팀, AVP본부"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              희망 직무 (Role)
            </label>
            <input
              type="text"
              value={profile.targetRole}
              onChange={e => onChangeProfile({ ...profile, targetRole: e.target.value })}
              placeholder="예: 스마트 제조 설비 엔지니어"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>
        </div>

        {/* ⚡ REAL-TIME ACCEPTANCE RATE & MATCH PRESENTATION BOX */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyan-950/70 via-blue-950/70 to-slate-950 border border-cyan-800/80 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-800/40 pb-3">
            <div>
              <div className="text-[11px] font-semibold text-cyan-400 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>선택한 회사 합격률 및 직무 일치도 분석 결과</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                🎯 {profile.targetCompany} <span className="text-cyan-300 font-normal">/</span> {profile.targetDepartment || profile.targetRole}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              {/* Acceptance / Match Percentage */}
              <div className="bg-slate-950/90 px-4 py-2 rounded-xl border border-cyan-700/60 text-center shadow">
                <div className="text-[10px] text-slate-400 font-medium">예상 합격률 (직무 일치도)</div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono tracking-tight">
                  {liveAnalysis.matchPercentage}%
                </div>
              </div>

              {/* Competitiveness Tag */}
              <div className="bg-slate-950/90 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 font-medium">합격 경쟁력</div>
                <div className={`mt-0.5 text-xs sm:text-sm font-bold flex items-center justify-center space-x-1 ${compBadge.bg} px-2 py-0.5 rounded-lg border`}>
                  {compBadge.icon}
                  <span>{liveAnalysis.competitiveness}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Benchmark Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            {/* GPA Stat */}
            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
              <div className="text-slate-400 text-[11px] mb-1">학점(GPA) 대조</div>
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-cyan-300 font-bold">{normalizedGpa.toFixed(2)}/4.5</span>
                <span className="text-slate-400 text-[10px]">평균 {currentBenchmark.avgGpa}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
                <div
                  className="bg-cyan-400 h-1.5 rounded-full"
                  style={{ width: `${Math.min(100, (normalizedGpa / 4.5) * 100)}%` }}
                />
              </div>
            </div>

            {/* Language Stat */}
            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
              <div className="text-slate-400 text-[11px] mb-1">어학 요건 충족도</div>
              <div className="truncate font-semibold text-white">
                {profile.languageScore.level || '어학 성적 없음'}
              </div>
              <div className="text-[10px] text-cyan-400 truncate mt-1">
                권장: {currentBenchmark.recommendedLanguages[0]}
              </div>
            </div>

            {/* Skills Match Stat */}
            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
              <div className="text-slate-400 text-[11px] mb-1">필수 툴 일치율</div>
              <div className="flex items-center space-x-1 font-semibold text-white">
                <span className="text-emerald-400">✓ {liveAnalysis.skillsAnalysis.matchedSkills.length}개 일치</span>
                {liveAnalysis.skillsAnalysis.missingCrucialSkills.length > 0 && (
                  <span className="text-rose-400 text-[11px]">/ {liveAnalysis.skillsAnalysis.missingCrucialSkills.length}개 보완</span>
                )}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-1">
                {liveAnalysis.skillsAnalysis.matchedSkills.join(', ') || '기초 스킬'}
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-slate-400">
              💡 다른 회사를 선택하면 실시간으로 해당 기업의 합격자 DB와 대조되어 합격률이 자동 재계산됩니다.
            </p>
            <button
              type="button"
              onClick={onRunAnalysis}
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-600/30 transition-all flex items-center justify-center space-x-1.5 flex-shrink-0"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>분석 리포트 생성 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>선택 회사 정밀 AI 분석 리포트 생성</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
