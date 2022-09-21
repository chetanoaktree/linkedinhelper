import { APPLICATION_IS_LOADING } from './types';

export function applicationIsLoading(bool) {
  return {
    type: APPLICATION_IS_LOADING,
    isLoading: bool
  }
}