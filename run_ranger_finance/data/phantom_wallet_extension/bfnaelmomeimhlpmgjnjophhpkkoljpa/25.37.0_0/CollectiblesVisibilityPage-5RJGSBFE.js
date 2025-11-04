import{a as Z}from"./chunk-PDFSBA3M.js";import{a as j}from"./chunk-7SM3T22H.js";import{a as G}from"./chunk-DKEXHM37.js";import{a as U}from"./chunk-UN6B2X2G.js";import{b as F}from"./chunk-ABPIDKPU.js";import{b as $}from"./chunk-D5PRFPR2.js";import{ya as K}from"./chunk-4QKXPLD7.js";import{m as Q}from"./chunk-YHBVYGVK.js";import"./chunk-5PSMATJ6.js";import"./chunk-GAZ6S2JL.js";import"./chunk-BRNBO5CW.js";import"./chunk-NOEGQPO4.js";import"./chunk-ZOSQCFZI.js";import{a as x}from"./chunk-S2U2M74Z.js";import"./chunk-GQWEBF5F.js";import"./chunk-T5Z6UNYJ.js";import"./chunk-B5QR6YXS.js";import"./chunk-PRRDOZZN.js";import"./chunk-WJGU35II.js";import{g as B}from"./chunk-NHAVVXOV.js";import"./chunk-2BZYLIYT.js";import{a as O}from"./chunk-VGSD3HGK.js";import"./chunk-XCF46LSQ.js";import"./chunk-WSQ7DJRP.js";import"./chunk-Y5G35CJ3.js";import{a as V}from"./chunk-GWN4TKCT.js";import"./chunk-ME2M2M3E.js";import"./chunk-VFRN3JHE.js";import"./chunk-MRNT3JR7.js";import"./chunk-FTMFHTMX.js";import"./chunk-G7SUPDIB.js";import"./chunk-NF3CQLHB.js";import{$ as E,U as D,ba as A,ca as _,i as P}from"./chunk-JHOWMCAF.js";import"./chunk-MTFI7Z6Z.js";import"./chunk-E5TK5K23.js";import"./chunk-KU4NYJ65.js";import"./chunk-TZQSBP6H.js";import"./chunk-GKHH5GNI.js";import"./chunk-MGZWMRRY.js";import"./chunk-J4EMQFBO.js";import"./chunk-YTR3MBED.js";import"./chunk-FF2UM7NZ.js";import"./chunk-KDUIOG25.js";import"./chunk-QZM2WVGA.js";import"./chunk-4APBQPA6.js";import{c as z}from"./chunk-XLGDZEPU.js";import{C as N,db as y,m as s}from"./chunk-NF4WCJZY.js";import"./chunk-7XT6ZBFT.js";import"./chunk-6T44YMNA.js";import"./chunk-XAXP5QQK.js";import"./chunk-JRXOTVYG.js";import"./chunk-CDGG3G3C.js";import"./chunk-VQ7QS3TU.js";import"./chunk-627GUZ7R.js";import"./chunk-XO3ZXIMS.js";import"./chunk-OKPBXZFL.js";import{$a as W}from"./chunk-LN2IIXED.js";import"./chunk-GDQEBDFS.js";import"./chunk-ONXNUG5Z.js";import{Jd as M}from"./chunk-ZKZ45RUP.js";import"./chunk-SQ25X4DP.js";import{Hb as k,X as p,c as H,wa as v,ya as f,zb as L}from"./chunk-HUAJDUGD.js";import"./chunk-FURBY5ME.js";import"./chunk-JQQEIQFI.js";import"./chunk-2XAH4CUH.js";import{f as T,h as S,n as I}from"./chunk-SXSSBWAU.js";S();I();var t=T(H());S();I();var o=T(H());var J=v({marginLeft:4}),Y=s(x).attrs({align:"center",padding:"10px"})`
  background-color: ${f.colors.legacy.elementBase};
  border-radius: 6px;
  height: 74px;
  margin: 4px 0;
`,R=s.div`
  display: flex;
  align-items: center;
`,tt=s(O)`
  flex: 1;
  min-width: 0;
  text-align: left;
  align-items: normal;
`,et=s(y).attrs({size:16,weight:600,lineHeight:19,noWrap:!0,maxWidth:"175px",textAlign:"left"})``,ot=s(y).attrs({color:f.colors.legacy.textDiminished,size:14,lineHeight:17,noWrap:!0})`
  text-align: left;
  margin-top: 5px;
`,it=s.div`
  width: 55px;
  min-width: 55px;
  max-width: 55px;
  height: 55px;
  min-height: 55px;
  max-height: 55px;
  aspect-ratio: 1;
  margin-right: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`,X=o.default.memo(e=>{let{t:n}=p(),{collection:i,unknownItem:m,isHidden:r,isSpam:a,onToggleHidden:d}=e,{name:c,id:g}=i,l=A(i),h=l?.chainData,C=_(i),u=E(l?.media,"image",!1,"small"),b=c||l?.name||m;return o.default.createElement(Y,null,o.default.createElement(it,null,a&&r?o.default.createElement(Z,{width:32}):u?o.default.createElement(F,{uri:u}):P(h)?o.default.createElement(j,{...h.utxoDetails}):o.default.createElement($,{type:"image",width:42})),o.default.createElement(x,null,o.default.createElement(tt,null,o.default.createElement(R,null,o.default.createElement(et,null,b),a?o.default.createElement(N,{className:J,fill:f.colors.legacy.spotWarning,height:16,width:16}):null),o.default.createElement(ot,null,n("collectiblesSearchNrOfItems",{nrOfItems:C})))),o.default.createElement(U,{id:g,label:`${c} visible`,checked:!r,onChange:w=>{d(w.target.checked?"show":"hide")}}))});var nt=74,lt=10,st=nt+lt,rt=20,at=s.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,mt=s.div`
  position: relative;
  width: 100%;
`,ct=()=>{let{handleHideModalVisibility:e}=K(),{data:n,isPending:i}=W(),{viewState:m,viewStateLoading:r}=D({account:n}),a=(0,t.useCallback)(()=>e("collectiblesVisibility"),[e]),d=(0,t.useMemo)(()=>({...m,handleCloseModal:a}),[a,m]),c=(0,t.useMemo)(()=>i||r,[i,r]);return{data:d,loading:c}},dt=t.default.memo(e=>{let{t:n}=p(),i=(0,t.useRef)(null);return(0,t.useEffect)(()=>{setTimeout(()=>i.current?.focus(),200)},[]),t.default.createElement(t.default.Fragment,null,t.default.createElement(mt,null,t.default.createElement(B,{ref:i,tabIndex:0,placeholder:n("assetListSearch"),maxLength:M,onChange:e.handleSearch,value:e.searchQuery,name:"Search collectibles"})),t.default.createElement(Q,null,t.default.createElement(L,null,({height:m,width:r})=>t.default.createElement(k,{style:{padding:`${rt}px 0`},scrollToIndex:e.searchQuery!==e.debouncedSearchQuery?0:void 0,height:m,width:r,rowCount:e.listItems.length,rowHeight:st,rowRenderer:a=>t.default.createElement(pt,{...a,data:e.listItems,unknownItem:n("assetListUnknownToken"),getIsHidden:e.getIsHidden,getIsSpam:e.getIsSpam,getSpamStatus:e.getSpamStatus,onToggleHidden:e.onToggleHidden})}))))}),pt=e=>{let{index:n,data:i,style:m,unknownItem:r,getIsHidden:a,getIsSpam:d,getSpamStatus:c,onToggleHidden:g}=e,l=i[n],h=a(l),C=d(l),u=c(l),b=(0,t.useCallback)(w=>g({item:l,status:w}),[g,l]);return t.default.createElement("div",{style:m},t.default.createElement(X,{collection:l,unknownItem:r,isHidden:h,isSpam:C,spamStatus:u,onToggleHidden:b}))},gt=()=>{let{data:e,loading:n}=ct(),{t:i}=p();return t.default.createElement(at,null,n?t.default.createElement(G,null):t.default.createElement(dt,{...e}),t.default.createElement(V,null,t.default.createElement(z,{onClick:e.handleCloseModal},i("commandClose"))))},$t=gt;export{gt as CollectiblesVisibilityPage,$t as default};
//# sourceMappingURL=CollectiblesVisibilityPage-5RJGSBFE.js.map
