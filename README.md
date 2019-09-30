
# SGTA - SISTEMA DE GERENCIAMENTO DE TRÁFEGO AÉREO

O Objetivo é criar um sistema que permita ao usuário realizar as seguintes ações:

  - Adicionar e remover aeronaves, que serão exibidas no mapa.
  - Cada aeronave terá uma rota própria, que será exibida no mapa, de acordo com os dados informados no formulário.
  - As aeronaves se moverão da origem até o destino, desde o momento em que foram inseridas até o tempo limite especificado no formulário.

Futuramente pretende-se exibir as diferentes posições do circuito de tráfego [VFR](https://pt.wikipedia.org/wiki/Regras_de_voo_visual) e também os procedimentos [IFR](https://pt.wikipedia.org/wiki/IFR_%28avia%C3%A7%C3%A3o%29) das duas cabeceiras de SBHT.

## O form
O processo de inserção de aeronaves no sistema começa pelo form contido na página inicial (index.html)

Imagem do form: http://i.ibb.co/74mhvvG/form.png

Para acesso ao form basta clicar no botão + ou digitar qualquer coisa

**Indicativo:** é a matrícula da aeronave, geralmente composto de 5 caracteres, com comprimento máximo de 7 caracteres. Exemplos:

 - PTABC *ou* PT-ABC (o traço será ignorado)
 - GOL1234
 - FAB01
 - AGUIA01

**Hora:** Deve ser informa com quatro dígitos, sem ":" 


 - É a hora estimada de chegada da aeronave, caso o destino seja SBHT (Altamira)
 - Caso a origem seja SBHT, é a hora prevista para decolagem
 - É a hora  estimada de chegada da aeronave, caso o destino seja SJJJ (Aeroxingu)  mas a origem NÃO seja SBHT,  pois caso a origem seja SBHT, é a hora prevista para decolagem. 
 - Caso a origem seja SJJJ, e o destino NÃOseja SBHT é a hora prevista para decolagem. 
 - Caso não o destino e a origem não sejam SBHT, é o estimado para o través de SBHT,

**Origem/Destino:** É composto de 4 caracteres, a relação completa de aeródromos públicos e privados está disponível no arquivo [aerodromos.csv](https://github.com/elenderg/SGTA/blob/master/aerodromos.csv).
