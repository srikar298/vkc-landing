import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';
import '../../domain/repositories/i_auth_repository.dart';
import 'auth_event.dart';
import 'auth_state.dart';

@injectable
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final IAuthRepository _authRepository;

  AuthBloc(this._authRepository) : super(const AuthState()) {
    on<AuthStarted>(_onAuthStarted);
    on<LoginPhoneNumberChanged>(_onPhoneNumberChanged);
    on<LoginOtpRequested>(_onOtpRequested);
    on<LoginOtpVerified>(_onOtpVerified);
    on<LogoutRequested>(_onLogoutRequested);
  }

  Future<void> _onAuthStarted(AuthStarted event, Emitter<AuthState> emit) async {
    final user = await _authRepository.getCachedUser();
    if (user != null) {
      emit(state.copyWith(status: AuthStatus.authenticated, user: user));
    } else {
      emit(state.copyWith(status: AuthStatus.unauthenticated));
    }
  }

  void _onPhoneNumberChanged(LoginPhoneNumberChanged event, Emitter<AuthState> emit) {
    emit(state.copyWith(phoneNumber: event.phoneNumber));
  }

  Future<void> _onOtpRequested(LoginOtpRequested event, Emitter<AuthState> emit) async {
    emit(state.copyWith(isLoading: true));
    
    final result = await _authRepository.requestOtp(state.phoneNumber);
    
    result.map(
      (data) {
        emit(state.copyWith(status: AuthStatus.otpSent, isLoading: false));
      },
      // Error is handled in the repository and returned in result.error
    );

    if (result.isFailure) {
      emit(state.copyWith(
        status: AuthStatus.error, 
        error: result.error, 
        isLoading: false,
      ));
    }
  }

  Future<void> _onOtpVerified(LoginOtpVerified event, Emitter<AuthState> emit) async {
    emit(state.copyWith(isLoading: true));
    
    final result = await _authRepository.verifyOtp(
      phoneNumber: state.phoneNumber,
      otp: event.otp,
    );
    
    if (result.isSuccess) {
      emit(state.copyWith(
        status: AuthStatus.authenticated, 
        user: result.data, 
        isLoading: false,
      ));
    } else {
      emit(state.copyWith(
        status: AuthStatus.error, 
        error: result.error, 
        isLoading: false,
      ));
    }
  }

  Future<void> _onLogoutRequested(LogoutRequested event, Emitter<AuthState> emit) async {
    await _authRepository.logout();
    emit(const AuthState(status: AuthStatus.unauthenticated));
  }
}
