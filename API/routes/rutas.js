const express = require('express');
const router = express.Router();
const { getlistarLocalidadesVendidas,getlistarTiposUsuariosEspectaculo,getDeleteCompraAndLocalidadesVendidas,
getlistarParticipantesEspectaculo,getlistarNumLocalidadesRecinto,getlistarEspectaculosParaTipo,getlistarLocalidadesVendidasRecinto,
getlistarLocalidadesVendidasEvento,getlistarEventosAforoMayorQ,getlistarLocalidadesVendidasEspectaculo,getlistarEventosAforoRecinto,
getlistarLocalidadesRecinto,getlistarEventosEstado,getlistarLocalidadesOfertadasTipo,getlistarLocalidadesCompradasCliente,getlistarLocalidadesOfertadasPrecio,
getlistarLocalidadesCompradasFecha,getlistarLocalidadesOfertadasEventoTipo,getlistarLocalidadesOfertadasEvento,
getlistarLocalidadesCompradasFechaCliente,getlistarLocalidadesOfertadas,getlistarLocalidadesCompradasFechaEspectaculo,
getlistarLocalidadesDeterioradasRecinto,getlistarLocalidadesNumCompradasCliente,getlistarEspectaculosParaNumUsuario,
getlistarLocalidadesCompradasFechaRecinto,getlistarLocalidadesDeterioradas,getlistarLocalidadesCompradasPorCliente,
getlistarEventos,getlistarLocalidadesVendidasPorFecha,getlistarEventosPrecio,getlistarEventosLugar,getlistarEventosRecinto,
listarRecintosCapacidadMax,getAnularCompra,getlistarEspectaculos,getlistarRecintos,getMejoresClientes,getRecintoOfertaTipo,
getlistarLocalidadesNoVendidasEvento,getlistarComprasUltimaHora,getLugares,getlistarEventoPaticipantesLugar}
 = require('../controllers/controlador');

router.get('/listarDeleteCompraAndLocalidadesVendidas', getDeleteCompraAndLocalidadesVendidas);
router.get('/listarEspectaculosParaNumUsuario', getlistarEspectaculosParaNumUsuario);
router.get('/listarEspectaculosParaTipo', getlistarEspectaculosParaTipo);
router.get('/listarEventosAforoMayorQ', getlistarEventosAforoMayorQ);
router.get('/listarEventosAforoRecinto', getlistarEventosAforoRecinto);
router.get('/listarEventosEstado', getlistarEventosEstado);
router.get('/listarLocalidadesCompradasCliente', getlistarLocalidadesCompradasCliente);
router.get('/listarLocalidadesCompradasFecha', getlistarLocalidadesCompradasFecha);
router.get('/listarLocalidadesCompradasFechaCliente', getlistarLocalidadesCompradasFechaCliente);
router.get('/listarLocalidadesCompradasFechaEspectaculo', getlistarLocalidadesCompradasFechaEspectaculo);
router.get('/listarLocalidadesCompradasFechaRecinto', getlistarLocalidadesCompradasFechaRecinto);
router.get('/listarLocalidadesCompradasPorCliente', getlistarLocalidadesCompradasPorCliente);
router.get('/listarLocalidadesDeterioradas', getlistarLocalidadesDeterioradas);
router.get('/listarLocalidadesDeterioradasRecinto', getlistarLocalidadesDeterioradasRecinto);
router.get('/listarLocalidadesNumCompradasCliente', getlistarLocalidadesNumCompradasCliente);
router.get('/listarLocalidadesOfertadas', getlistarLocalidadesOfertadas);
router.get('/listarLocalidadesOfertadasEvento', getlistarLocalidadesOfertadasEvento);
router.get('/listarLocalidadesOfertadasEventoTipo', getlistarLocalidadesOfertadasEventoTipo);
router.get('/listarLocalidadesOfertadasPrecio', getlistarLocalidadesOfertadasPrecio);
router.get('/listarLocalidadesOfertadasTipo', getlistarLocalidadesOfertadasTipo);
router.get('/listarLocalidadesRecinto', getlistarLocalidadesRecinto);
router.get('/listarLocalidadesVendidas', getlistarLocalidadesVendidas);
router.get('/listarLocalidadesVendidasEspectaculo', getlistarLocalidadesVendidasEspectaculo);
router.get('/listarLocalidadesVendidasEvento', getlistarLocalidadesVendidasEvento);
router.get('/listarLocalidadesVendidasRecinto', getlistarLocalidadesVendidasRecinto);
router.get('/listarNumLocalidadesRecinto', getlistarNumLocalidadesRecinto);
router.get('/listarParticipantesEspectaculo', getlistarParticipantesEspectaculo);
router.get('/listarTiposUsuariosEspectaculo', getlistarTiposUsuariosEspectaculo);
router.get('/listarEventos', getlistarEventos);
router.get('/listarLocalidadesVendidasPorFecha', getlistarLocalidadesVendidasPorFecha);
router.get('/listarEventosPrecio', getlistarEventosPrecio);
router.get('/listarEventosLugar', getlistarEventosLugar);
router.get('/listarEventosRecinto', getlistarEventosRecinto);
router.get('/listarRecintosCapacidadMax', listarRecintosCapacidadMax);
router.get('/anularCompra', getAnularCompra);
router.get('/listarEspectaculos', getlistarEspectaculos);
router.get('/listarRecintos', getlistarRecintos);
router.get('/mejoresClientes', getMejoresClientes);
router.get('/RecintoOfertaTipo', getRecintoOfertaTipo);
router.get('/listarLocalidadesNoVendidasEvento', getlistarLocalidadesNoVendidasEvento);
router.get('/listarComprasUltimaHora', getlistarComprasUltimaHora);
router.get('/lugares', getLugares);
router.get('/listarEventoPaticipantesLugar', getlistarEventoPaticipantesLugar);


module.exports = router;