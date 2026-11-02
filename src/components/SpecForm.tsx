import React, { useState } from 'react';
import { 
  CandidateProfile, 
  ProjectExperience 
} from '../types';
import { COMMON_SKILLS, CERTIFICATE_PRESETS, COMPANY_BENCHMARKS } from '../data/benchmarks';
import { 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Building, 
  Plus, 
  Trash2, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SpecFormProps {
  profile: CandidateProfile;
  onChange: (profile: CandidateProfile) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const SpecForm: React.FC<SpecFormProps> = ({
  profile,
  onChange,
  onSubmit,
  isLoading
}) => {
  const [skillInput, setSkillInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'skills' | 'projects'>('basic');

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !profile.skills.includes(trimmed)) {
      onChange({ ...profile, skills: [...profile.skills, trimmed] });
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...profile,
      skills: profile.skills.filter(s => s !== skillToRemove)
    });
  };

  const addCert = (cert: string) => {
    const trimmed = cert.trim();
    if (trimmed && !profile.certificates.includes(trimmed)) {
      onChange({ ...profile, certificates: [...profile.certificates, trimmed] });
      setCertInput('');
    }
  };

  const removeCert = (certToRemove: string) => {
    onChange({
      ...profile,
      certificates: profile.certificates.filter(c => c !== certToRemove)
    });
  };

  const addProject = () => {
    const newProj: ProjectExperience = {
      id: 'proj-' + Date.now(),
      title: '새로운 직무 연관 프로젝트',
      role: '담당 역할 (예: 제어기 설계 및 데이터 분석)',
      techStack: ['Python', 'C++'],
      description: '프로젝트 핵심 내용, 해결한 기술적 난제 및 적용 기술을 상세히 기술하세요.',
      outcome: '정량적 성과 (예: 사이클 타임 15% 단축, 오차율 2% 이내 달성)'
    };
    onChange({ ...profile, projects: [...profile.projects, newProj] });
  };

  const updateProject = (id: string, updatedFields: Partial<ProjectExperience>) => {
    onChange({
      ...profile,
      projects: profile.projects.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    });
  };

  const deleteProject = (id: string) => {
    onChange({
      ...profile,
      projects: profile.projects.filter(p => p.id !== id)
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col overflow-hidden">
      {/* Step 1 Header */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold flex items-center justify-center">
            1
          </span>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center">
              <GraduationCap className="w-4 h-4 mr-1.5 text-cyan-400" />
              나의 개인 스펙 제시
            </h3>
            <p className="text-[11px] text-slate-400">
              전공, 학점, 보유 기술/툴, 프로젝트 경험, 자격증 및 어학
            </p>
          </div>
        </div>
        <div className="text-[11px] font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 hidden sm:block">
          {profile.gpa}/{profile.maxGpa} | 툴 {profile.skills.length}개 | PJT {profile.projects.length}개
        </div>
      </div>

      {/* Form Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 p-1.5 gap-1 text-xs sm:text-sm font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'basic' ? 'bg-slate-800 text-cyan-400 font-semibold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>전공/학점/어학</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('skills')}
          className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'skills' ? 'bg-slate-800 text-cyan-400 font-semibold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>보유기술/툴 ({profile.skills.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
            activeTab === 'projects' ? 'bg-slate-800 text-cyan-400 font-semibold shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>프로젝트 ({profile.projects.length})</span>
        </button>
      </div>

      {/* Form Content Area */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-5">
        {/* TAB 1: BASIC SPEC */}
        {activeTab === 'basic' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-semibold text-white flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-cyan-400" />
                전공 및 정량 스펙 정보
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                기계, 항공우주, 전기전자, 컴퓨터, 화학공학 등 산업군 핵심 전공과 학점을 입력합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  전공 명칭 (학과/학부)
                </label>
                <input
                  type="text"
                  value={profile.major}
                  onChange={e => onChange({ ...profile, major: e.target.value })}
                  placeholder="예: 기계항공우주공학, 메카트로닉스"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  전공 계열 분류
                </label>
                <select
                  value={profile.majorCategory}
                  onChange={e => onChange({ ...profile, majorCategory: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="aerospace">기계/항공우주 계열</option>
                  <option value="mechanical">기계/메카트로닉스/로봇</option>
                  <option value="electrical_electronic">전기/전자/제어 계열</option>
                  <option value="computer_software">컴퓨터/소프트웨어 계열</option>
                  <option value="industrial_chemical">화학/신소재/산업공학</option>
                  <option value="other">기타 이공계열</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  학점 (GPA)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.01"
                    min="1.0"
                    max={profile.maxGpa}
                    value={profile.gpa}
                    onChange={e => onChange({ ...profile, gpa: parseFloat(e.target.value) || 0 })}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-semibold text-center focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-slate-400 font-medium">/</span>
                  <select
                    value={profile.maxGpa}
                    onChange={e => onChange({ ...profile, maxGpa: parseFloat(e.target.value) as any })}
                    className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={4.5}>4.5 만점</option>
                    <option value={4.3}>4.3 만점</option>
                    <option value={4.0}>4.0 만점</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  공학인증 (ABEEK)
                </label>
                <button
                  type="button"
                  onClick={() => onChange({ ...profile, hasEngineeringAccreditation: !profile.hasEngineeringAccreditation })}
                  className={`w-full py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors ${
                    profile.hasEngineeringAccreditation
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                      : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${profile.hasEngineeringAccreditation ? 'text-cyan-400' : 'text-slate-600'}`} />
                  <span>{profile.hasEngineeringAccreditation ? '공학인증 이수완료' : '공학인증 미이수'}</span>
                </button>
              </div>
            </div>

            {/* Language Specs */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-medium text-slate-300 mb-2">
                어학 성적 (영어 말하기/공인어학)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <select
                    value={profile.languageScore.type}
                    onChange={e => onChange({
                      ...profile,
                      languageScore: { ...profile.languageScore, type: e.target.value as any }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="TOEIC_SPEAKING">토익스피킹 (TOEIC Speaking)</option>
                    <option value="OPIC">오픽 (OPIc)</option>
                    <option value="TOEIC">토익 (TOEIC 정기시험)</option>
                    <option value="OTHER">기타 공인 어학</option>
                    <option value="NONE">미취득 / 성적 없음</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    value={profile.languageScore.level}
                    onChange={e => onChange({
                      ...profile,
                      languageScore: { ...profile.languageScore, level: e.target.value }
                    })}
                    placeholder="예: IL (110점), IM3 (130점), IH, AL, 850점"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                💡 팁: 현대차, 모비스, LG엔솔 등은 말하기(토스, OPIc) 성적을 필수 서류 요건으로 요구합니다.
              </p>
            </div>

            {/* Certificates */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                <span>보유 자격증</span>
                <span className="text-[11px] text-slate-400">클릭하여 추가</span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {CERTIFICATE_PRESETS.map((cert, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addCert(cert)}
                    className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                      profile.certificates.includes(cert)
                        ? 'bg-blue-900/60 border-blue-500 text-blue-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    + {cert}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={certInput}
                  onChange={e => setCertInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCert(certInput);
                    }
                  }}
                  placeholder="직접 자격증 입력 후 Enter"
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => addCert(certInput)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                >
                  추가
                </button>
              </div>

              {profile.certificates.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {profile.certificates.map((cert, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 bg-slate-800 text-cyan-300 text-xs px-2.5 py-1 rounded-md border border-slate-700"
                    >
                      <Award className="w-3 h-3 text-cyan-400" />
                      <span>{cert}</span>
                      <button
                        type="button"
                        onClick={() => removeCert(cert)}
                        className="text-slate-400 hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS & TOOLS */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-semibold text-white flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-cyan-400" />
                핵심 보유 기술 및 툴 (Skills & Tools)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                모빌리티 제어, 3D 설계, 자율주행 알고리즘, 스마트팩토리 PLC/비전 검사 툴 등을 등록합니다.
              </p>
            </div>

            {/* Quick Add Pill Cloud */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                인기 툴/스킬 원클릭 추가
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1 bg-slate-950/60 rounded-lg border border-slate-800/80">
                {COMMON_SKILLS.map((skill, idx) => {
                  const isSelected = profile.skills.includes(skill);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => isSelected ? removeSkill(skill) : addSkill(skill)}
                      className={`text-xs px-2.5 py-1 rounded-md font-mono transition-all ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {skill} {isSelected ? '✓' : '+'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                placeholder="직접 툴/스킬 입력 (예: EtherCAT, Gazebo, TwinCAT)"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => addSkill(skillInput)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg shadow"
              >
                추가
              </button>
            </div>

            {/* Active Skills List */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2 flex items-center justify-between">
                <span>현재 등록된 보유 기술 ({profile.skills.length}개)</span>
                <span className="text-[11px] text-slate-400">클릭하여 삭제</span>
              </label>
              {profile.skills.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
                  등록된 기술이 없습니다. 상단에서 추천 툴을 클릭하거나 직접 입력하세요.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1.5 bg-slate-800 text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-500/50 transition-colors"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-slate-400 hover:text-rose-400 ml-1 font-bold"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center">
                  <FolderGit2 className="w-4 h-4 mr-2 text-cyan-400" />
                  주요 프로젝트 경험 ({profile.projects.length}개)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  캡스톤 디자인, 대회, 실무 인턴 등 실무 기여도와 직결되는 프로젝트
                </p>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center space-x-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>프로젝트 추가</span>
              </button>
            </div>

            {profile.projects.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl text-slate-400 text-xs">
                <p className="mb-2">등록된 프로젝트가 없습니다.</p>
                <button
                  type="button"
                  onClick={addProject}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-md border border-slate-700"
                >
                  + 첫 번째 프로젝트 등록하기
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {profile.projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80">
                        Project #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteProject(proj.id)}
                        className="text-slate-500 hover:text-rose-400 text-xs flex items-center space-x-1 transition-colors"
                        aria-label={`Delete project ${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>삭제</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        프로젝트명
                      </label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={e => updateProject(proj.id, { title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          수행 역할 / 기여도
                        </label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={e => updateProject(proj.id, { role: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          사용 기술스택 (쉼표 구분)
                        </label>
                        <input
                          type="text"
                          value={proj.techStack.join(', ')}
                          onChange={e => updateProject(proj.id, {
                            techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        상세 수행 내용 및 직무 연관 기술적 문제해결
                      </label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={e => updateProject(proj.id, { description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        정량적 성과 및 결과물
                      </label>
                      <input
                        type="text"
                        value={proj.outcome || ''}
                        onChange={e => updateProject(proj.id, { outcome: e.target.value })}
                        placeholder="예: 공정 사이클 타임 15% 단축, 캡스톤 은상, 경로 오차 10cm 이내"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-cyan-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        )}
      </div>

      {/* Spec Summary Footer */}
      <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>스펙 입력 완료 → 아래 다음 칸에서 <strong>원하는 회사와 직무</strong>를 선택하세요.</span>
        </div>
        <span className="text-[11px] text-cyan-400 font-medium">STEP 1 완료</span>
      </div>
    </div>
  );
};

