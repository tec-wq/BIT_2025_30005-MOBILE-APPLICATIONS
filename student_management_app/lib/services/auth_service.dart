import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // 1. Register a new student with Email and Password
  Future<UserCredential?> registerWithEmailAndPassword(String email, String password) async {
    try {
      UserCredential result = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      return result;
    } on FirebaseAuthException catch (e) {
      throw Exception(e.message ?? 'An error occurred during registration.');
    }
  }

  // 2. Sign in an existing student
  Future<UserCredential?> signInWithEmailAndPassword(String email, String password) async {
    try {
      UserCredential result = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return result;
    } on FirebaseAuthException catch (e) {
      throw Exception(e.message ?? 'Invalid email or password.');
    }
  }

  // 3. Securely log out
  Future<void> signOut() async {
    await _auth.signOut();
  }
}