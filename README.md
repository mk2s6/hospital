# HOSPITAL MANAGEMENT

# Downloading file using GIT:
1. Open command prompt(if windows)/ terminal(if linux/iOS).
2. Download files using **git clone https://github.com/mk2s6/hospital.git** command.
3. Now hospital folder will be created. use **cd hospital** to get into the hospital folder.

# Backend Schemas(MySql): 
# schema for users table:
          CREATE TABLE `users` (
          `username` varchar(12) NOT NULL,
          `password` binary(60) NOT NULL,
          PRIMARY KEY (`username`),
          UNIQUE KEY `id_UNIQUE` (`username`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='	';
# schema for patients table:
        CREATE TABLE `patients` (
          `pid` int(6) NOT NULL AUTO_INCREMENT,
          `pname` varchar(45) NOT NULL,
          `pgender` varchar(6) NOT NULL,
          `page` int(2) NOT NULL,
          `regDate` datetime NOT NULL,
          `noV` int(2) NOT NULL DEFAULT '0',
          `status` varchar(80) NOT NULL DEFAULT 'Just Registerd',
          PRIMARY KEY (`pid`)
        ) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
# Create and updtae **.env** file:
1.create a **.env** file and update the environment(database, server port) credentials from .env.default file
2. update **.env** file as below:

		DB_HOST= localhost (database host address)
		DB_USER= root(user of database)
		DB_PASSWORD= *********** (password to access a database)
		DB_NAME= hospital (database name)
		SERVER_PORT= 4200
		
		
		
		
# Installing and starting the server.
1. To install node modules use **npm install** command.
2. To start the server use **npm start** command
