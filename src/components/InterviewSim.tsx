import React, { useState } from 'react';
import { DetailedAnalysis, CandidateProfile } from '../types';
import { 
  MessageSquare, 
  HelpCircle, 
  Sparkles, 
  Tag, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';

interface InterviewSimProps {
  analysis: DetailedAnalysis;
  profile: CandidateProfile;
}

export const InterviewSim: React.FC<InterviewSimProps> = ({
  analysis,
  profile
}) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

  const keywords = analysis.feedback.interviewKeywords;

  const sampleQuestions = [
    {
      keyword: keywords[0],
      question: `"${keywords[0]}" 기술 또는 개념을 활용하여 진행했던 프로젝트 중 발생한 가장 치명적인 문제(예: 노이즈, 지연, 충돌)와 이를 해결한 구체적 접근법을 설명해 주십시오.`,
      interviewerIntent: '이론적 지식이 아닌 실제 현업 장비/센서/알고리즘 구현 중 겪은 디버깅 및 트러블슈팅 역량을 평가함.',
      starGuide: {
        situation: '프로젝트 개발 중 센서 데이터 왜곡 혹은 제어 주기 불일치 발생 상황 제시',
        task: '해당 문제를 특정하기 위해 사용한 분석 기법(오실로스코프, ROS bag 로그 등)',
        action: '알고리즘 필터(칼만필터/LPF) 적용 또는 하드웨어 인터페이스 보정 과정 구체 기술',
        result: '개선 전후의 정량적 비교 수치(오차율 감축, 처리 지연 감소 등) 제시'
      }
    },
    {
      keyword: keywords[1],
      question: `우리 회사(${profile.targetCompany})의 양산/실차 환경에서 "${keywords[1]}" 관련 시스템에 예기치 못한 하드웨어 장애(Fail)가 발생했을 때, 어떻게 Fail-Safe 또는 이중화(Redundancy)를 구성할 것입니까?`,
      interviewerIntent: '단순 정상 작동뿐 아니라 기능 안전(ISO 26262 또는 산업 안전 규격)과 시스템 안정성을 고려하는 엔지니어링 마인드 확인.',
      starGuide: {
        situation: '타겟 시스템의 핵심 부품(센서, 액추에이터, 통신선) 고장 시나리오 상정',
        task: '인터록(Interlock) 설정 및 안전 정지/감속(Limp-home) 모드 설계 목표 수립',
        action: 'SW 상태 머신(FSM) 상의 안전 천이 로직 및 감시 와치독(Watchdog) 구현 방식 제시',
        result: '안전성 확보 및 작업자/차량 탑승자 안전 보호 결과 피력'
      }
    },
    {
      keyword: keywords[2],
      question: `"${keywords[2]}" 경험을 자소서에 기술하셨는데, 본인이 작성한 코드나 설계 결과물이 실제 하드웨어/공정 라인에 적용되었을 때 이론과 가장 달랐던 점은 무엇이었습니까?`,
      interviewerIntent: '시뮬레이션 환경(이상적인 상태)과 실제 물리적 현실(마찰, 통신 딜레이, 진동)의 간극을 이해하고 현장 튜닝 역량을 갖추었는지 검증.',
      starGuide: {
        situation: '시뮬레이션 상에서는 정상이던 제어 루프가 실차/실물에서 발진하거나 편차를 보인 경험',
        task: '시뮬레이터 모델의 파라미터 오차 및 물리적 제약조건 규명',
        action: '게인(Gain) 튜닝, 샘플링 타임 보정 또는 필터 튜닝을 통해 실물 동기화 달성',
        result: '이론값 대비 95% 이상 실물 일치도 검증'
      }
    },
    {
      keyword: '직무 협업 및 소통',
      question: `${profile.major} 전공자로서 타 분야(예: SW-HW 엔지니어 간, 공정-설비 엔지니어 간)와 의견 충돌이 발생했을 때 기술적 데이터로 설득했던 경험을 들려주십시오.`,
      interviewerIntent: '모빌리티 및 스마트팩토리는 전형적인 다학제 융합 직무이므로 감정이 아닌 객관적 로그/수치로 소통하는 자세를 평가.',
      starGuide: {
        situation: '기구 간섭, 통신 프로토콜 규격 또는 공정 택타임 기준에 대한 이견 발생',
        task: '감정적 주장이 아닌 테스트 벤치 측정 데이터 수집',
        action: '객관적 그래프 및 시뮬레이션 결과로 대안 제시 및 타협점 도출',
        result: '일정 지연 없이 성공적인 시스템 통합 완료'
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center">
              <Sparkles className="w-4 h-4 mr-1.5" />
              실전 면접 & 자소서 시뮬레이터
            </div>
            <h3 className="text-lg font-bold text-white">
              {profile.targetCompany} {profile.targetRole || '직무'} 빈출 기술 면접 대비
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              도출된 3대 핵심 키워드(#{keywords.join(', #')})를 기반으로 실무진 면접 질문을 시뮬레이션합니다.
            </p>
          </div>
        </div>

        {/* Keywords Ribbon */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-800">
          <span className="text-xs text-slate-400 self-center">추천 면접 키워드:</span>
          {keywords.map((kw, idx) => (
            <span
              key={idx}
              className="bg-blue-950/80 text-cyan-300 border border-blue-700/80 text-xs px-2.5 py-1 rounded-md font-semibold flex items-center space-x-1"
            >
              <Tag className="w-3 h-3 text-cyan-400" />
              <span>{kw}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Question List & Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Question Selector List */}
        <div className="space-y-2 md:col-span-1">
          <div className="text-xs font-semibold text-slate-400 mb-2">면접 예상 질문 리스트</div>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveQuestionIdx(idx)}
              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start justify-between ${
                activeQuestionIdx === idx
                  ? 'bg-slate-800 border-cyan-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1 pr-2">
                <span className="inline-block text-[10px] font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800/80">
                  Q{idx + 1}. {q.keyword}
                </span>
                <p className="line-clamp-2 font-medium">{q.question}</p>
              </div>
              <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 ${activeQuestionIdx === idx ? 'text-cyan-400' : 'text-slate-600'}`} />
            </button>
          ))}
        </div>

        {/* Selected Question Detail & STAR Guide */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
              Question #{activeQuestionIdx + 1}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white mt-2 leading-relaxed">
              {sampleQuestions[activeQuestionIdx].question}
            </h4>
          </div>

          {/* Intent */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <div className="font-semibold text-amber-300 flex items-center mb-1">
              <HelpCircle className="w-3.5 h-3.5 mr-1 text-amber-400" />
              현업 실무진 질문 의도:
            </div>
            <p className="text-slate-300 leading-relaxed">
              {sampleQuestions[activeQuestionIdx].interviewerIntent}
            </p>
          </div>

          {/* STAR Framework */}
          <div>
            <div className="text-xs font-bold text-white mb-2 flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              모범 답변 구성 가이드 (STAR 기법)
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="font-bold text-cyan-400 mr-2">[S - 상황]</span>
                <span className="text-slate-300">{sampleQuestions[activeQuestionIdx].starGuide.situation}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="font-bold text-blue-400 mr-2">[T - 과제]</span>
                <span className="text-slate-300">{sampleQuestions[activeQuestionIdx].starGuide.task}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="font-bold text-indigo-400 mr-2">[A - 행동]</span>
                <span className="text-slate-300">{sampleQuestions[activeQuestionIdx].starGuide.action}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80">
                <span className="font-bold text-emerald-400 mr-2">[R - 결과]</span>
                <span className="text-slate-300">{sampleQuestions[activeQuestionIdx].starGuide.result}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
