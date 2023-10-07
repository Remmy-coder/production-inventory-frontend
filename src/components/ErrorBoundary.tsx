import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container
          component="main"
          sx={{
            width: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginTop: 25,
              marginBottom: 6,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "5px 5px 10px 1px #797474",
              borderRadius: "10px",
              bgcolor: "white",
              maxWidth: "sm",
              //background: '#fff url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810354.jpg?w=900&t=st=1687624611~exp=1687625211~hmac=64f0b1b9d143608303f1f7b32e9621e4c88f0cce3dce204280d6ccf99a6ec62c) center center/cover no-repeat',
            }}
          >
            <h1>Oops! Something went wrong.</h1>
            <p>
              We're sorry, an error occurred.{" "}
              <Button
                sx={{ backgroundColor: "slateblue" }}
                variant="contained"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Kindly Refresh
              </Button>
            </p>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
