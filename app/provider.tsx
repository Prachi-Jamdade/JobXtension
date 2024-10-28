import { getSession } from "next-auth/react";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";
import Provider from "@/components/context/authSessionProvider";

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <>
      <Provider session={session}>
        <Toaster className="dark:hidden" />
        <Toaster theme="dark" className="hidden dark:block" />
        <ModalProvider>{children}</ModalProvider>
      </Provider>
    </>
  );
}
