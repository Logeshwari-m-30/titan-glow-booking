import { ReactNode, useEffect, useState } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.98]"
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
