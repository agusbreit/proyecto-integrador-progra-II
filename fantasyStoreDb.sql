USE fantasyStore;

CREATE TABLE usuarios (
id int PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
nombreUsuario varchar(100) NOT NULL UNIQUE,
email varchar(150) NOT NULL UNIQUE,
contrasena varchar(150) NOT NULL,
nacimiento DATE,
documento INT,
imagen varchar(255),
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deletedAt DATETIME
) ;

CREATE TABLE productos (
id int PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
nombre varchar(150) NOT NULL,
imagen varchar(255),
descripcion varchar(300),
usuarioId INT,
FOREIGN KEY (usuarioId) REFERENCES usuarios(id),
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deletedAt DATETIME
) ;

CREATE TABLE seguidores (
id int PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
seguidorId INT,
FOREIGN KEY (seguidorId) REFERENCES usuarios(id), 
seguidoId INT,
FOREIGN KEY (seguidoId) REFERENCES usuarios(id),
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deletedAt DATETIME
); 

CREATE TABLE comentarios (
id int PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
comentario varchar(400) NOT NULL,
usuarioId INT,
FOREIGN KEY (usuarioId) REFERENCES usuarios(id), 
productoId INT,
FOREIGN KEY (productoId) REFERENCES productos(id),
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
deletedAt DATETIME
) ;
