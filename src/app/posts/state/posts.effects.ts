import { AppState } from './../../store/app.state';
import { getPosts } from './posts.selector';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Post } from './../../models/posts.model';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  loadPosts,
  loadPostsSuccess
} from './posts.actions';
import { PostsService } from './../../services/posts.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  RouterNavigatedAction,
  routerNavigationAction,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';
import { of } from 'rxjs';
import { dummyAction } from 'src/app/auth/state/auth.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, posts]) => {
        if (!posts.length || posts.length === 1) {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostsSuccess({ posts });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });


}
