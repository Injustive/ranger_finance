import{l as e,m as c}from"./chunk-NF4WCJZY.js";import{ya as o}from"./chunk-HUAJDUGD.js";import{h as n,n as t}from"./chunk-SXSSBWAU.js";n();t();var i=5,a=c.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    svg {
      fill: white;
    }
  }
  svg {
    fill: ${o.colors.legacy.textDiminished};
    transition: fill 200ms ease;
  }
  padding: ${i}px;
  margin: -${i}px;
  ${r=>r.isActive&&e`
      svg {
        fill: white;
      }
    `}
`,p=c(a).attrs(r=>({diameter:r.diameter??28}))`
  height: ${r=>r.diameter}px;
  min-width: ${r=>r.diameter}px;
  transition: background-color 200ms ease;
  border-radius: 50%;
  background-color: ${r=>r.backgroundColor||""};

  :hover {
    background-color: ${o.colors.legacy.areaAccent};
  }
  ${r=>r.isActive&&e`
      background-color: ${o.colors.legacy.areaAccent};
    `}
`;export{i as a,a as b,p as c};
//# sourceMappingURL=chunk-FTMFHTMX.js.map
