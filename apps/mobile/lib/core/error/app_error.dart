import 'package:equatable/equatable.dart';

enum ErrorCode {
  serverError,
  networkError,
  unauthorized,
  forbidden,
  notFound,
  invalidInput,
  unknown,
}

class AppError extends Equatable {
  final String message;
  final ErrorCode code;
  final dynamic originalError;

  const AppError({
    required this.message,
    required this.code,
    this.originalError,
  });

  @override
  List<Object?> get props => [message, code, originalError];

  @override
  String toString() => 'AppError(code: $code, message: $message)';
}
