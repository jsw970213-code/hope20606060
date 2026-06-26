'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileText,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  X
} from 'lucide-react';

const STORAGE = {
  notices: 'shinilpack.notices',
  inquiries: 'shinilpack.inquiries',
  session: 'shinilpack.adminSession'
};

const adminAccount = { id: 'admin', password: '1830' };

const navItems = [
  { path: '/', label: '홈' },
  { path: '/company', label: '회사소개' },
  { path: '/business', label: '사업분야' },
  { path: '/facility', label: '공장설비' },
  { path: '/quality', label: '품질관리' },
  { path: '/support', label: '고객지원' },
  { path: '/consulting', label: '컨설팅' }
];

const businessAreas = [
  { title: '코스메틱', text: '일반 파우치류, 성형용 코스메틱 필름', tone: 'cosmetic' },
  { title: '전자', text: 'EASY PEEL 필름, 전자칩 포장', tone: 'electronic' },
  { title: '의료', text: 'EASY PEEL 필름, 의료포장', tone: 'medical' },
  { title: '식품', text: '살균 포장지, 레토르트 포장', tone: 'food' }
];

const facilities = [
  { title: '드라이 라미네이터', text: '고품질 필름 적층 공정을 통해 인쇄 필름의 접착력과 내구성을 강화합니다.' },
  { title: '슬리터', text: '완성된 롤 필름을 정밀하게 절단해 다양한 규격의 제품으로 가공합니다.' },
  { title: '추가 설비', text: '검사, 포장, 후가공 설비를 확장해 고객 요구에 맞춘 생산 체계를 준비합니다.' }
];

const seedNotices = [
  { id: 'n1', title: '2026년 신일팩 품질경영 운영 안내', body: '신일팩은 안정적인 생산 공정과 품질 기준 강화를 위해 품질경영 체계를 지속적으로 개선하고 있습니다.', date: '2026-06-25' },
  { id: 'n2', title: '맞춤 포장재 상담 접수 안내', body: '제품 특성, 유통 환경, 포장 목적에 맞춘 소재와 구조 상담을 진행합니다.', date: '2026-06-25' }
];

function load(key, fallback) {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

function usePath() {
  const [path, setPath] = useState('/');
  useEffect(() => {
    setPath(window.location.pathname);
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const go = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return [path, go];
}

function useStore() {
  const [notices, setNotices] = useState(() => load(STORAGE.notices, seedNotices));
  const [inquiries, setInquiries] = useState(() => load(STORAGE.inquiries, []));
  const [session, setSession] = useState(() => load(STORAGE.session, null));

  useEffect(() => save(STORAGE.notices, notices), [notices]);
  useEffect(() => save(STORAGE.inquiries, inquiries), [inquiries]);
  useEffect(() => save(STORAGE.session, session), [session]);

  return { notices, setNotices, inquiries, setInquiries, session, setSession };
}

export default function App() {
  const [path, go] = usePath();
  const store = useStore();
  const page = path === '/admin' ? 'admin' : path.split('/')[1] || 'home';

  return (
    <>
      {page !== 'admin' && <Header go={go} path={path} />}
      <main>
        {page === 'home' && <Home go={go} notices={store.notices} />}
        {page === 'company' && <Company />}
        {page === 'business' && <Business />}
        {page === 'facility' && <Facility />}
        {page === 'quality' && <Quality />}
        {page === 'support' && <Support notices={store.notices} go={go} />}
        {page === 'consulting' && <Consulting store={store} />}
        {page === 'admin' && <Admin store={store} go={go} />}
        {!['home', 'company', 'business', 'facility', 'quality', 'support', 'consulting', 'admin'].includes(page) && <Home go={go} notices={store.notices} />}
      </main>
      {page !== 'admin' && <Footer go={go} />}
    </>
  );
}

function Header({ go, path }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <button className="brand" onClick={() => go('/')} aria-label="신일팩 홈">
        <span className="brand-mark">S</span>
        <span><strong>신일팩</strong><small>SHINIL PACK</small></span>
      </button>
      <nav className={open ? 'open' : ''}>
        {navItems.slice(1).map((item) => (
          <button key={item.path} className={path === item.path ? 'active' : ''} onClick={() => { go(item.path); setOpen(false); }}>
            {item.label}
          </button>
        ))}
      </nav>
      <button className="admin-link" onClick={() => go('/admin')}>관리자</button>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="메뉴 열기">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero({ go }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">정직한 기술과 책임 있는 생산</p>
        <h1>오늘보다 더 나은<br />내일을 포장합니다</h1>
        <p>더 나은 내일을 위한 신일팩의 기술 혁신</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => go('/business')}>사업분야 보기 <ArrowRight size={20} /></button>
          <button className="secondary" onClick={() => go('/consulting')}>맞춤 컨설팅 문의</button>
        </div>
      </div>
      <div className="hero-visual" aria-label="포장 필름 생산 설비 이미지 교체 영역">
        <div className="roll r1" />
        <div className="roll r2" />
        <div className="machine-line" />
        <span>포장 필름 생산 이미지 영역</span>
      </div>
    </section>
  );
}

function Home({ go, notices }) {
  return (
    <>
      <Hero go={go} />
      <SectionIntro eyebrow="Business" title="신일팩 사업분야" text="신뢰와 혁신, 더 나은 내일을 위한 고민으로 고객사의 제품 가치를 높입니다." />
      <CardGrid items={businessAreas} onMore={() => go('/business')} />
      <section className="split-section navy">
        <div>
          <p className="eyebrow">Facility</p>
          <h2>안정적인 제조 설비로 완성하는 품질</h2>
          <p>라미네이팅부터 절단, 검사까지 포장재 생산 공정에 맞춘 설비 체계를 갖추고 있습니다.</p>
          <button className="light-button" onClick={() => go('/facility')}>공장설비 보기</button>
        </div>
        <div className="facility-list">
          {facilities.slice(0, 2).map((item) => <MiniFeature key={item.title} icon={<Factory />} {...item} />)}
        </div>
      </section>
      <section className="quality-band">
        <MiniFeature icon={<ShieldCheck />} title="ISO9001 인증" text="국제 표준에 부합하는 품질경영 시스템을 운영합니다." />
        <MiniFeature icon={<ClipboardCheck />} title="품질경영 시스템" text="원재료부터 출하까지 기준과 기록을 관리합니다." />
        <MiniFeature icon={<PackageCheck />} title="안정적인 생산 공정" text="고객사의 납기와 품질을 지키는 생산 흐름을 만듭니다." />
      </section>
      <section className="notice-preview">
        <div>
          <p className="eyebrow">Notice</p>
          <h2>공지사항</h2>
        </div>
        <div className="notice-list">
          {notices.slice(0, 2).map((notice) => <NoticeCard key={notice.id} notice={notice} />)}
        </div>
        <button className="secondary" onClick={() => go('/support')}>공지사항 더보기</button>
      </section>
      <ConsultCta go={go} />
    </>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <section className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}

function CardGrid({ items, onMore }) {
  return (
    <section className="business-grid">
      {items.map((item) => (
        <article className={`business-card ${item.tone}`} key={item.title}>
          <div className="photo-slot"><span>이미지 교체 영역</span></div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {onMore && <button onClick={onMore}>More View <ArrowRight size={18} /></button>}
        </article>
      ))}
    </section>
  );
}

function MiniFeature({ icon, title, text }) {
  return (
    <article className="mini-feature">
      <div className="feature-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function NoticeCard({ notice }) {
  return (
    <article className="notice-card">
      <time>{notice.date}</time>
      <h3>{notice.title}</h3>
      <p>{notice.body}</p>
    </article>
  );
}

function ConsultCta({ go }) {
  return (
    <section className="consult-cta">
      <p className="eyebrow">Consulting</p>
      <h2>포장 고민을 진단하고 맞춤형 솔루션을 제안합니다.</h2>
      <button className="primary" onClick={() => go('/consulting')}>비공개 문의하기 <ArrowRight size={20} /></button>
    </section>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function Company() {
  return (
    <>
      <PageHero eyebrow="Company" title="회사소개" text="정직한 기술과 책임 있는 생산으로 고객과 함께 성장하는 포장재 전문 기업입니다." />
      <section className="message-section">
        <div className="portrait-slot"><UserRound size={52} /><span>대표 이미지 영역</span></div>
        <article>
          <p className="eyebrow">CEO Message</p>
          <h2>매일매일 새롭게 나아가는 신일팩</h2>
          <p>안녕하십니까. 신일팩 대표 정현철입니다.</p>
          <p>저희 신일팩은 이름 그대로, ‘매일매일 새롭게 나아간다’는 日新又日新, 일신우일신의 정신을 바탕으로, 정직한 기술과 책임 있는 생산으로 고객과 함께 성장해온 포장재 전문 기업입니다.</p>
          <p>우리는 단순히 제품을 납품하는 것을 넘어서, 고객사의 브랜드와 품질을 더욱 빛나게 만드는 포장 파트너가 되고자 합니다.</p>
          <strong>대표 정현철</strong>
        </article>
      </section>
      <section className="value-grid">
        <MiniFeature icon={<CheckCircle2 />} title="정직한 기술" text="현장 경험과 검증된 공정으로 신뢰할 수 있는 포장재를 만듭니다." />
        <MiniFeature icon={<Building2 />} title="책임 있는 생산" text="납기, 품질, 기록을 지키는 생산 기준을 중요하게 생각합니다." />
        <MiniFeature icon={<Sparkles />} title="브랜드 가치 향상" text="고객사의 제품이 더 좋은 모습으로 전달되도록 포장을 설계합니다." />
      </section>
    </>
  );
}

function Business() {
  return (
    <>
      <PageHero eyebrow="Business" title="사업분야" text="화장품, 전자, 의료, 식품 분야에 필요한 포장 필름과 파우치 솔루션을 제공합니다." />
      <CardGrid items={businessAreas} />
    </>
  );
}

function Facility() {
  return (
    <>
      <PageHero eyebrow="Facility" title="공장설비" text="안정적인 생산을 위한 핵심 설비와 확장 가능한 제조 환경을 갖추고 있습니다." />
      <section className="facility-page">
        {facilities.map((item, idx) => (
          <article className="facility-card" key={item.title}>
            <div className="equipment-slot"><span>설비 이미지 {idx + 1}</span></div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function Quality() {
  return (
    <>
      <PageHero eyebrow="Quality" title="품질관리" text="ISO9001 기반의 품질경영 시스템과 안정적인 생산 공정으로 고객사의 기준을 지킵니다." />
      <section className="quality-detail">
        <MiniFeature icon={<ShieldCheck />} title="ISO9001 인증" text="체계적인 품질경영시스템을 인정받아 국제 표준에 부합하는 생산 공정을 유지합니다." />
        <MiniFeature icon={<ClipboardCheck />} title="품질경영 시스템" text="공정별 점검 기준과 기록 관리를 통해 반복 가능한 품질을 확보합니다." />
        <MiniFeature icon={<Factory />} title="안정적인 생산 공정" text="현장 중심의 관리로 불량률을 줄이고 납기 신뢰도를 높입니다." />
      </section>
    </>
  );
}

function Support({ notices, go }) {
  return (
    <>
      <PageHero eyebrow="Support" title="고객지원" text="공지사항과 문의 안내를 확인하실 수 있습니다." />
      <section className="support-layout">
        <div className="notice-list full">
          {notices.map((notice) => <NoticeCard key={notice.id} notice={notice} />)}
        </div>
        <aside className="contact-panel">
          <h2>상담 안내</h2>
          <p>제품 특성에 맞는 포장 구조와 소재 상담이 필요하시면 컨설팅 문의를 남겨주세요.</p>
          <button className="primary" onClick={() => go('/consulting')}>컨설팅 문의</button>
        </aside>
      </section>
    </>
  );
}

function Consulting({ store }) {
  const { inquiries, setInquiries } = store;
  const [form, setForm] = useState({ name: '', pin: '', company: '', contact: '', message: '' });
  const [selected, setSelected] = useState(null);
  const [pin, setPin] = useState('');
  const [opened, setOpened] = useState(null);

  const submit = (event) => {
    event.preventDefault();
    if (!/^\d{4}$/.test(form.pin)) {
      alert('비밀번호는 4자리 숫자로 입력해주세요.');
      return;
    }
    const next = {
      ...form,
      id: `q${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      status: '접수',
      answer: ''
    };
    setInquiries([next, ...inquiries]);
    setForm({ name: '', pin: '', company: '', contact: '', message: '' });
    alert('문의가 비공개로 저장되었습니다.');
  };

  const unlock = () => {
    if (selected?.pin === pin) {
      setOpened(selected);
      setPin('');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <PageHero eyebrow="Consulting" title="맞춤 컨설팅" text="고객사의 포장 고민을 비공개로 접수하고, 관리자 답변을 안전하게 확인합니다." />
      <section className="consulting-layout">
        <form className="large-form" onSubmit={submit}>
          <h2>비공개 문의 작성</h2>
          <label>이름<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
          <label>비밀번호 4자리<input inputMode="numeric" maxLength="4" value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, '') })} required /></label>
          <label>회사명<input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required /></label>
          <label>연락처<input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} required /></label>
          <label>고민사항<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></label>
          <button className="primary">문의 저장</button>
        </form>
        <div className="private-list">
          <h2>문의 리스트</h2>
          {inquiries.length === 0 && <p className="empty">등록된 문의가 없습니다.</p>}
          {inquiries.map((item) => (
            <article className="private-item" key={item.id}>
              <div>
                <strong>{item.company}</strong>
                <p>{item.name} · {item.date} · {item.status}</p>
              </div>
              <button className="secondary" onClick={() => { setSelected(item); setOpened(null); }}>상세 보기</button>
            </article>
          ))}
        </div>
      </section>
      {selected && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-card">
            <button className="close" onClick={() => setSelected(null)}><X /></button>
            {!opened ? (
              <>
                <Lock size={36} />
                <h2>비공개 문의입니다</h2>
                <p>작성 시 입력한 4자리 비밀번호를 입력해주세요.</p>
                <input className="pin-input" inputMode="numeric" maxLength="4" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} />
                <button className="primary" onClick={unlock}>확인</button>
              </>
            ) : (
              <>
                <h2>{opened.company} 문의 내용</h2>
                <p><strong>연락처</strong> {opened.contact}</p>
                <p className="message-box">{opened.message}</p>
                <h3>관리자 답변</h3>
                <p className="answer-box">{opened.answer || '아직 등록된 답변이 없습니다.'}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Admin({ store, go }) {
  const { notices, setNotices, inquiries, setInquiries, session, setSession } = store;
  const [login, setLogin] = useState({ id: '', password: '' });
  const [tab, setTab] = useState('dashboard');
  const [noticeForm, setNoticeForm] = useState({ id: '', title: '', body: '' });
  const [answerDraft, setAnswerDraft] = useState({});

  const stats = useMemo(() => ({
    notices: notices.length,
    inquiries: inquiries.length,
    waiting: inquiries.filter((q) => !q.answer).length
  }), [notices, inquiries]);

  if (!session) {
    return (
      <section className="admin-login">
        <button className="brand admin-brand" onClick={() => go('/')}>
          <span className="brand-mark">S</span><span><strong>신일팩</strong><small>관리자</small></span>
        </button>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (login.id === adminAccount.id && login.password === adminAccount.password) setSession({ loggedIn: true });
          else alert('아이디 또는 비밀번호가 맞지 않습니다.');
        }}>
          <h1>관리자 로그인</h1>
          <p>아이디 admin, 초기 비밀번호 1830</p>
          <label>아이디<input value={login.id} onChange={(e) => setLogin({ ...login, id: e.target.value })} /></label>
          <label>비밀번호<input type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} /></label>
          <button className="primary">로그인</button>
        </form>
      </section>
    );
  }

  const saveNotice = (event) => {
    event.preventDefault();
    if (noticeForm.id) {
      setNotices(notices.map((n) => n.id === noticeForm.id ? { ...n, title: noticeForm.title, body: noticeForm.body } : n));
    } else {
      setNotices([{ id: `n${Date.now()}`, title: noticeForm.title, body: noticeForm.body, date: new Date().toISOString().slice(0, 10) }, ...notices]);
    }
    setNoticeForm({ id: '', title: '', body: '' });
  };

  const updateAnswer = (id) => {
    setInquiries(inquiries.map((q) => q.id === id ? { ...q, answer: answerDraft[id] || '', status: '답변완료' } : q));
    alert('답변이 저장되었습니다.');
  };

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand admin-brand"><span className="brand-mark">S</span><span><strong>신일팩</strong><small>관리자</small></span></div>
        <button className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}>대시보드</button>
        <button className={tab === 'notices' ? 'active' : ''} onClick={() => setTab('notices')}>공지사항 관리</button>
        <button className={tab === 'consulting' ? 'active' : ''} onClick={() => setTab('consulting')}>컨설팅 관리</button>
        <button onClick={() => setSession(null)}><LogOut size={22} /> 로그아웃</button>
      </aside>
      <div className="admin-content">
        {tab === 'dashboard' && (
          <>
            <h1>대시보드</h1>
            <div className="admin-stats">
              <MiniFeature icon={<FileText />} title={`${stats.notices}건`} text="등록된 공지사항" />
              <MiniFeature icon={<MessageSquareText />} title={`${stats.inquiries}건`} text="전체 컨설팅 문의" />
              <MiniFeature icon={<Lock />} title={`${stats.waiting}건`} text="답변 대기 문의" />
            </div>
          </>
        )}
        {tab === 'notices' && (
          <>
            <h1>공지사항 관리</h1>
            <form className="admin-form" onSubmit={saveNotice}>
              <label>제목<input value={noticeForm.title} onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} required /></label>
              <label>내용<textarea value={noticeForm.body} onChange={(e) => setNoticeForm({ ...noticeForm, body: e.target.value })} required /></label>
              <button className="primary">{noticeForm.id ? '수정 저장' : '공지 작성'}</button>
            </form>
            {notices.map((notice) => (
              <article className="admin-row" key={notice.id}>
                <div><strong>{notice.title}</strong><p>{notice.body}</p></div>
                <button onClick={() => setNoticeForm(notice)}>수정</button>
                <button onClick={() => setNotices(notices.filter((n) => n.id !== notice.id))}>삭제</button>
              </article>
            ))}
          </>
        )}
        {tab === 'consulting' && (
          <>
            <h1>컨설팅 관리</h1>
            {inquiries.length === 0 && <p className="empty">등록된 문의가 없습니다.</p>}
            {inquiries.map((item) => (
              <article className="admin-question" key={item.id}>
                <h2>{item.company} / {item.name}</h2>
                <p><strong>연락처</strong> {item.contact}</p>
                <p><strong>문의일</strong> {item.date}</p>
                <p className="message-box">{item.message}</p>
                <label>관리자 답변<textarea value={answerDraft[item.id] ?? item.answer} onChange={(e) => setAnswerDraft({ ...answerDraft, [item.id]: e.target.value })} /></label>
                <button className="primary" onClick={() => updateAnswer(item.id)}>답변 저장</button>
              </article>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

function Footer({ go }) {
  return (
    <footer>
      <div>
        <h2>신일팩</h2>
        <p>더 나은 내일을 위한 고민으로 모든 고객사와 함께 성장하는 기업이 되겠습니다.</p>
      </div>
      <address>
        <span><MapPin size={18} /> 경기 화성시 팔탄면 현대기아로 72-49</span>
        <span><Mail size={18} /> hcjung64@netsgo.com</span>
        <span><Phone size={18} /> Fax 031-8059-1830</span>
        <span>대표자명 정현철 · 사업자등록번호 113-17-74295</span>
      </address>
      <button onClick={() => go('/admin')}>관리자 페이지</button>
      <small>ⓒ 2026 SHINIL PACK</small>
    </footer>
  );
}
