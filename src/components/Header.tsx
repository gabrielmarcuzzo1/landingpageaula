import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Brand } from './ui'

const links = [
  ['Soluções', '#solucoes'],
  ['Como funciona', '#como-funciona'],
  ['Resultados', '#resultados'],
  ['Dúvidas', '#duvidas'],
]
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 901px)')
    const handleResize = () => {
      if (desktop.matches) setOpen(false)
    }
    document.addEventListener('keydown', close)
    desktop.addEventListener('change', handleResize)
    return () => {
      document.removeEventListener('keydown', close)
      desktop.removeEventListener('change', handleResize)
    }
  }, [])
  return (
    <header className={`site-header ${scrolled || open ? 'header-solid' : ''}`}>
      <div className="header-inner container">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="header-cta"
          href="#diagnostico"
          onClick={() => setOpen(false)}
        >
          Vamos conversar
          <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        className={`mobile-nav ${open ? 'is-open' : ''}`}
        aria-label="Navegação mobile"
        inert={!open}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRight size={17} />
          </a>
        ))}
      </nav>
    </header>
  )
}
