import 'package:dio/dio.dart';
import 'package:uuid/uuid.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

/**
 * Infrastructure Layer: API Client
 * Standardized Dio configuration with Observability and Security Interceptors
 */
class ApiClient {
  final Dio dio;
  static const _uuid = Uuid();

  ApiClient({required String baseUrl})
      : dio = Dio(
          BaseOptions(
            baseUrl: baseUrl,
            connectTimeout: const Duration(seconds: 15),
            receiveTimeout: const Duration(seconds: 15),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          ),
        ) {
    
    // 1. Logging Interceptor (Dev Mode)
    dio.interceptors.add(PrettyDioLogger(
      requestHeader: true,
      requestBody: true,
      responseBody: true,
      error: true,
      compact: true,
    ));

    // 2. Observability & Tracing Interceptor
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        // Attach unique Request ID for cross-platform tracing
        options.headers['x-request-id'] = _uuid.v4();
        return handler.next(options);
      },
    ));

    // TODO: Add AuthInterceptor and Refresh Logic
    // dio.interceptors.add(AuthInterceptor());
  }

  /// Centralized GET request with Cancellation support
  Future<Response> get(
    String path, {
    Map<String, dynamic>? queryParameters,
    CancelToken? cancelToken,
  }) async {
    return await dio.get(
      path, 
      queryParameters: queryParameters, 
      cancelToken: cancelToken,
    );
  }

  /// Centralized POST request with Cancellation support
  Future<Response> post(
    String path, {
    dynamic data,
    CancelToken? cancelToken,
  }) async {
    return await dio.post(
      path, 
      data: data, 
      cancelToken: cancelToken,
    );
  }
}
