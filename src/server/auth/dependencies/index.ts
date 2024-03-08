import { AuthRepositoryImpl } from '../data/repositories/AuthRepository';
import { LoginWithPasswordUseCase } from '../domain/usecase/LoginWithPassword';
import { LogoutUseCase } from '../domain/usecase/Logout';
import { RegisterUseCase } from '../domain/usecase/Register';

import type { UseCaseOf } from '@/server/activitypub/utils/usecase';

export const register: UseCaseOf<typeof RegisterUseCase> = RegisterUseCase({
  repository: AuthRepositoryImpl,
});

export const loginWithPassword: UseCaseOf<typeof LoginWithPasswordUseCase> =
  LoginWithPasswordUseCase({
    repository: AuthRepositoryImpl,
  });

export const logout: UseCaseOf<typeof LogoutUseCase> = LogoutUseCase();
