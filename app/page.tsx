export const dynamic = 'force-static';
import ScrollMotion from './scroll-motion';
import { AudioLines, ArrowDown, ArrowRight, ArrowUpRight, Command, BookOpen, ClipboardCheck, SlidersHorizontal, ShieldCheck, Sparkles, Check, Code2, Heart, Users, Video, FileAudio, Laptop, Clock, CircleAlert, type LucideIcon } from 'lucide-react';
function BrandMark({size = 28}: {size?: number}) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 21 C7 8,10.5 8,13.5 16 C15.5 21.5,18 21.5,20.5 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><circle cx="26.5" cy="16" r="3" fill="#e0604a"/></svg>;
}
import releasesData from '../data/releases.json';
import { SITE_URL, REPO_URL, DOWNLOAD_URL, path } from '../lib/site';
const repo = REPO_URL;
const download = DOWNLOAD_URL;
const sponsor = 'https://github.com/sponsors/yunuchoiii';

// 릴리스 노트는 빌드 때 scripts/fetch-releases.mjs 가 GitHub 에서 가져온다. 여기선 "## 바뀐 것" 아래 불릿만 보여 준다.
type Release = { tag: string; version: string; publishedAt: string; url: string; body: string };
const releases = releasesData as Release[];
// 히어로 알약의 버전. 예전엔 0.3.2 가 박혀 있어 릴리스를 올려도 그대로였다.
const latestVersion = releases[0]?.version ?? '';
function notesOf(body: string): string[] {
  const sections = body.split(/^##\s+/m);
  const pick = sections.find((x) => x.startsWith('바뀐 것')) ?? sections.find((x) => /^- /m.test(x)) ?? '';
  return pick.split('\n').filter((l) => l.startsWith('- ')).map((l) => l.slice(2).trim());
}
function Bold({ text }: { text: string }) {
  return <>{text.split('**').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>;
}
const kst = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' });
const isoDate = (s: string) => kst.format(new Date(s));
const dotDate = (s: string) => isoDate(s).replace(/-/g, '.');
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Brefly',
  alternateName: '브레플리',
  operatingSystem: 'macOS 13 이상',
  applicationCategory: 'UtilitiesApplication',
  softwareVersion: releases[0]?.version,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  downloadUrl: download,
  url: SITE_URL,
  inLanguage: 'ko',
  description: 'Brefly(브레플리)는 단축키를 누르고 말하면 받아 적고 AI가 문장을 정리해 커서 위치에 붙여 넣는 무료 macOS 메뉴바 앱입니다. 대면·화상 회의를 녹음하거나 녹음 파일을 넣어 회의록도 만듭니다.',
};
// 회의록을 시작하는 세 가지 방법. 표 한 줄씩 그대로 대응한다.
const meetingWays: { icon: LucideIcon; name: string; desc: string; sub?: string; tag: string; need?: boolean }[] = [
  { icon: Users, name: '대면 회의', desc: '이 맥의 마이크로 그 자리의 말을 담아요.', sub: '마이크 하나라 누가 말했는지는 아직 나누지 못해요.', tag: '추가 권한 없음' },
  { icon: Video, name: '화상 회의', desc: '내 목소리와 스피커로 나오는 소리를 따로 담아요. 그래서 내가 한 말과 상대가 한 말이 갈려요.', sub: '상대가 여러 명이면 모두 ‘상대’로 묶여요. 그 안에서 누가 말했는지는 아직 나누지 못해요.', tag: '화면 기록 권한 필요', need: true },
  { icon: FileAudio, name: '녹음 파일', desc: '이미 가지고 있는 녹음 파일을 넣으면 같은 방식으로 정리해요.', tag: '추가 권한 없음' },
];
// 목업에 들어가는 예시 원문. 화상 회의라 '나 / 상대'로 갈라져 있다.
const meetingScript: [string, '나' | '상대', string][] = [
  ['00:42', '상대', '지난주 베타 의견 정리해 봤는데요, 녹음 버튼 위치 얘기가 제일 많았어요.'],
  ['01:15', '나', '그건 이번에 바로 고칠 수 있을 것 같아요.'],
  ['03:08', '상대', '결제 화면은 이번 일정에 넣기엔 좀 빠듯해요.'],
  ['03:20', '나', '그럼 결제는 0.9로 넘기고, 출시일은 그대로 가죠.'],
  ['05:47', '상대', '좋아요. 공지는 누가 쓸까요?'],
  ['05:52', '나', '제가 금요일까지 초안 써 둘게요.'],
];
// 예시 회의록의 "할 일". 앱이 내는 꼴 그대로다 — `할 일 — 담당자, 마감`, 말 안 한 건 안 붙는다.
// ⚠️ 시안은 체크박스로 그렸는데 쓰지 않는다. 앱에 체크박스가 없고, 누를 수 있을 것처럼
//    보이는 것을 그려 두면 받아 보고 기대와 달라진다.
const meetingTodos = [
  '출시 공지 초안 쓰기 — 나, 금요일까지',
  '녹음 버튼 위치 고치기 — 상대, 다음 회의 전',
];
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
// 회의록 섹션. Home 안에 한 줄로 밀어 넣기엔 커서 따로 뺐다.
function MeetingSection() {
  return <section className="section meeting" id="meeting">
    <div className="section-title"><span className="eyebrow">회의록</span><h2>회의가 끝나면,<br/>회의록이 남아요.</h2><p>녹음만 해 두세요. 받아 적은 말을 결정된 것, 할 일, 논의한 것으로 나눠 정리해요.</p></div>
    <div className="meeting-demo">
      <div className="meeting-window" aria-label="회의록 결과 화면을 재현한 예시">
        <div className="meeting-top"><span className="win-dots" aria-hidden="true"><i/><i/><i/></span><strong>주간 제품 회의</strong><span className="tag">화상 회의</span><span className="meeting-when">34분 52초</span></div>
        <div className="meeting-body">
          <div className="meeting-notes">
            <span className="panel-label">정리</span>
            <div className="note-block"><h4>한 줄 요약</h4><p className="note-lede">10월 출시는 그대로 가고, 결제 화면만 다음 버전으로 미뤄요.</p></div>
            <div className="note-block"><h4>결정된 것</h4><ul className="decided"><li>출시일은 10월 14일 그대로</li><li>결제 화면 개편은 0.9로 미룸</li></ul></div>
            <div className="note-block"><h4>할 일</h4><ul className="decided">{meetingTodos.map((todo) => <li key={todo}>{todo}</li>)}</ul></div>
            <div className="note-block"><h4>논의한 것</h4><p>베타 의견 중 녹음 버튼 위치 얘기가 가장 많았어요. 결제 화면은 이번 일정에 넣기엔 빠듯하다는 의견이었어요.</p></div>
            <div className="note-block"><h4>다음에 볼 것</h4><p>결제 화면 시안 · 베타 2차 모집 여부</p></div>
          </div>
          <div className="meeting-script">
            <span className="panel-label">받아 적은 원문</span>
            {meetingScript.map(([at, who, text]) => <div className="script-line" key={at}><time>{at}</time><b className={who === '나' ? 'me' : 'you'}>{who}</b><span>{text}</span></div>)}
          </div>
        </div>
      </div>
      <p className="note">화상 회의는 내 목소리와 스피커로 나오는 소리를 따로 받아서 내 말과 상대 말을 갈라 적어요. 위 예시는 두 사람이 한 회의예요 — 상대가 여러 명이면 그쪽은 모두 ‘상대’로 적혀요. 원문은 시각과 함께 따로 볼 수 있어요.</p>
    </div>
    <div className="meeting-ways">
      <h3>시작하는 세 가지 방법</h3>
      <div className="way-list">{meetingWays.map(({ icon: Icon, name, desc, sub, tag, need }) => <div className="way" key={name}><div className="way-name"><Icon size={18}/>{name}</div><div className="way-desc">{desc}{sub && <><br/><small>{sub}</small></>}</div><span className={need ? 'way-tag need' : 'way-tag'}>{tag}</span></div>)}</div>
    </div>
    <div className="meeting-facts">
      <article className="fact-privacy">
        <div className="fact-head"><Laptop size={18}/><h3>녹음은 이 맥 밖으로 나가지 않아요.</h3></div>
        <div className="flow">
          <div className="flow-step"><b>이 맥 안</b><strong>녹음 → 받아쓰기</strong><span>녹음 파일은 여기에만 있어요</span></div>
          <div className="flow-arrow" aria-hidden="true"><ArrowRight size={18}/></div>
          <div className="flow-step out"><b>AI 모델로</b><strong>받아 적은 글만</strong><span>요약할 때만 보내요</span></div>
        </div>
        <p>받아쓰기는 이 맥 안에서 처리하고 인터넷으로 보내지 않아요. 처음 한 번 받아쓰기 모델(약 547MB)을 내려받으면, 그다음부터는 인터넷 없이 받아 적어요.</p>
      </article>
      <article className="fact-speed">
        <div className="fact-label"><Clock size={18}/>받아 적는 데 걸리는 시간</div>
        <div className="fact-num">약 1분 50초</div>
        <p>35분 회의 기준이에요.<br/>20분 회의는 약 1분 15초.</p>
      </article>
    </div>
    <div className="meeting-limits">
      <div className="limits-head"><CircleAlert size={15}/>아직 안 되는 것</div>
      <div className="limit"><b>누가 말했는지까지는 아직 나누지 못해요.</b><span>대면 회의는 마이크 하나로 받아서 원문이 한 사람 말처럼 이어서 적혀요. 화상 회의는 내 말과 상대 말이 갈리지만, 상대가 여러 명이면 그쪽은 한 사람처럼 묶여요.</span></div>
      <div className="limit"><b>녹음하면서 바로 받아 적지는 않아요.</b><span>녹음이 끝난 뒤 받아 적기 시작해요. 35분 회의라면 2분쯤 기다리면 돼요.</span></div>
    </div>
  </section>;
}
export default function Home() {
  return <>
    <ScrollMotion />
    <a className="skip" href="#main">본문으로 바로가기</a>
    <header className="header"><a className="brand" href="#main" aria-label="Brefly 홈"><span className="logo"><BrandMark size={25}/></span>Brefly</a><nav aria-label="주요 메뉴"><a href="#how">사용 방법</a><a href="#models">AI 모델</a><a href={path('/guide/')}>사용 가이드</a><a href="#releases">업데이트</a></nav><a className="button small" href={download}>다운로드 <ArrowDown size={15}/></a></header>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/><main id="main">
      <section className="hero">
        <div className="hero-inner"><div className="hero-content">
          <a className="release-pill" href="#releases"><span/>Brefly {latestVersion} <span className="pill-divider">/</span> 무엇이 바뀌었나요 <ArrowUpRight size={14}/></a>
          <h1>말하면, Brefly가<br/>정리해서<br/><em>바로 입력합니다.</em></h1>
          <p className="hero-copy">생각이 문장이 되는 가장 자연스러운 방법.<br/>단축키를 누르고 말하세요.<br/>군말은 덜고, 당신의 뜻은 그대로.</p>
          <p className="meta">Brefly는 <strong>브레플리</strong>라고 읽습니다.</p>
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
          <p className="stage-caption">Brefly의 실제 UI를 바탕으로 재현한 동작 예시</p>
        </div></div>
        <div className="under-demo"><span><AudioLines size={17}/> Apple 음성 인식</span><span><Sparkles size={17}/> 내게 맞는 AI 선택</span><span><ClipboardCheck size={17}/> 쓰던 곳에 바로 입력</span></div>
      </section>
      <section className="section" id="how"><div className="section-title"><span className="eyebrow">말하기 → 정리하기 → 입력하기</span><h2>말하는 흐름 그대로.<br/>세 단계면 충분해요.</h2><p>메뉴바에 조용히 머물다가, 필요할 때 바로.</p></div><div className="steps">{[['01','단축키를 누르고 말해요','macOS에 내장된 Apple 음성 인식이 말을 받아 적어요.'],['02','한 번 더 누르면 정리 끝','선택한 AI가 군말을 덜어내고 자연스러운 문장으로 다듬어요.'],['03','원하는 곳에 붙여 넣어요','⌘V로 붙여 넣거나, 자동 붙여넣기로 현재 커서 위치에 입력하세요.']].map(([n,t,d])=><article key={n}><span className="step-num">{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div><p className="note">처음 사용할 때 마이크·음성 인식 권한과 macOS 받아쓰기 설정이 필요해요. 자동 붙여넣기는 손쉬운 사용 권한을 허용해 주세요.</p></section>
      <section className="feature-section"><div className="section"><div className="section-title"><span className="eyebrow">작업의 흐름을 지키는 디테일</span><h2>작은 앱에 담은,<br/>매일 필요한 디테일.</h2></div><div className="features">{features.map(({icon:Icon,title,text})=><article key={title}><div className="feature-icon"><Icon size={23}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <MeetingSection/>
      <section className="section" id="models"><div className="section-title"><span className="eyebrow">정리는, 내게 맞는 AI로</span><h2>AI는 내 방식대로.</h2><p>받아쓰기는 언제나 무료. 문장을 정리하는 방법을 골라보세요.</p></div><div className="models">{models.map(([name,badge,desc,req])=><article key={name} className={name==='AUTO'?'recommended':''}><div className="model-heading"><h3>{name}</h3><span>{badge}</span></div><p>{desc}</p><div className="requirement">{req}</div></article>)}</div><p className="note">모델은 Brefly 설정 → 음성인식 · AI에서 선택해요. 클라우드 모델 사용 시 텍스트가 선택한 제공자에게 전송되며, 무료 한도와 요금은 제공자 정책을 따라요.</p></section>
      <section className="section releases" id="releases"><div className="section-title"><span className="eyebrow">RELEASE NOTES</span><h2>조금씩, 더 편하게.</h2><a className="text-link" href={`${repo}/releases`}>전체 업데이트 보기 <ArrowUpRight size={16}/></a></div><div className="release-list">{releases.map((r, i) => <article className="release-card" key={r.tag}><div className="release-head"><h3>{r.version} {i === 0 && <span>최신</span>}</h3><time dateTime={isoDate(r.publishedAt)}>{dotDate(r.publishedAt)}</time></div><ul>{notesOf(r.body).map((n, j) => <li key={j}><Bold text={n}/></li>)}</ul><a className="text-link" href={r.url}>릴리스 원문 <ArrowUpRight size={15}/></a></article>)}<p className="meta">GitHub 릴리스에서 가져옵니다 · 사이트를 빌드할 때 갱신</p></div></section>
      <section className="download-section" id="download"><span className="logo large"><BrandMark size={40}/></span><h2>다음 문장은,<br/>말로 시작해 보세요.</h2><p>당신은 생각에 집중하세요. 정리는 Brefly가 할게요.</p><a className="button" href={download}><ArrowDown size={18}/> Mac용 무료 다운로드</a><p className="meta">macOS 13 이상 · DMG를 열고 Applications로 드래그하세요.</p></section>
    </main><footer><a className="brand" href="#main"><BrandMark size={26}/> Brefly</a><p>생각과 문장 사이, Brefly.</p><div className="footer-links"><a className="text-link" href={path('/guide/')}><BookOpen size={16}/> 사용 가이드</a><a className="text-link" href={sponsor}><Heart size={16}/> 후원하기 <ArrowUpRight size={14}/></a><a className="text-link" href={repo}><Code2 size={17}/> GitHub <ArrowUpRight size={14}/></a></div></footer>
  </>;
}
