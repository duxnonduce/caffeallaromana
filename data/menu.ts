export type Lang = "it" | "en";

export type Text = { it: string; en: string };

export type MenuItem = {
  id: string;
  name: Text;
  desc?: Text;
  note?: Text; // es. "bevanda esclusa", "per 2 persone"
  price?: number; // assente = prezzo su richiesta
};

export type MenuCategory = {
  id: string;
  name: Text;
  items: MenuItem[];
};

let n = 0;
const id = () => `i${++n}`;

export const menu: MenuCategory[] = [
  {
    id: "caffetteria",
    name: { it: "Caffetteria", en: "Coffee" },
    items: [
      { id: id(), name: { it: "Caffè", en: "Espresso" }, price: 1.2 },
      { id: id(), name: { it: "Caffè decaffeinato", en: "Decaf espresso" }, price: 1.4 },
      { id: id(), name: { it: "Caffè corretto", en: "Espresso with a spirit" }, price: 1.5 },
      { id: id(), name: { it: "Caffè macchiato soia / senza lattosio", en: "Macchiato, soy / lactose-free" }, price: 1.4 },
      { id: id(), name: { it: "Caffè in ghiaccio", en: "Iced espresso" }, price: 1.8 },
      { id: id(), name: { it: "Caffè in ghiaccio decaffeinato", en: "Iced decaf espresso" }, price: 2.0 },
      { id: id(), name: { it: "Caffè in ghiaccio con latte di mandorla", en: "Iced espresso with almond milk" }, price: 2.0 },
      { id: id(), name: { it: "Espressino", en: "Espressino (espresso with milk foam)" }, price: 1.5 },
      { id: id(), name: { it: "Espressino decaffeinato", en: "Espressino, decaf" }, price: 1.7 },
      { id: id(), name: { it: "Espressino soia / senza lattosio", en: "Espressino, soy / lactose-free" }, price: 1.7 },
      { id: id(), name: { it: "Cappuccino", en: "Cappuccino" }, price: 1.7 },
      { id: id(), name: { it: "Cappuccino decaffeinato", en: "Cappuccino, decaf" }, price: 1.9 },
      { id: id(), name: { it: "Cappuccino di soia / senza lattosio", en: "Cappuccino, soy / lactose-free" }, price: 1.9 },
      { id: id(), name: { it: "Latte macchiato", en: "Latte macchiato" }, price: 1.8 },
      { id: id(), name: { it: "Latte macchiato decaffeinato", en: "Latte macchiato, decaf" }, price: 2.0 },
      { id: id(), name: { it: "Latte macchiato soia / senza lattosio", en: "Latte macchiato, soy / lactose-free" }, price: 2.0 },
      { id: id(), name: { it: "Ginseng", en: "Ginseng coffee" }, price: 1.8 },
      { id: id(), name: { it: "Ginseng in ghiaccio", en: "Iced ginseng coffee" }, price: 2.0 },
      { id: id(), name: { it: "Orzo", en: "Barley coffee" }, price: 1.8 },
      { id: id(), name: { it: "Orzo in ghiaccio", en: "Iced barley coffee" }, price: 2.0 },
      { id: id(), name: { it: "Latte e menta", en: "Milk and mint syrup" }, price: 2.5 },
      { id: id(), name: { it: "Menta e orzata", en: "Mint and almond syrup" }, price: 2.5 },
      { id: id(), name: { it: "Crema di caffè", en: "Coffee cream" }, price: 3.0 },
      { id: id(), name: { it: "Fior di latte", en: "Fior di latte (milk foam drink)" }, price: 2.5 },
      { id: id(), name: { it: "Espressino freddo", en: "Iced espressino" }, price: 3.0 }
    ]
  },
  {
    id: "colazione",
    name: { it: "Colazione", en: "Breakfast" },
    items: [
      { id: id(), name: { it: "Cornetto vuoto", en: "Plain croissant" }, price: 1.5 },
      { id: id(), name: { it: "Cornetto vuoto ai cereali", en: "Plain wholegrain croissant" }, price: 1.5 },
      { id: id(), name: { it: "Cornetto crema", en: "Custard cream croissant" }, price: 1.8 },
      { id: id(), name: { it: "Cornetto crema e cioccolato", en: "Custard and chocolate croissant" }, price: 1.8 },
      { id: id(), name: { it: "Cornetto cioccolato", en: "Chocolate croissant" }, price: 1.8 },
      { id: id(), name: { it: "Cornetto Pan di Stelle", en: "Pan di Stelle croissant" }, price: 2.0 },
      { id: id(), name: { it: "Cornetto pistacchio", en: "Pistachio croissant" }, price: 2.0 },
      { id: id(), name: { it: "Cornetto vegano ai frutti rossi", en: "Vegan croissant, red berries" }, price: 2.0 },
      { id: id(), name: { it: "Cornetto vegano all'arancia amara", en: "Vegan croissant, bitter orange" }, price: 2.0 },
      { id: id(), name: { it: "Cornetto vegano al melograno", en: "Vegan croissant, pomegranate" }, price: 2.0 },
      { id: id(), name: { it: "Treccia Nutella", en: "Braided pastry, Nutella" }, price: 2.0 },
      { id: id(), name: { it: "Treccia mirtillo", en: "Braided pastry, blueberry" }, price: 2.0 },
      { id: id(), name: { it: "Treccia grano saraceno e arancia", en: "Braided pastry, buckwheat and orange" }, price: 2.0 },
      { id: id(), name: { it: "Treccia miele e noci", en: "Braided pastry, honey and walnuts" }, price: 2.0 },
      { id: id(), name: { it: "Treccia frutti rossi", en: "Braided pastry, red berries" }, price: 2.0 },
      { id: id(), name: { it: "Triangolo strudel alle mele", en: "Apple strudel triangle" }, price: 2.0 },
      { id: id(), name: { it: "Saccottino ai 3 cioccolati", en: "Filled pastry, three chocolates" }, price: 2.0 },
      { id: id(), name: { it: "Pasticciotto piccolo", en: "Small pasticciotto" }, price: 1.3 },
      { id: id(), name: { it: "Pasticciotto crema", en: "Pasticciotto, custard cream" }, price: 1.8 },
      { id: id(), name: { it: "Pasticciotto crema e amarena", en: "Pasticciotto, custard and sour cherry" }, price: 1.8 },
      { id: id(), name: { it: "Fruttone", en: "Fruttone (almond pastry)" }, price: 2.5 },
      { id: id(), name: { it: "Fruttone piccolo", en: "Small fruttone" }, price: 1.8 }
    ]
  },
  {
    id: "aperitivi",
    name: { it: "Aperitivi", en: "Aperitifs" },
    items: [
      { id: id(), name: { it: "Aperitivo della casa", en: "House aperitivo" }, note: { it: "bevanda esclusa", en: "drink not included" }, price: 12.0 },
      { id: id(), name: { it: "Aperiticena", en: "Aperitivo dinner" }, note: { it: "bevanda esclusa", en: "drink not included" }, price: 15.0 },
      { id: id(), name: { it: "Tagliere di salumi e formaggi", en: "Cured meat and cheese board" }, note: { it: "per 2 persone", en: "for 2 people" }, price: 28.0 },
      { id: id(), name: { it: "Tagliere di soli salumi", en: "Cured meat board" }, note: { it: "per 2 persone", en: "for 2 people" }, price: 15.0 },
      { id: id(), name: { it: "Tagliere di soli formaggi", en: "Cheese board" }, note: { it: "per 2 persone", en: "for 2 people" }, price: 15.0 },
      { id: id(), name: { it: "Stuzzicheria tris", en: "Snack trio" }, desc: { it: "taralli, olive, arachidi", en: "taralli, olives, peanuts" }, price: 4.0 }
    ]
  },
  {
    id: "cocktail",
    name: { it: "Cocktail", en: "Cocktails" },
    items: [
      { id: id(), name: { it: "Spritz Aperol", en: "Aperol Spritz" }, desc: { it: "prosecco, Aperol", en: "prosecco, Aperol" }, price: 6.0 },
      { id: id(), name: { it: "Apertass", en: "Apertass" }, desc: { it: "Aperol, cedrata", en: "Aperol, citron soda" }, price: 6.0 },
      { id: id(), name: { it: "Spritz Campari", en: "Campari Spritz" }, desc: { it: "prosecco, Campari", en: "prosecco, Campari" }, price: 7.0 },
      { id: id(), name: { it: "Hugo Spritz", en: "Hugo Spritz" }, desc: { it: "prosecco, liquore al sambuco, menta", en: "prosecco, elderflower liqueur, mint" }, price: 7.0 },
      { id: id(), name: { it: "Spritz Malibu Cherry", en: "Malibu Cherry Spritz" }, desc: { it: "Malibu, prosecco, succo di ciliegia", en: "Malibu, prosecco, cherry juice" }, price: 8.0 },
      { id: id(), name: { it: "Spritz Limoncello", en: "Limoncello Spritz" }, desc: { it: "prosecco, limoncello", en: "prosecco, limoncello" }, price: 8.0 },
      { id: id(), name: { it: "Negroni", en: "Negroni" }, desc: { it: "Campari, Martini rosso, gin", en: "Campari, sweet vermouth, gin" }, price: 7.0 },
      { id: id(), name: { it: "Negroni sbagliato", en: "Negroni sbagliato" }, desc: { it: "Campari, Martini rosso, prosecco", en: "Campari, sweet vermouth, prosecco" }, price: 7.0 },
      { id: id(), name: { it: "Negrosky", en: "Negrosky" }, desc: { it: "Campari, Martini rosso, vodka", en: "Campari, sweet vermouth, vodka" }, price: 7.0 },
      { id: id(), name: { it: "Americano", en: "Americano" }, desc: { it: "Campari, Martini rosso, soda", en: "Campari, sweet vermouth, soda" }, price: 7.0 },
      { id: id(), name: { it: "Margarita", en: "Margarita" }, desc: { it: "tequila, triple sec, succo di lime", en: "tequila, triple sec, lime juice" }, price: 7.0 },
      { id: id(), name: { it: "Sex on the Beach", en: "Sex on the Beach" }, desc: { it: "vodka, liquore alla pesca, succo d'arancia e mirtillo rosso", en: "vodka, peach liqueur, orange and cranberry juice" }, price: 7.0 },
      { id: id(), name: { it: "Moscow Mule", en: "Moscow Mule" }, desc: { it: "vodka, succo di lime, ginger beer e zenzero fresco", en: "vodka, lime juice, ginger beer and fresh ginger" }, price: 7.0 },
      { id: id(), name: { it: "Gin Mule", en: "Gin Mule" }, desc: { it: "gin, succo di lime, ginger beer e zenzero fresco", en: "gin, lime juice, ginger beer and fresh ginger" }, price: 7.0 },
      { id: id(), name: { it: "Mojito", en: "Mojito" }, desc: { it: "rum bianco, zucchero di canna, menta fresca, succo di lime e soda", en: "white rum, cane sugar, fresh mint, lime juice and soda" }, price: 8.0 },
      { id: id(), name: { it: "Gin Tonic Tanqueray", en: "Gin Tonic Tanqueray" }, desc: { it: "gin e tonica", en: "gin and tonic water" }, price: 7.0 },
      { id: id(), name: { it: "Gin Lemon Tanqueray", en: "Gin Lemon Tanqueray" }, desc: { it: "gin e tonica lemon", en: "gin and lemon tonic water" }, price: 7.0 },
      { id: id(), name: { it: "Vodka Tonic", en: "Vodka Tonic" }, desc: { it: "vodka e tonica", en: "vodka and tonic water" }, price: 7.0 },
      { id: id(), name: { it: "Vodka Lemon", en: "Vodka Lemon" }, desc: { it: "vodka e tonica lemon", en: "vodka and lemon tonic water" }, price: 7.0 }
    ]
  },
  {
    id: "bevande",
    name: { it: "Bevande", en: "Drinks" },
    items: [
      { id: id(), name: { it: "Acqua 50cl", en: "Water 50cl" }, price: 1.0 },
      { id: id(), name: { it: "Acqua 1 litro", en: "Water 1L" }, price: 2.0 },
      { id: id(), name: { it: "Coca Cola", en: "Coca-Cola" }, price: 2.5 },
      { id: id(), name: { it: "Coca Cola zero", en: "Coca-Cola zero" }, price: 2.5 },
      { id: id(), name: { it: "Coca Cola zero zuccheri zero caffeina", en: "Coca-Cola zero sugar, caffeine-free" }, price: 2.5 },
      { id: id(), name: { it: "Fanta", en: "Fanta" }, price: 2.5 },
      { id: id(), name: { it: "Lemonsoda", en: "Lemonsoda" }, price: 2.5 },
      { id: id(), name: { it: "Red Bull", en: "Red Bull" }, price: 3.0 },
      { id: id(), name: { it: "Tè pesca Estathé", en: "Iced tea, peach" }, price: 2.5 },
      { id: id(), name: { it: "Tè limone Estathé", en: "Iced tea, lemon" }, price: 2.5 },
      { id: id(), name: { it: "Gassosa", en: "Gassosa (Italian lemon soda)" }, price: 2.5 },
      { id: id(), name: { it: "Cocktail San Pellegrino", en: "San Pellegrino cocktail soda" }, price: 2.5 },
      { id: id(), name: { it: "Cedrata", en: "Cedrata (citron soda)" }, price: 2.5 },
      { id: id(), name: { it: "Tonica", en: "Tonic water" }, price: 2.5 },
      { id: id(), name: { it: "Tonica Lemon", en: "Tonic water, lemon" }, price: 2.5 },
      { id: id(), name: { it: "Crodino", en: "Crodino (non-alcoholic aperitif)" }, price: 2.5 },
      { id: id(), name: { it: "Bitter bianco", en: "Bitter, white" }, price: 2.5 },
      { id: id(), name: { it: "Bitter rosso", en: "Bitter, red" }, price: 2.5 },
      { id: id(), name: { it: "Campari soda", en: "Campari soda" }, price: 3.0 }
    ]
  },
  {
    id: "birre",
    name: { it: "Birre", en: "Beers" },
    items: [
      { id: id(), name: { it: "Nastro Azzurro", en: "Nastro Azzurro" }, price: 2.0 },
      { id: id(), name: { it: "Nastro Azzurro \"00\"", en: "Nastro Azzurro \"00\" (alcohol-free)" }, price: 2.0 },
      { id: id(), name: { it: "Corona", en: "Corona" }, price: 3.5 },
      { id: id(), name: { it: "Tennent's", en: "Tennent's" }, price: 3.5 },
      { id: id(), name: { it: "Beck's", en: "Beck's" }, price: 2.5 },
      { id: id(), name: { it: "Ceres", en: "Ceres" }, price: 3.5 }
    ]
  },
  {
    id: "birra-spina",
    name: { it: "Birra alla spina", en: "Draft beer" },
    items: [
      { id: id(), name: { it: "Heineken (media)", en: "Heineken (small)" }, desc: { it: "bionda", en: "lager" }, price: 3.5 },
      { id: id(), name: { it: "Heineken (grande)", en: "Heineken (large)" }, desc: { it: "bionda", en: "lager" }, price: 5.0 },
      { id: id(), name: { it: "Bulldog (media)", en: "Bulldog (small)" }, desc: { it: "doppio malto", en: "double malt" }, price: 4.0 },
      { id: id(), name: { it: "Bulldog (grande)", en: "Bulldog (large)" }, desc: { it: "doppio malto", en: "double malt" }, price: 6.0 },
      { id: id(), name: { it: "Ichnusa non filtrata (media)", en: "Ichnusa unfiltered (small)" }, desc: { it: "lager", en: "lager" }, price: 3.5 },
      { id: id(), name: { it: "Ichnusa non filtrata (grande)", en: "Ichnusa unfiltered (large)" }, desc: { it: "lager", en: "lager" }, price: 5.0 }
    ]
  },
  {
    id: "pucce",
    name: { it: "Pucce", en: "Pucce (Salentine sandwiches)" },
    items: [
      { id: id(), name: { it: "Norvegese", en: "Norvegese" }, desc: { it: "salmone affumicato, stracciatella, rucola e lime fresco", en: "smoked salmon, stracciatella, rocket and fresh lime" } },
      { id: id(), name: { it: "Martina Franca", en: "Martina Franca" }, desc: { it: "capocollo, burrata, rucola e glassa di soia", en: "capocollo, burrata, rocket and soy glaze" } },
      { id: id(), name: { it: "Salentina", en: "Salentina" }, desc: { it: "pomodori scattarisciati e caciocavallo alla griglia", en: "crushed roasted tomatoes and grilled caciocavallo cheese" } },
      { id: id(), name: { it: "Vegetariana", en: "Vegetarian" }, desc: { it: "rucola, mozzarella e verdure grigliate", en: "rocket, mozzarella and grilled vegetables" } }
    ]
  },
  {
    id: "antipasti",
    name: { it: "Antipasti", en: "Starters" },
    items: [
      { id: id(), name: { it: "Antipasto della casa", en: "House starter" }, price: 15.0 },
      { id: id(), name: { it: "Frittino misto", en: "Mixed fried starter" }, price: 12.0 },
      { id: id(), name: { it: "Tartare di tonno fresco", en: "Fresh tuna tartare" }, price: 16.0 },
      { id: id(), name: { it: "Tartare di gambero rosso", en: "Red prawn tartare" }, price: 18.0 },
      { id: id(), name: { it: "Tartare di fassona con burrata e chips di zucchine e tartufo", en: "Fassona beef tartare with burrata, crispy courgette and truffle" }, price: 22.0 },
      { id: id(), name: { it: "Ossobuco con tartare di manzo", en: "Ossobuco with beef tartare" }, price: 18.0 },
      { id: id(), name: { it: "Capocollo e burrata", en: "Capocollo and burrata" }, price: 15.0 },
      { id: id(), name: { it: "Carpaccio di Black Angus", en: "Black Angus carpaccio" }, price: 15.0 },
      { id: id(), name: { it: "Carpaccio di salmone affumicato", en: "Smoked salmon carpaccio" }, price: 15.0 }
    ]
  },
  {
    id: "primi",
    name: { it: "Primi piatti", en: "First courses" },
    items: [
      { id: id(), name: { it: "Tonnarelli cacio e pepe", en: "Tonnarelli, pecorino and black pepper" }, price: 14.0 },
      { id: id(), name: { it: "Tonnarelli alla gricia e fave verdi", en: "Tonnarelli alla gricia with green fava beans" }, price: 14.0 },
      { id: id(), name: { it: "Mezze maniche alla carbonara", en: "Mezze maniche alla carbonara" }, price: 14.0 },
      { id: id(), name: { it: "Tonnarelli cacio e pepe tartufata", en: "Tonnarelli cacio e pepe with fresh truffle" }, note: { it: "con tartufo fresco", en: "with fresh truffle" }, price: 18.0 },
      { id: id(), name: { it: "Sagne 'ncannulate con ricotta forte", en: "Sagne 'ncannulate with spicy aged ricotta" }, price: 12.0 },
      { id: id(), name: { it: "Ciceri e tria", en: "Ciceri e tria (chickpeas and pasta)" }, price: 12.0 },
      { id: id(), name: { it: "Orecchiette con cime di rapa", en: "Orecchiette with turnip tops" }, note: { it: "se di stagione", en: "seasonal availability" }, price: 12.0 },
      { id: id(), name: { it: "Orecchiette al pomodoro", en: "Orecchiette with tomato sauce" }, price: 10.0 },
      { id: id(), name: { it: "Orecchiette al ragù di cinghiale", en: "Orecchiette with wild boar ragù" }, price: 18.0 },
      { id: id(), name: { it: "Orecchiette al ragù di cervo", en: "Orecchiette with venison ragù" }, price: 18.0 },
      { id: id(), name: { it: "Orecchiette al ragù di capriolo", en: "Orecchiette with roe deer ragù" }, price: 18.0 },
      { id: id(), name: { it: "Fregola con crema di zucchine e cozze", en: "Fregola with courgette cream and mussels" }, price: 16.0 }
    ]
  },
  {
    id: "secondi",
    name: { it: "Secondi piatti", en: "Main courses" },
    items: [
      { id: id(), name: { it: "Polpette al sugo", en: "Meatballs in tomato sauce" }, price: 12.0 },
      { id: id(), name: { it: "Grigliata di carne", en: "Mixed grilled meat" }, price: 15.0 },
      { id: id(), name: { it: "Tagliata di Angus con rucola, pomodorini e grana", en: "Angus tagliata with rocket, cherry tomatoes and grana cheese" }, price: 18.0 },
      { id: id(), name: { it: "Tagliata di pollo con rucola, pomodorini e grana", en: "Chicken tagliata with rocket, cherry tomatoes and grana cheese" }, price: 15.0 },
      { id: id(), name: { it: "Arrosticini di pecora", en: "Lamb skewers (arrosticini)" }, note: { it: "al pezzo, minimo 6 pezzi", en: "per skewer, minimum 6" }, price: 1.5 }
    ]
  },
  {
    id: "contorni",
    name: { it: "Contorni", en: "Side dishes" },
    items: [
      { id: id(), name: { it: "Verdure grigliate", en: "Grilled vegetables" }, price: 8.0 },
      { id: id(), name: { it: "Insalata verde", en: "Green salad" }, price: 6.0 },
      { id: id(), name: { it: "Patatine fritte", en: "French fries" }, price: 5.0 },
      { id: id(), name: { it: "Insalata di pomodori", en: "Tomato salad" }, price: 6.0 },
      { id: id(), name: { it: "Verdura di stagione", en: "Seasonal vegetables" }, price: 6.0 }
    ]
  },
  {
    id: "insalatone",
    name: { it: "Insalatone", en: "Large salads" },
    items: [
      { id: id(), name: { it: "Salmone", en: "Salmon" }, desc: { it: "insalata verde, rucola, salmone affumicato, mozzarella, mandorle a scaglie", en: "green salad, rocket, smoked salmon, mozzarella, almond flakes" }, price: 12.0 },
      { id: id(), name: { it: "Vegetariana", en: "Vegetarian" }, desc: { it: "insalata verde, pomodoro ciliegino, melanzane grigliate, zucchine grigliate e mozzarella", en: "green salad, cherry tomato, grilled aubergine, grilled courgette and mozzarella" } },
      { id: id(), name: { it: "Crudaiola", en: "Crudaiola" }, desc: { it: "insalata verde, prosciutto crudo, grana a scaglie, mozzarella, pomodoro ciliegino e aceto di glassa balsamica", en: "green salad, raw ham, grana flakes, mozzarella, cherry tomato and balsamic glaze" } },
      { id: id(), name: { it: "Pollo", en: "Chicken" }, desc: { it: "insalata verde, sovraccoscia di pollo, rucola, melanzane grigliate, pomodori secchi e funghi champignon", en: "green salad, chicken thigh, rocket, grilled aubergine, sun-dried tomatoes and button mushrooms" } }
    ]
  },
  {
    id: "dolci",
    name: { it: "Dolci della casa", en: "House desserts" },
    items: [
      { id: id(), name: { it: "Crostata", en: "Crostata (jam tart)" } },
      { id: id(), name: { it: "Tiramisù", en: "Tiramisù" } },
      { id: id(), name: { it: "Cheesecake", en: "Cheesecake" } }
    ]
  }
];
