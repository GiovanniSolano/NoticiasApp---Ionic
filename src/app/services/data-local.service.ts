import { Injectable } from '@angular/core';


import { Plugins } from '@capacitor/core';
import { Article } from '../interfaces/interfaces';

const { Storage } = Plugins;

const { Toast } = Plugins;

import { ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(public toastController: ToastController) {
    this.cargarNoticias();
   }

   async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }



  async guardarNoticia(noticia: Article) {

    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if( !existe ) {
      this.noticias.unshift(noticia);

    }

    this.mostrarToast('Se ha agregado a favoritos');


    await Storage.set({
      key: 'noticias',
      value: JSON.stringify(this.noticias)
    });

  


}

async cargarNoticias() {
  const respuesta = await Storage.get({ key: 'noticias' });
  this.noticias = JSON.parse(respuesta.value) || [];


  return this.noticias;

}

async borrarNoticia(noticia: Article) {
  this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
  await Storage.set({
    key: 'noticias',
    value: JSON.stringify(this.noticias)
  });

  this.mostrarToast('Borrado de favoritos');
}

}
