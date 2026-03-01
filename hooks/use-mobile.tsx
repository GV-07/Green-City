import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // This runs only on the client, after hydration.
    // It sets the initial state correctly.
    setIsMobile(mql.matches)

    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mql.addEventListener("change", onChange)

    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  // On the server, this hook always returns `false`.
  // On the client, it returns `false` on the first render, and then the correct
  // value after the component mounts. This consistency prevents hydration errors.
  return isMobile
}
