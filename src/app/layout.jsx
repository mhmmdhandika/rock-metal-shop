import NextAuthProvider from "@/components/NextAuthProvider";
import "@/style/globals.css";
import localFont from "next/font/local";
import ReduxClientProvider from "@/components/ReduxClientProvider";
import FirstUserRequest from "@/components/FirstUserRequest";

const snorkad = localFont({
  src: "../../public/assets/fonts/snorkad/snorkad-regular.otf",
  display: "fallback",
  fallback: ["system-ui", "arial"],
});

export const metadata = {
  title: "Thunderstone Emporium ",
  description: "Fill your wishlist with Thunderstone Emporium",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={snorkad.className} suppressHydrationWarning={true}>
        <NextAuthProvider>
          <ReduxClientProvider>
            <FirstUserRequest>{children}</FirstUserRequest>
          </ReduxClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
