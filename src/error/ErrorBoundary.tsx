import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@mui/material";
import logo from "../assets/newLogo.svg";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

const handleNavigateHome = () => {
  window.location.replace(window.location.origin);
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className="flex w-full justify-center items-center h-screen">
          <div
            className="flex flex-col gap-y-6 items-center px-8 py-6 rounded-lg bg-white"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 14px 4px",
            }}
          >
            <div className="flex flex-col items-center gap-y-4">
              <div className="p-1 rounded-full border-2 border-primaryColor">
                <img alt="purpl-icon" className="w-18 h-18" src={logo} />
              </div>
              <p className="text-[22px] font-semibold text-center leading-8">
                We are sorry for the inconvenience caused,
                <br /> Please try later
              </p>
            </div>
            <Button variant="outlined" onClick={handleNavigateHome}>
              Return to home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
