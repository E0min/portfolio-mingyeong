# Portfolio Project — 개발 지침

## Figma 디자인 소스

- **파일**: MeanGirl (Figma)
- **기준 해상도**: 1920 × 1060px
- **홈페이지 노드**: `265:31` (전체), `265:97` (히어로)

---

## 반응형 디자인 기준

이 프로젝트의 Figma 디자인은 **가로 1920px** 기준으로 제작되었습니다.
모든 크기/위치 값은 아래 공식으로 `vw` 단위로 변환하여 반응형을 구현합니다.

### 변환 공식

```
vw값 = Figma px값 / 1920 × 100
```

### 변환 예시 (1920px 기준)

| Figma (px) | 계산 | CSS (vw) |
|:---:|:---:|:---:|
| 120px | 120 / 1920 × 100 | 6.25vw |
| 110px | 110 / 1920 × 100 | 5.73vw |
| 80px | 80 / 1920 × 100 | 4.17vw |
| 67px | 67 / 1920 × 100 | 3.49vw |
| 60px | 60 / 1920 × 100 | 3.13vw |
| 45px | 45 / 1920 × 100 | 2.34vw |
| 30px | 30 / 1920 × 100 | 1.56vw |

### 적용 규칙

1. **font-size**: `clamp(최소px, 계산된vw, Figma원본px)` 형태로 지정
   - 예: Figma 120px → `clamp(48px, 6.25vw, 120px)`
   - 최소값은 모바일(375px 기준)에서 가독성을 보장하는 크기

2. **위치 (left, top)**: Figma px를 `%`로 변환 (부모 컨테이너 대비)
   - 수평: `Figma left px / 1920 × 100 = %`
   - 수직: `Figma top px / 섹션높이 × 100 = %`

3. **너비/패딩/갭**: `vw` 또는 `%`로 변환
   - 예: Figma 60px 패딩 → `3.13vw` 또는 `clamp(20px, 3.13vw, 60px)`

4. **고정 크기 요소** (아이콘, 작은 이미지 등): `px` 유지 가능

### 브레이크포인트

| 이름 | 범위 | 비고 |
|:---:|:---:|:---|
| Desktop | > 1200px | Figma 원본에 가장 가까운 레이아웃 |
| Tablet | 768px ~ 1200px | 그리드 축소, 폰트 clamp 적용 |
| Mobile | < 768px | 단일 컬럼, 일부 장식 요소 숨김 |

---

## Figma 이미지 임포트 규칙

### 에셋 추출 방법

1. **Figma MCP 도구 사용** (권장)
   - `get_design_context` 호출 시 이미지 URL이 `http://localhost:3845/assets/...` 형태로 반환됨
   - `curl -o public/portfolio/파일명.확장자 "localhost URL"` 로 다운로드
   - Figma Desktop 앱이 실행 중이어야 localhost 서버가 활성화됨

2. **수동 내보내기** (Figma 앱 → Export)
   - 래스터 이미지: 2x 스케일로 PNG 내보내기
   - 벡터/장식: SVG로 내보내기

3. **파싱 스크립트 사용** (자동 추출)
   - `get_design_context` 결과를 파일에 저장
   - `node tools/figma-parser/index.mjs --input 파일 --assets public/portfolio --prefix 섹션명`
   - SVG/PNG 자동 다운로드 + 레이아웃 JSON 생성 (`tools/figma-parser/output/`)
   - 상세 사용법: `tools/figma-parser/README.md` 참조

### 파일명 규칙

```
{섹션}-{설명}.{확장자}
```

| 접두사 | 용도 | 예시 |
|:---:|:---|:---|
| `hero-` | 히어로 섹션 | `hero-manga-bg.png`, `hero-vector-1.svg` |
| `about-` | 어바웃 섹션 | `about-photo-1.png`, `about-border-left.svg` |
| `works-` | 작품 섹션 | `works-mean-left.png`, `works-circle-text.svg` |
| `namecard-` | 명함 섹션 | `namecard-pattern.svg` |
| `footer-` | 푸터 섹션 | `footer-photo.png`, `footer-border.svg` |

### 포맷 선택 기준

| 포맷 | 용도 | 비고 |
|:---|:---|:---|
| **PNG** | 사진, 일러스트, 래스터 이미지 | Next.js Image 컴포넌트로 최적화 |
| **SVG** | 장식선, 보더, 패턴, 아이콘 | `<img>` 태그로 사용 (장식용), 인라인 SVG 지양 |
| **WebP** | 대형 배경 이미지 (선택) | PNG보다 30~50% 용량 절감 |

### Next.js Image 사용 패턴

```tsx
// 배경 이미지 (fill 모드) — LCP 최적화
<Image
  src="/portfolio/hero-manga-bg.png"
  alt="설명 텍스트"
  fill
  priority              // 첫 화면에 보이는 이미지만 priority
  className="object-cover"
  sizes="100vw"
/>

// 크기 지정 이미지
<Image
  src="/portfolio/about-photo-1.png"
  alt="설명 텍스트"
  width={480}           // Figma 원본 너비
  height={330}          // Figma 원본 높이
  className="w-full h-auto object-cover"
/>

// 장식용 SVG — <img> 태그 사용 (빈 alt)
<img src="/portfolio/hero-vector-1.svg" alt="" className="w-full h-auto" />
```

### 이미지 저장 경로

```
public/
  portfolio/            ← 모든 포트폴리오 에셋
    hero-*.png/svg      ← 히어로 섹션
    about-*.png/svg     ← 어바웃 섹션
    works-*.png/svg     ← 작품 섹션
    namecard-*.png/svg  ← 명함 섹션
    footer-*.png/svg    ← 푸터 섹션
```

---

## 디자인 일관성 지침

### 1. 색상 — 반드시 CSS 변수 사용

인라인 스타일이나 Tailwind에 직접 색상값을 쓰지 않고, `globals.css`에 정의된 CSS 변수를 사용합니다.

```css
/* ✅ 올바른 사용 */
color: var(--home-text-light);
background: var(--home-bg-gray);

/* ❌ 지양 */
color: #d1d5df;
background: #e8e8e8;
```

**예외**: Figma에서 특정 요소에만 사용되는 일회성 색상(예: span 강조색 `#1a7fa0`)은 인라인 허용.
단, 2곳 이상 반복되면 즉시 CSS 변수로 등록.

| 변수명 | 값 | 용도 |
|:---|:---|:---|
| `--home-bg-dark` | `#0f0f0f` | 히어로 오버레이, 메인 배경 |
| `--home-bg-gray` | `#e8e8e8` | 네비, 어바웃, 명함 배경 |
| `--home-bg-darkgray` | `#414141` | 작품 섹션, 사이드카드 배경 |
| `--home-border-gray` | `#d7d7d7` | 공통 보더 |
| `--home-text-light` | `#d1d5df` | 기본 밝은 텍스트 |
| `--home-text-blue` | `#31aace` | 파란 강조 |
| `--home-text-green` | `#dcfadb` | 초록 강조 |
| `--home-text-pink` | `#fddeff` | 핑크 강조 |
| `--home-text-purple` | `#b9bfff` | 보라 링크 |
| `--home-text-yellow` | `#e0e2ab` | 노란 장식 |
| `--home-frame-border` | `#2b2929` | 이미지 프레임 보더 |

### 2. 타이포그래피 계층

각 폰트는 명확한 역할이 있으며, 역할 외 사용을 지양합니다.

| 폰트 | 역할 | 사용처 |
|:---|:---|:---|
| **Pretendard** | 본문, 산란 텍스트, 히어로 대형 텍스트 | 기본 폰트, 한/영 공용 |
| **Oswald** | 네비게이션, 인사말, 핑크 텍스트 | 탭 라벨, 섹션 헤딩 |
| **Inter** | 보조 라벨, 메타 정보 | `(archive)`, `(coming soon)`, 번호 |
| **Comfortaa + Noto Sans JP** | 일본어 텍스트 | 히어로 세로 텍스트, 인용구 |

**폰트 크기 계층** (Figma 기준):

| 계층 | Figma px | CSS clamp | 용도 |
|:---|:---:|:---|:---|
| Display | 120px | `clamp(48px, 6.25vw, 120px)` | 히어로 산란 텍스트 |
| H1 | 110px | `clamp(44px, 5.73vw, 110px)` | ART WORKS 등 대형 |
| H2 | 80px | `clamp(32px, 4.17vw, 80px)` | motion 등 중형 |
| H3 | 65–70px | `clamp(28px, 3.6vw, 70px)` | WRITER, Etc... |
| H4 | 60px | `clamp(28px, 3.13vw, 60px)` | DESINGER |
| Subtitle | 45px | `clamp(24px, 2.34vw, 45px)` | Hellooooo, 이메일 |
| Body | 21px | 고정 또는 `clamp(16px, 1.09vw, 21px)` | 소개 본문 |
| Caption | 11–18px | 고정 px | 라벨, 인용구 |

### 3. 간격(Spacing) 시스템

Figma 디자인에서 반복되는 간격 값:

| 토큰 | Figma px | CSS | 용도 |
|:---|:---:|:---|:---|
| `space-xs` | 14px | `clamp(8px, 0.73vw, 14px)` | 카드 그리드 갭 |
| `space-sm` | 20px | `clamp(10px, 1.04vw, 20px)` | 섹션 내부 패딩 (모바일) |
| `space-md` | 40px | `clamp(20px, 2.08vw, 40px)` | 그리드 갭, 푸터 패딩 |
| `space-lg` | 60px | `clamp(24px, 3.13vw, 60px)` | 네비 갭, 섹션 패딩 |
| `space-xl` | 80px | `clamp(30px, 4.17vw, 80px)` | 푸터바 아이템 갭 |

### 4. 보더 & 라운딩

| 요소 | border-radius | border | 비고 |
|:---|:---:|:---|:---|
| 섹션 컨테이너 | `10px` | `1px solid var(--home-border-gray)` | 히어로, 어바웃, 작품, 푸터 |
| 사이드 카드 | `27px` | `1px solid white` | 큰 라운딩으로 카드 느낌 |
| 명함 카드 | `0` | 없음 | 직각 — 명함 느낌 |
| 이미지 프레임 | `10px` | `1px solid var(--home-border-gray)` | 사진 콜라주 |
| 작품 프레임 | `1px` | `5px solid var(--home-frame-border)` | 두꺼운 다크 프레임 |

### 5. 그림자(Shadow)

최소한의 그림자만 사용하여 클린한 에디토리얼 느낌을 유지합니다.

```css
/* 사진 프레임 전용 — 유일한 그림자 */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```

다른 요소에 그림자를 추가하지 않습니다. 깊이감은 z-index와 겹침으로 표현합니다.

### 6. 애니메이션 규칙

| 패턴 | 트리거 | 용도 |
|:---|:---|:---|
| stagger fade-in | 페이지 로드 (`animate`) | 히어로 산란 텍스트 |
| fade + translateY | 스크롤 진입 (`whileInView`) | 어바웃, 명함, 푸터 |
| scale 0.9→1 + fade | 스크롤 진입 | 사진 콜라주 |
| translateX + fade | 스크롤 진입 | 사이드 카드 |

**타이밍 기준**:
- `duration`: 0.5~0.8초 (빠르고 부드럽게)
- `delay`: stagger 시 아이템당 0.05~0.1초
- `ease`: `"easeOut"` (기본)
- `viewport`: `{ once: true, amount: 0.2 }` (한 번만, 20% 노출 시)

```tsx
// ✅ 표준 whileInView 패턴
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.08 }}
  viewport={{ once: true, amount: 0.2 }}
>
```

### 7. Z-index 관리

| 레이어 | z-index | 요소 |
|:---|:---:|:---|
| 배경 이미지 | 0 | 히어로 배경, 명함 배경 |
| 오버레이 | 0 (::after) | 히어로 어두운 오버레이 |
| 콘텐츠 | 1 | 텍스트, 일반 요소 |
| 사진 콜라주 | 1–8 | 겹침 순서대로 증가 |
| 사이드 카드 | 10 | 텍스트 위에 떠 있는 카드 |

---

## CSS 주석 규칙

모든 CSS 속성/규칙에는 해당 효과와 목적을 설명하는 주석을 반드시 작성합니다.

```css
/* ✅ 올바른 예시 */
.hero {
  position: relative;     /* 산란 텍스트의 기준점 */
  aspect-ratio: 1920 / 1060; /* Figma 비율 유지 */
  border-radius: 10px;    /* 둥근 모서리 */
  overflow: hidden;       /* 내부 요소 넘침 방지 */
}
```

---

## 코드 컨벤션

- 파일명: kebab-case (`hero-section.tsx`)
- 컴포넌트: PascalCase (`HeroSection`)
- Props 타입: `interface` 선언
- 섹션 컴포넌트 경로: `src/components/home/`
- CSS Module: `src/app/home.module.css`
- 애니메이션: `motion/react` (Framer Motion) — `initial` → `animate` / `whileInView` 패턴
- 이미지: `public/portfolio/` — Next.js `<Image>` 우선, 장식 SVG는 `<img>`
