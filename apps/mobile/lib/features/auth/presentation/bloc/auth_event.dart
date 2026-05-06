import 'package:equatable/equatable.dart';

abstract class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object?> get props => [];
}

class LoginPhoneNumberChanged extends AuthEvent {
  final String phoneNumber;
  const LoginPhoneNumberChanged(this.phoneNumber);

  @override
  List<Object?> get props => [phoneNumber];
}

class LoginOtpRequested extends AuthEvent {
  const LoginOtpRequested();
}

class LoginOtpVerified extends AuthEvent {
  final String otp;
  const LoginOtpVerified(this.otp);

  @override
  List<Object?> get props => [otp];
}

class LogoutRequested extends AuthEvent {}
class AuthStarted extends AuthEvent {}
