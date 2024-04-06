import { extendContainer } from '@/server/dependencies/configureContainer';
import { asFunction } from 'awilix';
import { ApplicationRepositoryImpl } from '../data/repositories/ApplicationRepository';
import { SessionRepositoryImpl } from '../data/repositories/SessionRepository';
import { UserRepositoryImpl } from '../data/repositories/UserRepository';
import type { ApplicationRepository } from '../domain/repositories/ApplicationRepository';
import type { SessionRepository } from '../domain/repositories/SessionRepository';
import type { UserRepository } from '../domain/repositories/UserRepository';
import { GetUserByID } from '../domain/usecase/GetUserByID';
import { LoginWithPasswordUseCase } from '../domain/usecase/LoginWithPassword';
import { LogoutUseCase } from '../domain/usecase/Logout';
import { CreateAuthorizationCode } from '../domain/usecase/OAuth/CreateAuthorizationCode';
import { ExchangeAuthorizationCode } from '../domain/usecase/OAuth/ExchangeAuthorizationCode';
import { ExchangeClientCredential } from '../domain/usecase/OAuth/ExchangeClientCredential';
import { VerifyAccessToken } from '../domain/usecase/OAuth/VerifyAccessToken';
import { RegisterUseCase } from '../domain/usecase/Register';
import { SetSessionUseCase } from '../domain/usecase/SetSession';
import { CreateApplicationUseCase } from '../domain/usecase/application/CreateApplication';
import { GetApplicationUseCase } from '../domain/usecase/application/GetApplication';
import {
  ApplicationServiceImpl,
  type ApplicationService,
} from '../service/ApplicationService';
import { AuthServiceImpl, type AuthService } from '../service/AuthService';
import {
  AuthorizationCodeServiceImpl,
  type AuthorizationCodeService,
} from '../service/AuthorizationCodeService';
import { TokenServiceImpl, type TokenService } from '../service/TokenService';
import { initializeLucia, type LuciaInstance } from './lucia';

export interface AuthDependencyContainer {
  lucia: LuciaInstance;

  authService: AuthService;

  userRepository: UserRepository;

  sessionRepository: SessionRepository;

  applicationRepository: ApplicationRepository;

  applicationService: ApplicationService;

  authorizationCodeService: AuthorizationCodeService;

  tokenService: TokenService;

  loginWithPasswordUseCase: LoginWithPasswordUseCase;

  registerUseCase: RegisterUseCase;

  logoutUseCase: LogoutUseCase;

  setSessionUseCase: SetSessionUseCase;

  createApplicationUseCase: CreateApplicationUseCase;

  getApplicationUseCase: GetApplicationUseCase;

  createAuthorizationCodeUseCase: CreateAuthorizationCode;

  exchangeAuthorizationCodeUseCase: ExchangeAuthorizationCode;

  exchangeClientCredentialUseCase: ExchangeClientCredential;

  getUserByIDUseCase: GetUserByID;

  verifyAccessTokenUseCase: VerifyAccessToken;
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

        applicationService: asFunction(() =>
          ApplicationServiceImpl(),
        ).singleton(),

        authorizationCodeService: asFunction(() =>
          AuthorizationCodeServiceImpl({
            secret: container.cradle.env.AUTH_CODE_SECRET,
          }),
        ).singleton(),

        tokenService: asFunction(() =>
          TokenServiceImpl({
            accessTokenSecret: container.cradle.env.JWT_SECRET,
            refreshTokenSecret: container.cradle.env.REFRESH_TOKEN_SECRET,
          }),
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

        applicationRepository: asFunction(() =>
          ApplicationRepositoryImpl({
            database: container.cradle.database,
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

        createApplicationUseCase: asFunction(() =>
          CreateApplicationUseCase({
            repository: container.cradle.applicationRepository,
            service: container.cradle.applicationService,
          }),
        ).singleton(),

        getApplicationUseCase: asFunction(() =>
          GetApplicationUseCase({
            repository: container.cradle.applicationRepository,
          }),
        ).singleton(),

        createAuthorizationCodeUseCase: asFunction(() =>
          CreateAuthorizationCode({
            service: container.cradle.authorizationCodeService,
          }),
        ).singleton(),

        exchangeAuthorizationCodeUseCase: asFunction(() =>
          ExchangeAuthorizationCode({
            tokenService: container.cradle.tokenService,
            authorizationCodeService: container.cradle.authorizationCodeService,
            applicationRepository: container.cradle.applicationRepository,
          }),
        ).singleton(),

        exchangeClientCredentialUseCase: asFunction(() =>
          ExchangeClientCredential({
            repository: container.cradle.applicationRepository,
            tokenService: container.cradle.tokenService,
          }),
        ).singleton(),

        getUserByIDUseCase: asFunction(() =>
          GetUserByID({
            repository: container.cradle.userRepository,
          }),
        ).singleton(),

        verifyAccessTokenUseCase: asFunction(() =>
          VerifyAccessToken({
            service: container.cradle.tokenService,
          }),
        ).singleton(),
      });
  },
);
