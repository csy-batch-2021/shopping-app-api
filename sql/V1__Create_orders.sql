create table users ( id int(10) auto_increment , user_name varchar(50) not null, email varchar(50) not null, password varchar(100) not null, role varchar(50) not null, active int(10),
primary key (id),
unique (email),
CHECK(LENGTH(password) >= 8),
CHECK(role in ('USER','ADMIN')));

create table wallet (id int(10) auto_increment,user_id int(10) not null, balance int(50) not null,
primary key (id),
unique (user_id),
foreign key (user_id) references users(id),
CHECK(balance >= 0));

create table transactions (id int(10) auto_increment,user_id int(10) not null, qty int(10) not null,transactions int(10) not null,transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key (id),
foreign key (user_id) references users(id));

create table products ( 
 id int(10) auto_increment , name varchar(50) not null, brand_name varchar(50) not null, ram int(10) not null, price int(10) not null, active int(2) not null, created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, created_by int not null, modified_by int not null,
primary key (id),
unique (name),
foreign key (created_by) references users(id),
foreign key (modified_by) references users(id)
);
create table orders ( 
 id int(10) auto_increment , user_id int(10) not null, product_id int(50) not null, qty int(3) not null default 1 , total_amount int(10) not null, status varchar(10) not null default 'ORDERED' , created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, created_by int not null, modified_by int not null,
primary key (id),
foreign key (user_id) references users(id),
foreign key (product_id) references products(id),
foreign key (created_by) references users(id),
foreign key (modified_by) references users(id)
);