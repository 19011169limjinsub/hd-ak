import React from 'react';
import { DetailedAnalysis, CandidateProfile } from '../types';
import { 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Award, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';

interface ActionRoadmapProps {
  analysis: DetailedAnalysis;
  profile: CandidateProfile;
}

export const ActionRoadmap: React.FC<ActionRoadmapProps> = ({
  analysis,
  profile
}) => {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
          합격 경쟁력 제고를 위한 단계별 액션 로드맵
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          현재 스펙 대비 가장 효율적으로 합격 확률을 끌어올릴 수 있는 단기/중기 실천 지침입니다.
        </p>
      </div>

      {/* Roadmap Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Step 1: 1~2 Weeks Urgent Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-sm font-bold text-white">단기 즉시 보완 (1~2주 소요)</h4>
            </div>
            <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded">
              서류 통과율 +15%p
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
              <div className="font-semibold text-white flex items-center">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                어학 스피킹 최소 허들 완성
              </div>
              <p className="text-slate-300 leading-relaxed pl-5">
                토익스피킹 시험 집중 응시를 통해 최소 IM3(130점) 이상 또는 OPIc IM2를 2주 내 확보하세요. 서류 필터링에서 즉각 안전권에 진입합니다.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
              <div className="font-semibold text-white flex items-center">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                프로젝트 STAR 성과 수치화
              </div>
              <p className="text-slate-300 leading-relaxed pl-5">
                "성공적으로 구현함" 대신 "오차 반경 15cm 이내 제어, 사이클 타임 18% 단축"과 같이 명확한 정량 수치로 이력서 불렛포인트를 수정하세요.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: 3~4 Weeks In-Depth Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-lg bg-blue-950 text-blue-400 border border-blue-800 text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-sm font-bold text-white">중기 직무 포트폴리오 (3~4주 소요)</h4>
            </div>
            <span className="text-[11px] font-semibold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded">
              면접 합격률 +25%p
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
              <div className="font-semibold text-white flex items-center">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                미보유 직무 필수 툴 미니 프로젝트
              </div>
              <p className="text-slate-300 leading-relaxed pl-5">
                {analysis.skillsAnalysis.missingCrucialSkills.length > 0 ? (
                  <>
                    부족한 툴인 <strong className="text-cyan-300">[{analysis.skillsAnalysis.missingCrucialSkills[0]}]</strong>를 활용한 소규모 오픈소스 예제 또는 시뮬레이션을 수행하고 GitHub에 커밋 로그를 남기세요.
                  </>
                ) : (
                  '실제 타겟 장비 환경(ROS2 노드 통신 또는 PLC 가상 시뮬레이터)을 구동하고 영상 시연 자료를 포트폴리오에 첨부하세요.'
                )}
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
              <div className="font-semibold text-white flex items-center">
                <CheckCircle className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
                트러블슈팅(Troubleshooting) 보고서 작성
              </div>
              <p className="text-slate-300 leading-relaxed pl-5">
                개발 중 발생했던 통신 패킷 유실, 센서 노이즈, 기구 간섭 등의 원인 분석과 해결 프로세스를 1장짜리 기술 보고서 형식으로 자소서에 녹여내세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Certifications & Skills for Target Industry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center">
          <Award className="w-4 h-4 mr-2 text-cyan-400" />
          {profile.targetCompany} {profile.targetRole || '직무'} 맞춤형 추천 자격증 및 학습 트랙
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-300">공학 국가기술자격증</div>
            <p className="text-slate-400 leading-relaxed">
              {profile.targetIndustry === 'mobility'
                ? '일반기계기사, 정보처리기사, 전자기사 (전공 기본기 공인)'
                : '일반기계기사, 전기기사, 산업안전기사 (스마트공장 설비 및 안전)'}
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-300">데이터 & AI 활용 자격</div>
            <p className="text-slate-400 leading-relaxed">
              ADsP (데이터분석준전문가), SQLD (공정 데이터 및 센서 로그 쿼리/분석 증명)
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-300">실무 툴 무료 튜토리얼</div>
            <p className="text-slate-400 leading-relaxed">
              ROS2 공식 문서(Humble/Iron), MathWorks Onramp(MATLAB/Simulink), Siemens TIA Portal 기초
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
