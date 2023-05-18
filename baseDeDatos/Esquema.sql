drop database TaquillaVirtual;
create database TaquillaVirtual;
use TaquillaVirtual;

drop table if exists Localidad; 
drop table if exists TipoUsuarioPermitido; 
drop table if exists ParticipantesEspectaculo; 
drop table if exists Evento; 
drop table if exists LocalidadesOfertadas; 
drop table if exists LocalidadesVendidas; 
drop table if exists Compra; 
drop table if exists Espectaculo; 
drop table if exists Recinto; 
drop table if exists Usuario; 
drop table if exists Cliente; 


create table Espectaculo(
    NombreEspectaculo varchar(100),
    TipoEspectaculo varchar(20),
    PRIMARY key(NombreEspectaculo)
);

create table TipoUsuarioPermitido(
    TipoUsuario ENUM ('Adulto','Parado','Jubilado','Infantil'),
    NombreEspectaculo varchar(100),
    PRIMARY key (NombreEspectaculo,TipoUsuario),
    FOREIGN key (NombreEspectaculo) REFERENCES Espectaculo(NombreEspectaculo)
);

create table ParticipantesEspectaculo(
    NombreParticipante varchar(50),
    NombreEspectaculo varchar(100),
    PRIMARY key (NombreParticipante,NombreEspectaculo),
    FOREIGN key (NombreEspectaculo) REFERENCES Espectaculo(NombreEspectaculo)
);

create table Recinto(
    NombreRecinto varchar(100),
    Lugar varchar(25),
    CapacidadMaxima int,
    PRIMARY key(NombreRecinto,Lugar)
);

create table Localidad( 
    Ubicacion int,
    Deteriorado int,
    NombreRecinto varchar(100),
    Lugar varchar(25),
    PRIMARY key (Ubicacion,NombreRecinto,Lugar),
    FOREIGN key (NombreRecinto,Lugar) REFERENCES Recinto(NombreRecinto,Lugar)
);

create table Usuario(
    TipoUsuario ENUM ('Adulto','Parado','Jubilado','Infantil'),
    PRIMARY key(TipoUsuario)
);

create table Cliente(
    DatosBancarios varchar(50),
    DNI char(9),
    NombreCliente varchar(50),
    PrimerApellido varchar(50),
    Edad int,
    PRIMARY key(DatosBancarios)
);


create table Evento(
    FechaEvento datetime,
    Estado varchar(20) DEFAULT 'Abierto',
    Aforo int,
    NombreEspectaculo varchar(100),
    NombreRecinto varchar(100),
    Lugar varchar(25),
    PrecioBase int,
    PRIMARY key (NombreEspectaculo,NombreRecinto,FechaEvento),
    FOREIGN key (NombreEspectaculo) REFERENCES Espectaculo(NombreEspectaculo),
    FOREIGN key (NombreRecinto,Lugar) REFERENCES Recinto(NombreRecinto,Lugar)
); 

create table LocalidadesOfertadas(
    Precio int NOT NULL,
    TipoUsuario ENUM ('Adulto','Parado','Jubilado','Infantil'),
    Ubicacion int,
    NombreRecinto varchar(100),
    Lugar varchar(25),
    NombreEspectaculo varchar(100),
    FechaEvento datetime,
    PRIMARY key (Ubicacion,TipoUsuario,NombreEspectaculo,NombreRecinto,Lugar,FechaEvento),
    FOREIGN key (Ubicacion) REFERENCES Localidad(Ubicacion),
    FOREIGN key (TipoUsuario) REFERENCES Usuario(TipoUsuario),
    FOREIGN key (NombreRecinto,Lugar,NombreEspectaculo,FechaEvento) REFERENCES Evento(NombreRecinto,Lugar,NombreEspectaculo,FechaEvento)
);

create table Compra(
    DatosBancarios varchar(50),
    DNI char(9),
    NombreCliente varchar(50),
    PrimerApellido varchar(50),
    Edad int,
    FechaCompra datetime DEFAULT NOW(),
    TipoUsuario ENUM ('Adulto','Parado','Jubilado','Infantil'),
    Ubicacion int,
    NombreRecinto varchar(100),
    Lugar varchar(25),
    NombreEspectaculo varchar(100),
    FechaEvento datetime,
    PRIMARY key (Ubicacion,TipoUsuario,NombreEspectaculo,NombreRecinto,Lugar,FechaEvento,DatosBancarios),
    FOREIGN key (Ubicacion,TipoUsuario,NombreEspectaculo,NombreRecinto,Lugar,FechaEvento) REFERENCES LocalidadesOfertadas(Ubicacion,TipoUsuario,NombreEspectaculo,NombreRecinto,Lugar,FechaEvento)
);

create table LocalidadesVendidas(
    TipoUsuario ENUM ('Adulto','Parado','Jubilado','Infantil'),
    Ubicacion int,
    NombreRecinto varchar(100),
    Lugar varchar(25),
    NombreEspectaculo varchar(100),
    FechaEvento datetime,
    PRIMARY key (Ubicacion,TipoUsuario,NombreEspectaculo,NombreRecinto,Lugar,FechaEvento),
    FOREIGN key (Ubicacion,TipoUsuario,NombreEspectaculo,NombreRecinto,Lugar,FechaEvento) REFERENCES Compra(Ubicacion,TipoUsuario,NombreEspectaculo,NombreRecinto,Lugar,FechaEvento)
);

CREATE INDEX idx_datos_bancarios ON Compra (DatosBancarios);
CREATE INDEX idx_lugar ON Evento (Lugar);
CREATE INDEX idx_espectaculo ON Evento (NombreEspectaculo);
CREATE INDEX idx_localidadesofertadas_precio_tipo_lugar ON LocalidadesOfertadas (Precio, TipoUsuario, Lugar);