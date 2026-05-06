import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:injectable/injectable.dart';

@injectable
class AuthInterceptor extends Interceptor {
  final FlutterSecureStorage _storage;

  AuthInterceptor(this._storage);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    // 1. Get Access Token from secure storage
    final token = await _storage.read(key: 'access_token');

    // 2. Attach to headers if it exists
    if (token != null && token.isNotEmpty) {
      options.headers['Authorization'] = 'Bearer $token';
    }

    return handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    // TODO: Implement 401 Refresh Token logic here
    // Search for refresh token, call /auth/refresh, retry request
    
    return handler.next(err);
  }
}
