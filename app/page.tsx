export const dynamic = 'force-static';
import ScrollMotion from './scroll-motion';
import { AudioLines, ArrowDown, ArrowRight, ArrowUpRight, Command, ClipboardCheck, SlidersHorizontal, ShieldCheck, Sparkles, Check, Code2 } from 'lucide-react';
function BrandMark({size = 28}: {size?: number}) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 21 C7 8,10.5 8,13.5 16 C15.5 21.5,18 21.5,20.5 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><circle cx="26.5" cy="16" r="3" fill="#e0604a"/></svg>;
}
const repo = 'https://github.com/yunuchoiii/Sokki';
const download = `${repo}/releases/latest/download/Sokki.dmg`;
const features = [
  { icon: Command, title: '손에 익은 단축키로', text: '기본 ⌃⌥Space부터 나만의 조합까지. 수정자 키만 사용하는 단축키도 설정할 수 있어요.' },
  { icon: ClipboardCheck, title: '지금 쓰는 곳에 바로', text: '정리된 문장을 클립보드로 복사하고, 자동 붙여넣기를 켜면 커서 위치에 바로 입력해요.' },
  { icon: SlidersHorizontal, title: '내 말투와 용어에 맞게', text: '격식체, 구어체, 최소 손질까지. 자주 쓰는 전문 용어와 올바른 표기도 등록하세요.' },
  { icon: ShieldCheck, title: '기록은 내 Mac 안에', text: '요약 기록은 로컬에 저장돼요. AI 정리가 실패해도 원문을 복사하고 다시 정리할 수 있어요.' },
];
const models = [
  ['AUTO', '기본 설정', 'Gemini 키로 시작하세요. 지원되는 Mac에서는 Apple AI와 함께 실행해 더 나은 결과를 골라요.', 'Gemini 키 · Apple AI는 사용 가능 시'],
  ['Apple AI', '내 Mac에서', '키 없이, 인터넷 없이 문장을 정리해요. 받아 적은 텍스트를 외부로 보내지 않아요.', 'macOS 26 + Apple Intelligence 활성화'],
  ['Gemini', '무료로 시작', 'Google AI Studio에서 무료 키를 발급받아 사용해요. 카드 등록은 필요 없어요.', 'Gemini API 키 · 네트워크 필요'],
  ['Claude API', '선택 옵션', 'Anthropic API로 문장을 정리해요. 사용한 만큼 API 비용이 발생해요.', 'Anthropic 키 + 크레딧'],
  ['Claude Code', '구독으로', '이미 사용하는 Claude 구독을 연결해요. 처리에 10~60초가 걸릴 수 있어요.', 'Claude 구독 + 터미널 로그인'],
  ['받아쓰기만', 'AI 없이', 'AI 정리를 끄면 받아 적은 원문을 그대로 사용할 수 있어요.', '추가 키 필요 없음'],
];
export default function Home() {
  return <>
    <ScrollMotion />
    <a className="skip" href="#main">본문으로 바로가기</a>
    <header className="header"><a className="brand" href="#main" aria-label="Sokki 홈"><span className="logo"><BrandMark size={25}/></span>Sokki</a><nav aria-label="주요 메뉴"><a href="#how">사용 방법</a><a href="#models">AI 모델</a><a href="#releases">업데이트</a></nav><a className="button small" href={download}>다운로드 <ArrowDown size={15}/></a></header>
    <main id="main">
      <section className="hero">
        <div className="hero-inner"><div className="hero-content">
          <a className="release-pill" href="#releases"><span/>Sokki 0.3.2 <span className="pill-divider">/</span> 새로워진 시작 <ArrowUpRight size={14}/></a>
          <h1>말하면, Sokki가<br/>정리해서<br/><em>바로 입력합니다.</em></h1>
          <p className="hero-copy">생각이 문장이 되는 가장 자연스러운 방법.<br/>단축키를 누르고 말하세요.<br/>군말은 덜고, 당신의 뜻은 그대로.</p>
          <div className="hero-actions"><a className="button" href={download}><ArrowDown size={18}/> Mac용 무료 다운로드</a><a className="text-link" href="#how">어떻게 쓰나요 <ArrowRight size={16}/></a></div>
          <p className="meta">macOS 13 이상 <span>·</span> 무료 앱 <span>·</span> Apple 공증 완료</p>
        </div><div className="app-stage" aria-label="앱의 녹음 및 요약 완료 화면을 재현한 동작 예시">
          <div className="stage-label"><BrandMark size={22}/> 메뉴바에서, 필요한 순간에.</div>
          <div className="record-window"><div className="record-top"><span className="record-dot"/>듣고 있어요<span className="timer">00:12</span></div>
            <div className="waveform" aria-hidden="true">{[8,13,18,11,24,32,20,36,27,40,33,24,36,21,30,18,24,13,18,10,6].map((height,i)=><i key={i} style={{height}}/>)}</div>
            <p className="transcript">어, 내일 회의 있잖아요. 그거 오후 세 시로 바꾸고, 자료는 미리 공유해 주세요. <span>▍</span></p>
            <div className="record-actions" aria-hidden="true"><span>완료 — 요약하기</span><span>취소</span></div><p className="record-hint">⌃⌥Space를 다시 누르면 요약됩니다</p>
          </div>
          <div className="done-window"><div className="success-banner"><Check size={15}/> 클립보드에 복사됐어요 <span>⌘V</span></div><div className="summary-head"><strong>내일 회의 일정 변경</strong><span>한국어</span></div><p>내일 회의를 오후 3시로 변경하고,<br/>자료는 미리 공유해 주세요.</p><div className="summary-actions" aria-hidden="true"><span>원문 보기</span><span>다시 요약</span><span>···</span></div><div className="summary-foot"><span>← 처음으로</span><span>새 녹음</span></div></div>
          <p className="stage-caption">Sokki의 실제 UI를 바탕으로 재현한 동작 예시</p>
        </div></div>
        <div className="under-demo"><span><AudioLines size={17}/> Apple 음성 인식</span><span><Sparkles size={17}/> 내게 맞는 AI 선택</span><span><ClipboardCheck size={17}/> 쓰던 곳에 바로 입력</span></div>
      </section>
      <section className="section" id="how"><div className="section-title"><span className="eyebrow">말하기 → 정리하기 → 입력하기</span><h2>말하는 흐름 그대로.<br/>세 단계면 충분해요.</h2><p>메뉴바에 조용히 머물다가, 필요할 때 바로.</p></div><div className="steps">{[['01','단축키를 누르고 말해요','macOS에 내장된 Apple 음성 인식이 말을 받아 적어요.'],['02','한 번 더 누르면 정리 끝','선택한 AI가 군말을 덜어내고 자연스러운 문장으로 다듬어요.'],['03','원하는 곳에 붙여 넣어요','⌘V로 붙여 넣거나, 자동 붙여넣기로 현재 커서 위치에 입력하세요.']].map(([n,t,d])=><article key={n}><span className="step-num">{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div><p className="note">처음 사용할 때 마이크·음성 인식 권한과 macOS 받아쓰기 설정이 필요해요. 자동 붙여넣기는 손쉬운 사용 권한을 허용해 주세요.</p></section>
      <section className="feature-section"><div className="section"><div className="section-title"><span className="eyebrow">작업의 흐름을 지키는 디테일</span><h2>작은 앱에 담은,<br/>매일 필요한 디테일.</h2></div><div className="features">{features.map(({icon:Icon,title,text})=><article key={title}><div className="feature-icon"><Icon size={23}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section" id="models"><div className="section-title"><span className="eyebrow">정리는, 내게 맞는 AI로</span><h2>AI는 내 방식대로.</h2><p>받아쓰기는 언제나 무료. 문장을 정리하는 방법을 골라보세요.</p></div><div className="models">{models.map(([name,badge,desc,req])=><article key={name} className={name==='AUTO'?'recommended':''}><div className="model-heading"><h3>{name}</h3><span>{badge}</span></div><p>{desc}</p><div className="requirement">{req}</div></article>)}</div><p className="note">모델은 Sokki 설정 → 음성인식 · AI에서 선택해요. 클라우드 모델 사용 시 텍스트가 선택한 제공자에게 전송되며, 무료 한도와 요금은 제공자 정책을 따라요.</p></section>
      <section className="section releases" id="releases"><div className="section-title"><span className="eyebrow">RELEASE NOTES</span><h2>조금씩, 더 편하게.</h2><a className="text-link" href={`${repo}/releases`}>전체 업데이트 보기 <ArrowUpRight size={16}/></a></div><article className="release-card"><div className="release-head"><h3>0.3.2 <span>최신 확인 버전</span></h3><time dateTime="2026-09-07">2026.09.07</time></div><h4>시작은 더 쉽게, 설정은 더 명확하게.</h4><ul><li>Apple Intelligence가 꺼져 있으면 활성화 방법을 먼저 안내하고, 설정 후 돌아오면 자동으로 확인해요.</li><li>설정 탭을 ‘음성인식 · AI’, ‘고급 · 진단’으로 정리했어요.</li><li>DMG에 Applications 폴더로 끌어 넣는 설치 안내 화면을 추가했어요.</li></ul><a className="text-link" href={`${repo}/releases/tag/v0.3.2`}>릴리스 원문 <ArrowUpRight size={15}/></a><p className="meta">2026.09.07 GitHub 릴리스 기준</p></article></section>
      <section className="download-section" id="download"><span className="logo large"><BrandMark size={40}/></span><h2>다음 문장은,<br/>말로 시작해 보세요.</h2><p>당신은 생각에 집중하세요. 정리는 Sokki가 할게요.</p><a className="button" href={download}><ArrowDown size={18}/> Mac용 무료 다운로드</a><p className="meta">macOS 13 이상 · DMG를 열고 Applications로 드래그하세요.</p></section>
    </main><footer><a className="brand" href="#main"><BrandMark size={26}/> Sokki</a><p>생각과 문장 사이, Sokki.</p><a className="text-link" href={repo}><Code2 size={17}/> GitHub <ArrowUpRight size={14}/></a></footer>
  </>;
}
