import { useEffect } from 'react';
import confetti from "canvas-confetti";

export function ConfettiSideCannons({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (trigger) {
      const end = Date.now() + 2 * 1000; 
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
        if (Date.now() > end) return;
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });
        requestAnimationFrame(frame);
      };
      frame();
    }
  }, [trigger]);

  return null; 
}