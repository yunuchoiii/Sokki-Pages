import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL } from '../lib/site';

const base = process.env.GITHUB_PAGES === 'true' ? '/Sokki-Pages' : '';
const title = 'Sokki — 맥 음성 받아쓰기 · AI 정리 앱';
const description =
  '단축키를 누르고 말하면 Apple 음성 인식이 받아 적고 AI가 문장을 정리해 커서 위치에 붙여 넣는 무료 macOS 메뉴바 앱. Apple AI, Gemini, Claude 중 골라 쓰세요.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: ['맥 음성 받아쓰기', 'macOS 음성 인식 앱', '음성 메모 정리', '받아쓰기 앱', '음성 입력 맥', 'speech to text mac', 'dictation mac', 'Sokki'],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: 'Sokki',
    title,
    description,
    images: [{ url: `${SITE_URL}og.png`, width: 1200, height: 630, alt: 'Sokki — 말하면, 정리해서 바로 입력합니다' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}og.png`] },
  robots: { index: true, follow: true },
  icons: { icon: `${base}/favicon.svg`, apple: `${base}/apple-touch-icon.png` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
