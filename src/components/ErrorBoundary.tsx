import { Component, type ErrorInfo, type ReactNode } from "react";
import * as Sentry from "@sentry/react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="min-h-screen w-full bg-background grid place-items-center px-6">
        <div className="max-w-md text-center space-y-6">
          <p className="font-serif text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Paula La Rosa
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-primary">
            Algo saiu do lugar.
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Tivemos um problema inesperado ao renderizar esta tela. Ele já foi reportado.
            Você pode voltar para a home enquanto eu ajusto.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Voltar para a home
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
