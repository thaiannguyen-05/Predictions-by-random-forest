exports.id=785,exports.ids=[785],exports.modules={5303:()=>{},4842:(e,r,t)=>{"use strict";t.d(r,{Z:()=>n});var a=t(3708);let n=(0,a.Z)("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},9560:(e,r,t)=>{"use strict";t.d(r,{Z:()=>n});var a=t(3708);let n=(0,a.Z)("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},8303:(e,r,t)=>{"use strict";t.d(r,{kX:()=>y,zx:()=>i,t7:()=>Z,Zb:()=>h,Ol:()=>p,TT:()=>f,t1:()=>C,v$:()=>T,II:()=>c,S$:()=>I,cq:()=>z,$0:()=>S,M$:()=>F,Ph:()=>m,gx:()=>x});var a=t(3854);t(4218);var n=t(5548),s=t.n(n),l=t(9560);let d={primary:"bg-brand-orange hover:bg-brand-orange-hover text-white shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40",secondary:"bg-brand-card hover:bg-brand-card/80 text-white border border-white/10 hover:border-white/20",ghost:"bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-transparent",danger:"bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20"},o={sm:"px-4 py-2 text-sm rounded-lg",md:"px-6 py-3 text-sm rounded-xl",lg:"px-8 py-4 text-base rounded-xl"};function i({variant:e="primary",size:r="md",loading:t=!1,disabled:n=!1,fullWidth:i=!1,icon:c,iconPosition:x="right",children:m,className:b="",...g}){let u=`
    inline-flex items-center justify-center gap-2
    font-semibold
    transition-all duration-300
    transform hover:-translate-y-0.5
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
    focus:outline-none focus:ring-2 focus:ring-brand-orange/50
  `,h=`
    ${u}
    ${d[e]}
    ${o[r]}
    ${i?"w-full":""}
    ${b}
  `.trim(),p=(0,a.jsxs)(a.Fragment,{children:[t&&a.jsx(l.Z,{size:18,className:"animate-spin"}),!t&&c&&"left"===x&&c,m,!t&&c&&"right"===x&&c]});return"link"===g.as?a.jsx(s(),{href:g.href,className:h,"aria-disabled":n||t,children:p}):a.jsx("button",{type:g.type||"button",onClick:g.onClick,disabled:n||t,className:h,children:p})}function c({label:e,error:r,hint:t,required:n=!1,icon:s,iconPosition:l="left",fullWidth:d=!0,className:o="",id:i,...c}){let x=i||`input-${c.name||Math.random().toString(36).substring(7)}`,m=`
    bg-white/5 border border-white/10 rounded-xl
    text-white placeholder-gray-500
    focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `,b=s?"left"===l?"pl-12 pr-4 py-3":"pl-4 pr-12 py-3":"px-4 py-3",g=r?"border-red-500 focus:border-red-500 focus:ring-red-500":"";return(0,a.jsxs)("div",{className:`${d?"w-full":""}`,children:[e&&(0,a.jsxs)("label",{htmlFor:x,className:"block text-gray-300 text-sm font-medium mb-2",children:[e,n&&a.jsx("span",{className:"text-red-400 ml-1",children:"*"})]}),(0,a.jsxs)("div",{className:"relative",children:[s&&"left"===l&&a.jsx("div",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-500",children:s}),a.jsx("input",{id:x,className:`
            ${m}
            ${b}
            ${g}
            ${d?"w-full":""}
            ${o}
          `,...c}),s&&"right"===l&&a.jsx("div",{className:"absolute right-4 top-1/2 -translate-y-1/2 text-gray-500",children:s})]}),r&&a.jsx("p",{className:"mt-2 text-sm text-red-400",children:r}),t&&!r&&a.jsx("p",{className:"mt-2 text-sm text-gray-500",children:t})]})}function x({label:e,error:r,hint:t,required:n=!1,fullWidth:s=!0,className:l="",id:d,...o}){let i=d||`textarea-${o.name||Math.random().toString(36).substring(7)}`,c=`
    bg-white/5 border border-white/10 rounded-xl
    text-white placeholder-gray-500
    focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange
    transition-all duration-300 resize-none
    disabled:opacity-50 disabled:cursor-not-allowed
    px-4 py-3
  `,x=r?"border-red-500 focus:border-red-500 focus:ring-red-500":"";return(0,a.jsxs)("div",{className:`${s?"w-full":""}`,children:[e&&(0,a.jsxs)("label",{htmlFor:i,className:"block text-gray-300 text-sm font-medium mb-2",children:[e,n&&a.jsx("span",{className:"text-red-400 ml-1",children:"*"})]}),a.jsx("textarea",{id:i,className:`
          ${c}
          ${x}
          ${s?"w-full":""}
          ${l}
        `,...o}),r&&a.jsx("p",{className:"mt-2 text-sm text-red-400",children:r}),t&&!r&&a.jsx("p",{className:"mt-2 text-sm text-gray-500",children:t})]})}function m({label:e,error:r,required:t=!1,options:n,fullWidth:s=!0,className:l="",id:d,...o}){let i=d||`select-${o.name||Math.random().toString(36).substring(7)}`,c=`
    bg-white/5 border border-white/10 rounded-xl
    text-white
    focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange
    transition-all duration-300 appearance-none
    disabled:opacity-50 disabled:cursor-not-allowed
    px-4 py-3
  `,x=r?"border-red-500 focus:border-red-500 focus:ring-red-500":"";return(0,a.jsxs)("div",{className:`${s?"w-full":""}`,children:[e&&(0,a.jsxs)("label",{htmlFor:i,className:"block text-gray-300 text-sm font-medium mb-2",children:[e,t&&a.jsx("span",{className:"text-red-400 ml-1",children:"*"})]}),a.jsx("select",{id:i,className:`
          ${c}
          ${x}
          ${s?"w-full":""}
          ${l}
        `,...o,children:n.map(e=>a.jsx("option",{value:e.value,className:"bg-brand-dark",children:e.label},e.value))}),r&&a.jsx("p",{className:"mt-2 text-sm text-red-400",children:r})]})}let b={default:"bg-brand-card/80 backdrop-blur-xl border border-white/10",elevated:"bg-brand-card/80 backdrop-blur-xl border border-white/10 shadow-xl",gradient:"bg-gradient-to-br from-brand-card to-gray-900/50 border border-white/10",outline:"bg-transparent border border-white/10"},g={none:"",sm:"p-4",md:"p-6",lg:"p-8"},u={md:"rounded-md",lg:"rounded-lg",xl:"rounded-xl","2xl":"rounded-2xl","3xl":"rounded-3xl"};function h({variant:e="default",hover:r=!1,padding:t="md",rounded:n="2xl",children:l,className:d="",onClick:o,href:i}){let c=`
    transition-all duration-300
    ${b[e]}
    ${g[t]}
    ${u[n]}
    ${r?"hover:border-brand-orange/30 hover:-translate-y-1 cursor-pointer":""}
    ${d}
  `.trim();return i?a.jsx(s(),{href:i,className:c,children:l}):o?a.jsx("div",{role:"button",tabIndex:0,onClick:o,onKeyDown:e=>"Enter"===e.key&&o(),className:c,children:l}):a.jsx("div",{className:c,children:l})}function p({icon:e,iconColor:r="text-brand-orange",title:t,subtitle:n,action:s,className:l=""}){return(0,a.jsxs)("div",{className:`flex items-start justify-between mb-4 ${l}`,children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[e&&a.jsx("div",{className:`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${r} group-hover:scale-110 transition-transform duration-300`,children:e}),(0,a.jsxs)("div",{children:[a.jsx("h3",{className:"text-lg font-semibold text-white",children:t}),n&&a.jsx("p",{className:"text-gray-400 text-sm",children:n})]})]}),s&&a.jsx("div",{children:s})]})}function f({icon:e,iconBgColor:r="bg-brand-orange/20",iconColor:t="text-brand-orange",title:n,description:s,className:l=""}){return(0,a.jsxs)(h,{variant:"default",hover:!0,className:`group ${l}`,children:[a.jsx("div",{className:`w-12 h-12 rounded-xl ${r} flex items-center justify-center ${t} mb-4 group-hover:scale-110 transition-transform duration-300`,children:e}),a.jsx("h3",{className:"text-lg font-semibold text-white mb-2",children:n}),a.jsx("p",{className:"text-gray-400 text-sm leading-relaxed",children:s})]})}let j={default:"bg-white/10 text-gray-300 border-white/10",success:"bg-green-500/10 text-green-400 border-green-500/20",warning:"bg-yellow-500/10 text-yellow-400 border-yellow-500/20",danger:"bg-red-500/10 text-red-400 border-red-500/20",info:"bg-blue-500/10 text-blue-400 border-blue-500/20",orange:"bg-brand-orange/10 text-brand-orange border-brand-orange/20"},w={sm:"px-2 py-0.5 text-xs",md:"px-3 py-1 text-xs",lg:"px-4 py-1.5 text-sm"},v=function({variant:e="default",size:r="md",children:t,className:n="",icon:s,pulse:l=!1}){return(0,a.jsxs)("span",{className:`
        inline-flex items-center gap-1.5
        font-medium rounded-full border
        ${j[e]}
        ${w[r]}
        ${n}
      `,children:[l&&a.jsx("span",{className:`w-2 h-2 rounded-full animate-pulse ${"success"===e?"bg-green-400":"warning"===e?"bg-yellow-400":"danger"===e?"bg-red-400":"info"===e?"bg-blue-400":"orange"===e?"bg-brand-orange":"bg-gray-400"}`}),s,t]})};function y({variant:e="default",className:r=""}){return"hero"===e?(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{className:`absolute top-1/4 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[128px] pointer-events-none ${r}`}),a.jsx("div",{className:`absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none ${r}`})]}):"subtle"===e?(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{className:`absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none ${r}`}),a.jsx("div",{className:`absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none ${r}`})]}):a.jsx("div",{className:`absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${r}`})}let N={sm:"max-w-3xl",md:"max-w-4xl",lg:"max-w-6xl",xl:"max-w-7xl",full:"max-w-full"},$=function({size:e="xl",children:r,className:t="",as:n="div"}){return a.jsx(n,{className:`
        container mx-auto px-4 md:px-6
        ${N[e]}
        ${t}
      `,children:r})},k={sm:"min-h-[50vh]",md:"min-h-[60vh]",lg:"min-h-[90vh]"};function z({badge:e,title:r,subtitle:t,children:n,minHeight:s="md",centered:l=!0,className:d=""}){return(0,a.jsxs)("section",{className:`
        relative flex items-center bg-brand-dark overflow-hidden pt-24
        ${k[s]}
        ${d}
      `,children:[a.jsx(y,{variant:"hero"}),a.jsx($,{className:"relative z-10",children:(0,a.jsxs)("div",{className:`
            space-y-6 md:space-y-8 animate-fade-in
            ${l?"max-w-4xl mx-auto text-center":""}
          `,children:[e&&a.jsx(v,{variant:"orange",size:"lg",className:"tracking-wider uppercase font-semibold",children:e}),a.jsx("h1",{className:`
              text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight
            `,children:r}),t&&a.jsx("p",{className:`
                text-gray-400 text-lg leading-relaxed
                ${l?"max-w-2xl mx-auto":"max-w-xl"}
              `,children:t}),n]})})]})}function C({children:e,className:r=""}){return a.jsx("span",{className:`
        text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500
        ${r}
      `,children:e})}let M={sm:"py-12",md:"py-16",lg:"py-20"};function S({children:e,className:r="",containerSize:t="lg",padding:n="lg",border:s=!0,id:l}){return a.jsx("section",{id:l,className:`
        bg-brand-dark
        ${M[n]}
        ${s?"border-t border-white/5":""}
        ${r}
      `,children:a.jsx($,{size:t,children:e})})}function F({title:e,subtitle:r,centered:t=!0,className:n=""}){return(0,a.jsxs)("div",{className:`mb-12 md:mb-16 ${t?"text-center":""} ${n}`,children:[a.jsx("h2",{className:"text-3xl lg:text-4xl font-bold text-white mb-4",children:e}),r&&a.jsx("p",{className:`text-gray-400 ${t?"max-w-xl mx-auto":""}`,children:r})]})}function Z({title:e="Sẵn S\xe0ng Bắt Đầu?",subtitle:r="Tham gia c\xf9ng h\xe0ng trăm nh\xe0 đầu tư đ\xe3 tin tưởng sử dụng StockDN để đ\xf3n đầu xu hướng thị trường.",primaryAction:t={label:"Đăng K\xfd Miễn Ph\xed",href:"/auth/register"},secondaryAction:n={label:"Li\xean Hệ Tư Vấn",href:"/contact"},className:s=""}){return a.jsx(S,{className:s,children:a.jsx("div",{className:"max-w-4xl mx-auto text-center",children:(0,a.jsxs)(h,{variant:"gradient",padding:"lg",rounded:"3xl",className:"border-brand-orange/10",children:[a.jsx("h2",{className:"text-3xl font-bold text-white mb-4",children:e}),a.jsx("p",{className:"text-gray-400 mb-8 max-w-xl mx-auto",children:r}),(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[a.jsx(i,{as:"link",href:t.href,size:"lg",children:t.label}),a.jsx(i,{as:"link",href:n.href,variant:"secondary",size:"lg",children:n.label})]})]})})})}function T({items:e,columns:r=4,className:t=""}){return a.jsx("div",{className:`grid ${{2:"sm:grid-cols-2",3:"sm:grid-cols-2 lg:grid-cols-3",4:"sm:grid-cols-2 lg:grid-cols-4"}[r]} gap-6 ${t}`,children:e.map((e,r)=>(0,a.jsxs)(h,{variant:"default",hover:!0,className:"group",children:[a.jsx("div",{className:"w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange mb-4 group-hover:scale-110 transition-transform duration-300",children:e.icon}),a.jsx("h3",{className:"text-lg font-semibold text-white mb-2",children:e.title}),a.jsx("p",{className:"text-gray-300",children:e.content}),e.subContent&&a.jsx("p",{className:"text-gray-400 text-sm mt-1",children:e.subContent})]},r))})}function I({items:e,icon:r,iconColor:t="text-brand-orange",className:n=""}){return a.jsx("ul",{className:`space-y-3 md:space-y-4 ${n}`,children:e.map((e,n)=>(0,a.jsxs)("li",{className:"flex items-start gap-3 text-gray-300",children:[a.jsx("span",{className:`mt-1 flex-shrink-0 ${t}`,children:r||"•"}),a.jsx("span",{children:e})]},n))})}}};