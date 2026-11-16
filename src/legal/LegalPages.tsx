// ─────────────────────────────────────────────────────────────────────────────
// Textos legales para España: Aviso legal (art. 10 LSSI-CE), Política de privacidad
// (RGPD + LOPDGDD), Política de cookies (art. 22.2 LSSI-CE) y Condiciones generales
// de contratación (solo B2B: empresas y autónomos).
// Actualizado 16.11.2026 — BORRADOR basado en los servicios realmente usados.
// Antes de publicar: rellenar los datos de la empresa en src/company.ts (forma jurídica
// pendiente) y hacer revisar los textos por un abogado / servicio de textos legales.
// Si se añade un servicio nuevo (analítica, newsletter, chat…) → completar Privacidad y Cookies.
// Las páginas se muestran siempre en español (data-no-translate en App.tsx).
// ─────────────────────────────────────────────────────────────────────────────
import { COMPANY, TERMS, fill, phoneHref, priceNote } from '../company'

export const LEGAL_UPDATED = '16.11.2026'

const h2: React.CSSProperties = { fontSize: 'clamp(19px, 1.8vw, 24px)', lineHeight: 1.25, margin: '40px 0 12px', fontWeight: 700 }
const h3: React.CSSProperties = { fontSize: 16.5, lineHeight: 1.35, margin: '24px 0 8px', fontWeight: 700 }
const p: React.CSSProperties = { fontSize: 15.5, lineHeight: 1.8, color: 'var(--muted)', margin: '0 0 12px' }
const ul: React.CSSProperties = { ...p, paddingLeft: 22 }

function Todo({ v, label }: { v: string; label: string }) {
  return v.trim() ? <>{v}</> : <mark style={{ backgroundColor: '#FFF3C4', color: 'inherit', padding: '0 4px', borderRadius: 4 }}>{fill(v, label)}</mark>
}

function Address() {
  const c = COMPANY
  return (
    <p style={p}>
      <Todo v={c.legalName} label="Razón social o nombre del titular" /><br />
      <Todo v={c.street} label="Dirección" /><br />
      <Todo v={c.zip} label="C.P." /> <Todo v={c.city} label="Localidad" />{c.province ? <> ({c.province})</> : null}<br />
      {c.country}
    </p>
  )
}

// ── Aviso legal ──────────────────────────────────────────────────────────────
export function AvisoLegalBody() {
  const c = COMPANY
  return (
    <>
      <h2 style={{ ...h2, marginTop: 0 }}>Datos identificativos (art. 10 LSSI-CE)</h2>
      <p style={p}>En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), le informamos de los datos del titular de este sitio web:</p>
      <Address />
      <p style={p}>NIF/CIF: <Todo v={c.vatId} label="NIF/CIF" /></p>
      <p style={p}>Representante: <Todo v={c.representative} label="Administrador o titular" /></p>

      <h2 style={h2}>Contacto</h2>
      <p style={p}>
        Teléfono: {c.phone ? <a href={phoneHref()} className="ul">{c.phone}</a> : <Todo v="" label="Teléfono" />}<br />
        Email: <a href={`mailto:${c.email}`} className="ul">{c.email}</a>
      </p>

      {(c.registerCourt || c.registerNumber || !c.ready) && (
        <>
          <h2 style={h2}>Datos registrales</h2>
          <p style={p}>
            Registro: <Todo v={c.registerCourt} label="Registro Mercantil de … (solo sociedades; si es autónomo, eliminar este apartado)" /><br />
            Inscripción: <Todo v={c.registerNumber} label="Tomo, Folio, Hoja, Inscripción" />
          </p>
        </>
      )}

      <h2 style={h2}>Objeto</h2>
      <p style={p}>Este sitio web presenta los servicios de visibilidad local de RAG (perfil de empresa de Google, webs, búsqueda con IA, reseñas y redes sociales) y permite solicitar un análisis de visibilidad gratuito y acceder al área de cliente. Nuestros servicios se dirigen exclusivamente a empresas y profesionales.</p>

      <h2 style={h2}>Propiedad intelectual e industrial</h2>
      <p style={p}>Los textos, diseños, logotipos y código de este sitio son de RAG o de sus licenciantes. No se permite su reproducción con fines comerciales sin autorización. Las marcas de terceros (Google, ChatGPT, Instagram, etc.) pertenecen a sus titulares y se citan solo con fines descriptivos.</p>

      <h2 style={h2}>Responsabilidad sobre contenidos y enlaces</h2>
      <p style={p}>Elaboramos el contenido de este sitio con cuidado. De los contenidos de sitios externos a los que enlazamos responden sus titulares. Si tenemos conocimiento de una infracción, retiraremos de inmediato el contenido o enlace afectado.</p>

      <h2 style={h2}>Legislación aplicable</h2>
      <p style={p}>Este sitio web se rige por la legislación española.</p>
    </>
  )
}

// ── Política de privacidad ───────────────────────────────────────────────────
export function PrivacidadBody() {
  const c = COMPANY
  return (
    <>
      <p style={p}>Aquí explicamos qué datos personales tratamos en este sitio web y en su área de cliente, con qué fin y con qué base jurídica, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD). No usamos cookies de publicidad ni de seguimiento y no cedemos datos con fines publicitarios.</p>

      <h2 style={h2}>1. Responsable del tratamiento</h2>
      <Address />
      <p style={p}>NIF/CIF: <Todo v={c.vatId} label="NIF/CIF" /> · Email: <a href={`mailto:${c.email}`} className="ul">{c.email}</a>{c.phone ? <> · Teléfono: {c.phone}</> : null}</p>
      {c.contentResponsible ? <p style={p}>Delegado de Protección de Datos: {c.contentResponsible}</p> : <p style={p}>No estamos obligados a designar un Delegado de Protección de Datos (art. 34 LOPDGDD). Para cualquier cuestión sobre privacidad puede escribirnos al email indicado.</p>}

      <h2 style={h2}>2. Visita a la web (alojamiento)</h2>
      <p style={p}>La web está alojada en Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, EE. UU. Al visitarla, Vercel trata los datos técnicos necesarios: dirección IP, fecha y hora, página visitada, referente, navegador y sistema operativo. Es necesario para servir la página y protegerla de ataques (interés legítimo, art. 6.1.f RGPD). Los registros del servidor se borran como máximo a los 30 días. Vercel está certificado en el EU-US Data Privacy Framework; además existe un contrato de encargo del tratamiento con cláusulas contractuales tipo.</p>

      <h2 style={h2}>3. Almacenamiento en el navegador</h2>
      <p style={p}>Solo guardamos en su navegador lo estrictamente necesario para las funciones que usted solicita. Los detalles están en la <a href="/cookies" className="ul">política de cookies</a>.</p>

      <h2 style={h2}>4. Fuentes tipográficas</h2>
      <p style={p}>La fuente «Manrope» se carga desde nuestro propio servidor. No se establece conexión con Google Fonts ni con otros proveedores de fuentes.</p>

      <h2 style={h2}>5. Análisis de visibilidad y área de cliente</h2>
      <h3 style={h3}>Búsqueda de empresas</h3>
      <p style={p}>Cuando busca su empresa, enviamos el término de búsqueda desde nuestro servidor a la API de Google Places (Google Ireland Limited, Gordon House, Barrow Street, Dublín 4, Irlanda). Su dirección IP no se transmite a Google. Recibimos datos públicos del perfil de empresa de Google (nombre, dirección, reseñas, etc.).</p>
      <h3 style={h3}>Cuenta y análisis</h3>
      <p style={p}>Para el análisis de visibilidad, tras el cuestionario o tras elegir un paquete, usted crea una cuenta. Guardamos email, contraseña (solo como hash cifrado), nombre, teléfono, la empresa elegida, las direcciones de web y redes sociales indicadas, sus respuestas al cuestionario y los paquetes elegidos, sus mensajes, citas, ofertas, facturas, el estado del proyecto y el informe. Tras el registro el análisis empieza automáticamente: consultamos el perfil de empresa de Google mediante la API de Google Places, accedemos a su web, revisamos datos públicos (p. ej. aviso legal, política de privacidad, sitemap) y medimos la velocidad con Google PageSpeed Insights. La base jurídica es la ejecución del análisis o del contrato solicitado (art. 6.1.b RGPD).</p>
      <p style={p}>La base de datos y el registro los gestiona Supabase Inc. (970 Toa Payoh North #07-04, Singapur) como encargado del tratamiento; los datos están en servidores de la UE (Fráncfort, Alemania). Existe un contrato de encargo con cláusulas contractuales tipo.</p>
      <p style={p}>Si inicia sesión con Google, Google nos facilita su nombre y su email; Google trata sus datos según su propia política de privacidad.</p>
      <h3 style={h3}>Plazo de conservación</h3>
      <p style={p}>Conservamos los datos de la cuenta hasta que usted la elimine, cosa que puede hacer en cualquier momento en «Cuenta», dentro del área de cliente. Si no llega a haber contrato, eliminamos las solicitudes como máximo 24 meses después del último contacto. Los datos que debemos conservar por obligaciones fiscales y mercantiles (facturas, contratos) se eliminan al terminar los plazos legales (en general, 4 años según la normativa tributaria y 6 años según el Código de Comercio).</p>

      <h2 style={h2}>6. Protección frente a bots (Cloudflare Turnstile)</h2>
      <p style={p}>Protegemos la búsqueda de empresas, el registro, el acceso y «He olvidado la contraseña» con Cloudflare Turnstile (Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, EE. UU.). Turnstile comprueba, a partir de características técnicas del navegador y de la IP, si quien usa la página es una persona, sin acertijos de imágenes ni cookies publicitarias. La finalidad es evitar abusos y solicitudes automatizadas que nos generan costes (interés legítimo, art. 6.1.f RGPD). Cloudflare está certificado en el EU-US Data Privacy Framework. Más: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener" className="ul">cloudflare.com/privacypolicy</a>.</p>

      <h2 style={h2}>7. Reserva de citas</h2>
      <p style={p}>Para las citas enlazamos a la reserva de citas de Google Calendar. Solo cuando abre el enlace, Google trata sus datos (nombre, email, cita elegida) según su política de privacidad. La base jurídica es la aplicación de medidas precontractuales (art. 6.1.b RGPD).</p>

      <h2 style={h2}>8. Contacto por email y teléfono</h2>
      <p style={p}>Si nos escribe o nos llama, tratamos sus datos para responder a su consulta (art. 6.1.b o 6.1.f RGPD).</p>
      <p style={p}>Podemos llamarle o escribirle si hay dudas sobre su análisis o cuando su informe esté listo, usando el teléfono que indique en el registro o en el área de cliente. Facilitarlo es voluntario. Las llamadas comerciales solo las hacemos con su consentimiento expreso, que puede retirar en cualquier momento.</p>
      <p style={p}>Los emails del área de cliente (confirmación, restablecer contraseña, nuevo mensaje, persona de contacto asignada, informe listo, oferta, cita, factura, estado del proyecto) los enviamos a través de Brevo (Sendinblue GmbH, Köpenicker Str. 126, 10179 Berlín, Alemania) como encargado del tratamiento. Brevo trata su email, su nombre y el contenido del aviso; los datos están en servidores de la UE. Base jurídica: ejecución del análisis o del contrato (art. 6.1.b RGPD). Existe un contrato de encargo del tratamiento.</p>

      <h2 style={h2}>9. Consejos por email (solo con consentimiento)</h2>
      <p style={p}>Solo enviamos consejos ocasionales sobre visibilidad local si lo ha marcado expresamente en el registro (art. 6.1.a RGPD y art. 21 LSSI-CE). Guardamos la fecha y el contenido de su consentimiento. Puede retirarlo en cualquier momento, con el enlace de baja de cada email o escribiendo a {c.email}.</p>

      <h2 style={h2}>10. Contacto con empresas</h2>
      <p style={p}>Podemos dirigirnos a empresas seleccionadas por correo postal o por teléfono para presentar nuestros servicios, adjuntando un breve análisis de visibilidad. Para ello solo usamos datos empresariales públicos del perfil de empresa de Google y de la web de la empresa (nombre, dirección, sector, web, reseñas). La base jurídica es nuestro interés legítimo en presentar nuestros servicios a empresas (art. 6.1.f RGPD). No enviamos comunicaciones comerciales por email sin consentimiento previo (art. 21 LSSI-CE). Puede oponerse en cualquier momento escribiendo a {c.email}; entonces no volveremos a contactarle y eliminaremos sus datos, salvo los necesarios para la lista de exclusión. Si la empresa no responde, eliminamos los datos como máximo 24 meses después del contacto.</p>

      <h2 style={h2}>11. Peticiones de reseñas para nuestros clientes</h2>
      <p style={p}>Cuando, por encargo de una empresa cliente, pedimos una reseña a sus clientes (enlace o código QR), actuamos como encargado del tratamiento de esa empresa (art. 28 RGPD). La responsable es entonces la empresa cliente, que garantiza que existe consentimiento para las peticiones por email o SMS.</p>

      <h2 style={h2}>12. Analítica web</h2>
      <p style={p}>Actualmente no usamos analítica web. Si eso cambia, lo informaremos aquí de antemano y pediremos su consentimiento cuando sea necesario.</p>

      <h2 style={h2}>13. Sus derechos</h2>
      <p style={p}>Tiene derecho de acceso (art. 15 RGPD), rectificación (art. 16), supresión (art. 17), limitación del tratamiento (art. 18), portabilidad (art. 20) y oposición (art. 21), así como a retirar en cualquier momento los consentimientos dados, sin efecto retroactivo (art. 7.3). Basta un email a {c.email}, indicando qué derecho ejerce.</p>
      <p style={{ ...p, fontWeight: 600, color: 'var(--ink)' }}>Derecho de oposición: cuando tratamos datos por interés legítimo (art. 6.1.f RGPD), puede oponerse en cualquier momento por motivos relacionados con su situación particular (art. 21 RGPD).</p>
      <p style={p}>También puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), C/ Jorge Juan 6, 28001 Madrid, <a href="https://www.aepd.es" target="_blank" rel="noopener" className="ul">www.aepd.es</a> (art. 77 RGPD).</p>
      <p style={p}>No se toman decisiones automatizadas en el sentido del art. 22 RGPD. El informe lo elabora nuestro equipo; los valores recogidos automáticamente son solo una base.</p>
    </>
  )
}

// ── Política de cookies ──────────────────────────────────────────────────────
export function CookiesBody() {
  return (
    <>
      <p style={p}>Esta web no usa cookies de publicidad, de analítica ni de seguimiento, ni propias ni de terceros. Por eso no le mostramos un banner de cookies: solo usamos almacenamiento técnico, exento de consentimiento según el art. 22.2 LSSI-CE, porque es estrictamente necesario para prestar el servicio que usted solicita.</p>

      <h2 style={h2}>Qué guardamos en su navegador</h2>
      <ul style={ul}>
        <li><strong>Idioma</strong> (almacenamiento local «rag-lang»): su elección entre español y ruso. Se conserva hasta que lo borre.</li>
        <li><strong>Sesión del área de cliente</strong> (almacenamiento local de Supabase): mantiene su sesión iniciada mientras usa el área de cliente. Se borra al cerrar sesión.</li>
        <li><strong>Análisis en curso</strong> (almacenamiento de sesión): un pase temporal de la protección frente a bots y una marca de que el análisis ya ha empezado. Se borran al cerrar la pestaña.</li>
        <li><strong>Protección frente a bots</strong> (Cloudflare Turnstile): puede usar almacenamiento técnico propio para comprobar que es una persona. Más información en la <a href="/privacidad" className="ul">política de privacidad</a>.</li>
      </ul>

      <h2 style={h2}>Inicio de sesión con Google</h2>
      <p style={p}>Si elige «Continuar con Google», es Google quien establece sus propias cookies en su dominio, según su política de privacidad. Nosotros no las controlamos.</p>

      <h2 style={h2}>Cómo borrarlo</h2>
      <p style={p}>Puede borrar en cualquier momento el almacenamiento local y las cookies desde la configuración de su navegador. Algunas funciones (idioma, sesión) dejarán de recordarse.</p>

      <h2 style={h2}>Cambios</h2>
      <p style={p}>Si en el futuro usamos cookies que requieran consentimiento (por ejemplo, analítica), lo indicaremos aquí y pediremos su consentimiento antes de usarlas.</p>
    </>
  )
}

// ── Condiciones generales de contratación ────────────────────────────────────
export function CondicionesBody() {
  const c = COMPANY
  const n = (k: number, t: string) => <h2 style={h2}>{k}. {t}</h2>
  const term = TERMS.minTermMonths > 0
    ? <>Los paquetes mensuales (webs, gestión de redes sociales) tienen una duración mínima de {TERMS.minTermMonths} meses. Después se prorrogan por tiempo indefinido y cualquiera de las partes puede resolverlos con un preaviso de {TERMS.noticeDays} días antes de fin de mes.</>
    : <>Los paquetes mensuales (webs, gestión de redes sociales) no tienen permanencia: se prorrogan mes a mes y cualquiera de las partes puede resolverlos con un preaviso de {TERMS.noticeDays} días antes de fin de mes.</>
  return (
    <>
      <p style={p}>Condiciones generales de contratación de <Todo v={c.legalName} label="Razón social o nombre del titular" /> («RAG», «nosotros») para servicios de visibilidad local.</p>

      {n(1, 'Ámbito de aplicación')}
      <p style={p}>1.1 Estas condiciones se aplican a todos los contratos entre RAG y sus clientes. Nuestros servicios se dirigen exclusivamente a empresarios y profesionales (empresas y autónomos) que contratan para su actividad empresarial o profesional, y no a consumidores en el sentido del Real Decreto Legislativo 1/2007.</p>
      <p style={p}>1.2 Las condiciones del cliente que se aparten de estas solo se aplican si las aceptamos expresamente por escrito.</p>

      {n(2, 'Contratación')}
      <p style={p}>2.1 Una solicitud a través de la web, del análisis de visibilidad o del área de cliente todavía no es un encargo. Tras una conversación, el cliente recibe una oferta en el área de cliente o por escrito.</p>
      <p style={p}>2.2 El contrato se perfecciona cuando el cliente acepta la oferta (con el botón «Aceptar oferta» en el área de cliente o por escrito) y confirmamos la aceptación. El análisis de visibilidad gratuito no genera ninguna obligación de pago.</p>

      {n(3, 'Servicios')}
      <p style={p}>3.1 El alcance y el contenido de los servicios resultan de la oferta aceptada y de la descripción del paquete en <a href="/precios" className="ul">/precios</a> en el momento de la aceptación.</p>
      <p style={p}>3.2 Nos obligamos a realizar el trabajo acordado, no a conseguir un resultado concreto. En particular, no garantizamos posiciones en Google, Google Maps, asistentes de IA (ChatGPT, Perplexity, Gemini, etc.) o redes sociales, ni un número de reseñas, llamadas o encargos. Estos sistemas los gestionan terceros, que pueden cambiar sus reglas en cualquier momento.</p>
      <p style={p}>3.3 Podemos recurrir a subcontratistas y proveedores técnicos, manteniendo nuestra responsabilidad frente al cliente.</p>

      {n(4, 'Colaboración del cliente')}
      <p style={p}>4.1 El cliente facilita a tiempo la información, los accesos (p. ej. al perfil de empresa de Google), las fotos y las aprobaciones necesarias. Si se retrasa, los plazos se desplazan en consecuencia; la cuota de los paquetes en curso sigue siendo debida.</p>
      <p style={p}>4.2 El cliente garantiza que tiene los derechos necesarios sobre los contenidos entregados (textos, fotos, logotipos) y que las personas que aparecen han dado su consentimiento. Nos mantendrá indemnes frente a reclamaciones de terceros por incumplir esta obligación.</p>
      <p style={p}>4.3 El cliente revisa los contenidos antes de aprobarlos para comprobar su exactitud técnica y legal (p. ej. precios, promesas de servicio, datos obligatorios de su sector).</p>

      {n(5, 'Reseñas')}
      <p style={p}>5.1 Ayudamos a conseguir reseñas reales de clientes reales (p. ej. con un enlace o un código QR). No compramos, inventamos ni filtramos reseñas, ni pedimos reseñas solo a los clientes satisfechos. El cliente no ofrece contraprestaciones a cambio de reseñas (descuentos, regalos).</p>
      <p style={p}>5.2 Solo enviamos peticiones de reseña por email, SMS o mensajería a los clientes del cliente si este garantiza que cuenta con el consentimiento del destinatario (art. 21 LSSI-CE). El cliente responde de la licitud de los datos de contacto.</p>

      {n(6, 'Precios y pago')}
      <p style={p}>6.1 Se aplican los precios de la oferta aceptada. {priceNote()}</p>
      <p style={p}>6.2 Los servicios únicos (p. ej. perfil de Google llave en mano) se facturan al terminarlos. Los paquetes mensuales se facturan por meses anticipados, por primera vez en el mes en que empezamos a trabajar.</p>
      <p style={p}>6.3 Las facturas se pagan en un plazo de 14 días sin descuento. Los costes de terceros que el cliente encargue expresamente (p. ej. presupuestos publicitarios, fotógrafos, impresión) los asume directamente o se facturan por separado.</p>

      {n(7, 'Duración y resolución')}
      <p style={p}>7.1 {term}</p>
      <p style={p}>7.2 Queda a salvo el derecho a resolver el contrato por incumplimiento grave, p. ej. por un retraso en el pago de más de dos cuotas mensuales.</p>
      <p style={p}>7.3 La resolución debe comunicarse por escrito (basta un email).</p>

      {n(8, 'Lo que es del cliente, también al terminar el contrato')}
      <p style={p}>8.1 <strong>Perfil de empresa de Google y cuentas en redes sociales:</strong> son del cliente. El cliente es o sigue siendo el titular; trabajamos con un acceso de administrador propio, que entregamos al terminar el contrato.</p>
      <p style={p}>8.2 <strong>Dominio:</strong> los dominios que registramos para el cliente se registran a su nombre. Al terminar el contrato, si lo pide, transferimos el dominio sin coste (código de autorización o cambio de proveedor). Las tasas de registro hasta ese momento están incluidas en el paquete.</p>
      <p style={p}>8.3 <strong>Contenidos:</strong> los textos, fotos y logotipos que aporta el cliente o que creamos para él y que ha pagado puede seguir usándolos sin limitación tras el contrato. Si lo pide, se los entregamos reunidos en archivos.</p>
      <p style={p}>8.4 <strong>Web:</strong> durante el contrato la web funciona con nuestra técnica (plantillas, alojamiento, mantenimiento). Al terminar, si lo pide, el cliente recibe una exportación de la web con todo su contenido como archivos estáticos que pueden alojarse en cualquier proveedor. No existe derecho a nuestras plantillas de código ni a nuestras herramientas.</p>
      <p style={p}>8.5 <strong>Funciones a medida:</strong> las funciones que van más allá de una web estática y se encargan por separado (p. ej. un área de clientes con acceso, integraciones con otros sistemas) no pueden exportarse como archivos estáticos. Si y cómo se entregan al terminar lo regula la oferta correspondiente; a falta de regulación, el cliente recibe su contenido y sus datos en un formato de archivo habitual.</p>

      {n(9, 'Responsabilidad')}
      <p style={p}>9.1 Respondemos sin limitación en caso de dolo o culpa grave y por daños a la vida, la integridad física o la salud.</p>
      <p style={p}>9.2 En caso de culpa leve en el incumplimiento de obligaciones esenciales, nuestra responsabilidad se limita al daño típico y previsible del contrato y, como máximo, a la remuneración de los últimos doce meses. En lo demás se excluye la responsabilidad por culpa leve.</p>
      <p style={p}>9.3 No respondemos de decisiones, caídas o cambios de reglas de Google, Meta, proveedores de IA y otras plataformas, ni de bloqueos debidos a datos facilitados por el cliente.</p>

      {n(10, 'Protección de datos y encargo del tratamiento')}
      <p style={p}>Cuando tratemos datos personales por cuenta del cliente (p. ej. datos de contacto de sus clientes para peticiones de reseña), firmaremos un contrato de encargo del tratamiento conforme al art. 28 RGPD. En lo demás se aplica nuestra <a href="/privacidad" className="ul">política de privacidad</a>.</p>

      {n(11, 'Referencias')}
      <p style={p}>Solo citamos al cliente como referencia o en casos de ejemplo con su consentimiento expreso.</p>

      {n(12, 'Disposiciones finales')}
      <p style={p}>12.1 Estas condiciones se rigen por la legislación española, con exclusión de la Convención de Viena sobre compraventa internacional de mercaderías.</p>
      <p style={p}>12.2 Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio de RAG (<Todo v={c.city} label="Localidad" />).</p>
      <p style={p}>12.3 Si alguna cláusula fuera nula, el resto del contrato seguirá siendo válido.</p>
    </>
  )
}

/** Kurzfassung für /precios («Gut zu wissen»). Spanischer Quelltext, RU in ru.json. */
export const PRICE_FACTS: [string, string][] = [
  ['Precios', priceNote() + ' Nuestras ofertas se dirigen a empresas y autónomos.'],
  ['Duración', TERMS.minTermMonths > 0
    ? `Paquetes mensuales: permanencia mínima de ${TERMS.minTermMonths} meses; después, cancelables cada mes (${TERMS.noticeDays} días antes de fin de mes). El perfil de Google es un pago único, sin suscripción.`
    : `Paquetes mensuales: sin permanencia, cancelables cada mes (${TERMS.noticeDays} días antes de fin de mes). El perfil de Google es un pago único, sin suscripción.`],
  ['Es suyo', 'El perfil de Google, las cuentas en redes y el dominio están a su nombre. Si cancela, se lo lleva todo; la web, si quiere, como exportación.'],
]
