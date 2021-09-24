-- Master Tables
/**
create table users(
  id int not null primary key unique auto_increment,
  name varchar(255) not null,
  password varchar(255) not null,
  description varchar(255),
  icon_url varchar(255),
  create_at datetime default current_timestamp,
  update_at datetime default current_timestamp on update current_timestamp
);
*/

create table messages_groups(
  id int not null primary key unique auto_increment,
  name varchar(255) not null,
  description varchar(255),
  icon_url varchar(255),
  create_at datetime default current_timestamp,
  update_at datetime default current_timestamp on update current_timestamp
);

-- Transaction Tables
create table chat_messages(
  id int not null primary key unique auto_increment,
  user_id int not null,
  group_id int not null,
  content text not null,
  create_at datetime default current_timestamp,
  update_at datetime default current_timestamp on update current_timestamp
);
