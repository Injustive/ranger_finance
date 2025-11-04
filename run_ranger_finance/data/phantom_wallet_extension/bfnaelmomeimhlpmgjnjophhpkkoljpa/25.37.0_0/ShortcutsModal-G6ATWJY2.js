import{a as A,c as B}from"./chunk-4FRQGCDY.js";import{a as V}from"./chunk-STAUFNYU.js";import"./chunk-J4EMQFBO.js";import{c as G}from"./chunk-XLGDZEPU.js";import{Aa as S,Ba as p,Ca as f,Da as x,Ea as k,Fa as y,Ga as w,Ha as L,Ia as T,Ja as v,Ka as C,La as M,Ma as P,Na as b,Oa as D,Pa as W,Qa as a,Ra as F,db as O,m as o,za as g}from"./chunk-NF4WCJZY.js";import{c as d}from"./chunk-VQ7QS3TU.js";import"./chunk-627GUZ7R.js";import"./chunk-XO3ZXIMS.js";import"./chunk-OKPBXZFL.js";import"./chunk-LN2IIXED.js";import"./chunk-ONXNUG5Z.js";import"./chunk-ZKZ45RUP.js";import"./chunk-SQ25X4DP.js";import{X as u,c as l,ya as I}from"./chunk-HUAJDUGD.js";import"./chunk-FURBY5ME.js";import"./chunk-JQQEIQFI.js";import"./chunk-2XAH4CUH.js";import{f as h,h as i,n as c}from"./chunk-SXSSBWAU.js";i();c();var t=h(l());i();c();var N=h(l());var E={[V]:a,vote:L,"vote-2":T,stake:v,"stake-2":C,view:M,chat:P,tip:b,mint:D,"mint-2":W,"generic-link":a,"generic-add":F,discord:g,twitter:S,"twitter-2":p,x:p,instagram:f,telegram:x,leaderboard:w,gaming:k,"gaming-2":y};function U({icon:e,...n}){let s=E[e];return N.default.createElement(s,{...n})}var H=o.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: -16px; // compensate for generic screen margins
`,Y=o.footer`
  margin-top: auto;
  flex-shrink: 0;
  min-height: 16px;
`,_=o.div`
  overflow: scroll;
`,j=o.ul`
  flex: 1;
  max-height: 350px;
  padding-top: 16px; // compensate for the override of the generic screen margins
`,q=o.li``,J=o.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
`,K=o(O).attrs(e=>({margin:e.margin??"12px 0px"}))`
  text-align: left;
`;function Q({shortcuts:e,...n}){let{t:s}=u(),m=(0,t.useMemo)(()=>n.hostname.includes("//")?new URL(n.hostname).hostname:n.hostname,[n.hostname]);return t.default.createElement(H,null,t.default.createElement(_,null,t.default.createElement(j,null,e.map(r=>t.default.createElement(q,{key:r.uri},t.default.createElement(G,{type:"button",onClick:()=>{d.capture("walletShortcutsLinkOpenClick",A(n,r)),self.open(r.uri)},theme:"text",paddingY:6},t.default.createElement(J,null,t.default.createElement(U,{icon:B(r.uri,r.icon)})),r.label))))),t.default.createElement(Y,null,m&&t.default.createElement(K,{color:I.colors.legacy.textDiminished,size:14,lineHeight:17},s("shortcutsWarningDescription",{url:m}))))}var at=Q;export{Q as ShortcutsModal,at as default};
//# sourceMappingURL=ShortcutsModal-G6ATWJY2.js.map
