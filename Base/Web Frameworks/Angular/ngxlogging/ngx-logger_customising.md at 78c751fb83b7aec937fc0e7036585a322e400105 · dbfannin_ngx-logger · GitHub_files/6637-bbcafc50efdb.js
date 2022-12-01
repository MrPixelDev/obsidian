"use strict";(()=>{var z=Object.defineProperty;var s=(W,I)=>z(W,"name",{value:I,configurable:!0});(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([[6637,9753],{57260:(W,I,q)=>{q.d(I,{P:()=>p});class p{constructor(e,n){this.file=e,this.directory=n,this.state="pending",this.id=null,this.href=null,this.name=null,this.percent=0}static traverse(e,n){return k(e,n)}static from(e){const n=[];for(const g of e)if(g instanceof File)n.push(new p(g));else if(g instanceof p)n.push(g);else throw new Error("Unexpected type");return n}get fullPath(){return this.directory?`${this.directory}/${this.file.name}`:this.file.name}isImage(){return["image/gif","image/png","image/jpg","image/jpeg","image/svg+xml"].indexOf(this.file.type)>-1}isVideo(){return["video/mp4","video/quicktime"].indexOf(this.file.type)>-1}saving(e){if(this.state!=="pending"&&this.state!=="saving")throw new Error(`Unexpected transition from ${this.state} to saving`);this.state="saving",this.percent=e}saved(e){var n,g,_;if(this.state!=="pending"&&this.state!=="saving")throw new Error(`Unexpected transition from ${this.state} to saved`);this.state="saved",this.id=(n=e==null?void 0:e.id)!==null&&n!==void 0?n:null,this.href=(g=e==null?void 0:e.href)!==null&&g!==void 0?g:null,this.name=(_=e==null?void 0:e.name)!==null&&_!==void 0?_:null}isPending(){return this.state==="pending"}isSaving(){return this.state==="saving"}isSaved(){return this.state==="saved"}}s(p,"Attachment");function k(t,e){return e&&y(t)?H("",d(t)):Promise.resolve(F(Array.from(t.files||[])).map(n=>new p(n)))}s(k,"transferredFiles");function R(t){return t.name.startsWith(".")}s(R,"hidden");function F(t){return Array.from(t).filter(e=>!R(e))}s(F,"visible");function U(t){return new Promise(function(e,n){t.file(e,n)})}s(U,"getFile");function D(t){return new Promise(function(e,n){const g=[],_=t.createReader(),K=s(()=>{_.readEntries(C=>{C.length>0?(g.push(...C),K()):e(g)},n)},"read");K()})}s(D,"getEntries");async function H(t,e){const n=[];for(const g of F(e))if(g.isDirectory)n.push(...await H(g.fullPath,await D(g)));else{const _=await U(g);n.push(new p(_,t))}return n}s(H,"traverse");function y(t){return t.items&&Array.from(t.items).some(e=>{const n=e.webkitGetAsEntry&&e.webkitGetAsEntry();return n&&n.isDirectory})}s(y,"isDirectory");function d(t){return Array.from(t.items).map(e=>e.webkitGetAsEntry()).filter(e=>e!=null)}s(d,"roots");class c extends HTMLElement{connectedCallback(){this.addEventListener("dragenter",E),this.addEventListener("dragover",E),this.addEventListener("dragleave",w),this.addEventListener("drop",T),this.addEventListener("paste",r),this.addEventListener("change",f)}disconnectedCallback(){this.removeEventListener("dragenter",E),this.removeEventListener("dragover",E),this.removeEventListener("dragleave",w),this.removeEventListener("drop",T),this.removeEventListener("paste",r),this.removeEventListener("change",f)}get directory(){return this.hasAttribute("directory")}set directory(e){e?this.setAttribute("directory",""):this.removeAttribute("directory")}async attach(e){const n=e instanceof DataTransfer?await p.traverse(e,this.directory):p.from(e);this.dispatchEvent(new CustomEvent("file-attachment-accept",{bubbles:!0,cancelable:!0,detail:{attachments:n}}))&&n.length&&this.dispatchEvent(new CustomEvent("file-attachment-accepted",{bubbles:!0,detail:{attachments:n}}))}}s(c,"FileAttachmentElement");function a(t){return Array.from(t.types).indexOf("Files")>=0}s(a,"hasFile");let u=null;function E(t){const e=t.currentTarget;u&&clearTimeout(u),u=window.setTimeout(()=>e.removeAttribute("hover"),200);const n=t.dataTransfer;!n||!a(n)||(n.dropEffect="copy",e.setAttribute("hover",""),t.preventDefault())}s(E,"onDragenter");function w(t){t.dataTransfer&&(t.dataTransfer.dropEffect="none"),t.currentTarget.removeAttribute("hover"),t.stopPropagation(),t.preventDefault()}s(w,"onDragleave");function T(t){const e=t.currentTarget;if(!(e instanceof c))return;e.removeAttribute("hover");const n=t.dataTransfer;!n||!a(n)||(e.attach(n),t.stopPropagation(),t.preventDefault())}s(T,"onDrop");const P=/^image\/(gif|png|jpeg)$/;function M(t){for(const e of t)if(e.kind==="file"&&P.test(e.type))return e.getAsFile();return null}s(M,"pastedFile");function r(t){if(!t.clipboardData||!t.clipboardData.items)return;const e=t.currentTarget;if(!(e instanceof c))return;const n=M(t.clipboardData.items);if(!n)return;const g=[n];e.attach(g),t.preventDefault()}s(r,"onPaste");function f(t){const e=t.currentTarget;if(!(e instanceof c))return;const n=t.target;if(!(n instanceof HTMLInputElement))return;const g=e.getAttribute("input");if(g&&n.id!==g)return;const _=n.files;!_||_.length===0||(e.attach(_),n.value="")}s(f,"onChange"),window.customElements.get("file-attachment")||(window.FileAttachmentElement=c,window.customElements.define("file-attachment",c));var i=null},13002:(W,I,q)=>{q.d(I,{Z:()=>y});class p extends HTMLElement{constructor(){super();this.currentQuery=null,this.filter=null,this.debounceInputChange=H(()=>k(this,!0)),this.boundFilterResults=()=>{k(this,!1)}}static get observedAttributes(){return["aria-owns"]}attributeChangedCallback(c,a){a&&c==="aria-owns"&&k(this,!1)}connectedCallback(){const c=this.input;!c||(c.setAttribute("autocomplete","off"),c.setAttribute("spellcheck","false"),c.addEventListener("focus",this.boundFilterResults),c.addEventListener("change",this.boundFilterResults),c.addEventListener("input",this.debounceInputChange))}disconnectedCallback(){const c=this.input;!c||(c.removeEventListener("focus",this.boundFilterResults),c.removeEventListener("change",this.boundFilterResults),c.removeEventListener("input",this.debounceInputChange))}get input(){const c=this.querySelector("input");return c instanceof HTMLInputElement?c:null}reset(){const c=this.input;c&&(c.value="",c.dispatchEvent(new Event("change",{bubbles:!0})))}}s(p,"FilterInputElement");async function k(d,c=!1){const a=d.input;if(!a)return;const u=a.value.trim(),E=d.getAttribute("aria-owns");if(!E)return;const w=document.getElementById(E);if(!w)return;const T=w.hasAttribute("data-filter-list")?w:w.querySelector("[data-filter-list]");if(!T||(d.dispatchEvent(new CustomEvent("filter-input-start",{bubbles:!0})),c&&d.currentQuery===u))return;d.currentQuery=u;const P=d.filter||R,M=T.childElementCount;let r=0,f=!1;for(const e of Array.from(T.children)){if(!(e instanceof HTMLElement))continue;const n=F(e),g=P(e,n,u);g.hideNew===!0&&(f=g.hideNew),e.hidden=!g.match,g.match&&r++}const i=w.querySelector("[data-filter-new-item]"),t=!!i&&u.length>0&&!f;i instanceof HTMLElement&&(i.hidden=!t,t&&U(i,u)),D(w,r>0||t),d.dispatchEvent(new CustomEvent("filter-input-updated",{bubbles:!0,detail:{count:r,total:M}}))}s(k,"filterResults");function R(d,c,a){return{match:c.toLowerCase().indexOf(a.toLowerCase())!==-1,hideNew:c===a}}s(R,"matchSubstring");function F(d){return((d.querySelector("[data-filter-item-text]")||d).textContent||"").trim()}s(F,"getText");function U(d,c){const a=d.querySelector("[data-filter-new-item-text]");a&&(a.textContent=c);const u=d.querySelector("[data-filter-new-item-value]");(u instanceof HTMLInputElement||u instanceof HTMLButtonElement)&&(u.value=c)}s(U,"updateNewItem");function D(d,c){const a=d.querySelector("[data-filter-empty-state]");a instanceof HTMLElement&&(a.hidden=c)}s(D,"toggleBlankslate");function H(d){let c;return function(){clearTimeout(c),c=setTimeout(()=>{clearTimeout(c),d()},300)}}s(H,"debounce");const y=p;window.customElements.get("filter-input")||(window.FilterInputElement=p,window.customElements.define("filter-input",p))},88309:(W,I,q)=>{q.d(I,{Z:()=>H});const p=new WeakMap;class k extends HTMLElement{constructor(){super();const d=F.bind(null,this,!0),c={currentQuery:null,oninput:D(d),fetch:d,controller:null};p.set(this,c)}static get observedAttributes(){return["src"]}attributeChangedCallback(d,c){c&&d==="src"&&F(this,!1)}connectedCallback(){const d=this.input;if(!d)return;d.setAttribute("autocomplete","off"),d.setAttribute("spellcheck","false");const c=p.get(this);!c||(d.addEventListener("focus",c.fetch),d.addEventListener("change",c.fetch),d.addEventListener("input",c.oninput))}disconnectedCallback(){const d=this.input;if(!d)return;const c=p.get(this);!c||(d.removeEventListener("focus",c.fetch),d.removeEventListener("change",c.fetch),d.removeEventListener("input",c.oninput))}get input(){const d=this.querySelector("input, textarea");return d instanceof HTMLInputElement||d instanceof HTMLTextAreaElement?d:null}get src(){return this.getAttribute("src")||""}set src(d){this.setAttribute("src",d)}}s(k,"RemoteInputElement");function R(){return"AbortController"in window?new AbortController:{signal:null,abort(){}}}s(R,"makeAbortController");async function F(y,d){const c=y.input;if(!c)return;const a=p.get(y);if(!a)return;const u=c.value;if(d&&a.currentQuery===u)return;a.currentQuery=u;const E=y.src;if(!E)return;const w=document.getElementById(y.getAttribute("aria-owns")||"");if(!w)return;const T=new URL(E,window.location.href),P=new URLSearchParams(T.search);P.append(y.getAttribute("param")||"q",u),T.search=P.toString(),a.controller?a.controller.abort():(y.dispatchEvent(new CustomEvent("loadstart")),y.setAttribute("loading","")),a.controller=R();let M,r="";try{M=await U(y,T.toString(),{signal:a.controller.signal,credentials:"same-origin",headers:{accept:"text/fragment+html"}}),r=await M.text(),y.removeAttribute("loading"),a.controller=null}catch(f){f.name!=="AbortError"&&(y.removeAttribute("loading"),a.controller=null);return}M&&M.ok?(w.innerHTML=r,y.dispatchEvent(new CustomEvent("remote-input-success",{bubbles:!0}))):y.dispatchEvent(new CustomEvent("remote-input-error",{bubbles:!0}))}s(F,"fetchResults");async function U(y,d,c){try{const a=await fetch(d,c);return y.dispatchEvent(new CustomEvent("load")),y.dispatchEvent(new CustomEvent("loadend")),a}catch(a){throw a.name!=="AbortError"&&(y.dispatchEvent(new CustomEvent("error")),y.dispatchEvent(new CustomEvent("loadend"))),a}}s(U,"fetchWithNetworkEvents");function D(y){let d;return function(){clearTimeout(d),d=setTimeout(()=>{clearTimeout(d),y()},300)}}s(D,"debounce");const H=k;window.customElements.get("remote-input")||(window.RemoteInputElement=k,window.customElements.define("remote-input",k))},59753:(W,I,q)=>{q.d(I,{f:()=>G,on:()=>K});function p(){if(!(this instanceof p))return new p;this.size=0,this.uid=0,this.selectors=[],this.selectorObjects={},this.indexes=Object.create(this.indexes),this.activeIndexes=[]}s(p,"SelectorSet");var k=window.document.documentElement,R=k.matches||k.webkitMatchesSelector||k.mozMatchesSelector||k.oMatchesSelector||k.msMatchesSelector;p.prototype.matchesSelector=function(o,l){return R.call(o,l)},p.prototype.querySelectorAll=function(o,l){return l.querySelectorAll(o)},p.prototype.indexes=[];var F=/^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;p.prototype.indexes.push({name:"ID",selector:s(function(l){var h;if(h=l.match(F))return h[0].slice(1)},"matchIdSelector"),element:s(function(l){if(l.id)return[l.id]},"getElementId")});var U=/^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;p.prototype.indexes.push({name:"CLASS",selector:s(function(l){var h;if(h=l.match(U))return h[0].slice(1)},"matchClassSelector"),element:s(function(l){var h=l.className;if(h){if(typeof h=="string")return h.split(/\s/);if(typeof h=="object"&&"baseVal"in h)return h.baseVal.split(/\s/)}},"getElementClassNames")});var D=/^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;p.prototype.indexes.push({name:"TAG",selector:s(function(l){var h;if(h=l.match(D))return h[0].toUpperCase()},"matchTagSelector"),element:s(function(l){return[l.nodeName.toUpperCase()]},"getElementTagName")}),p.prototype.indexes.default={name:"UNIVERSAL",selector:function(){return!0},element:function(){return[!0]}};var H;typeof window.Map=="function"?H=window.Map:H=function(){function o(){this.map={}}return s(o,"Map"),o.prototype.get=function(l){return this.map[l+" "]},o.prototype.set=function(l,h){this.map[l+" "]=h},o}();var y=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;function d(o,l){o=o.slice(0).concat(o.default);var h=o.length,b,m,A,v,L=l,S,O,x=[];do if(y.exec(""),(A=y.exec(L))&&(L=A[3],A[2]||!L)){for(b=0;b<h;b++)if(O=o[b],S=O.selector(A[1])){for(m=x.length,v=!1;m--;)if(x[m].index===O&&x[m].key===S){v=!0;break}v||x.push({index:O,key:S});break}}while(A);return x}s(d,"parseSelectorIndexes");function c(o,l){var h,b,m;for(h=0,b=o.length;h<b;h++)if(m=o[h],l.isPrototypeOf(m))return m}s(c,"findByPrototype"),p.prototype.logDefaultIndexUsed=function(){},p.prototype.add=function(o,l){var h,b,m,A,v,L,S,O,x=this.activeIndexes,N=this.selectors,B=this.selectorObjects;if(typeof o=="string"){for(h={id:this.uid++,selector:o,data:l},B[h.id]=h,S=d(this.indexes,o),b=0;b<S.length;b++)O=S[b],A=O.key,m=O.index,v=c(x,m),v||(v=Object.create(m),v.map=new H,x.push(v)),m===this.indexes.default&&this.logDefaultIndexUsed(h),L=v.map.get(A),L||(L=[],v.map.set(A,L)),L.push(h);this.size++,N.push(o)}},p.prototype.remove=function(o,l){if(typeof o=="string"){var h,b,m,A,v,L,S,O,x=this.activeIndexes,N=this.selectors=[],B=this.selectorObjects,V={},$=arguments.length===1;for(h=d(this.indexes,o),m=0;m<h.length;m++)for(b=h[m],A=x.length;A--;)if(L=x[A],b.index.isPrototypeOf(L)){if(S=L.map.get(b.key),S)for(v=S.length;v--;)O=S[v],O.selector===o&&($||O.data===l)&&(S.splice(v,1),V[O.id]=!0);break}for(m in V)delete B[m],this.size--;for(m in B)N.push(B[m].selector)}};function a(o,l){return o.id-l.id}s(a,"sortById"),p.prototype.queryAll=function(o){if(!this.selectors.length)return[];var l={},h=[],b=this.querySelectorAll(this.selectors.join(", "),o),m,A,v,L,S,O,x,N;for(m=0,v=b.length;m<v;m++)for(S=b[m],O=this.matches(S),A=0,L=O.length;A<L;A++)N=O[A],l[N.id]?x=l[N.id]:(x={id:N.id,selector:N.selector,data:N.data,elements:[]},l[N.id]=x,h.push(x)),x.elements.push(S);return h.sort(a)},p.prototype.matches=function(o){if(!o)return[];var l,h,b,m,A,v,L,S,O,x,N,B=this.activeIndexes,V={},$=[];for(l=0,m=B.length;l<m;l++)if(L=B[l],S=L.element(o),S){for(h=0,A=S.length;h<A;h++)if(O=L.map.get(S[h]))for(b=0,v=O.length;b<v;b++)x=O[b],N=x.id,!V[N]&&this.matchesSelector(o,x.selector)&&(V[N]=!0,$.push(x))}return $.sort(a)};var u={},E={},w=new WeakMap,T=new WeakMap,P=new WeakMap,M=Object.getOwnPropertyDescriptor(Event.prototype,"currentTarget");function r(o,l,h){var b=o[l];return o[l]=function(){return h.apply(o,arguments),b.apply(o,arguments)},o}s(r,"before");function f(o,l,h){var b=[],m=l;do{if(m.nodeType!==1)break;var A=o.matches(m);if(A.length){var v={node:m,observers:A};h?b.unshift(v):b.push(v)}}while(m=m.parentElement);return b}s(f,"dist_matches");function i(){w.set(this,!0)}s(i,"trackPropagation");function t(){w.set(this,!0),T.set(this,!0)}s(t,"trackImmediate");function e(){return P.get(this)||null}s(e,"getCurrentTarget");function n(o,l){!M||Object.defineProperty(o,"currentTarget",{configurable:!0,enumerable:!0,get:l||M.get})}s(n,"defineCurrentTarget");function g(o){try{return o.eventPhase,!0}catch{return!1}}s(g,"canDispatch");function _(o){if(!!g(o)){var l=o.eventPhase===1?E:u,h=l[o.type];if(!!h){var b=f(h,o.target,o.eventPhase===1);if(!!b.length){r(o,"stopPropagation",i),r(o,"stopImmediatePropagation",t),n(o,e);for(var m=0,A=b.length;m<A&&!w.get(o);m++){var v=b[m];P.set(o,v.node);for(var L=0,S=v.observers.length;L<S&&!T.get(o);L++)v.observers[L].data.call(v.node,o)}P.delete(o),n(o)}}}}s(_,"dispatch");function K(o,l,h){var b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},m=!!b.capture,A=m?E:u,v=A[o];v||(v=new p,A[o]=v,document.addEventListener(o,_,m)),v.add(l,h)}s(K,"on");function C(o,l,h){var b=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},m=!!b.capture,A=m?E:u,v=A[o];!v||(v.remove(l,h),!v.size&&(delete A[o],document.removeEventListener(o,_,m)))}s(C,"off");function G(o,l,h){return o.dispatchEvent(new CustomEvent(l,{bubbles:!0,cancelable:!0,detail:h}))}s(G,"fire")},47142:(W,I,q)=>{q.d(I,{CD:()=>M,Gs:()=>T,m7:()=>P});var p=-1/0,k=1/0,R=-.005,F=-.005,U=-.01,D=1,H=.9,y=.8,d=.7,c=.6;function a(r){return r.toLowerCase()===r}s(a,"islower");function u(r){return r.toUpperCase()===r}s(u,"isupper");function E(r){for(var f=r.length,i=new Array(f),t="/",e=0;e<f;e++){var n=r[e];t==="/"?i[e]=H:t==="-"||t==="_"||t===" "?i[e]=y:t==="."?i[e]=c:a(t)&&u(n)?i[e]=d:i[e]=0,t=n}return i}s(E,"precompute_bonus");function w(r,f,i,t){for(var e=r.length,n=f.length,g=r.toLowerCase(),_=f.toLowerCase(),K=E(f,K),C=0;C<e;C++){i[C]=new Array(n),t[C]=new Array(n);for(var G=p,o=C===e-1?F:U,l=0;l<n;l++)if(g[C]===_[l]){var h=p;C?l&&(h=Math.max(t[C-1][l-1]+K[l],i[C-1][l-1]+D)):h=l*R+K[l],i[C][l]=h,t[C][l]=G=Math.max(h,G+o)}else i[C][l]=p,t[C][l]=G=G+o}}s(w,"compute");function T(r,f){var i=r.length,t=f.length;if(!i||!t)return p;if(i===t)return k;if(t>1024)return p;var e=new Array(i),n=new Array(i);return w(r,f,e,n),n[i-1][t-1]}s(T,"score");function P(r,f){var i=r.length,t=f.length,e=new Array(i);if(!i||!t)return e;if(i===t){for(var n=0;n<i;n++)e[n]=n;return e}if(t>1024)return e;var g=new Array(i),_=new Array(i);w(r,f,g,_);for(var K=!1,n=i-1,C=t-1;n>=0;n--)for(;C>=0;C--)if(g[n][C]!==p&&(K||g[n][C]===_[n][C])){K=n&&C&&_[n][C]===g[n-1][C-1]+D,e[n]=C--;break}return e}s(P,"positions");function M(r,f){r=r.toLowerCase(),f=f.toLowerCase();for(var i=r.length,t=0,e=0;t<i;t+=1)if(e=f.indexOf(r[t],e)+1,e===0)return!1;return!0}s(M,"hasMatch")},10160:(W,I,q)=>{q.d(I,{Z:()=>k});const p=!!navigator.userAgent.match(/Macintosh/);class k{constructor(u,E){this.input=u,this.list=E,this.isComposing=!1,E.id||(E.id=`combobox-${Math.random().toString().slice(2,6)}`),this.keyboardEventHandler=w=>R(w,this),this.compositionEventHandler=w=>y(w,this),this.inputHandler=this.clearSelection.bind(this),u.setAttribute("role","combobox"),u.setAttribute("aria-controls",E.id),u.setAttribute("aria-expanded","false"),u.setAttribute("aria-autocomplete","list"),u.setAttribute("aria-haspopup","listbox")}destroy(){this.clearSelection(),this.stop(),this.input.removeAttribute("role"),this.input.removeAttribute("aria-controls"),this.input.removeAttribute("aria-expanded"),this.input.removeAttribute("aria-autocomplete"),this.input.removeAttribute("aria-haspopup")}start(){this.input.setAttribute("aria-expanded","true"),this.input.addEventListener("compositionstart",this.compositionEventHandler),this.input.addEventListener("compositionend",this.compositionEventHandler),this.input.addEventListener("input",this.inputHandler),this.input.addEventListener("keydown",this.keyboardEventHandler),this.list.addEventListener("click",F)}stop(){this.clearSelection(),this.input.setAttribute("aria-expanded","false"),this.input.removeEventListener("compositionstart",this.compositionEventHandler),this.input.removeEventListener("compositionend",this.compositionEventHandler),this.input.removeEventListener("input",this.inputHandler),this.input.removeEventListener("keydown",this.keyboardEventHandler),this.list.removeEventListener("click",F)}navigate(u=1){const E=Array.from(this.list.querySelectorAll('[aria-selected="true"]')).filter(H)[0],w=Array.from(this.list.querySelectorAll('[role="option"]')).filter(H),T=w.indexOf(E);if(T===w.length-1&&u===1||T===0&&u===-1){this.clearSelection(),this.input.focus();return}let P=u===1?0:w.length-1;if(E&&T>=0){const r=T+u;r>=0&&r<w.length&&(P=r)}const M=w[P];if(!!M)for(const r of w)M===r?(this.input.setAttribute("aria-activedescendant",M.id),M.setAttribute("aria-selected","true"),d(this.list,M)):r.setAttribute("aria-selected","false")}clearSelection(){this.input.removeAttribute("aria-activedescendant");for(const u of this.list.querySelectorAll('[aria-selected="true"]'))u.setAttribute("aria-selected","false")}}s(k,"Combobox");function R(a,u){if(!(a.shiftKey||a.metaKey||a.altKey)&&!(!p&&a.ctrlKey)&&!u.isComposing)switch(a.key){case"Enter":case"Tab":U(u.input,u.list)&&a.preventDefault();break;case"Escape":u.clearSelection();break;case"ArrowDown":u.navigate(1),a.preventDefault();break;case"ArrowUp":u.navigate(-1),a.preventDefault();break;case"n":p&&a.ctrlKey&&(u.navigate(1),a.preventDefault());break;case"p":p&&a.ctrlKey&&(u.navigate(-1),a.preventDefault());break;default:if(a.ctrlKey)break;u.clearSelection()}}s(R,"keyboardBindings");function F(a){if(!(a.target instanceof Element))return;const u=a.target.closest('[role="option"]');!u||u.getAttribute("aria-disabled")!=="true"&&D(u)}s(F,"commitWithElement");function U(a,u){const E=u.querySelector('[aria-selected="true"]');return E?(E.getAttribute("aria-disabled")==="true"||E.click(),!0):!1}s(U,"commit");function D(a){a.dispatchEvent(new CustomEvent("combobox-commit",{bubbles:!0}))}s(D,"fireCommitEvent");function H(a){return!a.hidden&&!(a instanceof HTMLInputElement&&a.type==="hidden")&&(a.offsetWidth>0||a.offsetHeight>0)}s(H,"visible");function y(a,u){u.isComposing=a.type==="compositionstart",!!document.getElementById(u.input.getAttribute("aria-controls")||"")&&u.clearSelection()}s(y,"trackComposition");function d(a,u){c(a,u)||(a.scrollTop=u.offsetTop)}s(d,"scrollTo");function c(a,u){const E=a.scrollTop,w=E+a.clientHeight,T=u.offsetTop,P=T+u.clientHeight;return T>=E&&P<=w}s(c,"inViewport")},11793:(W,I,q)=>{q.d(I,{EL:()=>D,N9:()=>P,Tz:()=>M});class p{constructor(f){this.children=[],this.parent=f}delete(f){const i=this.children.indexOf(f);return i===-1?!1:(this.children=this.children.slice(0,i).concat(this.children.slice(i+1)),this.children.length===0&&this.parent.delete(this),!0)}add(f){return this.children.push(f),this}}s(p,"Leaf");class k{constructor(f){this.parent=null,this.children={},this.parent=f||null}get(f){return this.children[f]}insert(f){let i=this;for(let t=0;t<f.length;t+=1){const e=f[t];let n=i.get(e);if(t===f.length-1)return n instanceof k&&(i.delete(n),n=null),n||(n=new p(i),i.children[e]=n),n;n instanceof p&&(n=null),n||(n=new k(i),i.children[e]=n),i=n}return i}delete(f){for(const i in this.children)if(this.children[i]===f){const e=delete this.children[i];return Object.keys(this.children).length===0&&this.parent&&this.parent.delete(this),e}return!1}}s(k,"RadixTrie");function R(r){if(!(r instanceof HTMLElement))return!1;const f=r.nodeName.toLowerCase(),i=(r.getAttribute("type")||"").toLowerCase();return f==="select"||f==="textarea"||f==="input"&&i!=="submit"&&i!=="reset"&&i!=="checkbox"&&i!=="radio"||r.isContentEditable}s(R,"isFormField");function F(r,f){const i=new CustomEvent("hotkey-fire",{cancelable:!0,detail:{path:f}});!r.dispatchEvent(i)||(R(r)?r.focus():r.click())}s(F,"fireDeterminedAction");function U(r){const f=[];let i=[""],t=!1;for(let e=0;e<r.length;e++){if(t&&r[e]===","){f.push(i),i=[""],t=!1;continue}if(r[e]===" "){i.push(""),t=!1;continue}else r[e]==="+"?t=!1:t=!0;i[i.length-1]+=r[e]}return f.push(i),f.map(e=>e.filter(n=>n!=="")).filter(e=>e.length>0)}s(U,"expandHotkeyToEdges");function D(r){const{ctrlKey:f,altKey:i,metaKey:t,key:e}=r,n=[],g=[f,i,t,y(r)];for(const[_,K]of g.entries())K&&n.push(H[_]);return H.includes(e)||n.push(e),n.join("+")}s(D,"hotkey");const H=["Control","Alt","Meta","Shift"];function y(r){const{shiftKey:f,code:i,key:t}=r;return f&&!(i.startsWith("Key")&&t.toUpperCase()===t)}s(y,"showShift");const d=new k,c=new WeakMap;let a=d,u=null,E=[];function w(){E=[],u=null,a=d}s(w,"resetTriePosition");function T(r){if(r.defaultPrevented||!(r.target instanceof Node))return;if(R(r.target)){const i=r.target;if(!i.id||!i.ownerDocument.querySelector(`[data-hotkey-scope="${i.id}"]`))return}u!=null&&window.clearTimeout(u),u=window.setTimeout(w,1500);const f=a.get(D(r));if(!f){w();return}if(E.push(D(r)),a=f,f instanceof p){const i=r.target;let t=!1,e;const n=R(i);for(let g=f.children.length-1;g>=0;g-=1){e=f.children[g];const _=e.getAttribute("data-hotkey-scope");if(!n&&!_||n&&i.id===_){t=!0;break}}e&&t&&(F(e,E),r.preventDefault()),w()}}s(T,"keyDownHandler");function P(r,f){Object.keys(d.children).length===0&&document.addEventListener("keydown",T);const t=U(f||r.getAttribute("data-hotkey")||"").map(e=>d.insert(e).add(r));c.set(r,t)}s(P,"install");function M(r){const f=c.get(r);if(f&&f.length)for(const i of f)i&&i.delete(r);Object.keys(d.children).length===0&&document.removeEventListener("keydown",T)}s(M,"uninstall")}}]);})();

//# sourceMappingURL=6637-184720a76257.js.map