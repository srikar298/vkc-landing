import '../error/app_error.dart';

class ApiResponse<T> {
  final T? data;
  final AppError? error;

  ApiResponse.success(this.data) : error = null;
  
  ApiResponse.failure(AppError appError)
      : error = appError,
        data = null;

  bool get isSuccess => data != null;
  bool get isFailure => error != null;

  /// Transformation utility (like flatMap)
  ApiResponse<R> map<R>(R Function(T data) transform) {
    if (isSuccess) {
      return ApiResponse.success(transform(data as T));
    } else {
      return ApiResponse.failure(error!);
    }
  }
}
