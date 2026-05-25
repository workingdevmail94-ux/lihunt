export default function LogoTitle() {
    return <header className="header">

            <h1 className="header__title">
               <svg
  className="lihunt-logo"
  width="220"
  height="64"
  viewBox="0 0 220 64"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="32" cy="30" r="22" stroke="#6C4DFF" strokeWidth="6" />
  <line x1="47" y1="45" x2="58" y2="56" stroke="#6C4DFF" strokeWidth="6" strokeLinecap="round" />

  <path d="M22 17V41H39" stroke="#111827" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  <circle cx="42" cy="20" r="4" fill="#6C4DFF" />
  <path d="M42 30V41" stroke="#111827" strokeWidth="7" strokeLinecap="round" />

  <text x="76" y="42" fontFamily="Manrope, Arial, sans-serif" fontSize="34" fontWeight="700">
    <tspan fill="#6C4DFF">Li</tspan>
    <tspan fill="#111827">Hunt</tspan>
  </text>
</svg>
                
               
    </h1>
     <p className="header__subtitle">Find remote jobs worldwide</p>
    </header>

}