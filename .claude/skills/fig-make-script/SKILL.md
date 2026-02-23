---
name: fig-make-script
description: Figma 데이터를 파싱하는 Node.js 유틸리티 스크립트를 제안하고 생성한다. Figma MCP get_design_context 결과에서 에셋, 레이아웃, 색상, 타이포그래피 등을 자동 추출하는 스크립트를 만들 때 사용. "피그마 스크립트", "figma parser", "에셋 추출 스크립트" 등의 요청에 반응.
user-invocable: true
disable-model-invocation: false
argument-hint: "[script-type]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Figma Parsing Script Generator

사용자가 Figma 디자인 데이터를 파싱하는 Node.js 스크립트가 필요할 때 이 스킬을 사용한다.

## 실행 흐름

### 1단계: 스크립트 유형 결정

인자(`$ARGUMENTS`)가 주어지면 해당 유형의 스크립트를 생성한다.
인자가 없으면 사용자에게 아래 카탈로그에서 선택하도록 AskUserQuestion으로 제안한다.

### 2단계: 스크립트 생성

- 저장 경로: `tools/figma-parser/` 디렉토리
- 의존성: Node.js 내장 모듈만 사용 (`fs`, `path`, `child_process`, `url`)
- 패턴: CLI 스크립트 (stdin 파이프 + `--input` 파일 지원)
- 파일명: kebab-case `.mjs`

### 3단계: CLAUDE.md 업데이트

새 스크립트가 생성되면 CLAUDE.md의 "에셋 추출 방법" 섹션에 사용법을 추가한다.
이미 등록된 스크립트와 중복되지 않도록 확인 후 추가.

### 4단계: 요약 출력

생성된 스크립트의 사용법과 예시 명령어를 사용자에게 보여준다.

---

## 스크립트 카탈로그

아래는 생성 가능한 Figma 파싱 스크립트 유형이다. 각 스크립트는 독립적으로 실행 가능.

### 1. `index.mjs` — 에셋 & 레이아웃 파서 (이미 구현됨)

Figma MCP `get_design_context` JSX 출력에서 에셋 URL과 레이아웃 정보를 추출.

```bash
node tools/figma-parser/index.mjs --input figma-output.txt --assets public/portfolio --prefix hero
```

**기능:**
- `const imgXxx = "http://localhost:3845/..."` 패턴에서 에셋 URL 추출
- Tailwind 클래스에서 위치/크기/회전 파싱 (`left-[Xpx]`, `top-[Ypx]` 등)
- 바운딩 박스 중심 좌표 자동 계산 (% 단위)
- curl로 SVG/PNG 에셋 다운로드
- 레이아웃 JSON 생성 (`tools/figma-parser/output/{prefix}-layout.json`)

### 2. `color-extractor.mjs` — 색상 팔레트 추출기

Figma 디자인에서 사용된 모든 색상을 추출하여 CSS 변수로 변환.

```bash
node tools/figma-parser/color-extractor.mjs --input figma-output.txt --output globals-colors.css
```

**기능:**
- `text-[#hex]`, `bg-[#hex]`, `border-[#hex]` 등 Tailwind 색상 값 수집
- `rgba()`, `hsla()` 등 함수형 색상도 수집
- 중복 제거 후 사용 빈도순 정렬
- CSS 변수 선언문 자동 생성 (`--color-primary: #xxx;`)
- 기존 `globals.css` 변수와 비교하여 새로운 색상만 하이라이트

### 3. `typography-extractor.mjs` — 타이포그래피 시스템 추출기

Figma에서 사용된 폰트/크기/굵기 조합을 분석하여 타이포 계층 생성.

```bash
node tools/figma-parser/typography-extractor.mjs --input figma-output.txt --base-width 1920
```

**기능:**
- `font-['FontName']`, `text-[Xpx]`, `font-[weight]` 조합 수집
- `clamp()` 값 자동 생성 (모바일 최소값 ~ Figma 원본값)
- 폰트 계층 테이블 출력 (Display, H1, H2, ... Caption)
- Tailwind `@theme` 또는 CSS 변수 형식으로 내보내기

### 4. `spacing-extractor.mjs` — 간격(Spacing) 토큰 추출기

Figma 디자인의 gap, padding, margin 패턴을 분석하여 스페이싱 시스템 생성.

```bash
node tools/figma-parser/spacing-extractor.mjs --input figma-output.txt
```

**기능:**
- `gap-[Xpx]`, `p-[Xpx]`, `m-[Xpx]`, `space-x/y-[Xpx]` 등 수집
- 반복되는 값을 클러스터링하여 토큰화 (`space-xs` ~ `space-xl`)
- `clamp()` 반응형 값 자동 생성
- CSS 변수 또는 Tailwind theme 형식 출력

### 5. `component-mapper.mjs` — 컴포넌트 구조 매퍼

Figma 노드 계층을 React 컴포넌트 구조로 매핑.

```bash
node tools/figma-parser/component-mapper.mjs --input figma-output.txt --prefix hero
```

**기능:**
- `data-node-id` 기반 노드 트리 구성
- 각 노드의 역할 추론 (wrapper, image, text, decorative)
- React 컴포넌트 스켈레톤 코드 생성
- Props interface 자동 생성 (위치/크기/회전 데이터 포함)

### 6. `animation-mapper.mjs` — 애니메이션 매퍼

Figma의 레이어 구조와 위치 데이터를 분석하여 Framer Motion 애니메이션 코드 생성.

```bash
node tools/figma-parser/animation-mapper.mjs --input figma-output.txt --pattern stagger
```

**기능:**
- 요소 간 z-index 관계 분석
- stagger, fade-in, slide-in 등 애니메이션 패턴 제안
- Framer Motion `initial` / `animate` / `whileInView` 코드 생성
- `viewport` 옵션과 `transition` 타이밍 자동 설정

---

## 공통 코드 컨벤션

모든 생성 스크립트는 다음 규칙을 따른다:

1. **ESM 모듈** (`import/export`, `.mjs` 확장자)
2. **외부 패키지 없음** — Node.js 내장 모듈만 사용
3. **CLI 인터페이스** — `--input`, `--output`, `--help` 등 표준 옵션
4. **stdin 파이프 지원** — `pbpaste | node script.mjs`
5. **결과 요약 출력** — 실행 후 콘솔에 요약 테이블 표시
6. **JSON 출력** — `tools/figma-parser/output/` 디렉토리에 저장

## 파싱 정규식 패턴 (공통)

| 대상 | 패턴 |
|------|------|
| 에셋 URL | `const (img\w+)\s*=\s*"(http://localhost:3845/[^"]+)"` |
| 위치 left | `left-\[(-?[\d.]+)px\]` |
| 위치 top | `top-\[(-?[\d.]+)px\]` |
| 너비 | `w-\[([\d.]+)px\]` |
| 높이 | `h-\[([\d.]+)px\]` |
| calc 위치 | `left-\[calc\(50%([+-][\d.]+)px\)\]` |
| 회전 | `rotate-?\[(-?[\d.]+)deg\]` |
| 노드 ID | `data-node-id="([\d:]+)"` |
| 에셋 참조 | `src=\{(\w+)\}` |
| 폰트 | `font-\['([^']+)'\]` |
| 폰트 크기 | `text-\[(\d+)px\]` |
| 색상 (#hex) | `text-\[(#[\da-fA-F]+)\]` |
| 색상 (rgba) | `text-\[(rgba?\([^)]+\))\]` |
| 배경색 | `bg-\[(#[\da-fA-F]+)\]` |
| 보더색 | `border-\[(#[\da-fA-F]+)\]` |
| gap | `gap-\[([\d.]+)px\]` |
| padding | `p[xytblr]?-\[([\d.]+)px\]` |
| margin | `m[xytblr]?-\[([\d.]+)px\]` |
