# Portfolio site
younnihan.com/

## 폴더 구조

```text
  src/
  │
  ├── app/
  │ ├── layout.tsx // 전체 공통 레이아웃 (폰트, globals, 기본 <html>)
  │ ├── globals.scss // 전역 리셋/기본 스타일
  │ ├── fonts.ts // next/font 구글폰트 설정
  │ │
  │ ├── page.tsx // 메인 페이지 (WorkCard 리스트 + 로고마퀴 + Experience)
  │ ├── home.module.scss // 메인 전용 스타일
  │ │
  │ └── (routes)/ // 실제 내부 페이지들
  │ ├── pageCommon.module.scss
  │ │
  │ ├── aboutMe/
  │ │ └── page.tsx
  │ ├── page1/
  │ │ └── page.tsx
  │ ├── page2/
  │ │ └── page.tsx
  │ ├── page3/
  │ │ └── page.tsx
  │ └── page4/
  │ └── page.tsx
  │
  ├── components/
  │
  │ ├── back/
  │ │ ├── BackToHomeButton.tsx // 메인 제외 페이지 공통 백버튼
  │ │ └── ThemedSection.tsx // 흰/검 배경 감지용 wrapper
  │ │
  │ ├── common/
  │ │ ├── CopyEmailButton.tsx
  │ │
  │ ├── floating/
  │ │ ├── FloatingBottomGnb.tsx
  │ │ └── FloatingBottomGnb.module.scss
  │ │
  │ ├── header/
  │ │ └── Header.tsx // 메인에만 노출되는 상단 GNB (고정형)
  │ │
  │ ├── layout/
  │ │ ├── Container1360.tsx
  │ │ ├── Container1360.module.scss
  │ │ ├── Container1200.tsx
  │ │ └── Container1200.module.scss
  │ │
  │ ├── logo/ // 로고 자동롤링
  │ │ ├── LogoMarquee.tsx
  │ │ └── LogoMarquee.module.scss
  │ │
  │ └── work/ // 메인 카드 UI
  │ ├── WorkCard.tsx
  │ └── WorkCard.module.scss
  │
  ├── lib/
  │ ├── floatingNav.ts // 페이지별 플로팅 GNB 메뉴 데이터
  │ └── scroll.ts // 스크롤 이동 유틸
  │
  └── styles/
  └── globals.scss
