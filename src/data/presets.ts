import { CandidateProfile } from '../types';

export interface PresetProfile {
  name: string;
  badge: string;
  description: string;
  profile: CandidateProfile;
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    name: '모빌리티 자율주행/로버 (예시 기반)',
    badge: '모빌리티 R&D',
    description: '기계항공우주공학 전공, 자율주행 로버 및 큐브샛 경험, 토스 IL',
    profile: {
      major: '기계항공우주공학',
      majorCategory: 'aerospace',
      gpa: 3.65,
      maxGpa: 4.5,
      skills: ['Python', 'C++', 'MATLAB', 'Simulink', 'CATIA', 'ROS', 'Pixhawk'],
      projects: [
        {
          id: 'proj-1',
          title: 'ROS 기반 실외 자율주행 로버 제작 및 경로 추종 제어',
          role: '팀장 / 제어 알고리즘 및 센서 인터페이스 담당',
          techStack: ['ROS', 'Python', 'C++', 'Pixhawk', 'LiDAR'],
          description: 'Pixhawk IMU와 2D LiDAR를 연동하여 실외 환경 2D SLAM 맵핑 및 Pure Pursuit 알고리즘을 통한 웨이포인트 자동 주행 구현.',
          outcome: '대학생 캡스톤 디자인 대회 은상 수상, 오차 반경 15cm 이내 주행 달성'
        },
        {
          id: 'proj-2',
          title: '큐브샛(CubeSat) 기구 구조 설계 및 궤도 열해석 캡스톤',
          role: '기구 구조 설계 및 CATIA 3D 모델링 담당',
          techStack: ['CATIA', 'ANSYS', 'MATLAB'],
          description: '2U 큐브샛 표준 규격에 맞춘 알루미늄 프레임 구조 설계 및 진동/충격 발사 환경 모달 해석 수행.',
          outcome: '진동 응력 허용 한도 120% 마진 확보 및 제작 완료'
        }
      ],
      certificates: ['공학인증(ABEEK) 이수'],
      languageScore: {
        type: 'TOEIC_SPEAKING',
        level: 'IL (Intermediate Low / 110점)'
      },
      hasEngineeringAccreditation: true,
      targetCompany: '현대자동차',
      targetDepartment: 'AVP본부 자율주행사업부',
      targetRole: '자율주행 인지/판단/제어 SW 엔지니어',
      targetIndustry: 'mobility'
    }
  },
  {
    name: '스마트 제조/설비 엔지니어 (모트라스/현대차)',
    badge: '스마트팩토리 설비',
    description: '기계공학 전공, CATIA 및 공정 자동화 시뮬레이션, 공학인증',
    profile: {
      major: '기계공학',
      majorCategory: 'mechanical',
      gpa: 3.52,
      maxGpa: 4.5,
      skills: ['CATIA', 'SolidWorks', 'PLC', 'AutoCAD', 'Python', 'MATLAB'],
      projects: [
        {
          id: 'proj-3',
          title: '생산라인 자동화 시뮬레이션 및 부품 공급 지그 설계',
          role: '공정 모델링 및 기구 설계 담당',
          techStack: ['CATIA', 'PLC', 'AutoCAD'],
          description: '자동차 섀시 부품 압입 공정의 병목 구간 해소를 위한 자동 반송 지그 설계 및 공압 시퀀스 회로 구현.',
          outcome: '공정 사이클 타임 18% 단축 및 작업자 피로도 경감'
        },
        {
          id: 'proj-4',
          title: '공정 데이터 수집 및 설비 이상 진단 기초 모델링',
          role: '데이터 수집 및 분석',
          techStack: ['Python', 'LabVIEW'],
          description: '진동 센서 및 온도 센서 데이터를 수집하여 임계치 초과 시 경보를 송출하는 예지보전 시스템 기초 개발.',
          outcome: '센서 로그 자동 기록 및 이상 감지 알림 프로토타입 완료'
        }
      ],
      certificates: ['일반기계기사', '공학인증(ABEEK) 이수'],
      languageScore: {
        type: 'TOEIC_SPEAKING',
        level: 'IM (Intermediate Mid / 130점)'
      },
      hasEngineeringAccreditation: true,
      targetCompany: '현대차/모트라스',
      targetDepartment: '생산기술/제조설비팀',
      targetRole: '스마트 제조 설비 엔지니어',
      targetIndustry: 'smartfactory'
    }
  },
  {
    name: '스마트팩토리 AI 비전 & MES 솔루션 (포스코DX)',
    badge: 'AI Vision / MES',
    description: '전자/컴퓨터 전공, Python 머신비전 검사 및 IoT 통신',
    profile: {
      major: '전자공학 및 컴퓨터공학 복수전공',
      majorCategory: 'computer_software',
      gpa: 3.78,
      maxGpa: 4.5,
      skills: ['Python', 'C++', 'OpenCV', 'PyTorch', 'SQL', 'PLC', 'Linux', 'Docker'],
      projects: [
        {
          id: 'proj-5',
          title: '딥러닝 기반 반도체/이차전지 표면 결함 실시간 검출 AI 비전',
          role: '비전 알고리즘 설계 및 최적화',
          techStack: ['OpenCV', 'PyTorch', 'TensorRT', 'Python'],
          description: 'YOLOv8 기반 불량 검출 모델을 경량화하여 Edge 디바이스에서 초당 45FPS 실시간 추론 달성.',
          outcome: '불량 검출 정확도(mAP50) 96.8% 달성'
        },
        {
          id: 'proj-6',
          title: 'OPC-UA 기반 스마트 제조 공정 모니터링 대시보드',
          role: 'Full-stack 및 산업 통신 인터페이스',
          techStack: ['Python', 'SQL', 'Docker', 'React'],
          description: '가상 PLC 시뮬레이터와 통신하여 설비 가동 상태 및 전력량을 실시간 집계하는 웹 대시보드 구축.',
          outcome: '지연시간 200ms 이내 실시간 텔레메트리 구현'
        }
      ],
      certificates: ['정보처리기사', 'SQLD'],
      languageScore: {
        type: 'OPIC',
        level: 'IH (Intermediate High)'
      },
      hasEngineeringAccreditation: true,
      targetCompany: '포스코DX',
      targetDepartment: '스마트팩토리 사업부',
      targetRole: '스마트팩토리 솔루션 및 제어 엔지니어',
      targetIndustry: 'smartfactory'
    }
  },
  {
    name: 'S-OIL 플랜트 생산기술 / 화학공정 엔지니어',
    badge: '정유/석유화학',
    description: '화학공학 전공, Aspen 시뮬레이션 및 위험물기사, 열역학',
    profile: {
      major: '화학공학',
      majorCategory: 'industrial_chemical',
      gpa: 3.68,
      maxGpa: 4.5,
      skills: ['Aspen Plus', 'MATLAB', 'Python', '공정 데이터 분석', 'AutoCAD'],
      projects: [
        {
          id: 'proj-7',
          title: '에틸렌 증류탑 공정 전산 모사 및 에너지 회수 열교환망 설계',
          role: '프로세스 시뮬레이션 및 열정산',
          techStack: ['Aspen Plus', 'MATLAB'],
          description: 'Aspen Plus를 이용한 40단 증류탑의 기-액 평형 모델링 및 유틸리티 스팀 절감 열통합(Pinch) 해석.',
          outcome: '스팀 소비량 14.5% 감축 시뮬레이션 검증 완료'
        }
      ],
      certificates: ['화공기사', '위험물산업기사', '공학인증(ABEEK) 이수'],
      languageScore: {
        type: 'TOEIC',
        level: '865점'
      },
      hasEngineeringAccreditation: true,
      targetCompany: 'S-OIL',
      targetDepartment: '생산운영본부 생산기술팀',
      targetRole: '석유화학 플랜트 공정기술 및 설비 최적화 엔지니어',
      targetIndustry: 'smartfactory'
    }
  }
];
