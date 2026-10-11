import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"포포케어 | 반려동물 생활 관리",description:"반려동물의 식사, 비용, 준비물을 한 곳에서 관리하는 생활 도구"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
