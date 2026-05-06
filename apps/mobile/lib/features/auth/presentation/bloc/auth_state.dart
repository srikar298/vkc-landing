import 'package:equatable/equatable.dart';
import '../../domain/entities/user_entity.dart';
import '../../../../core/error/app_error.dart';

enum AuthStatus {
  initial,
  authenticated,
  unauthenticated,
  otpSent,
  error,
}

class AuthState extends Equatable {
  final AuthStatus status;
  final User? user;
  final String phoneNumber;
  final AppError? error;
  final bool isLoading;

  const AuthState({
    this.status = AuthStatus.initial,
    this.user,
    this.phoneNumber = '',
    this.error,
    this.isLoading = false,
  });

  AuthState copyWith({
    AuthStatus? status,
    User? user,
    String? phoneNumber,
    AppError? error,
    bool? isLoading,
  }) {
    return AuthState(
      status: status ?? this.status,
      user: user ?? this.user,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      error: error ?? this.error,
      isLoading: isLoading ?? this.isLoading,
    );
  }

  @override
  List<Object?> get props => [status, user, phoneNumber, error, isLoading];
}
  
class AuthInitial extends AuthState {}
