import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  ChartNoAxesCombined,
  Check,
  CircleCheck,
  CircleMinus,
  Crosshair,
  Layers3,
  Mail,
  MoveUpRight,
  Plus,
  Quote,
  ScanLine,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import ContactForm from './components/ContactForm'
import {
  Badge,
  Brand,
  PrimaryButton,
  Reveal,
  SectionHeading,
} from './components/ui'

const pains = [
  'Paga por cliques e recebe contatos que nunca respondem.',
  'Recebe relatório bonito, mas não sabe quanto virou venda.',
  'O comercial reclama que os leads são ruins.',
  'Todo mês é uma surpresa, ninguém sabe quanto vai entrar.',
]
const process = [
  {
    title: 'Diagnóstico.',
    text: 'Entendemos seu negócio, seu cliente e suas metas.',
    Icon: ScanLine,
  },
  {
    title: 'Plano sob medida.',
    text: 'Montamos a estratégia e o investimento ideal para o seu momento.',
    Icon: SlidersHorizontal,
  },
  {
    title: 'Execução.',
    text: 'Colocamos as campanhas no ar e acompanhamos de perto.',
    Icon: Layers3,
  },
  {
    title: 'Otimização.',
    text: 'Reunião mensal, relatório simples e ajustes para escalar o que funciona.',
    Icon: ChartNoAxesCombined,
  },
]
const testimonials = [
  {
    quote:
      'Antes eu recebia relatório com gráfico. Hoje recebo reunião marcada na agenda do meu time.',
    name: 'Mariana Alves',
    role: 'Diretora Comercial',
    initials: 'MA',
  },
  {
    quote: 'Em três meses, nosso custo por lead caiu quase pela metade.',
    name: 'Rafael Moura',
    role: 'Sócio-fundador',
    initials: 'RM',
  },
  {
    quote: 'Transparência total. Sei exatamente onde cada real foi investido.',
    name: 'Cláudia Nogueira',
    role: 'CEO',
    initials: 'CN',
  },
]
const faqs = [
  {
    q: 'Em quanto tempo vejo resultado?',
    a: 'As primeiras oportunidades costumam aparecer entre a 2ª e a 4ª semana. A escala vem a partir do terceiro mês.',
  },
  {
    q: 'Quanto preciso investir em anúncios?',
    a: 'Depende do seu mercado e da sua meta. Definimos o valor ideal no diagnóstico.',
  },
  {
    q: 'Tem contrato de fidelidade?',
    a: 'O contrato inicial é de 3 meses. Depois disso, a renovação é mensal.',
  },
  {
    q: 'Como acompanho o trabalho?',
    a: 'Você recebe um painel online e uma reunião mensal para ver os números e os próximos passos.',
  },
]
function FAQ() {
  const [active, setActive] = useState<number | null>(0)
  return (
    <div className="faq-list">
      {faqs.map(({ q, a }, index) => (
        <div
          className={`faq-item ${active === index ? 'is-active' : ''}`}
          key={q}
        >
          <h3>
            <button
              id={`faq-trigger-${index}`}
              onClick={() => setActive(active === index ? null : index)}
              aria-expanded={active === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="faq-index">0{index + 1}</span>
              <span>{q}</span>
              <Plus size={18} />
            </button>
          </h3>
          <div
            className="faq-answer"
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            inert={active !== index}
          >
            <div>
              <p>{a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
function ServiceArt({ type }: { type: 'traffic' | 'content' | 'funnel' }) {
  if (type === 'traffic')
    return (
      <div className="service-art traffic-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="ad-platform">
          <span className="platform-symbol google-symbol">G</span>
          <span>Google Ads</span>
          <ArrowUpRight size={14} />
        </div>
        <div className="ad-platform">
          <span className="platform-symbol meta-symbol">∞</span>
          <span>Meta Ads</span>
          <ArrowUpRight size={14} />
        </div>
        <div className="mini-chart">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <MoveUpRight size={20} />
        </div>
      </div>
    )
  if (type === 'content')
    return (
      <div className="service-art content-art" aria-hidden="true">
        <div className="art-grid" />
        <div className="content-sheet sheet-back">
          <span />
          <span />
          <span />
        </div>
        <div className="content-sheet sheet-front">
          <div className="sheet-brand">
            V3<span>CONTEÚDO & AUTORIDADE</span>
          </div>
          <div className="abstract-flower">
            <svg viewBox="0 0 100 100">
              <defs>
                <linearGradient id="petal-metal" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#e9e9e9" />
                  <stop offset=".45" stopColor="#8d8d8d" />
                  <stop offset=".7" stopColor="#333" />
                  <stop offset="1" stopColor="#b5b5b5" />
                </linearGradient>
              </defs>
              {Array.from({ length: 8 }, (_, i) => (
                <path
                  key={i}
                  d="M48 48C29 38 19 14 31 9C43 4 49 29 48 48Z"
                  fill="url(#petal-metal)"
                  transform={`rotate(${i * 45} 50 50)`}
                />
              ))}
              <circle cx="50" cy="50" r="7" fill="#555" />
            </svg>
          </div>
          <span className="sheet-line" />
          <span className="sheet-line short" />
        </div>
        <div className="content-audio">
          <AudioLines size={20} />
          <span>Uma marca. Uma voz.</span>
        </div>
      </div>
    )
  return (
    <div className="service-art funnel-art" aria-hidden="true">
      <div className="art-grid" />
      <div className="flow-node">
        <span className="node-icon">
          <Layers3 size={15} />
        </span>
        Lead qualificado
        <span className="node-status" />
      </div>
      <div className="flow-connector">
        <span />
        <span />
      </div>
      <div className="flow-split">
        <div>
          <Mail size={15} />
          Nutrição
        </div>
        <div>
          <Workflow size={15} />
          Automação
        </div>
      </div>
      <div className="flow-connector" />
      <div className="flow-node final-node">
        <CircleCheck size={15} />
        Reunião marcada
        <Check size={13} />
      </div>
    </div>
  )
}
export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <section
          className="proof-section container"
          id="empresas"
          aria-labelledby="proof-title"
        >
          <Reveal>
            <p id="proof-title" className="proof-label">
              Empresas que já crescem com a gente
            </p>
            <div className="proof-grid">
              <div>
                <strong>
                  +120
                  <span>
                    <ArrowUpRight size={19} />
                  </span>
                </strong>
                <p>empresas atendidas desde 2018</p>
              </div>
              <div>
                <strong>
                  R$ 38<span className="metric-unit">milhões</span>
                </strong>
                <p>em vendas geradas para clientes</p>
              </div>
              <div>
                <strong>
                  4,9<span className="metric-unit">de 5</span>
                </strong>
                <p>
                  na avaliação dos clientes{' '}
                  <span className="rating-stars" aria-hidden="true">
                    ★★★★★
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
        </section>
        <section
          className="section pain-section container"
          aria-labelledby="pain-title"
        >
          <div className="pain-intro">
            <Reveal>
              <Badge>O problema</Badge>
              <h2 id="pain-title">
                Você investe em marketing,
                <br />{' '}
                <span className="text-muted">mas os leads não vendem?</span>
              </h2>
              <p>
                Isso é mais comum do que parece.
                <br /> Veja se você se identifica:
              </p>
            </Reveal>
            <Reveal delay={0.1} className="signal-graphic">
              <div className="signal-orbit" />
              <div className="signal-dot" />
              <div className="signal-core">
                <AudioLines size={31} strokeWidth={1} />
              </div>
              <span>SINAL OU RUÍDO?</span>
            </Reveal>
          </div>
          <div className="pain-content">
            <div className="pain-list">
              {pains.map((pain, i) => (
                <Reveal delay={i * 0.08} key={pain}>
                  <div className="pain-item">
                    <CircleMinus size={17} strokeWidth={1.2} />
                    <p>{pain}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="pain-statement">
              <span>Marketing que não vira reunião é só custo.</span>
              <strong>
                A gente muda isso.
                <ArrowUpRight size={23} />
              </strong>
            </Reveal>
          </div>
        </section>
        <section
          className="section strategy-section"
          aria-labelledby="strategy-title"
        >
          <div className="container">
            <SectionHeading
              badge="A nossa estratégia"
              title={
                <>
                  Marketing feito com
                  <br /> <span className="text-gradient">cabeça de vendas</span>
                </>
              }
            >
              Aqui o ponto de partida é a sua meta de faturamento, não o número
              de cliques. A gente descobre quem é o seu cliente ideal, cria
              campanhas para atrair esse perfil e acompanha cada lead até a
              reunião.
            </SectionHeading>
            <div className="strategy-layout">
              <Reveal className="strategy-visual">
                <div className="visual-topline">
                  <span>
                    <span className="tiny-light" /> ECOSSISTEMA V3
                  </span>
                  <ScanLine size={15} />
                </div>
                <div className="system-orbits">
                  <div className="system-ring ring-a" />
                  <div className="system-ring ring-b" />
                  <div className="system-ring ring-c" />
                  <div className="system-center">V3</div>
                  <span className="system-node node-a">
                    <Crosshair size={19} />
                  </span>
                  <span className="system-node node-b">
                    <Workflow size={19} />
                  </span>
                  <span className="system-node node-c">
                    <ChartNoAxesCombined size={19} />
                  </span>
                </div>
                <div className="visual-bottomline">
                  <span>Estratégia conectada.</span>
                  <span>
                    Do primeiro clique à reunião.
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </Reveal>
              <div className="strategy-steps">
                {[
                  [
                    '01',
                    'Atrair',
                    'campanhas que falam com quem decide a compra.',
                    Crosshair,
                  ],
                  [
                    '02',
                    'Qualificar',
                    'afastamos curiosos e aproximamos quem está pronto.',
                    ScanLine,
                  ],
                  [
                    '03',
                    'Converter',
                    'processo afinado para transformar lead em reunião.',
                    ChartNoAxesCombined,
                  ],
                ].map(([n, title, text, Icon], i) => {
                  const I = Icon as typeof Crosshair
                  return (
                    <Reveal delay={i * 0.1} key={String(n)}>
                      <div className="strategy-step">
                        <span className="icon-box">
                          <I size={20} strokeWidth={1.4} />
                        </span>
                        <div>
                          <h3>
                            {String(title)}
                            <span>{String(n)}</span>
                          </h3>
                          <p>{String(text)}</p>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="section container services-section" id="solucoes">
          <SectionHeading
            badge="Soluções integradas"
            title={
              <>
                O que fazemos
                <br className="mobile-break" /> pela sua empresa
              </>
            }
          />
          <div className="services-grid">
            {[
              {
                type: 'traffic',
                title: 'Tráfego pago',
                text: 'Anúncios no Google e no Meta focados em lead qualificado, otimizados toda semana.',
                tag: '01 / PERFORMANCE',
              },
              {
                type: 'content',
                title: 'Conteúdo e autoridade',
                text: 'Posts, vídeos e materiais que colocam sua empresa como referência no mercado.',
                tag: '02 / POSICIONAMENTO',
              },
              {
                type: 'funnel',
                title: 'Funil e automação',
                text: 'Páginas, e-mails e fluxos que esquentam o lead antes de ele falar com o seu time.',
                tag: '03 / CONVERSÃO',
              },
            ].map((service, i) => (
              <Reveal delay={i * 0.1} key={service.type}>
                <article className="premium-card service-card">
                  <ServiceArt
                    type={service.type as 'traffic' | 'content' | 'funnel'}
                  />
                  <div className="service-copy">
                    <span className="eyebrow">{service.tag}</span>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        <section
          className="section process-section container"
          id="como-funciona"
        >
          <SectionHeading
            badge="Da estratégia à execução"
            title="Como funciona"
          />
          <div className="process-grid">
            {process.map(({ title, text, Icon }, i) => (
              <Reveal delay={i * 0.1} key={title}>
                <article className="process-card">
                  <div className="step-topline">
                    <span>0{i + 1}</span>
                    {i < 3 ? <ArrowRight size={16} /> : <Check size={16} />}
                  </div>
                  <div className="process-icon">
                    <Icon size={25} strokeWidth={1.1} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="center-action">
            <PrimaryButton>Começar pelo diagnóstico gratuito</PrimaryButton>
          </Reveal>
        </section>
        <section className="section results-section" id="resultados">
          <div className="container">
            <div className="results-heading">
              <SectionHeading
                badge="Performance na prática"
                title={
                  <>
                    Resultados que
                    <br />{' '}
                    <span className="text-gradient">aparecem no caixa</span>
                  </>
                }
                align="left"
              />
              <Reveal>
                <span className="results-aside">
                  <span className="tiny-light" /> Cada negócio, uma estratégia.
                  <br /> Cada resultado, uma história.
                </span>
              </Reveal>
            </div>
            <div className="results-grid">
              <Reveal>
                <article className="result-card premium-card">
                  <div className="result-top">
                    <span>Indústria de embalagens</span>
                    <ArrowUpRight size={17} />
                  </div>
                  <div className="result-stat">
                    <span className="old-stat">8</span>
                    <ArrowRight size={28} strokeWidth={1} />
                    <strong>31</strong>
                  </div>
                  <p>de 8 para 31 reuniões por mês em 5 meses.</p>
                  <div className="result-chart bars-chart" aria-hidden="true">
                    {[23, 31, 28, 40, 48, 42, 57, 67, 65, 80, 92, 100].map(
                      (v, i) => (
                        <span key={i} style={{ height: `${v}%` }} />
                      ),
                    )}
                  </div>
                  <span className="chart-caption">DE 8 PARA 31 REUNIÕES</span>
                </article>
              </Reveal>
              <Reveal delay={0.1}>
                <article className="result-card premium-card">
                  <div className="result-top">
                    <span>Software de gestão</span>
                    <ArrowUpRight size={17} />
                  </div>
                  <div className="result-stat">
                    <strong>
                      −47<span>%</span>
                    </strong>
                  </div>
                  <p>custo por lead qualificado 47% menor em 90 dias.</p>
                  <div className="result-chart line-chart" aria-hidden="true">
                    <svg viewBox="0 0 300 100">
                      <defs>
                        <linearGradient
                          id="chart-fill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop stopColor="#fff" stopOpacity=".12" />
                          <stop offset="1" stopColor="#fff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 12L35 20L65 13L94 39L125 32L155 53L182 48L212 71L242 64L270 85L300 83V100H0Z"
                        fill="url(#chart-fill)"
                      />
                      <path
                        d="M0 12L35 20L65 13L94 39L125 32L155 53L182 48L212 71L242 64L270 85L300 83"
                        stroke="#c1c1c1"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <circle cx="298" cy="83" r="3" fill="white" />
                    </svg>
                  </div>
                  <span className="chart-caption">
                    MENOS CUSTO. MAIS QUALIFICAÇÃO.
                  </span>
                </article>
              </Reveal>
              <Reveal delay={0.2}>
                <article className="result-card premium-card">
                  <div className="result-top">
                    <span>Consultoria financeira</span>
                    <ArrowUpRight size={17} />
                  </div>
                  <div className="result-stat">
                    <strong>
                      2,3<span>×</span>
                    </strong>
                  </div>
                  <p>faturamento 2,3x maior em 8 meses.</p>
                  <div className="result-chart growth-chart" aria-hidden="true">
                    <div className="growth-bar previous" />
                    <div className="growth-bar current">
                      <ArrowUpRight size={24} strokeWidth={1} />
                    </div>
                    <span className="growth-line" />
                  </div>
                  <span className="chart-caption">
                    CRESCIMENTO EM FATURAMENTO
                  </span>
                </article>
              </Reveal>
            </div>
            <p className="results-disclaimer">
              Os resultados variam de acordo com o mercado, a oferta e o
              investimento.
            </p>
          </div>
        </section>
        <section className="section testimonials-section container">
          <SectionHeading
            badge="Relações que geram resultados"
            title="O que nossos clientes dizem"
          />
          <div className="testimonials-grid">
            {testimonials.map((testimonial, i) => (
              <Reveal delay={i * 0.1} key={testimonial.name}>
                <figure className="testimonial">
                  <div className="quote-top">
                    <Quote size={25} strokeWidth={1} />
                    <span>CLIENTE V3</span>
                  </div>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <figcaption>
                    <span className="avatar" aria-hidden="true">
                      {testimonial.initials}
                    </span>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="section difference-section container">
          <SectionHeading
            badge="O jeito V3 de trabalhar"
            title="Por que a Agência V3"
          />
          <div className="difference-grid">
            {[
              ['Meta de vendas, não de cliques.', ChartNoAxesCombined],
              ['Relatórios em linguagem simples.', Layers3],
              ['Sem fidelidade abusiva.', ShieldCheck],
              ['Time sênior no seu projeto.', Sparkles],
            ].map(([text, Icon], i) => {
              const I = Icon as typeof Check
              return (
                <Reveal key={String(text)} delay={i * 0.08}>
                  <div className="difference-item">
                    <I size={23} strokeWidth={1.25} />
                    <h3>{String(text)}</h3>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>
        <section className="section audience-section container">
          <div className="audience-grid">
            <Reveal>
              <article className="audience-card audience-yes">
                <div className="audience-label">
                  <span className="icon-box">
                    <Check size={21} />
                  </span>
                  <span>ALINHAMENTO</span>
                </div>
                <h2>Para quem é</h2>
                <ul>
                  {[
                    'Empresas que vendem para outras empresas (B2B).',
                    'Quem já tem um time ou processo comercial, mesmo enxuto.',
                    'Quem quer crescer com previsibilidade.',
                  ].map((text) => (
                    <li key={text}>
                      <CircleCheck size={16} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="audience-card audience-no">
                <div className="audience-label">
                  <span className="icon-box">
                    <X size={21} />
                  </span>
                  <span>EXPECTATIVAS CLARAS</span>
                </div>
                <h3>Para quem não é</h3>
                <ul>
                  {[
                    'Quem quer resultado garantido em poucos dias.',
                    'Quem não pretende investir em anúncios.',
                  ].map((text) => (
                    <li key={text}>
                      <CircleMinus size={16} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </section>
        <section className="section faq-section container" id="duvidas">
          <SectionHeading
            badge="Sem letras miúdas"
            title={
              <>
                Perguntas
                <br /> frequentes
              </>
            }
            align="left"
          />
          <Reveal>
            <FAQ />
          </Reveal>
        </section>
        <section className="section contact-section" id="diagnostico">
          <div className="contact-light" aria-hidden="true" />
          <div className="container contact-layout">
            <Reveal className="contact-copy">
              <Badge>Seu crescimento começa aqui</Badge>
              <h2>
                Vamos transformar marketing em
                <br />{' '}
                <span className="text-gradient">reuniões de vendas?</span>
              </h2>
              <p>
                Agende um diagnóstico gratuito de 30 minutos. Vamos olhar o seu
                cenário e mostrar onde estão as maiores oportunidades. Mesmo que
                a gente não trabalhe junto, você sai com um plano de ação.
              </p>
              <div className="contact-signature">
                <div className="signature-mark">V3</div>
                <div>
                  <span>30 minutos.</span>
                  <span>Um novo olhar para o seu negócio.</span>
                </div>
                <ArrowDown size={20} strokeWidth={1} />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="footer container">
        <div className="footer-main">
          <Brand footer />
          <div className="footer-contact">
            <a href="mailto:contato@agenciav3.com.br">
              contato@agenciav3.com.br
              <ArrowUpRight size={14} />
            </a>
            <span>(00) 00000-0000</span>
          </div>
          <a href="#inicio" className="back-top">
            Voltar ao topo
            <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Agência V3. Todos os direitos reservados.</span>
          <span>Estratégia. Performance. Crescimento.</span>
        </div>
      </footer>
    </>
  )
}
