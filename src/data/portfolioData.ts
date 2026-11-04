import {
  MetricItem,
  PhilosophyItem,
  ProjectItem,
  CapabilityCategory,
  ExperienceItem,
} from "@/types/portfolio";

export const PROFILE_DATA = {
  name: "유병욱",
  nameEn: "Byeongwook Yoo",
  role: "서비스 기획자 / 프로덕트 매니저 (Mini-CEO)",
  englishTitle: "Product Owner & Mini-CEO",
  headlineMain: "비즈니스의 구조를 설계하고,",
  headlineSub: "사람의 온도를 더합니다.",
  subCopy:
    "카카오모빌리티와 B2B 플랫폼에서 신사업 론칭과 물류 인프라를 설계해 온 기획자 유병욱입니다. 비즈니스 가설부터 실행, P&L 최적화까지 오너십을 갖고 완수합니다.",
  motto:
    "복잡한 문제는 차분하게, 불편한 경험은 빠르게. 사람의 마음을 먼저 읽고 비즈니스의 구조를 완성합니다.",
  tags: [
    "#ProductManager",
    "#MiniCEO",
    "#Logistics",
    "#Mobility",
    "#B2B_Platform",
    "#DataDriven",
  ],
  contact: {
    email: "byeongwooke@gmail.com",
    phone: "010-2828-9226",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    location: "서울시 (Seoul, Republic of Korea)",
  },
};

export const QUICK_METRICS: MetricItem[] = [
  {
    id: "metric-1",
    value: "150%",
    label: "고정비 대비 새벽배송 매출 성장",
    description: "카카오스타일 신규 새벽배송 론칭 및 단기 손익분기 달성",
    subLabel: "SLA 99.2% 준수율 달성",
  },
  {
    id: "metric-2",
    value: "3년 3개월",
    label: "카카오모빌리티 대규모 도메인 기획",
    description: "라스트마일 물류 인프라, 기사 앱 UX, 화주사 어드민 엔드투엔드 리딩",
    subLabel: "복합 물류 도메인 총괄",
  },
  {
    id: "metric-3",
    value: "0 to 1",
    label: "자체 B2B ERP 플랫폼 신사업 PM",
    description: "외산 레거시 대체 어딩 차세대 여행 ERP (Basecamp) 총괄 구축",
    subLabel: "가맹사 IT 비용 45% 절감",
  },
];

export const PHILOSOPHY_DATA: PhilosophyItem[] = [
  {
    number: "01",
    title: "공감 (Empathy)",
    keyword: "현장 중심의 문제 정의",
    summary: "실제 사용자 동선과 고객센터 문의를 직접 체감하며 출발하는 문제 정의",
    quote:
      "진짜 문제는 대시보드 숫자가 아니라, 현장 기사님의 거친 장갑과 빗발치는 CS 녹취록 속에 있습니다.",
    description:
      "기획서의 첫 줄을 쓰기 전, 현장 물류 센터 야간 동승과 실제 인입된 CS 500건 전수 청취를 먼저 진행합니다. 책상 위 가설 대신 사용자의 물리적 고통과 병목 지점을 피부로 이해할 때, 비로소 불필요한 기능을 걷어내고 가장 본질적인 해결책을 도출할 수 있습니다.",
    practices: [
      "물류 터미널 야간 현장 직접 방문 및 기사님 픽업/배송 동선 실측",
      "월별 CS 인입 유형 클러스터링 및 상위 3대 병목 UI 즉시 개편",
      "정량적 지표(Funnel/Drop-off)와 정성적 피드백의 교차 검증",
    ],
  },
  {
    number: "02",
    title: "태도 (Attitude)",
    keyword: "끝까지 완수하는 집요한 책임감",
    summary: "물류 이원화, 대규모 마이그레이션 등 복잡한 프로젝트를 끝까지 완수하는 책임감",
    quote:
      "모두가 불가능하다고 여긴 레거시 마이그레이션과 물류 이원화, 0.1%의 엣지 케이스까지 집요하게 챙겨 무결점으로 오픈합니다.",
    description:
      "물류와 B2B 도메인은 사소한 1개의 예외 데이터가 수억 원의 정산 오차나 배송 마비로 이어집니다. 크로스 펑셔널 팀(개발, 운영, 영업, 재무)의 이해관계를 끝까지 끈질기게 조율하고, 최악의 시나리오를 대비한 Fallback 정책을 사전에 마련해 어떤 환경에서도 약속된 딜리버리를 완수합니다.",
    practices: [
      "무중단 데이터 마이그레이션을 위한 3단계 롤백 시나리오 및 사전 시뮬레이션",
      "개발-운영-파트너사를 연결하는 통합 정책 싱크 및 실시간 이슈 트래커 운용",
      "장애 발생 시 15분 내 격리 및 화주사 자동 리포팅 정책 수립",
    ],
  },
  {
    number: "03",
    title: "반골 기질 (First-Principles)",
    keyword: "관행을 뒤흔드는 제1원리 사고",
    summary: "'왜 이렇게 해야 할까?'를 먼저 묻고 관행 대신 최적의 비즈니스 해답을 실험",
    quote:
      "업계 관행이라는 이유로 낭비되던 프로세스를 해체하고, P&L의 기본 단위부터 다시 조립합니다.",
    description:
      "‘원래 다 그렇게 한다’는 말에 안주하지 않습니다. 단일 물류 파트너 종속에 의문을 제기해 자체 한차배송 전환을 이끌어냈고, 수억 원의 외산 ERP 라이선스 관행을 깨고 자체 SaaS Basecamp를 0 to 1으로 설계했습니다. 제1원리에 입각해 비즈니스의 지속 가능성과 사용자 효용을 극대화합니다.",
    practices: [
      "단위 경제(Unit Economics) 기반의 1원 단위 원가 분석 및 구조 분해",
      "레거시 관행 업무의 API 자동화 및 인적 개입 최소화 설계",
      "작은 가설(MVP)을 빠르게 시장에 던져 검증한 후 스케일업하는 린(Lean) 접근법",
    ],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "project-01",
    title: "카카오스타일 새벽배송 론칭 및 안정화",
    badge: "신사업 론칭 & PM",
    category: "new_biz",
    categoryLabel: "신사업 / 라스트마일",
    role: "화주사 협업, 운영 정책 수립 및 SLA 기준 정립 총괄 PM",
    period: "2023.04 — 2024.06",
    organization: "카카오모빌리티 (Kakao Mobility)",
    summary:
      "대형 패션 e-commerce 플랫폼 '지그재그/포스티(카카오스타일)'의 신규 새벽배송 서비스를 성공적으로 론칭하고, 고정비 대비 매출 150% 성장을 견인한 물류 신사업 프로젝트",
    keyMetrics: [
      {
        label: "고정비 대비 매출",
        value: "+150%",
        detail: "론칭 3개월 내 BEP 조기 달성 및 고정비 초과 수익 실현",
      },
      {
        label: "SLA 배송 준수율",
        value: "99.2%",
        detail: "익일 07시 전 배송 완료율 99% 이상으로 업계 최고 수준 안착",
      },
      {
        label: "런칭 장애 발생",
        value: "0건",
        detail: "대규모 프로모션 기간에도 무장애 배송 프로세스 완수",
      },
    ],
    problem: {
      title: "신규 화주사 타이트한 마감 기준과 야간 배송 인프라 리스크",
      description:
        "카카오스타일의 빠른 배송 니즈(자정 전 주문, 익일 오전 7시 전 도착)를 충족해야 했으나, 기존 일반 당일배송망은 야간 터미널 입출고와 심야 기사 라우팅을 지원하지 못했습니다. 또한 출고 지연 시 책임 소재 불분명 및 위약금 리스크가 상존했습니다.",
      points: [
        "화주사 물류센터의 입고 지연 시 배송 실패로 이어지는 연쇄 병목 현상 발생",
        "새벽 아파트/오피스텔 공동현관 비밀번호 불일치 등 현장 배송 예외율 12% 육박",
        "초기 고정 인프라 비용(터미널 임차료, 야간 기사 기본급)에 따른 손익 적자 우려",
      ],
    },
    solution: {
      title: "화주사 WMS 연동 표준화 및 3단계 예외 대응 프로토콜 구축",
      description:
        "화주사와 실시간 API 데이터 인터페이스를 구축하여 주문/재고/출고 상태를 초 단위로 추적하고, 기사용 야간 전용 배송 정책과 자동 예외처리 워크플로우를 신설했습니다.",
      points: [
        "화주사 WMS - 당사 TMS 간 실시간 웹훅(Webhook) 연동 및 출고 지연 자동 보정 알고리즘 적용",
        "새벽 배송 전용 '공동현관 출입 가이드 및 기사 긴급 우회 배송 지침' 수립으로 실패율 최소화",
        "화주사-배송사 간 합의된 정량적 SLA(Service Level Agreement) 및 배상/보상 규정 공식 정립",
        "물류 물량 급증에 대응하는 플렉스(Flex) 기사 호출 가변 보상 체계 도입으로 고정비 최소화",
      ],
    },
    businessImpact: {
      title: "고정비 대비 매출 150% 신장 및 지속 가능한 흑자 사업화",
      description:
        "안정적인 SLA 준수로 화주사의 전폭적 신뢰를 획득하여 취급 물량이 3배 이상 확대되었고, 단위당 배송비 최적화로 흑자 전환을 달성했습니다.",
      points: [
        "신규 서비스 개시 3개월 만에 고정비 대비 매출 150% 이상 폭발적 성장",
        "SLA 배송 성공률 99.2% 유지로 화주사 만족도 및 재계약 체결율 100%",
        "카카오스타일 내 '직진배송' 브랜드 신뢰도 향상 및 고객 컴플레인율 0.3% 미만 달성",
      ],
    },
    techSpecs: {
      title: "주요 기술 규격 및 운영 정책 스펙",
      description: "견고한 데이터 연동과 현장 중심의 정책 매뉴얼 완비",
      items: [
        "RESTful Webhook API 설계 (출고 상태, 운송장 매핑, 배송 완료 실시간 동기화)",
        "새벽 배송 전용 사진 검수(도어락 앞 인증샷) AI 자동 분류 파이프라인 연계",
        "터미널 입고 마감(Cut-off) 시간 동적 조정 및 지연 알림 Slack/SMS 봇 구현",
        "화주사용 실시간 배송 관제 및 SLA 달성률 대시보드(Metabase) 구축",
      ],
    },
    tags: [
      "#새벽배송",
      "#카카오스타일",
      "#SLA수립",
      "#WMS_TMS연동",
      "#운영정책",
      "#흑자전환",
    ],
  },
  {
    id: "project-02",
    title: "물류 인프라 이원화 & 한차배송 플랫폼 전환",
    badge: "구조 혁신 & 비용 최적화",
    category: "infra",
    categoryLabel: "인프라 / 비용최적화",
    role: "API 통신 설계, 기사앱 UX/UI 재설계, QA 및 현장 롤아웃 총괄",
    period: "2022.08 — 2023.05",
    organization: "카카오모빌리티 (Kakao Mobility)",
    summary:
      "단일 파트너십(오늘의픽업) 의존도를 낮추고 자체 '한차배송' 직영 플랫폼으로 전환하여 배송 단가를 28% 절감하고, 기사앱 전면 개편을 통해 현장 CS 문의를 65% 급감시킨 구조 혁신 프로젝트",
    keyMetrics: [
      {
        label: "배송 건당 원가",
        value: "-28%",
        detail: "직영 한차배송 전환 및 라우팅 효율화로 직접 물류 원가 대폭 절감",
      },
      {
        label: "현장 CS 문의량",
        value: "-65%",
        detail: "기사앱 동선 단순화 및 상태 오입력 방지 UX 적용 결과",
      },
      {
        label: "기사 이탈률 개선",
        value: "-42%",
        detail: "공정한 정산 투명성 및 원터치 업무 환경 제공으로 리텐션 강화",
      },
    ],
    problem: {
      title: "파트너사 단일 의존으로 인한 비용 누수와 기사앱 UI 혼선",
      description:
        "기존에는 외부 물류 파트너사에 전적으로 의존해 물동량 증가 시 협상력 부재 및 건당 원가 상승 문제가 심각했습니다. 또한 구형 기사앱은 복잡한 메뉴 구조와 잦은 통신 오류로 배송 기사의 오배송과 불만이 누적되고 있었습니다.",
      points: [
        "물동량 피크 시즌 파트너사의 일방적 단가 인상 요구 및 배송 차량 수급 불안정",
        "기사앱 내 '픽업 완료'와 '배달 완료' 버튼 혼동으로 하루 수백 건의 오입력 CS 발생",
        "비정상 배송(부재, 수취거부, 파손) 발생 시 기사가 본사와 즉각 소통할 채널 부재",
      ],
    },
    solution: {
      title: "물류망 이원화 아키텍처 및 현장 친화적 기사앱 전면 리뉴얼",
      description:
        "권역별 물류망을 '외부 제휴망'과 '자체 한차배송망'으로 이원화하여 비용 경쟁력을 확보하고, 장갑을 낀 상태에서도 실수 없이 조작 가능한 직관적 기사 전용 UX를 완성했습니다.",
      points: [
        "외부 물류망과 자체 한차배송 플랫폼 간 하이브리드 주문 자동 분배 API 엔진 설계",
        "기사 앱 핵심 태스크(스캔-상차-배송-완료)를 '원스크린 원액션(One Screen One Action)'으로 전면 재설계",
        "GPS 기반 배송 권역 지오펜싱(Geofencing) 적용으로 반경 50m 밖 오배송 완료 원천 차단",
        "현장 배송 지연 및 특이사항 즉시 리포팅 및 양방향 사진 전송 채널 신설",
      ],
    },
    businessImpact: {
      title: "연간 수억 원 단위의 물류비 절감 및 기사 파트너 신뢰 회복",
      description:
        "물류망 이원화를 통해 공급망 리스크를 완전히 헷지(Hedge)하였고, 기사 만족도 증가로 숙련된 고효율 기사들이 당사 플랫폼에 정착하는 선순환을 창출했습니다.",
      points: [
        "연간 수억 원 규모의 직접 배송비 절감 및 유연한 단가 계약 구조 확립",
        "기사 앱 관련 고객센터 인입 문의 65% 급감으로 고객센터 운영 리소스 대폭 절약",
        "기사 1인당 일평균 처리 건수 34% 증가 및 배송 정시성 지표 전면 개선",
      ],
    },
    techSpecs: {
      title: "주요 기술 규격 및 UX 개선 스펙",
      description: "고가용성 비동기 통신 및 휴먼 에러 제로화 인터페이스",
      items: [
        "모바일 네트워크 음영지역 대응 오프라인 큐(Queue) 동기화 아키텍처 수립",
        "바코드 다중 스캔(Multi-scan) 반응 속도 0.2초 이내 단축 및 진동/사운드 피드백",
        "배송 완료 사진 촬영 시 EXIF GPS 좌표 기반 주소지 자동 검증 로직",
        "일/주 단위 기사 수익 정산 투명 공개 화면 및 세금계산서 자동 발행 연동",
      ],
    },
    tags: [
      "#물류인프라",
      "#한차배송",
      "#원가절감",
      "#기사앱UX",
      "#API설계",
      "#지오펜싱",
    ],
  },
  {
    id: "project-03",
    title: "어딩 차세대 여행 B2B ERP (Basecamp) 구축",
    badge: "0 to 1 신사업 & SaaS",
    category: "b2b_erp",
    categoryLabel: "0 to 1 / B2B SaaS",
    role: "상품/행사/예약/정산 코어 도메인 설계 및 SI 마이그레이션 총괄 PM",
    period: "2020.10 — 2022.06",
    organization: "어딩 (Udding)",
    summary:
      "여행업계에서 관행적으로 사용하던 값비싼 외산 레거시 ERP(m-click 등)를 100% 국산화/클라우드화하여 대체한 차세대 여행사 올인원 B2B SaaS 플랫폼(Basecamp) 0 to 1 구축 프로젝트",
    keyMetrics: [
      {
        label: "외산 레거시 대체율",
        value: "100%",
        detail: "가맹 여행사의 m-click 시스템 완전 탈피 및 자체 플랫폼 안착",
      },
      {
        label: "가맹사 IT 비용",
        value: "-45%",
        detail: "고가의 서버 호스팅 및 라이선스 비용을 월 구독 모델로 절감",
      },
      {
        label: "DB 마이그레이션",
        value: "50,000+",
        detail: "복합 여행 상품, 고객 예약, 수기 장부 데이터 무중단 무결점 이관",
      },
    ],
    problem: {
      title: "20년 된 윈도우 레거시 솔루션의 높은 비용과 데이터 파편화",
      description:
        "국내 수백 개 여행사들이 20년 전 개발된 클라이언트-서버형 외산 레거시(m-click)를 사용하며 막대한 라이선스 비용과 잦은 데이터 유실 문제를 겪고 있었습니다. 복잡한 패키지 여행 일정과 항공/호텔/현지 가이드 정산이 수기 엑셀로 분절되어 있었습니다.",
      points: [
        "구형 클라이언트 프로그램 설치 필수 및 모바일/재택 근무 환경 지원 불가",
        "패키지 상품(항공+숙박+투어) 변경 시 예약자 데이터와 정산 데이터의 불일치 발생",
        "해외 랜드사 및 판매 대리점과의 복잡한 수수료 정산 과정에서 매월 수백만 원 오차 발생",
      ],
    },
    solution: {
      title: "엔드투엔드 여행 도메인 표준화 및 모던 웹 SaaS 아키텍처 설계",
      description:
        "상품 기획, 행사(일정표) 배정, 실시간 예약 발권, 복합 다중 수수료 정산에 이르는 전 도메인을 웹 표준 SaaS로 재설계하고, 대량 마이그레이션 툴을 직접 기획했습니다.",
      points: [
        "여행 도메인 코어 엔티티(상품-출발일-좌석-예약-정산)의 유기적 관계형 데이터 모델링 수립",
        "동적 일정표(Day-by-Day) 블록 에디터 기획으로 여행사 직원의 상품 생성 시간 70% 단축",
        "PG 결제, 가상계좌, 대리점 커미션 분할 정산이 자동 처리되는 전자 결제/정산 엔진 설계",
        "레거시 엑셀 덤프 파일을 1클릭으로 정규화하여 검증/적재하는 자체 마이그레이션 파이프라인 구축",
        "ISMS-P 정보보안 인증 기준에 부합하는 세분화된 권한 관리(RBAC) 및 개인정보 마스킹 구현",
      ],
    },
    businessImpact: {
      title: "자체 B2B SaaS 구독 비즈니스 모델 확립 및 시장 점유율 확보",
      description:
        "가맹 여행사들의 업무 생산성을 획기적으로 향상시키고, 어딩의 핵심 캐시카우가 되는 SaaS 구독 및 결제 수수료 모델을 안정적으로 정착시켰습니다.",
      points: [
        "외산 레거시 m-click 종속 탈피, 가맹사당 월 IT 운영 비용 45% 즉각 절감",
        "출시 1년 만에 수십 개 중대형 여행사 온보딩 성공 및 연간 정산 거래액 수백억 원 돌파",
        "자체 플랫폼 기술 자산 확보로 신규 기능(글로벌 항공 GDS 연동 등) 고속 확장 기반 마련",
      ],
    },
    techSpecs: {
      title: "주요 기술 규격 및 컴플라이언스 스펙",
      description: "엔터프라이즈급 안정성과 금융/보안 수준의 데이터 무결성 보장",
      items: [
        "Role-Based Access Control(RBAC) 기반 멀티테넌트(Multi-tenant) 권한 분리",
        "복합 트랜잭션 보장(ACID) 분할 정산 로직 및 감사 로그(Audit Log) 풀 트래킹",
        "대용량 고객 예약 DB 및 비정형 일정 데이터 일괄 파싱/검증 엔진",
        "개인정보보호법 및 ISMS-P 기준 여권번호/주민번호 암호화 저장 체계 준수",
      ],
    },
    tags: [
      "#B2B_ERP",
      "#Basecamp",
      "#0to1",
      "#정산도메인",
      "#데이터마이그레이션",
      "#SaaS",
      "#ISMS_P",
    ],
  },
];

export const CAPABILITIES_DATA: CapabilityCategory[] = [
  {
    title: "Product Leadership",
    subtitle: "비즈니스 전략과 실행을 잇는 리더십",
    iconName: "TrendingUp",
    items: [
      {
        name: "비즈니스 가설 검증 (Hypothesis-Driven)",
        description:
          "시장과 사용자의 모호한 문제를 정량적 가설로 정의하고, 빠른 MVP 실행을 통해 검증합니다.",
        highlight: true,
      },
      {
        name: "P&L 및 단위 경제 (Unit Economics) 최적화",
        description:
          "단순 기능 론칭을 넘어 1원 단위의 원가, 수수료, 고정비 구조를 분석하여 흑자 비즈니스를 설계합니다.",
        highlight: true,
      },
      {
        name: "크로스 펑셔널 팀 리딩 & 이해관계자 조율",
        description:
          "개발, 디자인, 현장 운영, 영업, 재무팀과의 유연한 조율을 통해 공동의 목표로 전진합니다.",
      },
      {
        name: "프로덕트 로드맵 & OKR/KPI 수립",
        description:
          "회사의 비전과 리소스 제약 조건을 고려하여 가장 임팩트가 큰 과제에 우선순위를 집중합니다.",
      },
    ],
  },
  {
    title: "Domain Expertise",
    subtitle: "복합 도메인을 꿰뚫는 구조화 능력",
    iconName: "Layers",
    items: [
      {
        name: "풀필먼트 & 라스트마일 물류 (WMS / TMS)",
        description:
          "입고-검수-배차-라우팅-배송완료까지 이어지는 전체 물류 사이클과 현장 기사 생태계를 깊이 이해합니다.",
        highlight: true,
      },
      {
        name: "B2B ERP & 올인원 SaaS 플랫폼",
        description:
          "다양한 이해관계자가 얽힌 복합 업무 도메인을 표준화된 워크플로우와 데이터 구조로 치환합니다.",
        highlight: true,
      },
      {
        name: "결제 / 복합 다중 수수료 정산 아키텍처",
        description:
          "PG 연동, 가상계좌, 에스크로, 커미션 분할 정산 등 금융 수준의 데이터 무결성을 설계합니다.",
      },
      {
        name: "ISMS-P 정보보안 인증 & 컴플라이언스",
        description:
          "개인정보보호 및 엔터프라이즈 보안 요구사항을 충족하는 접근 제어 및 암호화 정책을 수립합니다.",
      },
    ],
  },
  {
    title: "Tools & Technical Stack",
    subtitle: "개발팀과 오차 없이 소통하는 기술 유창성",
    iconName: "Code2",
    items: [
      {
        name: "Figma & 프로토타이핑",
        description:
          "상세 컴포넌트 단위의 와이어프레임 및 실제 모션 인터랙션이 포함된 고품질 프로토타입 제작",
        highlight: true,
      },
      {
        name: "SQL & 데이터 기반 의사결정",
        description:
          "BigQuery, MySQL 쿼리를 직접 작성하여 코호트 분석, 퍼널 이탈률, 매출 지표를 자체 추출",
        highlight: true,
      },
      {
        name: "API 아키텍처 & ERD 설계 검토",
        description:
          "Swagger/Postman 기반 RESTful API 명세서 작성 및 엔티티 관계도(ERD) 리뷰 역량 보유",
      },
      {
        name: "Jira / Confluence / Notion 프로젝트 관리",
        description:
          "스프린트 백로그 관리, PRD(제품 요구사항 정의서), 정책 가이드라인 문서화의 정석",
      },
    ],
  },
];

export const CAREER_EXPERIENCES: ExperienceItem[] = [
  {
    period: "2022.08 — 재직중",
    company: "카카오모빌리티 (Kakao Mobility)",
    role: "서비스 기획자 / 프로덕트 매니저 (라스트마일 물류 사업실)",
    description:
      "카카오스타일(지그재그/포스티) 새벽배송 신사업 론칭 및 물류 인프라 이원화 총괄 PM",
    highlights: [
      "카카오스타일 새벽배송 론칭 총괄 및 고정비 대비 매출 150% 신장",
      "오늘의픽업에서 자체 한차배송 전환으로 건당 배송원가 28% 절감",
      "기사 전용 모바일 앱 UX 전면 재설계로 현장 CS 문의량 65% 급감",
      "대형 화주사용 WMS-TMS 실시간 API 인터페이스 및 SLA 배송 관리 기준 수립",
    ],
    domains: ["라스트마일 물류", "새벽배송", "기사앱 UX", "화주사 연동", "비용최적화"],
  },
  {
    period: "2020.10 — 2022.06",
    company: "어딩 (Udding)",
    role: "프로덕트 매니저 (B2B 솔루션 사업본부)",
    description:
      "여행업계 올인원 차세대 B2B ERP 'Basecamp' 0 to 1 기획 및 외산 레거시 대체 총괄",
    highlights: [
      "외산 레거시 솔루션(m-click) 100% 국산화 대체로 가맹사 IT 운영비 45% 절감",
      "여행 상품, 복합 일정표, 예약 발권, 다중 정산 코어 아키텍처 엔드투엔드 설계",
      "5만 건 이상의 레거시 여행 데이터 무중단 마이그레이션 파이프라인 기획",
      "ISMS-P 인증 가이드라인 충족 및 다중 권한(RBAC) 보안 체계 수립",
    ],
    domains: ["B2B SaaS", "ERP 코어", "전자결제/정산", "0 to 1 신사업", "ISMS-P"],
  },
];

export const RESUME_SUMMARY = {
  education: [
    {
      period: "2015 — 2021",
      institution: "국내 대학교",
      major: "경영학 및 컴퓨터공학 복수전공",
      description: "비즈니스 모델링, 재무/회계 분석 및 데이터베이스, 소프트웨어 공학 이수",
    },
  ],
  certifications: [
    "SQLD (SQL 개발자) 자격증 보유",
    "정보처리기사 취득",
    "Google Analytics 4 (GA4) 공인 자격",
  ],
  languages: [
    "한국어 (모국어)",
    "영어 (비즈니스 문서 독해 및 기본 커뮤니케이션 가능)",
  ],
};
