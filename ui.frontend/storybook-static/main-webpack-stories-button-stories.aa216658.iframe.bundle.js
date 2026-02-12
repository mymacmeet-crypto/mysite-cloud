(self.webpackChunkaem_maven_archetype=self.webpackChunkaem_maven_archetype||[]).push([[519],{"./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!./src/main/webpack/components/button/button.css":(function(i,s,t){"use strict";t.r(s);var u=t("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/noSourceMaps.js"),p=t.n(u),e=t("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/runtime/api.js"),n=t.n(e),a=n()(p());a.push([i.id,`.cmp-button {
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.cmp-button:active {
  transform: scale(0.97);
}

.cmp-button--primary { background-color: #0052cc; color: #fff; }
.cmp-button--secondary { background-color: #f1f1f1; color: #333; }
.cmp-button--danger { background-color: #d92d20; color: #fff; }

.cmp-button:disabled { opacity: 0.5; cursor: not-allowed; }
.cmp-button--active { box-shadow: 0 0 0 2px #000 inset; }
`,""]),s.default=a}),"./src/main/webpack/components/button/button.hbs":(function(i,s,t){var u=t("./node_modules/handlebars/runtime.js");function p(e){return e&&(e.__esModule?e.default:e)}i.exports=(u.default||u).template({1:function(e,n,a,k,r){return"disabled"},compiler:[8,">= 4.3.0"],main:function(e,n,a,k,r){var v,o,d=n??(e.nullContext||{}),m=e.hooks.helperMissing,b="function",f=e.escapeExpression,l=e.lookupProperty||function(g,c){if(Object.prototype.hasOwnProperty.call(g,c))return g[c]};return`<button 
  class="cmp-button cmp-button--`+f((o=(o=l(a,"variant")||(n!=null?l(n,"variant"):n))!=null?o:m,typeof o===b?o.call(d,{name:"variant",hash:{},data:r,loc:{start:{line:2,column:32},end:{line:2,column:43}}}):o))+`"
  `+((v=l(a,"if").call(d,n!=null?l(n,"disabled"):n,{name:"if",hash:{},fn:e.program(1,r,0),inverse:e.noop,data:r,loc:{start:{line:3,column:2},end:{line:3,column:33}}}))!=null?v:"")+`
  data-action="`+f((o=(o=l(a,"action")||(n!=null?l(n,"action"):n))!=null?o:m,typeof o===b?o.call(d,{name:"action",hash:{},data:r,loc:{start:{line:4,column:15},end:{line:4,column:25}}}):o))+`"
  data-url="`+f((o=(o=l(a,"url")||(n!=null?l(n,"url"):n))!=null?o:m,typeof o===b?o.call(d,{name:"url",hash:{},data:r,loc:{start:{line:5,column:12},end:{line:5,column:19}}}):o))+`">
  `+f((o=(o=l(a,"label")||(n!=null?l(n,"label"):n))!=null?o:m,typeof o===b?o.call(d,{name:"label",hash:{},data:r,loc:{start:{line:6,column:2},end:{line:6,column:11}}}):o))+`
</button>
`},useData:!0})}),"./src/main/webpack/components/button/button.js":(function(){document.addEventListener("click",function(i){const s=i.target.closest(".cmp-button");if(!s||s.disabled)return;const t=s.dataset.action,u=s.dataset.url;switch(t){case"alert":alert(`Clicked: ${s.textContent}`);break;case"log":console.log("Button clicked:",s.textContent);break;case"navigate":u&&(window.location.href=u);break;case"toggle":s.classList.toggle("cmp-button--active");break;default:console.log("No action defined")}})}),"./src/main/webpack/stories/button.stories.js":(function(i,s,t){"use strict";t.r(s),t.d(s,{Playground:function(){return _},__namedExportsOrder:function(){return E},default:function(){return j}});var u=t("./node_modules/handlebars/dist/cjs/handlebars.js"),p=t("./src/main/webpack/components/button/button.hbs"),e=t.n(p),n=t("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),a=t.n(n),k=t("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleDomAPI.js"),r=t.n(k),v=t("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertBySelector.js"),o=t.n(v),d=t("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),m=t.n(d),b=t("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/insertStyleElement.js"),f=t.n(b),l=t("./node_modules/@storybook/builder-webpack5/node_modules/style-loader/dist/runtime/styleTagTransform.js"),g=t.n(l),c=t("./node_modules/@storybook/builder-webpack5/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!./src/main/webpack/components/button/button.css"),y={};y.styleTagTransform=g(),y.setAttributes=m(),y.insert=o().bind(null,"head"),y.domAPI=r(),y.insertStyleElement=f();var h=a()(c.default,y),P=c.default&&c.default.locals?c.default.locals:void 0,T=t("./src/main/webpack/components/button/button.js"),j={title:"AEM/Button",argTypes:{label:{control:"text"},variant:{control:"select",options:["primary","secondary","danger"]},disabled:{control:"boolean"},action:{control:"select",options:["alert","log","navigate","toggle","none"]},url:{control:"text"}}};const _=(S=>e()(S)).bind({});_.args={label:"Click Me",variant:"primary",disabled:!1,action:"alert",url:"/content/home.html"};const E=["Playground"]})}]);
