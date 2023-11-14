import React, { ErrorInfo, ReactNode, Suspense } from 'react';

import { PageError } from 'widgets/page-error';

interface Props {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Suspense fallback={<div>loading...</div>}>
          <PageError />
        </Suspense>
      );
    }

    return children;
  }
}

export { ErrorBoundary };
