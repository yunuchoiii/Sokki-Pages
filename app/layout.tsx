import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  icons: { icon: process.env.GITHUB_PAGES === 'true' ? '/Sokki-Pages/favicon.svg' : '/favicon.svg' },
  title: 'Sokki — 말하면, 정리해서 바로 입력합니다',
  description: '단축키 하나로 받아쓰고 AI로 문장을 정리하는 무료 macOS 메뉴바 앱. Apple AI, Gemini, Claude 중 내게 맞는 모델을 선택하세요.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
