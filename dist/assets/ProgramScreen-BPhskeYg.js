import{j as e,p as n,q as b,i as d,G as y,A as j,g as v}from"./vendor-mui-BB0TlWay.js";import{u as w}from"./vendor-utils-qfMBzdG4.js";import{p as k}from"./queries-CJol79rh.js";import{a as m}from"./index-B5xQo2KH.js";import{B as N}from"./Badge-CVO4E270.js";import{P as z}from"./PageWrapper-BxeX1RVL.js";import{u as c}from"./appStore-CiNz9QeE.js";import{m as r}from"./vendor-motion-DIogBHSs.js";import"./vendor-react-q2ftzoDf.js";const g={initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px"}},S=s=>({duration:.5,delay:s*.1,ease:"easeOut"}),C=()=>{const{data:s=[],isPending:p,error:h}=w(k),o=s.length?null:h?.message,f=c(i=>i.setActiveProgramId),l=c(i=>i.activeProgramId)??s[0]?.id??1,x=s,a=l?s.find(i=>Number(i.id)===Number(l)):null;if(p)return e.jsxs("div",{className:"pg-skeleton-page",children:[e.jsxs("div",{className:"pg-skeleton-hero",children:[e.jsx("div",{className:"pg-skeleton-bar",style:{width:"6rem",height:"0.625rem",marginBottom:"1rem"}}),e.jsx("div",{className:"pg-skeleton-bar",style:{width:"16rem",height:"1.5rem",marginBottom:"0.75rem"}}),e.jsx("div",{className:"pg-skeleton-bar",style:{width:"20rem",height:"0.75rem"}})]}),e.jsxs("div",{className:"pg-skeleton-detail",children:[e.jsx("div",{className:"pg-skeleton-img"}),e.jsxs("div",{className:"pg-skeleton-content",children:[e.jsx("div",{className:"pg-skeleton-bar",style:{width:"70%",height:"1.25rem",marginBottom:"1rem"}}),e.jsx("div",{className:"pg-skeleton-bar",style:{width:"100%",height:"0.625rem",marginBottom:"0.5rem"}}),e.jsx("div",{className:"pg-skeleton-bar",style:{width:"90%",height:"0.625rem",marginBottom:"0.5rem"}}),e.jsx("div",{className:"pg-skeleton-bar",style:{width:"60%",height:"0.625rem"}})]})]}),e.jsx("style",{children:`
        .pg-skeleton-page { min-height: 100vh; }
        .pg-skeleton-hero { padding: 4rem 2.5rem 3rem; background: #1a0e05; }
        .pg-skeleton-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 3rem 2.5rem; }
        .pg-skeleton-img { aspect-ratio: 16/10; border-radius: 0.75rem; background: #f0ebe4; animation: pg-pulse 1.5s ease-in-out infinite; }
        .pg-skeleton-content { display: flex; flex-direction: column; justify-content: center; }
        .pg-skeleton-bar { border-radius: 0.375rem; animation: pg-pulse 1.5s ease-in-out infinite; }
        .pg-skeleton-hero .pg-skeleton-bar { background: rgba(255,255,255,0.08); }
        .pg-skeleton-detail .pg-skeleton-bar { background: #f0ebe4; }
        @keyframes pg-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 768px) {
          .pg-skeleton-detail { grid-template-columns: 1fr; }
          .pg-skeleton-hero { padding: 3rem 1.5rem 2.5rem; }
          .pg-skeleton-detail { padding: 2rem 1.5rem; }
        }
      `})]});if(o)return e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"#ef4444"},children:o});const u=i=>{f(i),window.scrollTo({top:0,behavior:"smooth"})};return e.jsxs(z,{title:a?a.title:"Our Programs",description:"Explore Damarika's educational programs — archaeology workshops, field training sessions, seminars on Tamil Nadu heritage, and e-certificate courses.",keywords:"archaeology programs, archaeology workshops Tamil Nadu, field training, seminars, e-certificate course, archaeological awareness",path:"/programs",jsonLd:{"@context":"https://schema.org","@type":"ItemList",name:"Damarika Programs",url:"https://www.damarika.in/programs",numberOfItems:s.length},children:[e.jsxs("section",{className:"pg-hero",children:[e.jsx("div",{className:"pg-hero-overlay"}),e.jsxs("div",{className:"section-container",style:{position:"relative",zIndex:1,maxWidth:"42rem"},children:[e.jsx(r.p,{initial:{opacity:0,x:-16},animate:{opacity:1,x:0},transition:{duration:.5,delay:.2},className:"pg-label",style:{color:"#cd853f"},children:"Learn & Grow"}),e.jsxs(r.h1,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.7,delay:.3},className:"pg-hero-title",children:["Our ",e.jsx("span",{style:{color:"#cd853f"},children:"Programs"})]}),e.jsx(r.p,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,delay:.5},className:"pg-hero-desc",children:"Explore our educational programs and workshops designed to promote archaeological awareness"})]})]}),a&&e.jsx("section",{className:"pg-detail-section",children:e.jsx("div",{className:"section-container",children:e.jsxs(r.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4},className:"pg-detail",children:[e.jsxs(r.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.1},className:"pg-detail-left",children:[e.jsx("div",{className:"pg-detail-img",children:e.jsx("img",{loading:"lazy",src:a.image||m,alt:a.title})}),e.jsxs("div",{className:"pg-meta-grid",children:[a.date&&e.jsxs("div",{className:"pg-meta-item",children:[e.jsx(n,{sx:{fontSize:"1rem",color:"#8b4513"}}),e.jsxs("div",{children:[e.jsx("span",{className:"pg-meta-label",children:"Date"}),e.jsx("span",{className:"pg-meta-value",children:new Date(a.date).toLocaleDateString()})]})]}),a.duration&&e.jsxs("div",{className:"pg-meta-item",children:[e.jsx(b,{sx:{fontSize:"1rem",color:"#8b4513"}}),e.jsxs("div",{children:[e.jsx("span",{className:"pg-meta-label",children:"Duration"}),e.jsxs("span",{className:"pg-meta-value",children:[a?.sessions||0," sessions (",a.duration," hrs)"]})]})]}),a.location&&e.jsxs("div",{className:"pg-meta-item",children:[e.jsx(d,{sx:{fontSize:"1rem",color:"#8b4513"}}),e.jsxs("div",{children:[e.jsx("span",{className:"pg-meta-label",children:"Location"}),e.jsx("span",{className:"pg-meta-value",children:a.location})]})]}),a.participants&&e.jsxs("div",{className:"pg-meta-item",children:[e.jsx(y,{sx:{fontSize:"1rem",color:"#8b4513"}}),e.jsxs("div",{children:[e.jsx("span",{className:"pg-meta-label",children:"Participants"}),e.jsxs("span",{className:"pg-meta-value",children:["Limited to ",a.participants]})]})]})]})]}),e.jsxs(r.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},transition:{duration:.5,delay:.2},className:"pg-detail-right",children:[e.jsx("div",{className:"pg-detail-badges",children:a.isFeatured&&e.jsx(N,{sx:{background:"#cd853f",color:"#1a0e05",fontWeight:700,fontSize:"0.625rem"},children:"Featured"})}),e.jsx("h2",{className:"pg-detail-title",children:a.title}),e.jsx("p",{className:"pg-detail-desc",children:a.description}),a.modules&&a.modules.trim()&&e.jsxs("div",{className:"pg-modules",children:[e.jsx("h4",{className:"pg-modules-heading",children:"Program Modules"}),e.jsx("div",{className:"pg-modules-list",children:a.modules.split(`
`).filter(Boolean).map((i,t)=>e.jsxs(r.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{duration:.3,delay:.3+t*.05},className:"pg-module",children:[e.jsx("span",{className:"pg-module-num",children:String(t+1).padStart(2,"0")}),e.jsx("span",{className:"pg-module-text",children:i})]},t))})]}),a.link&&a.link!==","&&e.jsxs(r.button,{whileHover:{scale:1.03,y:-2},whileTap:{scale:.97},onClick:()=>window.open(a.link,"_blank"),className:"pg-btn-gold",children:["Register Now ",e.jsx(j,{style:{fontSize:"0.9375rem"}})]})]})]})})}),e.jsx("section",{className:"pg-section-cream",children:e.jsxs("div",{className:"section-container",children:[e.jsxs(r.div,{...g,transition:{duration:.5},className:"pg-section-header",children:[e.jsx("p",{className:"pg-label",children:"Explore More"}),e.jsx("h2",{className:"pg-heading",children:a?"Other Programs":"All Programs"}),e.jsx("p",{className:"pg-sub",children:"Join our upcoming workshops and seminars"})]}),e.jsx("div",{className:"pg-grid",children:x.map((i,t)=>e.jsx(r.div,{...g,transition:S(t),children:e.jsxs("div",{className:"pg-card group",onClick:()=>u(i.id),children:[e.jsxs("div",{className:"pg-card-img",children:[e.jsx("img",{loading:"lazy",src:i.image||m,alt:i.title,className:"w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"}),e.jsxs("div",{className:"pg-card-overlay",children:[e.jsxs("span",{className:"pg-card-date",children:[e.jsx(n,{style:{width:"0.6875rem",height:"0.6875rem"}}),i.date?new Date(i.date).toLocaleDateString():"TBD"]}),i.location&&e.jsxs("span",{className:"pg-card-loc",children:[e.jsx(d,{style:{width:"0.6875rem",height:"0.6875rem"}}),i.location]})]})]}),e.jsxs("div",{className:"pg-card-body",children:[e.jsx("h3",{className:"pg-card-title",children:i.title}),e.jsx("p",{className:"pg-card-desc",children:i.description}),e.jsxs("span",{className:"pg-card-link",children:["View Details ",e.jsx(v,{style:{fontSize:"0.875rem"}})]})]})]})},i.id))})]})}),e.jsx("style",{children:`
        .pg-loader { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; gap: 0.75rem; }
        .pg-spinner { width: 2rem; height: 2rem; border-radius: 50%; border: 2px solid #f0ebe4; border-top-color: #8b4513; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .pg-loader p { font-size: 0.8125rem; color: rgba(139,69,19,0.4); }

        /* Hero */
        .pg-hero { position: relative; background: #0f0906; overflow: hidden; padding: 4.5rem 0 4rem; }
        .pg-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,9,6,0.92) 0%, rgba(61,30,8,0.8) 50%, rgba(139,69,19,0.55) 100%); }
        .pg-hero-title { font-size: clamp(1.75rem, 5vw, 3rem); font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .pg-hero-desc { font-size: clamp(0.8125rem, 2vw, 0.9375rem); color: rgba(255,255,255,0.5); max-width: 32rem; line-height: 1.75; }

        /* Detail section */
        .pg-detail-section { padding: 3.5rem 0; background: #fff; }
        .pg-detail { display: grid; grid-template-columns: 1fr 1.2fr; gap: 2.5rem; align-items: start; }
        .pg-detail-left {}
        .pg-detail-right {}

        .pg-detail-img { border-radius: 0.75rem; overflow: hidden; aspect-ratio: 16/10; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .pg-detail-img img { width: 100%; height: 100%; object-fit: cover; }

        .pg-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.625rem; margin-top: 1rem; }
        .pg-meta-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.625rem 0.75rem; background: #faf8f5; border-radius: 0.5rem; border: 1px solid #f0ebe4; }
        .pg-meta-label { display: block; font-size: 0.5625rem; text-transform: uppercase; letter-spacing: 0.1em; color: #8b7355; font-weight: 600; font-family: 'DM Sans', sans-serif; }
        .pg-meta-value { display: block; font-size: 0.8125rem; font-weight: 600; color: #1a0e05; }

        .pg-detail-badges { margin-bottom: 0.75rem; }
        .pg-detail-title { font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 700; color: #1a0e05; line-height: 1.2; margin-bottom: 1rem; }
        .pg-detail-desc { font-size: 0.9375rem; color: #52525b; line-height: 1.8; margin-bottom: 1.5rem; white-space: pre-line; }

        /* Modules */
        .pg-modules { margin-bottom: 1.75rem; padding: 1.25rem; background: #faf8f5; border-radius: 0.75rem; border: 1px solid #f0ebe4; }
        .pg-modules-heading { font-weight: 700; font-size: 0.875rem; color: #1a0e05; margin-bottom: 0.75rem; }
        .pg-modules-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .pg-module { display: flex; align-items: flex-start; gap: 0.625rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(240,235,228,0.6); }
        .pg-module:last-child { border-bottom: none; }
        .pg-module-num { font-size: 0.6875rem; font-weight: 700; color: #cd853f; font-family: 'DM Sans', sans-serif; flex-shrink: 0; min-width: 1.25rem; }
        .pg-module-text { font-size: 0.8125rem; color: #52525b; line-height: 1.55; }

        .pg-btn-gold { display: inline-flex; align-items: center; gap: 0.375rem; background: #cd853f; color: #1a0e05; font-weight: 700; padding: 0.75rem 2rem; font-size: 0.8125rem; font-family: 'DM Sans', sans-serif; border-radius: 2rem; border: none; cursor: pointer; }

        /* Shared */
        .pg-label { font-size: 0.6875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; color: #b08968; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.375rem; }
        .pg-section-cream { padding: 3.5rem 0; background: #faf8f5; }
        .pg-section-header { text-align: center; margin-bottom: 2.5rem; }
        .pg-heading { font-size: clamp(1.375rem, 3.5vw, 2.125rem); font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .pg-sub { font-size: 0.875rem; color: #8b7355; max-width: 26rem; margin: 0 auto; }

        /* Cards */
        .pg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .pg-card { border-radius: 0.75rem; overflow: hidden; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); background: #fff; border: 1px solid #f0ebe4; height: 100%; display: flex; flex-direction: column; }
        .pg-card:hover { box-shadow: 0 12px 32px rgba(109,58,31,0.1); transform: translateY(-4px); }
        .pg-card-img { height: 11rem; overflow: hidden; position: relative; flex-shrink: 0; }
        .pg-card-overlay { position: absolute; bottom: 0; left: 0; right: 0; display: flex; gap: 0.625rem; padding: 0.5rem 0.75rem; background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
        .pg-card-date, .pg-card-loc { display: flex; align-items: center; gap: 0.25rem; color: rgba(255,255,255,0.85); font-size: 0.625rem; font-family: 'DM Sans', sans-serif; font-weight: 500; }
        .pg-card-body { padding: 1rem; display: flex; flex-direction: column; flex: 1; }
        .pg-card-title { font-size: 0.9375rem; font-weight: 700; color: #1a0e05; margin-bottom: 0.375rem; }
        .pg-card-desc { font-size: 0.8125rem; color: #71717a; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0.75rem; flex: 1; }
        .pg-card-link { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 600; color: #6d3a1f; font-family: 'DM Sans', sans-serif; transition: gap 0.2s; }
        .pg-card:hover .pg-card-link { gap: 0.5rem; }

        /* Mobile */
        @media (max-width: 1024px) {
          .pg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .pg-hero { padding: 3.5rem 0 3rem; }
          .pg-detail-section { padding: 2.5rem 0; }
          .pg-detail { grid-template-columns: 1fr; gap: 1.5rem; }
          .pg-detail-img { aspect-ratio: 16/9; }
          .pg-section-cream { padding: 2.75rem 0; }
          .pg-section-header { margin-bottom: 1.75rem; }
          .pg-grid { grid-template-columns: repeat(2, 1fr); }
          .pg-card-img { height: 9rem; }
        }
        @media (max-width: 560px) {
          .pg-hero { padding: 3rem 0 2.5rem; }
          .pg-meta-grid { grid-template-columns: 1fr; }
          .pg-grid { grid-template-columns: 1fr; }
          .pg-card-img { height: 10rem; }
        }
      `})]})};export{C as default};
