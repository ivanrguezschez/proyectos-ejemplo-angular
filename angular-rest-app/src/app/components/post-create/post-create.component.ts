import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [RouterModule, FormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {
  currentPost: Post = { userId: 1, id: 0, title: '', body: '' };
  operationStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = params['id']; 
      if (postId) {
        this.isEditMode = true; 
        this.operationStatus = 'loading'; 
        this.postService.getPostById(+postId).subscribe({
          next: (post) => {
            this.currentPost = post;
            this.operationStatus = 'idle';
          },
          error: (err) => {
            console.error('Error al obtener el post para editar:', err);
            this.operationStatus = 'error';
            this.errorMessage = 'No se pudo cargar el Post para editarlo.';
          }
        });
      } else {
        this.isEditMode = false;
        this.currentPost = { userId: 1, id: 0, title: '', body: '' }; 
        this.operationStatus = 'idle';
      } 
      //this.loadPost(postId);
    });
   
  }

  /*
  loadPost(postId: any): void { 
    if (postId) {
      this.isEditMode = true; 
      this.operationStatus = 'loading'; 
      this.postService.getPostById(+postId).subscribe({
        next: (post) => {
          this.currentPost = post;
          this.operationStatus = 'idle';
        },
        error: (err) => {
          console.error('Error al obtener el post para editar:', err);
          this.operationStatus = 'error';
          this.errorMessage = 'No se pudo cargar el Post para editarlo.';
        }
      });
    } else {
      this.isEditMode = false;
      this.currentPost = { userId: 1, id: 0, title: '', body: '' }; 
      this.operationStatus = 'idle';
    }
  }
  */

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.operationStatus = 'loading';
      this.errorMessage = null;
      const apiCall = this.isEditMode
        ? this.postService.updatePost(this.currentPost.id, this.currentPost) // PUT for update
        : this.postService.createPost(this.currentPost); // POST for create

      apiCall.subscribe({
        next: (resultPost) => {
          console.log(this.isEditMode ? 'Post actualizado correctamente:' : 'Post creado correctamente:', resultPost);
          this.operationStatus = 'success';
          form.resetForm();
          this.currentPost = { userId: 1, id: 0, title: '', body: '' };
          //this.loadPost(this.isEditMode ? this.currentPost.id : null);
        },
        error: (err) => {
          console.error(this.isEditMode ? 'Error actualizando Post:' : 'Error creando Post:', err);
          this.operationStatus = 'error';
          this.errorMessage = this.isEditMode ? 'Error actualizando post. Por favor intentelo otra vez.' : 'Error creando post. Por favor intentelo otra vez.';
        }
      });
    }
  }

  getSubmitButtonText(): string { 
    if (this.operationStatus === 'loading') {
      return this.isEditMode ? 'Actualizando...' : 'Creando...';
    } else {
      return this.isEditMode ? 'Actualizar Post' : 'Crear Post';
    }
  }

  getFormTitle(): string { 
    return this.isEditMode ? 'Editar Post' : 'Crear Nuevo Post';
  }
}
