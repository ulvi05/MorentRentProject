import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import queryClient from "./config/queryClient";
import { router } from "./routes";
import { store } from "./store";

import "./styles/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  </Provider>
);
