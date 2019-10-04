create database grubHub;
use grubHub;
show tables;

CREATE TABLE ownerTable(
	ownerId INT NOT NULL AUTO_INCREMENT,
	ownerName VARCHAR(100) NOT NULL,
	ownerEmailId VARCHAR(40) NOT NULL,
	ownerPassword VARCHAR(100) NOT NULL,
	restaurentName VARCHAR(40) NOT NULL,
    zipcode int(5) NOT NULL,
	cuisine VARCHAR(40) NOT NULL,
    phoneNumber int(10) NOT NULL,
	PRIMARY KEY ( ownerId)); 
    
CREATE TABLE buyerTable(
	buyerId INT NOT NULL AUTO_INCREMENT,
	buyerName VARCHAR(100) NOT NULL,
	buyerEmailId VARCHAR(40) NOT NULL,
	buyerPassword VARCHAR(100) NOT NULL,
    Address VARCHAR(200),
    phoneNumber int(15) NOT NULL,
	PRIMARY KEY ( buyerId));
    
select * from ownerTable;
select * from buyerTable;

ALTER TABLE buyerTable CHANGE buyerEmailId emailId varchar(50);
ALTER TABLE buyerTable CHANGE buyerPassword userPassword varchar(50);


ALTER TABLE ownerTable CHANGE ownerEMailId emailId varchar(50);
ALTER TABLE ownerTable CHANGE ownerPassword userPassword varchar(50);

ALTER TABLE buyerTable CHANGE phoneNumber phoneNumber int(50);

select *
from buyerTable
where emailId = 'admin' and userPassword = 'd033e22ae348aeb5660fc2140aec35850c4da997';

Delete from buyerTable
Limit 10;

Delete from ownerTable
Limit 10;

UPDATE buyerTable SET buyerName = "keerthi", phonenumber = 1234, Address = "hyderabad"
            WHERE buyerId = 36;

ALTER TABLE buyerTable DROP phoneNumber;

select * from buyerTable;

ALTER TABLE buyerTable
ADD phoneNumber int(20);

ALTER TABLE ownerTable DROP zipcode;

select * from ownerTable;

ALTER TABLE ownerTable
ADD Address varchar(255);

ALTER TABLE ownerTable DROP phoneNumber;

select * from ownerTable;

ALTER TABLE ownerTable
ADD phoneNumber int(20);