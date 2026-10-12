import { Component, StrictMode, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Application render error", error, info.componentStack); }
  render() {
    if (this.state.hasError) return <main className="app-error-screen"><h1>오늘의 하루</h1><p>화면을 불러오는 중 문제가 발생했습니다.</p><button type="button" onClick={() => window.location.reload()}>다시 불러오기</button></main>;
    return this.props.children;
  }
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<StrictMode><AppErrorBoundary><App /></AppErrorBoundary></StrictMode>);
