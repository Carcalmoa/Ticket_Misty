const moment = require('moment-timezone');
const db = require('../bd');

const getDeleteCompraAndLocalidadesVendidas = async (req, res) => {
    let { datosbancarios,nombreEsp,ubicacion,nombreRec,fecha } = req.query;
    let sql = 'CALL DeleteCompraAndLocalidadesVendidas(?,?,?,?,?)';
    let params = [datosbancarios,nombreEsp,ubicacion,nombreRec,fecha];
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
};

const getlistarEspectaculosParaNumUsuario = async (req, res) => {
    let { numusuarios } = req.query;
    let params = [numusuarios];
    let sql = 'CALL listarEspectaculosParaNumUsuario(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEspectaculosParaTipo = async (req, res) => {
    let { tipo } = req.query;
    let params = [tipo];
    let sql = 'CALL listarEspectaculosParaTipo(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEventosAforoMayorQ = async (req, res) => {
    let { numero } = req.query;
    let params = [numero];
    let sql = 'CALL listarEventosAforoMayorQ(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEventosAforoRecinto = async (req, res) => {
    let sql = 'CALL listarEventosAforoRecinto();';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEventosEstado = async (req, res) => {
    let { estado } = req.query;
    let params = [estado];
    let sql = 'CALL listarEventosEstado(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEventosPrecio = async (req, res) => {
    let { precio } = req.query;
    let params = [precio];
    let sql = 'CALL listarEventosPrecio(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEventosLugar = async (req, res) => {
    let { lugar } = req.query;
    let params = [lugar];
    let sql = 'CALL listarEventosLugar(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEventosRecinto = async (req, res) => {
    let { nombreRecinto } = req.query;
    let params = [nombreRecinto];
    let sql = 'CALL listarEventosRecinto(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const listarRecintosCapacidadMax = async (req, res) => {
    let { max } = req.query;
    let params = [mac];
    let sql = 'CALL listarRecintosCapacidadMax(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesCompradasCliente = async (req, res) => {
    let { datosbancarios } = req.query;
    let params = [datosbancarios];
    let sql = 'CALL listarLocalidadesCompradasCliente(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesCompradasFecha = async (req, res) => {
    let { fecha } = req.query;
    let params = [fecha];
    let sql = 'CALL listarLocalidadesCompradasFecha(?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};


const getlistarLocalidadesCompradasFechaCliente = async (req, res) => {
    let { fecha,datosbancarios } = req.query;
    let params = [fecha,datosbancarios];
    let sql = 'CALL listarLocalidadesCompradasFechaCliente(?,?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesCompradasFechaEspectaculo = async (req, res) => {
    let { fecha,nombreEsp } = req.query;
    let params = [fecha,nombreEsp];
    let sql = 'CALL listarLocalidadesCompradasFechaEspectaculo(?,?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesCompradasFechaRecinto = async (req, res) => {
    let { fecha,nombreRec } = req.query;
    let params = [fecha,nombreRec];
    let sql = 'CALL listarLocalidadesCompradasFechaRecinto(?,?);';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesCompradasPorCliente = async (req, res) => {
    let sql = 'CALL listarLocalidadesCompradasPorCliente();';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};


const getlistarLocalidadesDeterioradas = async (req, res) => {
    let sql = 'CALL listarLocalidadesDeterioradas()';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesDeterioradasRecinto = async (req, res) => {
    let { nombreRecinto,lugar } = req.query;
    let params = [nombreRecinto,lugar];
    let sql = 'CALL listarLocalidadesDeterioradasRecinto(?,?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesNumCompradasCliente= async (req, res) => {
    let { datosbancarios } = req.query;
    let params = [datosbancarios];
    let sql = 'CALL listarLocalidadesNumCompradasCliente(?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesOfertadas= async (req, res) => {
    let sql = 'CALL listarLocalidadesOfertadas()';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesOfertadasEvento= async (req, res) => {
    let { nombreEspectaculo,nombreRecinto,lugar,fechaEvento } = req.query;
    let params = [nombreEspectaculo,nombreRecinto,lugar,fechaEvento];
    let sql = "CALL listarLocalidadesOfertadasEvento(?,?,?,?)"
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
};

const getlistarLocalidadesOfertadasEventoTipo= async (req, res) => {
    let { nombreEspectaculo,nombreRecinto,lugar,tipo,fechaEvento } = req.query;
    let params = [nombreEspectaculo,nombreRecinto,lugar,tipo,fechaEvento];
    let sql = "CALL listarLocalidadesOfertadasEventoTipo(?,?,?,?,?)"
    db.query(sql, params,(err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesOfertadasPrecio= async (req, res) => {
    let { precio } = req.query;
    let params = [precio];
    let sql = 'CALL listarLocalidadesOfertadasPrecio(?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesOfertadasTipo = async (req, res) => {
    let { tipo } = req.query;
    let params = [tipo];
    let sql = 'CALL listarLocalidadesOfertadasTipo(?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesRecinto = async (req, res) => {
    let { nombreRecinto,ubicacion} = req.query;
    let params = [nombreRecinto,ubicacion];
    let sql = 'CALL listarLocalidadesRecinto(?,?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesVendidas = async (req, res) => {
    let sql = 'CALL listarLocalidadesVendidas()';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesVendidasEspectaculo= async (req, res) => {
    let { nombreEspectaculo} = req.query;
    let params = [nombreEspectaculo];
    let sql = 'CALL listarLocalidadesVendidasEspectaculo(?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};
const getlistarLocalidadesVendidasEvento = async (req, res) => {
    let { nombreEspectaculo,nombreRecinto, ubicacion, fechaEvento } = req.query;
    let params = [nombreEspectaculo,nombreRecinto,ubicacion,fechaEvento];
    let sql = 'CALL listarLocalidadesVendidasEvento(?,?,?,?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesVendidasRecinto = async (req, res) => {
    let { nombreRecinto, ubicacion } = req.query;
    let params = [nombreRecinto,ubicacion];
    let sql = 'CALL listarLocalidadesVendidasRecinto(?,?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarNumLocalidadesRecinto = async (req, res) => {
    let { nombreRecinto, ubicacion } = req.query;
    let params = [nombreRecinto,ubicacion];
    let sql = 'CALL listarNumLocalidadesRecinto(?,?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarParticipantesEspectaculo = async (req, res) => {
    let { nombre } = req.query;
    let params = [nombre];
    let sql = 'CALL listarParticipantesEspectaculo(?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarTiposUsuariosEspectaculo = async (req, res) => {
    let { usuario } = req.query;
    let params = [usuario];
    let sql = 'CALL listarTiposUsuariosEspectaculo(?)';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesVendidasPorFecha = async (req, res) => {
    let { fecha } = req.query;
    let params = [fecha];
    let sql = 'CALL listarLocalidadesVendidasPorFecha(?)';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};


const getlistarEventos= async (req, res) => {
    let sql = 'CALL listarEventos()';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};


const getAnularCompra= async (req, res) => {
    let { datosBancarios,nombreEspectaculo,ubicacion,nombreRecinto,fechaEvento,lugar} = req.query;
    let params = [datosBancarios,nombreEspectaculo,ubicacion,nombreRecinto,fechaEvento,lugar];
    sql = 'CALL DeleteCompraAndLocalidadesVendidas(?,?,?,?,?,?)';
    db.query(sql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEspectaculos= async (req, res) => {
    sql = 'CALL listarEspectaculos()';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarRecintos= async (req, res) => {
    sql = 'CALL listarRecintos()';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getMejoresClientes= async (req, res) => {
    sql = 'CALL MejoresClientes()';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getRecintoOfertaTipo= async (req, res) => {
    let { tipo } = req.query;
    let params = [tipo];
    sql = 'CALL RecintoOfertaTipo(?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarLocalidadesNoVendidasEvento= async (req, res) => {
    let { nombreEspectaculo, nombreRecinto, lugar,fechaEvento } = req.query;
    let params = [nombreEspectaculo, nombreRecinto, lugar,fechaEvento ];
    sql = 'CALL listarLocalidadesNoVendidasEvento(?,?,?,?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarComprasUltimaHora= async (req, res) => {
    let { tiempo} = req.query;
    let params = [ tiempo ];
    sql = 'CALL listarComprasUltimaHora(?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getLugares= async (req, res) => {
    sql = 'CALL listarLugares()';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};

const getlistarEventoPaticipantesLugar= async (req, res) => {
    let { participante, lugar} = req.query;
    let params = [ participante, lugar ];
    sql = 'CALL listarEventoPaticipantesLugar(?,?)';
    db.query(sql,params, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

};



module.exports = {
    getlistarLocalidadesVendidas,
    getlistarParticipantesEspectaculo,
    getlistarTiposUsuariosEspectaculo,
    getlistarNumLocalidadesRecinto,
    getDeleteCompraAndLocalidadesVendidas,
    getlistarEspectaculosParaNumUsuario,
    getlistarEspectaculosParaTipo,
    getlistarLocalidadesVendidasRecinto,
    getlistarEventosAforoMayorQ,
    getlistarLocalidadesVendidasEvento,
    getlistarLocalidadesVendidasEspectaculo,
    getlistarEventosAforoRecinto,
    getlistarLocalidadesRecinto,
    getlistarEventosEstado,
    getlistarLocalidadesCompradasCliente,
    getlistarLocalidadesOfertadasTipo,
    getlistarLocalidadesOfertadasPrecio,
    getlistarLocalidadesCompradasFecha,
    getlistarLocalidadesOfertadasEventoTipo,
    getlistarLocalidadesOfertadasEvento,
    getlistarLocalidadesCompradasFechaCliente,
    getlistarLocalidadesOfertadas,
    getlistarLocalidadesNumCompradasCliente,
    getlistarLocalidadesCompradasFechaEspectaculo,
    getlistarLocalidadesDeterioradasRecinto,
    getlistarLocalidadesCompradasFechaRecinto,
    getlistarLocalidadesDeterioradas,
    getlistarLocalidadesCompradasPorCliente,
    getlistarEventos,
    getlistarLocalidadesVendidasPorFecha,
    getlistarEventosPrecio,
    getlistarEventosLugar,
    getlistarEventosRecinto,
    listarRecintosCapacidadMax,
    getAnularCompra,
    getlistarEspectaculos,
    getlistarRecintos,
    getMejoresClientes,
    getRecintoOfertaTipo,
    getlistarLocalidadesNoVendidasEvento,
    getlistarComprasUltimaHora,
    getLugares,
    getlistarEventoPaticipantesLugar
};


