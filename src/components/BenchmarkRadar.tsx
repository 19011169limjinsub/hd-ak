import React from 'react';
import { DetailedAnalysis, CandidateProfile } from '../types';
import { findBenchmark } from '../utils/matcher';
import { 
  Building2, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Compass,
  Briefcase
} from 'lucide-react';

interface BenchmarkRadarProps {
  analysis: DetailedAnalysis;
  profile: CandidateProfile;
}

export const BenchmarkRadar: React.FC<BenchmarkRadarProps> = ({
  analysis,
  profile
}) => {
  const benchmark = findBenchmark(profile);
  const normalizedGpa = (profile.gpa / profile.maxGpa) * 4.5;

  return (
    <div className="space-y-6">
      {/* Benchmark Header Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
                공식 합격자 DB 벤치마크
              </span>
              <span className="text-xs text-slate-400">
                {benchmark.industry === 'mobility' ? '모빌리티/항공우주' : '스마트팩토리/설비'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              {benchmark.companyName} - {benchmark.roleTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              소속: {benchmark.department}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-medium">합격자 평균 학점</div>
              <div className="text-base font-bold text-cyan-300 font-mono">{benchmark.avgGpa} / 4.5</div>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-medium">최소 권장선</div>
              <div className="text-base font-bold text-slate-300 font-mono">{benchmark.minRecommendedGpa} / 4.5</div>
            </div>
          </div>
        </div>

        {/* Hiring Trend Banner */}
        <div className="mt-4 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start space-x-2.5">
          <Compass className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white mr-1.5">최신 수시 채용 실무 트렌드:</span>
            <span>{benchmark.hiringTrend}</span>
          </div>
        </div>
      </div>

      {/* Comparison Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* GPA Comparison Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center">
              <BarChart3 className="w-4 h-4 mr-2 text-cyan-400" />
              학점(GPA) 벤치마크 대조
            </h4>
            <span className="text-xs text-slate-400">4.5 환산 기준</span>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-semibold text-cyan-300">내 학점 ({normalizedGpa.toFixed(2)})</span>
                <span className="font-mono">{normalizedGpa.toFixed(2)} / 4.5</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: `${Math.min(100, (normalizedGpa / 4.5) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>합격자 평균 ({benchmark.avgGpa})</span>
                <span className="font-mono">{benchmark.avgGpa} / 4.5</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-slate-500 h-2 rounded-full"
                  style={{ width: `${(benchmark.avgGpa / 4.5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>서류 통과 최소 권장선 ({benchmark.minRecommendedGpa})</span>
                <span className="font-mono">{benchmark.minRecommendedGpa} / 4.5</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-slate-700 h-2 rounded-full"
                  style={{ width: `${(benchmark.minRecommendedGpa / 4.5) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 pt-1">
            {normalizedGpa >= benchmark.avgGpa
              ? '✅ 합격자 평균 학점을 상회하여 학점 리스크가 전혀 없습니다.'
              : normalizedGpa >= benchmark.minRecommendedGpa
              ? '⚠️ 평균보다 소폭 낮으나 감점선은 아니며, 프로젝트 실무역량으로 커버됩니다.'
              : '🚨 합격자 평균 대비 학점이 다소 낮아 실무 포트폴리오를 철저히 보강해야 합니다.'}
          </p>
        </div>

        {/* Language Comparison Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-cyan-400" />
              어학 요건 벤치마크 대조
            </h4>
            <span className="text-xs text-slate-400">스피킹/공인성적</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">내 보유 어학:</span>
              <span className="font-bold text-white">
                {profile.languageScore.level ? `${profile.languageScore.type} ${profile.languageScore.level}` : '미취득/성적없음'}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
              <span className="text-slate-400">권장 어학선:</span>
              <span className="font-bold text-cyan-300">
                {benchmark.recommendedLanguages.join(' / ')}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            대부분의 모빌리티/스마트팩토리 대기업은 토익보다 <strong>토익스피킹(IM3 130점+)</strong> 또는 <strong>OPIc(IM2+)</strong> 실전 회화 지표를 우선 심사합니다.
          </p>
        </div>
      </div>

      {/* Skills Matrix Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center">
          <Building2 className="w-4 h-4 mr-2 text-cyan-400" />
          직무 필수 툴 vs 내 스킬 적합도 매트릭스
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Matched Skills */}
          <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>직무 매칭 성공 툴 ({analysis.skillsAnalysis.matchedSkills.length})</span>
            </div>
            {analysis.skillsAnalysis.matchedSkills.length === 0 ? (
              <p className="text-slate-400 text-[11px]">일치하는 필수 툴이 아직 없습니다.</p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {analysis.skillsAnalysis.matchedSkills.map((s, idx) => (
                  <span key={idx} className="bg-emerald-900/60 text-emerald-200 border border-emerald-700 px-2 py-0.5 rounded font-mono">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Missing Crucial Skills */}
          <div className="bg-rose-950/30 border border-rose-800/60 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-rose-300">
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>미보유 필수 툴 ({analysis.skillsAnalysis.missingCrucialSkills.length})</span>
            </div>
            {analysis.skillsAnalysis.missingCrucialSkills.length === 0 ? (
              <p className="text-emerald-400 text-[11px]">모든 필수 툴을 이미 보유하고 있습니다!</p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {analysis.skillsAnalysis.missingCrucialSkills.map((s, idx) => (
                  <span key={idx} className="bg-rose-900/60 text-rose-200 border border-rose-700 px-2 py-0.5 rounded font-mono">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Plus / Complementary Skills */}
          <div className="bg-blue-950/30 border border-blue-800/60 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-blue-300">
              <AlertCircle className="w-4 h-4 text-blue-400" />
              <span>우대 가산 툴 ({benchmark.preferredSkills.length})</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {benchmark.preferredSkills.map((s, idx) => {
                const hasIt = profile.skills.some(us => us.toLowerCase() === s.toLowerCase());
                return (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] border ${
                      hasIt
                        ? 'bg-blue-900/80 text-blue-200 border-blue-600 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {s} {hasIt ? '★' : ''}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sample Passed Projects from DB */}
        <div className="pt-2 border-t border-slate-800">
          <div className="text-xs font-semibold text-slate-300 mb-2">
            🏆 실제 합격자들의 대표 프로젝트 사례 (DB):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {benchmark.samplePassedProjects.map((p, idx) => (
              <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                <span className="text-cyan-400 font-bold mr-1">#{idx + 1}</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
