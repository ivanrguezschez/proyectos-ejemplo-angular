import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  // Array para mantener los post obtenidos
  posts: Post[] = [];

  // Flag para indicar el estado de carga
  loading: boolean = false;

  // Para mantener el mensaje de error
  error: string | null = null;

  deleteLoading: boolean = false;
  deleteError: string | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts(); 
  }

  loadPosts(): void { 
    this.loading = true;
    this.error = null;
    // Nos subscribimos al observable getPosts
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error obteniendo los posts:', err);
        this.error = 'Error cargando los posts.';
        this.loading = false;
        this.posts = [];
      }
    });
  }

  onDeletePost(postId: number): void {
    if (confirm('¿Esta usted seguro de querer borrar este post?')) {
      this.deleteLoading = true; 
      this.deleteError = null;
      this.postService.deletePost(postId).subscribe({
        next: () => {
          console.log(`Post ${postId} borrado correctamente.`);
          this.deleteLoading = false; 
          // Despues de borrar correctamente, recargamos la lista de posts
          this.loadPosts(); 
        },
        error: (err) => {
          console.error(`Error borrando post ${postId}:`, err);
          this.deleteLoading = false;
          this.deleteError = 'Error borrando post.'; 
        }
      });
    }
  }
}
