-- ============================================================
-- DATI — Caffè alla Romana (Monteroni di Lecce)
-- Esegui DOPO schema.sql, una sola volta, in Supabase SQL Editor.
-- ============================================================

update business set
  name = 'Caffè alla Romana',
  tagline = 'Colazione, pranzo e aperitivo nel cuore di Monteroni',
  address = 'Via Alcide de Gasperi, 96, 73047 Monteroni di Lecce (LE)',
  maps_query = 'Caffè alla Romana, Via Alcide de Gasperi 96, Monteroni di Lecce',
  phone = '379 124 5286',
  phone_href = 'tel:+393791245286',
  instagram = 'https://www.instagram.com/caffe_alla_romana_2023',
  facebook = 'https://www.facebook.com/share/1Bp29Y3HW7/?mibextid=wwXIfr';

-- Orari
update hours set open_time = '05:00', close_time = '23:30' where day_index = 0;
update hours set open_time = '05:00', close_time = '23:30' where day_index = 1;
update hours set open_time = '05:00', close_time = '23:30' where day_index = 2;
update hours set open_time = '05:00', close_time = '23:30' where day_index = 3;
update hours set open_time = '05:00', close_time = '23:30' where day_index = 4;
update hours set open_time = '06:00', close_time = '23:30' where day_index = 5;
update hours set open_time = null, close_time = null where day_index = 6;

-- Categorie e prodotti

-- categoria: Caffetteria
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Caffetteria', 'Coffee', 0, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Caffè', 'Espresso', null, null, null, null, 1.2, true, 0 from new_cat
  union all
  select id, 'Caffè decaffeinato', 'Decaf espresso', null, null, null, null, 1.4, true, 10 from new_cat
  union all
  select id, 'Caffè corretto', 'Espresso with a spirit', null, null, null, null, 1.5, true, 20 from new_cat
  union all
  select id, 'Caffè macchiato soia / senza lattosio', 'Macchiato, soy / lactose-free', null, null, null, null, 1.4, true, 30 from new_cat
  union all
  select id, 'Caffè in ghiaccio', 'Iced espresso', null, null, null, null, 1.8, true, 40 from new_cat
  union all
  select id, 'Caffè in ghiaccio decaffeinato', 'Iced decaf espresso', null, null, null, null, 2, true, 50 from new_cat
  union all
  select id, 'Caffè in ghiaccio con latte di mandorla', 'Iced espresso with almond milk', null, null, null, null, 2, true, 60 from new_cat
  union all
  select id, 'Espressino', 'Espressino (espresso with milk foam)', null, null, null, null, 1.5, true, 70 from new_cat
  union all
  select id, 'Espressino decaffeinato', 'Espressino, decaf', null, null, null, null, 1.7, true, 80 from new_cat
  union all
  select id, 'Espressino soia / senza lattosio', 'Espressino, soy / lactose-free', null, null, null, null, 1.7, true, 90 from new_cat
  union all
  select id, 'Cappuccino', 'Cappuccino', null, null, null, null, 1.7, true, 100 from new_cat
  union all
  select id, 'Cappuccino decaffeinato', 'Cappuccino, decaf', null, null, null, null, 1.9, true, 110 from new_cat
  union all
  select id, 'Cappuccino di soia / senza lattosio', 'Cappuccino, soy / lactose-free', null, null, null, null, 1.9, true, 120 from new_cat
  union all
  select id, 'Latte macchiato', 'Latte macchiato', null, null, null, null, 1.8, true, 130 from new_cat
  union all
  select id, 'Latte macchiato decaffeinato', 'Latte macchiato, decaf', null, null, null, null, 2, true, 140 from new_cat
  union all
  select id, 'Latte macchiato soia / senza lattosio', 'Latte macchiato, soy / lactose-free', null, null, null, null, 2, true, 150 from new_cat
  union all
  select id, 'Ginseng', 'Ginseng coffee', null, null, null, null, 1.8, true, 160 from new_cat
  union all
  select id, 'Ginseng in ghiaccio', 'Iced ginseng coffee', null, null, null, null, 2, true, 170 from new_cat
  union all
  select id, 'Orzo', 'Barley coffee', null, null, null, null, 1.8, true, 180 from new_cat
  union all
  select id, 'Orzo in ghiaccio', 'Iced barley coffee', null, null, null, null, 2, true, 190 from new_cat
  union all
  select id, 'Latte e menta', 'Milk and mint syrup', null, null, null, null, 2.5, true, 200 from new_cat
  union all
  select id, 'Menta e orzata', 'Mint and almond syrup', null, null, null, null, 2.5, true, 210 from new_cat
  union all
  select id, 'Crema di caffè', 'Coffee cream', null, null, null, null, 3, true, 220 from new_cat
  union all
  select id, 'Fior di latte', 'Fior di latte (milk foam drink)', null, null, null, null, 2.5, true, 230 from new_cat
  union all
  select id, 'Espressino freddo', 'Iced espressino', null, null, null, null, 3, true, 240 from new_cat;

-- categoria: Colazione
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Colazione', 'Breakfast', 10, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Cornetto vuoto', 'Plain croissant', null, null, null, null, 1.5, true, 0 from new_cat
  union all
  select id, 'Cornetto vuoto ai cereali', 'Plain wholegrain croissant', null, null, null, null, 1.5, true, 10 from new_cat
  union all
  select id, 'Cornetto crema', 'Custard cream croissant', null, null, null, null, 1.8, true, 20 from new_cat
  union all
  select id, 'Cornetto crema e cioccolato', 'Custard and chocolate croissant', null, null, null, null, 1.8, true, 30 from new_cat
  union all
  select id, 'Cornetto cioccolato', 'Chocolate croissant', null, null, null, null, 1.8, true, 40 from new_cat
  union all
  select id, 'Cornetto Pan di Stelle', 'Pan di Stelle croissant', null, null, null, null, 2, true, 50 from new_cat
  union all
  select id, 'Cornetto pistacchio', 'Pistachio croissant', null, null, null, null, 2, true, 60 from new_cat
  union all
  select id, 'Cornetto vegano ai frutti rossi', 'Vegan croissant, red berries', null, null, null, null, 2, true, 70 from new_cat
  union all
  select id, 'Cornetto vegano all''arancia amara', 'Vegan croissant, bitter orange', null, null, null, null, 2, true, 80 from new_cat
  union all
  select id, 'Cornetto vegano al melograno', 'Vegan croissant, pomegranate', null, null, null, null, 2, true, 90 from new_cat
  union all
  select id, 'Treccia Nutella', 'Braided pastry, Nutella', null, null, null, null, 2, true, 100 from new_cat
  union all
  select id, 'Treccia mirtillo', 'Braided pastry, blueberry', null, null, null, null, 2, true, 110 from new_cat
  union all
  select id, 'Treccia grano saraceno e arancia', 'Braided pastry, buckwheat and orange', null, null, null, null, 2, true, 120 from new_cat
  union all
  select id, 'Treccia miele e noci', 'Braided pastry, honey and walnuts', null, null, null, null, 2, true, 130 from new_cat
  union all
  select id, 'Treccia frutti rossi', 'Braided pastry, red berries', null, null, null, null, 2, true, 140 from new_cat
  union all
  select id, 'Triangolo strudel alle mele', 'Apple strudel triangle', null, null, null, null, 2, true, 150 from new_cat
  union all
  select id, 'Saccottino ai 3 cioccolati', 'Filled pastry, three chocolates', null, null, null, null, 2, true, 160 from new_cat
  union all
  select id, 'Pasticciotto piccolo', 'Small pasticciotto', null, null, null, null, 1.3, true, 170 from new_cat
  union all
  select id, 'Pasticciotto crema', 'Pasticciotto, custard cream', null, null, null, null, 1.8, true, 180 from new_cat
  union all
  select id, 'Pasticciotto crema e amarena', 'Pasticciotto, custard and sour cherry', null, null, null, null, 1.8, true, 190 from new_cat
  union all
  select id, 'Fruttone', 'Fruttone (almond pastry)', null, null, null, null, 2.5, true, 200 from new_cat
  union all
  select id, 'Fruttone piccolo', 'Small fruttone', null, null, null, null, 1.8, true, 210 from new_cat;

-- categoria: Aperitivi
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Aperitivi', 'Aperitifs', 20, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Aperitivo della casa', 'House aperitivo', null, null, 'bevanda esclusa', 'drink not included', 12, true, 0 from new_cat
  union all
  select id, 'Aperiticena', 'Aperitivo dinner', null, null, 'bevanda esclusa', 'drink not included', 15, true, 10 from new_cat
  union all
  select id, 'Tagliere di salumi e formaggi', 'Cured meat and cheese board', null, null, 'per 2 persone', 'for 2 people', 28, true, 20 from new_cat
  union all
  select id, 'Tagliere di soli salumi', 'Cured meat board', null, null, 'per 2 persone', 'for 2 people', 15, true, 30 from new_cat
  union all
  select id, 'Tagliere di soli formaggi', 'Cheese board', null, null, 'per 2 persone', 'for 2 people', 15, true, 40 from new_cat
  union all
  select id, 'Stuzzicheria tris', 'Snack trio', 'taralli, olive, arachidi', 'taralli, olives, peanuts', null, null, 4, true, 50 from new_cat;

-- categoria: Cocktail
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Cocktail', 'Cocktails', 30, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Spritz Aperol', 'Aperol Spritz', 'prosecco, Aperol', 'prosecco, Aperol', null, null, 6, true, 0 from new_cat
  union all
  select id, 'Apertass', 'Apertass', 'Aperol, cedrata', 'Aperol, citron soda', null, null, 6, true, 10 from new_cat
  union all
  select id, 'Spritz Campari', 'Campari Spritz', 'prosecco, Campari', 'prosecco, Campari', null, null, 7, true, 20 from new_cat
  union all
  select id, 'Hugo Spritz', 'Hugo Spritz', 'prosecco, liquore al sambuco, menta', 'prosecco, elderflower liqueur, mint', null, null, 7, true, 30 from new_cat
  union all
  select id, 'Spritz Malibu Cherry', 'Malibu Cherry Spritz', 'Malibu, prosecco, succo di ciliegia', 'Malibu, prosecco, cherry juice', null, null, 8, true, 40 from new_cat
  union all
  select id, 'Spritz Limoncello', 'Limoncello Spritz', 'prosecco, limoncello', 'prosecco, limoncello', null, null, 8, true, 50 from new_cat
  union all
  select id, 'Negroni', 'Negroni', 'Campari, Martini rosso, gin', 'Campari, sweet vermouth, gin', null, null, 7, true, 60 from new_cat
  union all
  select id, 'Negroni sbagliato', 'Negroni sbagliato', 'Campari, Martini rosso, prosecco', 'Campari, sweet vermouth, prosecco', null, null, 7, true, 70 from new_cat
  union all
  select id, 'Negrosky', 'Negrosky', 'Campari, Martini rosso, vodka', 'Campari, sweet vermouth, vodka', null, null, 7, true, 80 from new_cat
  union all
  select id, 'Americano', 'Americano', 'Campari, Martini rosso, soda', 'Campari, sweet vermouth, soda', null, null, 7, true, 90 from new_cat
  union all
  select id, 'Margarita', 'Margarita', 'tequila, triple sec, succo di lime', 'tequila, triple sec, lime juice', null, null, 7, true, 100 from new_cat
  union all
  select id, 'Sex on the Beach', 'Sex on the Beach', 'vodka, liquore alla pesca, succo d''arancia e mirtillo rosso', 'vodka, peach liqueur, orange and cranberry juice', null, null, 7, true, 110 from new_cat
  union all
  select id, 'Moscow Mule', 'Moscow Mule', 'vodka, succo di lime, ginger beer e zenzero fresco', 'vodka, lime juice, ginger beer and fresh ginger', null, null, 7, true, 120 from new_cat
  union all
  select id, 'Gin Mule', 'Gin Mule', 'gin, succo di lime, ginger beer e zenzero fresco', 'gin, lime juice, ginger beer and fresh ginger', null, null, 7, true, 130 from new_cat
  union all
  select id, 'Mojito', 'Mojito', 'rum bianco, zucchero di canna, menta fresca, succo di lime e soda', 'white rum, cane sugar, fresh mint, lime juice and soda', null, null, 8, true, 140 from new_cat
  union all
  select id, 'Gin Tonic Tanqueray', 'Gin Tonic Tanqueray', 'gin e tonica', 'gin and tonic water', null, null, 7, true, 150 from new_cat
  union all
  select id, 'Gin Lemon Tanqueray', 'Gin Lemon Tanqueray', 'gin e tonica lemon', 'gin and lemon tonic water', null, null, 7, true, 160 from new_cat
  union all
  select id, 'Vodka Tonic', 'Vodka Tonic', 'vodka e tonica', 'vodka and tonic water', null, null, 7, true, 170 from new_cat
  union all
  select id, 'Vodka Lemon', 'Vodka Lemon', 'vodka e tonica lemon', 'vodka and lemon tonic water', null, null, 7, true, 180 from new_cat;

-- categoria: Bevande
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Bevande', 'Drinks', 40, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Acqua 50cl', 'Water 50cl', null, null, null, null, 1, true, 0 from new_cat
  union all
  select id, 'Acqua 1 litro', 'Water 1L', null, null, null, null, 2, true, 10 from new_cat
  union all
  select id, 'Coca Cola', 'Coca-Cola', null, null, null, null, 2.5, true, 20 from new_cat
  union all
  select id, 'Coca Cola zero', 'Coca-Cola zero', null, null, null, null, 2.5, true, 30 from new_cat
  union all
  select id, 'Coca Cola zero zuccheri zero caffeina', 'Coca-Cola zero sugar, caffeine-free', null, null, null, null, 2.5, true, 40 from new_cat
  union all
  select id, 'Fanta', 'Fanta', null, null, null, null, 2.5, true, 50 from new_cat
  union all
  select id, 'Lemonsoda', 'Lemonsoda', null, null, null, null, 2.5, true, 60 from new_cat
  union all
  select id, 'Red Bull', 'Red Bull', null, null, null, null, 3, true, 70 from new_cat
  union all
  select id, 'Tè pesca Estathé', 'Iced tea, peach', null, null, null, null, 2.5, true, 80 from new_cat
  union all
  select id, 'Tè limone Estathé', 'Iced tea, lemon', null, null, null, null, 2.5, true, 90 from new_cat
  union all
  select id, 'Gassosa', 'Gassosa (Italian lemon soda)', null, null, null, null, 2.5, true, 100 from new_cat
  union all
  select id, 'Cocktail San Pellegrino', 'San Pellegrino cocktail soda', null, null, null, null, 2.5, true, 110 from new_cat
  union all
  select id, 'Cedrata', 'Cedrata (citron soda)', null, null, null, null, 2.5, true, 120 from new_cat
  union all
  select id, 'Tonica', 'Tonic water', null, null, null, null, 2.5, true, 130 from new_cat
  union all
  select id, 'Tonica Lemon', 'Tonic water, lemon', null, null, null, null, 2.5, true, 140 from new_cat
  union all
  select id, 'Crodino', 'Crodino (non-alcoholic aperitif)', null, null, null, null, 2.5, true, 150 from new_cat
  union all
  select id, 'Bitter bianco', 'Bitter, white', null, null, null, null, 2.5, true, 160 from new_cat
  union all
  select id, 'Bitter rosso', 'Bitter, red', null, null, null, null, 2.5, true, 170 from new_cat
  union all
  select id, 'Campari soda', 'Campari soda', null, null, null, null, 3, true, 180 from new_cat;

-- categoria: Birre
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Birre', 'Beers', 50, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Nastro Azzurro', 'Nastro Azzurro', null, null, null, null, 2, true, 0 from new_cat
  union all
  select id, 'Nastro Azzurro "00"', 'Nastro Azzurro "00" (alcohol-free)', null, null, null, null, 2, true, 10 from new_cat
  union all
  select id, 'Corona', 'Corona', null, null, null, null, 3.5, true, 20 from new_cat
  union all
  select id, 'Tennent''s', 'Tennent''s', null, null, null, null, 3.5, true, 30 from new_cat
  union all
  select id, 'Beck''s', 'Beck''s', null, null, null, null, 2.5, true, 40 from new_cat
  union all
  select id, 'Ceres', 'Ceres', null, null, null, null, 3.5, true, 50 from new_cat;

-- categoria: Birra alla spina
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Birra alla spina', 'Draft beer', 60, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Heineken (media)', 'Heineken (small)', 'bionda', 'lager', null, null, 3.5, true, 0 from new_cat
  union all
  select id, 'Heineken (grande)', 'Heineken (large)', 'bionda', 'lager', null, null, 5, true, 10 from new_cat
  union all
  select id, 'Bulldog (media)', 'Bulldog (small)', 'doppio malto', 'double malt', null, null, 4, true, 20 from new_cat
  union all
  select id, 'Bulldog (grande)', 'Bulldog (large)', 'doppio malto', 'double malt', null, null, 6, true, 30 from new_cat
  union all
  select id, 'Ichnusa non filtrata (media)', 'Ichnusa unfiltered (small)', 'lager', 'lager', null, null, 3.5, true, 40 from new_cat
  union all
  select id, 'Ichnusa non filtrata (grande)', 'Ichnusa unfiltered (large)', 'lager', 'lager', null, null, 5, true, 50 from new_cat;

-- categoria: Pucce
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Pucce', 'Pucce (Salentine sandwiches)', 70, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Norvegese', 'Norvegese', 'salmone affumicato, stracciatella, rucola e lime fresco', 'smoked salmon, stracciatella, rocket and fresh lime', null, null, null::numeric, true, 0 from new_cat
  union all
  select id, 'Martina Franca', 'Martina Franca', 'capocollo, burrata, rucola e glassa di soia', 'capocollo, burrata, rocket and soy glaze', null, null, null::numeric, true, 10 from new_cat
  union all
  select id, 'Salentina', 'Salentina', 'pomodori scattarisciati e caciocavallo alla griglia', 'crushed roasted tomatoes and grilled caciocavallo cheese', null, null, null::numeric, true, 20 from new_cat
  union all
  select id, 'Vegetariana', 'Vegetarian', 'rucola, mozzarella e verdure grigliate', 'rocket, mozzarella and grilled vegetables', null, null, null::numeric, true, 30 from new_cat;

-- categoria: Antipasti
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Antipasti', 'Starters', 80, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Antipasto della casa', 'House starter', null, null, null, null, 15, true, 0 from new_cat
  union all
  select id, 'Frittino misto', 'Mixed fried starter', null, null, null, null, 12, true, 10 from new_cat
  union all
  select id, 'Tartare di tonno fresco', 'Fresh tuna tartare', null, null, null, null, 16, true, 20 from new_cat
  union all
  select id, 'Tartare di gambero rosso', 'Red prawn tartare', null, null, null, null, 18, true, 30 from new_cat
  union all
  select id, 'Tartare di fassona con burrata e chips di zucchine e tartufo', 'Fassona beef tartare with burrata, crispy courgette and truffle', null, null, null, null, 22, true, 40 from new_cat
  union all
  select id, 'Ossobuco con tartare di manzo', 'Ossobuco with beef tartare', null, null, null, null, 18, true, 50 from new_cat
  union all
  select id, 'Capocollo e burrata', 'Capocollo and burrata', null, null, null, null, 15, true, 60 from new_cat
  union all
  select id, 'Carpaccio di Black Angus', 'Black Angus carpaccio', null, null, null, null, 15, true, 70 from new_cat
  union all
  select id, 'Carpaccio di salmone affumicato', 'Smoked salmon carpaccio', null, null, null, null, 15, true, 80 from new_cat;

-- categoria: Primi piatti
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Primi piatti', 'First courses', 90, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Tonnarelli cacio e pepe', 'Tonnarelli, pecorino and black pepper', null, null, null, null, 14, true, 0 from new_cat
  union all
  select id, 'Tonnarelli alla gricia e fave verdi', 'Tonnarelli alla gricia with green fava beans', null, null, null, null, 14, true, 10 from new_cat
  union all
  select id, 'Mezze maniche alla carbonara', 'Mezze maniche alla carbonara', null, null, null, null, 14, true, 20 from new_cat
  union all
  select id, 'Tonnarelli cacio e pepe tartufata', 'Tonnarelli cacio e pepe with fresh truffle', null, null, 'con tartufo fresco', 'with fresh truffle', 18, true, 30 from new_cat
  union all
  select id, 'Sagne ''ncannulate con ricotta forte', 'Sagne ''ncannulate with spicy aged ricotta', null, null, null, null, 12, true, 40 from new_cat
  union all
  select id, 'Ciceri e tria', 'Ciceri e tria (chickpeas and pasta)', null, null, null, null, 12, true, 50 from new_cat
  union all
  select id, 'Orecchiette con cime di rapa', 'Orecchiette with turnip tops', null, null, 'se di stagione', 'seasonal availability', 12, true, 60 from new_cat
  union all
  select id, 'Orecchiette al pomodoro', 'Orecchiette with tomato sauce', null, null, null, null, 10, true, 70 from new_cat
  union all
  select id, 'Orecchiette al ragù di cinghiale', 'Orecchiette with wild boar ragù', null, null, null, null, 18, true, 80 from new_cat
  union all
  select id, 'Orecchiette al ragù di cervo', 'Orecchiette with venison ragù', null, null, null, null, 18, true, 90 from new_cat
  union all
  select id, 'Orecchiette al ragù di capriolo', 'Orecchiette with roe deer ragù', null, null, null, null, 18, true, 100 from new_cat
  union all
  select id, 'Fregola con crema di zucchine e cozze', 'Fregola with courgette cream and mussels', null, null, null, null, 16, true, 110 from new_cat;

-- categoria: Secondi piatti
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Secondi piatti', 'Main courses', 100, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Polpette al sugo', 'Meatballs in tomato sauce', null, null, null, null, 12, true, 0 from new_cat
  union all
  select id, 'Grigliata di carne', 'Mixed grilled meat', null, null, null, null, 15, true, 10 from new_cat
  union all
  select id, 'Tagliata di Angus con rucola, pomodorini e grana', 'Angus tagliata with rocket, cherry tomatoes and grana cheese', null, null, null, null, 18, true, 20 from new_cat
  union all
  select id, 'Tagliata di pollo con rucola, pomodorini e grana', 'Chicken tagliata with rocket, cherry tomatoes and grana cheese', null, null, null, null, 15, true, 30 from new_cat
  union all
  select id, 'Arrosticini di pecora', 'Lamb skewers (arrosticini)', null, null, 'al pezzo, minimo 6 pezzi', 'per skewer, minimum 6', 1.5, true, 40 from new_cat;

-- categoria: Contorni
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Contorni', 'Side dishes', 110, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Verdure grigliate', 'Grilled vegetables', null, null, null, null, 8, true, 0 from new_cat
  union all
  select id, 'Insalata verde', 'Green salad', null, null, null, null, 6, true, 10 from new_cat
  union all
  select id, 'Patatine fritte', 'French fries', null, null, null, null, 5, true, 20 from new_cat
  union all
  select id, 'Insalata di pomodori', 'Tomato salad', null, null, null, null, 6, true, 30 from new_cat
  union all
  select id, 'Verdura di stagione', 'Seasonal vegetables', null, null, null, null, 6, true, 40 from new_cat;

-- categoria: Insalatone
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Insalatone', 'Large salads', 120, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Salmone', 'Salmon', 'insalata verde, rucola, salmone affumicato, mozzarella, mandorle a scaglie', 'green salad, rocket, smoked salmon, mozzarella, almond flakes', null, null, 12, true, 0 from new_cat
  union all
  select id, 'Vegetariana', 'Vegetarian', 'insalata verde, pomodoro ciliegino, melanzane grigliate, zucchine grigliate e mozzarella', 'green salad, cherry tomato, grilled aubergine, grilled courgette and mozzarella', null, null, null::numeric, true, 10 from new_cat
  union all
  select id, 'Crudaiola', 'Crudaiola', 'insalata verde, prosciutto crudo, grana a scaglie, mozzarella, pomodoro ciliegino e aceto di glassa balsamica', 'green salad, raw ham, grana flakes, mozzarella, cherry tomato and balsamic glaze', null, null, null::numeric, true, 20 from new_cat
  union all
  select id, 'Pollo', 'Chicken', 'insalata verde, sovraccoscia di pollo, rucola, melanzane grigliate, pomodori secchi e funghi champignon', 'green salad, chicken thigh, rocket, grilled aubergine, sun-dried tomatoes and button mushrooms', null, null, null::numeric, true, 30 from new_cat;

-- categoria: Dolci della casa
with new_cat as (
  insert into categories (name_it, name_en, sort_order, is_active)
  values ('Dolci della casa', 'House desserts', 130, true)
  returning id
)
insert into items (category_id, name_it, name_en, desc_it, desc_en, note_it, note_en, price, is_available, sort_order)
  select id, 'Crostata', 'Crostata (jam tart)', null, null, null, null, null::numeric, true, 0 from new_cat
  union all
  select id, 'Tiramisù', 'Tiramisù', null, null, null, null, null::numeric, true, 10 from new_cat
  union all
  select id, 'Cheesecake', 'Cheesecake', null, null, null, null, null::numeric, true, 20 from new_cat;
