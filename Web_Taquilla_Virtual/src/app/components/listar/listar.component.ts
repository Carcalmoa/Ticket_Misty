import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  displayedColumnsOfertadas: string[] = ['Nombre Espectaculo','Ubicacion','Tipo de Usuario', 'Precio', 'Fecha Evento'];
  displayedColumnsVendidas: string[] = ['Nombre Espectaculo', 'Ubicacion', 'Nombre Recinto', 'Fecha Evento', 'Tipo de Usuario', 'Precio'];
  displayedEventosEstado: string[] = ['Nombre Espectaculo', 'Nombre Recinto', 'Lugar', 'Fecha Evento', 'Precio Base', 'Estado', 'Aforo'];
  displayedColumnsDeterioriadas: string[] = ['Ubicacion', 'Nombre Recinto', 'Lugar', 'Deteriorado'];
  displayedEspectaculosTipo: string[] = ['Nombre Espectaculo', 'Tipo de Espectaculo', 'Tipo de Usuario'];
  displayedEspectaculosTipoUsers: string[] = ['Nombre Espectaculo', 'Tipo de Usuario'];
  displayedMejoresClientes: string[] = ['Nombre Cliente', 'Primer Apellido','DNI','Compras Realizadas'];
  displayedOfertaRecintos: string[] = ['Nombre Recinto','Localidades Usuario'];
  displayedColumnsVendidasFecha : string[] = ['Nombre Espectaculo', 'Ubicacion', 'Nombre Recinto', 'Fecha Evento', 'Tipo de Usuario'];
  displayedColumnsVendidasUltimaHora : string[] = ['Nombre Espectaculo', 'Ubicacion', 'Nombre Recinto', 'Fecha Evento', 'Tipo de Usuario'];
  displayedEventosParticiante: string[] = ['Nombre Espectaculo', 'Nombre Recinto', 'Lugar', 'Fecha Evento', 'Precio Base'];

  eventos: any = [];
  recintos: any = [];
  espectaculos: any = [];
  ofertadasEvento: any = [];
  vendidasEspectaculo: any = [];
  eventosSegunEstado: any = [];
  localidadesDeterioradas: any = [];
  fechaEspectaculo = "";
  vendidasTotales: any = [];
  numDeterioradas: any = [];
  clientes : any = [];
  recintosOferta : any =[];
  fechaBusqueda : any;
  vendidasEspectaculoFecha: any = [];
  vendidasUltimraHora : any = [];
  lugares : any = [];

  showDateInput = false;


  constructor(private apiService: ApiService) { }

  cerrarMenu() {
    (<HTMLDivElement>document.getElementById("menu_seleccionar_evento")).style.display = "none";
    (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_tipo")).style.display = "none";
    (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_ventas")).style.display = "none";
    (<HTMLDivElement>document.getElementById("menu_seleccionar_recinto")).style.display = "none";
    (<HTMLDivElement>document.getElementById("menu_seleccionar_espectaculo_tipo")).style.display = "none";
    (<HTMLDivElement>document.getElementById("menu_seleccionar_recinto_vendidas")).style.display = "none";
    (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_no_vendidas")).style.display = "none";
    (<HTMLDivElement>document.getElementById("menu_seleccionar_lugares")).style.display = "none";
    this.showDateInput = false;
  }

  cerrarTablas() {
    (<HTMLDivElement>document.getElementById("tablaOfertadas")).style.display = "none";
    (<HTMLDivElement>document.getElementById("eventosEstado")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tablaVendidas")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tablalocalidadesDeterioradas")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabla_espectaculos")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabla_espectaculos_tipo")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabla_mejores_clientes")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tabla_recintos_oferta")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tablaVendidasFecha")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tablaVendidasUltimaHora")).style.display = "none";
    (<HTMLDivElement>document.getElementById("tablaEventosParticipante")).style.display = "none";
    
    this.showDateInput = false;
 
  }


  /* Localidades Ofertadas para un evento */
  localidadesOfertadasEvento() {
    this.cerrarTablas();
    this.apiService.getlistarEventos().subscribe((res: any) => {
      let eventos = res[0];
      for (let evento of eventos) {
        evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
      }
      this.eventos = eventos;
      (<HTMLDivElement>document.getElementById("menu_seleccionar_evento")).style.display = "block";
    });
  }

  eventoSeleccionado(evento: any) {
    this.apiService.getlistarLocalidadesOfertadasEvento(evento.NombreEspectaculo, evento.NombreRecinto, evento.Lugar, evento.FechaEvento).subscribe((res: any) => {
      (<HTMLDivElement>document.getElementById("menu_seleccionar_evento")).style.display = "none";
      let eventos = res[0];
      for (let evento of eventos) {
        evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
      }
      this.ofertadasEvento = eventos;
      (<HTMLDivElement>document.getElementById("tablaOfertadas")).style.display = "block";

    });
  }


  /* Localidades Ofertadas a un precio */
  localidadesOfertadasPrecio() {
    this.cerrarTablas();
    let precio = prompt("Introduce el precio que quieres consultar:");
    if (precio) {
      this.apiService.getlistarLocalidadesOfertadasPrecio(precio).subscribe((res: any) => {
        let eventos = res[0];
        for (let evento of eventos) {
          evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
        }
        this.ofertadasEvento = eventos;
        (<HTMLDivElement>document.getElementById("tablaOfertadas")).style.display = "block";
      });
    }
  }

  /* Localidades Ofertadas para un evento y un tipo de usuario */
  localidadesOfertadasEventoTipo() {
    this.cerrarTablas();
    this.apiService.getlistarEventos().subscribe((res: any) => {
      let eventos = res[0];
      for (let evento of eventos) {
        evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
      }
      this.eventos = eventos;
      (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_tipo")).style.display = "block";
    });
  }

  eventoSeleccionadoParaEventoTipo(evento: any) {
    let tipoUsuario = prompt("Introduce el tipo de usuario que quieres consultar:");
    if (tipoUsuario) {
      this.apiService.getlistarLocalidadesOfertadasEventoTipo(evento.NombreEspectaculo, evento.NombreRecinto, evento.Lugar, evento.FechaEvento, tipoUsuario).subscribe((res: any) => {
        (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_tipo")).style.display = "none";
        let eventos = res[0];
        for (let evento of eventos) {
          evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
        }
        this.ofertadasEvento = eventos;
        (<HTMLDivElement>document.getElementById("tablaOfertadas")).style.display = "block";
      });
    }
  }

  /* Eventos segun estado */
  eventosEstado() {
    this.cerrarTablas();
    let estado = prompt("Introduce el estado del evento que quieres consultar:");
    if (estado) {
      this.apiService.getlistarEventosEstado(estado).subscribe((res: any) => {
        let eventos = res[0];
        for (let evento of eventos) {
          evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
        }
        this.eventosSegunEstado = eventos;
        (<HTMLDivElement>document.getElementById("eventosEstado")).style.display = "block";
      });
    }
  }

  /* Localidades Vendidas para un Espectaculo */
  buscarParticipante() {
    this.cerrarTablas();
    this.apiService.getLugares().subscribe((res: any) => {
      this.lugares = res[0];
      (<HTMLDivElement>document.getElementById("menu_seleccionar_lugares")).style.display = "block";
    });
  }

  eventosParticipante(lugar: any) {
    let participante = prompt("Introduce el Participante que deseas buscar:");
    if(participante){
      this.apiService.getlistarEventoPaticipantesLugar(participante,lugar.Lugar).subscribe((res: any) => {
        (<HTMLDivElement>document.getElementById("menu_seleccionar_lugares")).style.display = "none";
        let espectaculos = res[0];
        for (let espectaculo of espectaculos) {
          espectaculo.FechaEvento = this.getFechaEventoFormateada(espectaculo.FechaEvento);
        }
        this.eventosSegunEstado = espectaculos;
  
        (<HTMLDivElement>document.getElementById("tablaEventosParticipante")).style.display = "block";
  
      });
    }
    
  }

  /* Localidades Vendidas para un Evento */
  localidadesVendidasEvento() {
    this.cerrarTablas();
    this.apiService.getlistarEventos().subscribe((res: any) => {
      let eventos = res[0];
      for (let evento of eventos) {
        evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
      }
      this.eventos = eventos;
      (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_ventas")).style.display = "block";
    });
  }

  eventoSeleccionadoVentas(evento: any) {
    this.apiService.getlistarLocalidadesVendidasEventos(evento.NombreEspectaculo, evento.NombreRecinto, evento.Lugar, evento.FechaEvento).subscribe((res: any) => {
      (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_ventas")).style.display = "none";
      this.vendidasTotales = res[0][0].LocalidadesVendidasEvento;
      let espectaculos = res[1];
      for (let espectaculo of espectaculos) {
        espectaculo.FechaEvento = this.getFechaEventoFormateada(espectaculo.FechaEvento);
      }
      this.vendidasEspectaculo = espectaculos;
      (<HTMLDivElement>document.getElementById("tablaVendidas")).style.display = "block";

    });
  }

  /* Localidades Deterioradas para un Recinto */
  localidadesDeterioradasRecinto() {
    this.cerrarTablas();
    this.apiService.getlistarRecintos().subscribe((res: any) => {
      this.recintos = res[0];
      (<HTMLDivElement>document.getElementById("menu_seleccionar_recinto")).style.display = "block";
    });
  }

  recintoSeleccionado(recinto: any) {
    this.apiService.getlistarLocalidadesDeterioradasRecinto(recinto.NombreRecinto, recinto.Lugar).subscribe((res: any) => {
      (<HTMLDivElement>document.getElementById("menu_seleccionar_recinto")).style.display = "none";
      this.numDeterioradas = res[0][0].NumDeterioradas;
      if (this.numDeterioradas == 0) {
        alert("No hay localidades deteriordadas para el Recinto: " + recinto.NombreRecinto);
      } else {
        this.localidadesDeterioradas = res[1];
        (<HTMLDivElement>document.getElementById("tablalocalidadesDeterioradas")).style.display = "block";
      }
    });
  }

  /* Tipos de usuarios permitidos para un Espectáculo */
  espectaculosTipo() {
    this.cerrarTablas();
    let tipo = prompt("Introduce el tipo de usuarios que quieres consultar:");
    if (tipo) {
      this.apiService.getlistarEspectaculosParaTipo(tipo).subscribe((res: any) => {
        this.espectaculos = res[0];
        (<HTMLDivElement>document.getElementById("tabla_espectaculos")).style.display = "block";
      });
    }
  }

  /* Ver los tipos de usario permitidos para un Espectáculo */
  tiposEspectaculo() {
    this.cerrarTablas();
    this.apiService.getlistarEspectaculos().subscribe((res: any) => {
      this.espectaculos = res[0];
      (<HTMLDivElement>document.getElementById("menu_seleccionar_espectaculo_tipo")).style.display = "block";
    });
  }

  espectaculoTipoSeleccionado(espectaculo: any) {
    this.apiService.getlistarTiposUsuariosEspectaculo(espectaculo.NombreEspectaculo).subscribe((res: any) => {
      (<HTMLDivElement>document.getElementById("menu_seleccionar_espectaculo_tipo")).style.display = "none";
      this.espectaculos = res[1];
      (<HTMLDivElement>document.getElementById("tabla_espectaculos_tipo")).style.display = "block";
    });
  }

  /* Localidades Vendidas Por Recinto*/
  localidadesVendidasPorRecinto() {
    this.cerrarTablas();
    this.apiService.getlistarRecintos().subscribe((res: any) => {
      this.recintos = res[0];
      (<HTMLDivElement>document.getElementById("menu_seleccionar_recinto_vendidas")).style.display = "block";
    });
  }

  recintoSeleccionadoVendidas(recinto: any) {
    this.apiService.getlistarLocalidadesVendidasRecinto(recinto.NombreRecinto, recinto.Lugar).subscribe((res: any) => {
      (<HTMLDivElement>document.getElementById("menu_seleccionar_recinto_vendidas")).style.display = "none";
      this.vendidasTotales = res[0][0].LocalidadesVendidasRecinto;
      let espectaculos = res[1];
      for (let espectaculo of espectaculos) {
        espectaculo.FechaEvento = this.getFechaEventoFormateada(espectaculo.FechaEvento);
      }
      this.vendidasEspectaculo = espectaculos;
      (<HTMLDivElement>document.getElementById("tablaVendidas")).style.display = "block";

    });

  }

  /* Mejores Clientes de nuestra pagina */
  mejoresClientes(){
    this.cerrarTablas();
    this.apiService.mejoresClientes().subscribe((res: any) => {
      this.clientes = res[0];
      (<HTMLDivElement>document.getElementById("tabla_mejores_clientes")).style.display = "block";
    });
  }

  /* Los Recintos con más oferta para un tipo de usuario */
  recintosConMasOfertaTipo(){
    this.cerrarTablas();
    let tipo = prompt("Introduce el Tipo de Usuario que quieres Consultar:");
    if (tipo) {
      this.apiService.getRecintoOfertaTipo(tipo).subscribe((res: any) => {
        this.recintosOferta = res[0];
        (<HTMLDivElement>document.getElementById("tabla_recintos_oferta")).style.display = "block";
      });
    }
  }

  /* Localidades No vendidas de un Evento */

  localidadesNoVendidasEvento(){
    this.cerrarTablas();
    this.apiService.getlistarEventos().subscribe((res: any) => {
      let eventos = res[0];
      for (let evento of eventos) {
        evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
      }
      this.eventos = eventos;
      (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_no_vendidas")).style.display = "block";
    });
  }

  eventosConLocalidadesNoVendidas(evento : any){
    this.apiService.getlistarLocalidadesNoVendidasEvento(evento.NombreEspectaculo,evento.NombreRecinto,evento.Lugar,evento.FechaEvento).subscribe((res: any) => {
      let eventos = res[0];
      for (let evento of eventos) {
        evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
      }
      this.ofertadasEvento = eventos;
      (<HTMLDivElement>document.getElementById("menu_seleccionar_evento_no_vendidas")).style.display = "none";
      if(this.ofertadasEvento.length!=0){
        (<HTMLDivElement>document.getElementById("tablaOfertadas")).style.display = "block";
      }else{
        alert("Se han vendido todas las localidades para el Evento "+evento.NombreRecinto+" en "+evento.NombreRecinto+" el "+evento.FechaEvento);
      }
      
    });
  }

  /* Localidades vendidas una fecha */
  listarVendidasFecha(){
    this.cerrarTablas();
    let buscar = this.fechaBusqueda + " 00:00:00";
    this.apiService.getlistarLocalidadesVendidasFecha(buscar).subscribe((res: any) => {
      let espectaculos = res[0];
      for (let espectaculo of espectaculos) {
        espectaculo.FechaEvento = this.getFechaEventoFormateada(espectaculo.FechaEvento);
      }
      this.vendidasEspectaculoFecha = espectaculos;
      this.showDateInput = false;
      (<HTMLDivElement>document.getElementById("tablaVendidasFecha")).style.display = "block";

    });
  }
  
  /* Localidades Vendidas la ultima hora */
  localidadesVendidasUltimaHora(){
    this.cerrarTablas();
    this.apiService.getlistarComprasUltimaHora(1250).subscribe((res: any) => {
      this.vendidasTotales = res[0][0].NumCompradas;
      let espectaculos = res[1];
      for (let espectaculo of espectaculos) {
        espectaculo.FechaCompra = this.getFechaEventoFormateada(espectaculo.FechaCompra);
      }
      this.vendidasUltimraHora = espectaculos;
      (<HTMLDivElement>document.getElementById("tablaVendidasUltimaHora")).style.display = "block";

    });
  }

  getFechaEventoFormateada(fecha: string) {
    const fechaInicial = new Date(fecha);
    const fechaFormateada = fechaInicial.toLocaleDateString().split("/");
    if (fechaFormateada[1].length == 1) {
      fechaFormateada[1] = "0" + fechaFormateada[1];
    }
    const fechaYHora = fechaFormateada[2] + "-" + fechaFormateada[1] + "-" + fechaFormateada[0] + ' ' + fechaInicial.toLocaleTimeString();
    return fechaYHora;
  }

}