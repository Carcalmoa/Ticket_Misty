import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API: string = 'http://localhost:3000';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  options = { headers: this.headers };

  constructor(private httpClient: HttpClient) { }


  getlistarEventos(){
    return this.httpClient.get(`${this.API}/listarEventos`);
  }


  getlistarEspectaculosParaNumUsuario(numusuarios : any){
    return this.httpClient.get(`${this.API}/listarEspectaculosParaNumUsuario?numusuarios=`+numusuarios);
  }
  getlistarEspectaculosParaTipo(tipo: String){
    return this.httpClient.get(`${this.API}/listarEspectaculosParaTipo?tipo=`+tipo);
  }

  getlistarEventosEstado(estado: String){
    return this.httpClient.get(`${this.API}/listarEventosEstado?estado=`+estado);
  }

  getlistarEventosLugar(lugar: String){
    return this.httpClient.get(`${this.API}/listarEventosLugar?lugar=`+lugar);
  }

  getlistarEventosPrecio(precio: String){
    return this.httpClient.get(`${this.API}/listarEventosPrecio?precio=`+precio);
  }
  
  getlistarEventosRecinto(nombreRecinto: String){
    return this.httpClient.get(`${this.API}/listarEventosRecinto?nombreRecinto=`+nombreRecinto);
  }

  getlistarRecintosCapacidadMax(max: String){
    return this.httpClient.get(`${this.API}/listarRecintosCapacidadMax?max=`+max);
  }

  getlistarLocalidadesVendidasFecha(fecha: String){
    return this.httpClient.get(`${this.API}/listarLocalidadesVendidasPorFecha?fecha=`+fecha);
  }

  getlistarLocalidadesCompradasFechaEspectaculo(fecha: String,nombreEsp: String){
    return this.httpClient.get(`${this.API}/listarLocalidadesCompradasFechaEspectaculo?fecha=`+fecha+`&nombreEsp=`+nombreEsp);
  }

  getlistarLocalidadesCompradasFechaRecinto(fecha: String,nombreRec: String){
    return this.httpClient.get(`${this.API}/listarLocalidadesCompradasFechaRecinto?fecha=`+fecha+`&nombreRec=`+nombreRec);
  }
  
  getlistarLocalidadesDeterioradasRecinto(nombreRecinto: String, lugar: String){
    return this.httpClient.get(`${this.API}/listarLocalidadesDeterioradasRecinto?nombreRecinto=`+nombreRecinto+`&lugar=`+lugar);
  }

  getlistarLocalidadesOfertadasEvento(nombreEspectaculo: String, nombreRecinto: String, lugar: String,fechaEvento : String){

    return this.httpClient.get(`${this.API}/listarLocalidadesOfertadasEvento?nombreEspectaculo=`+nombreEspectaculo+`&nombreRecinto=`+nombreRecinto+`&lugar=`+lugar+`&fechaEvento=`+fechaEvento);
  }
  
  getlistarLocalidadesOfertadasEventoTipo(nombreEspectaculo: String, nombreRecinto: String, lugar: String,fecha:String, tipo:String){
    return this.httpClient.get(`${this.API}/listarLocalidadesOfertadasEventoTipo?nombreEspectaculo=`+nombreEspectaculo+`&nombreRecinto=`+nombreRecinto+`&lugar=`+lugar+`&fechaEvento=`+fecha+`&tipo=`+tipo);
  }

  getlistarLocalidadesOfertadasTipo(tipo:String){
    return this.httpClient.get(`${this.API}/listarLocalidadesOfertadasTipo?tipo=`+tipo);
  }

  getlistarLocalidadesVendidas(){
    return this.httpClient.get(`${this.API}/listarLocalidadesVendidas`);
  }

  getlistarLocalidadesOfertadasPrecio(precio : any){
    return this.httpClient.get(`${this.API}/listarLocalidadesOfertadasPrecio?precio=`+precio);
  }

  getlistarLocalidadesVendidasEspectaculo(nombreEspectaculo : String){
    return this.httpClient.get(`${this.API}/listarLocalidadesVendidasEspectaculo?nombreEspectaculo=`+nombreEspectaculo);
  }

  getlistarLocalidadesVendidasEventos(nombreEspectaculo : String, nombreRecinto: String, ubicacion: String, fechaEvento: String){
    return this.httpClient.get(`${this.API}/listarLocalidadesVendidasEvento?nombreEspectaculo=`+nombreEspectaculo+`&nombreRecinto=`+nombreRecinto+`&ubicacion=`+ubicacion+`&fechaEvento=`+fechaEvento);
  }

  getlistarLocalidadesVendidasRecinto(nombreRecinto: String, ubicacion: String,){
    return this.httpClient.get(`${this.API}/listarLocalidadesVendidasRecinto?nombreRecinto=`+nombreRecinto+`&ubicacion=`+ubicacion);
  }

  getlistarTiposUsuariosEspectaculo(usuario : String){
    return this.httpClient.get(`${this.API}/listarTiposUsuariosEspectaculo?usuario=`+usuario);
  }
   
  getlistarLocalidadesCompradasFechaCliente(fecha: String,datosbancarios: String){
    return this.httpClient.get(`${this.API}/listarLocalidadesCompradasFechaCliente?fecha=`+fecha+`&datosbancarios=`+datosbancarios);
  }

  getlistarLocalidadesCompradasCliente(datosbancarios: String){
    return this.httpClient.get(`${this.API}/listarLocalidadesCompradasCliente?datosbancarios=`+datosbancarios);
  }

  getlistarLocalidadesCompradasPorCliente(){
    return this.httpClient.get(`${this.API}/listarLocalidadesCompradasPorCliente`);
  }

  getlistarRecintos(){
    return this.httpClient.get(`${this.API}/listarRecintos`);
  }

  getlistarEspectaculos(){
    return this.httpClient.get(`${this.API}/listarEspectaculos`);
  }

  anularCompra(datosBancarios :  String,nombreEspectaculo :  String,ubicacion : any, nombreRecinto :  String,fechaEvento :  String, lugar : String){
    return this.httpClient.get(`${this.API}/anularCompra?datosBancarios=`+datosBancarios+`&nombreEspectaculo=`+nombreEspectaculo+`&ubicacion=`+ubicacion+`&nombreRecinto=`+nombreRecinto+`&fechaEvento=`+fechaEvento+`&lugar=`+lugar);
  }

  mejoresClientes(){
    return this.httpClient.get(`${this.API}/mejoresClientes`);
  }

  getRecintoOfertaTipo(tipo : String){
    return this.httpClient.get(`${this.API}/RecintoOfertaTipo?tipo=`+tipo);
  }
  
  getlistarLocalidadesNoVendidasEvento(nombreEspectaculo: String, nombreRecinto: String, lugar: String,fecha:String){
    return this.httpClient.get(`${this.API}/listarLocalidadesNoVendidasEvento?nombreEspectaculo=`+nombreEspectaculo+`&nombreRecinto=`+nombreRecinto+`&lugar=`+lugar+`&fechaEvento=`+fecha);
  }

  getlistarComprasUltimaHora(tiempo : any){
    return this.httpClient.get(`${this.API}/listarComprasUltimaHora?tiempo=`+tiempo);
  }

  getLugares(){
    return this.httpClient.get(`${this.API}/lugares`);
  }

  getlistarEventoPaticipantesLugar(participante: String, lugar: String){
    return this.httpClient.get(`${this.API}/listarEventoPaticipantesLugar?participante=`+participante+`&lugar=`+lugar);
  }
  
  
}
