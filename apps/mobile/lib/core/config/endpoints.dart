class Services {
  static const String auth = '/auth';
  static String members(String publicId) => '/members/$publicId';
}

class Endpoints {
  // --- Auth Endpoints ---
  static const String requestOtp = '${Services.auth}/otp/request';
  static const String verifyOtp = '${Services.auth}/otp/verify';
  static const String refreshToken = '${Services.auth}/refresh';
  static const String register = '${Services.auth}/register';
  static const String getMe = '${Services.auth}/me';

  // Example of a dynamic endpoint
  static String memberProfile(String id) => '${Services.auth}/members/$id';
}
