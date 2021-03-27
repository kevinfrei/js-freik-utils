import { Waiter } from '.';

export function Sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Only allow 1 rescan at a time
// Single thread execution makes this *super* easy :D
export function MakeSingleWaiter(timeout?: number): Waiter {
  let busy = false;
  let someoneWaiting = false;
  const timer = timeout ? timeout : 100;
  async function wait(): Promise<boolean> {
    // Hurray for simple non-atomic synchronization :)
    if (busy) {
      if (someoneWaiting) {
        return false;
      }
      someoneWaiting = true;
      while (busy) {
        await Sleep(timer);
      }
    }
    busy = true;
    someoneWaiting = false;
    return true;
  }
  function leave() {
    busy = false;
  }
  return { wait, leave };
}
