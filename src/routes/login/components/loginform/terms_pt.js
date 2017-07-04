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
					Bem-vindo à acordo do usário de Orker ( daqui em diante referido ′presente acordo′). Os termos e condições neste acordo aplicam-se para variadade de ferramentas e serviços fornecido pelo Orker quando você o usa.(A seguir denominado aos ′serviços′).
				</p>
				<p>
					<span><b>1. Confirmação dos termos de serviços</b></span>
					<span>
						Orker oforece serviços para usários em concordância com os termos de serviços e modificação.Se você discordar de qualquer cláusula deste acordo, você pode optar por não se registar.Uma vez que você clicar no ′registar′e passar pelo processo de registração, que indica que você aceita todos os termos deste acordo, e se torna o membro do Orker. Os usários concordam a aceitar todos os tipos das informações de serviço fornecidas pelo Orker quando o usa. 
					</span>
				</p>
				<p>
					<span><b>2. Contéudo de serviço, modificação, interrupção e terminação</b></span>
					<span>
						2.1 o contéudo especifico do serviço de Orker é fornecido por esta plataforma de acordo com a situação prática,e tem o directo de decisão final sobre a interpretação destes termos e condições.
					</span>
					<span>
						2.2 Orker só fornece serviço aos seus membros, e o último deverá fornecer qualquer outros equipamentos relacionado com o serviço.(e.i.celular, computador pessoal e qualquer outro relacionado dispositivos conectados à Internet ou à Web móvel ) juntamento todas as despesas(e.i.a conta de telefone, celucar ou banda largura de rede para acesso internet)
					</span>
					<span>
						2.3 Aqui a particularidade da rede, Orker não poderia garantir que o serviço de rede não será interrompido, e não faz promessas de pontualidade, segurança e precisão do serviço de rede. Usários entendem que Orker precisa de manter o serviço de rede  de forma regular ou aperiódica, ou examina e reparar os equipamentos relevantes. Se usário não puder acessar a internet quando nos fizermos esse trabalho, Orker não assumirá qualquer responsabilidade por isso. O Orker reserva o directo de manter, atualizar ou suspender todos ou parte dos serviços de rede no outro propósito sem aviso prévio.
					</span>
					<span>
						2.4 Usário expressamente concordou a assumir total o risco pela conta própria quando usar Orker. Usário entende e aceita que as informações, produtos e serviços que eles ganham pelo carregado ou serviço da plataforma em Orker são gravados automaticamente pelo Orker.
						
						Orker não será responsável pela sua legitimidade, e também não assume qualquer responsabilidade legal. Usário assume todos os riscos, e Orker não fornece garantias ou representações quanto à precisão, segurança, pontualidade dos serviços de internet, para atenter todos os requisitos dos usários.
						
						Orker não será responsável pela sua legitimidade, e também não assume qualquer responsabilidade legal. Os usuários assumem todos os riscos, e a Orker não oferece garantias ou representações quanto à precisão, segurança e oportunidade do serviço de internet, para atender também a todos os requisitos dos usuários.
					</span>
					<span>
						2.5 Orker tem o directo para modificar or terminar este serviço ( ou qualquer parte deles) terporariamente or permanentemente no qualquer momento, Orker não assume qualquer responsabilidade pelo usário ou qualquer pessoa terceira,independentemente do aviso ou não.
					</span>
					<span>
						2.6 você concordou a Orker baseado no consideração dos seus próprios intereses, pode nos seu exclusivo critério por qualquer motivo (incluindo, mas não limitado a você que violou esse disposição literalmente e no espírito) termina a sua senha, conta ou uso deste serviço (ou qualquer parte dos serviço), e remover e excluir as informações que você submete quando usa este serviço. Orker reserva o directo de restringir ou terminar ao qualquer acesso do usário ou usa serviço do Orker no qualquer momento sem qualquer aviso prévio. Você reconhece e concorda que Orker pode imediatamente encerrar ou excluir a sua conta e todos os informações relavantes na sua conta, ou proibir usário da continuar a usar o arquivo anterior ou este serviço. Alem disso, você concorda que Orker não tem obrigação para você ou qualquer parte terceiro se o uso deste serviço for interrupido ou terminado, ou o seu número de conta,informações e arquivos relacionados forem fechados ou excluiídos.
					</span>
				</p>
				<p>
					<span style={{ textAlign:'left' }}><b>3. A conta de membro e senha</b></span>
					<span>
						Usário deve cuidar a sua conta e senha propria após o registro. Também assumirá todos os deveres legais desta conta.
						
						Orker não será resposável para ataques de hacker ou descuidados de usário quando outros usam a conta ilegal. Por favor informe Orker imediatamente se encontrar qualquer ilegal ou qualquer vazamento de segurança da conta.
					</span>
				</p>
				<p>
					<span style={{ textAlign:'left' }}><b>4. Informações de registração e protecção privacidade</b></span>
					<span>
						4.1 o propriedade da conta de app pertence a Orker. Os usários ganham o directo de uso das contas de app após terminar o registro. Usários devem fornecer as  informações pessoais detalhadas e exactas oportuno, e atualizar constantemente. Todos os dados do tipo original serão servidos os dados registrados. Orker não é resposável pela questões legais e consequência que causados pela informações de  registrato falso que fornecido pelos usários.
					</span>
					<span>
						4.2 usários não devem transferir ou emprestar a sua conta, senha para outros. Usários devem notificar imediatamente a Orker se encontrar qualquer uso ilegal da sua conta pelo outros.
					</span>
					<span>
						4.3 Orker vai coletar a sua informações de identificação pessoal quando você registra a sua conta na plataforma da App, usa produtos e serviços da Orker, ou visita websites da Orker, e estes dados serão utilizados para melhorar os serviços e conteúdo da Web que serão fornecidos para você.
					</span>
					<span>
						4.4 Orker não vai divulgar as informações de registro dos usários ao público ou a parte terceiros, a menos que:
						Em concordância com os requisitos das leis relevantes e regulamentos.
						Obtendo a autorização clara dos usários antecipadamente.
						Para fornecer os seus produtos e serviços necessários somente depois de divulgar a sua informação pessoal.
						Para reivindicar o direito legal da Orker.
					</span>
				</p>
				<p>
					<span style={{ textAlign:'left' }}><b>5. directo do usário e resposabilidade</b></span>
					<span>
						individuais ou organizações podem aplicar para se tornarem os usários do Orker e usar os serviços sob este acordo que satisfaçam pelo menos umas das condições seguintes:
						5.1.1 18 anos de idade (ou como outra idade que a maioria é chegada no seu país) ou pedido; e pessoa natural que tenha a capacidade civil completa para conduta civil.
						5.1.2 As empresas, instituições, organizações sociais e outras organizações que estabelecem e existem legalmente de acordo com leis relavante e regulamentos.
					</span>
					<span>
						5.2 Os usuários terão o direito de usar os serviços da Internet fornecidos pela Orker de acordo com os procedimentos prescritos pela Orker. Se o usuário tiver alguma discrepância a este serviço, você pode contatar Orker para ser resolvido em tempo. 
					</span>
					<span>
						5.3 Os usuários devem fornecer informações pessoais precisas à Orker ao solicitar o uso do serviço de rede, e os usuários devem atualizar as informações pessoais a tempo se houver alguma mudança.
					</span>
					<span>
						5.4 Os usuários devem concordar em aceitar a Orker envia informações comerciais relacionadas aos seus membros por e-mail ou por outros meios.
					</span>
					<span>
						5.5 Os utilizadores devem respeitar as disposições das leis e regulamentos aplicáveis da República Popular da China ao utilizar o serviço Orker e não podem utilizar este serviço para quaisquer actividades ilegais ou impróprias.
					</span>
					<span>
						5.6 Você concorda em indenizar a Orker, suas cooperativas de parcerias e suas empresas associadas, por todas e quaisquer reivindicações, danos, perdas e causas de ação (incluindo honorários advocatícios e custas judiciais) Surgindo ou relacionados a sua violação destes termos.
						
						Se a Orker encontrar ou receber relatórios ou queixas de terceiros em violação do Acordo de Utilizador, a Orker tem o direito de eliminar o conteúdo relevante sem aviso prévio e, dependendo das circunstâncias do acto, incluir mas não se limitar à eliminação de alguns ou de todos os assinantes , Restrição ou proibição de usar todas ou parte das funções, penalidades para fechamento de conta e até mesmo cancelamento, e notar os resultados de processamento. Orker para a conta além das medidas de penalidade acima, a Orker tem o direito de cancelar a sua autenticação de identidade e, dependendo das circunstâncias, determinar o encerramento temporário ou permanente da certificação da conta relevante.
					</span>
					<span>
						5.7 Os usuários concordam em não reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do Serviço ou usar o Serviço para outros fins comerciais.
					</span>
					<span>
						5.8 Os usuários devem assumir a responsabilidade legal quando usam o serviço da Orker, incluindo mas não limitado a: pagar a compensação da vítima e pagar uma compensação igual à Orker, que paga a punição administrativa devido ao comportamento do usuário.
					</span>
				</p>
				<p>
					<span style={{ textAlign:'left' }}><b>6. Direito de propriedade intelectual</b></span>
					<span>
						6.1 No que diz respeito ao Conteúdo, incluindo mas não se limitando a caracteres, software, áudio, fotos, vídeo, gráficos, você reconhece e concorda que o Serviço e qualquer software necessário usado em conexão com o Serviço contêm informações proprietárias e confidenciais que estão protegidas pela propriedade intelectual aplicável e outras leis. Você também reconhece e concorda que o Conteúdo contido em anúncios patrocinados ou informações apresentadas a você através do Serviço ou anunciantes está protegido por direitos autorais, marcas registradas, marcas de serviço, patentes ou outros direitos e leis de propriedade. Exceto quando expressamente autorizado pela Orker ou detentores de direitos autorais, os usuários concordam em não modificar, alugar, arrendar, emprestar, vender, distribuir ou criar trabalhos derivados com base no Serviço ou no Software, no todo ou em parte ou criar um trabalho derivado.
					</span>
					<span>
						6.2 A Orker concede aos usuários um direito pessoal, não transferível e não exclusivo e uma licença para usar o código objeto do nosso Software em um único computador; desde que você não (e não permite qualquer parte terceiro) copiar, modificar, adaptar, criar uma obra derivada, de engenharia reversa, montagem reversa ou de outra forma tentar descobrir qualquer código-fonte, Vender, ceder, sublicenciar, conceder uma garantia real ou transferir qualquer direito no Software.
					</span>
					<span>
						6.3 Orker tem o direito de interface de anotação 'esta funcionalidade é fornecida pela Orker' e outras informações relacionadas com direitos autorais em toda a interface de função, que são fornecidos pela plataforma.
					</span>
				</p>
				<p>
					<span style={{ textAlign:'left' }}><b>7. Outros</b></span>
					<span>
						7.1 Por motivo de força maior ou outros eventos imprevistos, tornando impossível a implementação deste acordo, ambas as partes não serão responsáveis. O termo ´força maior´ designa a condição objectiva que não poderia ser previsível, inevitável e intransponível, incluindo mas não limitado a guerra, tufão, inundação, incêndio, raio ou terremoto, greves, tumultos, vírus da doença legal, ataques de hackers, software ou falha na linha de comunicação ou mau funcionamento, departamento de telecomunicações controle técnico, ação governamental ou qualquer outro desastre natural ou causado pelo homem, etc.
					</span>
					<span>
						7.2 Esta cláusula e a validade, a implementação da revisão, e todas as matérias relevantes serão limitadas pelas leis da República Popular da China, qualquer disputa é apenas usar a lei da República Popular da China.
					</span>
					<span>
						7.3 As partes irão tentar resolver qualquer reclamação, ou disputa ou controvérsia decorrentes dos termos e condições entre o usuário e a empresa, através de negociação amigável. Se as partes não conseguirem resolver o litígio através de negociações, a disputa estará sob a jurisdição do tribunal popular no local onde Orker está localizado.
					</span>
					<span>
						7.4 Os usuários enviam as informações necessárias para o processo de registro corretamente,ler e entender este acordo, e então este acordo é estabelecido e entrada em vigor.
					</span>
					<span>
						7.5 Os usuários que se registraram antes da validade deste contrato só precisam usar o nome de usuário original e a senha para entrar no site Orker para aceitar e confirmar este acordo, Então você pode continuar a usar o serviço da plataforma App.
					</span>
					<span>
						7.6 Validade de acordo: do usuário concorda com este acordo ou usa Orker até os usuários cancelar serviço do Orker.
					</span>
					<span>
						7.7 Se não houver disposições especiais deste acordo, ambas as partes devem entrar em contato em assuntos relacionados a este acordo via E-mail.
					</span>
					<span>
						7.8 A caixa de Email dos departmentos competentes da Orker está sujeita à indicação no site da Orker.
					</span>
					<span>
						7.9 O uso do Orker indica que você aceita o contrato de serviço da Orker e todos os seus anexos.
					</span>
					<span>
						7.10 Nossa empresa possui a interpretação final deste acordo.
					</span>
				</p>
			</div>
		);
	}
}
