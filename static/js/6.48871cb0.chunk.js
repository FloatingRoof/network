(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[6],{102:function(e,a,t){e.exports={error:"TextError_error__2prsr"}},103:function(e,a,t){e.exports={formControl:"Input_formControl__3XvQ8",input:"Input_input__1lvc_",inputError:"Input_inputError__JB4zq",label:"Input_label__3kwMT",bar:"Input_bar__2AqTf",barError:"Input_barError__27iNJ"}},104:function(e,a,t){e.exports={customCheckbox:"CheckBox_customCheckbox__7jC05"}},106:function(e,a,t){"use strict";var r=t(2),c=t(38),n=t(1),l=t.n(n),o=t(98),s=t(97),i=t(103),b=t.n(i),j=t(0),u=["label","name","error"];var m=function(e){var a=e.label,t=e.name,n=e.error,l=Object(c.a)(e,u);return Object(j.jsxs)("div",{className:b.a.formControl,children:[Object(j.jsx)(o.b,Object(r.a)({className:b.a.input+" "+(n&&b.a.inputError),id:t,name:t},l)),Object(j.jsx)("span",{className:b.a.bar+" "+(n&&b.a.barError)}),Object(j.jsx)("label",{className:b.a.label,htmlFor:t,children:a}),Object(j.jsx)(o.a,{component:s.a,name:t})]})},d=["label","name"];var O=function(e){var a=e.label,t=e.name,n=Object(c.a)(e,d);return Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{htmlFor:t,children:a}),Object(j.jsx)(o.b,Object(r.a)({as:"textarea",id:t,name:t},n)),Object(j.jsx)(o.a,{component:s.a,name:t})]})},x=["label","name","options"];var h=function(e){var a=e.label,t=e.name,n=e.options,l=Object(c.a)(e,x);return Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{htmlFor:t,children:a}),Object(j.jsx)(o.b,Object(r.a)(Object(r.a)({as:"select",id:t,name:t},l),{},{children:n.map((function(e){return Object(j.jsx)("option",{value:e.value,children:e.key},e.value)}))})),Object(j.jsx)(o.a,{component:s.a,name:t})]})},p=["label","name","options"];var v=function(e){var a=e.label,t=e.name,n=e.options,i=Object(c.a)(e,p);return Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{children:a}),Object(j.jsx)(o.b,{name:t,children:function(e){var a=e.field;return n.map((function(e){return Object(j.jsxs)(l.a.Fragment,{children:[Object(j.jsx)("input",Object(r.a)(Object(r.a)(Object(r.a)({type:"radio",id:e.value},a),i),{},{value:e.value,checked:a.value===e.value})),Object(j.jsx)("label",{htmlFor:e.value,children:e.key})]},e.key)}))}}),Object(j.jsx)(o.a,{component:s.a,name:t})]})},f=["label","name","options"];var _=function(e){var a=e.label,t=e.name,n=e.options,i=Object(c.a)(e,f);return Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{children:a}),Object(j.jsx)(o.b,{name:t,children:function(e){var a=e.field;return n.map((function(e){return Object(j.jsxs)(l.a.Fragment,{children:[Object(j.jsx)("input",Object(r.a)(Object(r.a)(Object(r.a)({type:"checkbox",id:e.value},a),i),{},{value:e.value,checked:a.value.includes(e.value)})),Object(j.jsx)("label",{htmlFor:e.value,children:e.key})]},e.key)}))}}),Object(j.jsx)(o.a,{component:s.a,name:t})]})},k=t(104),N=t.n(k),g=["label","name"];var y=function(e){var a=e.label,t=e.name,n=Object(c.a)(e,g);return Object(j.jsxs)("div",{children:[Object(j.jsx)(o.b,Object(r.a)({className:N.a.customCheckbox,type:"checkbox",id:t,name:t},n)),Object(j.jsx)("label",{htmlFor:t,children:a}),Object(j.jsx)(o.a,{component:s.a,name:t})]})},w=["control"];a.a=function(e){var a=e.control,t=Object(c.a)(e,w);switch(a){case"input":return Object(j.jsx)(m,Object(r.a)({},t));case"textarea":return Object(j.jsx)(O,Object(r.a)({},t));case"select":return Object(j.jsx)(h,Object(r.a)({},t));case"radio":return Object(j.jsx)(v,Object(r.a)({},t));case"checkboxGroup":return Object(j.jsx)(_,Object(r.a)({},t));case"checkBox":return Object(j.jsx)(y,Object(r.a)({},t));default:return null}}},263:function(e,a,t){e.exports={mainBlock:"Login_mainBlock__zWe3G",field:"Login_field__1QQYn",button:"Login_button__2AW25",blockButton:"Login_blockButton__2UCNr",blockError:"Login_blockError__2AqgI"}},266:function(e,a,t){"use strict";t.r(a);var r=t(40),c=t(98),n=(t(1),t(117)),l=t(106),o=t(21),s=t(14),i=t(3),b=t(97),j=t(263),u=t.n(j),m=t(0),d=function(e){var a=n.a({email:n.b().email("Invalid email format").required("Required"),password:n.b().required("Required")});return Object(m.jsx)(c.d,{initialValues:{email:"",password:"",rememberMe:!1},validationSchema:a,onSubmit:function(a,t){var r=t.setStatus;e.login(a.email,a.password,a.rememberMe,r),console.log("Submit",a)},children:function(e){return Object(m.jsxs)(c.c,{children:[Object(m.jsx)("div",{className:u.a.field,children:Object(m.jsx)(l.a,Object(r.a)({error:e.touched.email&&e.errors.email,label:"Email",control:"input",type:"email",name:"email"},"name","email"))}),Object(m.jsx)("div",{className:u.a.field,children:Object(m.jsx)(l.a,{error:e.touched.password&&e.errors.password,control:"input",type:"password",name:"password",label:"Password"})}),Object(m.jsx)("div",{className:u.a.field,children:Object(m.jsx)(l.a,{control:"checkBox",label:"Remember me",name:"rememberMe"})}),Object(m.jsx)("div",{className:u.a.blockButton,children:Object(m.jsx)("button",{className:u.a.button,type:"submit",disabled:!e.isValid,children:"LOGIN"})}),Object(m.jsx)("div",{className:u.a.blockError,children:Object(m.jsx)(b.a,{children:e.status})})]})}})};a.default=Object(s.b)((function(e){return{isAuth:e.auth.isAuth}}),{login:o.c})((function(e){return e.isAuth?Object(m.jsx)(i.a,{to:"/profile"}):Object(m.jsx)("div",{className:"content-block "+u.a.mainBlock,children:Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{children:"Login"}),Object(m.jsx)(d,{login:e.login})]})})}))},97:function(e,a,t){"use strict";t(1);var r=t(102),c=t.n(r),n=t(0);a.a=function(e){return Object(n.jsx)("div",{className:c.a.error,children:e.children})}}}]);
//# sourceMappingURL=6.48871cb0.chunk.js.map