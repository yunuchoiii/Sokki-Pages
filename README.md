# Sokki Pages

Sokki macOS 앱의 한국어 랜딩페이지입니다.

## 실행

Node.js 22.13 이상이 필요합니다.

```sh
cd ~/PersonalProjects/sokki-pages
npm install
npm run dev -- --port 5173
```

브라우저에서 http://127.0.0.1:5173 을 엽니다.

```sh
npm run lint
npm run typecheck
npm run build
npm start -- --port 5174
```

Sites의 React/Vinext 기반을 사용하며 로컬 실행에 필요한 기능만 연결했습니다. 외부 폰트, 런타임 API, 계정, 데이터베이스는 사용하지 않습니다. GitHub Pages 배포는 main 브랜치의 Actions에서 실행합니다.

## 수정할 파일

- `app/page.tsx`: 카피, 기능, 모델 정보, 릴리스 노트
- `app/globals.css`: 반응형 레이아웃과 디자인 토큰
- `app/layout.tsx`: 한국어 문서 설정과 검색 메타데이터
- `public/favicon.svg`: Sokki 브랜드 아이콘

## 콘텐츠와 디자인 기준

2026-09-07 확인:

- https://github.com/yunuchoiii/Sokki/blob/main/README.md
- https://github.com/yunuchoiii/Sokki/releases/tag/v0.3.2
- https://github.com/yunuchoiii/Sokki/blob/main/Sources/Theme.swift
- https://github.com/yunuchoiii/Sokki/blob/main/Sources/PopoverView.swift

앱의 잉크 블랙 #16181d, 녹음 코랄 #e0604a, 회색 면 #f2f3f5, 완료 녹색 #e9f4ee를 반영했습니다. 로고는 Theme.swift에 정의된 파형과 점의 좌표를 사용합니다. Hero의 앱 화면은 실제 소스에 기반한 HTML/CSS 재현이며 녹음 기능이나 실시간 처리 기능은 없습니다. 예시 텍스트만 사용합니다.

다운로드 CTA 3개는 모두 https://github.com/yunuchoiii/Sokki/releases/latest/download/Sokki.dmg 로 연결돼 누르면 바로 내려받습니다(릴리스마다 고정 이름 Sokki.dmg 를 올리는 규칙). 릴리스 노트는 0.3.2의 정적 스냅샷이므로 새 릴리스가 나오면 내용을 직접 갱신하세요. 다운로드 링크는 변경할 필요가 없습니다.

`lint`는 직접 작성한 앱과 설정을 검사합니다. 생성된 미사용 shadcn 컴포넌트에는 기본 린트 규칙과 충돌하는 항목이 있어 검사 범위에서 제외했습니다.

## GitHub Pages

`GITHUB_PAGES=true npm run build`로 `dist/client`에 정적 파일을 생성합니다.
Vite의 base 설정으로 `/Sokki-Pages/` 하위의 JS/CSS 경로를 지정합니다.
현재 Vinext의 basePath와 정적 export 조합은 프리렌더 시 404가 발생해 Vite base를 사용합니다.
로컬 개발은 환경 변수 없이 기존 명령으로 실행합니다.

PR에서는 린트·타입·정적 빌드를 검증하고, main에 병합되면 GitHub Pages에 자동 배포합니다.
예정 주소: https://yunuchoiii.github.io/Sokki-Pages/
