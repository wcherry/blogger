create schema blog;
use mysql;
CREATE USER 'blog' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON blog.* TO 'blog'@'%';

update user set plugin='mysql_native_password' where user='blog';
FLUSH PRIVILEGES;
	
use blog;

CREATE TABLE IF NOT EXISTS `users` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username varchar(50) NOT NULL,
	password varchar(128) NOT NULL,
	email_address varchar(255) NOT NULL,
	active BOOLEAN DEFAULT true,
    createdDate timestamp DEFAULT CURRENT_TIMESTAMP,
    updatedDate timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `posts` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255),
  body text,
  user_id int(11),  
  published BOOLEAN DEFAULT false,
  createdDate timestamp DEFAULT CURRENT_TIMESTAMP,
  updatedDate timestamp DEFAULT CURRENT_TIMESTAMP,
  publishedDate timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) references users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `comments` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	rating int(1) NOT NULL DEFAULT 5,
    body text,
	post_id int(11) NOT NULL,
	user_id int(11) NOT NULL,
    createdDate timestamp DEFAULT CURRENT_TIMESTAMP,
    updatedDate timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) references users(id),
    FOREIGN KEY (post_id) references posts(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



insert into users (username, password, email_address) values ('test','5f4dcc3b5aa765d61d8327deb882cf99','test@me.com');
	
