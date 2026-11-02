import React, { useState } from 'react';
import { DetailedAnalysis, CandidateProfile } from '../types';
import { 
  Check, 
  Copy, 
  Download, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  Tag,
  FileText
} from 'lucide-react';

interface ReportViewProps {
  analysis: DetailedAnalysis;
  profile: CandidateProfile;
  onOpenSimulator: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  analysis,
  profile,
  onOpenSimulator
}) => {
  const [copied, setCopied] = useState(false);
  const [showRawMarkdown, setShowRawMarkdown] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.markdownReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getCompetitivenessBadge = (level: string) => {
    switch (level) {
      case '상':
        return {
          bg: 'bg-emerald-950/80 border-emerald-500 text-emerald-300',
          text: '상 (합격 유력 및 상위권)',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />
        };
      case '중상':
        return {
          bg: 'bg-blue-950/80 border-blue-500 text-blue-300',
          text: '중상 (서류 통과 및 면접 경쟁력 충분)',
          icon: <TrendingUp className="w-4 h-4 text-blue-400" />
        };
      case '중':
        return {
          bg: 'bg-amber-950/80 border-amber-500 text-amber-300',
          text: '중 (직무 프로젝트/성과 방어 필요)',
          icon: <AlertTriangle className="w-4 h-4 text-amber-400" />
        };
      default:
        return {
          bg: 'bg-rose-950/80 border-rose-500 text-rose-300',
          text: '보완 필요 (어학/핵심툴 집중 보강 필요)',
          icon: <AlertTriangle className="w-4 h-4 text-rose-400" />
        };
    }
  };

  const compBadge = getCompetitivenessBadge(analysis.competitiveness);

  return (
    <div className="space-y-6">
      {/* Top Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Match Percentage Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>종합 직무 일치도</span>
            <span className="text-[11px] font-mono text-cyan-400">Match Rate</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {analysis.matchPercentage}%
            </span>
            <span className="text-xs text-slate-400">/ 100%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${analysis.matchPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {profile.targetCompany} {profile.targetRole || '직무'} 합격자 DB 대조 결과
          </p>
        </div>

        {/* Competitiveness Level Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>예상 합격 경쟁력</span>
            <span className="text-[11px] font-mono text-cyan-400">Probability</span>
          </div>
          <div className="my-1.5">
            <span className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-base font-bold shadow-sm ${compBadge.bg}`}>
              {compBadge.icon}
              <span>{compBadge.text}</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            {analysis.competitiveness === '상' || analysis.competitiveness === '중상'
              ? '채용 트렌드에 부합하는 기술 스택과 프로젝트를 갖추어 서류 및 실무 면접에서 높은 승산이 예상됩니다.'
              : '어학 점수 또는 핵심 툴 보강 시 합격권으로 수직 도약할 수 있는 스펙입니다.'}
          </p>
        </div>

        {/* What-If Simulator Quick CTA Card */}
        <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/40 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>스펙 가상 시뮬레이터</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              "어학 성적을 토스 AL로 올리면?", "PLC 프로젝트를 추가하면?" 즉시 변화하는 합격 확률을 테스트해보세요.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenSimulator}
            className="mt-3 w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>⚡ 스펙 업그레이드 시뮬레이션</span>
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Report Header Bar */}
        <div className="bg-slate-950/80 px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              직무 매칭 분석 정밀 리포트 (공식 양식)
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowRawMarkdown(!showRawMarkdown)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            >
              {showRawMarkdown ? '서식 뷰 보기' : '원문 마크다운 보기'}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="text-xs px-3 py-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-medium flex items-center space-x-1 shadow transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>리포트 복사</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {showRawMarkdown ? (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {analysis.markdownReport}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Target Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold text-cyan-400">ANALYSIS TARGET</div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    🎯 [{profile.targetCompany} / {profile.targetDepartment || profile.targetRole}] 직무 매칭 분석 리포트
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">종합 직무 일치도</div>
                    <div className="text-lg font-extrabold text-cyan-300">{analysis.matchPercentage}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">예상 합격 경쟁력</div>
                    <div className="text-base font-bold text-emerald-400">{analysis.competitiveness}</div>
                  </div>
                </div>
              </div>

              {/* 📊 Section 1: Detailed Items Analysis */}
              <div>
                <h4 className="text-base font-bold text-white border-b border-slate-800 pb-2 mb-3 flex items-center">
                  <span className="mr-2">📊</span> 항목별 상세 분석
                </h4>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  {/* 핵심 기술 및 툴 적합도 */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white flex items-center">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2" />
                        핵심 기술 및 툴 적합도
                      </div>
                      <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                        적합도: {analysis.skillsAnalysis.score}점
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-4">
                      {analysis.skillsAnalysis.analysisText}
                    </p>
                    <div className="pl-4 pt-1 flex flex-wrap gap-1.5">
                      {analysis.skillsAnalysis.matchedSkills.map((s, idx) => (
                        <span key={idx} className="bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-[11px] px-2 py-0.5 rounded font-mono">
                          ✓ {s} (직무 일치)
                        </span>
                      ))}
                      {analysis.skillsAnalysis.missingCrucialSkills.map((s, idx) => (
                        <span key={idx} className="bg-rose-950/80 text-rose-300 border border-rose-800/80 text-[11px] px-2 py-0.5 rounded font-mono">
                          ✕ {s} (필수 보완 필요)
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 프로젝트 경험 평가 */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white flex items-center">
                        <span className="w-2 h-2 rounded-full bg-blue-400 mr-2" />
                        프로젝트 경험 평가
                      </div>
                      <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
                        연관성: {analysis.projectAnalysis.relevanceRating} ({analysis.projectAnalysis.score}점)
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-4">
                      {analysis.projectAnalysis.analysisText}
                    </p>
                  </div>

                  {/* 정량적 스펙 평가 */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white flex items-center">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 mr-2" />
                        정량적 스펙 평가 (학점, 전공, 어학)
                      </div>
                      <span className="text-xs font-mono font-semibold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                        종합 정량: {analysis.quantitativeScore.overallQuant}점
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-4">
                      {analysis.quantitativeScore.analysisText}
                    </p>
                  </div>
                </div>
              </div>

              {/* 🔥 Section 2: Tailored Feedback */}
              <div>
                <h4 className="text-base font-bold text-white border-b border-slate-800 pb-2 mb-3 flex items-center">
                  <span className="mr-2">🔥</span> 합격률을 높이기 위한 맞춤형 피드백
                </h4>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  {/* 1. 강점 포인트 */}
                  <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-4 space-y-1.5">
                    <div className="font-bold text-emerald-300 flex items-center">
                      <span className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 text-xs flex items-center justify-center mr-2 font-black">
                        1
                      </span>
                      강점 포인트 (자소서 및 면접 어필 핵심 역량)
                    </div>
                    <ul className="list-disc list-inside text-slate-200 pl-4 space-y-1 leading-relaxed">
                      {analysis.feedback.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. 보완이 필요한 부분 */}
                  <div className="bg-amber-950/30 border border-amber-800/60 rounded-xl p-4 space-y-1.5">
                    <div className="font-bold text-amber-300 flex items-center">
                      <span className="w-5 h-5 rounded-full bg-amber-900 text-amber-300 text-xs flex items-center justify-center mr-2 font-black">
                        2
                      </span>
                      보완이 필요한 부분 (추천 자격증, 툴, 직무 경험)
                    </div>
                    <ul className="list-disc list-inside text-slate-200 pl-4 space-y-1 leading-relaxed">
                      {analysis.feedback.weaknesses.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 3. 추천 면접/자소서 키워드 */}
                  <div className="bg-blue-950/30 border border-blue-800/60 rounded-xl p-4 space-y-2">
                    <div className="font-bold text-blue-300 flex items-center">
                      <span className="w-5 h-5 rounded-full bg-blue-900 text-blue-300 text-xs flex items-center justify-center mr-2 font-black">
                        3
                      </span>
                      추천 면접/자소서 키워드 (현업 실무진이 선호하는 핵심 키워드 3가지)
                    </div>
                    <div className="flex flex-wrap gap-2 pl-4">
                      {analysis.feedback.interviewKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center space-x-1.5 bg-blue-900/80 border border-blue-500/80 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm"
                        >
                          <Tag className="w-3.5 h-3.5 text-cyan-400" />
                          <span>#{kw}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
