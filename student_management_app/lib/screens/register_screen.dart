import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../services/database_service.dart';
import '../models/student_model.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _fullNameController = TextEditingController();
  final _studentIdController = TextEditingController();
  final _courseController = TextEditingController();
  final _yearController = TextEditingController(); // NEW
  final _phoneController = TextEditingController(); // NEW
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  final AuthService _authService = AuthService();
  final DatabaseService _dbService = DatabaseService();

  bool _isLoading = false;
  String _errorMessage = '';

  Future<void> _register() async {
    if (_fullNameController.text.isEmpty || _studentIdController.text.isEmpty ||
        _courseController.text.isEmpty || _yearController.text.isEmpty ||
        _phoneController.text.isEmpty || _emailController.text.isEmpty ||
        _passwordController.text.isEmpty) {
      setState(() => _errorMessage = 'Please fill in all required fields.');
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });

    try {
      final userCredential = await _authService.registerWithEmailAndPassword(
        _emailController.text.trim(),
        _passwordController.text.trim(),
      );

      if (userCredential?.user != null) {
        final newStudent = StudentModel(
          uid: userCredential!.user!.uid,
          fullName: _fullNameController.text.trim(),
          studentId: _studentIdController.text.trim(),
          course: _courseController.text.trim(),
          email: _emailController.text.trim(),
          yearOfStudy: _yearController.text.trim(), // NEW
          phoneNumber: _phoneController.text.trim(), // NEW
        );

        await _dbService.saveStudentData(newStudent);

        if (mounted) {
          Navigator.pushReplacementNamed(context, '/dashboard');
        }
      }
    } catch (e) {
      setState(() => _errorMessage = e.toString().replaceAll('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  void dispose() {
    _fullNameController.dispose();
    _studentIdController.dispose();
    _courseController.dispose();
    _yearController.dispose(); // NEW
    _phoneController.dispose(); // NEW
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Register Student')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('Create Profile', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
            const SizedBox(height: 24),

            TextField(controller: _fullNameController, decoration: const InputDecoration(labelText: 'Full Name', border: OutlineInputBorder())),
            const SizedBox(height: 16),
            TextField(controller: _studentIdController, decoration: const InputDecoration(labelText: 'Student ID', border: OutlineInputBorder())),
            const SizedBox(height: 16),
            TextField(controller: _courseController, decoration: const InputDecoration(labelText: 'Course Enrolled', border: OutlineInputBorder())),
            const SizedBox(height: 16),

            // NEW FIELDS
            Row(
              children: [
                Expanded(child: TextField(controller: _yearController, decoration: const InputDecoration(labelText: 'Year of Study', border: OutlineInputBorder()), keyboardType: TextInputType.number)),
                const SizedBox(width: 16),
                Expanded(flex: 2, child: TextField(controller: _phoneController, decoration: const InputDecoration(labelText: 'Phone Number', border: OutlineInputBorder()), keyboardType: TextInputType.phone)),
              ],
            ),
            const Divider(height: 40),

            TextField(controller: _emailController, decoration: const InputDecoration(labelText: 'Email Address', border: OutlineInputBorder()), keyboardType: TextInputType.emailAddress),
            const SizedBox(height: 16),
            TextField(controller: _passwordController, decoration: const InputDecoration(labelText: 'Password (min 6 chars)', border: OutlineInputBorder()), obscureText: true),
            const SizedBox(height: 24),

            if (_errorMessage.isNotEmpty)
              Padding(padding: const EdgeInsets.only(bottom: 16.0), child: Text(_errorMessage, style: const TextStyle(color: Colors.red), textAlign: TextAlign.center)),

            _isLoading
                ? const Center(child: CircularProgressIndicator())
                : ElevatedButton(
              onPressed: _register,
              style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 16)),
              child: const Text('REGISTER & LOGIN'),
            ),
          ],
        ),
      ),
    );
  }
}