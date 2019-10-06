create database grubHub;
use grubHub;
show tables;

-- CREATE TABLE ownerTable(
-- 	ownerId INT NOT NULL AUTO_INCREMENT,
-- 	ownerName VARCHAR(100) NOT NULL,
-- 	ownerEmailId VARCHAR(40) NOT NULL,
-- 	ownerPassword VARCHAR(100) NOT NULL,
-- 	restaurentName VARCHAR(40) NOT NULL,
--     zipcode int(5) NOT NULL,
-- 	cuisine VARCHAR(40) NOT NULL,
--     phoneNumber int(10) NOT NULL,
-- 	PRIMARY KEY ( ownerId)); 
    
-- CREATE TABLE buyerTable(
-- 	buyerId INT NOT NULL AUTO_INCREMENT,
-- 	buyerName VARCHAR(100) NOT NULL,
-- 	buyerEmailId VARCHAR(40) NOT NULL,
-- 	buyerPassword VARCHAR(100) NOT NULL,
--     Address VARCHAR(200),
--     phoneNumber int(15) NOT NULL,
-- 	PRIMARY KEY ( buyerId));
    
-- select * from ownerTable;
-- select * from buyerTable;

-- ALTER TABLE buyerTable CHANGE buyerEmailId emailId varchar(50);
-- ALTER TABLE buyerTable CHANGE buyerPassword userPassword varchar(50);


-- ALTER TABLE ownerTable CHANGE ownerEMailId emailId varchar(50);
-- ALTER TABLE ownerTable CHANGE ownerPassword userPassword varchar(50);

-- ALTER TABLE buyerTable CHANGE phoneNumber phoneNumber int(50);

-- select *
-- from buyerTable
-- where emailId = 'admin' and userPassword = 'd033e22ae348aeb5660fc2140aec35850c4da997';

-- Delete from buyerTable
-- Limit 10;

-- Delete from ownerTable
-- Limit 10;

-- UPDATE buyerTable SET buyerName = "keerthi", phonenumber = 1234, Address = "hyderabad"
--             WHERE buyerId = 36;

-- ALTER TABLE buyerTable DROP phoneNumber;

-- select * from buyerTable;

-- ALTER TABLE buyerTable
-- ADD phoneNumber int(20);

-- ALTER TABLE ownerTable DROP zipcode;

-- select * from ownerTable;

-- ALTER TABLE ownerTable
-- ADD Address varchar(255);

-- ALTER TABLE ownerTable DROP phoneNumber;

-- select * from ownerTable;

-- ALTER TABLE ownerTable
-- ADD phoneNumber int(20);

-- ALTER TABLE ownerTable
-- ADD image varchar(200);

-- ALTER TABLE buyerTable
-- ADD image varchar(200);

-- ALTER TABLE buyerTable CHANGE buyerId id INT NOT NULL AUTO_INCREMENT;

-- ALTER TABLE ownerTable CHANGE ownerId id INT NOT NULL AUTO_INCREMENT;

-- ALTER TABLE ownerTable CHANGE ownerEMailId emailId varchar(50);



CREATE TABLE restaurantTable(
	restaurantId INT NOT NULL AUTO_INCREMENT,
	restaurantName VARCHAR(100) NOT NULL,
	restaurantEmailId VARCHAR(40) NOT NULL,
	restaurantPassword VARCHAR(100) NOT NULL,
    restaurantAddress VARCHAR(50) NOT NULL,
	restaurantCuisine VARCHAR(40) NOT NULL,
    restaurantPhone INT(15) NOT NULL,
	restaurantImage VARCHAR(50),
	PRIMARY KEY (restaurantId)
); 
    
CREATE TABLE buyerTable(
	buyerId INT NOT NULL AUTO_INCREMENT,
	buyerName VARCHAR(100) NOT NULL,
	buyerEmailId VARCHAR(40) NOT NULL,
	buyerPassword VARCHAR(100) NOT NULL,
    buyerAddress VARCHAR(200),
    buyerPhone INT(15) NOT NULL,
	buyerImage VARCHAR(50),
	PRIMARY KEY (buyerId)
);

/* 
    * Contains information about orders
    * To which restaurant this order is for ?
    * Who ordered this ? 
    * Where is the order to be delivered ?
    * a foreign key that points to a table which has information on all food-items ordered as part of this 
    * status of order 
    *
    * Buyer Updates this table when order is placed. 
    */
CREATE TABLE restaurantOrderTable(
    restaurantEmailId VARCHAR(40) NOT NULL,
	restaurantId VARCHAR(40) NOT NULL,
    buyerEmailId VARCHAR(40) NOT NULL,
    buyerName VARCHAR(40) NOT NULL,
    buyerAddress VARCHAR(100) NOT NULL,
    uniqueOrderId INT NOT NULL AUTO_INCREMENT,
    restaurantOrderStatus ENUM('New', 'Preparing', 'Ready', 'Delivered'),
    PRIMARY KEY(uniqueOrderId)
);


/*
    * Every Order has an unique ID that restaurantOrderTable generates.
    * This unique ID (uniqueOrderId) can be used to get information from restaurant
    * Also, this unique ID can be used by buyer to get information on order. 
    * This ID can be mapped to multiple food-items which were part of this order in orderItemInfoTable
    */
CREATE TABLE buyerOrderTable(
    uniqueOrderId INT NOT NULL,
    buyerEmailId VARCHAR(100) NOT NULL,
    buyerOrderStatus ENUM('Past', 'Upcoming', 'Rejected'),
    PRIMARY KEY(uniqueOrderId) /* This key points to exact same order in restaurant's order table */
);


/*
    * Use uniqueOrderId from above operation and add 
    * multiple food-items ordered as part of this order and map them all
    * to uniqueOrderId
    *
    * Using uniqueOrderId, we can identify all the items that part of this order.
    */
CREATE TABLE orderItemInfoTable(
    orderItemId INT NOT NULL AUTO_INCREMENT,
    uniqueOrderId INT NOT NULL,
    itemId INT NOT NULL,
    itemName VARCHAR(100) NOT NULL,
    itemQuantity int(5) NOT NULL,
    itemTotalPrice float(5) NOT NULL,
    PRIMARY KEY(orderItemId)
);

CREATE TABLE restaurantMenuTable(
    menuItemId INT NOT NULL AUTO_INCREMENT,
    menuItemName VARCHAR(100) NOT NULL,
    menuItemDesc VARCHAR(100) NOT NULL,
    menuItemImage BLOB,
    menuItemPrice float(5) NOT NULL,
    menuItemSection ENUM('Lunch', 'Appetizers', 'Breakfast'),
    menuItemCuisine VARCHAR(100) NOT NULL,
    restaurantId INT NOT NULL, /* This points to which restaurant i.e., Restaurant this menu Item belongs to */
    PRIMARY KEY(menuItemId),
);

/*
    * Based on which sections are available for a restaurantOwner, those particular columns will have TRUE.
    * If a menu Item is added and it happens to be first item in section, SectionTable should be updated to have that section flag set to 'true'  
*/
CREATE TABLE restaurantSectionTable(
    sectionId INT NOT NULL AUTO_INCREMENT,
    restaurantId INT NOT NULL,
    lunchSection BOOLEAN NOT NULL,
    appetizerSection BOOLEAN NOT NULL,
    breakfastSection BOOLEAN NOT NULL,
    PRIMARY KEY (sectionId)
);

-- END OF TABLE CREATION

-- Section Table 
-- INSERT INTO restaurantSectionTable SET 
-- 				lunchSection = true,
--                 breakfastSection = true,
--                 appetizerSection = false,
--                 restaurantId = 1;


-- -- Restaurant Table
-- /**
-- * Create Two Retaurants
-- */
-- INSERT INTO restaurantTable SET 
-- 	restaurantName = "Dusita Thai",
-- 	restaurantEmailId = "dusita_thai@gmail.com",
-- 	restaurantPassword = "dusita",
--     zipcode = 94086,
-- 	cuisine = "Thai",
--     phoneNumber = 6307797555
--     ;

-- INSERT INTO restaurantTable SET 
-- 	restaurantName = "Universal Foods",
-- 	restaurantEmailId = "universal_foods@gmail.com",
-- 	restaurantPassword = "uvfoods",
--     zipcode = 94087,
-- 	cuisine = "All",
--     phoneNumber = 9490754166
--     ;



-- -- restaurant Menu Table
-- /**
--     *Insert into restaurantMenuTable
-- */
-- INSERT INTO restaurantMenuTable SET 
--             menuItemName = 'Marinara Pizza',
--             menuItemDesc = 'Pizza with Parmesan, Cheddar Cheese and Marinara Sauce on Top',
--             menuItemPrice = 13.99,
--             menuItemSection = 'Lunch',
--             restaurantId = 1,
--             menuItemCuisine = "Italian"
--             ;

-- INSERT INTO restaurantMenuTable SET 
--             menuItemName = 'Garden Veggie Pizza',
--             menuItemDesc = 'Pizza with Parmesan, Cheddar Cheese, Broccoli, Olives and Pesto Sauce on Top',
--             menuItemPrice = 16.99,
--             menuItemSection = 'Lunch',
--             restaurantId = 1,
--             menuItemCuisine = "Italian"
--             ;

-- INSERT INTO restaurantMenuTable SET 
--             menuItemName = 'Phad Thai',
--             menuItemDesc = 'phad thai is a stir-fried rice noodle dish commonly served as a street food',
--             menuItemPrice = 11.99,
--             menuItemSection = 'Lunch',
--             restaurantId = 1,
--             menuItemCuisine = "Thai"
--             ;

-- INSERT INTO restaurantMenuTable SET 
--             menuItemName = 'Phad Thai',
--             menuItemDesc = 'phad thai is a stir-fried rice noodle dish commonly served as a street food',
--             menuItemPrice = 14.99,
--             menuItemSection = 'Lunch',
--             restaurantId = 2,
--             menuItemCuisine = "Thai"
--             ;

-- INSERT INTO restaurantMenuTable SET 
--             menuItemName = 'Vegetarian Biryani',
--             menuItemDesc = 'Soft Basmati Rice cooked in Pot with vegetables and spices. Specialty from India!',
--             menuItemPrice = 12.99,
--             menuItemSection = 'Lunch',
--             restaurantId = 1,
--             menuItemCuisine = "Indian"
--             ;

-- INSERT INTO restaurantMenuTable SET 
--             menuItemName = 'Eggwich With Cheese Bagel',
--             menuItemDesc = 'Bagel with cheese of choice and half-boiled egg yolk',
--             menuItemPrice = 4.99,
--             menuItemSection = 'Breakfast',
--             restaurantId = 1,
--             menuItemCuisine = "American"
--             ;

-- INSERT INTO restaurantMenuTable SET 
--             menuItemName = 'Pancake',
--             menuItemDesc = 'Needs no introduction. Fulfilling breakfast for years',
--             menuItemPrice = 9.99,
--             menuItemSection = 'Breakfast',
--             restaurantId = 1,
--             menuItemCuisine = "American"
--             ;                                                

-- select * from restaurantTable;
-- select * from buyerTable;