
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024
const DESKTOP_BREAKPOINT = 1280

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    if (mql.addEventListener) {
      mql.addEventListener("change", checkMobile)
    } else {
      // Fallback pour les anciens navigateurs
      window.addEventListener('resize', checkMobile)
    }
    
    // Vérification initiale
    checkMobile()
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkMobile)
      } else {
        window.removeEventListener('resize', checkMobile)
      }
    }
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkTablet = () => {
      setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT)
    }
    
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`)
    if (mql.addEventListener) {
      mql.addEventListener("change", checkTablet)
    } else {
      // Fallback pour les anciens navigateurs
      window.addEventListener('resize', checkTablet)
    }
    
    // Vérification initiale
    checkTablet()
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkTablet)
      } else {
        window.removeEventListener('resize', checkTablet)
      }
    }
  }, [])

  return !!isTablet
}

export function useIsDesktop() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  return !isMobile && !isTablet
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    const updateMatches = () => {
      setMatches(media.matches)
    }
    
    // Définition initiale
    updateMatches()
    
    // Ajout des écouteurs d'événements avec support pour les anciens navigateurs
    if (media.addEventListener) {
      media.addEventListener("change", updateMatches)
    } else {
      // Fallback pour Safari < 14 et les anciens navigateurs
      media.addListener(updateMatches)
    }
    
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", updateMatches)
      } else {
        media.removeListener(updateMatches)
      }
    }
  }, [query])

  return matches
}
