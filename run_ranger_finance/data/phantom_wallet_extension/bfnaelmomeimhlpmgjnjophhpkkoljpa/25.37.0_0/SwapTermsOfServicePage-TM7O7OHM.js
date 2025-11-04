import{ya as g}from"./chunk-4QKXPLD7.js";import"./chunk-YHBVYGVK.js";import"./chunk-5PSMATJ6.js";import"./chunk-GAZ6S2JL.js";import"./chunk-BRNBO5CW.js";import"./chunk-NOEGQPO4.js";import"./chunk-ZOSQCFZI.js";import"./chunk-S2U2M74Z.js";import"./chunk-GQWEBF5F.js";import"./chunk-T5Z6UNYJ.js";import"./chunk-B5QR6YXS.js";import"./chunk-PRRDOZZN.js";import"./chunk-WJGU35II.js";import"./chunk-NHAVVXOV.js";import"./chunk-2BZYLIYT.js";import"./chunk-VGSD3HGK.js";import"./chunk-XCF46LSQ.js";import"./chunk-WSQ7DJRP.js";import"./chunk-Y5G35CJ3.js";import"./chunk-GWN4TKCT.js";import"./chunk-ME2M2M3E.js";import"./chunk-VFRN3JHE.js";import"./chunk-MRNT3JR7.js";import"./chunk-FTMFHTMX.js";import{Ma as u,Yb as y}from"./chunk-G7SUPDIB.js";import"./chunk-NF3CQLHB.js";import"./chunk-JHOWMCAF.js";import"./chunk-MTFI7Z6Z.js";import"./chunk-E5TK5K23.js";import"./chunk-KU4NYJ65.js";import"./chunk-TZQSBP6H.js";import"./chunk-GKHH5GNI.js";import"./chunk-MGZWMRRY.js";import"./chunk-J4EMQFBO.js";import"./chunk-YTR3MBED.js";import"./chunk-FF2UM7NZ.js";import"./chunk-KDUIOG25.js";import"./chunk-QZM2WVGA.js";import"./chunk-4APBQPA6.js";import{d as w}from"./chunk-XLGDZEPU.js";import{db as s,fa as T,m as r}from"./chunk-NF4WCJZY.js";import"./chunk-7XT6ZBFT.js";import"./chunk-6T44YMNA.js";import{b as S}from"./chunk-XAXP5QQK.js";import"./chunk-JRXOTVYG.js";import"./chunk-CDGG3G3C.js";import"./chunk-VQ7QS3TU.js";import"./chunk-627GUZ7R.js";import"./chunk-XO3ZXIMS.js";import"./chunk-OKPBXZFL.js";import"./chunk-LN2IIXED.js";import"./chunk-GDQEBDFS.js";import"./chunk-ONXNUG5Z.js";import"./chunk-ZKZ45RUP.js";import"./chunk-SQ25X4DP.js";import{X as f,c as x,x as p,y as d,ya as i}from"./chunk-HUAJDUGD.js";import"./chunk-FURBY5ME.js";import"./chunk-JQQEIQFI.js";import"./chunk-2XAH4CUH.js";import{f as C,h as l,n as m}from"./chunk-SXSSBWAU.js";l();m();var e=C(x());var O=r.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: 16px;
`,h=r.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -20px;
`,k=r(s).attrs({size:28,weight:500,color:i.colors.legacy.textBase})`
  margin-top: 24px;
`,b=r(s).attrs({size:16,weight:500,color:i.colors.legacy.textDiminished})`
  padding: 0px 5px;
  margin-top: 9px;
  span {
    color: ${i.colors.legacy.textBase};
  }
  label {
    color: ${i.colors.legacy.spotBase};
    cursor: pointer;
  }
`,P=r.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`,A=r.div`
  margin-top: auto;
  width: 100%;
`,B=()=>{let{t:n}=f(),{mutateAsync:t}=y(),{handleHideModalVisibility:o,handleShowModalVisibility:a}=g(),v=(0,e.useCallback)(()=>{a("swapConfirmation",void 0,{event:"showSwapModal",payload:{data:{uiContext:"SwapConfirmation"}}}),o("swapTermsOfService")},[a,o]),c=u({goToConfirmation:v});return{onAgreeClick:(0,e.useCallback)(()=>{t(!0),c()},[t,c]),onCancelClick:()=>{o("swapTermsOfService")},t:n}},M=()=>{self.open(p,"_blank")},F=()=>{self.open(d,"_blank")},L=e.default.memo(({onAgreeClick:n,onCancelClick:t,t:o})=>e.default.createElement(O,null,e.default.createElement(h,null,e.default.createElement(P,null,e.default.createElement(T,null),e.default.createElement(k,null,o("termsOfServicePrimaryText")),e.default.createElement(b,null,e.default.createElement(S,{i18nKey:"termsOfServiceDiscliamerFeesEnabledInterpolated"},"We have revised our Terms of Service. By clicking ",e.default.createElement("span",null,'"I Agree"')," you agree to our new",e.default.createElement("label",{onClick:M},"Terms of Service"),".",e.default.createElement("br",null),e.default.createElement("br",null),"Our new Terms of Service include a new ",e.default.createElement("label",{onClick:F},"fee structure")," for certain products.")))),e.default.createElement(A,null,e.default.createElement(w,{primaryText:o("termsOfServiceActionButtonAgree"),secondaryText:o("commandCancel"),onPrimaryClicked:n,onSecondaryClicked:t})))),_=()=>{let n=B();return e.default.createElement(L,{...n})},X=_;export{_ as SwapTermsOfServicePage,X as default};
//# sourceMappingURL=SwapTermsOfServicePage-TM7O7OHM.js.map
