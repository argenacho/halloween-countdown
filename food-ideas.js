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
  }
];
