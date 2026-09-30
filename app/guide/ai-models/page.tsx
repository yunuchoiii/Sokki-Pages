export const dynamic = 'force-static';
import type { Metadata } from 'next';
import { GuideArticle, guideMetadata } from '../article';

const SLUG = 'ai-models';
export const metadata: Metadata = guideMetadata(SLUG);

export default function Page() {
  return <GuideArticle slug={SLUG}>
    <p className="guide-lead">
      Brefly 는 받아 적은 말을 정리할 때 AI 를 씁니다. 어느 회사 모델을 쓸지 고를 수 있고,{' '}
      <strong>기본값은 돈이 들지 않습니다</strong>. 무엇을 고르면 되는지, 요금이 나간다면 얼마나 나가는지 정리했습니다.
    </p>

    <h2>1. 먼저, 돈이 드나요?</h2>
    <p>
      기본 설정으로는 <strong>들지 않습니다.</strong> Google 의 Gemini 는 무료 키를 발급받아 쓸 수 있고,
      카드 등록도 필요 없습니다. 받아쓰기 정리는 물론 회의록 요약까지 이 무료 키로 됩니다.
    </p>
    <p>
      맥이 macOS 26 이상이고 Apple Intelligence 가 켜져 있다면 <strong>Apple AI</strong> 도 쓸 수 있습니다.
      이쪽은 인터넷조차 쓰지 않고 이 맥 안에서 처리합니다. 역시 무료입니다.
    </p>
    <div className="guide-callout">
      <p>
        <strong>ChatGPT·Claude 구독을 쓰고 계셔도 API 요금은 따로 나갑니다.</strong> 가장 많이 하는 오해입니다.
        월 구독료(Plus 등)와 API 는 같은 회사의 다른 상품이라 지갑이 따로입니다.
        구독 중이어도 API 크레딧은 0원에서 시작하고, 키를 만들어 쓰면 쓴 만큼 별도로 청구됩니다.
      </p>
    </div>

    <h2>2. 받아쓰기와 회의록은 따로 고릅니다</h2>
    <p>
      두 가지는 필요한 것이 다릅니다. <strong>받아쓰기</strong>는 말을 마치고 1~5초 안에 커서 자리에 들어가야 해서
      속도가 먼저입니다. <strong>회의록</strong>은 이미 받아 적는 데 몇 분을 쓴 뒤라, 10초쯤 더 걸려도
      잘 정리하는 쪽이 낫습니다.
    </p>
    <p>
      그래서 설정 → 음성인식 · AI 에서 <strong>받아쓰기 정리</strong>와 <strong>회의록 요약</strong>을 각각 고릅니다.
      목록에는 회사 이름과 함께 <strong>빠름 / 정확</strong>이 붙어 있습니다. 모델 이름을 몰라도 고를 수 있습니다.
    </p>

    <h2>3. AUTO 가 하는 일</h2>
    <p>둘 다 기본값은 AUTO 이고, 하는 일은 목적에 따라 다릅니다.</p>
    <ul>
      <li>
        <strong>받아쓰기</strong> — 이 맥의 Apple AI 와 Gemini 를 동시에 부르고, 먼저 오거나 더 나은 쪽을 씁니다.
        둘 중 하나만 쓸 수 있으면 그것만 씁니다.
      </li>
      <li>
        <strong>회의록</strong> — 넣어 둔 키 중에서 <strong>Gemini → ChatGPT → Claude</strong> 순으로 시도합니다.
        무료인 쪽을 먼저 쓰고, 그쪽이 실패할 때만 다음으로 넘어갑니다.
      </li>
    </ul>
    <p>
      회의록에는 Apple AI 를 쓰지 않습니다. 이 맥에서 도는 모델은 작아서, 긴 글에서 결정된 내용을
      거꾸로 적는 일이 있었습니다.
    </p>

    <h2>4. 얼마나 쓰이나 — 실제로 재 봤습니다</h2>
    <p>
      48분짜리 회의 녹음(받아 적은 글 16,450자)을 각 모델로 요약시켜 본 값입니다.{' '}
      <strong>2026년 9월 30일 측정</strong>이고, 단가가 아니라 <strong>쓰인 토큰 수</strong>입니다.
    </p>
    <div className="guide-table">
      <table>
        <thead><tr><th>모델</th><th>걸린 시간</th><th>입력</th><th>출력</th></tr></thead>
        <tbody>
          <tr><td>Gemini</td><td>3초 안팎</td><td colSpan={2}>무료 한도 안에서 0원</td></tr>
          <tr><td>ChatGPT (정확)</td><td>31.6초</td><td>11,149</td><td>3,365</td></tr>
          <tr><td>Claude (정확)</td><td>22.7초</td><td>19,034</td><td>7,739</td></tr>
          <tr><td>Claude (빠름)</td><td>9.3초</td><td>19,024</td><td>886</td></tr>
        </tbody>
      </table>
    </div>
    <p>
      같은 글인데 <strong>Claude 쪽 입력이 1.7배</strong>로 잡힙니다. 한국어를 토큰으로 쪼개는 방식이
      회사마다 달라서입니다. 출력에는 모델이 &ldquo;생각하는 데&rdquo; 쓴 토큰도 포함되고, 그것도 요금에 들어갑니다.
    </p>
    <p>
      <strong>받아쓰기 한 번</strong>은 문장 하나라서 회의록의 1/20 수준입니다. 하루에 수십 번 써도
      회의록 몇 건 값이 안 됩니다. 비용을 아끼고 싶다면 <strong>회의록만</strong> 유료 모델로 두고
      받아쓰기는 Gemini 나 Apple AI 에 두면 됩니다.
    </p>
    <p>
      단가는 자주 바뀌므로 여기 적지 않았습니다. 곱할 숫자는 각 회사 요금 페이지에서 확인하세요 —
      <a href="https://openai.com/api/pricing/" target="_blank" rel="noopener">OpenAI 요금</a>,{' '}
      <a href="https://www.anthropic.com/pricing" target="_blank" rel="noopener">Anthropic 요금</a>.
    </p>

    <h2>5. 키가 쓸 수 있는 상태인지 확인하기</h2>
    <p>
      설정 → 음성인식 · AI → API 키 에서 키마다 <strong>확인</strong>을 누르면 실제로 한 번 불러 봅니다.
      결과는 세 가지 중 하나입니다.
    </p>
    <ul>
      <li><strong>쓸 수 있습니다</strong> — 바로 쓰시면 됩니다.</li>
      <li><strong>크레딧이 없습니다</strong> — 키는 맞지만 잔액이 0원입니다. 옆의 <strong>크레딧 충전</strong>으로 가시면 됩니다.</li>
      <li><strong>키가 올바르지 않습니다</strong> — 복사가 잘렸거나 지워진 키입니다. 다시 발급받으세요.</li>
    </ul>
    <p>
      확인에 드는 비용은 없습니다. 잔액이 없으면 요금이 매겨지기 전에 거부되고, 있어도 한두 낱말 값입니다.
    </p>

    <h2>6. 회의가 긴데 ChatGPT 가 실패한다면</h2>
    <p>
      OpenAI 는 계정마다 <strong>1분에 처리할 수 있는 양</strong>에 상한을 둡니다. 새로 만든 계정은 이 상한이
      낮아서, 긴 회의 원문이 한 번에 들어가지 못하고 튕길 수 있습니다.
    </p>
    <p>
      Gemini 와 Claude 는 이 상한이 넉넉해서 잘 걸리지 않습니다. OpenAI 를 계속 쓰다 보면 등급이 올라가며
      저절로 풀리고, 그때까지는 회의록만 Gemini 나 Claude 로 두시면 됩니다.
    </p>

    <h2>7. 정리</h2>
    <ul>
      <li><strong>그냥 쓰고 싶다</strong> — 아무것도 안 바꿔도 됩니다. Gemini 무료 키만 넣으면 회의록까지 됩니다.</li>
      <li><strong>인터넷에 아무것도 안 보내고 싶다</strong> — 받아쓰기를 Apple AI 로. 단, 회의록은 클라우드가 필요합니다.</li>
      <li><strong>회의록을 더 잘 뽑고 싶다</strong> — 회의록 요약만 ChatGPT 나 Claude 의 &lsquo;정확&rsquo;으로.</li>
    </ul>
  </GuideArticle>;
}
