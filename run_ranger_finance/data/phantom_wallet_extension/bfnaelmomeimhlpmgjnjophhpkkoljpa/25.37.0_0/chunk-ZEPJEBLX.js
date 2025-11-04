import{a as G,c as _,d as q}from"./chunk-5PSMATJ6.js";import{b as W}from"./chunk-NOEGQPO4.js";import{c as K}from"./chunk-T5Z6UNYJ.js";import{k as f}from"./chunk-XCF46LSQ.js";import{K as D,R as F,V as I,Z as N,aa as z,y as M}from"./chunk-E5TK5K23.js";import{$a as H,Da as B,I as E,s as L}from"./chunk-TZQSBP6H.js";import{a as U,d as O}from"./chunk-XLGDZEPU.js";import{db as n,m as a}from"./chunk-NF4WCJZY.js";import{b as V}from"./chunk-XAXP5QQK.js";import{Rb as P,y as w}from"./chunk-LN2IIXED.js";import{Q as A,R as b,U as xo,sc as k}from"./chunk-ZKZ45RUP.js";import{S as v}from"./chunk-SQ25X4DP.js";import{X as g,c as So,ya as i}from"./chunk-HUAJDUGD.js";import{f as fo,h,n as T}from"./chunk-SXSSBWAU.js";h();T();var o=fo(So());var yo=r=>{let{t}=g(),{voteAccountPubkey:l}=r,{showStakeAccountCreateAndDelegateStatusModal:Y,closeAllModals:j}=W(),J=()=>{r.onClose(),j()},{data:X}=P("solana"),{data:Z}=B(),R=Z?.totalQuantityString??"";H(X,"STAKE_FUNGIBLE");let{cluster:oo,connection:u}=E(),s=F(u),to=k("solana"),{data:eo}=L({query:{data:to}}),no=eo?.usd,e=(0,o.useMemo)(()=>s.results?.find(go=>go.voteAccountPubkey===l),[s.results,l]),io=e?.info?.name??e?.info?.keybaseUsername??w(l),ao=K(u),[m,S]=(0,o.useState)(""),d=v(m),p=A(1+(N(u).data??0)),x=I({balance:R,cluster:oo,rentExemptionMinimum:p}),ro=()=>S(x.toString()),so=d.isLessThan(p),lo=d.isGreaterThan(x),mo=d.isFinite(),c=m&&so?t("validatorViewAmountSOLRequiredToStakeInterpolated",{amount:p}):m&&lo?t("validatorViewInsufficientBalance"):"",co=ao.isPending,y=mo&&!c&&!co,uo=()=>{Y({lamports:b(d).toNumber(),votePubkey:l,usdPerSol:no,onClose:J,validatorName:io})},{data:C=null}=z(),po=C?D(C,e?.commission??0):null;return o.default.createElement(Co,null,s.isPending?o.default.createElement(U,null):s.isError||!e?o.default.createElement(o.default.Fragment,null,o.default.createElement(f,null,t("validatorViewPrimaryText")),o.default.createElement(Q,null,o.default.createElement(n,{size:16,color:i.colors.legacy.textDiminished,lineHeight:20},t("validatorViewErrorFetching")," ",s.error?.message??""))):o.default.createElement(o.default.Fragment,null,o.default.createElement(f,null,t("validatorViewPrimaryText")),o.default.createElement(Q,null,o.default.createElement(n,{size:16,color:i.colors.legacy.textDiminished,lineHeight:20,margin:"0 0 20px 0"},o.default.createElement(V,{i18nKey:"validatorViewDescriptionInterpolated"},"Choose how much SOL you\u2019d like to ",o.default.createElement("br",null),"stake with this validator. ",o.default.createElement($,{href:M},"Learn more"))),o.default.createElement(G,{value:m,symbol:"SOL",alignSymbol:"right",buttonText:t("maxInputMax"),width:47,warning:!!c,onSetTarget:ro,onUserInput:S}),o.default.createElement(To,null,o.default.createElement(n,{color:c?i.colors.legacy.spotNegative:"transparent",size:16,textAlign:"left"},c)),o.default.createElement(Ao,{onEdit:r.onClose}),o.default.createElement(_,{identifier:e.voteAccountPubkey,name:e.info?.name,keybaseUsername:e.info?.keybaseUsername,iconUrl:e.info?.iconUrl,website:e.info?.website,data:[{label:t("validatorCardEstimatedApy"),value:o.default.createElement(n,{textAlign:"right",weight:500,size:14,noWrap:!0},po,"%")},{label:t("validatorCardCommission"),value:o.default.createElement(n,{textAlign:"right",weight:500,size:14,noWrap:!0},e.commission,"%")},{label:t("validatorCardTotalStake"),value:o.default.createElement(n,{textAlign:"right",weight:500,size:14,noWrap:!0},o.default.createElement(q,null,e.activatedStake))}]})),o.default.createElement(ho,null,o.default.createElement(O,{primaryText:t("validatorViewActionButtonStake"),secondaryText:t("commandClose"),onPrimaryClicked:uo,onSecondaryClicked:r.onClose,primaryTheme:y?"primary":"default",primaryDisabled:!y}))))},ot=yo,Co=a.div`
  display: grid;
  grid-template-rows: 42px auto 47px;
  height: 100%;
`,Q=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`,$=a.a.attrs({target:"_blank",rel:"noopener noreferrer"})`
  color: ${i.colors.legacy.spotBase};
  text-decoration: none;
  cursor: pointer;
`,ho=a.section`
  display: flex;
  gap: 15px;
`,To=a.div`
  width: 100%;
`,vo=a(n)`
  width: 100%;
  margin-top: 15px;
  > a {
    color: ${i.colors.legacy.spotBase};
    cursor: pointer;
  }
`,Ao=r=>{let{t}=g();return o.default.createElement(vo,{size:16,color:i.colors.legacy.textDiminished,lineHeight:20,textAlign:"left"},t("validatorViewValidator")," \u2022 ",o.default.createElement($,{onClick:r.onEdit},t("commandEdit")))};export{yo as a,ot as b};
//# sourceMappingURL=chunk-ZEPJEBLX.js.map
