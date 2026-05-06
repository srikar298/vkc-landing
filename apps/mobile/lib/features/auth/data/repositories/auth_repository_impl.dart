import 'dart:async';
import 'package:injectable/injectable.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/network/api_response.dart';
import '../../../../core/error/error_handler.dart';
import '../../domain/entities/user_entity.dart';
import '../../domain/repositories/i_auth_repository.dart';
import '../models/user_dto.dart';
import '../models/auth_response_dto.dart';
import '../mappers/auth_mapper.dart';
import '../../../../core/config/endpoints.dart';

@LazySingleton(as: IAuthRepository)
class AuthRepositoryImpl implements IAuthRepository {
  final ApiClient _apiClient;

  AuthRepositoryImpl(this._apiClient);

  @override
  Future<ApiResponse<void>> requestOtp(String phoneNumber) async {
    try {
      final response = await _apiClient.post(
        Endpoints.requestOtp,
        data: {'phoneNumber': phoneNumber},
      );
      
      if (response.statusCode == 200 || response.statusCode == 201) {
        return ApiResponse.success(null);
      }
      return ApiResponse.failure(ErrorHandler.handle(response.data));
    } catch (e) {
      return ApiResponse.failure(ErrorHandler.handle(e));
    }
  }

  @override
  Future<ApiResponse<User>> verifyOtp({
    required String phoneNumber,
    required String otp,
  }) async {
    try {
      final response = await _apiClient.post(
        Endpoints.verifyOtp,
        data: {
          'phoneNumber': phoneNumber,
          'otp': otp,
        },
      );

      final authDto = AuthResponseDto.fromJson(response.data['data']);
      
      // TODO: Save tokens to secure storage
      
      final user = AuthMapper.toEntity(
        authDto.user, 
        permissions: authDto.permissions,
      );
      
      return ApiResponse.success(user);
    } catch (e) {
      return ApiResponse.failure(ErrorHandler.handle(e));
    }
  }

  @override
  Future<ApiResponse<void>> refreshSession() async {
    // Implementation for refresh token logic
    return ApiResponse.success(null);
  }

  @override
  Future<void> logout() async {
    // Implementation for logout logic
  }

  @override
  Future<User?> getCachedUser() async {
    return null;
  }
}
