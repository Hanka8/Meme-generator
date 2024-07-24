import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./routes/index.lazy";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Landing />
    </QueryClientProvider>
  );
};

export default App;
