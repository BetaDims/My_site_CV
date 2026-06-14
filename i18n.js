/* ──────────────────────────────────────────────────────────────────────────
   i18n.js — English / Spanish language switch for the whole site.

   How it works: the HTML stays in English (the default, and what no-JS users
   see). This script walks a set of content elements, keys each by its English
   text, and — when Spanish is selected — swaps in the translation below. The
   choice is saved in localStorage and re-applied on every page automatically.

   To add or fix a translation, edit the ES map: the KEY is the exact English
   text as it appears on the page (whitespace is collapsed), the VALUE is the
   Spanish (it may contain inline HTML such as <strong>, <em>, <span>, <br>).
   A missing key simply stays in English, so nothing breaks.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var LANG_KEY = 'portfolio-lang';

  /* Elements whose whole content is translated (innerHTML replaced). */
  var SEL = [
    '.nav-links a', '.hero-eyebrow', '.hero-headline', '.hero-sub',
    '.btn-primary', '.btn-outline', '.hero-photo-label', '.stat-label',
    '.section-title', '.proj-title', '.proj-desc', '.tag', '.exp-role',
    '.exp-panel-role', '.exp-proj-name', '.exp-bullet', '.skill-name',
    '.skill-level', '.skill-desc', '.edu-type', '.edu-degree', '.cert-item',
    '.contact-headline', '.contact-label', '.contact-value', '.footer-copy',
    '.back-link', '.detail-eyebrow', '.detail-title', '.detail-lead',
    '.meta-label', '.meta-value', '.metric-num', '.metric-desc', '.shot-cap',
    '.block-title', '.prose p', '.pull p', '.feature-name', '.feature-text',
    '.code-caption', '.foot-nav-dir', '.foot-nav-title', '.ph-hint'
  ].join(', ');

  var ES = {
    /* ── Nav ── */
    'Work': 'Trabajo',
    'Experience': 'Experiencia',
    'Skills': 'Habilidades',
    'Contact': 'Contacto',
    '← Back to work': '← Volver al trabajo',

    /* ── Hero ── */
    'Mechanical Engineer · Data · Automation': 'Ingeniero Mecánico · Datos · Automatización',
    'Field. Data. Code.': 'Campo.<br><span class="accent">Datos.</span><br>Código.',
    'Bridging mechanical engineering and software. I manage large-scale infrastructure projects in the field — airports, metro lines — and build the Python tools and Power BI dashboards that make data actionable.':
      'Uniendo la ingeniería mecánica y el software. Gestiono proyectos de infraestructura a gran escala en campo —aeropuertos, líneas de metro— y construyo las herramientas en Python y los tableros de Power BI que vuelven accionables los datos.',
    'See my work': 'Ver mi trabajo',
    'Download CV': 'Descargar CV',
    'Franko Sanchez · Lima, Peru': 'Franko Sanchez · Lima, Perú',
    'Years in large infrastructure projects': 'Años en grandes proyectos de infraestructura',
    'Processing time cut via Python': 'Reducción del tiempo de procesamiento con Python',
    'Daily productivity gain automated': 'Aumento de productividad diaria automatizado',
    'Major telecom deployments': 'Despliegues de telecomunicaciones importantes',

    /* ── Section titles ── */
    'Selected Work': 'Trabajo Seleccionado',
    'Tools & Skills': 'Herramientas y Habilidades',
    'Education': 'Educación',

    /* ── Project rows (home) ── */
    'DAS System — Jorge Chavez Airport T2 →': 'Sistema DAS — Aeropuerto Jorge Chávez T2 <span class="proj-arrow">→</span>',
    'DAS System — Metro de Lima, Line 2 →': 'Sistema DAS — Metro de Lima, Línea 2 <span class="proj-arrow">→</span>',
    'Power BI — Project Portfolio Dashboard →': 'Power BI — Tablero de Portafolio de Proyectos <span class="proj-arrow">→</span>',
    'Power BI — Airport Layout Dashboard →': 'Power BI — Tablero de Plano del Aeropuerto <span class="proj-arrow">→</span>',
    'Solar Panel Installation →': 'Instalación de Paneles Solares <span class="proj-arrow">→</span>',
    'Python Automation — Resource Scheduling →': 'Automatización en Python — Asignación de Recursos <span class="proj-arrow">→</span>',

    'Supervised the deployment of a distributed antenna system at Peru\'s new international terminal. Developed a Python script that reduced resource-scheduling processing time by 75%, saving S/ 48,000 annually.':
      'Supervisé el despliegue de un sistema de antenas distribuidas (DAS) en el nuevo terminal internacional del Perú. Desarrollé un script en Python que redujo en un 75% el tiempo de procesamiento de la asignación de recursos, ahorrando S/ 48,000 al año.',
    'Coordinated OT3 work orders with security control centers and implemented station-by-station progress reports, significantly reducing dead times and improving deployment visibility across underground stations.':
      'Coordiné las órdenes de trabajo OT3 con los centros de control de seguridad e implementé reportes de avance estación por estación, reduciendo significativamente los tiempos muertos y mejorando la visibilidad del despliegue en las estaciones subterráneas.',
    'Built an executive dashboard tracking purchase orders, follow-up activities, and project KPIs across multiple active sites. Gave leadership real-time visibility into budget and execution status.':
      'Construí un tablero ejecutivo que monitorea órdenes de compra, actividades de seguimiento y KPIs de proyectos en múltiples sedes activas. Dio a la dirección visibilidad en tiempo real del presupuesto y el estado de ejecución.',
    'Interactive dashboard using the actual floor plan layout of the new Jorge Chavez Airport terminal to display equipment status and installation progress, giving project managers spatial context for decisions.':
      'Tablero interactivo que usa el plano real del nuevo terminal del Aeropuerto Jorge Chávez para mostrar el estado de los equipos y el avance de instalación, dando a los jefes de proyecto contexto espacial para sus decisiones.',
    'End-to-end installation project for a solar energy system, covering site survey, panel layout design, structural considerations, and on-site supervision — bridging mechanical know-how with energy solutions.':
      'Proyecto de instalación integral de un sistema de energía solar, que abarcó el levantamiento del sitio, el diseño de la disposición de paneles, las consideraciones estructurales y la supervisión en obra —uniendo el conocimiento mecánico con las soluciones energéticas.',
    'Wrote Python scripts to automate daily resource assignment, cross-referencing field technician availability, site access permissions, and equipment logs — cutting manual coordination from hours to minutes.':
      'Escribí scripts en Python para automatizar la asignación diaria de recursos, cruzando la disponibilidad de técnicos de campo, los permisos de acceso al sitio y los registros de equipos —reduciendo la coordinación manual de horas a minutos.',

    /* ── Tags ── */
    'Infrastructure': 'Infraestructura',
    'Airport': 'Aeropuerto',
    'Data': 'Datos',
    'Dashboard': 'Tablero',
    'Layout': 'Plano',
    'Visualization': 'Visualización',
    'Energy': 'Energía',
    'Field': 'Campo',
    'Mechanical': 'Mecánica',
    'Automation': 'Automatización',

    /* ── Experience ── */
    'Project Supervisor': 'Supervisor de Proyecto',
    'Project Assistant': 'Asistente de Proyectos',
    'Project Supervisor · via Adecco Consulting S.A.': 'Supervisor de Proyecto · vía Adecco Consulting S.A.',
    'Practicante Profesional de Proyectos · Supply of Electronic Devices': 'Practicante Profesional de Proyectos · Suministro de Dispositivos Electrónicos',
    'DAS Project — New Jorge Chavez Airport Terminal 2': 'Proyecto DAS — Nuevo Terminal 2 del Aeropuerto Jorge Chávez',
    'DAS Project — Metro de Lima Line 2': 'Proyecto DAS — Metro de Lima Línea 2',
    'Project Lifecycle Management': 'Gestión del Ciclo de Vida del Proyecto',
    'Optimized resource assignment using Python, reducing processing time by 75% and generating S/ 48,000 in annual savings.':
      'Optimicé la asignación de recursos con Python, reduciendo el tiempo de procesamiento en un 75% y generando S/ 48,000 de ahorro anual.',
    'Increased daily productivity by 40% through coordination of LAP and BHS agents, streamlining multi-operator handoffs.':
      'Aumenté la productividad diaria en un 40% mediante la coordinación de los agentes de LAP y BHS, agilizando las transiciones entre múltiples operadores.',
    'Supervised subcontractor installation and quality assurance, enforcing Huawei standards across antenna deployment phases.':
      'Supervisé la instalación de subcontratistas y el aseguramiento de calidad, haciendo cumplir los estándares de Huawei en todas las fases del despliegue de antenas.',
    'Managed OT3 work order openings in coordination with station security control centers, ensuring access compliance.':
      'Gestioné la apertura de órdenes de trabajo OT3 en coordinación con los centros de control de seguridad de las estaciones, asegurando el cumplimiento de accesos.',
    'Implemented daily and advance progress reports for station deployment phases, reducing dead times and improving resource traceability.':
      'Implementé reportes de avance diarios y anticipados para las fases de despliegue por estación, reduciendo los tiempos muertos y mejorando la trazabilidad de los recursos.',
    'Controlled inventory and material tracking for all resources assigned across underground stations.':
      'Controlé el inventario y el seguimiento de materiales de todos los recursos asignados en las estaciones subterráneas.',
    'Built Power BI dashboards to monitor project lifecycle (planning, execution, closure) across CLARO, ENTEL, SDP, ATC, and ATP client sites.':
      'Construí tableros en Power BI para monitorear el ciclo de vida de los proyectos (planificación, ejecución, cierre) en las sedes de los clientes CLARO, ENTEL, SDP, ATC y ATP.',
    'Managed PAP access controls for technical and administrative field staff at multiple telecom sites simultaneously.':
      'Gestioné los controles de acceso PAP para el personal técnico y administrativo de campo en múltiples sitios de telecomunicaciones de forma simultánea.',
    'Administered equipment logistics and inventory — coordinating suppliers and tracking delivery status to ensure operational continuity.':
      'Administré la logística e inventario de equipos —coordinando proveedores y haciendo seguimiento del estado de entregas para garantizar la continuidad operativa.',
    'Supervised field technicians and data collectors; ensured accurate, timely reporting for client documentation.':
      'Supervisé a los técnicos de campo y recolectores de datos; aseguré reportes precisos y oportunos para la documentación de los clientes.',

    /* ── Skills ── */
    'Upper-Intermediate': 'Intermedio-Alto',
    'Intermediate': 'Intermedio',
    'Advanced': 'Avanzado',
    'Dev Tools': 'Herramientas Dev',
    'Automation scripts, data pipelines, resource scheduling tools': 'Scripts de automatización, pipelines de datos, herramientas de asignación de recursos',
    'Dashboards & KPI reporting; DAX basics, data models and star-schema table relationships': 'Tableros y reportes de KPI; nociones de DAX, modelos de datos y relaciones de tablas en esquema estrella',
    'Work orders and key PM transactions — create, modify and display workflow': 'Órdenes de trabajo y transacciones clave de PM — flujo de crear, modificar y visualizar',
    '2D technical drawings, layout design, site schematics': 'Dibujos técnicos 2D, diseño de planos, esquemas de obra',
    'Advanced formulas, Gantt charts, data analysis, reporting': 'Fórmulas avanzadas, diagramas de Gantt, análisis de datos, reportería',
    'Command-line terminal, PostgreSQL, version control with Git & GitHub': 'Terminal de línea de comandos, PostgreSQL, control de versiones con Git y GitHub',

    /* ── Education ── */
    'Degree': 'Título',
    'Complementary Studies': 'Estudios Complementarios',
    'Bachelor in Mechanical Engineering': 'Bachiller en Ingeniería Mecánica',
    'Diploma Standard English Program — English School of Canada': '<div class="cert-dot"></div>Diploma del Programa Estándar de Inglés — English School of Canada',
    'Python for Data Science — Universidad del Pacífico': '<div class="cert-dot"></div>Python para Ciencia de Datos — Universidad del Pacífico',
    'Power BI & Excel Advanced': '<div class="cert-dot"></div>Power BI y Excel Avanzado',
    'AI: Gemini Pro, Claude Code': '<div class="cert-dot"></div>IA: Gemini Pro, Claude Code',

    /* ── Contact / footer ── */
    'Let\'s build something together.': 'Construyamos algo <span>juntos.</span>',
    'Email': 'Correo',
    'Location': 'Ubicación',
    'Lima, Peru': 'Lima, Perú',
    '© 2026 · Mechanical Engineer & Data Analyst': '© 2026 · Ingeniero Mecánico y Analista de Datos',

    /* ── Project detail: meta labels / values ── */
    'Role': 'Rol',
    'Client': 'Cliente',
    'Timeline': 'Cronograma',
    'Scope': 'Alcance',
    'Tool': 'Herramienta',
    'Type': 'Tipo',
    'Focus': 'Enfoque',
    'Context': 'Contexto',
    'Result': 'Resultado',
    'Discipline': 'Disciplina',
    'Callao, Peru': 'Callao, Perú',
    'Underground stations': 'Estaciones subterráneas',
    'Personal / Internal': 'Personal / Interno',
    'PO & KPI tracking': 'Seguimiento de OC y KPI',
    'Airport T2 / DAS': 'Aeropuerto T2 / DAS',
    'Spatial reporting': 'Reportería espacial',
    'Engineer / Installer': 'Ingeniero / Instalador',
    'Mechanical · Energy': 'Mecánica · Energía',
    'End-to-end project': 'Proyecto integral',
    'Survey → Commission': 'Levantamiento → Puesta en marcha',
    'Developer': 'Desarrollador',
    'Hours → minutes': 'Horas → minutos',
    '↓ Dead time': '↓ Tiempo muerto',

    /* ── Project detail: metric descriptions ── */
    'Reduction in resource-scheduling processing time via Python': 'Reducción del tiempo de procesamiento de la asignación de recursos con Python',
    'Estimated annual savings from the automation': 'Ahorro anual estimado por la automatización',
    'Daily productivity gain through LAP / BHS coordination': 'Aumento de productividad diaria gracias a la coordinación LAP / BHS',
    'Less time spent on resource scheduling each day': 'Menos tiempo dedicado a la asignación de recursos cada día',
    'Estimated savings per year from reclaimed hours': 'Ahorro anual estimado por las horas recuperadas',
    'Work-order process coordinated with station security control centers': 'Proceso de órdenes de trabajo coordinado con los centros de control de seguridad de las estaciones',
    'Daily & advance progress reports kept deployment phases on schedule': 'Los reportes de avance diarios y anticipados mantuvieron las fases de despliegue a tiempo',
    'Cut in resource-scheduling processing time': 'Reducción del tiempo de procesamiento de la asignación de recursos',
    'Estimated annual savings from reclaimed hours': 'Ahorro anual estimado por las horas recuperadas',

    /* ── Project detail: captions ── */
    'The new Terminal 2 — among the largest infrastructure projects in Peru\'s recent history.': 'El nuevo Terminal 2 —uno de los mayores proyectos de infraestructura de la historia reciente del Perú.',
    'Line 2 — Lima\'s first fully underground metro line.': 'Línea 2 —la primera línea de metro totalmente subterránea de Lima.',
    'The overview page — KPIs, PO totals and follow-up status at a glance.': 'La página de resumen —KPIs, totales de OC y estado de seguimiento de un vistazo.',
    'Drill-down view — single-project detail with PO and activity breakdown.': 'Vista de detalle —desglose de OC y actividades de un solo proyecto.',
    'Status mapped onto the real terminal layout — green where it\'s done, gold where it\'s pending.': 'Estado mapeado sobre el plano real del terminal —verde donde está hecho, dorado donde está pendiente.',
    'Zone detail — drilling into a single sector of the terminal.': 'Detalle de zona —profundizando en un solo sector del terminal.',
    'The completed array — surveyed, laid out, mounted and commissioned.': 'El arreglo terminado —levantado, distribuido, montado y puesto en marcha.',

    /* ── Project detail: block titles ── */
    'Overview': 'Resumen',
    'The Challenge': 'El Reto',
    'Approach': 'Enfoque',
    'Results': 'Resultados',
    'What I Owned': 'De Qué Me Encargué',
    'Outcome': 'Resultado',
    'The Problem': 'El Problema',
    'What It Tracks': 'Qué Monitorea',
    'Impact': 'Impacto',
    'The Idea': 'La Idea',
    'How It Works': 'Cómo Funciona',
    'Why It Mattered': 'Por Qué Importó',
    'Scope of Work': 'Alcance del Trabajo',
    'On Site': 'En Obra',
    'Takeaway': 'Conclusión',

    /* ── Project detail: eyebrows ── */
    'Project 01 · Infrastructure': 'Proyecto 01 · Infraestructura',
    'Project 02 · Infrastructure': 'Proyecto 02 · Infraestructura',
    'Project 03 · Data & Visualization': 'Proyecto 03 · Datos y Visualización',
    'Project 04 · Data & Visualization': 'Proyecto 04 · Datos y Visualización',
    'Project 05 · Energy & Field': 'Proyecto 05 · Energía y Campo',
    'Project 06 · Development & Automation': 'Proyecto 06 · Desarrollo y Automatización',

    /* ── Project detail: titles ── */
    'DAS System — Jorge Chavez Airport, Terminal 2': 'Sistema DAS — Aeropuerto Jorge Chávez, Terminal 2',
    'DAS System — Metro de Lima, Line 2': 'Sistema DAS — Metro de Lima, Línea 2',
    'Power BI — Project Portfolio Dashboard': 'Power BI — Tablero de Portafolio de Proyectos',
    'Power BI — Airport Layout Dashboard': 'Power BI — Tablero de Plano del Aeropuerto',
    'Solar Panel Installation': 'Instalación de Paneles Solares',
    'Python Automation — Resource Scheduling': 'Automatización en Python — Asignación de Recursos',

    /* ── Project detail: leads ── */
    'Supervised the deployment of a distributed antenna system across Peru\'s new international terminal — coordinating subcontractors and airport operators in the field, while building the Python automation that cut resource-scheduling time by three quarters.':
      'Supervisé el despliegue de un sistema de antenas distribuidas en el nuevo terminal internacional del Perú —coordinando subcontratistas y operadores del aeropuerto en campo, mientras desarrollaba la automatización en Python que redujo en tres cuartas partes el tiempo de asignación de recursos.',
    'Brought cellular coverage underground across the stations of Lima\'s Metro Line 2 — coordinating OT3 work orders with station security control centers and replacing guesswork with station-by-station progress reporting.':
      'Llevé la cobertura celular bajo tierra a las estaciones de la Línea 2 del Metro de Lima —coordinando las órdenes de trabajo OT3 con los centros de control de seguridad de las estaciones y reemplazando las conjeturas con reportes de avance estación por estación.',
    'A single executive view of every active project — purchase orders, follow-up activities and KPIs — pulled together so leadership could see budget and execution status in real time instead of chasing spreadsheets.':
      'Una única vista ejecutiva de cada proyecto activo —órdenes de compra, actividades de seguimiento y KPIs— reunida para que la dirección pudiera ver el presupuesto y el estado de ejecución en tiempo real en lugar de perseguir hojas de cálculo.',
    'Most dashboards are charts. This one is a map — the actual floor plan of the new Jorge Chavez terminal, with equipment status and installation progress painted directly onto the spaces they belong to.':
      'La mayoría de los tableros son gráficos. Este es un mapa —el plano real del nuevo terminal Jorge Chávez, con el estado de los equipos y el avance de instalación pintados directamente sobre los espacios a los que pertenecen.',
    'An end-to-end solar energy install — the project where mechanical engineering meets clean energy. From site survey and panel layout through structural mounting and on-site supervision, start to finish.':
      'Una instalación de energía solar integral —el proyecto donde la ingeniería mecánica se encuentra con la energía limpia. Desde el levantamiento del sitio y la disposición de paneles hasta el montaje estructural y la supervisión en obra, de principio a fin.',
    'The engine behind the airport deployment. A Python tool that takes the daily chaos of who-goes-where and resolves it in seconds — matching technician availability, site-access permissions and equipment logs into one conflict-free plan.':
      'El motor detrás del despliegue del aeropuerto. Una herramienta en Python que toma el caos diario de quién-va-dónde y lo resuelve en segundos —cruzando la disponibilidad de técnicos, los permisos de acceso al sitio y los registros de equipos en un único plan sin conflictos.',

    /* ── das-airport prose ── */
    'A distributed antenna system (DAS) carries reliable cellular coverage deep into a building where the structure itself would otherwise block it — exactly the problem a vast new airport terminal presents.':
      'Un sistema de antenas distribuidas (DAS) lleva una cobertura celular confiable a lo profundo de un edificio donde la propia estructura, de otro modo, la bloquearía —exactamente el problema que plantea un nuevo y enorme terminal de aeropuerto.',
    'As Project Supervisor for Huawei (via Adecco Consulting), I owned the field execution: making sure each antenna run was installed to standard, coordinating the subcontractor crews, and interfacing with the airport\'s own operators — LAP (Lima Airport Partners) and the BHS baggage-handling teams — whose schedules and access windows dictated when and where we could work.':
      'Como Supervisor de Proyecto para Huawei (vía Adecco Consulting), me encargué de la ejecución en campo: asegurar que cada tendido de antenas se instalara según el estándar, coordinar a las cuadrillas de subcontratistas e interactuar con los propios operadores del aeropuerto —<strong>LAP</strong> (Lima Airport Partners) y los equipos de manejo de equipaje <strong>BHS</strong>— cuyos horarios y ventanas de acceso dictaban cuándo y dónde podíamos trabajar.',
    'The deployment lived or died on coordination. Dozens of people, multiple operators, and a live construction site meant scheduling was the real bottleneck — so that\'s where I focused the engineering.':
      'El despliegue dependía por completo de la coordinación. Decenas de personas, múltiples operadores y una obra en plena actividad hacían de la programación el verdadero cuello de botella —así que ahí enfoqué la ingeniería.',
    'Resource scheduling was being done by hand — cross-referencing technician availability, site-access permissions and equipment logs across spreadsheets every single day. It was slow, error-prone, and it didn\'t scale with the size of the terminal.':
      'La asignación de recursos se hacía a mano —cruzando la disponibilidad de técnicos, los permisos de acceso al sitio y los registros de equipos en hojas de cálculo todos los días. Era lento, propenso a errores y no escalaba con el tamaño del terminal.',
    'Every hour spent re-building the day\'s plan was an hour not spent in the field assuring installation quality. Manual handoffs between Huawei crews and the LAP / BHS operators created dead time on both sides.':
      'Cada hora dedicada a rehacer el plan del día era una hora no dedicada al campo asegurando la calidad de instalación. Las transiciones manuales entre las cuadrillas de Huawei y los operadores LAP / BHS creaban tiempos muertos en ambos lados.',
    'The deployment lived or died on coordination — so that\'s where I put the engineering.':
      'El despliegue dependía por completo de la coordinación —así que ahí puse la ingeniería.',
    'I wrote a Python tool to do the scheduling that was eating the day.':
      'Escribí una herramienta en Python para hacer la programación que se comía el día.',
    'Using pandas, the script ingests the daily inputs — technician roster, access permissions per zone, equipment availability — and outputs a conflict-free assignment in seconds instead of hours. What had been a manual morning ritual became a single run.':
      'Usando <strong>pandas</strong>, el script toma las entradas diarias —lista de técnicos, permisos de acceso por zona, disponibilidad de equipos— y produce una asignación sin conflictos en segundos en lugar de horas. Lo que había sido un ritual manual de cada mañana se convirtió en una sola ejecución.',
    'In parallel, I restructured the human coordination: aligning Huawei\'s crews with LAP and BHS access windows so teams weren\'t waiting on each other, which lifted daily productivity by 40%.':
      'En paralelo, reestructuré la coordinación humana: alineando las cuadrillas de Huawei con las ventanas de acceso de LAP y BHS para que los equipos no se esperaran entre sí, lo que elevó la productividad diaria en un 40%.',
    'The automation removed the single biggest time sink in the daily workflow and freed me to spend the day where it mattered — in the field, on quality.':
      'La automatización eliminó el mayor consumidor de tiempo del flujo de trabajo diario y me liberó para dedicar el día a lo que importaba —el campo, la calidad.',

    /* das-airport detail-list rows (label + text) */
    'Automated assignment': 'Asignación automatizada',
    'Python + pandas matches technicians to zones against live permissions.': 'Python + pandas asigna técnicos a zonas según permisos vigentes.',
    'Quality assurance': 'Aseguramiento de calidad',
    'Field supervision enforcing Huawei installation standards run by run.': 'Supervisión en campo haciendo cumplir los estándares de instalación de Huawei en cada tendido.',
    'Operator coordination': 'Coordinación de operadores',
    'Synced crews with LAP & BHS windows to remove dead time.': 'Sincronicé las cuadrillas con las ventanas de LAP y BHS para eliminar el tiempo muerto.',

    /* ── metro-lima prose ── */
    'Underground stations are coverage dead zones by design — thick concrete, deep platforms, no line of sight to any tower. A DAS network is what keeps a phone working down there.':
      'Las estaciones subterráneas son zonas muertas de cobertura por diseño —concreto grueso, andenes profundos, sin línea de vista a ninguna antena. Una red DAS es lo que mantiene un teléfono funcionando allí abajo.',
    'Working under the same Huawei supervision role as the airport, I ran the field side of the Line 2 deployment. The defining constraint here wasn\'t the engineering — it was access. Every intervention in an operational metro station has to be cleared through the station\'s security control center before a single technician can begin.':
      'Bajo el mismo rol de supervisión de Huawei que en el aeropuerto, dirigí el lado de campo del despliegue de la Línea 2. La restricción determinante aquí no era la ingeniería —era el <strong>acceso</strong>. Cada intervención en una estación de metro operativa debe ser autorizada por el centro de control de seguridad de la estación antes de que un solo técnico pueda comenzar.',
    'The job was equal parts logistics and discipline: open the right work orders, get them authorized, keep materials accounted for, and make station-level progress visible to everyone who needed it.':
      'El trabajo era a partes iguales logística y disciplina: abrir las órdenes de trabajo correctas, conseguir su autorización, mantener los materiales contabilizados y hacer visible el avance por estación a todos los que lo necesitaban.',
    'I introduced daily and advance progress reports per station — so the team always knew what was done, what was next, and what was blocked. That single change is what pulled dead time out of the schedule.':
      'Introduje reportes de avance diarios y anticipados por estación —para que el equipo siempre supiera qué estaba hecho, qué seguía y qué estaba bloqueado. Ese solo cambio fue lo que sacó el tiempo muerto del cronograma.',
    'Tighter coordination with the control centers and a clear reporting rhythm meant fewer surprises and less waiting — keeping the deployment phases moving and resources fully traceable across every station on the line.':
      'Una coordinación más estrecha con los centros de control y un ritmo de reportes claro significaron menos sorpresas y menos esperas —manteniendo las fases de despliegue en movimiento y los recursos plenamente trazables en cada estación de la línea.',

    /* metro-lima detail-list rows */
    'OT3 work orders': 'Órdenes de trabajo OT3',
    'Opened & coordinated each order with station security control centers.': 'Abrí y coordiné cada orden con los centros de control de seguridad de las estaciones.',
    'Access compliance': 'Cumplimiento de accesos',
    'Ensured every intervention cleared the station\'s authorization process.': 'Aseguré que cada intervención superara el proceso de autorización de la estación.',
    'Progress reporting': 'Reportes de avance',
    'Daily & advance reports per station to cut blocked time.': 'Reportes diarios y anticipados por estación para reducir el tiempo bloqueado.',
    'Inventory control': 'Control de inventario',
    'Tracked all material & resources assigned across stations.': 'Hice seguimiento de todo el material y los recursos asignados en las estaciones.',

    /* ── powerbi-portfolio prose ── */
    'Project status lived in too many places at once.': 'El estado de los proyectos vivía en demasiados lugares a la vez.',
    'Purchase orders sat in one spreadsheet, follow-up activities in another, and progress in someone\'s inbox. Answering a simple question — how much have we committed, and where do things stand? — meant stitching files together by hand every time leadership asked.':
      'Las órdenes de compra estaban en una hoja de cálculo, las actividades de seguimiento en otra y el avance en el correo de alguien. Responder una pregunta simple —<em>¿cuánto hemos comprometido y en qué punto estamos?</em>— significaba unir archivos a mano cada vez que la dirección preguntaba.',
    'One question, three spreadsheets, every time. The dashboard ended that.': 'Una pregunta, tres hojas de cálculo, cada vez. El tablero acabó con eso.',
    'Purchase Orders': 'Órdenes de Compra',
    'Total committed amount per project and per site, with status roll-ups so nothing slips between the cracks.': 'Monto total comprometido por proyecto y por sede, con consolidados de estado para que nada se escape.',
    'Follow-up Activities': 'Actividades de Seguimiento',
    'Open items, owners and due states — the operational to-do layer behind each project.': 'Pendientes abiertos, responsables y vencimientos —la capa operativa de tareas detrás de cada proyecto.',
    'Project KPIs': 'KPIs de Proyecto',
    'Execution and budget indicators that surface which projects are healthy and which need attention.': 'Indicadores de ejecución y presupuesto que revelan qué proyectos están sanos y cuáles necesitan atención.',
    'Multi-site View': 'Vista Multi-sede',
    'Filter across every active site at once, or drill into a single one — same dashboard, one click.': 'Filtra todas las sedes activas a la vez, o profundiza en una sola —el mismo tablero, un clic.',
    'The dashboard replaced a recurring manual reporting chore with a live view leadership could open themselves. Budget commitments and execution status became answerable in seconds — and the conversation shifted from “what\'s the number?” to “what do we do about it?”':
      'El tablero reemplazó una tarea manual y recurrente de reportería por una vista en vivo que la dirección podía abrir por sí misma. Los compromisos de presupuesto y el estado de ejecución se volvieron respondibles en segundos —y la conversación pasó de <em>“¿cuál es el número?”</em> a <em>“¿qué hacemos al respecto?”</em>',

    /* ── powerbi-airport-layout prose ── */
    'A table tells you how much. A map tells you where.': 'Una tabla te dice <em>cuánto</em>. Un mapa te dice <em>dónde</em>.',
    'On a terminal the size of T2, a list of pending equipment doesn\'t help a manager standing on site — they need to know which part of the building is behind. So I built the report on top of the actual airport floor plan, turning installation data into something you could read like a site map.':
      'En un terminal del tamaño del T2, una lista de equipos pendientes no le sirve a un jefe parado en obra —necesita saber <em>qué parte del edificio</em> va atrasada. Por eso construí el reporte sobre el plano real del aeropuerto, convirtiendo los datos de instalación en algo que se podía leer como un mapa de obra.',
    'Real Floor Plan': 'Plano Real',
    'The terminal\'s own layout sits underneath the report, so every data point lands in its true physical location.': 'El propio plano del terminal está debajo del reporte, así cada dato cae en su verdadera ubicación física.',
    'Equipment Status': 'Estado de Equipos',
    'Each zone is colour-coded by state — installed, in progress, pending — readable in a single glance.': 'Cada zona está codificada por color según su estado —instalado, en progreso, pendiente— legible de un solo vistazo.',
    'Progress Over Time': 'Avance en el Tiempo',
    'Installation advance per area, so leadership can see momentum across the building, not just totals.': 'Avance de instalación por área, para que la dirección vea el impulso en todo el edificio, no solo los totales.',
    'Spatial Context': 'Contexto Espacial',
    'Decisions get made against the building itself — where to send crews next becomes obvious.': 'Las decisiones se toman sobre el edificio mismo —a dónde enviar las cuadrillas después se vuelve obvio.',
    'Giving project managers spatial context changed how the deployment was steered. Instead of reading a status table and translating it in their heads, they could look at the terminal and immediately see where to focus — turning reporting into a planning tool.':
      'Dar contexto espacial a los jefes de proyecto cambió la forma de dirigir el despliegue. En lugar de leer una tabla de estado y traducirla mentalmente, podían mirar el terminal y ver de inmediato dónde concentrarse —convirtiendo la reportería en una herramienta de planificación.',

    /* ── solar-panel prose ── */
    'This is the project that sits closest to my degree — pure mechanical engineering, applied to energy.': 'Este es el proyecto más cercano a mi carrera —ingeniería mecánica pura, aplicada a la energía.',
    'A solar install is deceptively physical: panel orientation drives yield, the mounting structure has to survive wind and weight, and every bracket is a small structural problem. I ran it as a complete project, owning each stage from the first site visit to the panels producing power.':
      'Una instalación solar es engañosamente física: la orientación de los paneles define el rendimiento, la estructura de montaje tiene que soportar viento y peso, y cada soporte es un pequeño problema estructural. Lo llevé como un proyecto completo, encargándome de cada etapa desde la primera visita al sitio hasta que los paneles producían energía.',
    'Site Survey': 'Levantamiento del Sitio',
    'Assessed the location, orientation and shading to size the system and find the optimal panel placement.': 'Evalué la ubicación, la orientación y las sombras para dimensionar el sistema y hallar la disposición óptima de los paneles.',
    'Layout Design': 'Diseño de la Disposición',
    'Planned the array layout for maximum exposure within the available area and structural limits.': 'Planifiqué la disposición del arreglo para la máxima exposición dentro del área disponible y los límites estructurales.',
    'Structural Mounting': 'Montaje Estructural',
    'Worked through the mounting and structural considerations so the array carries its load safely in real conditions.': 'Resolví las consideraciones de montaje y estructurales para que el arreglo soporte su carga de forma segura en condiciones reales.',
    'On-site Supervision': 'Supervisión en Obra',
    'Oversaw the physical installation through to a working, commissioned system.': 'Supervisé la instalación física hasta dejar un sistema funcionando y puesto en marcha.',
    'Owning a project end to end — survey, design, build, supervise — is the throughline of how I like to work: stay close enough to the physical reality to get the engineering right, and close enough to the execution to make sure it actually gets done.':
      'Llevar un proyecto de principio a fin —levantar, diseñar, construir, supervisar— es el hilo conductor de cómo me gusta trabajar: estar lo bastante cerca de la realidad física para acertar en la ingeniería, y lo bastante cerca de la ejecución para asegurar que de verdad se haga.',

    /* ── python-automation prose ── */
    'Every morning began with the same puzzle.': 'Cada mañana empezaba con el mismo rompecabezas.',
    'Who is available today? Which zones can they legally access? Is the equipment they need free? Answering that by hand — across three different sources — swallowed hours before any real work could start, and a single missed permission could stall a whole crew.':
      '¿Quién está disponible hoy? ¿A qué zonas puede acceder legalmente? ¿Está libre el equipo que necesita? Responder eso a mano —entre tres fuentes distintas— se tragaba horas antes de que pudiera empezar cualquier trabajo real, y un solo permiso pasado por alto podía detener a toda una cuadrilla.',
    'The same puzzle, every morning. A computer should solve this — so I made one.': 'El mismo rompecabezas, cada mañana. Una computadora debería resolver esto —así que hice una.',
    'The tool reads the day\'s three inputs, joins them on the constraints that matter — availability, access, equipment — and returns a clean assignment. What follows is the shape of it, simplified:':
      'La herramienta lee las tres entradas del día, las une según las restricciones que importan —disponibilidad, acceso, equipos— y devuelve una asignación limpia. Lo que sigue es su forma, simplificada:',
    'Illustrative structure — pandas joins the day\'s inputs into a conflict-free plan.': 'Estructura ilustrativa —pandas une las entradas del día en un plan sin conflictos.',
    'The script turned a manual morning ritual into a single run — cutting scheduling time by 75% and an estimated S/ 48,000 a year in reclaimed hours. Just as importantly, it removed the human error from access permissions, so crews stopped losing time to assignments they couldn\'t actually work.':
      'El script convirtió un ritual manual de cada mañana en una sola ejecución —reduciendo el tiempo de programación en un <strong>75%</strong> y un estimado de <strong>S/ 48,000</strong> al año en horas recuperadas. Igual de importante, eliminó el error humano de los permisos de acceso, así las cuadrillas dejaron de perder tiempo en asignaciones que en realidad no podían trabajar.',
    'It\'s the clearest example of the thing I care about most: taking a real operational problem and solving it with software, so the people in the field can get on with the field.':
      'Es el ejemplo más claro de lo que más me importa: tomar un problema operativo real y resolverlo con software, para que la gente en el campo pueda dedicarse al campo.',

    /* ── Foot nav ── */
    '← Previous': '← Anterior',
    'Next →': 'Siguiente →',
    'DAS — Metro de Lima, Line 2': 'DAS — Metro de Lima, Línea 2',
    'DAS — Jorge Chavez Airport T2': 'DAS — Aeropuerto Jorge Chávez T2',

    /* ── Placeholder hints (shown until real photos are added) ── */
    'Wide shot — terminal interior or antenna installation (16:9)': 'Plano general — interior del terminal o instalación de antenas (16:9)',
    'Field photo — installation / supervision (4:3)': 'Foto de campo — instalación / supervisión (4:3)',
    'Screenshot — scheduling tool / spreadsheet (4:3)': 'Captura — herramienta de programación / hoja de cálculo (4:3)',
    'Wide shot — metro station platform or tunnel (16:9)': 'Plano general — andén o túnel de estación de metro (16:9)',
    'Field photo — station equipment / work (4:3)': 'Foto de campo — equipos / trabajo en estación (4:3)',
    'Screenshot — progress report / tracker (4:3)': 'Captura — reporte de avance / seguimiento (4:3)',
    'Full dashboard screenshot — landing / overview page (16:9)': 'Captura completa del tablero — página de inicio / resumen (16:9)',
    'Screenshot — a drill-down / detail page of the report (16:9)': 'Captura — página de detalle del reporte (16:9)',
    'Full dashboard screenshot — the layout / floor-plan view (16:9)': 'Captura completa del tablero — la vista de plano (16:9)',
    'Screenshot — a zoomed zone / sector detail view (16:9)': 'Captura — vista ampliada de detalle de zona / sector (16:9)',
    'Wide shot — the finished solar array (16:9)': 'Plano general — el arreglo solar terminado (16:9)',
    'Field photo — panels / array close-up (4:3)': 'Foto de campo — paneles / arreglo en primer plano (4:3)',
    'Field photo — mounting / structural detail (4:3)': 'Foto de campo — montaje / detalle estructural (4:3)'
  };

  /* Page <title> translations, keyed by the English title. */
  var ES_TITLES = {
    'Franko Sanchez — Mechanical Engineer & Data Analyst': 'Franko Sanchez — Ingeniero Mecánico y Analista de Datos',
    'DAS System — Jorge Chavez Airport T2 · Franko Sanchez': 'Sistema DAS — Aeropuerto Jorge Chávez T2 · Franko Sanchez',
    'DAS System — Metro de Lima, Line 2 · Franko Sanchez': 'Sistema DAS — Metro de Lima, Línea 2 · Franko Sanchez',
    'Power BI — Project Portfolio Dashboard · Franko Sanchez': 'Power BI — Tablero de Portafolio de Proyectos · Franko Sanchez',
    'Power BI — Airport Layout Dashboard · Franko Sanchez': 'Power BI — Tablero de Plano del Aeropuerto · Franko Sanchez',
    'Solar Panel Installation · Franko Sanchez': 'Instalación de Paneles Solares · Franko Sanchez',
    'Python Automation — Resource Scheduling · Franko Sanchez': 'Automatización en Python — Asignación de Recursos · Franko Sanchez'
  };

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  /* Snapshot of every translatable node, captured once in English. */
  var items = [];
  var origTitle = document.title;

  function collect() {
    var els = document.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) {
      items.push({ el: els[i], enHTML: els[i].innerHTML, key: norm(els[i].textContent) });
    }
    // detail-list rows hold "<b>Label</b>trailing text" with no separating
    // space — translate the bold label and the trailing text node separately.
    var ts = document.querySelectorAll('.detail-list .row .t');
    for (var j = 0; j < ts.length; j++) {
      var kids = ts[j].childNodes;
      for (var k = 0; k < kids.length; k++) {
        var n = kids[k];
        if (n.nodeType === 1) {
          items.push({ el: n, enHTML: n.innerHTML, key: norm(n.textContent) });
        } else if (n.nodeType === 3 && n.nodeValue.trim()) {
          items.push({ node: n, enText: n.nodeValue, key: norm(n.nodeValue) });
        }
      }
    }
  }

  function apply(lang) {
    var es = lang === 'es';
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.el) {
        it.el.innerHTML = (es && ES[it.key] != null) ? ES[it.key] : it.enHTML;
      } else {
        if (es && ES[it.key] != null) {
          var lead = (it.enText.match(/^\s*/) || [''])[0];
          var trail = (it.enText.match(/\s*$/) || [''])[0];
          it.node.nodeValue = lead + ES[it.key] + trail;
        } else {
          it.node.nodeValue = it.enText;
        }
      }
    }
    document.title = (es && ES_TITLES[norm(origTitle)]) ? ES_TITLES[norm(origTitle)] : origTitle;
    document.documentElement.lang = es ? 'es' : 'en';
  }

  function updateButtons(lang) {
    var btns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-lang') === lang;
      btns[i].classList.toggle('is-active', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function setLang(lang) {
    apply(lang);
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    updateButtons(lang);
  }

  function init() {
    collect();
    var saved = 'en';
    try { saved = localStorage.getItem(LANG_KEY) || 'en'; } catch (e) {}
    var btns = document.querySelectorAll('.lang-btn');
    for (var i = 0; i < btns.length; i++) {
      (function (b) {
        b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
      })(btns[i]);
    }
    setLang(saved === 'es' ? 'es' : 'en');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
