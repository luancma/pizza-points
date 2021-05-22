import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../../styles/globals.css";
import { StyledContainer } from "../components/Container/styles";
import { Header } from "../components/Header";
import { ProjectContextProvider } from "../context/projectContext";
import { queryClient } from "../react-query/queryClient";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectContextProvider>
        <Header />
        <StyledContainer>
          <Component {...pageProps} />
        </StyledContainer>
      </ProjectContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
