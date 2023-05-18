import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  entradasCompradas: any = [];
  entradasCompradasFecha: any = [];

  datosBancarios: String = "";

  constructor(private router: Router,private apiService: ApiService) { }

  ngOnInit(): void {
    let datosBancarios = prompt("Introduce los datos bancarios del cliente:");
    if (datosBancarios) {
      this.datosBancarios = datosBancarios;
      this.localidadesCompradasCliente();
    }else{
      this.router.navigate(['/home']);
    }   
  }

  localidadesCompradasCliente(){
    this.apiService.getlistarLocalidadesCompradasCliente(this.datosBancarios).subscribe((res: any) => {
      let eventos = res[0];
      for (let evento of eventos) {
        evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
      }
      this.entradasCompradas = eventos;
    });
  }
  
  anularCompra(compra: any) {
    this.apiService.anularCompra(this.datosBancarios, compra.NombreEspectaculo, compra.Ubicacion, compra.NombreRecinto, compra.FechaEvento, compra.Lugar).subscribe((res: any) => {
      alert("Entrada anulada correctamente");
      this.localidadesCompradasCliente();
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
