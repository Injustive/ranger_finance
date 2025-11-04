import{a as s,c as f}from"./chunk-W3L4NJ2F.js";import{a as T}from"./chunk-45R3KPTK.js";import"./chunk-FX5HHNJI.js";import{H as I,ya as b}from"./chunk-4QKXPLD7.js";import"./chunk-YHBVYGVK.js";import"./chunk-5PSMATJ6.js";import"./chunk-GAZ6S2JL.js";import"./chunk-BRNBO5CW.js";import"./chunk-NOEGQPO4.js";import"./chunk-ZOSQCFZI.js";import"./chunk-S2U2M74Z.js";import"./chunk-GQWEBF5F.js";import"./chunk-T5Z6UNYJ.js";import"./chunk-B5QR6YXS.js";import"./chunk-PRRDOZZN.js";import"./chunk-WJGU35II.js";import"./chunk-NHAVVXOV.js";import"./chunk-2BZYLIYT.js";import"./chunk-VGSD3HGK.js";import"./chunk-XCF46LSQ.js";import"./chunk-WSQ7DJRP.js";import"./chunk-Y5G35CJ3.js";import"./chunk-GWN4TKCT.js";import"./chunk-ME2M2M3E.js";import"./chunk-VFRN3JHE.js";import"./chunk-MRNT3JR7.js";import"./chunk-FTMFHTMX.js";import"./chunk-G7SUPDIB.js";import"./chunk-NF3CQLHB.js";import"./chunk-JHOWMCAF.js";import"./chunk-MTFI7Z6Z.js";import"./chunk-E5TK5K23.js";import"./chunk-KU4NYJ65.js";import"./chunk-TZQSBP6H.js";import"./chunk-GKHH5GNI.js";import"./chunk-MGZWMRRY.js";import"./chunk-J4EMQFBO.js";import"./chunk-YTR3MBED.js";import"./chunk-FF2UM7NZ.js";import"./chunk-KDUIOG25.js";import"./chunk-QZM2WVGA.js";import"./chunk-4APBQPA6.js";import{c as h,d as C}from"./chunk-XLGDZEPU.js";import{db as l,m as o}from"./chunk-NF4WCJZY.js";import"./chunk-7XT6ZBFT.js";import"./chunk-6T44YMNA.js";import"./chunk-XAXP5QQK.js";import"./chunk-JRXOTVYG.js";import"./chunk-CDGG3G3C.js";import"./chunk-VQ7QS3TU.js";import"./chunk-627GUZ7R.js";import"./chunk-XO3ZXIMS.js";import"./chunk-OKPBXZFL.js";import"./chunk-LN2IIXED.js";import"./chunk-GDQEBDFS.js";import"./chunk-ONXNUG5Z.js";import{Zb as c,dc as y,sc as g}from"./chunk-ZKZ45RUP.js";import"./chunk-SQ25X4DP.js";import{Ca as B,X as x,c as D,ya as a}from"./chunk-HUAJDUGD.js";import"./chunk-FURBY5ME.js";import"./chunk-JQQEIQFI.js";import"./chunk-2XAH4CUH.js";import{f as v,h as u,n as d}from"./chunk-SXSSBWAU.js";u();d();var n=v(D());var M=o.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
`,P=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`,N=o(l).attrs({size:28,weight:500,color:a.colors.legacy.textBase})`
  margin: 16px;
`,S=o(l).attrs({size:14,weight:400,lineHeight:17,color:a.colors.legacy.textDiminished})`
  max-width: 275px;

  span {
    color: white;
  }
`,V=({networkId:t,token:r})=>{let{t:i}=x(),{handleHideModalVisibility:m}=b(),p=(0,n.useCallback)(()=>{m("insufficientBalance")},[m]),w=t&&y(g(c.getChainID(t))),{canBuy:k,openBuy:F}=I({caip19:w||"",context:"modal",analyticsEvent:"fiatOnrampFromInsufficientBalance"}),e=t?c.getTokenSymbol(t):i("tokens");return n.default.createElement(M,null,n.default.createElement("div",null,n.default.createElement(P,null,n.default.createElement(T,{type:"failure",backgroundWidth:75}),n.default.createElement(N,null,i("insufficientBalancePrimaryText",{tokenSymbol:e})),n.default.createElement(S,null,i("insufficientBalanceSecondaryText",{tokenSymbol:e})),r?n.default.createElement(B,{borderRadius:8,gap:1,marginTop:32,width:"100%"},n.default.createElement(s,{label:i("insufficientBalanceRemaining")},n.default.createElement(f,{color:a.colors.legacy.spotNegative},`${r.balance} ${e}`)),n.default.createElement(s,{label:i("insufficientBalanceRequired")},n.default.createElement(f,null,`${r.required} ${e}`))):null)),k?n.default.createElement(C,{primaryText:i("buyAssetInterpolated",{tokenSymbol:e}),onPrimaryClicked:F,secondaryText:i("commandCancel"),onSecondaryClicked:p}):n.default.createElement(h,{onClick:p},i("commandCancel")))},L=V;export{V as InsufficientBalance,L as default};
//# sourceMappingURL=InsufficientBalance-WPG4ANSD.js.map
