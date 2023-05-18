USE TaquillaVirtual;

/* Anular una compra */
SET @session_variable = NULL; 
DELIMITER //

DROP PROCEDURE IF EXISTS DeleteCompraAndLocalidadesVendidas;

CREATE PROCEDURE DeleteCompraAndLocalidadesVendidas(
    IN datosBanc varchar(50),
    IN nombreEspect varchar(100),
    IN ubic int,
    IN nombreRec varchar(100),
    IN fechaEve datetime,
    IN lug varchar(25)
)
BEGIN
    DECLARE fechaMañana datetime;
    DECLARE MESSAGE_TEXT varchar(200);
    DECLARE estado varchar(20);
    DECLARE valorActual VARCHAR(255);
    

    SET fechaMañana = CURDATE() + INTERVAL 1 DAY;

    IF fechaEve >= fechaMañana THEN
     
        DELETE FROM LocalidadesVendidas
        WHERE NombreEspectaculo = nombreEspect
          AND Ubicacion = ubic
          AND NombreRecinto = nombreRec
          AND FechaEvento = fechaEve
          AND Lugar = lug;

        DELETE FROM Compra
        WHERE DatosBancarios = datosBanc
          AND NombreEspectaculo = nombreEspect
          AND Ubicacion = ubic
          AND NombreRecinto = nombreRec
          AND FechaEvento = fechaEve
          AND Lugar = lug;

        SELECT Estado into estado FROM Evento
        WHERE NombreEspectaculo= nombreEspect
        AND Lugar = lug
        AND NombreRecinto = nombreRec
        AND FechaEvento = fechaEve;

        IF estado = 'Cerrado' THEN  
            UPDATE Evento
            SET Estado = 'Abierto'
            WHERE NombreEspectaculo = nombreEspect
            AND NombreRecinto = nombreRec
            AND Lugar = lug
            AND FechaEvento = fechaEve;
        END IF;

    IF @session_variable IS NULL THEN
        SET @session_variable = datosBanc;
    ELSE
        SELECT @session_variable INTO valorActual;
        SET @session_variable =  CONCAT(valorActual,' , ',datosBanc);
    
    END IF;
    ELSE
        SIGNAL SQLSTATE '45000';
        SET MESSAGE_TEXT = CONCAT('Deletion not allowed for events happening tomorrow or closer.');
    END IF;
END //

DELIMITER ;

/* Comprar una entrada */
DELIMITER //

DROP PROCEDURE IF EXISTS comprarEntrada; 

CREATE PROCEDURE comprarEntrada(IN datosbancarios varchar(20), IN dni char(9), IN nombrecliente varchar(50), IN primerapellido varchar(50), IN edad int, IN tipo varchar(20), IN ubi int, IN nombrerec varchar(100), IN lugar varchar(25), IN nombreespec varchar(100), IN fechaEvento datetime)
BEGIN
    INSERT INTO Compra (DatosBancarios,DNI,NombreCliente,PrimerApellido,Edad,TipoUsuario,Ubicacion,NombreRecinto,Lugar,NombreEspectaculo,FechaEvento) 
    VALUES (datosbancarios,dni,nombrecliente,primerapellido,edad,tipo,ubi,nombrerec,lugar,nombreespec,fechaEvento);

END //

DELIMITER ;

/* Todos los espectaculos */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEspectaculos;

CREATE PROCEDURE listarEspectaculos()
BEGIN
    SELECT * FROM Espectaculo;

END //

DELIMITER ;

/* Espectaculos para un numero de Usuarios */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEspectaculosParaNumUsuario;

CREATE PROCEDURE listarEspectaculosParaNumUsuario(IN numeroUsuarios int)
BEGIN
    SELECT NombreEspectaculo, count(NombreEspectaculo) AS numUsuarios FROM TipoUsuarioPermitido  
    GROUP BY NombreEspectaculo HAVING numUsuarios=numeroUsuarios;
    
END //

DELIMITER ;

/* Espectaculos para un tipo de Usuarios */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEspectaculosParaTipo; 

CREATE PROCEDURE listarEspectaculosParaTipo(IN tipo varchar(20))
BEGIN
    SELECT * FROM Espectaculo INNER JOIN TipoUsuarioPermitido
    ON Espectaculo.NombreEspectaculo=TipoUsuarioPermitido.NombreEspectaculo
    WHERE TipoUsuarioPermitido.TipoUsuario=tipo;

END //

DELIMITER ;

/* Todos los eventos */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventos;

CREATE PROCEDURE listarEventos()
BEGIN
    SELECT * FROM Evento;

END //

DELIMITER ;

/* Eventos con aforo mayor que el insertado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosAforoMayorQ;

CREATE PROCEDURE listarEventosAforoMayorQ(IN max int)
BEGIN
    SELECT * FROM Evento WHERE Aforo>max;

END //

DELIMITER ;

/* Eventos que usen la maxima capacidad de un recinto */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosAforoRecinto;

CREATE PROCEDURE listarEventosAforoRecinto()
BEGIN
    SELECT * FROM Evento INNER JOIN Recinto
    ON Evento.Aforo=Recinto.CapacidadMaxima;

END //

DELIMITER ;

/* Eventos de un estado determinado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosEstado;

CREATE PROCEDURE listarEventosEstado(IN est varchar(20))
BEGIN
    SELECT * FROM Evento WHERE Estado=est;

END //

DELIMITER ;

/* Eventos de un lugar determinado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosLugar;

CREATE PROCEDURE listarEventosLugar(IN lugar varchar(50))
BEGIN
    SELECT * FROM Evento WHERE Lugar = lugar;

END //

DELIMITER ;

/* Eventos de un preciobase determinado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosPrecio;

CREATE PROCEDURE listarEventosPrecio(IN precio varchar(50))
BEGIN
    SELECT * FROM Evento WHERE PrecioBase <= precio;

END //

DELIMITER ;

/* Eventos de un recinto determinado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosRecinto;

CREATE PROCEDURE listarEventosRecinto(IN nombrerec varchar(50))
BEGIN
    SELECT * FROM Evento WHERE NombreRecinto = nombrerec;

END //

DELIMITER ;

/* Informacion de la BD */

DELIMITER //

DROP PROCEDURE IF EXISTS infoBD;

CREATE PROCEDURE infoBD()
BEGIN

    SELECT count(*) as LocalidadesVendidas FROM LocalidadesVendidas;

    SELECT count(*) as Recintos FROM Recinto;

    SELECT count(*) as Clientes FROM Cliente;

    SELECT count(*) as LocalidadesOfertadas FROM LocalidadesOfertadas;

    SELECT count(*) as Espectaculos FROM Espectaculo;

    SELECT count(*) as Eventos FROM Evento;

END //

DELIMITER ;

/* Compradas por un cliente */ 

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesCompradasCliente;

CREATE PROCEDURE listarLocalidadesCompradasCliente(IN cliente varchar(50))
BEGIN

    SELECT * FROM Compra WHERE DatosBancarios=cliente;

END //

DELIMITER ;

/* Compradas en una fecha determinada */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesCompradasFecha;

CREATE PROCEDURE listarLocalidadesCompradasFecha(IN fecha_seleccionada date)
BEGIN

    SELECT * FROM Compra WHERE FechaCompra=fecha_seleccionada;
    
END //

DELIMITER ;

/* Compradas en una fecha determinada y un cliente determinado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesCompradasFechaCliente;

CREATE PROCEDURE listarLocalidadesCompradasFechaCliente(IN fecha_seleccionada date, IN datos_bancarios_seleccionados varchar(50))
BEGIN

    SELECT * FROM Compra WHERE FechaCompra=fecha_seleccionada AND DatosBancarios=datos_bancarios_seleccionados;

END //

DELIMITER ;

/* Compradas en una fecha determinada y para un espetaculo determinado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesCompradasFechaEspectaculo;

CREATE PROCEDURE listarLocalidadesCompradasFechaEspectaculo(IN fecha_seleccionada date, IN espectaculo_seleccionado varchar(50))
BEGIN

    SELECT * FROM Compra WHERE FechaCompra=fecha_seleccionada AND NombreEspectaculo=espectaculo_seleccionado;

END //

DELIMITER ;

/* Compradas en una fecha determinada y para un recinto determinado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesCompradasFechaRecinto;

CREATE PROCEDURE listarLocalidadesCompradasFechaRecinto(IN fecha_seleccionada date, IN recinto_seleccionado varchar(50))
BEGIN

    SELECT * FROM Compra WHERE FechaCompra=fecha_seleccionada AND NombreRecinto=recinto_seleccionado;

END //

DELIMITER ;

/* Compradas agrupadas por clientes*/

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesCompradasPorCliente;

CREATE PROCEDURE listarLocalidadesCompradasPorCliente()
BEGIN

    SELECT DatosBancarios,count(*) FROM Compra GROUP BY DatosBancarios 
    ORDER BY DatosBancarios DESC;

END //

DELIMITER ;

/* Localidades deterioradas */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesDeterioradas;

CREATE PROCEDURE listarLocalidadesDeterioradas()
BEGIN
    SELECT * FROM Localidad WHERE Deteriorado=1;

END //

DELIMITER ;

/* Localidades deterioradas de un recinto y un lugar */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesDeterioradasRecinto;

CREATE PROCEDURE listarLocalidadesDeterioradasRecinto(IN nombre varchar(50), IN lugar varchar(25))
BEGIN

    SELECT count(*) as NumDeterioradas FROM Localidad
    WHERE NombreRecinto=nombre
    AND Lugar=lugar
    AND Deteriorado=1;

    SELECT * FROM Localidad
    WHERE NombreRecinto=nombre
    and Lugar=lugar
    and Deteriorado=1;

END //

DELIMITER ;

/* Localidades no vendidas de un evento determinado */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesNoVendidasEvento;

CREATE PROCEDURE listarLocalidadesNoVendidasEvento(IN nombreespec varchar(50), IN nombrerec varchar(50), IN lugar varchar(25), IN fechaEvent datetime)
BEGIN

    SELECT *
    FROM LocalidadesOfertadas
    WHERE NOT EXISTS (
        SELECT *
        FROM LocalidadesVendidas
        WHERE LocalidadesOfertadas.Ubicacion = LocalidadesVendidas.Ubicacion
        AND LocalidadesOfertadas.NombreRecinto = LocalidadesVendidas.NombreRecinto
        AND LocalidadesOfertadas.Lugar = LocalidadesVendidas.Lugar
        AND LocalidadesOfertadas.FechaEvento = LocalidadesVendidas.FechaEvento
        AND LocalidadesOfertadas.NombreEspectaculo = nombreespec
        AND LocalidadesOfertadas.NombreRecinto = nombrerec
        AND LocalidadesOfertadas.Lugar = lugar
        AND LocalidadesOfertadas.FechaEvento = fechaEvent
    ) AND LocalidadesOfertadas.NombreEspectaculo = nombreespec
    AND LocalidadesOfertadas.NombreRecinto = nombrerec
    AND LocalidadesOfertadas.Lugar = lugar
    AND LocalidadesOfertadas.FechaEvento = fechaEvent;


END //  

DELIMITER ;

/* Numero de localidades compradas por un cliente */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesNumCompradasCliente;

CREATE PROCEDURE listarLocalidadesNumCompradasCliente(IN cliente varchar(50))
BEGIN

    SELECT count(*) FROM Compra WHERE DatosBancarios=cliente 
    GROUP BY DatosBancarios;

END //

DELIMITER ;

/* Localidades ofertadas */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesOfertadas;

CREATE PROCEDURE listarLocalidadesOfertadas()
BEGIN
    SELECT * FROM LocalidadesOfertadas order BY Precio;

END //

DELIMITER ;

/* Localidades ofertadas para un evento */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesOfertadasEvento;

CREATE PROCEDURE listarLocalidadesOfertadasEvento(IN nombreespec varchar(50), IN nombrerec varchar(50), IN lugar varchar(25), IN fecha datetime)
BEGIN
    SELECT * FROM LocalidadesOfertadas
    WHERE NombreEspectaculo=nombreespec
    and NombreRecinto=nombrerec
    and Lugar=lugar
    and FechaEvento = fecha
    order BY Ubicacion;

END //

DELIMITER ;

/* Localidades ofertadas para un evento y tipo de usuario */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesOfertadasEventoTipo;

CREATE PROCEDURE listarLocalidadesOfertadasEventoTipo(IN nombreespec varchar(50), IN nombrerec varchar(50), IN lugar varchar(25), IN tipo varchar(20), IN fecha datetime)
BEGIN
    SELECT * FROM LocalidadesOfertadas
    WHERE NombreEspectaculo=nombreespec
    and NombreRecinto=nombrerec
    and Lugar=lugar
    and TipoUsuario=tipo
    and FechaEvento=fecha
    order BY Precio;

END //

DELIMITER ;

/* Localidades ofertadas para un precio */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesOfertadasPrecio;

CREATE PROCEDURE listarLocalidadesOfertadasPrecio(IN valor int)
BEGIN
    SELECT * FROM LocalidadesOfertadas WHERE Precio <= valor
    order BY Precio;

END //

DELIMITER ;

/* Localidades ofertadas para un tipo de usuario */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesOfertadasTipo;

CREATE PROCEDURE listarLocalidadesOfertadasTipo(IN tipo varchar(20))
BEGIN
    SELECT * FROM LocalidadesOfertadas WHERE TipoUsuario=tipo 
    order BY Precio;
END //

DELIMITER ;

/* Localidades de un recinto */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesRecinto;

CREATE PROCEDURE listarLocalidadesRecinto(IN nombre varchar(50), IN lugar varchar(25))
BEGIN
    SELECT * FROM Localidad WHERE NombreRecinto=nombre and Lugar=lugar;

END //

DELIMITER ;

/* Localidades vendidas */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesVendidas;

CREATE PROCEDURE listarLocalidadesVendidas()
BEGIN

    SELECT * FROM LocalidadesVendidas;

END //

DELIMITER ;

/* Localidades vendidas para un espectaculo */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesVendidasEspectaculo;

CREATE PROCEDURE listarLocalidadesVendidasEspectaculo(IN nombreespec varchar(50))
BEGIN

    SELECT NombreEspectaculo, count(*) AS LocalidadesVendidas FROM LocalidadesVendidas WHERE 
    NombreEspectaculo=nombreespec
    GROUP BY NombreEspectaculo;

    SELECT LocalidadesVendidas.NombreEspectaculo,LocalidadesVendidas.Ubicacion,
    LocalidadesVendidas.NombreRecinto,LocalidadesVendidas.FechaEvento,LocalidadesVendidas.TipoUsuario, 
    LocalidadesOfertadas.Precio FROM LocalidadesVendidas 
    INNER JOIN LocalidadesOfertadas ON LocalidadesOfertadas.NombreEspectaculo = LocalidadesOfertadas.NombreEspectaculo
    AND LocalidadesOfertadas.NombreEspectaculo = LocalidadesVendidas.NombreEspectaculo
    AND LocalidadesOfertadas.Ubicacion = LocalidadesVendidas.Ubicacion
    AND LocalidadesOfertadas.NombreRecinto = LocalidadesVendidas.NombreRecinto
    AND LocalidadesOfertadas.FechaEvento = LocalidadesVendidas.FechaEvento
    AND LocalidadesOfertadas.TipoUsuario = LocalidadesVendidas.TipoUsuario
    WHERE LocalidadesVendidas.NombreEspectaculo=nombreespec AND  LocalidadesOfertadas.NombreEspectaculo=nombreespec;

END //

DELIMITER ;

/* Localidades vendidas para un evento */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesVendidasEvento;

CREATE PROCEDURE listarLocalidadesVendidasEvento(IN nombreespec varchar(50), IN nombrerec varchar(50), IN lugar varchar(25), IN fechaEvent datetime)
BEGIN

    SELECT NombreEspectaculo,count(*) as LocalidadesVendidasEvento FROM LocalidadesVendidas WHERE 
    NombreEspectaculo=nombreespec AND NombreRecinto=nombrerec AND Lugar=lugar AND FechaEvento = fechaEvent
    GROUP BY NombreEspectaculo;

    SELECT LocalidadesVendidas.NombreEspectaculo,LocalidadesVendidas.Ubicacion,
    LocalidadesVendidas.NombreRecinto,LocalidadesVendidas.FechaEvento,LocalidadesVendidas.TipoUsuario, 
    LocalidadesOfertadas.Precio FROM LocalidadesVendidas 
    INNER JOIN LocalidadesOfertadas ON LocalidadesOfertadas.NombreEspectaculo = LocalidadesOfertadas.NombreEspectaculo
    AND LocalidadesOfertadas.NombreEspectaculo = LocalidadesVendidas.NombreEspectaculo
    AND LocalidadesOfertadas.Ubicacion = LocalidadesVendidas.Ubicacion
    AND LocalidadesOfertadas.NombreRecinto = LocalidadesVendidas.NombreRecinto
    AND LocalidadesOfertadas.FechaEvento = LocalidadesVendidas.FechaEvento
    AND LocalidadesOfertadas.TipoUsuario = LocalidadesVendidas.TipoUsuario
    WHERE LocalidadesVendidas.NombreEspectaculo=nombreespec AND  LocalidadesOfertadas.NombreEspectaculo=nombreespec
    AND LocalidadesVendidas.NombreRecinto=nombrerec AND  LocalidadesOfertadas.NombreRecinto=nombrerec
    AND LocalidadesVendidas.Lugar=lugar AND  LocalidadesOfertadas.Lugar=lugar
    AND LocalidadesVendidas.FechaEvento=fechaEvent AND  LocalidadesOfertadas.FechaEvento=fechaEvent;

END //

DELIMITER ;

/* Localidades vendidas por fecha */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesVendidasPorFecha;

CREATE PROCEDURE listarLocalidadesVendidasPorFecha(IN fechaBuscar datetime)
BEGIN

    SELECT * FROM LocalidadesVendidas
    INNER JOIN Compra ON Compra.NombreEspectaculo = LocalidadesVendidas.NombreEspectaculo
    AND Compra.NombreRecinto = LocalidadesVendidas.NombreRecinto
    AND Compra.Lugar = LocalidadesVendidas.Lugar
    AND Compra.FechaEvento = LocalidadesVendidas.FechaEvento
    WHERE Compra.FechaCompra <= fechaBuscar
    LIMIT 100;

END //

DELIMITER ;

/* Localidades vendidas para un recinto */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLocalidadesVendidasRecinto;

CREATE PROCEDURE listarLocalidadesVendidasRecinto(IN nombrerec varchar(50), IN lug varchar(50))
BEGIN

    SELECT count(*) as LocalidadesVendidasRecinto FROM LocalidadesVendidas WHERE 
    NombreRecinto=nombrerec AND Lugar = lug
    GROUP BY NombreRecinto;

    SELECT LocalidadesVendidas.NombreEspectaculo,LocalidadesVendidas.Ubicacion,
    LocalidadesVendidas.NombreRecinto,LocalidadesVendidas.FechaEvento,LocalidadesVendidas.TipoUsuario, 
    LocalidadesOfertadas.Precio FROM LocalidadesVendidas 
    INNER JOIN LocalidadesOfertadas ON LocalidadesOfertadas.NombreEspectaculo = LocalidadesOfertadas.NombreEspectaculo
    AND LocalidadesOfertadas.NombreEspectaculo = LocalidadesVendidas.NombreEspectaculo
    AND LocalidadesOfertadas.Ubicacion = LocalidadesVendidas.Ubicacion
    AND LocalidadesOfertadas.NombreRecinto = LocalidadesVendidas.NombreRecinto
    AND LocalidadesOfertadas.FechaEvento = LocalidadesVendidas.FechaEvento
    AND LocalidadesOfertadas.TipoUsuario = LocalidadesVendidas.TipoUsuario
    WHERE LocalidadesOfertadas.NombreRecinto=nombrerec AND LocalidadesOfertadas.Lugar = lug
    AND LocalidadesVendidas.NombreRecinto=nombrerec AND LocalidadesVendidas.Lugar = lug;

END //

DELIMITER ;

/* Localidades vendidas en la ultima hora */

DELIMITER //

DROP PROCEDURE IF EXISTS listarComprasUltimaHora;

CREATE PROCEDURE listarComprasUltimaHora(IN minutes_back INT)
BEGIN
    SET @horaActual = NOW();
    SET @fechaInicio = DATE_SUB(@horaActual, INTERVAL minutes_back MINUTE);
    SET @fechaFin = @horaActual;

    SELECT COUNT(*) INTO @vendidas
    FROM Compra
    WHERE FechaCompra BETWEEN @fechaInicio AND @fechaFin;

    SELECT @vendidas AS NumCompradas;

    SELECT DatosBancarios, DNI, NombreCliente, PrimerApellido, Edad, FechaCompra, TipoUsuario, Ubicacion, NombreRecinto, Lugar, NombreEspectaculo, FechaEvento
    FROM Compra
    WHERE FechaCompra BETWEEN @fechaInicio AND @fechaFin;
END //

DELIMITER ;

/* Los 5 mejores compradores */

DELIMITER //

DROP PROCEDURE IF EXISTS MejoresClientes;

CREATE PROCEDURE MejoresClientes()
BEGIN

    SELECT Compra.NombreCliente, Compra.PrimerApellido, Compra.DNI, COUNT(*) AS ComprasRealizadas
    FROM Compra
    GROUP BY Compra.NombreCliente, Compra.PrimerApellido, Compra.DNI
    HAVING COUNT(*) >= (
        SELECT COUNT(*) AS ComprasRealizadas
        FROM Compra
        GROUP BY DatosBancarios
        ORDER BY ComprasRealizadas DESC
        LIMIT 1 OFFSET 4
    )
    ORDER BY ComprasRealizadas DESC
    LIMIT 5;
    
END //

DELIMITER ;

/* Numero de localidades de un recinto */

DELIMITER //

DROP PROCEDURE IF EXISTS listarNumLocalidadesRecinto;

CREATE PROCEDURE listarNumLocalidadesRecinto(IN nombre varchar(50), IN lugar varchar(25))
BEGIN
    SELECT NombreRecinto , count(*) AS LocalidadesRecinto FROM Localidad
    WHERE NombreRecinto=nombre AND Lugar=lugar
    GROUP BY NombreRecinto;

END //

DELIMITER ;

/* Participantes de un espectaculo */

DELIMITER //

DROP PROCEDURE IF EXISTS listarParticipantesEspectaculo;

CREATE PROCEDURE listarParticipantesEspectaculo(IN nombre varchar(50))
BEGIN
    SELECT * FROM ParticipantesEspectaculo WHERE NombreEspectaculo=nombre;

END //

DELIMITER ;

/* Todos los recintos */

DELIMITER //

DROP PROCEDURE IF EXISTS listarRecintos;

CREATE PROCEDURE listarRecintos()
BEGIN
    SELECT * FROM Recinto;

END //

DELIMITER ;

/* Recintos con una capacidad maxima mayor a la introducida */

DELIMITER //

DROP PROCEDURE IF EXISTS listarRecintosCapacidadMax;

CREATE PROCEDURE listarRecintosCapacidadMax(IN max int)
BEGIN
    SELECT * FROM Recinto WHERE CapacidadMaxima>max;

END //

DELIMITER ;

/* Los 10 recintos que mas ofertas tienen para un tipo de usuario */

DELIMITER //

DROP PROCEDURE IF EXISTS RecintoOfertaTipo;

CREATE PROCEDURE RecintoOfertaTipo(IN tipoUsuarioInput ENUM('Adulto', 'Parado', 'Jubilado', 'Infantil'))
BEGIN
    
    SELECT NombreRecinto, count(*) AS LocalidadesUsuario FROM LocalidadesOfertadas
    WHERE TipoUsuario = tipoUsuarioInput
    GROUP BY NombreRecinto
    ORDER BY LocalidadesUsuario DESC
    LIMIT 10;


END //

DELIMITER ;

/* Tipos de Usuario permitidos para un espectaculo */

DELIMITER //

DROP PROCEDURE IF EXISTS listarTiposUsuariosEspectaculo;

CREATE PROCEDURE listarTiposUsuariosEspectaculo(IN nombre varchar(50))
BEGIN
    SELECT NombreEspectaculo, count(*) AS NumeroTipoUsuarios FROM TipoUsuarioPermitido 
    WHERE NombreEspectaculo=nombre 
    GROUP BY NombreEspectaculo;

    SELECT * FROM TipoUsuarioPermitido 
    WHERE NombreEspectaculo=nombre;

END //

DELIMITER ;

/* Buscar en qué eventos participa un participante */

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosParticipante;

CREATE PROCEDURE listarEventosParticipante(IN participante_introducido varchar(50))
BEGIN
    select ParticipantesEspectaculo.NombreParticipante, Evento.NombreEspectaculo, Evento.FechaEvento, Evento.Lugar, Evento.NombreRecinto, Evento.PrecioBase from Evento
    inner join Espectaculo 
    on Espectaculo.NombreEspectaculo=Evento.NombreEspectaculo
    inner join ParticipantesEspectaculo
    on ParticipantesEspectaculo.NombreEspectaculo=Espectaculo.NombreEspectaculo
    where NombreParticipante=participante_introducido;
END //

DELIMITER ;


/* Buscar eventos que tenga un tipo de espectáculo*/

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosTipoEspectaculo;

CREATE PROCEDURE listarEventosTipoEspectaculo(IN TipoEspectaculo_introducido varchar(50))
BEGIN
    select Espectaculo.TipoEspectaculo, Evento.NombreEspectaculo, FechaEvento, Lugar, NombreRecinto, PrecioBase from Evento
    inner join Espectaculo 
    on Espectaculo.NombreEspectaculo=Evento.NombreEspectaculo
    where Espectaculo.TipoEspectaculo=TipoEspectaculo_introducido;
END //

DELIMITER ;


/* Buscar eventos donde haya un participante a un precio*/

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventoPaticipantePrecio;

CREATE PROCEDURE listarEventoPaticipantePrecio(IN participante_introducido varchar(50), IN precio_introducido int)
BEGIN
    select Evento.NombreEspectaculo, Evento.FechaEvento, Evento.Lugar, Evento.NombreRecinto, Evento.PrecioBase, ParticipantesEspectaculo.NombreParticipante from Evento
    inner join Espectaculo 
    on Espectaculo.NombreEspectaculo=Evento.NombreEspectaculo
    inner join ParticipantesEspectaculo
    on ParticipantesEspectaculo.NombreEspectaculo=Espectaculo.NombreEspectaculo
    where ParticipantesEspectaculo.NombreParticipante=participante_introducido AND PrecioBase < precio_introducido;
END //

DELIMITER ;

/* Participantes que van a actuar en un lugar*/

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventoPaticipantesLugar;

CREATE PROCEDURE listarEventoPaticipantesLugar(IN participante_introducido varchar(50), IN lugar_introducido varchar(50))
BEGIN
    select Evento.NombreEspectaculo, Evento.FechaEvento, Evento.Lugar, Evento.NombreRecinto, Evento.PrecioBase, ParticipantesEspectaculo.NombreParticipante from Evento
    inner join Espectaculo 
    on Espectaculo.NombreEspectaculo=Evento.NombreEspectaculo
    inner join ParticipantesEspectaculo
    on ParticipantesEspectaculo.NombreEspectaculo=Espectaculo.NombreEspectaculo
    where ParticipantesEspectaculo.NombreParticipante=participante_introducido AND Lugar=lugar_introducido;
END //

DELIMITER ;


/* Ordenar eventos por precio ascendente*/

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosPrecioAscendente;

CREATE PROCEDURE listarEventosPrecioAscendente()
BEGIN
    select * from Evento 
    where Estado = 'Abierto' 
    order by PrecioBase limit 100;
END //

DELIMITER ;


/* Ordenar eventos por precio descendente*/

DELIMITER //

DROP PROCEDURE IF EXISTS listarEventosPrecioDescendente;

CREATE PROCEDURE listarEventosPrecioDescendente()
BEGIN
    select * from Evento 
    where Estado = 'Abierto' 
    order by PrecioBase DESC limit 100;
END //

DELIMITER ;

/* Lugares */

DELIMITER //

DROP PROCEDURE IF EXISTS listarLugares;

CREATE PROCEDURE listarLugares()
BEGIN
    SELECT Lugar FROM Recinto
    GROUP BY LUGAR;
END //

DELIMITER ;

CALL listarLugares();