(this.webpackJsonpplaid=this.webpackJsonpplaid||[]).push([[0],{48:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},81:function(e,t,n){},82:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){},87:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},90:function(e,t,n){"use strict";n.r(t);var a,c=n(1),r=n.n(c),s=n(15),i=n.n(s),o=n(14),l=n(5),u=n(16),d=n(39),j=n(4),b=n.n(j),O=n(9),h=n(3),x=Object(c.createContext)({isLoggedIn:!1,token:null,login:function(){},logout:function(){},userId:null,name:null}),p=(n(48),n(0)),m=function(e){return e.href?Object(p.jsx)("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.dark&&"button--dark"," ").concat(e.danger&&"button--danger"),href:e.href,children:e.children}):e.to?Object(p.jsx)(o.b,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.dark&&"button--dark"," ").concat(e.danger&&"button--danger"),children:e.children}):Object(p.jsx)("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.dark&&"button--dark"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled,children:e.children})},v=(n(57),function(e){return Object(p.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}),f=n(6),k=n(92),g=(n(58),function(e){return i.a.createPortal(Object(p.jsx)("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))}),N=(n(59),function(e){var t=Object(p.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[Object(p.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:Object(p.jsx)("h2",{children:e.header})}),Object(p.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[Object(p.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),Object(p.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});return i.a.createPortal(t,document.getElementById("modal-hook"))}),y=function(e){return Object(p.jsxs)(r.a.Fragment,{children:[e.show&&Object(p.jsx)(g,{onClick:e.onCancel}),Object(p.jsx)(k.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:Object(p.jsx)(N,Object(f.a)({},e))})]})},I=function(e){return Object(p.jsx)(y,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:Object(p.jsx)(m,{onClick:e.onClear,children:"Okay"}),children:Object(p.jsx)("h4",{style:{color:"black"},children:e.error})})},_=(n(60),function(e){return Object(p.jsx)("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay"),children:Object(p.jsx)("div",{className:"lds-dual-ring"})})}),E=(n(61),function(e){return e.transactions.length?Object(p.jsx)("ul",{className:"transaction-list",children:e.transactions.map((function(e){return Object(p.jsx)("li",{children:Object(p.jsxs)(v,{className:"transaction-item",children:[Object(p.jsx)("h2",{children:e.name}),Object(p.jsxs)("h3",{children:["$",e.amount]})]})},e.transaction_id)}))}):Object(p.jsx)("div",{className:"transaction-list center",children:Object(p.jsx)(v,{className:"transaction-item",children:Object(p.jsx)("h2",{children:"No transactions found."})})})}),w=n(35),C=n.n(w),S=function(){var e=Object(c.useState)(!1),t=Object(h.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(),s=Object(h.a)(r,2),i=s[0],o=s[1];return{isLoading:n,error:i,sendRequest:Object(c.useCallback)(Object(O.a)(b.a.mark((function e(){var t,n,c,r,s,i=arguments;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:"GET",n=i.length>1?i[1]:void 0,c=i.length>2&&void 0!==i[2]?i[2]:null,r=i.length>3&&void 0!==i[3]?i[3]:{},a(!0),console.log(t,n,c,r),e.next=8,C()({method:t,url:n,data:c,headers:r}).then((function(e){a(!1),s=e.data})).catch((function(e){throw o(e.response.data.message),a(!1),e}));case 8:return e.abrupt("return",s);case 9:case"end":return e.stop()}}),e)}))),[]),clearError:function(){o(null)}}},T=function(e){var t,n=Object(c.useContext)(x),a=Object(c.useState)("LOADING"),s=Object(h.a)(a,2),i=s[0],o=s[1],u=Object(l.g)(),d=u.accountId,j=u.subAccount,f=S(),k=f.isLoading,g=f.error,N=f.sendRequest,y=f.clearError;return Object(c.useEffect)((function(){(function(){var e=Object(O.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N("GET","http://localhost:5000/api/accounts/".concat(d,"/").concat(j),{userId:n.userId},{"x-auth-token":n.token});case 3:t=e.sent,o(t),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[d,n.token,n.userId,N,j]),Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)(I,{error:g,onClear:y}),k&&Object(p.jsx)(_,{asOverlay:!0}),Object(p.jsx)("div",{className:"account-nav",children:Object(p.jsx)(m,{inverse:!0,className:"account-nav__button",to:"/acc=".concat(d),children:"RETURN"})}),Object(p.jsxs)(v,{className:"account-card",children:[Object(p.jsxs)("div",{className:"account-card__header",children:[(null===(t=i.balanceResponse)||void 0===t?void 0:t.accounts[0].name)||"LOADING",Object(p.jsx)(R,{balanceResponse:i.balanceResponse})]}),i.transactionResponse&&Object(p.jsx)(E,{transactions:i.transactionResponse.transactions})]})]})},R=function(e){var t,n,a;return Object(p.jsxs)("div",{className:"account-details__balance",children:[Object(p.jsxs)("div",{className:"account-details__balance-large",children:["$",(null===(t=e.balanceResponse)||void 0===t?void 0:t.accounts[0].balances.current)||0]}),"(of","  ",(null===(n=e.balanceResponse)||void 0===n?void 0:n.accounts[0].balances.available)+(null===(a=e.balanceResponse)||void 0===a?void 0:a.accounts[0].balances.current)||0,")"]})},L=n(36),A=(n(79),function(e){var t=Object(l.g)().accountId;return e.accounts.length?Object(p.jsx)(r.a.Fragment,{children:e.accounts.map((function(n){return Object(p.jsxs)(o.b,{className:"accountslist-card accountslist-card__".concat(e.size||"default"," ").concat(e.dark&&"accountslist-card__dark"),to:n.name?"/acc=".concat(t,"/sub=").concat(n.account_id):"/acc=".concat(n.id),children:[Object(p.jsx)("div",{className:"accountslist-card__header"}),Object(p.jsxs)("div",{className:"accountslist-card__info",children:[n.institutionName||n.name,n.name&&Object(p.jsx)("div",{className:"accountslist-card__icon",children:Object(p.jsx)(V,{subtype:n.subtype})})]})]},n.id||n.account_id)}))}):Object(p.jsx)("div",{children:"Error"})}),V=function(e){var t;switch(e.subtype){case"checking":t="money-check-alt";break;case"credit card":t="credit-card";break;case"mortgage":t="home";break;case"savings":t="piggy-bank";break;case"student":t="user-graduate";break;default:t="file-invoice-dollar"}return Object(p.jsx)(L.a,{size:"2x",icon:t})},P=(n(80),function(e){var t=Object(c.useState)([]),n=Object(h.a)(t,2),a=n[0],s=n[1],i=Object(l.g)().accountId,o=Object(c.useContext)(x),u=Object(c.useState)("LOADING"),d=Object(h.a)(u,2),j=d[0],f=d[1],k=Object(c.useState)([]),g=Object(h.a)(k,2),N=g[0],y=g[1],w=S(),C=w.isLoading,T=w.error,R=w.sendRequest,L=w.clearError;return Object(c.useEffect)((function(){i&&function(){var e=Object(O.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R("GET","http://localhost:5000/api/accounts/".concat(i),{userId:o.userId},{"x-auth-token":o.token});case 3:t=e.sent,f(t.institutionResponse.institution.name),s(t.balanceResponse.accounts),y(t.transactionResponse.transactions),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}()()}),[i,o.token,o.userId,R]),Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)(I,{error:T,onClear:L}),C&&Object(p.jsx)(_,{asOverlay:!0}),Object(p.jsx)("div",{className:"account-nav",children:Object(p.jsx)(m,{inverse:!0,className:"account-nav__button",to:"/",children:"RETURN"})}),Object(p.jsxs)(v,{className:"account-card",children:[Object(p.jsx)("div",{className:"account-card__header",children:j}),a.length&&Object(p.jsx)("div",{className:"account-card__list",children:Object(p.jsx)(A,{dark:!0,accounts:a})}),N.length&&Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)("div",{className:"account-card__text",children:"Transaction Overview"}),Object(p.jsx)(E,{transactions:N})]})]})]})}),G=(n(81),function(e){var t=Object(c.useContext)(x);return Object(p.jsxs)("div",{className:"header-container",children:[Object(p.jsxs)("div",{className:"header-info",children:["Welcome",t.isLoggedIn&&" ".concat(t.name.replace(/^\w/,(function(e){return e.toUpperCase()})))]}),Object(p.jsxs)("div",{className:"header-buttons",children:[Object(p.jsx)(m,{to:"/",children:"ACCOUNTS"}),Object(p.jsx)(m,{to:"/income",children:"INCOME"}),Object(p.jsx)(m,{onClick:function(){t.logout()},children:"LOGOUT"}),Object(p.jsx)(o.b,{to:"/user",children:Object(p.jsx)("img",{className:"header-avatar",src:"".concat(t.image),alt:"Profile"})})]})]})}),D=n(24),F=(n(82),function(e){var t=Object(c.useState)([]),n=Object(h.a)(t,2),a=n[0],s=n[1],i=Object(c.useContext)(x),o=S(),l=o.isLoading,u=o.error,d=o.sendRequest,j=o.clearError,m=Object(c.useState)(),f=Object(h.a)(m,2),k=f[0],g=f[1];Object(c.useEffect)((function(){i.token&&function(){var e=Object(O.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d("GET","http://localhost:5000/api/token/create-link-token",{userId:i.userId},{"x-auth-token":i.token});case 3:t=e.sent,g(t),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}()()}),[i.userId,i.token,d]),Object(c.useEffect)((function(){k&&function(){var e=Object(O.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d("GET","http://localhost:5000/api/accounts",{userId:i.userId},{"x-auth-token":i.token});case 3:t=e.sent,s(t.accounts),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}()()}),[i.userId,i.token,d,k]);var N,y=Object(c.useCallback)(function(){var e=Object(O.a)(b.a.mark((function e(t,n){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d("POST","http://localhost:5000/api/token/token-exchange",{publicToken:t,metadata:n,token:i.token},{"x-auth-token":i.token});case 3:a=e.sent,console.log(a),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}(),[i.token,d]);return N=a.length?Object(p.jsxs)("div",{className:"home-accounts",children:[Object(p.jsx)(A,{accounts:a,userId:i.userId}),Object(p.jsx)(v,{className:"plaid-card",children:Object(p.jsx)(D.PlaidLink,{className:"plaid-card__content",token:k,onSuccess:y,children:"Link via Plaid"})})]}):Object(p.jsxs)("div",{className:"home-empty",children:[Object(p.jsxs)("div",{children:[Object(p.jsx)("h3",{children:"No Accounts found!"}),Object(p.jsx)("h4",{children:"Link your account now with plaid, Click the 'Link via Plaid' button to get started."})]}),k&&Object(p.jsx)(v,{className:"plaid-card",children:Object(p.jsx)(D.PlaidLink,{className:"plaid-card__content",token:k,onSuccess:y,children:"Link via Plaid"})})]}),Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)(I,{error:u,onClear:j}),l&&Object(p.jsx)(_,{asOverlay:!0}),N]})}),U=n(83),M=function(e,t){if(!e.length)return 0;switch(t){case"income":return e.filter((function(e){return e.amount<0}));case"expenditure":return e.filter((function(e){return e.amount>0}));default:return 0}},H=function(e){return e.length?e.reduce((function(e,t){return e+t.amount}),0):0},q=function(e){if(!e.length)return 0;for(var t=U(),n=[[],[],[],[],[],[],[],[],[],[],[],[]],a=0;a<e.length;a++)n[-U(e[a].date).diff(t,"months")].push(e[a]);return n},B=(n(85),function(e){var t,n=Object(c.useContext)(x),a=Object(c.useState)(),s=Object(h.a)(a,2),i=s[0],o=s[1],l=S(),u=l.isLoading,d=l.error,j=l.sendRequest,m=l.clearError;return Object(c.useEffect)((function(){n.token&&function(){var e=Object(O.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j("GET","http://localhost:5000/api/income/12",{userId:n.userId},{"x-auth-token":n.token});case 3:t=e.sent,o(t.transactionResponse.transactions),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}()()}),[n.token,n.userId,j]),t=i?Object(p.jsxs)(v,{className:"account-card",children:[Object(p.jsx)("div",{className:"account-card__header",children:"INCOME"}),Object(p.jsxs)("div",{className:"income-details",children:[Object(p.jsx)(z,{transactions:i}),Object(p.jsx)(J,{transactions:i})]})]}):Object(p.jsx)("h2",{children:"LOADING"}),Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)(I,{error:d,onClear:m}),u&&Object(p.jsx)(_,{asOverlay:!0}),t]})}),z=function(e){var t;return Object(p.jsxs)("div",{className:"income-cards__container",children:[Object(p.jsxs)("div",{className:"income-card",children:[Object(p.jsx)("div",{className:"income-card__header",children:"Transactions"}),(null===(t=e.transactions)||void 0===t?void 0:t.length)||0]}),Object(p.jsxs)("div",{className:"income-card",children:[Object(p.jsx)("div",{className:"income-card__header",children:"Income"}),H(M(e.transactions,"income")).toFixed(2)]}),Object(p.jsxs)("div",{className:"income-card",children:[Object(p.jsx)("div",{className:"income-card__header",children:"Spending"}),H(M(e.transactions,"expenditure")).toFixed(2)]}),Object(p.jsxs)("div",{className:"income-card",children:[Object(p.jsx)("div",{className:"income-card__header",children:"Totals"}),H(e.transactions).toFixed(2)]})]})},J=function(e){var t=H(M(e.transactions,"income")).toFixed(2),n=H(M(e.transactions,"expenditure")).toFixed(2),a=function(e){if(!q.length)return 0;for(var t=0,n=0;n<e.length;n++)H(e[0])>0&&t++;return t}(q(e.transactions)),c=function(e,t){var n=e-t;switch(!0){case n>=e/2:return 2;case.1*e<=n&&n<=.49*e:return 3;case.02*e<=n&&n<=.09*e:return 4;case 0<=n&&n<=.01*e:return 5;case.01*e<=Math.abs(-n)&&Math.abs(-n)<=1.9*e:return 6;case Math.abs(-n)>=1.1*e:return 7;default:return 0}}(t,n),r=function(e,t){if(!e)return-1;switch(e){case 2:return t>=6?100:95;case 3:return t>=6?85:80;case 4:return t>=6?75:70;case 5:return t>=6?50:45;case 6:return t>=6?25:20;case 7:return 0;default:return-1}}(c,a);return Object(p.jsxs)("div",{className:"income-risk",children:[Object(p.jsx)("div",{className:"income-risk__header",children:"RISK ANALYSIS"}),Object(p.jsxs)("div",{className:"income-risk__details",children:["ANNUAL NET: ",t,Object(p.jsx)("br",{}),"POSITIVES MONTHS: ",a,Object(p.jsx)("br",{}),"RISK CATEGORY: ",c,Object(p.jsx)("br",{}),"CALCULATED SCORE: ",r]})]})},W=n(18),Y=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var a in e.inputs)e.inputs[a]&&(n=a===t.inputId?n&&t.isValid:n&&e.inputs[a].isValid);return Object(f.a)(Object(f.a)({},e),{},{inputs:Object(f.a)(Object(f.a)({},e.inputs),{},Object(W.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},$=(n(86),function(e){var t=Object(c.useState)(),n=Object(h.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)(),i=Object(h.a)(s,2),o=i[0],l=i[1],u=Object(c.useState)(!1),d=Object(h.a)(u,2),j=d[0],b=d[1],O=Object(c.useRef)();Object(c.useEffect)((function(){if(a){var e=new FileReader;e.onload=function(){l(e.result)},e.readAsDataURL(a)}}),[a]);return Object(p.jsxs)("div",{className:"form-control",children:[Object(p.jsx)("input",{id:e.id,ref:O,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg",onChange:function(t){var n,a=j;t.target.files&&1===t.target.files.length?(n=t.target.files[0],r(n),b(!0),a=!0):(b(!1),a=!1),e.onInput(e.id,n,a)}}),Object(p.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[Object(p.jsxs)("div",{className:"image-upload__preview",children:[o&&Object(p.jsx)("img",{src:o,alt:"Preview"}),!o&&Object(p.jsx)("p",{children:"Please pick an image."})]}),Object(p.jsx)(m,{dark:!0,type:"button",onClick:function(){O.current.click()},children:"BROWSE"})]}),!j&&Object(p.jsx)("p",{children:e.errorText})]})}),K=n(37),X="REQUIRE",Q="MINLENGTH",Z="MAXLENGTH",ee="EMAIL",te=function(e,t){var n,a=!0,c=Object(K.a)(t);try{for(c.s();!(n=c.n()).done;){var r=n.value;r.type===X&&(a=a&&e.trim().length>0),r.type===Q&&(a=a&&e.trim().length>=r.val),r.type===Z&&(a=a&&e.trim().length<=r.val),"MIN"===r.type&&(a=a&&+e>=r.val),"MAX"===r.type&&(a=a&&+e<=r.val),r.type===ee&&(a=a&&/^\S+@\S+\.\S+$/.test(e))}}catch(s){c.e(s)}finally{c.f()}return a},ne=(n(87),function(e){var t=Object(c.useReducer)(ae,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),n=Object(h.a)(t,2),a=n[0],r=n[1],s=e.id,i=e.onInput,o=a.value,l=a.isValid;Object(c.useEffect)((function(){i(s,o,l)}),[s,o,l,i]);var u=function(t){r({type:"CHANGE",val:t.target.value,validators:e.validators})},d=function(){r({type:"TOUCH"})},j="input"===e.element?Object(p.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:u,onBlur:d,value:a.value}):Object(p.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:u,onBlur:d,value:a.value});return Object(p.jsxs)("div",{className:"form-control ".concat(!a.isValid&&a.isTouched&&"form-control--invalid"),children:[Object(p.jsx)("label",{style:{color:"black"},htmlFor:e.id,children:e.label}),j,!a.isValid&&a.isTouched&&Object(p.jsx)("p",{children:e.errorText})]})}),ae=function(e,t){switch(t.type){case"CHANGE":return Object(f.a)(Object(f.a)({},e),{},{value:t.val,isValid:te(t.val,t.validators)});case"TOUCH":return Object(f.a)(Object(f.a)({},e),{},{isTouched:!0});default:return e}},ce=(n(88),function(){var e,t=Object(c.useContext)(x),n=Object(c.useState)(!0),a=Object(h.a)(n,2),r=a[0],s=a[1],i=S(),o=i.isLoading,l=i.error,u=i.sendRequest,d=i.clearError,j=function(e,t){var n=Object(c.useReducer)(Y,{inputs:e,isValid:t}),a=Object(h.a)(n,2),r=a[0],s=a[1];return[r,Object(c.useCallback)((function(e,t,n){s({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),Object(c.useCallback)((function(e,t){s({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),k=Object(h.a)(j,3),g=k[0],N=k[1],y=k[2],E=function(){var e=Object(O.a)(b.a.mark((function e(n){var a,c,s;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!r){e.next=13;break}return e.prev=2,e.next=5,u("POST","http://localhost:5000/api/users",{email:g.inputs.email.value,password:g.inputs.password.value});case 5:a=e.sent,t.login(a.token),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(2);case 11:e.next=27;break;case 13:return e.prev=13,(c=new FormData).append("email",g.inputs.email.value),c.append("image",g.inputs.image.value),c.append("name",g.inputs.name.value),c.append("password",g.inputs.password.value),e.next=21,u("POST","http://localhost:5000/api/users/create",c);case 21:s=e.sent,t.login(s.token),e.next=27;break;case 25:e.prev=25,e.t1=e.catch(13);case 27:case"end":return e.stop()}}),e,null,[[2,9],[13,25]])})));return function(t){return e.apply(this,arguments)}}();return Object(p.jsx)("section",{className:"landing",children:Object(p.jsx)("div",{className:"dark-overlay",children:Object(p.jsxs)("div",{className:"landing-inner",children:[Object(p.jsx)("h1",{className:"x-large",children:"Cuddly Octo Doodle"}),Object(p.jsx)(I,{error:l,onClear:d}),Object(p.jsxs)(v,{className:"authentication",children:[o&&Object(p.jsx)(_,{asOverlay:!0}),Object(p.jsx)("h2",{style:{color:"black"},children:"Login Required"}),Object(p.jsx)("hr",{}),Object(p.jsxs)("form",{onSubmit:E,children:[Object(p.jsx)(ne,{element:"input",id:"email",type:"email",label:"E-Mail",validators:[{type:ee}],errorText:"Please enter a valid email address.",onInput:N}),!r&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)($,{center:!0,id:"image",onInput:N,errorText:"Please provide an image."}),Object(p.jsx)(ne,{element:"input",id:"name",type:"text",label:"Your Name",validators:[{type:X}],errorText:"Please enter a name.",onInput:N})]}),Object(p.jsx)(ne,{element:"input",id:"password",type:"password",label:"Password",validators:[(e=5,{type:Q,val:e})],errorText:"Please enter a valid password, at least 5 characters.",onInput:N}),Object(p.jsx)(m,{dark:!0,disabled:!g.isValid,type:"submit",children:r?"LOGIN":"SIGNUP"})]}),Object(p.jsxs)(m,{dark:!0,onClick:function(){r?y(Object(f.a)(Object(f.a)({},g.inputs),{},{email:{value:"",isValid:!1},password:{value:null,isValid:!1}}),!1):y(Object(f.a)(Object(f.a)({},g.inputs),{},{email:void 0,image:void 0,name:void 0,password:void 0}),g.inputs.email.isValid&&g.inputs.password.isValid),s((function(e){return!e}))},children:["SWITCH TO ",r?"SIGNUP":"LOGIN"]})]})]})})})}),re=n(38),se=function(e){var t=Object(c.useContext)(x);return Object(p.jsxs)("div",{children:["Hello ",t.name,Object(p.jsx)("img",{src:t.image,alt:"Avatar"})]})};n(89);u.b.add(d.a);var ie=function(){var e=function(){var e=Object(c.useState)({email:null,name:null,userId:null,token:null,tokenExpiry:null}),t=Object(h.a)(e,2),n=t[0],r=t[1],s=Object(c.useCallback)((function(e,t){var n=Object(re.a)(e),a=t||new Date((new Date).getTime()+36e5);r((function(t){return Object(f.a)(Object(f.a)(Object(f.a)({},t),n.user),{},{token:e,tokenExpiry:a})})),localStorage.setItem("userData",JSON.stringify({token:e,tokenExpiry:a.toISOString()}))}),[]),i=Object(c.useCallback)((function(){r({email:null,name:null,userId:null,token:null,tokenExpiry:null}),localStorage.removeItem("userData")}),[]);return Object(c.useEffect)((function(){if(n.token&&n.tokenExpiry){var e=n.tokenExpiry.getTime()-(new Date).getTime();a=setTimeout(i,e)}else clearTimeout(a)}),[n,i]),Object(c.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&new Date(e.tokenExpiry)>new Date&&s(e.token,new Date(e.tokenExpiry))}),[s]),{token:n,login:s,logout:i}}(),t=e.token,n=e.login,r=e.logout,s=oe(!!t.token);return Object(p.jsx)(x.Provider,{value:{isLoggedIn:!!t.token,login:n,logout:r,email:t.email,image:t.image,name:t.name,userId:t.userId,token:t.token},children:Object(p.jsx)(o.a,{children:s})})},oe=function(e){return e?Object(p.jsxs)(r.a.Fragment,{children:[Object(p.jsx)(G,{}),Object(p.jsx)("div",{className:"viewport",children:Object(p.jsxs)(l.d,{children:[Object(p.jsx)(l.b,{path:"/",exact:!0,children:Object(p.jsx)(F,{})}),Object(p.jsx)(l.b,{path:"/acc=:accountId",exact:!0,children:Object(p.jsx)(P,{})}),Object(p.jsx)(l.b,{path:"/acc=:accountId/sub=:subAccount",exact:!0,children:Object(p.jsx)(T,{})}),Object(p.jsx)(l.b,{path:"/income",exact:!0,children:Object(p.jsx)(B,{})}),Object(p.jsx)(l.b,{path:"/user",exact:!0,children:Object(p.jsx)(se,{})}),Object(p.jsx)(l.a,{to:"/",exact:!0})]})})]}):Object(p.jsxs)(l.d,{children:[Object(p.jsx)(l.b,{path:"/",exact:!0,children:Object(p.jsx)(ce,{})}),Object(p.jsx)(l.a,{to:"/"})]})};i.a.render(Object(p.jsx)(ie,{}),document.getElementById("root"))}},[[90,1,2]]]);
//# sourceMappingURL=main.4e0128cd.chunk.js.map