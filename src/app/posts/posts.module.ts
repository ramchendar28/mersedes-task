import { PostsEffects } from './state/posts.effects';
import { EffectsModule } from '@ngrx/effects';
import { POST_STATE_NAME } from './state/posts.selector';
import { PostsListComponent } from './posts-list/posts-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './state/posts.reducer';


const routes: Routes = [
  {
    path: '',
    component: PostsListComponent
  },
];
@NgModule({
  declarations: [PostsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {}
