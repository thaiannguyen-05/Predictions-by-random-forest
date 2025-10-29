import Header from "../../../components/layout/Header"; // frontend/src/app/(auth)/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
