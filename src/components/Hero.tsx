import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { Badge, PrimaryButton } from './ui'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 12])
  return (
    <section
      className="hero"
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
    >
      <motion.div
        className="hero-landscape"
        style={{ y: reduced ? 0 : y }}
        aria-hidden="true"
      >
        <img src="./metal-landscape.svg" alt="" fetchPriority="high" />
        <div className="landscape-vignette" />
      </motion.div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-content container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge>Estratégia. Performance. Crescimento.</Badge>
        </motion.div>
        <motion.h1
          id="hero-title"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12 }}
        >
          Pare de gerar curiosos.
          <br /> <span>Comece a gerar vendas</span>
          <br /> para o seu negócio.
        </motion.h1>
        <motion.p
          className="hero-description"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
        >
          A Agência V3 cuida do seu tráfego pago, do seu conteúdo e do seu funil
          para a sua empresa receber clientes qualificados todo mês.
        </motion.p>
        <motion.div
          className="hero-action"
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <PrimaryButton>Quero meu diagnóstico gratuito</PrimaryButton>
          <span>30 minutos, sem compromisso.</span>
        </motion.div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="light-beam" />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <motion.div
          className="metal-emblem"
          style={{ rotate: reduced ? -8 : rotate }}
        >
          <span>
            V<span>3</span>
          </span>
        </motion.div>
        <div className="emblem-caption">
          <span className="tiny-light" /> MARKETING COM DIREÇÃO
        </div>
        <span className="art-coordinate coordinate-left">
          EST. 2018
          <br /> ESTRATÉGIA → EXECUÇÃO
        </span>
        <span className="art-coordinate coordinate-right">
          MENOS RUÍDO.
          <br /> MAIS RESULTADO. <ArrowUpRight size={12} />
        </span>
      </div>
      <a className="explore" href="#empresas">
        Explore o próximo nível
        <ArrowDown size={13} />
      </a>
    </section>
  )
}
