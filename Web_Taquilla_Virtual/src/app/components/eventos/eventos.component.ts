import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  
  eventos: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEventos();

  }

  loadEventos(): void {
    this.apiService.getlistarEventos().subscribe((res: any) => {
      let eventos = res[0];

      for (let evento of eventos) {
        evento.FechaEvento = this.getFechaEventoFormateada(evento.FechaEvento);
      }
      this.eventos = eventos;

      (<HTMLDivElement>document.getElementById("menu_eventos")).style.display = "block";
    });
  }

  getFechaEventoFormateada(fecha : string) {
    const fechaInicial = new Date(fecha);
    const fechaFormateada = fechaInicial.toLocaleDateString().split("/");
    if(fechaFormateada[1].length ==1){
      fechaFormateada[1] = "0"+fechaFormateada[1];
    }
    const fechaYHora = fechaFormateada[2]+"-"+fechaFormateada[1]+"-"+fechaFormateada[0]+ ' ' + fechaInicial.toLocaleTimeString();
    return fechaYHora;
  }
  
}

