import '../../../../core/network/api_response.dart';
import '../entities/user_entity.dart';

abstract class IAuthRepository {
  /// Request an OTP for a given phone number
  Future<ApiResponse<void>> requestOtp(String phoneNumber);

  /// Verify OTP and receive Auth tokens
  Future<ApiResponse<User>> verifyOtp({
    required String phoneNumber,
    required String otp,
  });

  /// Refresh the existing session
  Future<ApiResponse<void>> refreshSession();

  /// Log out the current user
  Future<void> logout();

  /// Get current user session (local)
  Future<User?> getCachedUser();
}
