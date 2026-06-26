import './globals.css';

export const metadata = {
  title: '신일팩',
  description: '정직한 기술과 책임 있는 생산으로 고객사의 브랜드와 품질을 높이는 포장 파트너'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
