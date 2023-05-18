use TaquillaVirtual;

DELIMITER //

/* No superar el aforo máximo de un Recinto */

DROP TRIGGER IF EXISTS aforoMaximoRecinto;

CREATE TRIGGER aforoMaximoRecinto BEFORE INSERT ON Localidad FOR EACH ROW
BEGIN

    DECLARE numLocalidades int;
    DECLARE capMaxima int;
    DECLARE MESSAGE_TEXT varchar(200);

    SELECT count(*) INTO numLocalidades from Localidad 
    WHERE NombreRecinto = NEW.NombreRecinto AND Lugar = NEW.Lugar;
    
    SELECT CapacidadMaxima INTO capMaxima from Recinto
    WHERE NombreRecinto = NEW.NombreRecinto AND Lugar = NEW.Lugar;
    
    IF(numLocalidades>=capMaxima) THEN
        SIGNAL SQLSTATE '45000';
        SET MESSAGE_TEXT = CONCAT('Se ha alcanzado el límite máximo Localidades para ',NEW.NombreRecinto,' en ',NEW.Lugar);
    END IF;

END //

DELIMITER ;

/* Nueva compra */

DELIMITER //

DROP TRIGGER IF EXISTS nuevaCompra;

CREATE TRIGGER nuevaCompra AFTER INSERT ON Compra FOR EACH ROW
BEGIN

    DECLARE localidadVendidas INT; 
    DECLARE deteriorado INT;
    DECLARE MESSAGE_TEXT varchar(200);
    DECLARE estado varchar(20);
    DECLARE existe int;
    
    SELECT COUNT(*) INTO localidadVendidas FROM LocalidadesVendidas 
    WHERE NombreRecinto = NEW.NombreRecinto 
    AND Lugar = NEW.Lugar
    AND NombreEspectaculo = NEW.NombreEspectaculo
    AND FechaEvento = NEW.FechaEvento
    AND Ubicacion = NEW.Ubicacion;
    
    SELECT Estado into estado from Evento
    WHERE NombreEspectaculo=NEW.NombreEspectaculo and
    NombreRecinto=NEW.NombreRecinto and
    Lugar=NEW.Lugar and
    FechaEvento=NEW.FechaEvento;
    
    IF (localidadVendidas != 0) THEN
        SIGNAL SQLSTATE '45000';
        SET MESSAGE_TEXT = CONCAT('La localidad ',NEW.Ubicacion,' para ',NEW.NombreEspectaculo,' en ',NEW.NombreRecinto,' el día ',NEW.FechaEvento,' ya está vendida');
    ELSEIF (estado != 'Abierto') THEN
        SIGNAL SQLSTATE '45000';
        SET MESSAGE_TEXT = CONCAT('El evento para el espectáculo ',NEW.NombreEspectaculo,' en ',NEW.NombreRecinto,' el día ',NEW.FechaEvento,' no está Abierto');
    ELSE
        SELECT Deteriorado INTO deteriorado FROM Localidad
        WHERE Localidad.Lugar = NEW.Lugar
        AND Localidad.NombreRecinto = NEW.NombreRecinto
        AND Localidad.Ubicacion = NEW.Ubicacion;

        IF(deteriorado = 1) THEN
            SIGNAL SQLSTATE '45000';
            SET MESSAGE_TEXT =  CONCAT('La localidad ',NEW.Ubicacion,' en ',NEW.NombreRecinto,' está deteriorada');
        ELSE
            INSERT INTO LocalidadesVendidas (TipoUsuario,Ubicacion,NombreRecinto,Lugar,NombreEspectaculo,FechaEvento) VALUES (NEW.TipoUsuario,NEW.Ubicacion,NEW.NombreRecinto,NEW.Lugar,NEW.NombreEspectaculo,NEW.FechaEvento);    
            SELECT COUNT(*) INTO existe from Cliente WHERE
            DatosBancarios = NEW.DatosBancarios;
            IF (existe = 0) THEN
                INSERT INTO Cliente (DatosBancarios,DNI,NombreCliente,PrimerApellido,Edad) VALUES (NEW.DatosBancarios,NEW.DNI,NEW.NombreCliente,NEW.PrimerApellido,NEW.Edad);
            END IF;
        END IF;
    END IF;
    
END //

DELIMITER ;

/* Estado cerrado */

DELIMITER //

DROP TRIGGER IF EXISTS estadoCerrado;

CREATE TRIGGER estadoCerrado AFTER INSERT ON LocalidadesVendidas FOR EACH ROW
BEGIN

    DECLARE aforomaximo INT;
    DECLARE localidadesVendidas INT; 
    DECLARE MESSAGE_TEXT varchar(200);
    
    SELECT COUNT(*) INTO localidadesVendidas FROM LocalidadesVendidas 
    WHERE NombreRecinto = NEW.NombreRecinto 
    AND Lugar = NEW.Lugar
    AND NombreEspectaculo = NEW.NombreEspectaculo
    AND FechaEvento = NEW.FechaEvento;
    
    SELECT Aforo INTO aforomaximo from Evento 
    WHERE NombreEspectaculo=NEW.NombreEspectaculo and
    NombreRecinto=NEW.NombreRecinto and
    Lugar=NEW.Lugar and
    FechaEvento=NEW.FechaEvento;
    
    IF (localidadesVendidas=aforomaximo) THEN
        UPDATE Evento SET Estado='Cerrado' 
        WHERE NombreEspectaculo=NEW.NombreEspectaculo and
        NombreRecinto=NEW.NombreRecinto and
        Lugar=NEW.Lugar and
        FechaEvento=NEW.FechaEvento;
    END IF;
    
END //

DELIMITER ; 

/* No superar el máximo de comparadas para un Espectáculo de un cliente */

DELIMITER //

DROP TRIGGER IF EXISTS maximoCompraPorCliente;

CREATE TRIGGER maximoCompraPorCliente BEFORE INSERT ON Compra FOR EACH ROW
BEGIN

    DECLARE numCompradas INT; 
    DECLARE MESSAGE_TEXT varchar(200);

    
    SELECT COUNT(*) INTO numCompradas FROM Compra 
    WHERE NombreRecinto = NEW.NombreRecinto 
    AND Lugar = NEW.Lugar
    AND NombreEspectaculo = NEW.NombreEspectaculo
    AND FechaEvento = NEW.FechaEvento
    AND DatosBancarios = NEW.DatosBancarios;

    IF (numCompradas = 11) THEN
        SIGNAL SQLSTATE '45000';
        SET MESSAGE_TEXT = CONCAT('El cliente con Datos Bancarios = ',NEW.DatosBancarios,' ya ha llegado al máximo de entradas compradas para ',NEW.NombreEspectaculo);
    END IF;
    
END //

DELIMITER ;

/* Creamos las Localidades al crear un Recinto */

DELIMITER //

DROP TRIGGER IF EXISTS nuevoRecinto;

CREATE TRIGGER nuevoRecinto AFTER INSERT ON Recinto FOR EACH ROW
BEGIN

    DECLARE aforo INT;
    DECLARE i INT;


    SET aforo = NEW.CapacidadMaxima;
    SET i = 1;

    WHILE i <= aforo DO
        INSERT INTO Localidad (Ubicacion, Deteriorado,NombreRecinto,Lugar)
        VALUES (i,0,NEW.NombreRecinto,NEW.Lugar);
        SET i = i + 1;
    END WHILE;

END //

DELIMITER ;

/* Tipo de usuarios permitidos */

DELIMITER //

DROP TRIGGER IF EXISTS tiposDeUsuariosPermitidos;

CREATE TRIGGER tiposDeUsuariosPermitidos BEFORE INSERT ON LocalidadesOfertadas FOR EACH ROW
BEGIN

    DECLARE tipo_usuario_permitido INT; 
    DECLARE MESSAGE_TEXT varchar(200);
    
    SELECT COUNT(*) INTO tipo_usuario_permitido FROM TipoUsuarioPermitido 
    WHERE NombreEspectaculo = NEW.NombreEspectaculo 
    AND TipoUsuario = NEW.TipoUsuario;

    IF (tipo_usuario_permitido = 0) THEN
        SIGNAL SQLSTATE '45000';
        SET MESSAGE_TEXT = CONCAT('El tipo de usuario no está permitido para este espectáculo');
    END IF;
END //

DELIMITER ;

/* Nuevo Evento, creamos las Localidades Ofertadas */

DELIMITER //

DROP TRIGGER IF EXISTS nuevoEvento;

CREATE TRIGGER nuevoEvento AFTER INSERT ON Evento FOR EACH ROW
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE tipo_user_aux varchar(25);
    DECLARE i int;
    DECLARE precio int;
    DECLARE eventPassed BOOLEAN DEFAULT FALSE;
    DECLARE aforo int;
    DECLARE cap int;
    
    DECLARE usuariosPermitidos CURSOR FOR 
    SELECT TipoUsuario FROM TipoUsuarioPermitido 
    WHERE NombreEspectaculo = NEW.NombreEspectaculo;
    

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    SELECT CapacidadMaxima into cap from Recinto
    WHERE NombreRecinto = NEW.NombreRecinto AND Lugar = NEW.Lugar;

    IF NEW.FechaEvento < CURDATE() THEN
        SET eventPassed = TRUE;
    END IF;


    SET aforo = NEW.Aforo;

    IF aforo > cap THEN
        SIGNAL SQLSTATE '45000';
    END IF;
    
    OPEN usuariosPermitidos;

    bucle: LOOP
        FETCH usuariosPermitidos INTO tipo_user_aux;
        IF done THEN
            LEAVE bucle;
        END IF;

        IF (tipo_user_aux ='Adulto') THEN
            SET precio = NEW.PrecioBase;
        ELSEIF (tipo_user_aux = 'Parado') THEN
            SET precio = NEW.PrecioBase * 0.8;
        ELSEIF (tipo_user_aux = 'Infantil') THEN
            SET precio = NEW.PrecioBase * 0.6;
        ELSEIF (tipo_user_aux = 'Jubilado') THEN
            SET precio = NEW.PrecioBase * 0.7;
        END IF;

        SET i = 1;
        
        WHILE (i <= aforo) DO
            INSERT INTO LocalidadesOfertadas (Precio, TipoUsuario, Ubicacion, NombreRecinto, Lugar, NombreEspectaculo, FechaEvento)
            VALUES (precio, tipo_user_aux, i, NEW.NombreRecinto, NEW.Lugar, NEW.NombreEspectaculo, NEW.FechaEvento);
            SET i = i + 1;
        END WHILE;
    END LOOP;

    CLOSE usuariosPermitidos;

    IF eventPassed THEN
        UPDATE Evento
        SET Estado = 'Finalizado'
        WHERE NombreEspectaculo = NEW.NombreEspectaculo
        AND NombreRecinto = NEW.NombreRecinto
        AND Lugar = NEW.Lugar
        AND FechaEvento = NEW.FechaEvento;
    END IF;

END //

DELIMITER ;
