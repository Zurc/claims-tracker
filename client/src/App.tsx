import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import Home from "@/pages/home";
import ClaimForm from "@/pages/claims/claim-form";
import ClaimsList from "@/pages/claims/claims-list";
import ClaimDetail from "@/pages/claims/claim-detail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/submit-claim" component={ClaimForm} />
        <Route path="/claims" component={ClaimsList} />
        <Route path="/claims/:id" component={ClaimDetail} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
