import { Comment } from '../comment-entity/comment.entity';

export class Book {
  id: number;
    autor: string;  // Agregar esta propiedad
  titulo: string;
  descripcion: string;
  resumen: string;
  fecha_publicacion: string;
  isbn: string;
  formato: string;
  precio: number;
  categoria: string;
  ruta_archivo: string;
  portada: string;
  comments: Comment[];  // Añadimos el array de comentarios
    pagado: boolean;


  constructor() {
    this.id = 0;
    this.titulo = '';
    this.descripcion = '';
    this.resumen = '';
    this.fecha_publicacion = '';
    this.isbn = '';
    this.formato = '';
    this.precio = 0;
    this.ruta_archivo = '';
    this.portada = '';
    this.comments = [];  // Inicializamos como un array vacío
    this.categoria = '';
    this.autor = '';
    this.pagado = false;
  }
}
