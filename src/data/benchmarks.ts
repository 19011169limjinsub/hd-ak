import { CompanyBenchmark } from '../types';

export const COMPANY_BENCHMARKS: CompanyBenchmark[] = [
  // 현대자동차
  {
    id: 'hmc-autonomous-sw',
    companyName: '현대자동차',
    department: 'AVP본부 자율주행사업부',
    roleTitle: '자율주행 인지/판단/제어 SW 엔지니어',
    industry: 'mobility',
    avgGpa: 3.72,
    minRecommendedGpa: 3.4,
    recommendedLanguages: ['OPIc IH 이상', '토익스피킹 AL/AM (150점 이상)'],
    requiredSkills: ['C++', 'Python', 'ROS/ROS2', 'Linux'],
    preferredSkills: ['MATLAB/Simulink', 'OpenCV', 'TensorRT', 'CAN 통신', 'Git', 'Docker'],
    preferredMajors: ['기계항공우주공학', '컴퓨터공학', '전기전자공학', '로봇공학'],
    samplePassedProjects: [
      '대학생 자율주행 경진대회 라이다/카메라 센서퓨전 기반 경로생성',
      'ROS2 기반 이동 로봇 장애물 회피 제어 알고리즘 구현',
      'MPC 기반 차량 경로 추종 시뮬레이션 (CarMaker/Simulink)'
    ],
    coreCompetencies: ['실시간 임베디드 SW 최적화', '센서 융합 인지', '차량 동역학 이해'],
    interviewKeywords: ['센서퓨전(Sensor Fusion)', 'ROS2 미들웨어', 'Fail-Safe 제어'],
    hiringTrend: '직무 중심 상시 채용으로 전환되며 단순 코딩보다 실제 차량/로버 플랫폼 실차 테스트 및 센서 노이즈 처리 경험을 매우 높게 평가함.'
  },
  {
    id: 'hmc-manufacturing-eng',
    companyName: '현대자동차',
    department: '제조솔루션본부 스마트팩토리설비팀',
    roleTitle: '스마트제조 설비자동화 엔지니어',
    industry: 'smartfactory',
    avgGpa: 3.60,
    minRecommendedGpa: 3.2,
    recommendedLanguages: ['OPIc IM2 이상', '토익스피킹 IM3 (130점 이상)'],
    requiredSkills: ['PLC', 'CATIA', 'AutoCAD', '제조데이터분석'],
    preferredSkills: ['Python', '산업로봇 티칭', 'OPC-UA', 'LabVIEW'],
    preferredMajors: ['기계공학', '메카트로닉스', '전기전자공학', '산업공학'],
    samplePassedProjects: [
      '모빌리티 전동화 차체 라인 자동화 PLC 시퀀스 및 인터록 설계',
      '설비 OEE(종합설비효율) 지표 향상을 위한 병목 공정 사이클타임 단축'
    ],
    coreCompetencies: ['PLC 시퀀스 제어', '설비 가동률 최적화', '현장 트러블슈팅'],
    interviewKeywords: ['PLC 인터록', 'OEE 설비종합효율', '공정 무인화'],
    hiringTrend: 'E-GMP 전용 라인 및 차세대 PBV 공장의 무인 반송 AGV/AMR 및 PLC 인터페이스 역량 필수화.'
  },
  // 현대차/모트라스
  {
    id: 'motras-equipment',
    companyName: '현대차/모트라스',
    department: '생산기술/제조설비팀',
    roleTitle: '스마트 제조 설비 엔지니어',
    industry: 'smartfactory',
    avgGpa: 3.58,
    minRecommendedGpa: 3.2,
    recommendedLanguages: ['OPIc IM2 이상', '토익스피킹 IM (120점 이상)', '토익 750 이상'],
    requiredSkills: ['PLC (미쓰비시/지멘스)', 'CATIA', 'AutoCAD', '기구학적 해석'],
    preferredSkills: ['LabVIEW', 'C++', 'Python', '공정 데이터 분석', '공압/유압 회로설계'],
    preferredMajors: ['기계공학', '메카트로닉스', '전기전자공학', '산업공학'],
    samplePassedProjects: [
      '생산라인 공정 택타임(Tact Time) 단축 및 설비 가동률 분석 프로젝트',
      'PLC 기반 공압 실린더 시퀀스 자동 제어 장치 제작',
      '3D CAD(CATIA) 활용한 모듈 조립 지그 및 자동 반송 기구 설계'
    ],
    coreCompetencies: ['설비 예지보전', 'PLC 시퀀스 제어', '양산 수율 최적화'],
    interviewKeywords: ['설비 가동률(OEE)', 'PLC 인터록 설계', '이상 감지 예지보전'],
    hiringTrend: '모빌리티 핵심 부품 모듈화 생산에 따른 라인 자동화 트렌드로, PLC 시퀀스 제어 및 트러블슈팅(Troubleshooting) 역량 선호.'
  },
  // 현대모비스
  {
    id: 'mobis-chassis-control',
    companyName: '현대모비스',
    department: '샤시안전BU 제어개발팀',
    roleTitle: '샤시/전자제동 제어시스템 설계 엔지니어',
    industry: 'mobility',
    avgGpa: 3.68,
    minRecommendedGpa: 3.3,
    recommendedLanguages: ['OPIc IM3/IH', '토익스피킹 IM3/IH'],
    requiredSkills: ['MATLAB', 'Simulink', 'C/C++', '제어이론'],
    preferredSkills: ['CANoe/CANalyzer', 'Vector 도구', 'dSPACE', 'HILS', 'CATIA'],
    preferredMajors: ['기계공학', '전기전자공학', '제어계측공학', '미래모빌리티학과'],
    samplePassedProjects: [
      '차량 능동 전자제어 브레이크(EBS) 로직 모델링 및 Simulink 검증',
      'CAN 통신 기반 차량 차속/조향각 데이터 로깅 및 제어 알고리즘 구현',
      'HILS 환경에서의 가상 주행 시나리오 제어기 반응 테스트'
    ],
    coreCompetencies: ['Model-Based Design(MBD)', '임베디드 제어 로직', 'ISO 26262 기능안전'],
    interviewKeywords: ['모델기반설계(MBD)', 'HILS 실시간검증', 'ISO 26262 기능안전'],
    hiringTrend: '전동화 및 통합 제어기 도입으로 MBD(MATLAB/Simulink) 기반 제어 모델 개발 및 실시간 시뮬레이션 경험자 우대.'
  },
  {
    id: 'mobis-battery-system',
    companyName: '현대모비스',
    department: '전동화BU 배터리시스템설계팀',
    roleTitle: 'BMS(배터리관리시스템) 제어 및 BSA 설계 엔지니어',
    industry: 'mobility',
    avgGpa: 3.66,
    minRecommendedGpa: 3.3,
    recommendedLanguages: ['OPIc IM2 이상', '토스 IM3 이상'],
    requiredSkills: ['C/C++', 'MATLAB/Simulink', '배터리 등가회로 모델링', 'CAN 통신'],
    preferredSkills: ['CATIA', '열유체 해석', 'ISO 26262', 'Python'],
    preferredMajors: ['전기전자공학', '기계공학', '화학공학'],
    samplePassedProjects: [
      '배터리 SOC/SOH 추정 칼만필터 알고리즘 Simulink 모델링',
      '전기차 배터리 팩 냉각 유동 CFD 해석 및 구조 최적화'
    ],
    coreCompetencies: ['BMS 상태 추정', '배터리 열관리', '차량 통신 인터페이스'],
    interviewKeywords: ['SOC/SOH 추정알고리즘', '배터리 열폭주방지', 'CAN 통신 프로토콜'],
    hiringTrend: '전동화 BSA(Battery System Assembly) 핵심 부품 국산화 및 차세대 고전압 배터리 안전 제어 인력 대규모 채용.'
  },
  // 기아
  {
    id: 'kia-pbv-dev',
    companyName: '기아',
    department: 'PBV비즈니스사업부 미래모빌리티개발팀',
    roleTitle: 'PBV 특화 차체/섀시 플랫폼 설계 엔지니어',
    industry: 'mobility',
    avgGpa: 3.65,
    minRecommendedGpa: 3.3,
    recommendedLanguages: ['OPIc IM3 이상', '토익스피킹 IM3 이상'],
    requiredSkills: ['CATIA', '구조해석(ANSYS)', '기구설계', '차량패키징'],
    preferredSkills: ['Python', 'MATLAB', '모빌리티 SW 이해'],
    preferredMajors: ['기계공학', '자동차공학', '산업공학'],
    samplePassedProjects: [
      '목적기반 모빌리티(PBV) 실내 가변 모듈러 기구 메커니즘 설계',
      '경량 복합소재 차체 비틀림 강성 CAE 해석'
    ],
    coreCompetencies: ['모듈러 구조 설계', 'CAE 충돌/강성 해석', '공간 패키지 최적화'],
    interviewKeywords: ['모듈러 아키텍처', 'PBV 공간최적화', '경량화 복합소재'],
    hiringTrend: '화성 PBV 전용 공장 가동과 맞물려 모듈러 차체 설계 및 맞춤형 공간 하드웨어 설계 엔지니어 채용 활발.'
  },
  // 포스코DX
  {
    id: 'poscodx-smartfactory',
    companyName: '포스코DX',
    department: '스마트팩토리 사업부',
    roleTitle: '스마트팩토리 솔루션 및 제어 엔지니어',
    industry: 'smartfactory',
    avgGpa: 3.52,
    minRecommendedGpa: 3.1,
    recommendedLanguages: ['OPIc IM2 이상', '토익 700 이상'],
    requiredSkills: ['Python', 'Java/C#', 'SQL', 'PLC'],
    preferredSkills: ['AI Vision (OpenCV/YOLO)', 'Edge 컴퓨팅', 'MQTT/OPC-UA', 'MES 연계'],
    preferredMajors: ['컴퓨터공학', '전자공학', '산업공학', '메카트로닉스'],
    samplePassedProjects: [
      '생산 공정 이미지 기반 표면 불량 검출 딥러닝 AI 비전 시스템',
      'PLC-MES 간 OPC-UA 프로토콜 기반 실시간 설비 데이터 수집 파이프라인',
      '공정 이상 감지 시계열 예측 모델링 (Python/InfluxDB)'
    ],
    coreCompetencies: ['공정 데이터 인터페이스', '비전 검사 알고리즘', 'OT/IT 융합 네트워크'],
    interviewKeywords: ['OPC-UA 산업통신', '딥러닝 머신비전', 'MES 공정연계'],
    hiringTrend: '포스코 그룹 제철소 및 이차전지 소재 공장의 무인화/지능화 수요 급증으로 AI 비전 및 산업용 통신망 연계 능력자 다수 채용.'
  },
  // LG에너지솔루션
  {
    id: 'lgensol-process',
    companyName: 'LG에너지솔루션',
    department: '공정기술그룹 / 설비기술팀',
    roleTitle: '이차전지 전극/조립 공정 엔지니어',
    industry: 'smartfactory',
    avgGpa: 3.65,
    minRecommendedGpa: 3.3,
    recommendedLanguages: ['OPIc IM3 이상', '토익스피킹 IM3 (130점 이상)'],
    requiredSkills: ['공정 데이터 분석', '3D CAD (CATIA/SolidWorks)', '통계적 공정관리(SPC)'],
    preferredSkills: ['Python/Minitab', 'PLC 기초', '롤투롤(Roll-to-Roll) 공정 이해', 'DOE 실험계획법'],
    preferredMajors: ['화학공학', '기계공학', '신소재공학', '산업공학'],
    samplePassedProjects: [
      '이차전지 파우치 셀 전극 코팅 및 건조 공정 수율 이상원인 다변량 통계분석',
      '배터리 모듈 조립 자동화 라인 시뮬레이션 및 병목 구간 개선',
      '머신러닝 기반 셀 외관 스크래치 불량 분류 모델 개발'
    ],
    coreCompetencies: ['수율 개선 문제해결', 'DOE 기반 조건 최적화', '공정 데이터 통계 분석'],
    interviewKeywords: ['수율(Yield) 최적화', '롤투롤(Roll-to-Roll)', 'DOE 실험계획법'],
    hiringTrend: '북미/유럽 신공장 가동에 맞춘 양산 안정화 역량이 핵심. 공정 데이터 해석 능력과 현장 트러블슈팅 경험 최우선.'
  },
  // 한화에어로스페이스
  {
    id: 'hanwha-aero-guidance',
    companyName: '한화에어로스페이스',
    department: '항공우주연구소 유도항법제어팀',
    roleTitle: '유도무기/발사체 비행제어 및 항법 엔지니어',
    industry: 'mobility',
    avgGpa: 3.75,
    minRecommendedGpa: 3.5,
    recommendedLanguages: ['OPIc IH 이상', '토익스피킹 AL/IH', '토익 850 이상'],
    requiredSkills: ['MATLAB/Simulink', 'C/C++', '동역학/제어이론', '비행역학'],
    preferredSkills: ['Pixhawk/PX4', 'ROS', 'IMU/GNSS 센서 칼만필터', 'Linux RTOS'],
    preferredMajors: ['항공우주공학', '기계공학', '제어계측공학', '전기전자공학'],
    samplePassedProjects: [
      '초소형 큐브샛 자세제어(ADCS) 알고리즘 설계 및 시뮬레이션',
      'Pixhawk 기반 고정익/멀티콥터 자율비행 항법 칼만 필터링 알고리즘 구현',
      '발사체 단분리 및 유도 궤적 6자유도(6-DoF) 비행 시뮬레이터 제작'
    ],
    coreCompetencies: ['6자유도 동역학 해석', '확장 칼만 필터(EKF)', 'RTOS 실시간 제어'],
    interviewKeywords: ['확장 칼만필터(EKF)', '6자유도 비행동역학', 'Fail-Operational 항법'],
    hiringTrend: '누리호 기술 이전 및 방산 수출 확대로 큐브위성, 비행제어 캡스톤, 칼만필터 기반 센서 결합 경험 인재 선호.'
  },
  // 레인보우로보틱스
  {
    id: 'rainbow-robotics-control',
    companyName: '레인보우로보틱스',
    department: '로봇개발연구소 제어플랫폼팀',
    roleTitle: '협동로봇 및 모바일매니퓰레이터 제어 연구원',
    industry: 'mobility',
    avgGpa: 3.65,
    minRecommendedGpa: 3.3,
    recommendedLanguages: ['OPIc IM2 이상', '영어 기술문서 독해/작성'],
    requiredSkills: ['C++', 'Python', 'ROS/ROS2', '로봇기구학/역운동학'],
    preferredSkills: ['Gazebo/Isaac Sim', 'Linux', '모터 제어(EtherCAT/CAN)', 'SLAM'],
    preferredMajors: ['로봇공학', '기계공학', '컴퓨터공학', '전자공학'],
    samplePassedProjects: [
      '6축 수직다관절 협동로봇 역기구학 연산 및 충돌감지 임피던스 제어',
      'ROS2 기반 모바일 매니퓰레이터 2D/3D LiDAR SLAM 및 자율주행',
      'EtherCAT 통신 기반 다축 서보모터 동기화 모션 프로파일 생성'
    ],
    coreCompetencies: ['로봇 운동학/역동역학', '충돌 감지 및 순응제어', '모션 플래닝'],
    interviewKeywords: ['임피던스 제어(Impedance)', 'ROS2 모션플래닝', '역기구학(Inverse Kinematics)'],
    hiringTrend: '삼성전자 투자 이후 제조/물류 현장 투입 협동로봇 양산 가속화로 실제 관절 모터 제어 및 ROS2 기반 시스템 엔지니어링 집중 채용.'
  },
  // S-OIL
  {
    id: 'soil-process-tech',
    companyName: 'S-OIL',
    department: '생산운영본부 생산기술팀',
    roleTitle: '석유화학 플랜트 공정기술 및 설비 최적화 엔지니어',
    industry: 'smartfactory',
    avgGpa: 3.60,
    minRecommendedGpa: 3.3,
    recommendedLanguages: ['OPIc IM3 이상', '토익 800 이상'],
    requiredSkills: ['화공양론/열역학', '공정 흐름도(PFD/P&ID) 해석', '공정 데이터 분석'],
    preferredSkills: ['Aspen Plus/HYSYS', 'MATLAB', '공정제어/DCS 이해', '위험물산업기사'],
    preferredMajors: ['화학공학', '기계공학', '산업공학'],
    samplePassedProjects: [
      '석유화학 정제 증류탑 에너지 소비 절감을 위한 Aspen 시뮬레이션 및 열교환망 최적화',
      '화학 플랜트 유량/압력 센서 이상치 감지 및 통계적 예지보전 모델링',
      '공정 위험성 평가(HAZOP) 시나리오 작성 및 안전 인터록 검토'
    ],
    coreCompetencies: ['플랜트 공정 최적화', 'P&ID 설계도면 분석', '안전 환경 규제 준수'],
    interviewKeywords: ['열정산(Heat Balance)', 'HAZOP 위험성평가', 'DCS 분산제어시스템'],
    hiringTrend: '샤힌 프로젝트(Shaheen Project) 초대형 석유화학 콤플렉스 건설에 따라 대규모 플랜트 공정 시뮬레이션 및 데이터 기반 수율 최적화 엔지니어 대거 선발.'
  }
];

export const COMMON_SKILLS = [
  'Python', 'C++', 'C', 'MATLAB', 'Simulink', 'ROS', 'ROS2', 'CATIA', 
  'SolidWorks', 'AutoCAD', 'PLC', 'LabVIEW', 'OpenCV', 'TensorRT', 'PyTorch',
  'Pixhawk', 'PX4', 'Linux', 'Docker', 'CAN 통신', 'EtherCAT', 'Git',
  'Gazebo', 'TwinCAT', 'SQL', 'OPC-UA', 'Aspen Plus'
];

export const CERTIFICATE_PRESETS = [
  '공학인증(ABEEK) 이수',
  '일반기계기사',
  '전기기사',
  '화공기사',
  '정보처리기사',
  '산업안전기사',
  '위험물산업기사',
  'ADsP(데이터분석준전문가)',
  'SQLD',
  '리눅스마스터 2급'
];
