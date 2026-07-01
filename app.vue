<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const drawerVisible = ref(false)
const scrolled = ref(false)

const menu = [
  { label: 'Problema', href: '#problema' },
  { label: 'Solução', href: '#solucao' },
  { label: 'Prefeituras', href: '#prefeituras' },
  { label: 'Conformidade', href: '#conformidade' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Planos', href: '#planos' }
]

const usuarios = [
  { tag: 'B2B / B2G', title: 'Painel da empresa ou prefeitura', text: 'Mapa GIS em tempo real. Áreas autorizadas de descarte publicadas como polígonos. Gestão de denúncias e relatórios MRV.', features: ['Mapa GIS em tempo real','Polígonos de áreas autorizadas','Gestão de denúncias','Relatórios MRV automáticos'] },
  { tag: 'App nativo', title: 'App do recolhedor', text: 'Rota do dia com navegação. Marcação de contêineres coletados. Modo offline para áreas sem sinal.', features: ['Rota otimizada','Marcação por contêiner','Modo offline','Resumo de fim de turno'] },
  { tag: 'App gratuita', title: 'App do cidadão', text: 'Consulta de horários. Programação de coleta especial. Denúncia de vertidos ilegais.', features: ['Horários por endereço','Programar coleta especial','Denúncia de vertidos','Pontos de descarte próximos'] }
]

const leis = [
  { id: '12.305', year: '2010', short: 'PNRS', title: 'Política Nacional de Resíduos Sólidos', desc: 'Obrigatoriedade de PMGIRS, encerramento de lixões e coleta seletiva.' },
  { id: '14.026', year: '2020', short: 'Marco', title: 'Novo Marco do Saneamento', desc: 'Diretrizes com metas até 2033 e prestação de contas estruturada.' },
  { id: '15.042', year: '2024', short: 'SBCE', title: 'Sistema Brasileiro de Comércio de Emissões', desc: 'Mercado regulado de carbono. Operadores acima de 10.000 tCO₂eq/ano têm obrigações MRV.' },
  { id: '13.709', year: '2018', short: 'LGPD', title: 'Proteção de Dados', desc: 'Hospedagem em território brasileiro, ROPA, canal ao titular e DPO designado.' },
  { id: '14.133', year: '2021', short: 'Licitações', title: 'Nova Lei de Licitações', desc: 'Substitui a Lei 8.666/93. Suporta modalidades para contratos continuados.' },
  { id: '14.195', year: '2021', short: 'SocBen', title: 'Sociedade de Benefício', desc: 'Constituída como SocBen com cláusula expressa de finalidade socioambiental.' }
]

// Linha 1 — Empresas de coleta: assinatura por veículo em operação (preço regressivo por volume)
const planosEmpresa = [
  { name: 'Frota Inicial', target: '1 a 3 veículos', price: 'R$ 249', unit: '/veículo·mês', feats: ['Rota otimizada + navegação','Comprovação de coleta (foto + GPS)','Operadores ilimitados por veículo','App do cidadão incluído','Suporte WhatsApp'] },
  { name: 'Frota em Crescimento', target: '4 a 10 veículos', price: 'R$ 199', unit: '/veículo·mês', feats: ['Tudo do plano anterior','Relatórios operacionais exportáveis','Otimização multi-rota','Suporte prioritário'], featured: true },
  { name: 'Operador Regional', target: '11 a 25 veículos', price: 'R$ 169', unit: '/veículo·mês', feats: ['Tudo do plano anterior','API para integrações','Painel multi-contrato','MRV nativo por rota'] },
  { name: 'Grande Operação', target: '26+ veículos', price: 'Sob consulta', unit: '', feats: ['Preço regressivo por volume','SLA diferenciado','Customizações','Success manager'] }
]

// Linha 2 — Prefeituras: relatório de conformidade por faixa populacional (contrato anual)
const reportFeats = ['Relatório de conformidade PMGIRS / SINISA','Dados auditáveis para TCE, MP e câmara','Mapa público de áreas autorizadas','Canal de resposta ao cidadão','MRV climático nativo (GHG Protocol)']
const planosPrefeitura = [
  { faixa: 'Até 10 mil hab.', price: 'R$ 4.800', mensal: '≈ R$ 400/mês', dispensa: true },
  { faixa: '10 a 30 mil hab.', price: 'R$ 9.600', mensal: '≈ R$ 800/mês', dispensa: true },
  { faixa: '30 a 100 mil hab.', price: 'R$ 19.200', mensal: '≈ R$ 1.600/mês', dispensa: true, featured: true },
  { faixa: '100 a 500 mil hab.', price: 'R$ 36.000', mensal: '≈ R$ 3.000/mês', dispensa: true },
  { faixa: 'Acima de 500 mil', price: 'Sob consulta', mensal: 'Pregão / contrato', dispensa: false }
]

const mockupsRow = ['/mockups/02-app-cidada-home.svg', '/mockups/03-app-cidada-denuncia.svg', '/mockups/04-app-coletor.svg']

function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function goToContact() {
  drawerVisible.value = false
  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
}
function goToSolucao() {
  document.getElementById('solucao')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="hdr" :class="{ scrolled }">
    <div class="hdr-content">
      <a href="#hero" class="logo">
        <svg viewBox="0 0 200 200" width="32" height="32">
          <path d="M 152 56 A 60 60 0 1 0 152 144" fill="none" stroke="#0A6E7C" stroke-width="24" stroke-linecap="round"/>
          <circle cx="152" cy="144" r="17" fill="#F26B5E"/>
        </svg>
        <span>coletaki</span>
      </a>
      <nav class="nav-desktop">
        <a v-for="i in menu" :key="i.href" :href="i.href">{{ i.label }}</a>
        <Button label="Falar conosco" @click="goToContact" />
      </nav>
      <Button icon="pi pi-bars" text severity="secondary" class="mobile-btn" @click="drawerVisible = true" />
    </div>
    <Drawer v-model:visible="drawerVisible" position="right">
      <template #header>
        <div class="drawer-hdr">
          <svg viewBox="0 0 200 200" width="28" height="28">
            <path d="M 152 56 A 60 60 0 1 0 152 144" fill="none" stroke="#0A6E7C" stroke-width="24" stroke-linecap="round"/>
            <circle cx="152" cy="144" r="17" fill="#F26B5E"/>
          </svg>
          <span>coletaki</span>
        </div>
      </template>
      <nav class="nav-mobile">
        <a v-for="i in menu" :key="i.href" :href="i.href" @click="drawerVisible = false">{{ i.label }}</a>
        <Button label="Falar conosco" @click="goToContact" />
      </nav>
    </Drawer>
  </header>

  <section id="hero" class="hero">
    <div class="container hero-content">
      <div>
        <span class="eyebrow">Climate-tech · Cleantech · ESG</span>
        <h1>A infraestrutura digital da gestão sustentável de <span class="accent">resíduos sólidos urbanos</span> no Brasil.</h1>
        <p class="lead">Coletaki conecta prefeituras, empresas de coleta, recolhedores e cidadãos em uma única plataforma GIS — transformando a operação invisível dos resíduos em dados auditáveis, impacto climático mensurável e conformidade legal nativa.</p>
        <div class="hero-cta">
          <Button label="Conheça a plataforma" @click="goToSolucao" />
          <Button label="Para apoiadores e fundos" text severity="secondary" @click="goToContact" />
        </div>
        <div class="hero-stats">
          <div><strong>769</strong><span>municípios potenciais em PI · MA · PA · CE</span></div>
          <div><strong>~30%</strong><span>dos resíduos brasileiros têm destinação inadequada</span></div>
          <div><strong>2030</strong><span>prazo PNRS para encerramento de lixões</span></div>
        </div>
      </div>
      <div class="hero-img">
        <img src="/mockups/01-painel-prefeitura.svg" alt="Painel administrativo prefeitura" />
      </div>
    </div>
  </section>

  <section id="problema" class="section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">O cenário brasileiro</span>
        <h2>A coleta de resíduos no Brasil ainda é um problema crônico — e a conta está chegando.</h2>
        <p class="lead">Milhões de brasileiros vivem em municípios sem coleta regular ou com disposição inadequada. O custo é ambiental, sanitário, econômico e político — e tende a crescer com a entrada em vigor do SBCE e a fiscalização mais rigorosa da PNRS.</p>
      </div>
    </div>
  </section>

  <section id="solucao" class="section section-tinted">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Plataforma Coletaki</span>
        <h2>Uma plataforma. Três usuários. Operação ponta a ponta.</h2>
      </div>
      <div class="users-grid">
        <Card v-for="u in usuarios" :key="u.title">
          <template #title>
            <div class="user-tag">{{ u.tag }}</div>
            <div>{{ u.title }}</div>
          </template>
          <template #content>
            <p>{{ u.text }}</p>
            <ul class="feats">
              <li v-for="f in u.features" :key="f">{{ f }}</li>
            </ul>
          </template>
        </Card>
      </div>
      <div class="mockups-row">
        <div v-for="(src, idx) in mockupsRow" :key="src" class="mockup">
          <img :src="src" :alt="'Mockup ' + (idx + 2)" />
        </div>
      </div>
    </div>
  </section>

  <section id="prefeituras" class="section">
    <div class="container prefeituras-split">
      <div>
        <span class="eyebrow">Setor público municipal</span>
        <h2>Transparência operacional que protege o gestor e qualifica o serviço ao cidadão.</h2>
        <ul class="bullets">
          <li><strong>Defesa em prestações de contas</strong> ao TCE, MP e câmara.</li>
          <li><strong>Cumprimento do PMGIRS</strong> — indicadores alinhados ao SINISA.</li>
          <li><strong>Áreas autorizadas de descarte</strong> publicadas em mapa público.</li>
          <li><strong>Resposta institucional ao cidadão</strong> via app pública.</li>
          <li><strong>Compatibilidade com SBCE</strong> — cidade preparada para créditos.</li>
        </ul>
        <Message severity="warn" :closable="false">
          <strong>Atenção, gestor público:</strong> a Lei 12.305/2010 (PNRS) e a Lei 14.026/2020 (Novo Marco do Saneamento) estabelecem prazos para encerramento de lixões e prestação de contas.
        </Message>
      </div>
      <div>
        <img src="/mockups/01-painel-prefeitura.svg" alt="Painel municipal" class="split-img" />
      </div>
    </div>
  </section>

  <section id="conformidade" class="section section-tinted">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Marcos regulatórios brasileiros</span>
        <h2>Coletaki nasceu para responder aos marcos legais que governam o setor.</h2>
      </div>
      <div class="leis-grid">
        <Card v-for="l in leis" :key="l.id">
          <template #title>
            <div class="lei-hdr">
              <Chip :label="'Lei ' + l.id" class="p-chip-coral" />
              <span class="lei-year">{{ l.year }} · {{ l.short }}</span>
            </div>
            <h4>{{ l.title }}</h4>
          </template>
          <template #content>
            <p>{{ l.desc }}</p>
          </template>
        </Card>
      </div>
    </div>
  </section>

  <section id="impacto" class="section">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Climate-tech · ESG</span>
        <h2>Impacto mensurável, verificável e contabilizável.</h2>
        <p class="lead">MRV nativo em padrão GHG Protocol + IPCC 2006. Cada decisão de produto obedece a um princípio: transformar a gestão de resíduos em ativo climático.</p>
      </div>
      <div class="ods-grid">
        <div class="ods"><span class="num">3</span><span>Saúde</span></div>
        <div class="ods"><span class="num">6</span><span>Água e saneamento</span></div>
        <div class="ods"><span class="num">8</span><span>Trabalho decente</span></div>
        <div class="ods featured"><span class="num">11</span><span>Cidades sustentáveis</span></div>
        <div class="ods featured"><span class="num">12</span><span>Consumo responsável</span></div>
        <div class="ods featured"><span class="num">13</span><span>Ação climática</span></div>
      </div>
    </div>
  </section>

  <section id="planos" class="section section-tinted">
    <div class="container">
      <div class="section-header">
        <span class="eyebrow">Modelo comercial</span>
        <h2>Duas linhas de receita, um só ecossistema.</h2>
        <p class="lead" style="margin: 0 auto;">O cidadão e a operação de campo do recolhedor são sempre grátis e ilimitados — são eles que geram o dado. A receita vem de quem opera a frota e de quem precisa provar conformidade.</p>
      </div>

      <div class="free-note">
        <i class="pi pi-gift"></i>
        <span><strong>Grátis para sempre:</strong> app do cidadão e app do recolhedor (operação de campo), sem limite de usuários em qualquer plano.</span>
      </div>

      <div class="planos-sub">
        <span class="sub-label">01 · Para empresas de coleta</span>
        <h3>Assinatura por veículo em operação</h3>
        <p>Você paga pelo caminhão — a unidade que fatura. A tripulação (operadores) entra ilimitada. Quanto maior a frota, menor o preço por veículo.</p>
      </div>
      <div class="planos-grid">
        <Card v-for="p in planosEmpresa" :key="p.name" :class="{ featured: p.featured }">
          <template #title>
            <Chip v-if="p.featured" label="Recomendado" class="p-chip-coral featured-badge" />
            <div>{{ p.name }}</div>
          </template>
          <template #subtitle>{{ p.target }}</template>
          <template #content>
            <div class="price">{{ p.price }}<small v-if="p.unit">{{ p.unit }}</small></div>
            <ul class="feats">
              <li v-for="f in p.feats" :key="f">{{ f }}</li>
            </ul>
          </template>
        </Card>
      </div>

      <div class="planos-sub planos-sub-2">
        <span class="sub-label">02 · Para prefeituras</span>
        <h3>Relatório de conformidade por faixa populacional</h3>
        <p>Contrato anual dimensionado pela população. As quatro primeiras faixas ficam abaixo do limite de dispensa de licitação (Lei 14.133) — a prefeitura contrata direto, sem pregão.</p>
      </div>
      <ul class="report-feats">
        <li v-for="f in reportFeats" :key="f">{{ f }}</li>
      </ul>
      <div class="planos-grid planos-grid-auto">
        <Card v-for="p in planosPrefeitura" :key="p.faixa" :class="{ featured: p.featured }">
          <template #title>
            <Chip v-if="p.dispensa" label="Sem licitação" class="featured-badge chip-dispensa" />
            <div class="faixa-title">{{ p.faixa }}</div>
          </template>
          <template #content>
            <div class="price price-sm">{{ p.price }}<small v-if="p.price.includes('R$')">/ano</small></div>
            <div class="plano-mensal">{{ p.mensal }}</div>
          </template>
        </Card>
      </div>
    </div>
  </section>

  <section id="contato" class="section section-dark">
    <div class="container">
      <div class="section-header">
        <svg viewBox="0 0 200 200" width="64" height="64" style="margin:0 auto 32px;display:block">
          <path d="M 152 56 A 60 60 0 1 0 152 144" fill="none" stroke="#FAFAF7" stroke-width="24" stroke-linecap="round"/>
          <circle cx="152" cy="144" r="17" fill="#F26B5E"/>
        </svg>
        <h2>Vamos transformar a gestão de resíduos do seu município.</h2>
        <p>Operação visível. Cidade limpa. Resíduos viram dados. Dados viram impacto.</p>
      </div>
      <div class="contato-grid">
        <div>
          <h3>Comercial</h3>
          <p class="mono">comercial@coletaki.eco.br</p>
          <p>Para prefeituras, empresas privadas de coleta e consórcios intermunicipais.</p>
        </div>
        <div>
          <h3>Parcerias</h3>
          <p class="mono">parcerias@coletaki.eco.br</p>
          <p>Para fundações, programas de fomento, fundos de impacto e empresas com agenda ESG.</p>
        </div>
      </div>
      <div class="footer-meta">
        <p>Coletaki · Sociedade de Benefício · Sediada em Parnaíba, Piauí</p>
        <p>Atendimento em todo o território nacional · coletaki.eco.br</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hdr { position: sticky; top: 0; z-index: 100; background: rgba(250,250,247,.92); backdrop-filter: blur(12px); transition: box-shadow .2s; }
.hdr.scrolled { box-shadow: 0 1px 0 var(--cinza), 0 4px 24px rgba(31,42,48,.06); }
.hdr-content { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 68px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--teal-profundo); font-weight: 700; font-size: 20px; }
.nav-desktop { display: flex; align-items: center; gap: 28px; }
.nav-desktop a { color: var(--carvao); text-decoration: none; font-size: 14px; font-weight: 500; }
.nav-desktop a:hover { color: var(--teal-profundo); }
.mobile-btn { display: none; }
@media (max-width: 900px) { .nav-desktop { display: none; } .mobile-btn { display: inline-flex; } }
.drawer-hdr { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--teal-profundo); font-size: 18px; }
.nav-mobile { display: flex; flex-direction: column; gap: 8px; padding: 20px 0; }
.nav-mobile a { color: var(--carvao); text-decoration: none; padding: 14px 0; border-bottom: 1px solid var(--cinza); font-weight: 500; }
.hero { padding: 64px 0 96px; background: linear-gradient(180deg, var(--branco) 0%, var(--areia) 100%); }
.hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.hero-cta { display: flex; gap: 16px; flex-wrap: wrap; margin: 32px 0 48px; }
.hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding-top: 32px; border-top: 1px solid var(--cinza); }
.hero-stats strong { display: block; font-size: 1.85rem; font-weight: 700; color: var(--teal-profundo); margin-bottom: 4px; }
.hero-stats span { font-size: 12px; color: var(--cinza-medio); line-height: 1.4; }
.hero-img img { border-radius: 12px; box-shadow: 0 24px 60px rgba(31,42,48,.18); background: white; }
@media (max-width: 900px) { .hero-content { grid-template-columns: 1fr; gap: 48px; } .hero-stats { grid-template-columns: 1fr; } }
.users-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 64px; }
.user-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; background: var(--teal-profundo); color: var(--branco); padding: 4px 10px; border-radius: 4px; margin-bottom: 12px; }
.feats { list-style: none; padding: 0; margin: 16px 0 0; }
.feats li { padding: 6px 0 6px 22px; position: relative; font-size: 14px; }
.feats li::before { content: ''; position: absolute; left: 0; top: 12px; width: 8px; height: 8px; background: var(--coral); border-radius: 50%; }
.mockups-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.mockup img { max-width: 280px; margin: 0 auto; filter: drop-shadow(0 16px 40px rgba(31,42,48,.15)); }
@media (max-width: 900px) { .users-grid, .mockups-row { grid-template-columns: 1fr; } }
.prefeituras-split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.bullets { list-style: none; padding: 0; margin: 24px 0; }
.bullets li { padding: 12px 0 12px 28px; position: relative; border-bottom: 1px solid var(--cinza); line-height: 1.5; }
.bullets li::before { content: ''; position: absolute; left: 0; top: 18px; width: 10px; height: 10px; background: var(--coral); border-radius: 50%; }
.split-img { border-radius: 12px; box-shadow: 0 12px 32px rgba(31,42,48,.12); border: 1px solid var(--cinza); }
@media (max-width: 900px) { .prefeituras-split { grid-template-columns: 1fr; gap: 48px; } }
.leis-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.lei-hdr { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.lei-year { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--cinza-medio); }
@media (max-width: 900px) { .leis-grid { grid-template-columns: 1fr; } }
.ods-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
.ods { background: white; border-radius: 10px; padding: 20px 12px; text-align: center; border: 1px solid var(--cinza); }
.ods .num { display: block; font-size: 2rem; font-weight: 700; color: var(--teal-profundo); }
.ods.featured { border-color: var(--coral); border-width: 2px; }
.ods.featured .num { color: var(--coral); }
@media (max-width: 900px) { .ods-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px) { .ods-grid { grid-template-columns: repeat(2, 1fr); } }
.planos-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.planos-grid .featured { border: 2px solid var(--teal-profundo); position: relative; }
.featured-badge { position: absolute; top: -12px; right: 20px; z-index: 2; }
.price { font-size: 1.85rem; font-weight: 700; color: var(--carvao); margin: 12px 0 16px; }
.price small { font-size: 13px; color: var(--cinza-medio); font-weight: 400; }
@media (max-width: 900px) { .planos-grid { grid-template-columns: 1fr; } }
.free-note { display: flex; align-items: center; gap: 12px; background: var(--branco); border: 1px solid var(--cinza); border-left: 3px solid var(--verde); border-radius: 10px; padding: 14px 20px; max-width: 760px; margin: 0 auto 56px; font-size: 14px; }
.free-note i { color: var(--verde); font-size: 18px; flex-shrink: 0; }
.planos-sub { max-width: 1200px; margin: 0 0 24px; }
.planos-sub-2 { margin-top: 72px; }
.sub-label { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--teal-profundo); text-transform: uppercase; letter-spacing: 2px; font-weight: 500; display: block; margin-bottom: 8px; }
.planos-sub h3 { font-size: 1.4rem; margin-bottom: 6px; }
.planos-sub p { color: var(--cinza-medio); max-width: 720px; margin: 0; font-size: 15px; }
.planos-grid .p-card { position: relative; }
.planos-grid-auto { grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
.price-sm { font-size: 1.5rem; }
.plano-mensal { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--cinza-medio); margin-top: 4px; }
.faixa-title { font-size: 1.05rem; }
.chip-dispensa { background: var(--verde) !important; color: var(--branco); font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; }
.report-feats { list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 8px 24px; padding: 0; margin: 0 0 28px; }
.report-feats li { padding: 6px 0 6px 22px; position: relative; font-size: 14px; }
.report-feats li::before { content: ''; position: absolute; left: 0; top: 12px; width: 8px; height: 8px; background: var(--verde); border-radius: 50%; }
@media (max-width: 900px) { .planos-grid-auto { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .planos-grid-auto { grid-template-columns: 1fr; } }
.contato-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; margin-bottom: 48px; }
.contato-grid h3 { color: var(--coral); }
.footer-meta { text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 12px; opacity: .7; padding-top: 40px; border-top: 1px solid rgba(250,250,247,.15); }
@media (max-width: 900px) { .contato-grid { grid-template-columns: 1fr; } }
</style>
