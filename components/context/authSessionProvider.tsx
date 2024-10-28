"use client";
import { SessionProvider } from "next-auth/react";

//TODO
interface Session {
  user: {
    name: string;
    email: string;
    image: string;
    // Other properties specific to Session
  };
  expires: string;
}

interface Props {
  children: React.ReactNode;
  session: Session;
}
type ProviderType = (props: Props) => JSX.Element;
// const Provider: React.FC<Props> = ({ children, session }) => {
//   return <SessionProvider session={session}>{children}</SessionProvider>
// }
// export default Provider

export default function Provider({ children, session }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
