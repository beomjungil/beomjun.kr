import { extendContainer } from '@/server/dependencies/configureContainer';
import { asFunction } from 'awilix';
import { SessionRepositoryImpl } from '../data/repositories/SessionRepository';
import { UserRepositoryImpl } from '../data/repositories/UserRepository';
import type { SessionRepository } from '../domain/repositories/SessionRepository';
import type { UserRepository } from '../domain/repositories/UserRepository';
import { LoginWithPasswordUseCase } from '../domain/usecase/LoginWithPassword';
import { LogoutUseCase } from '../domain/usecase/Logout';
import { RegisterUseCase } from '../domain/usecase/Register';
import { SetSessionUseCase } from '../domain/usecase/SetSession';
import { AuthServiceImpl, type AuthService } from '../service/AuthService';
import { initializeLucia, type LuciaInstance } from './lucia';

export interface AuthDependencyContainer {
  lucia: LuciaInstance;

  authService: AuthService;

  userRepository: UserRepository;

  sessionRepository: SessionRepository;

  loginWithPasswordUseCase: LoginWithPasswordUseCase;

  registerUseCase: RegisterUseCase;

  logoutUseCase: LogoutUseCase;

  setSessionUseCase: SetSessionUseCase;
}

export const configureAuthContainer = extendContainer<AuthDependencyContainer>(
  (container) => {
    return container
      .register({
        lucia: asFunction(() =>
          initializeLucia(container.cradle.database),
        ).singleton(),
      })
      .register({
        authService: asFunction(() =>
          AuthServiceImpl({ lucia: container.cradle.lucia }),
        ).singleton(),

        userRepository: asFunction(() =>
          UserRepositoryImpl({
            database: container.cradle.database,
          }),
        ).singleton(),

        sessionRepository: asFunction(() =>
          SessionRepositoryImpl({
            lucia: container.cradle.lucia,
          }),
        ).singleton(),
      })
      .register({
        loginWithPasswordUseCase: asFunction(() =>
          LoginWithPasswordUseCase({
            authService: container.cradle.authService,
            userRepository: container.cradle.userRepository,
            sessionRepository: container.cradle.sessionRepository,
          }),
        ).singleton(),

        registerUseCase: asFunction(() =>
          RegisterUseCase({
            authService: container.cradle.authService,
            userRepository: container.cradle.userRepository,
            sessionRepository: container.cradle.sessionRepository,
          }),
        ).singleton(),

        logoutUseCase: asFunction(() =>
          LogoutUseCase({
            sessionRepository: container.cradle.sessionRepository,
          }),
        ).singleton(),

        setSessionUseCase: asFunction(() =>
          SetSessionUseCase({
            authService: container.cradle.authService,
          }),
        ).singleton(),
      });
  },
);
