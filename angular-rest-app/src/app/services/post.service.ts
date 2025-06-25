import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private postsCache$: Observable<Post[]> | null = null; // Cache observable

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    // Comprobamos si existe en la cache
    if (!this.postsCache$) { 
      this.postsCache$ = this.http.get<Post[]>(this.apiUrl).pipe(
        shareReplay(1)
      );
    }
    return this.postsCache$;
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
