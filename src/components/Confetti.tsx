import confetti from 'canvas-confetti';

export function triggerZeverdConfetti() {
  const defaults = {
    disableForReducedMotion: true,
    colors: ['#F59E0B', '#FBBF24', '#D97706', '#10B981', '#34D399', '#FEF08A', '#FFFFFF'],
  };

  // 1. Initial burst from center-bottom
  confetti({
    ...defaults,
    particleCount: 60,
    spread: 70,
    origin: { y: 0.7, x: 0.5 },
    startVelocity: 45,
    scalar: 1,
  });

  // 2. Left canon burst (200ms delay)
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 45,
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.75 },
      startVelocity: 50,
      scalar: 0.9,
    });
  }, 180);

  // 3. Right canon burst (350ms delay)
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 45,
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.75 },
      startVelocity: 50,
      scalar: 0.9,
    });
  }, 320);

  // 4. Subtle gold glitter shower
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 30,
      spread: 100,
      origin: { y: 0.4, x: 0.5 },
      startVelocity: 25,
      gravity: 0.8,
      ticks: 200,
      scalar: 0.75,
    });
  }, 500);
}
