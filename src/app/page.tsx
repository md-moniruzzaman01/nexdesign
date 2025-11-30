import AnimatedScrollSection from "@/common/components/Helo";
import Image from "next/image";

export default function Home() {
  return (
 <>
      <div className="other-content">
        Scroll Down to see the animation
      </div>

      <AnimatedScrollSection />

      <div className="other-content" style={{ backgroundColor: '#222', color: '#fff' }}>
        Animation Complete. More content below.
      </div>
    </>
  );
}
