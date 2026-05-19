export default function LogoTitle() {
    return <div className="hero">

            <h1 className="hero__title">
                <svg className='lihunt-logo' width="220" height="64" viewBox="0 0 220 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="30" r="22" stroke="#6C4DFF" stroke-width="6"/>
                    <line x1="47" y1="45" x2="58" y2="56" stroke="#6C4DFF" stroke-width="6" stroke-linecap="round"/>
            
                    <path d="M22 17V41H39" stroke="#111827" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="42" cy="20" r="4" fill="#6C4DFF"/>
                    <path d="M42 30V41" stroke="#111827" stroke-width="7" stroke-linecap="round"/>
            
                    <text x="76" y="42" font-family="Manrope, Arial, sans-serif" font-size="34" font-weight="700">
                        <tspan fill="#6C4DFF">Li</tspan><tspan fill="#111827">Hunt</tspan>
                    </text>
                    </svg>
                
               
    </h1>
     <p className="hero__subtitle">Каталог вакансий для фронтенд-разработчиков</p>
    </div>

}