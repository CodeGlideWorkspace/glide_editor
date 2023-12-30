import { useRef, createContext } from 'react'
import { Scheduler } from 'remote:glide_components/utils'

export function useScheduler() {
  const scheduler = useRef(null)

  if (!scheduler.current) {
    scheduler.current = new Scheduler()
  }

  return scheduler.current
}

export const SchedulerContext = createContext(null)
