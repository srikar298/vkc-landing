import 'package:dio/dio.dart';
import 'app_error.dart';

class ErrorHandler {
  static AppError handle(dynamic error) {
    if (error is DioException) {
      return _handleDioError(error);
    } else if (error is AppError) {
      return error;
    } else {
      return AppError(
        message: 'An unexpected error occurred: ${error.toString()}',
        code: ErrorCode.unknown,
        originalError: error,
      );
    }
  }

  static AppError _handleDioError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
      case DioExceptionType.connectionError:
        return const AppError(
          message: 'Connection timed out. Please check your internet.',
          code: ErrorCode.networkError,
        );
      case DioExceptionType.badResponse:
        return _handleBadResponse(error.response);
      case DioExceptionType.cancel:
        return const AppError(
          message: 'Request was cancelled.',
          code: ErrorCode.unknown,
        );
      default:
        return AppError(
          message: 'Network error occurred: ${error.message}',
          code: ErrorCode.networkError,
          originalError: error,
        );
    }
  }

  static AppError _handleBadResponse(Response? response) {
    if (response == null) {
      return const AppError(
        message: 'No response from server.',
        code: ErrorCode.serverError,
      );
    }

    final statusCode = response.statusCode;
    final message = response.data?['error']?['message'] ?? 'Server error occurred.';

    if (statusCode == 401) {
      return AppError(message: message, code: ErrorCode.unauthorized);
    } else if (statusCode == 403) {
      return AppError(message: message, code: ErrorCode.forbidden);
    } else if (statusCode == 404) {
      return AppError(message: message, code: ErrorCode.notFound);
    } else if (statusCode != null && statusCode >= 500) {
      return AppError(message: message, code: ErrorCode.serverError);
    }

    return AppError(
      message: message,
      code: ErrorCode.invalidInput,
    );
  }
}
