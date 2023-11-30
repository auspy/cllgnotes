import confetti from "canvas-confetti";

export const confettiEffect = (target: HTMLButtonElement) => {
  const buttonRect = target.getBoundingClientRect();
  const x = (buttonRect.left + buttonRect.width / 2) / window.innerWidth;
  const y = (buttonRect.top + buttonRect.height / 2) / window.innerHeight;
  confetti({
    origin: { x, y },
    particleCount: 100,
    scale: 3,
    spread: 60,
  });
};
