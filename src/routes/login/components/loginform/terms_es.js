import React from 'react';
import { regularEvent } from '../../../../config';

export default class Terms_en extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
        ga( 'send' , regularEvent.showDisclaimerScreen );
	}

	render() {
		return (
			<div style={{ textAlign:'justify' }} className='orkerTerm'>
				<p>
					Bienvenido a común acuerdo de usuario de Orker (en adelante denominado ‘este acuerdo’). Los términos y condiciones en este acuerdo se aplican a una variedad de herramientas y servicios de Orker cuando se utiliza (en adelante denominado 'servicio').
				</p>
				<p>
					<span><b>1. Confirmación de los términos de servicio</b></span>
					<span>
						Orker ofrece servicios a los usuarios de conformidad con los términos del servicio y modificación.<br/>
						Si no está de acuerdo en cualquier cláusula de este acuerdo, usted puede elegir no para inscribirse. una vez que haga clic en 'registrar' y pasar el procedimiento de registro, indica que usted acepta todos estos términos de este acuerdo y se ha convertido en un miembro registrado en Orker. El usuario se compromete a aceptar todo tipo de servicios de información proporcionados por Orker Cuándo usarlo.
					</span>
				</p>
				<p>
					<span><b>2. Servicio de contenido, modificación, interrupción y terminación</b></span>
					<span>
						2.1 El contenido específico del servicio común de Orker es proporcionado por esta plataforma según la situación práctica y tiene el derecho de decisión final sobre la interpretación de estos términos y condiciones.
					</span>
					<span>
						2.2 Orker sólo proporciona servicios a sus miembros, luego debe permitir cualquier otro equipo relacionados con el servicio (e.i. móviles, ordenadores personales y otros dispositivos relacionados conectados a Internet o web móvil) junto con los gastos (e.i. la factura de teléfono, teléfono celular o ancho de banda para acceso a internet).
					</span>
					<span>
						2.3 Aquí por la particularidad de red común, no podía garantizar que el servicio de red no interrumpirá y ninguna promesa a la puntualidad y la exactitud de los servicios de red. Usuario entiende que común necesita para mantener el servicio de red en regular o aperiodically, o examinar y reparar equipo relevante. Si el usuario no puede acceder a internet cuando estamos haciendo ese trabajo, Orker no tiene alguna responsabilidad por ello. Orker reserva el derecho de mantener, actualizar o suspender total o parcialmente el servicio de red en otros propósitos sin previo aviso.
					</span>
					<span>
						2.4 Usuario necesita acordar completamente el riesgo por cuenta propia cuando usa Orker. Usuario entiende y acepta que la información, productos y servicios que adquieren a través del servicio de descarga o plataforma en Orker son registrados automáticamente por Orker.
					</span>
					<span>
						2.5 Orker tiene el derecho de modificar y cancelar este servicio (o cualquier parte del mismo) temporal o permanentemente en cualquier momento, Orker no tiene ninguna responsabilidad para el usuario o cualquier tercera persona independientemente de la notificación o no.
					</span>
					<span>
						2.6 Usted acepta común basado en la consideración de sus propios intereses,  por cualquier razón propia (incluyendo pero no limitadas a violar esta disposición literalmente y en espíritu) terminar su contraseña, cuenta o uso de este servicio (o cualquier parte del servicio) y retirar y eliminar la información que usted envíe mientras utiliza los servicios. Orker reserva el derecho de restringir o cancelar el acceso de cualquier usuario o utilizar servicio de Orker en cualquier momento sin ningún aviso previo. Su conocimiento y acuerdo de Orker puede inmediatamente cerrar, o eliminar su cuenta y toda la información pertinente en su cuenta o prohibir usuario seguir utilizando el archivo anterior o este servicio.
						Además, usted acepta que Orker no tiene ninguna obligación para usted o cualquier tercero si el uso de este servicio se interrumpe o termina o su número de cuenta, archivos e información relacionada están cerrados o borrados.
					</span>
				</p>
				<p>
					<span><b>3. La cuenta y contraseña de miembros</b></span>
					<span>
						El usuario hace falta de examinar su cuenta y contraseña después de registrarse. También tendrá el deber jurídico en todas las actividades que hace en su cuenta.
						Orker no será responsable de los ataques de Orkers o de usuario descuidado cuando otros utilizan la cuenta ilegal. Infórmanos inmediatamente por favor si encuentra cualquier ilegal o cualquier fuga de seguridad de la cuenta.
					</span>
				</p>
				<p>
					<span><b>4. La información de registro y protección privada</b></span>
					<span>
						4.1 La titularidad de las cuentas de la aplicación pertenece al Orker. Los usuarios obtienen el uso de los derechos de las cuentas de la aplicación después de terminar el registro. Los usuarios deben proporcionar información personal en detalla y precisa oportuna y actualizar constantemente. Todos datos tipo original se sirvió de los datos registrados. Orker no es responsable de las cuestiones legales y consecuencias que causaron por información falsa que facilitaron por los usuarios.
					</span>
					<span>
						Los usuarios son prohibidos transferir , prestar su cuenta o contraseña a otros. Los usuarios deben notificar inmediatamente a Orker si encuentra cualquier uso ilegal de su cuenta por otros.
					</span>
					<span>
						4.3 Orker recopilará su información de identificación personal al registrar su cuenta en la plataforma de aplicación, usar  productos o servicios , visitar sitios web de Orker, y estos datos se utilizarán para mejorar los servicios y contenidos 
						cuáles será proporcionados para usted.
					</span>
					<span>
						4.4 Order Tracker will not disclose user’s registration information to the public or to a third party, unless:
						Conformidad con los requisitos de las leyes relacionadas y reglamentos;
						Obtención de la autorización clara del usuario
						Para proporcionar sus servicios y productos requeridos solamente después de revelar su información personal;
						Para reivindicar el derecho legal de Orker.
					</span>
				</p>
				<p>
					<span><b>5. Derecho y responsabilidad de usuario</b></span>
					<span>
						5.1 Individuos u organizaciones pueden solicitar los usuarios común y utilizar el servicio bajo este acuerdo, que se reúnen al menos una de las siguientes condiciones:
						5.1.1 18 años (o tales otros años en que se alcanza la mayoría en su país) o mayor; y persona natural con una completa capacidad civil por conducta civil.
						5.1.2 Empresas, institutos, organizaciones sociales y otras organizaciones que establecen y existen legalmente según las leyes y reglamentos pertinentes.
					</span>
					<span>
						5.2 Los usuarios tendrán el derecho a utilizar los servicios de Internet proporcionados por Orker acuerdo con los procedimientos prescritos por Orker. Si el usuario tiene cualquier discrepancia a este servicio, póngase en contacto con Orker con el fin de resolverse en tiempo.
					</span>
					<span>
						5.3 Los usuarios deben proporcionar información personal precisa a Orker cuando solicitan el uso de servicio de red y los usuarios deben actualizar la información personal en el tiempo si hay algún cambio.
					</span>
					<span>
						5.4 Los usuarios deben estar a favor de aceptar Orker que envía información de negocios a sus miembros a través de correo electrónico u otras formas.
					</span>
					<span>
						5.5 Los usuarios deben acatar las disposiciones de las leyes relacionadas y reglamentos de la República Popular de China cuando utilizan el servicio de Orker y no puede utilizar este servicio para cualquier actividad ilegal o impropia.
					</span>
					<span>
						5.6 Usted acepta indemnizar a Orker, sus cooperatdores y sus empresas asociadas, para cualquier o todas reclamaciones, daños, pérdidas y causas de acción (incluyendo honorarios y costas de abogados) que se presentan o relativas a su incumplimiento de estos términos. Si Orker encuentra o recibe informes o quejas de otros en violación del acuerdo de usuario, Orker tiene derecho a eliminar su contenido sin previo aviso y dependiendo de las circunstancias de la ley para incluir pero no limitada a la eliminación de algunos o todos los suscriptores, restricción o prohibición de la utilización de todo o parte de las funciones, sanciones por cuenta cierre incluso cancelación y observe los resultados de procesamiento. Para la cuenta de Orker, además de lo anterior medidas de la pena, Orker tiene el derecho a cancelar su autenticación de identidad y dependiendo de las circunstancias, para determinar el cierre temporal o definitivo de la certificación correspondiente.
					</span>
					<span>
						5.7 Los usuarios se compromete que no reproducir, duplicar, copiar, vender, revender o explotar en cualquier parte del servicio o utilizar el servicio para otros fines comerciales.
					</span>
					<span>
						5.8 Los usuarios deberán llevar responsabilidad legal ellos mismos cuando utilizan el servicio de Orker, incluyendo pero no limitado a: pagar la víctima compensación y pagar la igual compensación  al Orker, cuál paga el castigo administrativo según usuario comportamiento.
					</span>
				</p>
				<p>
					<span><b>6. Derechos de propiedad intelectual</b></span>
					<span>
						6.1 Con respecto al contenido incluyendo pero no limitado a carácteres, software, audio, fotos, video, gráficos, su reconocimiento y acepta que el servicio y cualquier software necesario usado en conexión con el servicio contienen propiedad y información confidencial que está protegida por propiedad intelectual aplicable y otras leyes. Su reconocimiento y acepta el contenido incluido en anuncios de patrocinadores o información presentada a usted por medio del servicio olos anunciantes está protegida por derechos de autor, marcas registradas, marcas de servicio, patentes u otros derechos de propiedad y leyes. Excepto lo expresamente autorizado por común o los titulares del copyright, los usuarios aceptan no modificar, alquilar, arrendar, préstamo, vender, distribuir o crear trabajos derivados basados en el servicio o el Software, en todo o en parte, o crear un trabajo derivado.</span>
					<span>
						6.2 Orker otorga a los usuarios un derecho personal, intransferible y no exclusivo derecho y licencia para usar el código objeto del Software en un único ordenador; siempre que usted no (y no permita que terceros a) copiar, modificar, adaptar, crear trabajos derivados de, ingeniería inversa, revertir montaje u otra manera intente descubrir cualquier código fuente, vender, asignar, sublicenciar, otorgar seguridad o transferir cualquier derecho en el Software.
					</span>
					<span>
						6.3 Orker tiene el derecho para anotación de interfaz 'esta funcionalidad es proporcionada por Orker' y otra información relacionada con derechos de autor en todo el interfaz de la función, que son proporcionados por la plataforma.
					</span>
				</p>
				<p>
					<span><b>7. Otros</b></span>
					<span>
						7.1 A causa de la fuerza irresistible u otros acontecimientos imprevistos, imposibilitando la aplicación de este acuerdo, ambas partes no serán responsables. De este acuerdo, el término 'fuerza irresistible' significa la condición objetiva que podría no imprevisible, inevitable e insuperable, incluyendo pero no limitado a la guerra, tifón, inundación, incendio, rayo o terremoto, huelgas, motines, virus de la enfermedad legal, ataques de hackers, software o fallo de línea de comunicaciones o mal funcionamiento, control técnico del Departamento de telecomunicaciones, gobierno o cualquier otros desastres naturales o provocados por el hombre, etc.
					</span>
					<span>
						7.2 Esta cláusula y la validez, aplicación de la revisión y todos los asuntos se consideran obligados por las leyes de la República Popular de China, cualquier disputa solamente obedece al uso sobre la ley de la República Popular de China.
					</span>
					<span>
						7.3 Las partes a intentar resolver cualquier reclamación o litigio o controversia que surjan de los términos y condiciones entre el usuario y la empresa, a través de la negociación amistosa. Si las partes no logran resolver la disputa a través de negociación, el conflicto será bajo la jurisdicción de la corte de gente en el lugar donde se encuentra Orker.
					</span>
					<span>
						7.4 Los usuarios hace falta de presentar correcta  información de registro requerido para el proceso de inscripción, leer y entender este acuerdo, y entonces se establece este acuerdo y entrada en vigor.
					</span>
					<span>
						7.5 los usuarios inscritos antes de la vigencia de este acuerdo sólo necesitan utilizar el original nombre de usuario y contraseña a la página de inicio de sesión de Orker para aceptar y confirmar este acuerdo, entonces usted podrá utilizar servicio de plataforma de aplicación.
					</span>
					<span>
						7.6 Válido acuerdo: el usuario se compromete a este acuerdo o uso común hasta los usuarios cancelar servicio de Orker.
					</span>
					<span>
						7.7 Si no existen disposiciones especiales sobre este acuerdo, ambos lados necesita contactar en asuntos relacionados con este acuerdo por correo electrónico.
					</span>
					<span>
						7.8 El buzón de correo electrónico de los departamentos pertinentes de Orker están sujetos a la indicación en la página web de Orker.
					</span>
					<span>
						7.9 El uso de Orker indica que usted acepta el acuerdo de servicio de Orker y todos sus accesorios.
					</span>
					<span>
						7.10 Nuestra empresa cuenta con la interpretación final de este acuerdo.
					</span>
				</p>
			</div>
		);
	}
}
