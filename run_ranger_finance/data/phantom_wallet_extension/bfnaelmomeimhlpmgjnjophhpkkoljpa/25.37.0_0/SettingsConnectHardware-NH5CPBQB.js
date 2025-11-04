import{a as D,b as L,d as N,e as F,h as G}from"./chunk-H24TBVE2.js";import{a as S}from"./chunk-CWGCGF5E.js";import"./chunk-45R3KPTK.js";import{a as O}from"./chunk-7NY3WXUK.js";import"./chunk-5OQMDRIG.js";import"./chunk-SX5DG6SG.js";import"./chunk-RVJRRJGL.js";import"./chunk-PCADLIKV.js";import"./chunk-4QKXPLD7.js";import"./chunk-YHBVYGVK.js";import"./chunk-5PSMATJ6.js";import"./chunk-GAZ6S2JL.js";import"./chunk-BRNBO5CW.js";import"./chunk-NOEGQPO4.js";import"./chunk-ZOSQCFZI.js";import{a as _}from"./chunk-S2U2M74Z.js";import"./chunk-GQWEBF5F.js";import"./chunk-T5Z6UNYJ.js";import"./chunk-B5QR6YXS.js";import"./chunk-PRRDOZZN.js";import"./chunk-WJGU35II.js";import"./chunk-NHAVVXOV.js";import"./chunk-2BZYLIYT.js";import"./chunk-VGSD3HGK.js";import{d as T}from"./chunk-XCF46LSQ.js";import"./chunk-WSQ7DJRP.js";import{b as u}from"./chunk-Y5G35CJ3.js";import"./chunk-GWN4TKCT.js";import"./chunk-JSAK7OIZ.js";import"./chunk-ME2M2M3E.js";import{a as f}from"./chunk-JZ2VJH3Q.js";import"./chunk-VFRN3JHE.js";import"./chunk-MRNT3JR7.js";import"./chunk-FTMFHTMX.js";import"./chunk-SFOFOQQL.js";import"./chunk-G7SUPDIB.js";import"./chunk-NF3CQLHB.js";import"./chunk-JHOWMCAF.js";import"./chunk-MTFI7Z6Z.js";import"./chunk-E5TK5K23.js";import"./chunk-KU4NYJ65.js";import"./chunk-TZQSBP6H.js";import"./chunk-GKHH5GNI.js";import"./chunk-MGZWMRRY.js";import"./chunk-J4EMQFBO.js";import"./chunk-YTR3MBED.js";import"./chunk-FF2UM7NZ.js";import"./chunk-KDUIOG25.js";import"./chunk-QZM2WVGA.js";import"./chunk-4APBQPA6.js";import"./chunk-XLGDZEPU.js";import{m as s,v as $}from"./chunk-NF4WCJZY.js";import"./chunk-7XT6ZBFT.js";import"./chunk-6T44YMNA.js";import"./chunk-XAXP5QQK.js";import"./chunk-JRXOTVYG.js";import"./chunk-CDGG3G3C.js";import"./chunk-VQ7QS3TU.js";import"./chunk-627GUZ7R.js";import"./chunk-XO3ZXIMS.js";import"./chunk-OKPBXZFL.js";import{Qa as v,Xa as B}from"./chunk-LN2IIXED.js";import"./chunk-GDQEBDFS.js";import"./chunk-ONXNUG5Z.js";import"./chunk-ZKZ45RUP.js";import"./chunk-SQ25X4DP.js";import{Ia as E,Ma as P,c as H,ya as e}from"./chunk-HUAJDUGD.js";import"./chunk-FURBY5ME.js";import"./chunk-JQQEIQFI.js";import"./chunk-2XAH4CUH.js";import{f as b,h as n,n as i}from"./chunk-SXSSBWAU.js";n();i();var t=b(H());n();i();var a=b(H());n();i();var I=s(u)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  transition: background-color 200ms ease;
  background-color: ${o=>o.$isExpanded?e.colors.legacy.black:e.colors.legacy.elementAccent} !important;
  :hover {
    background-color: ${e.colors.legacy.gray};
    svg {
      fill: white;
    }
  }
  svg {
    fill: ${o=>o.$isExpanded?"white":e.colors.legacy.textDiminished};
    transition: fill 200ms ease;
    position: relative;
    ${o=>o.top?`top: ${o.top}px;`:""}
    ${o=>o.right?`right: ${o.right}px;`:""}
  }
`;var V=s(_).attrs({justify:"space-between"})`
  background-color: ${e.colors.legacy.areaBase};
  padding: 10px 16px;
  border-bottom: 1px solid ${e.colors.legacy.borderDiminished};
  height: 46px;
  opacity: ${o=>o.opacity??"1"};
`,q=s.div`
  display: flex;
  margin-left: 10px;
  > * {
    margin-right: 10px;
  }
`,M=s.div`
  width: 24px;
  height: 24px;
`,W=({onBackClick:o,totalSteps:c,currentStepIndex:l,isHidden:m,showBackButtonOnFirstStep:r,showBackButton:h=!0})=>a.default.createElement(V,{opacity:m?0:1},h&&(r||l!==0)?a.default.createElement(I,{right:1,onClick:o},a.default.createElement($,null)):a.default.createElement(M,null),a.default.createElement(q,null,D(c).map(p=>{let d=p<=l?e.colors.legacy.spotBase:e.colors.legacy.elementAccent;return a.default.createElement(u,{key:p,diameter:12,color:d})})),a.default.createElement(M,null));n();i();var K=()=>{let{mutateAsync:o}=B(),{hardwareStepStack:c,pushStep:l,popStep:m,currentStep:r,setOnConnectHardwareAccounts:h,setOnConnectHardwareDone:x,setExistingAccounts:p}=L(),{data:d=[],isFetched:k,isError:y}=v(),g=T(c,(C,U)=>C?.length===U.length),X=c.length>(g??[]).length,A=g?.length===0,j={initial:{x:A?0:X?150:-150,opacity:A?1:0},animate:{x:0,opacity:1},exit:{opacity:0},transition:{duration:.2}},J=(0,t.useCallback)(()=>{r()?.props.preventBack||(r()?.props.onBackCallback&&r()?.props.onBackCallback?.(),m())},[r,m]);return O(()=>{h(async C=>{await o(C),await f.set(S,!await f.get(S))}),x(()=>self.close()),l(t.default.createElement(G,null))},c.length===0),(0,t.useEffect)(()=>{p({data:d,isFetched:k,isError:y})},[d,k,y,p]),t.default.createElement(N,null,t.default.createElement(W,{totalSteps:3,onBackClick:J,showBackButton:!r()?.props.preventBack,currentStepIndex:c.length-1}),t.default.createElement(E,{mode:"wait"},t.default.createElement(P.div,{style:{display:"flex",flexGrow:1},key:`${c.length}_${g?.length}`,...j},t.default.createElement(F,null,r()))))},Po=K;export{Po as default};
//# sourceMappingURL=SettingsConnectHardware-NH5CPBQB.js.map
