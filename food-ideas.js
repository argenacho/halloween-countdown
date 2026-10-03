'use strict';

// Own party photos and original licensed photographs of finished Halloween food and themed drinks.
const FOOD_IDEAS = [
  {
    "id": "huevos-arana",
    "title": "Huevos de araña",
    "category": "salado",
    "description": "Huevos rellenos con una mezcla verde cremosa y arañas de aceitunas negras. El cuerpo y las patas de cada araña convierten la bandeja en una invasión lista para picar.",
    "tip": "Llevalos refrigerados hasta servir",
    "alt": "Huevos rellenos decorados con arañas de aceitunas negras sobre un plato",
    "image": "assets/food/casa199-huevos-arana.jpg",
    "credit": {
      "kind": "party",
      "author": "Casa 199"
    }
  },
  {
    "id": "mano-jamon",
    "title": "Mano con piel de jamón",
    "category": "salado",
    "description": "Una picada macabra con una mano cubierta de fetas de jamón crudo, dedos bien marcados y tostadas y cubos de queso alrededor. Una pieza para poner en el centro del banquete.",
    "tip": "Traé las tostadas y el queso para acompañar",
    "alt": "Picada con una mano cubierta de jamón crudo, tostadas y cubos de queso",
    "image": "assets/food/casa199-mano-jamon.jpg",
    "credit": {
      "kind": "party",
      "author": "Casa 199"
    }
  },
  {
    "id": "salchichas-momia",
    "title": "Salchichas momia",
    "category": "salado",
    "description": "Salchichas envueltas en tiras finas de masa que parecen vendas, con ojos que asoman entre ellas. Cada momia tiene su propia expresión, como las que trajeron a nuestras fiestas.",
    "tip": "Traelas horneadas y con las salsas aparte",
    "alt": "Cinco salchichas envueltas en tiras de masa y decoradas con ojos de momia",
    "image": "assets/food/casa199-salchichas-momia.jpg",
    "credit": {
      "kind": "party",
      "author": "Casa 199"
    }
  },
  {
    "id": "vomito-guacamole",
    "title": "Vómito de guacamole",
    "category": "salado",
    "description": "Una calabaza tallada que parece vomitar guacamole sobre una bandeja de nachos y chips. Un centro de mesa de Halloween que también se comparte a mordiscos.",
    "tip": "Llevá los chips aparte para que sigan crocantes",
    "alt": "Calabaza de Halloween tallada que parece vomitar guacamole sobre una bandeja con nachos y chips",
    "image": "assets/food/casa199-vomito-guacamole.jpg",
    "credit": {
      "kind": "party",
      "author": "Casa 199"
    }
  },
  {
    "id": "cupcakes-fantasma",
    "title": "Cupcakes fantasma",
    "category": "dulce",
    "description": "Magdalenas de vainilla o chocolate con cobertura blanca y pequeños fantasmas de merengue o fondant. Una porción individual para cada alma que cruce el portal.",
    "tip": "Se llevan listos para servir",
    "alt": "Cupcakes con cobertura blanca y pequeños fantasmas",
    "image": "assets/food/cupcakes-fantasma.jpg",
    "credit": {
      "author": "Kgbo",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Halloween_cupcakes,_Brisbane,_2023,_01.jpg",
      "originalTitle": "File:Halloween cupcakes, Brisbane, 2023, 01.jpg"
    }
  },
  {
    "id": "onigiri-fantasma",
    "title": "Onigiri fantasma",
    "category": "salado",
    "description": "Bolitas de arroz rellenas de hongos con forma de fantasma. El de la foto asoma entre hojas verdes y tiene ojos, boca y mejillas: una aparición salada que se come de un bocado.",
    "tip": "Prepará unidades pequeñas para compartir",
    "alt": "Onigiri blanco con forma de fantasma junto a un pimiento calabaza",
    "image": "assets/food/halloween-bento-fantasma.jpg",
    "credit": {
      "author": "gamene",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Ghost_onigiri_bento_(4039012309).jpg",
      "originalTitle": "File:Ghost onigiri bento (4039012309).jpg"
    }
  },
  {
    "id": "galletas-embrujadas",
    "title": "Galletas del aquelarre",
    "category": "dulce",
    "description": "Galletitas de manteca decoradas como gatos negros, calaveras, ojos y dedos de bruja. Combiná chocolate y glasé para armar una bandeja tan rica como inquietante.",
    "tip": "Fáciles de repartir",
    "alt": "Bandeja de galletas decoradas como gatos, calaveras y dedos",
    "image": "assets/food/galletas-embrujadas.jpg",
    "credit": {
      "author": "Joseolgon",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Halloween_food_2015_(3).JPG",
      "originalTitle": "File:Halloween food 2015 (3).JPG"
    }
  },
  {
    "id": "ponche-ojos",
    "title": "Ponche de ojos flotantes",
    "category": "bebida",
    "description": "Una jarra de jugo cítrico o frutos rojos con ojos hechos de gomitas o frutas. El efecto terrorífico está en los detalles; también podés prepararlo sin alcohol.",
    "tip": "Traé una jarra y vasos",
    "alt": "Ponche con decoraciones de ojos flotando en un recipiente",
    "image": "assets/food/ponche-ojos.jpg",
    "credit": {
      "author": "Bart Everson",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Eyeball_Punch.jpg",
      "originalTitle": "File:Eyeball Punch.jpg"
    }
  },
  {
    "id": "huevos-fantasma",
    "title": "Huevos fantasma",
    "category": "salado",
    "description": "Huevos duros con ojos y boca de alga nori, como el fantasma de la parte superior de este bento de Halloween. Un corte en la base ayuda a que queden de pie en la bandeja.",
    "tip": "Llevalos refrigerados hasta servir",
    "alt": "Bento de Halloween con un huevo fantasma, muffin araña y rollitos",
    "image": "assets/food/halloween-bento-arana.jpg",
    "credit": {
      "author": "gamene",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Spider_muffin_bento_(4051218539).jpg",
      "originalTitle": "File:Spider muffin bento (4051218539).jpg"
    }
  },
  {
    "id": "galletas-dentadura",
    "title": "Galletas de dentadura monstruosa",
    "category": "dulce",
    "description": "Galletitas con bocas rojas, dientes blancos de malvavisco y ojos de colores, como los pequeños monstruos de la foto. Cada una puede llevar cuernos, cejas o colmillos distintos.",
    "tip": "Llevalas armadas en una bandeja",
    "alt": "Galletas de monstruos decoradas con grandes dentaduras, ojos y cuernos de colores",
    "image": "assets/food/halloween-galletas-dentadura.jpg",
    "credit": {
      "author": "Lindsey T",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Day_302_Little_Monsters.jpg",
      "originalTitle": "File:Day 302 Little Monsters.jpg"
    }
  },
  {
    "id": "pocion-caldero",
    "title": "Poción verde del caldero",
    "category": "bebida",
    "description": "Un cóctel cítrico verde presentado en un pequeño caldero, como el de la foto. La niebla sirve como referencia de ambientación para un brindis del Otro Lado.",
    "tip": "Traé la bebida lista; la niebla es una referencia visual",
    "alt": "Cóctel verde en un pequeño caldero rodeado de niebla",
    "image": "assets/food/halloween-pocion-caldero.jpg",
    "credit": {
      "author": "Sumit Surai",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Goblet_of_Fire_Cocktail.jpg",
      "originalTitle": "File:Goblet of Fire Cocktail.jpg"
    }
  },
  {
    "id": "muffins-monstruos",
    "title": "Muffins de monstruos",
    "category": "dulce",
    "description": "Muffins con cobertura verde o naranja, caras de calabaza, colmillos y cicatrices de chocolate. Cada uno puede ser un personaje distinto del banquete.",
    "tip": "Se llevan listos para servir",
    "alt": "Muffins decorados con caras de calabaza y monstruos",
    "image": "assets/food/muffins-monstruos.jpg",
    "credit": {
      "author": "Joseolgon",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Halloween_food_2015_(1).JPG",
      "originalTitle": "File:Halloween food 2015 (1).JPG"
    }
  },
  {
    "id": "dedos-bruja",
    "title": "Dedos de bruja",
    "category": "dulce",
    "description": "Galletitas alargadas con una almendra como uña y mermelada roja para simular sangre. Marcales los nudillos antes de hornear y armá una bandeja de manos espeluznantes.",
    "tip": "Se transportan en una caja o bandeja",
    "alt": "Galletitas con forma de dedos y uñas oscuras",
    "image": "assets/food/dedos-bruja.jpg",
    "credit": {
      "author": "Infrogmation of New Orleans",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Zombie_Fingers_Halloween.jpg",
      "originalTitle": "File:Zombie Fingers Halloween.jpg"
    }
  },
  {
    "id": "torta-cementerio",
    "title": "Torta del cementerio",
    "category": "dulce",
    "description": "Una torta de chocolate convertida en cementerio: lápidas de galletita, tierra de cacao, huesos y calaveras. La foto muestra el resultado decorado, listo para abrir el banquete del Otro Lado.",
    "tip": "Traela cortada y con una espátula",
    "alt": "Torta de Halloween con lápidas, calaveras y decoraciones de cementerio",
    "image": "assets/food/halloween-torta-cementerio.jpg",
    "credit": {
      "author": "Infrogmation of New Orleans",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Graveyard_Cake_Halloween.jpg",
      "originalTitle": "File:Graveyard Cake Halloween.jpg"
    }
  },
  {
    "id": "merengues-fantasma",
    "title": "Fantasmas de merengue",
    "category": "dulce",
    "description": "Merengues blancos con forma de fantasma y ojos y boca de chocolate, como los de la foto. Crocantes por fuera y livianos, son pequeñas apariciones listas para compartir.",
    "tip": "Guardalos en un recipiente seco",
    "alt": "Dos merengues blancos decorados como fantasmas con ojos y boca",
    "image": "assets/food/halloween-merengues-fantasma.jpg",
    "credit": {
      "author": "Marinna",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Merenguitos_Halloween.jpg",
      "originalTitle": "File:Merenguitos Halloween.jpg"
    }
  },
  {
    "id": "pretzels-monstruo",
    "title": "Pretzels de monstruos",
    "category": "dulce",
    "description": "Pretzels bañados en chocolate y cubiertos con ojos de azúcar. Cada uno queda con una cara distinta, como esta bandeja de pequeños monstruos de Halloween.",
    "tip": "Una opción dulce y crocante",
    "alt": "Pretzels bañados en chocolate y decorados con ojos de azúcar",
    "image": "assets/food/halloween-pretzels-monstruo.jpg",
    "credit": {
      "author": "HeatherMarieKosur",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Spooky_Chocolate_Covered_Pretzels.jpg",
      "originalTitle": "File:Spooky Chocolate Covered Pretzels.jpg"
    }
  },
  {
    "id": "cheesecake-halloween",
    "title": "Cheesecake de la noche maldita",
    "category": "dulce",
    "description": "Un cheesecake decorado con calabazas naranjas, pequeños cráneos verdes y personajes espectrales, como el de la foto. Una torta cremosa con una procesión de monstruos sobre la cobertura.",
    "tip": "Llevalo refrigerado y cortá porciones al servir",
    "alt": "Cheesecake decorado con cráneos, calabazas y personajes de Halloween",
    "image": "assets/food/halloween-cheesecake-halloween.jpg",
    "credit": {
      "author": "dave g",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Cheesecake_for_Halloween.jpg",
      "originalTitle": "File:Cheesecake for Halloween.jpg"
    }
  },
  {
    "id": "donas-monstruo",
    "title": "Donas araña",
    "category": "dulce",
    "description": "Donas glaseadas con un cuerpo de chocolate en el centro y patitas dibujadas sobre la cobertura. Sumales ojos blancos para que cada dona parezca una araña lista para escapar.",
    "tip": "Una dona por invitado",
    "alt": "Dona de Halloween decorada como una araña",
    "image": "assets/food/donas-monstruo.jpg",
    "credit": {
      "author": "Unrefined Gasoline",
      "license": "CC0",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "source": "https://commons.wikimedia.org/wiki/File:Dunkin_Donuts_2024_Halloween_Spider_Donut.jpg",
      "originalTitle": "File:Dunkin Donuts 2024 Halloween Spider Donut.jpg"
    }
  },
  {
    "id": "pastel-pies",
    "title": "Pastel de carne de pies macabros",
    "category": "salado",
    "description": "Pastel de carne moldeado como dos pies, con uñas de cebolla y una terminación roja de salsa de tomate. La foto muestra una preparación de Halloween que parece recién escapada del laboratorio.",
    "tip": "Cortá porciones pequeñas para compartir",
    "alt": "Pastel de carne con forma de dos pies humanos y salsa roja",
    "image": "assets/food/halloween-pastel-pies.jpg",
    "credit": {
      "author": "Christopher Chapman",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Feetloaf!_it%27s_what%27s_for_dinner!.jpg",
      "originalTitle": "File:Feetloaf! it's what's for dinner!.jpg"
    }
  },
  {
    "id": "pimientos-monstruo",
    "title": "Mini pimientos calabaza",
    "category": "salado",
    "description": "Mini pimientos anaranjados tallados con ojos y sonrisa de calabaza. En la foto acompañan al fantasma de arroz; podés rellenarlos con queso crema o hummus para servirlos como bocados fríos.",
    "tip": "Traelos rellenos y refrigerados",
    "alt": "Mini pimiento tallado como una calabaza en un bento de Halloween",
    "image": "assets/food/halloween-bento-fantasma.jpg",
    "credit": {
      "author": "gamene",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Ghost_onigiri_bento_(4039012309).jpg",
      "originalTitle": "File:Ghost onigiri bento (4039012309).jpg"
    }
  },
  {
    "id": "onigiri-gato",
    "title": "Onigiri de gato embrujado",
    "category": "salado",
    "description": "Arroz relleno de salmón, cubierto con una fina capa de huevo violeta y decorado con queso y nori. El gato de Halloween de la foto tiene orejas puntiagudas y una mirada que vigila el banquete.",
    "tip": "Podés adaptar el relleno a una opción vegetal",
    "alt": "Bento de Halloween con un gato violeta de arroz, pimientos calabaza y huevos BOO",
    "image": "assets/food/halloween-bento-gato.jpg",
    "credit": {
      "author": "gamene",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Spooky_cat_onigiri_bento_(4054741302).jpg",
      "originalTitle": "File:Spooky cat onigiri bento (4054741302).jpg"
    }
  },
  {
    "id": "arroz-telarana",
    "title": "Arroz con telaraña",
    "category": "salado",
    "description": "Una capa de arroz sobre tofu condimentado, con una telaraña recortada en alga nori. La foto muestra cómo queda terminado; usá arañas comestibles para decorar la bandeja.",
    "tip": "Servilo en porciones individuales",
    "alt": "Bento con una telaraña de nori sobre arroz y verduras de colores",
    "image": "assets/food/halloween-arroz-telarana.jpg",
    "credit": {
      "author": "gamene",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Spider_web_bento_(4037858009).jpg",
      "originalTitle": "File:Spider web bento (4037858009).jpg"
    }
  },
  {
    "id": "muffins-arana",
    "title": "Muffins salados de araña",
    "category": "salado",
    "description": "Muffins de maíz y jalapeño con una araña de nori sobre la superficie. El de la foto ocupa el frente del bento: amarillo intenso, patas oscuras y un toque picante para espantar a los distraídos.",
    "tip": "Avisá si la preparación es picante",
    "alt": "Muffin salado amarillo decorado con una araña, acompañado de un huevo fantasma",
    "image": "assets/food/halloween-bento-arana.jpg",
    "credit": {
      "author": "gamene",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Spider_muffin_bento_(4051218539).jpg",
      "originalTitle": "File:Spider muffin bento (4051218539).jpg"
    }
  },
  {
    "id": "huevos-boo",
    "title": "Huevitos BOO",
    "category": "salado",
    "description": "Huevos de codorniz con letras de nori que forman BOO, como los que acompañan al gato violeta en la foto. Sumales pequeñas caras de fantasma para completar una bandeja llena de sustos.",
    "tip": "Mantenelos fríos hasta servir",
    "alt": "Huevos pequeños decorados con las letras BOO dentro de un bento de Halloween",
    "image": "assets/food/halloween-bento-gato.jpg",
    "credit": {
      "author": "gamene",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Spooky_cat_onigiri_bento_(4054741302).jpg",
      "originalTitle": "File:Spooky cat onigiri bento (4054741302).jpg"
    }
  },
  {
    "id": "hamburguesas-murcielago",
    "title": "Mini hamburguesas de murciélago",
    "category": "salado",
    "description": "Mini hamburguesas de Halloween con detalles negros y banderines de murciélago, como las de la foto. Hacelas pequeñas para compartir y separá las salsas hasta la hora de servir.",
    "tip": "Una mini hamburguesa por porción",
    "alt": "Mini hamburguesas de Halloween decoradas con murciélagos negros",
    "image": "assets/food/halloween-hamburguesas-murcielago.jpg",
    "credit": {
      "author": "Peachyeung316",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Shapes_Halloween_Mini_Hamburger_at_HKCEC.jpg",
      "originalTitle": "File:Shapes Halloween Mini Hamburger at HKCEC.jpg"
    }
  },
  {
    "id": "sandwiches-ataud",
    "title": "Sándwiches de ataúd",
    "category": "salado",
    "description": "Sándwiches de pan cortado como ataúdes, con una cruz de queso en la tapa. En el buffet de la foto forman parte de una mesa de Halloween con calabazas, monstruos y otros bocados macabros.",
    "tip": "Podés preparar distintos rellenos",
    "alt": "Buffet de Halloween con sándwiches de ataúd y platos decorados",
    "image": "assets/food/halloween-sandwiches-ataud.jpg",
    "credit": {
      "author": "kinwart",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Food_Halloween_party_(3024302438).jpg",
      "originalTitle": "File:Food Halloween party (3024302438).jpg"
    }
  },
  {
    "id": "shot-cerebro-sangriento",
    "title": "Shots de cerebro sangriento",
    "category": "bebida",
    "description": "El clásico Brain Hemorrhage: licor de durazno, crema irlandesa y granadina. La crema forma el cerebro y el jarabe rojo completa el efecto macabro que se ve en estos vasos.",
    "tip": "Contiene alcohol · serví porciones pequeñas",
    "alt": "Dos shots con una formación blanca similar a cerebros y granadina roja",
    "image": "assets/food/halloween-shot-cerebro-sangriento.jpg",
    "credit": {
      "author": "Grant Mitchell (Grant Mitchell)",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:P1020647_(brain_haemorrhage).jpg",
      "originalTitle": "File:P1020647 (brain haemorrhage).jpg"
    }
  },
  {
    "id": "cerebro-laboratorio",
    "title": "Cerebro del laboratorio",
    "category": "bebida",
    "description": "Un Monkey Brain con vodka, crema irlandesa, lima y granadina. El resultado de la foto parece un cerebro flotando en líquido rojo: perfecto para un brindis de laboratorio.",
    "tip": "Contiene alcohol · traé vasos pequeños",
    "alt": "Cóctel rojo con una formación cremosa que parece un cerebro flotante",
    "image": "assets/food/halloween-cerebro-laboratorio.jpg",
    "credit": {
      "author": "VivaLaPinateria",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Monkeybrain.jpg",
      "originalTitle": "File:Monkeybrain.jpg"
    }
  },
  {
    "id": "zombie-calavera",
    "title": "Zombie en calavera",
    "category": "bebida",
    "description": "Un cóctel de ron y frutas tropicales servido en un vaso con forma de calavera. La foto muestra la presentación del Zombie: un cráneo lleno de una pócima anaranjada.",
    "tip": "Contiene alcohol · preparalo en una jarra para repartir",
    "alt": "Cóctel Zombie anaranjado servido en un vaso de calavera",
    "image": "assets/food/halloween-zombie-calavera.jpg",
    "credit": {
      "author": "Pitel",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:ZombieCocktail.jpg",
      "originalTitle": "File:ZombieCocktail.jpg"
    }
  },
  {
    "id": "cerebro-vampiro",
    "title": "Cerebro de vampiro",
    "category": "bebida",
    "description": "El cóctel Cervelle de Singe mezcla vodka, crema irlandesa y granadina. La foto muestra un cerebro pálido suspendido en una bebida roja intensa, listo para servir como un pequeño espécimen.",
    "tip": "Contiene alcohol · serví en vasos transparentes",
    "alt": "Shot rojo con una formación blanca similar a un cerebro",
    "image": "assets/food/halloween-cerebro-vampiro.jpg",
    "credit": {
      "author": "Irkizar",
      "license": "Public domain",
      "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Copyright_tags#Public_domain",
      "source": "https://commons.wikimedia.org/wiki/File:Cervelle_de_Singe_(Cocktail).jpg",
      "originalTitle": "File:Cervelle de Singe (Cocktail).jpg"
    }
  },
  {
    "id": "ponche-tropical-ojos",
    "title": "Ponche tropical de ojos",
    "category": "bebida",
    "description": "Una variante del ponche de la foto, con jugo de ananá y naranja. Conservá los ojos comestibles flotantes y servilo en un bol transparente para mostrar la decoración terminada.",
    "tip": "Sin alcohol · traé un cucharón y vasos",
    "alt": "Ponche de Halloween con ojos comestibles flotando",
    "image": "assets/food/ponche-ojos.jpg",
    "credit": {
      "author": "Bart Everson",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Eyeball_Punch.jpg",
      "originalTitle": "File:Eyeball Punch.jpg"
    },
    "photoNote": "Referencia de decoración: ponche de ojos. Variante tropical."
  },
  {
    "id": "pocion-azul",
    "title": "Poción azul del Otro Lado",
    "category": "bebida",
    "description": "Una bebida azul cítrica con hielo, presentada como una pócima humeante. La foto muestra el efecto de niebla sobre el vaso; para llevar a la fiesta, prepará el mocktail azul listo para servir.",
    "tip": "Sin alcohol · el efecto de niebla es solo una referencia visual",
    "alt": "Bebida azul con hielo y una densa niebla que sale del vaso",
    "image": "assets/food/halloween-pocion-azul.jpg",
    "credit": {
      "author": "Nina Ladygina-Glazounova",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Solid_form_of_carbon_dioxide_in_a_drink.jpg",
      "originalTitle": "File:Solid form of carbon dioxide in a drink.jpg"
    }
  },
  {
    "id": "elixir-calavera",
    "title": "Elixir de calavera sin alcohol",
    "category": "bebida",
    "description": "Una variante sin alcohol del Zombie de la foto: jugos de naranja y ananá con ginger ale, servidos en un vaso de calavera. El recipiente convierte el brindis en una escena de Halloween.",
    "tip": "Sin alcohol · traé vasos de calavera reutilizables",
    "alt": "Bebida anaranjada servida en un vaso con forma de calavera",
    "image": "assets/food/halloween-zombie-calavera.jpg",
    "credit": {
      "author": "Pitel",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:ZombieCocktail.jpg",
      "originalTitle": "File:ZombieCocktail.jpg"
    },
    "photoNote": "Referencia de presentación: Zombie en calavera. Variante sin alcohol."
  },
  {
    "id": "cerebro-gelatina",
    "title": "Cerebros de gelatina sin alcohol",
    "category": "bebida",
    "description": "Una variante sin alcohol inspirada en el cerebro de la foto: jugo rojo con pequeños cerebros de gelatina blanca o de coco. Preparalos en moldes y servilos dentro de vasos transparentes.",
    "tip": "Sin alcohol · llevalo refrigerado",
    "alt": "Shot rojo con una formación blanca similar a un cerebro, como referencia de presentación",
    "image": "assets/food/halloween-cerebro-vampiro.jpg",
    "credit": {
      "author": "Irkizar",
      "license": "Public domain",
      "licenseUrl": "https://commons.wikimedia.org/wiki/Commons:Copyright_tags#Public_domain",
      "source": "https://commons.wikimedia.org/wiki/File:Cervelle_de_Singe_(Cocktail).jpg",
      "originalTitle": "File:Cervelle de Singe (Cocktail).jpg"
    },
    "photoNote": "Referencia de presentación: cóctel cerebral. Variante de gelatina sin alcohol."
  }
];
