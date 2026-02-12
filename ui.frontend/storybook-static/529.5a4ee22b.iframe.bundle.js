"use strict";(self.webpackChunkaem_maven_archetype=self.webpackChunkaem_maven_archetype||[]).push([[529],{"./node_modules/@storybook/addon-essentials/dist/actions/preview.mjs":(function(rt,C,m){m.r(C),m.d(C,{argsEnhancers:function(){return p},loaders:function(){return ot}});var L=m("storybook/internal/preview-api"),$=m("storybook/internal/preview-errors"),k=m("@storybook/global"),I=m("./node_modules/uuid/dist/esm-browser/v4.js"),v="storybook/actions",z=`${v}/action-event`,H={depth:10,clearOnStoryChange:!0,limit:50},Y=(P,D)=>{let G=Object.getPrototypeOf(P);return!G||D(G)?G:Y(G,D)},d=P=>!!(typeof P=="object"&&P&&Y(P,D=>/^Synthetic(?:Base)?Event$/.test(D.constructor.name))&&typeof P.persist=="function"),g=P=>{if(d(P)){let D=Object.create(P.constructor.prototype,Object.getOwnPropertyDescriptors(P));D.persist();let G=Object.getOwnPropertyDescriptor(D,"view"),V=G?.value;return typeof V=="object"&&V?.constructor.name==="Window"&&Object.defineProperty(D,"view",{...G,value:Object.create(V.constructor.prototype)}),D}return P},T=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?(0,I.default)():Date.now().toString(36)+Math.random().toString(36).substring(2);function e(P,D={}){let G={...H,...D},V=function(...X){if(D.implicit){let W=("__STORYBOOK_PREVIEW__"in k.global?k.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find(w=>w.phase==="playing"||w.phase==="rendering");if(W){let w=!globalThis?.FEATURES?.disallowImplicitActionsInRenderV8,i=new $.ImplicitActionsDuringRendering({phase:W.phase,name:P,deprecated:w});if(w)console.warn(i);else throw i}}let Z=L.addons.getChannel(),x=T(),y=5,j=X.map(g),U=X.length>1?j:j[0],A={id:x,count:0,data:{name:P,args:U},options:{...G,maxDepth:y+(G.depth||3),allowFunction:G.allowFunction||!1}};Z.emit(z,A)};return V.isAction=!0,V.implicit=D.implicit,V}var b=(P,D)=>typeof D[P]>"u"&&!(P in D),c=P=>{let{initialArgs:D,argTypes:G,id:V,parameters:{actions:X}}=P;if(!X||X.disable||!X.argTypesRegex||!G)return{};let Z=new RegExp(X.argTypesRegex);return Object.entries(G).filter(([x])=>!!Z.test(x)).reduce((x,[y,j])=>(b(y,D)&&(x[y]=e(y,{implicit:!0,id:V})),x),{})},u=P=>{let{initialArgs:D,argTypes:G,parameters:{actions:V}}=P;return V?.disable||!G?{}:Object.entries(G).filter(([X,Z])=>!!Z.action).reduce((X,[Z,x])=>(b(Z,D)&&(X[Z]=e(typeof x.action=="string"?x.action:Z)),X),{})},p=[u,c],O=!1,K=P=>{let{parameters:{actions:D}}=P;if(!D?.disable&&!O&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in k.global&&typeof k.global.__STORYBOOK_TEST_ON_MOCK_CALL__=="function"){let G=k.global.__STORYBOOK_TEST_ON_MOCK_CALL__;G((V,X)=>{let Z=V.getMockName();Z!=="spy"&&(!/^next\/.*::/.test(Z)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some(x=>Z.startsWith(x)))&&e(Z)(X)}),O=!0}},ot=[K]}),"./node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs":(function(rt,C,m){m.r(C),m.d(C,{decorators:function(){return G},initialGlobals:function(){return Z},parameters:function(){return V}});var L=m("storybook/internal/preview-api"),$=m("@storybook/global"),k=m("storybook/internal/client-logger"),I=m("./node_modules/ts-dedent/esm/index.js"),v="backgrounds",z={light:{name:"light",value:"#F8F8F8"},dark:{name:"dark",value:"#333"}},{document:H,window:Y}=$.global,d=()=>!!Y?.matchMedia("(prefers-reduced-motion: reduce)")?.matches,g=x=>{(Array.isArray(x)?x:[x]).forEach(T)},T=x=>{let y=H.getElementById(x);y&&y.parentElement?.removeChild(y)},e=(x,y)=>{let j=H.getElementById(x);if(j)j.innerHTML!==y&&(j.innerHTML=y);else{let U=H.createElement("style");U.setAttribute("id",x),U.innerHTML=y,H.head.appendChild(U)}},b=(x,y,j)=>{let U=H.getElementById(x);if(U)U.innerHTML!==y&&(U.innerHTML=y);else{let A=H.createElement("style");A.setAttribute("id",x),A.innerHTML=y;let W=`addon-backgrounds-grid${j?`-docs-${j}`:""}`,w=H.getElementById(W);w?w.parentElement?.insertBefore(A,w):H.head.appendChild(A)}},c={cellSize:100,cellAmount:10,opacity:.8},u="addon-backgrounds",p="addon-backgrounds-grid",O=d()?"":"transition: background-color 0.3s;",K=(x,y)=>{let{globals:j,parameters:U,viewMode:A,id:W}=y,{options:w=z,disable:i,grid:l=c}=U[v]||{},f=j[v]||{},h=f.value,E=h?w[h]:void 0,J=E?.value||"transparent",q=f.grid||!1,R=!!E&&!i,_=A==="docs"?`#anchor--${W} .docs-story`:".sb-show-main",it=A==="docs"?`#anchor--${W} .docs-story`:".sb-show-main",dt=U.layout===void 0||U.layout==="padded",at=A==="docs"?20:dt?16:0,{cellAmount:F,cellSize:tt,opacity:st,offsetX:lt=at,offsetY:ut=at}=l,o=A==="docs"?`${u}-docs-${W}`:`${u}-color`,t=A==="docs"?W:null;(0,L.useEffect)(()=>{let a=`
    ${_} {
      background: ${J} !important;
      ${O}
      }`;if(!R){g(o);return}b(o,a,t)},[_,o,t,R,J]);let n=A==="docs"?`${p}-docs-${W}`:`${p}`;return(0,L.useEffect)(()=>{if(!q){g(n);return}let a=[`${tt*F}px ${tt*F}px`,`${tt*F}px ${tt*F}px`,`${tt}px ${tt}px`,`${tt}px ${tt}px`].join(", "),r=`
        ${it} {
          background-size: ${a} !important;
          background-position: ${lt}px ${ut}px, ${lt}px ${ut}px, ${lt}px ${ut}px, ${lt}px ${ut}px !important;
          background-blend-mode: difference !important;
          background-image: linear-gradient(rgba(130, 130, 130, ${st}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${st}) 1px, transparent 1px),
           linear-gradient(rgba(130, 130, 130, ${st/2}) 1px, transparent 1px),
           linear-gradient(90deg, rgba(130, 130, 130, ${st/2}) 1px, transparent 1px) !important;
        }
      `;e(n,r)},[F,tt,it,n,q,lt,ut,st]),x()},ot=(x,y=[],j)=>{if(x==="transparent")return"transparent";if(y.find(A=>A.value===x)||x)return x;let U=y.find(A=>A.name===j);if(U)return U.value;if(j){let A=y.map(W=>W.name).join(", ");k.logger.warn((0,I.dedent)`
        Backgrounds Addon: could not find the default color "${j}".
        These are the available colors for your story based on your configuration:
        ${A}.
      `)}return"transparent"},P=(x,y)=>{let{globals:j,parameters:U}=y,A=j[v]?.value,W=U[v],w=(0,L.useMemo)(()=>W.disable?"transparent":ot(A,W.values,W.default),[W,A]),i=(0,L.useMemo)(()=>w&&w!=="transparent",[w]),l=y.viewMode==="docs"?`#anchor--${y.id} .docs-story`:".sb-show-main",f=(0,L.useMemo)(()=>`
      ${l} {
        background: ${w} !important;
        ${d()?"":"transition: background-color 0.3s;"}
      }
    `,[w,l]);return(0,L.useEffect)(()=>{let h=y.viewMode==="docs"?`addon-backgrounds-docs-${y.id}`:"addon-backgrounds-color";if(!i){g(h);return}b(h,f,y.viewMode==="docs"?y.id:null)},[i,f,y]),x()},D=(x,y)=>{let{globals:j,parameters:U}=y,A=U[v].grid,W=j[v]?.grid===!0&&A.disable!==!0,{cellAmount:w,cellSize:i,opacity:l}=A,f=y.viewMode==="docs",h=U.layout===void 0||U.layout==="padded"?16:0,E=A.offsetX??(f?20:h),J=A.offsetY??(f?20:h),q=(0,L.useMemo)(()=>{let R=y.viewMode==="docs"?`#anchor--${y.id} .docs-story`:".sb-show-main",_=[`${i*w}px ${i*w}px`,`${i*w}px ${i*w}px`,`${i}px ${i}px`,`${i}px ${i}px`].join(", ");return`
      ${R} {
        background-size: ${_} !important;
        background-position: ${E}px ${J}px, ${E}px ${J}px, ${E}px ${J}px, ${E}px ${J}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${l}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${l}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${l/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${l/2}) 1px, transparent 1px) !important;
      }
    `},[i]);return(0,L.useEffect)(()=>{let R=y.viewMode==="docs"?`addon-backgrounds-grid-docs-${y.id}`:"addon-backgrounds-grid";if(!W){g(R);return}e(R,q)},[W,q,y]),x()},G=globalThis.FEATURES?.backgroundsStoryGlobals?[K]:[D,P],V={[v]:{grid:{cellSize:20,opacity:.5,cellAmount:5},disable:!1,...!globalThis.FEATURES?.backgroundsStoryGlobals&&{values:Object.values(z)}}},X={[v]:{value:void 0,grid:!1}},Z=globalThis.FEATURES?.backgroundsStoryGlobals?X:{[v]:null}}),"./node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs":(function(rt,C,m){var L=m("storybook/internal/core-events"),$=m("storybook/internal/preview-api"),k=m("@storybook/global"),I="storybook/highlight",v="storybookHighlight",z=`${I}/add`,H=`${I}/reset`,{document:Y}=k.global,d=(b="#FF4785",c="dashed")=>`
  outline: 2px ${c} ${b};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,g=$.addons.getChannel(),T=b=>{let c=v;e();let u=Array.from(new Set(b.elements)),p=Y.createElement("style");p.setAttribute("id",c),p.innerHTML=u.map(O=>`${O}{
          ${d(b.color,b.style)}
         }`).join(" "),Y.head.appendChild(p)},e=()=>{let b=v,c=Y.getElementById(b);c&&c.parentNode?.removeChild(c)};g.on(L.STORY_CHANGED,e),g.on(H,e),g.on(z,T)}),"./node_modules/@storybook/addon-essentials/dist/measure/preview.mjs":(function(rt,C,m){m.r(C),m.d(C,{decorators:function(){return lt},initialGlobals:function(){return ut}});var L=m("storybook/internal/preview-api"),$=m("@storybook/global"),k=!0,I="Invariant failed";function v(o,t){if(!o){if(k)throw new Error(I);var n=typeof t=="function"?t():t,a=n?"".concat(I,": ").concat(n):I;throw new Error(a)}}var z="measureEnabled";function H(){let o=$.global.document.documentElement,t=Math.max(o.scrollHeight,o.offsetHeight);return{width:Math.max(o.scrollWidth,o.offsetWidth),height:t}}function Y(){let o=$.global.document.createElement("canvas");o.id="storybook-addon-measure";let t=o.getContext("2d");v(t!=null);let{width:n,height:a}=H();return d(o,t,{width:n,height:a}),o.style.position="absolute",o.style.left="0",o.style.top="0",o.style.zIndex="2147483647",o.style.pointerEvents="none",$.global.document.body.appendChild(o),{canvas:o,context:t,width:n,height:a}}function d(o,t,{width:n,height:a}){o.style.width=`${n}px`,o.style.height=`${a}px`;let r=$.global.window.devicePixelRatio;o.width=Math.floor(n*r),o.height=Math.floor(a*r),t.scale(r,r)}var g={};function T(){g.canvas||(g=Y())}function e(){g.context&&g.context.clearRect(0,0,g.width??0,g.height??0)}function b(o){e(),o(g.context)}function c(){v(g.canvas,"Canvas should exist in the state."),v(g.context,"Context should exist in the state."),d(g.canvas,g.context,{width:0,height:0});let{width:o,height:t}=H();d(g.canvas,g.context,{width:o,height:t}),g.width=o,g.height=t}function u(){g.canvas&&(e(),g.canvas.parentNode?.removeChild(g.canvas),g={})}var p={margin:"#f6b26b",border:"#ffe599",padding:"#93c47d",content:"#6fa8dc",text:"#232020"},O=6;function K(o,{x:t,y:n,w:a,h:r,r:s}){t=t-a/2,n=n-r/2,a<2*s&&(s=a/2),r<2*s&&(s=r/2),o.beginPath(),o.moveTo(t+s,n),o.arcTo(t+a,n,t+a,n+r,s),o.arcTo(t+a,n+r,t,n+r,s),o.arcTo(t,n+r,t,n,s),o.arcTo(t,n,t+a,n,s),o.closePath()}function ot(o,{padding:t,border:n,width:a,height:r,top:s,left:M}){let S=a-n.left-n.right-t.left-t.right,B=r-t.top-t.bottom-n.top-n.bottom,N=M+n.left+t.left,Q=s+n.top+t.top;return o==="top"?N+=S/2:o==="right"?(N+=S,Q+=B/2):o==="bottom"?(N+=S/2,Q+=B):o==="left"?Q+=B/2:o==="center"&&(N+=S/2,Q+=B/2),{x:N,y:Q}}function P(o,t,{margin:n,border:a,padding:r},s,M){let S=et=>0,B=0,N=0,Q=M?1:.5,nt=M?s*2:0;return o==="padding"?S=et=>r[et]*Q+nt:o==="border"?S=et=>r[et]+a[et]*Q+nt:o==="margin"&&(S=et=>r[et]+a[et]+n[et]*Q+nt),t==="top"?N=-S("top"):t==="right"?B=S("right"):t==="bottom"?N=S("bottom"):t==="left"&&(B=-S("left")),{offsetX:B,offsetY:N}}function D(o,t){return Math.abs(o.x-t.x)<Math.abs(o.w+t.w)/2&&Math.abs(o.y-t.y)<Math.abs(o.h+t.h)/2}function G(o,t,n){return o==="top"?t.y=n.y-n.h-O:o==="right"?t.x=n.x+n.w/2+O+t.w/2:o==="bottom"?t.y=n.y+n.h+O:o==="left"&&(t.x=n.x-n.w/2-O-t.w/2),{x:t.x,y:t.y}}function V(o,t,{x:n,y:a,w:r,h:s},M){return K(o,{x:n,y:a,w:r,h:s,r:3}),o.fillStyle=`${p[t]}dd`,o.fill(),o.strokeStyle=p[t],o.stroke(),o.fillStyle=p.text,o.fillText(M,n,a),K(o,{x:n,y:a,w:r,h:s,r:3}),o.fillStyle=`${p[t]}dd`,o.fill(),o.strokeStyle=p[t],o.stroke(),o.fillStyle=p.text,o.fillText(M,n,a),{x:n,y:a,w:r,h:s}}function X(o,t){o.font="600 12px monospace",o.textBaseline="middle",o.textAlign="center";let n=o.measureText(t),a=n.actualBoundingBoxAscent+n.actualBoundingBoxDescent,r=n.width+O*2,s=a+O*2;return{w:r,h:s}}function Z(o,t,{type:n,position:a="center",text:r},s,M=!1){let{x:S,y:B}=ot(a,t),{offsetX:N,offsetY:Q}=P(n,a,t,O+1,M);S+=N,B+=Q;let{w:nt,h:et}=X(o,r);if(s&&D({x:S,y:B,w:nt,h:et},s)){let ft=G(a,{x:S,y:B,w:nt,h:et},s);S=ft.x,B=ft.y}return V(o,n,{x:S,y:B,w:nt,h:et},r)}function x(o,{w:t,h:n}){let a=t*.5+O,r=n*.5+O;return{offsetX:(o.x==="left"?-1:1)*a,offsetY:(o.y==="top"?-1:1)*r}}function y(o,t,{type:n,text:a}){let{floatingAlignment:r,extremities:s}=t,M=s[r.x],S=s[r.y],{w:B,h:N}=X(o,a),{offsetX:Q,offsetY:nt}=x(r,{w:B,h:N});return M+=Q,S+=nt,V(o,n,{x:M,y:S,w:B,h:N},a)}function j(o,t,n,a){let r=[];n.forEach((s,M)=>{let S=a&&s.position==="center"?y(o,t,s):Z(o,t,s,r[M-1],a);r[M]=S})}function U(o,t,n,a){let r=n.reduce((s,M)=>(Object.prototype.hasOwnProperty.call(s,M.position)||(s[M.position]=[]),s[M.position]?.push(M),s),{});r.top&&j(o,t,r.top,a),r.right&&j(o,t,r.right,a),r.bottom&&j(o,t,r.bottom,a),r.left&&j(o,t,r.left,a),r.center&&j(o,t,r.center,a)}var A={margin:"#f6b26ba8",border:"#ffe599a8",padding:"#93c47d8c",content:"#6fa8dca8"},W=30;function w(o){return parseInt(o.replace("px",""),10)}function i(o){return Number.isInteger(o)?o:o.toFixed(2)}function l(o){return o.filter(t=>t.text!==0&&t.text!=="0")}function f(o){let t={top:$.global.window.scrollY,bottom:$.global.window.scrollY+$.global.window.innerHeight,left:$.global.window.scrollX,right:$.global.window.scrollX+$.global.window.innerWidth},n={top:Math.abs(t.top-o.top),bottom:Math.abs(t.bottom-o.bottom),left:Math.abs(t.left-o.left),right:Math.abs(t.right-o.right)};return{x:n.left>n.right?"left":"right",y:n.top>n.bottom?"top":"bottom"}}function h(o){let t=$.global.getComputedStyle(o),{top:n,left:a,right:r,bottom:s,width:M,height:S}=o.getBoundingClientRect(),{marginTop:B,marginBottom:N,marginLeft:Q,marginRight:nt,paddingTop:et,paddingBottom:ft,paddingLeft:ct,paddingRight:gt,borderBottomWidth:bt,borderTopWidth:ht,borderLeftWidth:yt,borderRightWidth:vt}=t;n=n+$.global.window.scrollY,a=a+$.global.window.scrollX,s=s+$.global.window.scrollY,r=r+$.global.window.scrollX;let pt={top:w(B),bottom:w(N),left:w(Q),right:w(nt)},$t={top:w(et),bottom:w(ft),left:w(ct),right:w(gt)},xt={top:w(ht),bottom:w(bt),left:w(yt),right:w(vt)},mt={top:n-pt.top,bottom:s+pt.bottom,left:a-pt.left,right:r+pt.right};return{margin:pt,padding:$t,border:xt,top:n,left:a,bottom:s,right:r,width:M,height:S,extremities:mt,floatingAlignment:f(mt)}}function E(o,{margin:t,width:n,height:a,top:r,left:s,bottom:M,right:S}){let B=a+t.bottom+t.top;o.fillStyle=A.margin,o.fillRect(s,r-t.top,n,t.top),o.fillRect(S,r-t.top,t.right,B),o.fillRect(s,M,n,t.bottom),o.fillRect(s-t.left,r-t.top,t.left,B);let N=[{type:"margin",text:i(t.top),position:"top"},{type:"margin",text:i(t.right),position:"right"},{type:"margin",text:i(t.bottom),position:"bottom"},{type:"margin",text:i(t.left),position:"left"}];return l(N)}function J(o,{padding:t,border:n,width:a,height:r,top:s,left:M,bottom:S,right:B}){let N=a-n.left-n.right,Q=r-t.top-t.bottom-n.top-n.bottom;o.fillStyle=A.padding,o.fillRect(M+n.left,s+n.top,N,t.top),o.fillRect(B-t.right-n.right,s+t.top+n.top,t.right,Q),o.fillRect(M+n.left,S-t.bottom-n.bottom,N,t.bottom),o.fillRect(M+n.left,s+t.top+n.top,t.left,Q);let nt=[{type:"padding",text:t.top,position:"top"},{type:"padding",text:t.right,position:"right"},{type:"padding",text:t.bottom,position:"bottom"},{type:"padding",text:t.left,position:"left"}];return l(nt)}function q(o,{border:t,width:n,height:a,top:r,left:s,bottom:M,right:S}){let B=a-t.top-t.bottom;o.fillStyle=A.border,o.fillRect(s,r,n,t.top),o.fillRect(s,M-t.bottom,n,t.bottom),o.fillRect(s,r+t.top,t.left,B),o.fillRect(S-t.right,r+t.top,t.right,B);let N=[{type:"border",text:t.top,position:"top"},{type:"border",text:t.right,position:"right"},{type:"border",text:t.bottom,position:"bottom"},{type:"border",text:t.left,position:"left"}];return l(N)}function R(o,{padding:t,border:n,width:a,height:r,top:s,left:M}){let S=a-n.left-n.right-t.left-t.right,B=r-t.top-t.bottom-n.top-n.bottom;return o.fillStyle=A.content,o.fillRect(M+n.left+t.left,s+n.top+t.top,S,B),[{type:"content",position:"center",text:`${i(S)} x ${i(B)}`}]}function _(o){return t=>{if(o&&t){let n=h(o),a=E(t,n),r=J(t,n),s=q(t,n),M=R(t,n),S=n.width<=W*3||n.height<=W;U(t,n,[...M,...r,...s,...a],S)}}}function it(o){b(_(o))}var dt=(o,t)=>{let n=$.global.document.elementFromPoint(o,t),a=r=>{if(r&&r.shadowRoot){let s=r.shadowRoot.elementFromPoint(o,t);return r.isEqualNode(s)?r:s.shadowRoot?a(s):s}return r};return a(n)||n},at,F={x:0,y:0};function tt(o,t){at=dt(o,t),it(at)}var st=(o,t)=>{let{measureEnabled:n}=t.globals;return(0,L.useEffect)(()=>{let a=r=>{window.requestAnimationFrame(()=>{r.stopPropagation(),F.x=r.clientX,F.y=r.clientY})};return document.addEventListener("pointermove",a),()=>{document.removeEventListener("pointermove",a)}},[]),(0,L.useEffect)(()=>{let a=s=>{window.requestAnimationFrame(()=>{s.stopPropagation(),tt(s.clientX,s.clientY)})},r=()=>{window.requestAnimationFrame(()=>{c()})};return t.viewMode==="story"&&n&&(document.addEventListener("pointerover",a),T(),window.addEventListener("resize",r),tt(F.x,F.y)),()=>{window.removeEventListener("resize",r),u()}},[n,t.viewMode]),o()},lt=[st],ut={[z]:!1}}),"./node_modules/@storybook/addon-essentials/dist/outline/preview.mjs":(function(rt,C,m){m.r(C),m.d(C,{decorators:function(){return g},initialGlobals:function(){return T}});var L=m("storybook/internal/preview-api"),$=m("@storybook/global"),k=m("./node_modules/ts-dedent/esm/index.js"),I="outline",v=e=>{(Array.isArray(e)?e:[e]).forEach(z)},z=e=>{let b=typeof e=="string"?e:e.join(""),c=$.global.document.getElementById(b);c&&c.parentElement&&c.parentElement.removeChild(c)},H=(e,b)=>{let c=$.global.document.getElementById(e);if(c)c.innerHTML!==b&&(c.innerHTML=b);else{let u=$.global.document.createElement("style");u.setAttribute("id",e),u.innerHTML=b,$.global.document.head.appendChild(u)}};function Y(e){return(0,k.dedent)`
    ${e} body {
      outline: 1px solid #2980b9 !important;
    }

    ${e} article {
      outline: 1px solid #3498db !important;
    }

    ${e} nav {
      outline: 1px solid #0088c3 !important;
    }

    ${e} aside {
      outline: 1px solid #33a0ce !important;
    }

    ${e} section {
      outline: 1px solid #66b8da !important;
    }

    ${e} header {
      outline: 1px solid #99cfe7 !important;
    }

    ${e} footer {
      outline: 1px solid #cce7f3 !important;
    }

    ${e} h1 {
      outline: 1px solid #162544 !important;
    }

    ${e} h2 {
      outline: 1px solid #314e6e !important;
    }

    ${e} h3 {
      outline: 1px solid #3e5e85 !important;
    }

    ${e} h4 {
      outline: 1px solid #449baf !important;
    }

    ${e} h5 {
      outline: 1px solid #c7d1cb !important;
    }

    ${e} h6 {
      outline: 1px solid #4371d0 !important;
    }

    ${e} main {
      outline: 1px solid #2f4f90 !important;
    }

    ${e} address {
      outline: 1px solid #1a2c51 !important;
    }

    ${e} div {
      outline: 1px solid #036cdb !important;
    }

    ${e} p {
      outline: 1px solid #ac050b !important;
    }

    ${e} hr {
      outline: 1px solid #ff063f !important;
    }

    ${e} pre {
      outline: 1px solid #850440 !important;
    }

    ${e} blockquote {
      outline: 1px solid #f1b8e7 !important;
    }

    ${e} ol {
      outline: 1px solid #ff050c !important;
    }

    ${e} ul {
      outline: 1px solid #d90416 !important;
    }

    ${e} li {
      outline: 1px solid #d90416 !important;
    }

    ${e} dl {
      outline: 1px solid #fd3427 !important;
    }

    ${e} dt {
      outline: 1px solid #ff0043 !important;
    }

    ${e} dd {
      outline: 1px solid #e80174 !important;
    }

    ${e} figure {
      outline: 1px solid #ff00bb !important;
    }

    ${e} figcaption {
      outline: 1px solid #bf0032 !important;
    }

    ${e} table {
      outline: 1px solid #00cc99 !important;
    }

    ${e} caption {
      outline: 1px solid #37ffc4 !important;
    }

    ${e} thead {
      outline: 1px solid #98daca !important;
    }

    ${e} tbody {
      outline: 1px solid #64a7a0 !important;
    }

    ${e} tfoot {
      outline: 1px solid #22746b !important;
    }

    ${e} tr {
      outline: 1px solid #86c0b2 !important;
    }

    ${e} th {
      outline: 1px solid #a1e7d6 !important;
    }

    ${e} td {
      outline: 1px solid #3f5a54 !important;
    }

    ${e} col {
      outline: 1px solid #6c9a8f !important;
    }

    ${e} colgroup {
      outline: 1px solid #6c9a9d !important;
    }

    ${e} button {
      outline: 1px solid #da8301 !important;
    }

    ${e} datalist {
      outline: 1px solid #c06000 !important;
    }

    ${e} fieldset {
      outline: 1px solid #d95100 !important;
    }

    ${e} form {
      outline: 1px solid #d23600 !important;
    }

    ${e} input {
      outline: 1px solid #fca600 !important;
    }

    ${e} keygen {
      outline: 1px solid #b31e00 !important;
    }

    ${e} label {
      outline: 1px solid #ee8900 !important;
    }

    ${e} legend {
      outline: 1px solid #de6d00 !important;
    }

    ${e} meter {
      outline: 1px solid #e8630c !important;
    }

    ${e} optgroup {
      outline: 1px solid #b33600 !important;
    }

    ${e} option {
      outline: 1px solid #ff8a00 !important;
    }

    ${e} output {
      outline: 1px solid #ff9619 !important;
    }

    ${e} progress {
      outline: 1px solid #e57c00 !important;
    }

    ${e} select {
      outline: 1px solid #e26e0f !important;
    }

    ${e} textarea {
      outline: 1px solid #cc5400 !important;
    }

    ${e} details {
      outline: 1px solid #33848f !important;
    }

    ${e} summary {
      outline: 1px solid #60a1a6 !important;
    }

    ${e} command {
      outline: 1px solid #438da1 !important;
    }

    ${e} menu {
      outline: 1px solid #449da6 !important;
    }

    ${e} del {
      outline: 1px solid #bf0000 !important;
    }

    ${e} ins {
      outline: 1px solid #400000 !important;
    }

    ${e} img {
      outline: 1px solid #22746b !important;
    }

    ${e} iframe {
      outline: 1px solid #64a7a0 !important;
    }

    ${e} embed {
      outline: 1px solid #98daca !important;
    }

    ${e} object {
      outline: 1px solid #00cc99 !important;
    }

    ${e} param {
      outline: 1px solid #37ffc4 !important;
    }

    ${e} video {
      outline: 1px solid #6ee866 !important;
    }

    ${e} audio {
      outline: 1px solid #027353 !important;
    }

    ${e} source {
      outline: 1px solid #012426 !important;
    }

    ${e} canvas {
      outline: 1px solid #a2f570 !important;
    }

    ${e} track {
      outline: 1px solid #59a600 !important;
    }

    ${e} map {
      outline: 1px solid #7be500 !important;
    }

    ${e} area {
      outline: 1px solid #305900 !important;
    }

    ${e} a {
      outline: 1px solid #ff62ab !important;
    }

    ${e} em {
      outline: 1px solid #800b41 !important;
    }

    ${e} strong {
      outline: 1px solid #ff1583 !important;
    }

    ${e} i {
      outline: 1px solid #803156 !important;
    }

    ${e} b {
      outline: 1px solid #cc1169 !important;
    }

    ${e} u {
      outline: 1px solid #ff0430 !important;
    }

    ${e} s {
      outline: 1px solid #f805e3 !important;
    }

    ${e} small {
      outline: 1px solid #d107b2 !important;
    }

    ${e} abbr {
      outline: 1px solid #4a0263 !important;
    }

    ${e} q {
      outline: 1px solid #240018 !important;
    }

    ${e} cite {
      outline: 1px solid #64003c !important;
    }

    ${e} dfn {
      outline: 1px solid #b4005a !important;
    }

    ${e} sub {
      outline: 1px solid #dba0c8 !important;
    }

    ${e} sup {
      outline: 1px solid #cc0256 !important;
    }

    ${e} time {
      outline: 1px solid #d6606d !important;
    }

    ${e} code {
      outline: 1px solid #e04251 !important;
    }

    ${e} kbd {
      outline: 1px solid #5e001f !important;
    }

    ${e} samp {
      outline: 1px solid #9c0033 !important;
    }

    ${e} var {
      outline: 1px solid #d90047 !important;
    }

    ${e} mark {
      outline: 1px solid #ff0053 !important;
    }

    ${e} bdi {
      outline: 1px solid #bf3668 !important;
    }

    ${e} bdo {
      outline: 1px solid #6f1400 !important;
    }

    ${e} ruby {
      outline: 1px solid #ff7b93 !important;
    }

    ${e} rt {
      outline: 1px solid #ff2f54 !important;
    }

    ${e} rp {
      outline: 1px solid #803e49 !important;
    }

    ${e} span {
      outline: 1px solid #cc2643 !important;
    }

    ${e} br {
      outline: 1px solid #db687d !important;
    }

    ${e} wbr {
      outline: 1px solid #db175b !important;
    }`}var d=(e,b)=>{let{globals:c}=b,u=[!0,"true"].includes(c[I]),p=b.viewMode==="docs",O=(0,L.useMemo)(()=>Y(p?'[data-story-block="true"]':".sb-show-main"),[b]);return(0,L.useEffect)(()=>{let K=p?`addon-outline-docs-${b.id}`:"addon-outline";return u?H(K,O):v(K),()=>{v(K)}},[u,O,b]),e()},g=[d],T={[I]:!1}}),"./node_modules/@storybook/addon-essentials/dist/viewport/preview.mjs":(function(rt,C,m){m.r(C),m.d(C,{initialGlobals:function(){return I}});var L="viewport",$={[L]:{value:void 0,isRotated:!1}},k={viewport:"reset",viewportRotated:!1},I=globalThis.FEATURES?.viewportStoryGlobals?$:k}),"./node_modules/@storybook/core/dist/csf/index.js":(function(rt,C,m){m.r(C),m.d(C,{__definePreview:function(){return ot},combineTags:function(){return w},includeConditionalArg:function(){return K},isExportStory:function(){return A},isMeta:function(){return D},isPreview:function(){return P},isStory:function(){return X},parseKind:function(){return W},sanitize:function(){return Z},storyNameFromExport:function(){return j},toId:function(){return y}});var L=m("storybook/internal/preview-api"),$=m.n(L),k=Object.create,I=Object.defineProperty,v=Object.getOwnPropertyDescriptor,z=Object.getOwnPropertyNames,H=Object.getPrototypeOf,Y=Object.prototype.hasOwnProperty,d=(i,l)=>I(i,"name",{value:l,configurable:!0}),g=(i,l)=>()=>(l||i((l={exports:{}}).exports,l),l.exports),T=(i,l,f,h)=>{if(l&&typeof l=="object"||typeof l=="function")for(let E of z(l))!Y.call(i,E)&&E!==f&&I(i,E,{get:()=>l[E],enumerable:!(h=v(l,E))||h.enumerable});return i},e=(i,l,f)=>(f=i!=null?k(H(i)):{},T(l||!i||!i.__esModule?I(f,"default",{value:i,enumerable:!0}):f,i)),b=g(i=>{Object.defineProperty(i,"__esModule",{value:!0}),i.isEqual=(function(){var l=Object.prototype.toString,f=Object.getPrototypeOf,h=Object.getOwnPropertySymbols?function(E){return Object.keys(E).concat(Object.getOwnPropertySymbols(E))}:Object.keys;return function(E,J){return d(function q(R,_,it){var dt,at,F,tt=l.call(R),st=l.call(_);if(R===_)return!0;if(R==null||_==null)return!1;if(it.indexOf(R)>-1&&it.indexOf(_)>-1)return!0;if(it.push(R,_),tt!=st||(dt=h(R),at=h(_),dt.length!=at.length||dt.some(function(lt){return!q(R[lt],_[lt],it)})))return!1;switch(tt.slice(8,-1)){case"Symbol":return R.valueOf()==_.valueOf();case"Date":case"Number":return+R==+_||+R!=+R&&+_!=+_;case"RegExp":case"Function":case"String":case"Boolean":return""+R==""+_;case"Set":case"Map":dt=R.entries(),at=_.entries();do if(!q((F=dt.next()).value,at.next().value,it))return!1;while(!F.done);return!0;case"ArrayBuffer":R=new Uint8Array(R),_=new Uint8Array(_);case"DataView":R=new Uint8Array(R.buffer),_=new Uint8Array(_.buffer);case"Float32Array":case"Float64Array":case"Int8Array":case"Int16Array":case"Int32Array":case"Uint8Array":case"Uint16Array":case"Uint32Array":case"Uint8ClampedArray":case"Arguments":case"Array":if(R.length!=_.length)return!1;for(F=0;F<R.length;F++)if((F in R||F in _)&&(F in R!=F in _||!q(R[F],_[F],it)))return!1;return!0;case"Object":return q(f(R),f(_),it);default:return!1}},"n")(E,J,[])}})()});function c(i){return i.replace(/_/g," ").replace(/-/g," ").replace(/\./g," ").replace(/([^\n])([A-Z])([a-z])/g,(l,f,h,E)=>`${f} ${h}${E}`).replace(/([a-z])([A-Z])/g,(l,f,h)=>`${f} ${h}`).replace(/([a-z])([0-9])/gi,(l,f,h)=>`${f} ${h}`).replace(/([0-9])([a-z])/gi,(l,f,h)=>`${f} ${h}`).replace(/(\s|^)(\w)/g,(l,f,h)=>`${f}${h.toUpperCase()}`).replace(/ +/g," ").trim()}d(c,"toStartCaseStr");var u=e(b(),1),p=d(i=>i.map(l=>typeof l<"u").filter(Boolean).length,"count"),O=d((i,l)=>{let{exists:f,eq:h,neq:E,truthy:J}=i;if(p([f,h,E,J])>1)throw new Error(`Invalid conditional test ${JSON.stringify({exists:f,eq:h,neq:E})}`);if(typeof h<"u")return(0,u.isEqual)(l,h);if(typeof E<"u")return!(0,u.isEqual)(l,E);if(typeof f<"u"){let q=typeof l<"u";return f?q:!q}return typeof J>"u"||J?!!l:!l},"testValue"),K=d((i,l,f)=>{if(!i.if)return!0;let{arg:h,global:E}=i.if;if(p([h,E])!==1)throw new Error(`Invalid conditional value ${JSON.stringify({arg:h,global:E})}`);let J=h?l[h]:f[E];return O(i.if,J)},"includeConditionalArg");function ot(i){let l,f={_tag:"Preview",input:i,get composed(){if(l)return l;let{addons:h,...E}=i;return l=(0,L.normalizeProjectAnnotations)((0,L.composeConfigs)([...h??[],E])),l},meta(h){return G(h,this)}};return globalThis.globalProjectAnnotations=f.composed,f}d(ot,"__definePreview");function P(i){return i!=null&&typeof i=="object"&&"_tag"in i&&i?._tag==="Preview"}d(P,"isPreview");function D(i){return i!=null&&typeof i=="object"&&"_tag"in i&&i?._tag==="Meta"}d(D,"isMeta");function G(i,l){return{_tag:"Meta",input:i,preview:l,get composed(){throw new Error("Not implemented")},story(f){return V(f,this)}}}d(G,"defineMeta");function V(i,l){return{_tag:"Story",input:i,meta:l,get composed(){throw new Error("Not implemented")}}}d(V,"defineStory");function X(i){return i!=null&&typeof i=="object"&&"_tag"in i&&i?._tag==="Story"}d(X,"isStory");var Z=d(i=>i.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,"-").replace(/-+/g,"-").replace(/^-+/,"").replace(/-+$/,""),"sanitize"),x=d((i,l)=>{let f=Z(i);if(f==="")throw new Error(`Invalid ${l} '${i}', must include alphanumeric characters`);return f},"sanitizeSafe"),y=d((i,l)=>`${x(i,"kind")}${l?`--${x(l,"name")}`:""}`,"toId"),j=d(i=>c(i),"storyNameFromExport");function U(i,l){return Array.isArray(l)?l.includes(i):i.match(l)}d(U,"matches");function A(i,{includeStories:l,excludeStories:f}){return i!=="__esModule"&&(!l||U(i,l))&&(!f||!U(i,f))}d(A,"isExportStory");var W=d((i,{rootSeparator:l,groupSeparator:f})=>{let[h,E]=i.split(l,2),J=(E||i).split(f).filter(q=>!!q);return{root:E?h:null,groups:J}},"parseKind"),w=d((...i)=>{let l=i.reduce((f,h)=>(h.startsWith("!")?f.delete(h.slice(1)):f.add(h),f),new Set);return Array.from(l)},"combineTags")}),"./node_modules/@storybook/html/dist/entry-preview.mjs":(function(rt,C,m){m.r(C),m.d(C,{parameters:function(){return g},render:function(){return Y},renderToCanvas:function(){return d}});var L=Object.defineProperty,$=(T,e)=>{for(var b in e)L(T,b,{get:e[b],enumerable:!0})},k=m("storybook/internal/preview-api"),I=m("@storybook/global"),v=m("./node_modules/ts-dedent/esm/index.js"),z={};$(z,{parameters:()=>g,render:()=>Y,renderToCanvas:()=>d});var{Node:H}=I.global,Y=(T,e)=>{let{id:b,component:c}=e;if(typeof c=="string"){let u=c;return Object.keys(T).forEach(p=>{u=u.replace(`{{${p}}}`,T[p])}),u}if(c instanceof HTMLElement){let u=c.cloneNode(!0);return Object.keys(T).forEach(p=>{u.setAttribute(p,typeof T[p]=="string"?T[p]:JSON.stringify(T[p]))}),u}if(typeof c=="function")return c(T,e);throw console.warn((0,v.dedent)`
    Storybook's HTML renderer only supports rendering DOM elements and strings.
    Received: ${c}
  `),new Error(`Unable to render story ${b}`)};function d({storyFn:T,kind:e,name:b,showMain:c,showError:u,forceRemount:p},O){let K=T();if(c(),typeof K=="string")O.innerHTML=K,(0,k.simulatePageLoad)(O);else if(K instanceof H){if(O.firstChild===K&&p===!1)return;O.innerHTML="",O.appendChild(K),(0,k.simulateDOMContentLoaded)()}else u({title:`Expecting an HTML snippet or DOM node from the story: "${b}" of "${e}".`,description:(0,v.dedent)`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var g={renderer:"html"}}),"./node_modules/@whitespace/storybook-addon-html/dist/preview.cjs":(function(rt,C,m){var L=m("storybook/internal/preview-api"),$="storybook/html",k={CODE_UPDATE:`${$}/codeUpdate`},I=(H,{parameters:{html:Y={}}={}})=>{let d=L.useChannel({});return setTimeout(()=>{let g=Y.root||"#storybook-root, #root",T=document.querySelector(g),e=T?T.innerHTML:`${g} not found.`,{removeEmptyComments:b,removeComments:c,transform:u}=Y;if(b&&(e=e.replace(/<!--\s*-->/g,"")),c===!0?e=e.replace(/<!--[\S\s]*?-->/g,""):c instanceof RegExp&&(e=e.replace(/<!--([\S\s]*?)-->/g,(p,O)=>c.test(O)?"":p)),typeof u=="function")try{e=u(e)}catch(p){console.error(p)}d(k.CODE_UPDATE,{code:e,options:Y})},0),H()},v={decorators:[I]},z=v;rt.exports=z}),"./node_modules/ts-dedent/esm/index.js":(function(rt,C,m){m.r(C),m.d(C,{dedent:function(){return L}});function L($){for(var k=[],I=1;I<arguments.length;I++)k[I-1]=arguments[I];var v=Array.from(typeof $=="string"?[$]:$);v[v.length-1]=v[v.length-1].replace(/\r?\n([\t ]*)$/,"");var z=v.reduce(function(d,g){var T=g.match(/\n([\t ]+|(?!\s).)/g);return T?d.concat(T.map(function(e){var b,c;return(c=(b=e.match(/[\t ]/g))===null||b===void 0?void 0:b.length)!==null&&c!==void 0?c:0})):d},[]);if(z.length){var H=new RegExp(`
[	 ]{`+Math.min.apply(Math,z)+"}","g");v=v.map(function(d){return d.replace(H,`
`)})}v[0]=v[0].replace(/^\r?\n/,"");var Y=v[0];return k.forEach(function(d,g){var T=Y.match(/(?:^|\n)( *)$/),e=T?T[1]:"",b=d;typeof d=="string"&&d.includes(`
`)&&(b=String(d).split(`
`).map(function(c,u){return u===0?c:""+e+c}).join(`
`)),Y+=b+v[g+1]}),Y}C.default=L}),"./node_modules/uuid/dist/esm-browser/v4.js":(function(rt,C,m){m.r(C),m.d(C,{default:function(){return c}});var $={randomUUID:typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let k;const I=new Uint8Array(16);function v(){if(!k&&(k=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!k))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return k(I)}var z=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function H(u){return typeof u=="string"&&z.test(u)}var Y=H;const d=[];for(let u=0;u<256;++u)d.push((u+256).toString(16).slice(1));function g(u,p=0){return d[u[p+0]]+d[u[p+1]]+d[u[p+2]]+d[u[p+3]]+"-"+d[u[p+4]]+d[u[p+5]]+"-"+d[u[p+6]]+d[u[p+7]]+"-"+d[u[p+8]]+d[u[p+9]]+"-"+d[u[p+10]]+d[u[p+11]]+d[u[p+12]]+d[u[p+13]]+d[u[p+14]]+d[u[p+15]]}function T(u,p=0){const O=g(u,p);if(!Y(O))throw TypeError("Stringified UUID is invalid");return O}var e=T;function b(u,p,O){if($.randomUUID&&!p&&!u)return $.randomUUID();u=u||{};const K=u.random||(u.rng||v)();if(K[6]=K[6]&15|64,K[8]=K[8]&63|128,p){O=O||0;for(let ot=0;ot<16;++ot)p[O+ot]=K[ot];return p}return g(K)}var c=b})}]);
