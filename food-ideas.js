'use strict';

// Original Wikimedia Commons photos; each card includes its author, source and reuse license.
const FOOD_IDEAS = [
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
    "id": "pizza-oscura",
    "title": "Pizza del Upside Down",
    "category": "salado",
    "description": "Una pizza de masa oscura, con queso y toppings de colores intensos. Podés armar arañas de aceitunas o figuras de monstruos para completar la temática.",
    "tip": "Cortala en porciones para compartir",
    "alt": "Pizza de masa negra con queso y toppings anaranjados",
    "image": "assets/food/pizza-oscura.jpg",
    "credit": {
      "author": "Peachyeung316",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:The_Halloween_pizza_at_PHD.jpg",
      "originalTitle": "File:The Halloween pizza at PHD.jpg"
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
    "id": "huevos-monstruo",
    "title": "Huevos monstruosos",
    "category": "salado",
    "description": "Huevos rellenos con una mezcla cremosa. Para darles el toque Halloween, agregales ojos de aceituna o arañas negras; la foto muestra la base que podés decorar.",
    "tip": "Llevalos refrigerados hasta servir",
    "alt": "Huevos rellenos decorados con hierbas, como base para la idea",
    "image": "assets/food/huevos-monstruo.jpg",
    "credit": {
      "author": "Robert Loescher",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Deviled_Eggs_topped_with_Scallions.JPG",
      "originalTitle": "File:Deviled Eggs topped with Scallions.JPG"
    }
  },
  {
    "id": "manzanas-hechizadas",
    "title": "Manzanas hechizadas",
    "category": "dulce",
    "description": "Manzanas bañadas en caramelo o chocolate de colores, con gomitas de gusanos y granas. Una versión del clásico dulce de Halloween que se come con palito.",
    "tip": "Una manzana por porción",
    "alt": "Manzanas cubiertas de caramelo de colores y gomitas",
    "image": "assets/food/manzanas-hechizadas.jpg",
    "credit": {
      "author": "RichardBH from Hamilton, Canada",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Candy_Apple_(5819333319).jpg",
      "originalTitle": "File:Candy Apple (5819333319).jpg"
    }
  },
  {
    "id": "pocion-cementerio",
    "title": "Poción del cementerio",
    "category": "bebida",
    "description": "Una bebida cremosa de cacao o café, con helado y migas de galletitas que parezcan tierra. Armala en vasos individuales y sumale una decoración fantasmal.",
    "tip": "Podés hacerla sin alcohol",
    "alt": "Bebida cremosa con helado y migas de chocolate",
    "image": "assets/food/pocion-cementerio.jpg",
    "credit": {
      "author": "Silar",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:020221030_124744_Ghost_in_the_Graveyard_drink.jpg",
      "originalTitle": "File:020221030 124744 Ghost in the Graveyard drink.jpg"
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
    "id": "brownies-cementerio",
    "title": "Brownies del cementerio",
    "category": "dulce",
    "description": "Convertí estos cuadrados de chocolate en pequeñas tumbas: una galletita como lápida, migas como tierra y alguna gomita de gusano. La foto muestra brownies servidos con helado como punto de partida.",
    "tip": "Cortalos en cuadrados individuales",
    "alt": "Brownies de chocolate servidos en recipientes con helado",
    "image": "assets/food/brownies-cementerio.jpg",
    "credit": {
      "author": "Dr. Chinchu C.",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Brownies_with_Ice_cream.jpg",
      "originalTitle": "File:Brownies with Ice cream.jpg"
    }
  },
  {
    "id": "merengues-fantasma",
    "title": "Fantasmas de merengue",
    "category": "dulce",
    "description": "Usá merengues blancos como base para pequeños fantasmas. Dales una punta alta y dibujales ojos y boca con chocolate una vez fríos: livianos, crocantes y bastante inquietantes.",
    "tip": "Guardalos en un recipiente seco",
    "alt": "Merengues blancos pequeños",
    "image": "assets/food/merengues-fantasma.jpg",
    "credit": {
      "author": "Benjamin Ikuta",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Meringue_cookies.jpg",
      "originalTitle": "File:Meringue cookies.jpg"
    }
  },
  {
    "id": "trufas-arana",
    "title": "Trufas araña",
    "category": "dulce",
    "description": "Hacé bolitas de chocolate y sumales patitas de pretzel o chocolate, con dos ojos de glasé. La foto muestra trufas como punto de partida para una invasión de arañas dulces.",
    "tip": "Llevalas en pirotines pequeños",
    "alt": "Trufas de chocolate cubiertas con cacao y frutos secos",
    "image": "assets/food/trufas-arana.jpg",
    "credit": {
      "author": "David Leggett",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Truffles_with_nuts_and_chocolate_dusting_in_detail.jpg",
      "originalTitle": "File:Truffles with nuts and chocolate dusting in detail.jpg"
    }
  },
  {
    "id": "tarta-calabaza",
    "title": "Tarta de calabaza embrujada",
    "category": "dulce",
    "description": "Una tarta de calabaza con canela y especias, perfecta para el otoño de Hawkins. Sobre esta base podés dibujar una telaraña de crema o una cara de calabaza con chocolate.",
    "tip": "Traela cortada y con una espátula",
    "alt": "Tarta de calabaza con borde de masa",
    "image": "assets/food/tarta-calabaza.jpg",
    "credit": {
      "author": "DrKathyShaginaw",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Pumpkin_Pie_with_Cinnamon_Crust.jpg",
      "originalTitle": "File:Pumpkin Pie with Cinnamon Crust.jpg"
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
    "id": "salchichas-momia",
    "title": "Salchichas momia",
    "category": "salado",
    "description": "Partí de salchichas envueltas en masa, como las de la foto, y cortá la masa en tiras para simular vendas. Dejá un hueco para dos ojos de mostaza y servilas con ketchup rojo.",
    "tip": "Traé una salsa aparte",
    "alt": "Salchichas pequeñas envueltas en masa horneada",
    "image": "assets/food/salchichas-momia.jpg",
    "credit": {
      "author": "Photo credit: stef yau",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:American_pigs_in_blankets.jpg",
      "originalTitle": "File:American pigs in blankets.jpg"
    }
  },
  {
    "id": "pimientos-monstruo",
    "title": "Pimientos poseídos",
    "category": "salado",
    "description": "Pimientos rellenos de arroz, quinoa o verduras. Antes de rellenarlos, tallales ojos y una boca de monstruo; la foto muestra la base de esta versión vegetariana del banquete.",
    "tip": "Elegí pimientos chicos para compartir",
    "alt": "Pimientos rellenos con quinoa y verduras",
    "image": "assets/food/pimientos-monstruo.jpg",
    "credit": {
      "author": "Mark Bonica",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Quinoa_stuffed_peppers.jpg",
      "originalTitle": "File:Quinoa stuffed peppers.jpg"
    }
  },
  {
    "id": "guacamole-pantano",
    "title": "Guacamole del pantano",
    "category": "salado",
    "description": "Un dip verde para el pantano del Otro Lado. Decorá el guacamole con ojos de aceituna, arañas y triángulos de tortilla como lápidas; la foto muestra el dip con sus nachos.",
    "tip": "Traé los nachos en una bolsa aparte",
    "alt": "Guacamole verde acompañado de chips de tortilla",
    "image": "assets/food/guacamole-pantano.jpg",
    "credit": {
      "author": "Missvain",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Guacamole_and_chips_-_Stierch.jpg",
      "originalTitle": "File:Guacamole and chips - Stierch.jpg"
    }
  },
  {
    "id": "hummus-calabaza",
    "title": "Hummus del aquelarre",
    "category": "salado",
    "description": "Usá este hummus como base, sumale calabaza asada para darle color naranja y dibujá una cara con aceitunas. Acompañalo con bastones de verduras y pan pita para picar entre hechizos.",
    "tip": "Una opción vegetal para compartir",
    "alt": "Hummus servido en un plato con guarniciones",
    "image": "assets/food/hummus-calabaza.jpg",
    "credit": {
      "author": "Beyrouthhh at English Wikipedia",
      "license": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
      "source": "https://commons.wikimedia.org/wiki/File:Lebanese_style_hummus.jpg",
      "originalTitle": "File:Lebanese style hummus.jpg"
    }
  },
  {
    "id": "nachos-cementerio",
    "title": "Nachos del cementerio",
    "category": "salado",
    "description": "Armá una fuente con queso, salsa roja y nachos. Plantá algunos triángulos como lápidas y sumá arañas de aceitunas; la foto muestra la base antes de darle el toque de cementerio.",
    "tip": "Llevá el queso y las salsas por separado",
    "alt": "Nachos con queso fundido y jalapeños",
    "image": "assets/food/nachos-cementerio.jpg",
    "credit": {
      "author": "روتانا",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Nachos_with_Melted_Cheese,_Jalapenos,_and_Tasty_Toppings.jpg",
      "originalTitle": "File:Nachos with Melted Cheese, Jalapenos, and Tasty Toppings.jpg"
    }
  },
  {
    "id": "pasta-tentaculos",
    "title": "Tentáculos del Otro Lado",
    "category": "salado",
    "description": "Pasta negra con una salsa roja intensa para evocar los tentáculos del Mind Flayer. La foto muestra la pasta oscura; podés servirla en vasitos para que sea fácil de comer de pie.",
    "tip": "Vasitos y tenedores para cada porción",
    "alt": "Pasta de color negro servida en un plato",
    "image": "assets/food/pasta-tentaculos.jpg",
    "credit": {
      "author": "Anne Oeldorf from State College, PA, USA",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Black_pasta.jpg",
      "originalTitle": "File:Black pasta.jpg"
    }
  },
  {
    "id": "escobas-bruja",
    "title": "Dedos de queso crujientes",
    "category": "salado",
    "description": "Bastones de mozzarella rebozados, como los de la foto, con salsa de tomate para un efecto sangriento. Una almendra en la punta puede convertirse en la uña de cada dedo monstruoso.",
    "tip": "Mejor recién calentados",
    "alt": "Bastones de mozzarella fritos junto a una salsa",
    "image": "assets/food/escobas-bruja.jpg",
    "credit": {
      "author": "Francesc Fort",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Mozzarella_sticks_-_Toro.jpg",
      "originalTitle": "File:Mozzarella sticks - Toro.jpg"
    }
  },
  {
    "id": "empanadas-calabaza",
    "title": "Empanadas del portal",
    "category": "salado",
    "description": "Empanadas de carne, queso o verduras con marcas de caras de calabaza en la masa. La foto muestra empanadas clásicas: podés decorar cada sabor con una cara distinta antes de hornear.",
    "tip": "Identificá el relleno de cada tanda",
    "alt": "Empanadas argentinas con su relleno a la vista",
    "image": "assets/food/empanadas-calabaza.jpg",
    "credit": {
      "author": "jamesonf",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Empanadas_Argentine_style.jpg",
      "originalTitle": "File:Empanadas Argentine style.jpg"
    }
  },
  {
    "id": "limonada-sangrienta",
    "title": "Limonada sangrienta",
    "category": "bebida",
    "description": "Limonada de frutilla bien roja, como la de la foto, servida con hielo y gomitas de gusanos. Un borde de salsa de frutilla en los vasos completa esta pócima sin alcohol.",
    "tip": "Traela bien fría en una jarra",
    "alt": "Limonada de frutilla de color rosado rojizo",
    "image": "assets/food/limonada-sangrienta.jpg",
    "credit": {
      "author": "E4024",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Lemonade_with_strawberry.jpg",
      "originalTitle": "File:Lemonade with strawberry.jpg"
    }
  },
  {
    "id": "jugo-vampiro",
    "title": "Elixir de vampiro",
    "category": "bebida",
    "description": "Jugo de arándanos rojos con un toque de limón y soda para un elixir oscuro sin alcohol. La foto muestra el jugo base; servilo en vasos transparentes con una etiqueta de sangre de vampiro.",
    "tip": "Llevá la soda aparte para conservar el gas",
    "alt": "Jugo rojo de arándanos en un vaso",
    "image": "assets/food/jugo-vampiro.jpg",
    "credit": {
      "author": "Lisa Pinehill from Osaka, Japan",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Cranberry_juice.jpg",
      "originalTitle": "File:Cranberry juice.jpg"
    }
  },
  {
    "id": "batido-monstruo",
    "title": "Batido del Demogorgon",
    "category": "bebida",
    "description": "Un smoothie verde de fruta y hojas verdes, como el de la foto, para una pócima monstruosa sin alcohol. Dibujá ojos y colmillos en los vasos y agregá gomitas como tentáculos.",
    "tip": "Servilo frío y agitá antes de repartir",
    "alt": "Batido verde servido en un vaso",
    "image": "assets/food/batido-monstruo.jpg",
    "credit": {
      "author": "Lablascovegmenu from London",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Green_smoothie_(8222465502).jpg",
      "originalTitle": "File:Green smoothie (8222465502).jpg"
    }
  },
  {
    "id": "latte-calabaza",
    "title": "Frappé de calabaza maldita",
    "category": "bebida",
    "description": "Café con leche, calabaza y especias, batido con hielo y coronado con crema. Sumale una telaraña de cacao para una pócima fría, aromática y bien otoñal.",
    "tip": "También puede prepararse descafeinado",
    "alt": "Frappé de calabaza con crema en un vaso transparente",
    "image": "assets/food/latte-calabaza.jpg",
    "credit": {
      "author": "Mr White",
      "license": "CC BY 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Starbucks_Pumpkin_Spice_Latte_Frappuccino.jpg",
      "originalTitle": "File:Starbucks Pumpkin Spice Latte Frappuccino.jpg"
    }
  },
  {
    "id": "sidra-embrujada",
    "title": "Sidra de la casa embrujada",
    "category": "bebida",
    "description": "Sidra de manzana con rodajas de fruta y canela para brindar del otro lado. La foto muestra sidra y jugo de manzana; si querés una versión sin alcohol, elegí el jugo y sumale soda.",
    "tip": "Marcá si la jarra tiene alcohol",
    "alt": "Vasos de sidra y jugo de manzana",
    "image": "assets/food/sidra-embrujada.jpg",
    "credit": {
      "author": "Autor indicado en Wikimedia Commons",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
      "source": "https://commons.wikimedia.org/wiki/File:Cider_and_apple_juice.jpg",
      "originalTitle": "File:Cider and apple juice.jpg"
    }
  },
  {
    "id": "chocolate-caliente",
    "title": "Chocolate del bosque oscuro",
    "category": "bebida",
    "description": "Chocolate caliente espeso con malvaviscos blancos convertidos en fantasmas: dos puntitos de chocolate para los ojos y listo. La foto muestra el chocolate que podés decorar al servir.",
    "tip": "Llevalo en un termo y traé tazas",
    "alt": "Taza de chocolate caliente",
    "image": "assets/food/chocolate-caliente.jpg",
    "credit": {
      "author": "AlekhyaDas",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "source": "https://commons.wikimedia.org/wiki/File:Hot_chocolate_drink.jpg",
      "originalTitle": "File:Hot chocolate drink.jpg"
    }
  },
  {
    "id": "sangria-roja",
    "title": "Sangría del portal rojo",
    "category": "bebida",
    "description": "Sangría de vino tinto y frutas con un color digno del cielo del Otro Lado. Decorá la jarra con ojos de uva; también podés reemplazar el vino por jugo de uva para una versión sin alcohol.",
    "tip": "Etiquetá claramente la versión con alcohol",
    "alt": "Vaso de sangría roja con frutas",
    "image": "assets/food/sangria-roja.jpg",
    "credit": {
      "author": "Frank K.",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Sangria_in_a_tall_skinny_glass_in_Malaga.jpg",
      "originalTitle": "File:Sangria in a tall skinny glass in Malaga.jpg"
    }
  },
  {
    "id": "pocion-morada",
    "title": "Pócima de medianoche",
    "category": "bebida",
    "description": "Batido de moras y yogur, como el de la foto, para una pócima violeta sin alcohol. Sumale un remolino de crema y ojos de azúcar justo antes de servir para despertar al monstruo.",
    "tip": "Mantenelo refrigerado hasta servir",
    "alt": "Batido de moras de color violeta con hojas de menta",
    "image": "assets/food/pocion-morada.jpg",
    "credit": {
      "author": "Ryan Snyder",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "source": "https://commons.wikimedia.org/wiki/File:Blackberry_Mint_Smoothie_(13006043115).jpg",
      "originalTitle": "File:Blackberry Mint Smoothie (13006043115).jpg"
    }
  }
];
